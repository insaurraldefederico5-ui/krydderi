-- =============================================================================
-- Krydderi — Initial Schema
-- Run against: Supabase Postgres (eu-central-1 / Frankfurt)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE account_segment AS ENUM (
  'bakery',
  'restaurant',
  'manufacturer',
  'health_food',
  'distributor'
);

CREATE TYPE user_role AS ENUM (
  'customer_owner',
  'customer_member',
  'admin'
);

CREATE TYPE order_status AS ENUM (
  'placed',
  'confirmed',
  'shipped',
  'delivered',
  'invoiced',
  'cancelled'
);

CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'converted',
  'lost'
);

CREATE TYPE product_category AS ENUM (
  'whole_spices',
  'ground_spices',
  'herbs',
  'blends',
  'organic'
);

-- ---------------------------------------------------------------------------
-- Helper: auto-set updated_at
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- accounts
-- Business customer accounts (one per company).
-- ---------------------------------------------------------------------------
CREATE TABLE accounts (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name         TEXT NOT NULL,
  cvr_number            TEXT,
  segment               account_segment NOT NULL DEFAULT 'restaurant',
  address               TEXT,
  payment_terms_days    INTEGER NOT NULL DEFAULT 14,
  min_order_value_ore   INTEGER NOT NULL DEFAULT 80000,  -- 800,00 kr.
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- profiles
-- Extends auth.users. id = auth.users.id (1:1).
-- ---------------------------------------------------------------------------
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id  UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  role        user_role NOT NULL DEFAULT 'customer_member',
  locale      TEXT NOT NULL DEFAULT 'da',
  phone       TEXT
);

CREATE INDEX idx_profiles_account_id ON profiles(account_id);

-- Auto-create profile shell when Supabase creates the auth user via invite.
-- Expects invite metadata: { account_id, full_name, role }
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- Only insert if metadata was provided (skip if coming from seed/admin without it)
  IF (NEW.raw_user_meta_data ->> 'account_id') IS NOT NULL THEN
    INSERT INTO profiles (id, account_id, full_name, role, locale)
    VALUES (
      NEW.id,
      (NEW.raw_user_meta_data ->> 'account_id')::UUID,
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
      COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'customer_member'),
      COALESCE(NEW.raw_user_meta_data ->> 'locale', 'da')
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
CREATE TABLE products (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                    TEXT NOT NULL UNIQUE,
  name_da                 TEXT NOT NULL,
  name_en                 TEXT NOT NULL,
  category                product_category NOT NULL,
  origin_country          TEXT NOT NULL,
  certifications          JSONB NOT NULL DEFAULT '{}'::JSONB,
  description_da          TEXT,
  description_en          TEXT,
  base_price_ore_per_kg   INTEGER NOT NULL,  -- 1 kr = 100 øre; stored as integer
  min_qty_kg              NUMERIC(8,2) NOT NULL DEFAULT 0.5,
  qty_step_kg             NUMERIC(8,2) NOT NULL DEFAULT 0.5,
  lead_time_days          INTEGER NOT NULL DEFAULT 2,
  coa_file_path           TEXT,
  image_path              TEXT,
  is_active               BOOLEAN NOT NULL DEFAULT TRUE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);

-- ---------------------------------------------------------------------------
-- account_pricing
-- Overrides base price for a specific account+product pair.
-- ---------------------------------------------------------------------------
CREATE TABLE account_pricing (
  account_id          UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  product_id          UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price_ore_per_kg    INTEGER NOT NULL,
  PRIMARY KEY (account_id, product_id)
);

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
CREATE TABLE orders (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id              UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  placed_by               UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  status                  order_status NOT NULL DEFAULT 'placed',
  subtotal_ore            INTEGER NOT NULL,
  moms_ore                INTEGER NOT NULL,
  total_ore               INTEGER NOT NULL,
  requested_delivery_date DATE,
  notes                   TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_account_id ON orders(account_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ---------------------------------------------------------------------------
-- order_items
-- Price snapshot at time of order — NEVER recomputed from current price.
-- ---------------------------------------------------------------------------
CREATE TABLE order_items (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id                UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id              UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  qty_kg                  NUMERIC(8,2) NOT NULL,
  unit_price_ore_per_kg   INTEGER NOT NULL,   -- snapshot
  line_subtotal_ore       INTEGER NOT NULL     -- snapshot
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ---------------------------------------------------------------------------
-- saved_lists  ("My usuals")
-- ---------------------------------------------------------------------------
CREATE TABLE saved_lists (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id  UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  created_by  UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_saved_lists_account_id ON saved_lists(account_id);

CREATE TABLE saved_list_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id     UUID NOT NULL REFERENCES saved_lists(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  qty_kg      NUMERIC(8,2) NOT NULL DEFAULT 1.0,
  UNIQUE (list_id, product_id)
);

-- ---------------------------------------------------------------------------
-- conversations / messages  (chat)
-- One conversation per account in v1. Schema is realtime-ready.
-- ---------------------------------------------------------------------------
CREATE TABLE conversations (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id  UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE messages (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id     UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_profile_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  body                TEXT NOT NULL,
  attachment_path     TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at             TIMESTAMPTZ
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- leads
-- Public lead-capture form submissions.
-- ---------------------------------------------------------------------------
CREATE TABLE leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name   TEXT NOT NULL,
  contact_name    TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  segment         account_segment,
  message         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status          lead_status NOT NULL DEFAULT 'new'
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ---------------------------------------------------------------------------
-- carts  (persistent, survives logout)
-- One cart per profile. On checkout, cart is cleared.
-- ---------------------------------------------------------------------------
CREATE TABLE carts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_carts_updated_at
  BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TABLE cart_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id     UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  qty_kg      NUMERIC(8,2) NOT NULL,
  UNIQUE (cart_id, product_id)
);

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
