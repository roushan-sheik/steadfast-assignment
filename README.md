## Getting Started

# Steadfast Assignment – Frontend

> ⚠️ **Important Note**
>
> The **Products API does not work properly after deployment to Vercel** due to a **CORS error**.
> Vercel enforces **HTTPS-only** requests, but the current API endpoint uses **HTTP**, which is treated as insecure in production environments.
>
> **API Endpoint:**  
> `http://157.230.240.97:9999/api/v1/shop/products`
>
> ✅ To fix this in production, ensure the API supports **HTTPS**.

🌐 **Live Demo**: [https://steadfast-assignment-esuc.vercel.app/products](https://steadfast-assignment-esuc.vercel.app/products)

This is the frontend for the **Steadfast Assignment** built using [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/). It also uses [React Query](https://tanstack.com/query/latest) for data fetching and caching.

---

![Desktop Preview](./public/assets/desktop-preview.png)
![Mobile Preview](./public/assets/mobile-preview.png)

## 🚀 Features

- Next.js App Router
- TypeScript support
- Tailwind CSS styling
- React Query for data fetching
- ESLint + Prettier configured
- Production-ready build scripts
- Lucide react (Icons)
- Reduxt Toolkit & RTK Query

---

## 📦 Getting Started Locally

### 1. Clone the Repository

```bash
https://github.com/roushan-sheik/steadfast-assignment
```

```bash
cd steadfast-assignment
```

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Domain-Driven Frontend Architecture (DDD)

This project follows a **Domain-Driven Folder Structure** within the `src/` directory.  
Instead of organizing by file type (e.g., components, hooks, utils), it organizes by **domain context** such as `product`, `user`, `cart`, etc.

This approach aligns with the principles of **Domain-Driven Design (DDD)**, encouraging:

- Better code modularity
- Clear separation of concerns
- High reusability and testability
- Scalable structure for large codebases

---

## Root Structure: `src/`

Files inside `src/` are organized **by domain**.  
A **domain** refers to a specific feature or entity like `product`, `user`, `checkout`, etc.

---

## Domain-Based Folder Convention

Each domain will maintain its own folder where all relevant code resides:

- `src/components/{domain}` → UI components (`ProductCard.tsx`, `UserProfile.tsx`)
- `src/constants/{domain}` → Domain-specific constants
- `src/models/{domain}` → TypeScript interfaces and models
- `src/hooks/{domain}` → Custom hooks for that domain
- `src/infrastructure/{domain}` → API calls, queries, and data access logic

---

## `components/` – UI Components

All reusable and domain-specific UI components live here.

```bash
components/
├── product/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
├── user/
│   ├── UserProfile.tsx
└── layout/
    ├── Header.tsx
    ├── Footer.tsx
    ├── Subscribe.tsx
```

## `infrastructure/` – Data Access & API Logic

Used for handling data fetching, API clients, and TanStack React Query integrations.
This layer abstracts HTTP logic away from components and centralizes domain-based API behavior

```bash
    infrastructure/
    ├── blog/
    │   ├── blogAPIClient.ts          # Core API functions for "blog" domain
    │   ├── utils/
    │   │   ├── queries.ts            # React Query queryFn + configuration
    │   │   ├── keys.ts               # Query keys used in React Query
    │   │   ├── types.ts              # Request/Response types for the product API
    │   └── index.ts                  # Optional barrel file for product infrastructure
    │
    ├── portfolio/
    │   ├── portfolioApiBoundary.ts   # API logic for portfolio domain
    │   ├── utils/
    │   │   ├── queries.ts            # React Query hooks/config
    │   │   ├── keys.ts               # Query keys
    │   │   ├── types.ts              # Types for portfolio requests/responses
    │   └── index.ts
```
