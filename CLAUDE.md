# CLAUDE.md — Krydderi B2B Spice Portal

## What this project is
A B2B customer ordering portal for a Copenhagen-based spice import &
distribution business. Customers are commercial food businesses (restaurants,
bakeries, pastry chains, food manufacturers, health-food producers) who buy
spices and herbs in bulk (kg quantities) and reorder regularly. This is a
professional procurement tool, not a consumer shop.

## North-star use case
A head chef, on their phone, in a loud kitchen, reorders their regular spices
in under 30 seconds. Optimize everything for fast, confident reordering by
busy professionals. Discovery and browsing are secondary.

## Non-negotiable business rules
- **Currency:** DKK only. Format `da-DK`: `1.234,56 kr.`
- **VAT (MOMS):** 25%. Show prices EX-MOMS by default (B2B buyers reclaim VAT).
  Always display: line subtotal (ex), MOMS amount, total (inc) separately.
- **Account-specific pricing:** every product price is resolved for the
  logged-in business account. A `products` table holds a base price; a
  `account_pricing` table overrides per account. NEVER show a generic price to
  a logged-in user — always resolve their price server-side.
- **Invoiced, not card-paid (v1):** customers order on Net terms (e.g. Net 14).
  No payment gateway in v1. Keep a clean integration seam for MobilePay/Stripe.
- **Minimum order value:** each account has a `min_order_value_dkk`. Block
  checkout below it with a clear message.
- **Units:** products are sold and ordered in **kilograms**. Allow decimals
  (e.g. 2,5 kg). Some products have a minimum quantity (`min_qty_kg`) and a
  step (`qty_step_kg`).
- **Invite-only signup.** No public registration. I create the account + set
  pricing, the app emails an invite. Self-signup form on the hero page only
  captures a *lead*; it does not create an account.

## Roles
- `customer_owner` — owns a business account, can invite members, sees billing.
- `customer_member` — places/reorders, sees catalog + history, no billing admin.
- `admin` — me, the supplier. Full back office.

## Tech stack
- Next.js (App Router, TypeScript, strict).
- Supabase: Postgres + Auth + RLS + Storage + Realtime. Region: eu-central-1.
- Tailwind + shadcn/ui. next-intl (da default, en available).
- React Hook Form + Zod. Resend for transactional email. Recharts for charts.
- Vercel hosting.

## Architecture conventions
- Server Components by default. Client Components only for cart, chat, charts,
  and interactive forms.
- All DB access through a typed data layer in `/lib/data/*`. No inline Supabase
  calls in components.
- Mutations via Server Actions; validate with Zod on the server first.
- RLS policies live in SQL migrations under `/supabase/migrations`, version
  controlled. Default-deny; a user only ever touches rows for their own
  `account_id`. Admin role bypasses via a policy that checks the role claim.
- i18n: no hardcoded user-facing strings; use translation keys.
- Money stored as integer **øre** (1 kr = 100 øre) to avoid float errors.
  Format only at the display edge.

## Data model (core tables)
- `accounts` — id, business_name, cvr_number, segment (bakery|restaurant|
  manufacturer|health_food|distributor), address, payment_terms_days,
  min_order_value_ore, created_at.
- `profiles` — id (= auth.users.id), account_id, full_name, role, locale,
  phone.
- `products` — id, slug, name_da, name_en, category, origin_country,
  certifications (jsonb: organic/fairtrade/kosher...), description_da,
  description_en, base_price_ore_per_kg, min_qty_kg, qty_step_kg, lead_time_days,
  coa_file_path (Storage), image_path, is_active.
- `account_pricing` — account_id, product_id, price_ore_per_kg (overrides base).
- `orders` — id, account_id, placed_by (profile), status (placed|confirmed|
  shipped|delivered|invoiced|cancelled), subtotal_ore, moms_ore, total_ore,
  requested_delivery_date, notes, created_at.
- `order_items` — order_id, product_id, qty_kg, unit_price_ore_per_kg,
  line_subtotal_ore (price snapshot at time of order — never recompute from
  current price).
- `saved_lists` — id, account_id, name, created_by.
- `saved_list_items` — list_id, product_id, qty_kg.
- `conversations` — id, account_id, created_at. (one per account in v1)
- `messages` — id, conversation_id, sender_profile_id, body, attachment_path,
  created_at, read_at.
- `leads` — id, business_name, contact_name, email, phone, segment, message,
  created_at, status (new|contacted|converted|lost).
- `carts` / `cart_items` — persistent cart per profile.

Key invariant: **order_items store a price snapshot.** Historical orders must
always reflect the price actually paid, even if the product's price changes
later.

## What NOT to do
- Don't build a payment gateway in v1.
- Don't allow public self-registration.
- Don't show prices to logged-out users.
- Don't recompute historical order totals from current prices.
- Don't store money as floats.
- Don't put business logic in client components.
- Don't hardcode Danish or English strings.

## Tone & content
Professional, calm, trustworthy. The brand promise: "Same certified quality as
your German supplier, delivered from Copenhagen, at a better price, with full
traceability." Lean into origin transparency (Guatemala cardamom co-op, Indian
turmeric with lab certs) and reliability. Avoid hype.