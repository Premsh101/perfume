# Shrinika Fragrances

Full-stack fragrance storefront and connected admin studio. React/Vinext on Cloudflare Workers, D1 database, R2 product images, and Razorpay Standard Checkout integration.

## Experiences

- `/`: cinematic homepage with interactive Three.js bottle and editable brand sections.
- `/shop`, `/products/:slug`: catalogue filters, sorting, product notes, sizes, inventory and pricing.
- `/cart`, `/checkout`: persistent basket, server-priced offers, delivery details, guest/account checkout.
- `/account`: supported Sites ChatGPT sign-in and customer profile; order history.
- `/orders/:id`, `/track`: customer-isolated orders, private guest access codes, fulfilment history, carrier link and printable invoice/receipt.
- `/admin`: owner-authorised product/variant/stock management, drag/drop image uploads, promotions, fulfilment, payment reconciliation, site settings and visual CMS.
- CMS: click-to-edit homepage text; drag or keyboard-reorder sections; hide/show sections; save draft or publish. Product and price saves apply directly.

## Run and build

Node 24 and pnpm 10+ are recommended. Install the locked dependencies with `pnpm install --frozen-lockfile`. Run `python3 download-assets.py` to restore locally hosted Unsplash images and pinned Three.js. Then `pnpm run build`. The supplied Sites helpers manage hosted builds and D1 migration application. For a standalone local runtime, apply `drizzle/0000_loving_mandroid.sql` through Wrangler using `dist/server/wrangler.json`, then `pnpm start`. Sites sign-in is platform-owned; standalone hosting requires an authentication integration before accepting accounts or admin access.

## Configuration

Set variables in the hosting runtime, not client code. `ADMIN_EMAILS` is an allowlist checked against the platform-verified identity; `ADMIN_USER_IDS` can also be used. Admin configuration is already set for the connected Site owner. Public users cannot self-register as administrators.

`COMMERCE_MODE=demo` starts no-charge demo orders. Test keys beginning `rzp_test_` enable Razorpay test integration. Set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET`. Configure Razorpay auto-capture and webhook events `payment.captured` and `order.paid` at `/api/commerce/webhook`. The webhook requires a publicly accessible deployment; owner-private review access blocks external Razorpay requests. Credentials are not supplied in this repository.

Set `COMMERCE_MODE=live` only after an actual provider test transaction, customer catalogue approval, final seller details and policy review. Live checkout additionally rejects concept products or incomplete seller/support information. Keys must begin `rzp_live_`. Never mark an order paid based only on the browser callback: signatures are verified server-side, then the payment is fetched and checked for captured status, exact amount, currency and provider order ID. Webhooks validate the raw-body HMAC. No raw payment-card data is collected by this application.

## Data and operations

Server-side pricing is authoritative. Order snapshots retain line prices, delivery details and seller settings. D1 atomic batches reserve stock and use a nonnegative-stock constraint to prevent overselling; idempotency keys prevent duplicate local orders. Unpaid reservations currently remain allocated until an operator reviews them; automated expiry/release, refunds, cancellation and carrier webhooks are follow-up integrations. A provider network timeout leaves the order in `provider_review` for reconciliation rather than automatically creating another charge.

Order fulfilment is manual in Admin: confirmed → preparing → shipped (carrier/AWB/link) → delivered. Automatic carrier status, email/SMS notifications and provider refunds are not connected. Receipts can be printed or saved as PDF; jurisdiction-specific tax invoicing/HSN/GST calculation needs seller/accounting configuration before commercial launch.

Customer sign-in uses Sites' supported ChatGPT authentication; this is not a separate email/password or phone OTP identity service. Guest checkout avoids creating a customer profile. Keep guest tracking codes private. The hosted review Site remains owner-private until explicitly opened for public shoppers.

## Verification

`npx tsc --noEmit` and the production build pass. `node tests/api.test.mjs` exercises backend pricing, coupon rules, guest isolation, admin protection, CSRF origin enforcement, checkout idempotency, stock transaction rollback, order updates, content drafts, and Razorpay signature/capture/webhook flows using in-memory SQLite and a mocked provider. No real Razorpay transaction has been made. Browser visual and interaction QA still requires a supported browser environment.

## Sources

Stock photographs: Unsplash URLs in `asset-sources.json`. Three.js 0.170.0: MIT licensed, original license header retained. Fonts: Cormorant Garamond and Manrope, served by Google Fonts with system fallbacks. Product names, notes, prices and availability begin as editable sample data. The YouTube reference could not be retrieved, so its exact animation has not been replicated.

The GitHub repository stores editable source. Sites uses a separate hosting source remote; GitHub pushes do not automatically redeploy the Site.
