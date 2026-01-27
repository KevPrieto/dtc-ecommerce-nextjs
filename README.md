# VÉRA

![VÉRA Skincare](/public/vera-logo.png)

A direct-to-consumer ecommerce platform for premium skincare.

---

## Project Overview

VÉRA is a fictional DTC skincare brand built as a portfolio demonstration. The project showcases production-grade ecommerce architecture: real database integration, payment processing, authentication, and a complete purchase flow.

This is not a tutorial project. It is a working ecommerce system designed to demonstrate the kind of architecture, code quality, and product thinking that translates directly to client work.

**Who this is for:**

- Technical reviewers evaluating development capability
- Non-technical stakeholders assessing project approach
- Clients considering ecommerce development partnerships

---

## Why This Project Exists

Ecommerce is one of the most common and most demanding categories of web development. It requires:

- Reliable data handling across inventory, pricing, and orders
- Secure payment processing with proper error handling
- User experience that builds trust and reduces friction
- Architecture that can evolve as business requirements change

Rather than building a project that demonstrates every possible feature, VÉRA intentionally limits scope to demonstrate good judgment. The goal is clarity over complexity.

**Why DTC skincare specifically:**

Premium DTC brands have high expectations for both technical execution and visual design. They represent the kind of client work where attention to detail matters. Building for this vertical demonstrates an understanding of the intersection between product, brand, and engineering.

---

## Core Features

- **Product Catalog** — Server-rendered product listing with category filtering
- **Product Detail Pages** — Variant selection, pricing display, add-to-cart functionality
- **Shopping Cart** — Persistent client-side cart with real-time updates
- **Checkout Flow** — Stripe Checkout integration in test mode
- **User Authentication** — Email/password authentication with Supabase Auth
- **Order History** — Authenticated users can view past orders
- **Guest Checkout** — No forced account creation before purchase

Each feature follows the same principle: do less, but do it correctly.

---

## Architecture and Technical Decisions

### Why Next.js App Router

The App Router provides native support for React Server Components, which allows product data to be fetched and rendered on the server without client-side JavaScript overhead. This improves initial page load performance and SEO while keeping the codebase straightforward.

Route groups organize the application by user context: `(shop)`, `(auth)`, `(checkout)`, and `(account)`. Each group can have its own layout, which means the checkout flow uses a distraction-free minimal header while the main shop includes full navigation.

### Why Supabase

Supabase provides a PostgreSQL database with a straightforward SDK, built-in authentication, and row-level security. For a project of this scope, it eliminates the need to build and maintain a custom backend while still using a real relational database.

The alternative would be building an API layer from scratch or using a more complex backend framework. Neither adds value for demonstrating ecommerce patterns.

### Why Stripe Checkout

Stripe Checkout handles the sensitive parts of payment processing: card validation, PCI compliance, and error messaging. Redirecting to Stripe rather than building a custom checkout form is the correct tradeoff for most ecommerce projects.

Custom payment forms introduce security liability and development complexity that rarely benefits the end user. Stripe Checkout is also mobile-optimized and supports multiple payment methods without additional work.

### Why Limited Client State

The cart uses Zustand with localStorage persistence. Everything else is server-rendered or fetched on demand.

This is intentional. Client-side state management adds complexity that compounds over time. By keeping client state minimal — just the cart — the application remains predictable and easier to debug.

### Why Framer Motion is Used Sparingly

Motion can improve user experience when it provides feedback or guides attention. It can also distract users and slow perceived performance when overused.

VÉRA uses subtle transitions where they serve a purpose. The priority is a calm, confident aesthetic rather than visual novelty.

---

## UX and Product Philosophy

### Calm Over Flashy

The visual design uses neutral tones, generous whitespace, and restrained typography. This reflects the kind of aesthetic that premium skincare brands typically require. It also demonstrates an understanding that ecommerce design should build trust, not compete for attention.

### Clarity Over Creativity

Every page has a clear purpose. The product detail page focuses on the product. The checkout flow removes distractions. The cart provides straightforward controls.

Creative design decisions are welcome when they improve usability. They are not welcome when they add friction or confusion.

### Trust Over Novelty

Users need to trust an ecommerce site before they provide payment information. Trust comes from predictable behavior, clear pricing, and professional presentation.

Novel interactions can undermine trust if they make users feel uncertain about what will happen next.

### Fewer Features, Better Executed

It would be easy to add wishlists, reviews, promotional banners, and popup modals. Each of these features adds code to maintain, edge cases to handle, and decisions to make.

VÉRA includes the features that matter for a complete purchase flow. Everything else is omitted intentionally.

---

## What This Project Does Not Include

The following features are deliberately excluded:

| Exclusion | Rationale |
|-----------|-----------|
| Admin dashboard | Adds significant complexity without demonstrating customer-facing skills |
| Promotional engine | Requires business logic that varies by client; better built per-project |
| Product reviews | Social proof features need moderation systems and real data to be meaningful |
| Multi-language support | Internationalization should be implemented when there is a real use case |
| Advanced inventory management | Backend operational tools are separate from storefront architecture |
| Email notifications | Transactional email is typically handled by external services |

These exclusions are not gaps. They are the result of scoping a project to demonstrate competence rather than feature count.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| React | React 19 |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Animation | Framer Motion (minimal) |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| Payments | Stripe Checkout (test mode) |
| State Management | Zustand (cart only) |
| Deployment | Vercel |

---

## How This Project Is Meant To Be Used

VÉRA is a portfolio project and conversation piece. It is not intended for production deployment without additional work.

**For technical reviewers:**
The codebase demonstrates architecture decisions, component organization, and data handling patterns. Browse the route structure, examine the Supabase integration, and review how Server Components are used for data fetching.

**For hiring managers and clients:**
This project shows how I approach ecommerce development. The README explains my reasoning. The code shows my execution. The scope demonstrates my judgment about what matters and what does not.

**For adaptation to real projects:**
The patterns here — route groups, server-side data fetching, Stripe integration, auth middleware — transfer directly to client work. The specific implementation would need to be adapted to each client's requirements, database schema, and business rules.

---

## Local Development

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Add your Supabase and Stripe credentials to .env.local
# Then start the development server
npm run dev
```

The application requires:
- Supabase project with configured tables
- Stripe account in test mode
- Environment variables for both services

See `docs/database-schema.md` for the required table structure.

---

## Author Note

I built VÉRA to demonstrate how I think about ecommerce development.

Most portfolio projects optimize for visible features. This one optimizes for the things that matter in real client work: clear architecture, sensible tradeoffs, and code that is easy to understand and modify.

If you are evaluating developers for an ecommerce project, I would be glad to discuss how this architecture could be adapted to your specific requirements.

---

<p align="center">
  <img src="/public/products/vitamin-c-serum.png" width="120" alt="Vitamin C Serum" />
  <img src="/public/products/hyaluronic-serum.png" width="120" alt="Hyaluronic Serum" />
  <img src="/public/products/daily-moisturizer.png" width="120" alt="Daily Moisturizer" />
  <img src="/public/products/mineral-sunscreen-spf50.png" width="120" alt="Mineral Sunscreen" />
</p>

<p align="center"><sub>Product imagery from VÉRA catalog</sub></p>
