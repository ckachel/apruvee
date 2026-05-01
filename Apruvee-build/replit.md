# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Site analytics (loanmatch)

The `loanmatch` artifact reads three optional env vars to wire up site
analytics. See `artifacts/loanmatch/ANALYTICS.md` for full details.

- `VITE_GA4_MEASUREMENT_ID` — GA4 tag, e.g. `G-XXXXXXXXXX`. When set, gtag.js
  is injected into `index.html` and page views + the `generate_lead`
  conversion are tracked automatically.
- `VITE_GOOGLE_SITE_VERIFICATION` — Search Console meta tag value.
- `VITE_BING_SITE_VERIFICATION` — Bing Webmaster `msvalidate.01` value.

`public/robots.txt` and `public/sitemap.xml` cover the public marketing routes
and point to `https://apruvee.com/sitemap.xml`.
