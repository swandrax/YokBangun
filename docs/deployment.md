# Deployment Guide — yokBangun Company Profile

This document details the production deployment, DNS, and hosting strategies for **yokBangun — growth with u** (`company-profile`).

---

## Architecture Overview

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (Strict mode)
- **Styling**: Vanilla CSS Modules with custom design tokens (`app/globals.css`)
- **State Management**:
  - Zustand (client-only UI state: `language-store.ts`, `ui-store.ts`)
  - TanStack React Query (server state & caching: products, case studies)
- **Animation**:
  - Motion (`motion/react` with `LazyMotion` and `domMax` feature bundle)
  - Anime.js v4 (lazy dynamic import for SVG coordinate stroke animations)
- **i18n Architecture**:
  - Subpath routing (`/` for Indonesian default, `/en/*` for English)
  - Handled via `next.config.ts` rewrites (no Edge middleware required, ensuring 100% portability to Node.js, Vercel, and Cloudflare OpenNext runtimes)

---

## Option 1: Vercel (Recommended Default)

Vercel provides native zero-configuration deployments for Next.js App Router.

### Prerequisites
- Node.js >= 20.9.0
- GitHub repository connected to Vercel

### Setup Steps
1. Import the repository in the Vercel Dashboard.
2. Configure Environment Variables (from `.env.example`):
   ```env
   NEXT_PUBLIC_SITE_URL=https://yokbangun.com
   CONTACT_WEBHOOK_URL=https://your-webhook-endpoint.com/contact
   PARTNERSHIP_WEBHOOK_URL=https://your-webhook-endpoint.com/partnership
   ```
3. Set Build Settings:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. Deploy.

---

## Option 2: Cloudflare Pages / Workers (via OpenNext)

Because our architecture deliberately **avoids Edge Middleware** in favor of `next.config.ts` rewrites, the application is fully compatible with `@opennextjs/cloudflare`.

### Setup Steps
1. Install OpenNext Cloudflare adapter:
   ```bash
   npm install --save-dev @opennextjs/cloudflare
   ```
2. Create `wrangler.jsonc` in the root:
   ```json
   {
     "name": "yokbangun-profile",
     "main": ".open-next/worker.js",
     "compatibility_date": "2024-09-23",
     "compatibility_flags": ["nodejs_compat"],
     "assets": {
       "directory": ".open-next/assets",
       "binding": "ASSETS"
     }
   }
   ```
3. Add deployment scripts to `package.json`:
   ```json
   "build:cf": "opennextjs-cloudflare build",
   "deploy:cf": "opennextjs-cloudflare build && wrangler deploy"
   ```

---

## Option 3: Self-Hosted Docker / Node.js Server

For deployment on private VPS (e.g. Biznet, IDCloudHost, AWS Lightsail, DigitalOcean):

### Standalone Output Configuration
In `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  output: "standalone",
  // ... other configs
};
```

### Dockerfile
```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Pre-Deployment Verification Checklist

Before pushing any commit to production:

- [ ] `npm run lint` — ESLint passes with 0 errors.
- [ ] `npm run typecheck` — TypeScript compiles without errors.
- [ ] `npm run test` — Vitest unit tests pass.
- [ ] `npm run build` — Next.js production build succeeds, generating all static routes.
- [ ] Test Contact and Partnership forms with real webhook or verify local fallback logs.
- [ ] Verify Open Graph images at `/api/og` or `/[locale]/opengraph-image`.
- [ ] Verify `sitemap.xml` and `robots.txt` are served at root.
