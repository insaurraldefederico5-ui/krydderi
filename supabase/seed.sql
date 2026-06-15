-- =============================================================================
-- Krydderi — Seed Data
-- Provides 3 business accounts, ~15 products, order history, and an admin.
-- Run AFTER the migrations (0001_schema.sql, 0002_rls.sql).
-- Password for all seed users: Krydderi2024!
-- =============================================================================

-- ─── Accounts ────────────────────────────────────────────────────────────────

INSERT INTO accounts (id, business_name, cvr_number, segment, address, payment_terms_days, min_order_value_ore) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Meyers Bageri A/S',       '12345678', 'bakery',      'Gammel Kongevej 107, 1850 Frederiksberg C', 14, 80000),
  ('a2000000-0000-0000-0000-000000000002', 'Kadeau Restaurant ApS',   '87654321', 'restaurant',  'Wildersgade 10B, 1408 København K',          30, 60000),
  ('a3000000-0000-0000-0000-000000000003', 'Nordic Naturals ApS',     '11223344', 'health_food', 'Nørrebrogade 45, 2200 København N',          14, 50000);

-- ─── Auth users (password: Krydderi2024!) ────────────────────────────────────

-- Admin user
INSERT INTO auth.users (
  id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, aud, role
) VALUES (
  'u0000000-0000-0000-0000-000000000000',
  'juanm.vallejo@outlook.com',
  crypt('Krydderi2024!', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated', 'authenticated'
);

-- Meyers Bageri — owner
INSERT INTO auth.users (
  id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, aud, role
) VALUES (
  'u1000000-0000-0000-0000-000000000001',
  'lars@meyersbageri.dk',
  crypt('Krydderi2024!', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"provider":"email","providers":["email"]}',
  jsonb_build_object('account_id', 'a1000000-0000-0000-0000-000000000001', 'full_name', 'Lars Meyer', 'role', 'customer_owner', 'locale', 'da'),
  'authenticated', 'authenticated'
);

-- Meyers Bageri — member (head baker)
INSERT INTO auth.users (
  id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, aud, role
) VALUES (
  'u1000000-0000-0000-0000-000000000002',
  'bager@meyersbageri.dk',
  crypt('Krydderi2024!', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"provider":"email","providers":["email"]}',
  jsonb_build_object('account_id', 'a1000000-0000-0000-0000-000000000001', 'full_name', 'Sofie Andersen', 'role', 'customer_member', 'locale', 'da'),
  'authenticated', 'authenticated'
);

-- Kadeau — owner
INSERT INTO auth.users (
  id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, aud, role
) VALUES (
  'u2000000-0000-0000-0000-000000000001',
  'anders@kadeau.dk',
  crypt('Krydderi2024!', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"provider":"email","providers":["email"]}',
  jsonb_build_object('account_id', 'a2000000-0000-0000-0000-000000000002', 'full_name', 'Anders Nicolajsen', 'role', 'customer_owner', 'locale', 'da'),
  'authenticated', 'authenticated'
);

-- Nordic Naturals — owner
INSERT INTO auth.users (
  id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, aud, role
) VALUES (
  'u3000000-0000-0000-0000-000000000001',
  'sara@nordicnaturals.dk',
  crypt('Krydderi2024!', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"provider":"email","providers":["email"]}',
  jsonb_build_object('account_id', 'a3000000-0000-0000-0000-000000000003', 'full_name', 'Sara Lindgren', 'role', 'customer_owner', 'locale', 'da'),
  'authenticated', 'authenticated'
);

-- ─── Profiles (trigger handles customer profiles; admin manually) ─────────────

-- Admin profile (trigger skipped because metadata was empty)
INSERT INTO profiles (id, account_id, full_name, role, locale)
SELECT
  'u0000000-0000-0000-0000-000000000000',
  'a1000000-0000-0000-0000-000000000001', -- admin technically linked to Meyers for FK; role gates access
  'Juan Vallejo',
  'admin',
  'da'
ON CONFLICT (id) DO NOTHING;

-- ─── Products (~15) ──────────────────────────────────────────────────────────
-- Prices in øre per kg (ex-MOMS).  1 kr = 100 øre.

INSERT INTO products (id, slug, name_da, name_en, category, origin_country, certifications, description_da, description_en, base_price_ore_per_kg, min_qty_kg, qty_step_kg, lead_time_days, is_active) VALUES

-- Whole spices
('p0000000-0000-0000-0000-000000000001',
 'kardemomme-hel', 'Kardemomme (hel)', 'Cardamom (whole)',
 'whole_spices', 'Guatemala',
 '{"fairtrade": true, "organic": false}',
 'Grønne kardemommefrø direkte fra guatemalanske kooperativer. Intens, frisk aroma — uundværlig i dansk wienerbrød og risalamande.',
 'Green cardamom pods direct from Guatemalan co-ops. Intense, fresh aroma — essential in Danish pastry and rice pudding.',
 31500, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000002',
 'kanel-hel', 'Kanel (hel stænger)', 'Cinnamon (sticks)',
 'whole_spices', 'Sri Lanka',
 '{"fairtrade": false, "organic": false}',
 'Ceylon kanel — mild, sød og kompleks. Ikke at forveksle med cassia.',
 'Ceylon cinnamon — mild, sweet and complex. Not to be confused with cassia.',
 14000, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000003',
 'korianderfrø-hel', 'Korianderfrø (hel)', 'Coriander Seeds (whole)',
 'whole_spices', 'India',
 '{"fairtrade": false, "organic": false}',
 'Hele korianderfrø med floral, citrusagtig note. Ristede eller malede efter behov.',
 'Whole coriander seeds with a floral, citrus note. Toast or grind as needed.',
 8500, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000004',
 'spidskommen-hel', 'Spidskommen (hel)', 'Cumin Seeds (whole)',
 'whole_spices', 'Turkey',
 '{"fairtrade": false, "organic": false}',
 'Tyrkisk spidskommen med dyb, jordagtig smag og lav fugtighed.',
 'Turkish cumin with a deep, earthy flavour and low moisture content.',
 10500, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000005',
 'peber-sort-hel', 'Sort peber (hel)', 'Black Pepper (whole)',
 'whole_spices', 'Vietnam',
 '{"fairtrade": false, "organic": false}',
 'Vietnamesisk sort peber med høj piperin-koncentration og stærk aroma.',
 'Vietnamese black pepper with high piperine concentration and strong aroma.',
 9800, 0.5, 0.5, 2, TRUE),

-- Ground spices
('p0000000-0000-0000-0000-000000000006',
 'gurkemeje-malet', 'Gurkemeje (malet)', 'Turmeric (ground)',
 'ground_spices', 'India',
 '{"fairtrade": false, "organic": false}',
 'Malet gurkemeje fra Andhra Pradesh, Indien. Høj curcumin-indhold (3-5%). Laboratorietestet hvert parti.',
 'Ground turmeric from Andhra Pradesh, India. High curcumin content (3-5%). Lab-tested every batch.',
 9500, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000007',
 'kanel-malet', 'Kanel (malet)', 'Cinnamon (ground)',
 'ground_spices', 'Sri Lanka',
 '{"fairtrade": false, "organic": false}',
 'Malet Ceylon kanel. Ideel til bagværk og varm drik.',
 'Ground Ceylon cinnamon. Ideal for pastry and hot drinks.',
 15500, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000008',
 'korianderfrø-malet', 'Korianderfrø (malet)', 'Coriander (ground)',
 'ground_spices', 'India',
 '{"fairtrade": false, "organic": false}',
 'Nymalet korianderfrø med lysere, mere florale noter end hele frø.',
 'Freshly ground coriander seeds with lighter, more floral notes.',
 9500, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000009',
 'spidskommen-malet', 'Spidskommen (malet)', 'Cumin (ground)',
 'ground_spices', 'Turkey',
 '{"fairtrade": false, "organic": false}',
 'Malet spidskommen fra Tyrkiet. Rig, varm og let nøddeagtig.',
 'Ground cumin from Turkey. Rich, warm and slightly nutty.',
 12000, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000010',
 'paprika-sod-malet', 'Paprika (sød, malet)', 'Paprika (sweet, ground)',
 'ground_spices', 'Spain',
 '{"fairtrade": false, "organic": false}',
 'Sød spansk paprika fra La Vera. Frisk, moderat sød og dekorativ rød farve.',
 'Sweet Spanish paprika from La Vera. Fresh, moderately sweet with decorative red colour.',
 13000, 0.5, 0.5, 2, TRUE),

-- Herbs
('p0000000-0000-0000-0000-000000000011',
 'timian-torret', 'Timian (tørret)', 'Thyme (dried)',
 'herbs', 'Spain',
 '{"fairtrade": false, "organic": false}',
 'Tørret timian fra Spanien med høj ætherisk olie-indhold og intens aroma.',
 'Dried thyme from Spain with high essential oil content and intense aroma.',
 13500, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000012',
 'rosmarin-torret', 'Rosmarin (tørret)', 'Rosemary (dried)',
 'herbs', 'Spain',
 '{"fairtrade": false, "organic": false}',
 'Tørret rosmarin fra Spanien. Hele nåle med kraftig harpiksagtig aroma.',
 'Dried rosemary from Spain. Whole needles with strong resinous aroma.',
 12500, 0.5, 0.5, 2, TRUE),

('p0000000-0000-0000-0000-000000000013',
 'chiliflager', 'Chiliflager', 'Chili Flakes',
 'herbs', 'Spain',
 '{"fairtrade": false, "organic": false}',
 'Tørrede og knuste chiliflager fra Spanien. Moderat styrke, god farve.',
 'Dried and crushed chili flakes from Spain. Moderate heat, good colour.',
 16000, 0.5, 0.5, 2, TRUE),

-- Blends
('p0000000-0000-0000-0000-000000000014',
 'nordic-dukkah', 'Nordic Dukkah', 'Nordic Dukkah',
 'blends', 'Denmark',
 '{"fairtrade": false, "organic": false}',
 'Vores signatur-blend: hasselnødder, korianderfrø, spidskommen og timian. Fremstillet i København.',
 'Our signature blend: hazelnuts, coriander, cumin and thyme. Made in Copenhagen.',
 21500, 0.25, 0.25, 3, TRUE),

-- Organic
('p0000000-0000-0000-0000-000000000015',
 'gurkemeje-oko-malet', 'Gurkemeje (øko, malet)', 'Turmeric (organic, ground)',
 'organic', 'India',
 '{"eu_organic": true, "fairtrade": true, "organic": true}',
 'EU-certificeret økologisk gurkemeje. Samme høje curcumin-indhold. For brands med øko-profil.',
 'EU-certified organic turmeric. Same high curcumin content. For brands with organic credentials.',
 11500, 0.5, 0.5, 3, TRUE);

-- ─── Account-specific pricing (negotiated discounts) ──────────────────────────

-- Meyers Bageri: better price on high-volume items (cardamom, cinnamon)
INSERT INTO account_pricing (account_id, product_id, price_ore_per_kg) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 28500), -- Cardamom whole  (315→285 kr)
  ('a1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000007', 13500), -- Cinnamon ground (155→135 kr)
  ('a1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000002', 12500); -- Cinnamon sticks (140→125 kr)

