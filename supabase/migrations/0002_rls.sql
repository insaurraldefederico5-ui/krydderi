-- =============================================================================
-- Krydderi — Row Level Security Policies
-- Default-deny: nothing is accessible until a policy explicitly allows it.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Helper functions
-- These are SECURITY DEFINER to avoid infinite recursion on profiles.
-- STABLE so results are cached within a single query (not called per row).
-- ---------------------------------------------------------------------------

-- Returns the account_id of the currently authenticated user.
CREATE OR REPLACE FUNCTION my_account_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT account_id FROM profiles WHERE id = auth.uid()
$$;

-- Returns true if the current user has the 'admin' role.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
$$;

-- Returns true if the current user is the owner of their account.
CREATE OR REPLACE FUNCTION is_account_owner()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'customer_owner'
  )
$$;

-- ---------------------------------------------------------------------------
-- accounts
-- ---------------------------------------------------------------------------
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- Customers: read their own account
CREATE POLICY "accounts_select_own"
  ON accounts FOR SELECT TO authenticated
  USING (id = my_account_id());

-- Customers: owners can update their account
CREATE POLICY "accounts_update_owner"
  ON accounts FOR UPDATE TO authenticated
  USING (id = my_account_id() AND is_account_owner())
  WITH CHECK (id = my_account_id() AND is_account_owner());

-- Admin: full access
CREATE POLICY "accounts_admin_all"
  ON accounts FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone in the account can see all profiles in the same account
CREATE POLICY "profiles_select_same_account"
  ON profiles FOR SELECT TO authenticated
  USING (account_id = my_account_id() OR id = auth.uid());

-- Each user can update their own profile
CREATE POLICY "profiles_update_self"
  ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Account owners can insert profiles (invite team members)
CREATE POLICY "profiles_insert_owner"
  ON profiles FOR INSERT TO authenticated
  WITH CHECK (account_id = my_account_id() AND is_account_owner());

-- Admin: full access
CREATE POLICY "profiles_admin_all"
  ON profiles FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- products
-- Public catalog: all authenticated users can read active products.
-- Only admin can modify.
-- ---------------------------------------------------------------------------
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_select_authenticated"
  ON products FOR SELECT TO authenticated
  USING (is_active = TRUE OR is_admin());

CREATE POLICY "products_admin_all"
  ON products FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- account_pricing
-- Only the owning account can read their negotiated prices.
-- Only admin can write.
-- ---------------------------------------------------------------------------
ALTER TABLE account_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "account_pricing_select_own"
  ON account_pricing FOR SELECT TO authenticated
  USING (account_id = my_account_id());

CREATE POLICY "account_pricing_admin_all"
  ON account_pricing FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Customers: read their own account's orders
CREATE POLICY "orders_select_own"
  ON orders FOR SELECT TO authenticated
  USING (account_id = my_account_id());

-- Customers: place orders for their own account
CREATE POLICY "orders_insert_own"
  ON orders FOR INSERT TO authenticated
  WITH CHECK (account_id = my_account_id() AND placed_by = auth.uid());

-- Customers cannot update orders (status changes are admin-only)
-- Admin: full access
CREATE POLICY "orders_admin_all"
  ON orders FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- order_items
-- ---------------------------------------------------------------------------
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Access via the parent order's account
CREATE POLICY "order_items_select_own"
  ON order_items FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
        AND orders.account_id = my_account_id()
    )
  );

CREATE POLICY "order_items_insert_own"
  ON order_items FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
        AND orders.account_id = my_account_id()
    )
  );

CREATE POLICY "order_items_admin_all"
  ON order_items FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- saved_lists
-- ---------------------------------------------------------------------------
ALTER TABLE saved_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_lists_own"
  ON saved_lists FOR ALL TO authenticated
  USING (account_id = my_account_id())
  WITH CHECK (account_id = my_account_id());

CREATE POLICY "saved_lists_admin_all"
  ON saved_lists FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- saved_list_items
-- ---------------------------------------------------------------------------
ALTER TABLE saved_list_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_list_items_own"
  ON saved_list_items FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM saved_lists
      WHERE saved_lists.id = saved_list_items.list_id
        AND saved_lists.account_id = my_account_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM saved_lists
      WHERE saved_lists.id = saved_list_items.list_id
        AND saved_lists.account_id = my_account_id()
    )
  );

CREATE POLICY "saved_list_items_admin_all"
  ON saved_list_items FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- conversations
-- ---------------------------------------------------------------------------
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations_select_own"
  ON conversations FOR SELECT TO authenticated
  USING (account_id = my_account_id());

-- Auto-created by server action; customers cannot directly INSERT
CREATE POLICY "conversations_admin_all"
  ON conversations FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- messages
-- ---------------------------------------------------------------------------
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_own"
  ON messages FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
        AND conversations.account_id = my_account_id()
    )
  );

CREATE POLICY "messages_insert_own"
  ON messages FOR INSERT TO authenticated
  WITH CHECK (
    sender_profile_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
        AND conversations.account_id = my_account_id()
    )
  );

CREATE POLICY "messages_admin_all"
  ON messages FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- leads
-- Public INSERT (hero form, unauthenticated).
-- Only admin can read.
-- ---------------------------------------------------------------------------
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/authenticated to insert (hero "request account" form)
CREATE POLICY "leads_public_insert"
  ON leads FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "leads_admin_all"
  ON leads FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ---------------------------------------------------------------------------
-- carts
-- ---------------------------------------------------------------------------
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "carts_own"
  ON carts FOR ALL TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- ---------------------------------------------------------------------------
-- cart_items
-- ---------------------------------------------------------------------------
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cart_items_own"
  ON cart_items FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
        AND carts.profile_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
        AND carts.profile_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Realtime: enable for chat tables
-- ---------------------------------------------------------------------------
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
