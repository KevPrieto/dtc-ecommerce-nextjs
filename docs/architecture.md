# Architecture & Repository Structure Design

## 1. Repository Folder Structure

This structure prioritizes separation of concerns, scalability for a mid-sized ecommerce, and clarity for reviewers.

```
/
├── app/                        # Next.js App Router root
│   ├── (auth)/                 # Route group for authentication (signin, signup)
│   ├── (shop)/                 # Route group for browsing (products, collections)
│   ├── (checkout)/             # Route group for checkout flow (distraction-free)
│   ├── (account)/              # Route group for user dashboard (protected)
│   ├── api/                    # Route handlers (webhooks, auth callback)
│   ├── layout.tsx              # Root layout (providers, global styles)
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # shadcn/ui primitives (Button, Input, etc.)
│   ├── shop/                   # Shop-specific components (ProductCard, CartDrawer)
│   ├── layout/                 # Global layout components (Header, Footer)
│   └── account/                # Account dashboard components
├── lib/
│   ├── supabase/               # Supabase clients (server/client)
│   ├── stripe/                 # Stripe SDK instantiation
│   └── utils.ts                # cn() and other helpers
├── styles/
│   └── globals.css             # Global Tailwind imports
├── types/                      # Shared TypeScript definitions (DB, Product, Cart)
├── public/                     # Static assets
├── docs/                       # Project documentation (PRD, Architecture)
└── middleware.ts               # Auth protection & routing logic
```

### Rationale
*   **Router Groups `(...)`**: Used to separate layouts. The `(checkout)` group, for instance, might want a stripped-down header/footer compared to `(shop)`.
*   **components/ui**: Dedicated home for generic design system components (shadcn), distinct from domain-specific business logic components.
*   **lib/**: Centralized logic. Supabase and Stripe clients are singletons or factories here.

## 2. App Router Architecture

### Core Routes
*   `/` (Landing) -> **Server Component**. High performance, static content.
*   `/(shop)/products` -> **Server Component**. Fetches list of products.
*   `/(shop)/products/[slug]` -> **Server Component**. Fetches product details.
*   `/(checkout)/cart` -> **Client Component**. Interactive, manages local state.
*   `/(checkout)/checkout` -> **Server + Client**. Stripe elements are client-side, but might fetch session on server.
*   `/(account)/orders` -> **Server Component**. Fetches user orders.
*   `/(auth)/login` -> **Client Component**. Form handling.

### Server vs. Client Components
*   **Default to Server Components** for all catalogue browsing (SEO, Performance).
*   **Client Components** explicitly for:
    *   Cart interactions (Zustand store binding).
    *   Interactive forms (Login, Address inputs).
    *   User interactivity (Modals, Dropdowns).
    *   Stripe Elements provider wrapping.

### Route Groups
*   `(shop)`: Applies the standard persistent Header/Footer layout.
*   `(auth)`: Centered layout, focused on forms.
*   `(checkout)`: Minimal layout (logo only, no navigation) to reduce cart abandonment.
*   `(account)`: Sidebar layout for navigation between Profile/Orders.

## 3. Data & Logic Boundaries

### Supabase (Data)
*   **Location**: `lib/supabase/server.ts` (for Server Components), `lib/supabase/client.ts` (for Client Components).
*   **Pattern**: Server Components fetch data directly from DB. Client components (almost) never fetch data directly; they use Server Actions or API routes if mutation is needed, or props passed down.
*   **Auth**: Handled via `middleware.ts` for route protection and referencing `auth-helpers`.

### Stripe (Payments)
*   **Location**: `lib/stripe/server.ts` (Secret Key), `lib/stripe/client.ts` (Public Key).
*   **Logic**: Checkout session creation happens in a Server Action (`actions/checkout.ts`). Webhook handling in `app/api/webhooks/stripe/route.ts`.

### Product Data
*   **Access**: Server-Server. Database -> Server Component -> UI. No client-side `useEffect` fetching for initial data.

### Cart State
*   **Location**: Client-side strictly.
*   **Implementation**: `zustand` store with `persist` middleware (simulated persistence).
*   **Boundary**: Cart items live in local storage. Sync validation happens only at Checkout initiation.

## 4. Conventions & Guardrails

### Naming Conventions
*   **Folders**: kebab-case (`product-card`, `auth-flow`).
*   **Components**: PascalCase (`ProductCard.tsx`).
*   **Functions**: camelCase (`formatPrice`).
*   **Route Groups**: Parentheses `(group-name)`.

### "What NOT to do" (Stop-lists)
*   **No Redux**: Overkill. Use Zustand.
*   **No Client-Side Data Fetching**: Avoid `swr` or `react-query` for this scale. Use Server Components.
*   **No complex "Service Layer" classes**: Just simple functions in `lib/` or Server Actions.
*   **No "utils" junk drawer**: Categorize helpers (e.g., `lib/formatters.ts` vs `lib/validators.ts`).

### Guardrails for PRD Adherence
*   **Optimization**: Do not optimize images/fonts aggressively unless it visibly impacts load time.
*   **Abstraction**: Don't build a generic "CMS adapter". Hardcode the SQL queries for Supabase.
*   **Styling**: Use Tailwind utility classes. Do not create `.module.css` files unless absolutely necessary for complex animations.