-- Kadeau: better price on herbs and turmeric
INSERT INTO account_pricing (account_id, product_id, price_ore_per_kg) VALUES
  ('a2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000006', 8500), -- Turmeric        (95→85 kr)
  ('a2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000011', 12000), -- Thyme           (135→120 kr)
  ('a2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000012', 11000); -- Rosemary        (125→110 kr)

-- Nordic Naturals: better price on organic and high-volume
INSERT INTO account_pricing (account_id, product_id, price_ore_per_kg) VALUES
  ('a3000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000015', 9800), -- Organic turmeric (115→98 kr)
  ('a3000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000006', 8000); -- Turmeric        (95→80 kr)

-- ─── Saved lists ("My usuals") ────────────────────────────────────────────────

INSERT INTO saved_lists (id, account_id, name, created_by) VALUES
  ('l1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Wienerbrød & kager', 'u1000000-0000-0000-0000-000000000001'),
  ('l2000000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000002', 'Ukentlig ordre',     'u2000000-0000-0000-0000-000000000001'),
  ('l3000000-0000-0000-0000-000000000001', 'a3000000-0000-0000-0000-000000000003', 'Månedlig basis',     'u3000000-0000-0000-0000-000000000001');

INSERT INTO saved_list_items (list_id, product_id, qty_kg) VALUES
  -- Meyers: cardamom-heavy
  ('l1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 5.0),
  ('l1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000007', 3.0),
  ('l1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000002', 2.0),

  -- Kadeau: herbs + turmeric
  ('l2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000006', 2.0),
  ('l2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000011', 1.5),
  ('l2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000012', 1.5),
  ('l2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000010', 1.0),

  -- Nordic Naturals: organics
  ('l3000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000015', 5.0),
  ('l3000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000014', 2.0);

-- ─── Order history ─────────────────────────────────────────────────────────────
-- 3 orders per account (placed, shipped, delivered)

-- Meyers Bageri orders
INSERT INTO orders (id, account_id, placed_by, status, subtotal_ore, moms_ore, total_ore, requested_delivery_date, created_at) VALUES

  ('o1000000-0000-0000-0000-000000000001',
   'a1000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000001',
   'delivered', 348500, 87125, 435625,
   '2026-05-20', '2026-05-18 09:12:00+02'),

  ('o1000000-0000-0000-0000-000000000002',
   'a1000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000002',
   'invoiced', 285000, 71250, 356250,
   '2026-06-03', '2026-05-31 14:05:00+02'),

  ('o1000000-0000-0000-0000-000000000003',
   'a1000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000001',
   'confirmed', 427000, 106750, 533750,
   '2026-06-18', '2026-06-14 08:30:00+02');

-- Meyers order items
INSERT INTO order_items (order_id, product_id, qty_kg, unit_price_ore_per_kg, line_subtotal_ore) VALUES
  -- Order 1
  ('o1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 5.0, 28500, 142500),
  ('o1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000007', 3.0, 13500, 40500),
  ('o1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000002', 2.0, 12500, 25000),
  ('o1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000005', 3.0,  9800, 29400),
  ('o1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000009', 2.5, 12000, 30000),
  ('o1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000010', 2.0, 13000, 26000),
  ('o1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000006', 2.0,  9500, 19000),
  ('o1000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000014', 1.0, 21500, 21500),

  -- Order 2
  ('o1000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000001', 5.0, 28500, 142500),
  ('o1000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000007', 3.0, 13500,  40500),
  ('o1000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000002', 2.0, 12500,  25000),
  ('o1000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000011', 2.0, 13500,  27000),
  ('o1000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000013', 1.5, 16000,  24000),
  ('o1000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000004', 2.5, 10500,  26250),

  -- Order 3
  ('o1000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000001', 7.0, 28500, 199500),
  ('o1000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000007', 5.0, 13500,  67500),
  ('o1000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000002', 3.0, 12500,  37500),
  ('o1000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000014', 2.0, 21500,  43000),
  ('o1000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000009', 2.0, 12000,  24000),
  ('o1000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000003', 3.0,  8500,  25500),
  ('o1000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000008', 1.5,  9500,  14250),
  ('o1000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000005', 1.5,  9800,  14700);

-- Kadeau Restaurant orders
INSERT INTO orders (id, account_id, placed_by, status, subtotal_ore, moms_ore, total_ore, requested_delivery_date, created_at) VALUES

  ('o2000000-0000-0000-0000-000000000001',
   'a2000000-0000-0000-0000-000000000002', 'u2000000-0000-0000-0000-000000000001',
   'delivered', 124000, 31000, 155000,
   '2026-05-22', '2026-05-21 11:30:00+02'),

  ('o2000000-0000-0000-0000-000000000002',
   'a2000000-0000-0000-0000-000000000002', 'u2000000-0000-0000-0000-000000000001',
   'shipped', 98500, 24625, 123125,
   '2026-06-05', '2026-06-03 16:00:00+02'),

  ('o2000000-0000-0000-0000-000000000003',
   'a2000000-0000-0000-0000-000000000002', 'u2000000-0000-0000-0000-000000000001',
   'placed', 87500, 21875, 109375,
   '2026-06-19', '2026-06-15 09:00:00+02');

INSERT INTO order_items (order_id, product_id, qty_kg, unit_price_ore_per_kg, line_subtotal_ore) VALUES
  -- Kadeau order 1
  ('o2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000006', 4.0,  8500, 34000),
  ('o2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000011', 3.0, 12000, 36000),
  ('o2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000012', 2.0, 11000, 22000),
  ('o2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000010', 2.0, 13000, 26000),
  ('o2000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000013', 0.5, 16000,  8000),

  -- Kadeau order 2
  ('o2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000006', 3.0,  8500, 25500),
  ('o2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000011', 2.5, 12000, 30000),
  ('o2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000012', 2.0, 11000, 22000),
  ('o2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000004', 1.0, 10500, 10500),
  ('o2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000009', 0.5, 12000,  6000),
  ('o2000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000005', 0.5,  9800,  4900),

  -- Kadeau order 3
  ('o2000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000006', 3.0,  8500, 25500),
  ('o2000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000011', 2.0, 12000, 24000),
  ('o2000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000012', 2.0, 11000, 22000),
  ('o2000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000014', 0.5, 21500, 10750),
  ('o2000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000010', 0.4, 13000,  5200);

-- Nordic Naturals orders
INSERT INTO orders (id, account_id, placed_by, status, subtotal_ore, moms_ore, total_ore, requested_delivery_date, created_at) VALUES

  ('o3000000-0000-0000-0000-000000000001',
   'a3000000-0000-0000-0000-000000000003', 'u3000000-0000-0000-0000-000000000001',
   'invoiced', 223000, 55750, 278750,
   '2026-05-15', '2026-05-13 10:00:00+02'),

  ('o3000000-0000-0000-0000-000000000002',
   'a3000000-0000-0000-0000-000000000003', 'u3000000-0000-0000-0000-000000000001',
   'delivered', 188500, 47125, 235625,
   '2026-06-02', '2026-05-30 13:30:00+02'),

  ('o3000000-0000-0000-0000-000000000003',
   'a3000000-0000-0000-0000-000000000003', 'u3000000-0000-0000-0000-000000000001',
   'confirmed', 195000, 48750, 243750,
   '2026-06-20', '2026-06-14 11:00:00+02');

INSERT INTO order_items (order_id, product_id, qty_kg, unit_price_ore_per_kg, line_subtotal_ore) VALUES
  -- Nordic order 1
  ('o3000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000015', 10.0, 9800,  98000),
  ('o3000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000006',  8.0, 8000,  64000),
  ('o3000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000014',  2.0, 21500, 43000),
  ('o3000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000003',  2.0, 8500,  17000),

  -- Nordic order 2
  ('o3000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000015', 8.0,  9800,  78400),
  ('o3000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000006', 8.0,  8000,  64000),
  ('o3000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000001', 1.0, 31500,  31500),
  ('o3000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000014', 0.5, 21500,  10750),
  ('o3000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000008', 0.5,  9500,   4750),

  -- Nordic order 3
  ('o3000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000015', 10.0, 9800,  98000),
  ('o3000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000006',  8.0, 8000,  64000),
  ('o3000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000014',  1.5, 21500, 32250),
  ('o3000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000003',  0.5, 8500,   4250);

-- ─── Conversations (one per account) + welcome messages ──────────────────────

INSERT INTO conversations (id, account_id) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001'),
  ('c2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002'),
  ('c3000000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003');

-- Welcome messages from admin
INSERT INTO messages (conversation_id, sender_profile_id, body, created_at) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'u0000000-0000-0000-0000-000000000000',
   'Hej Lars, velkommen til Krydderi-portalen! Din konto er opsat og klar. Skriv hertil hvis du har spørgsmål til sortimentet eller priserne.',
   NOW() - INTERVAL '20 days'),

  ('c2000000-0000-0000-0000-000000000002', 'u0000000-0000-0000-0000-000000000000',
   'Hej Anders, portalen er klar til jer. I kan bestille og genbestille direkte her. Skriv hvis I vil diskutere et nyt produkt til menuen.',
   NOW() - INTERVAL '15 days'),

  ('c3000000-0000-0000-0000-000000000003', 'u0000000-0000-0000-0000-000000000000',
   'Hej Sara, velkommen! Jeres øko-gurkemeje er sat til jeres forhandlede pris. Lab-certifikater ligger på produktsiderne. Kontakt os bare her.',
   NOW() - INTERVAL '10 days');

-- ─── Carts (empty carts for each customer profile) ───────────────────────────

INSERT INTO carts (profile_id) VALUES
  ('u1000000-0000-0000-0000-000000000001'),
  ('u1000000-0000-0000-0000-000000000002'),
  ('u2000000-0000-0000-0000-000000000001'),
  ('u3000000-0000-0000-0000-000000000001');

-- ─── Sample leads ─────────────────────────────────────────────────────────────

INSERT INTO leads (business_name, contact_name, email, phone, segment, message, status) VALUES
  ('Juno The Bakery', 'Emil Hansen', 'emil@junothebakery.com', '+45 33 25 56 77', 'bakery',
   'Vi bruger ca. 20 kg kardemomme og 10 kg kanel om måneden. Er I billigere end vores nuværende?', 'contacted'),
  ('Lyst Restaurant', 'Mia Skov', 'mia@lystrestaurant.dk', NULL, 'restaurant',
   'Interesseret i jeres urter og blandinger til vores nye menu.', 'new');
