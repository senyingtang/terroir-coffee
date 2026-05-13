# Terroir Coffee

精品咖啡品牌形象網站 — 以風土詮釋每一杯。

## Tech Stack

| Layer | Tech |
|-------|------|
| Monorepo | Turborepo |
| Frontend | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | Sanity.io v3 |
| Animation | GSAP ScrollTrigger + Motion (Framer Motion) |
| Scroll | Lenis |
| Deploy | Vercel |

## Structure

```
terroir-coffee/
├── apps/
│   └── web/          # Next.js app
│       ├── app/
│       │   ├── (site)/   # Public pages
│       │   └── studio/   # Sanity Studio
│       ├── components/
│       ├── lib/
│       └── styles/
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configs (Tailwind, etc.)
│   └── sanity/       # Sanity schemas
└── docs/
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in Sanity credentials
cp apps/web/.env.local.example apps/web/.env.local

# 3. Start dev server
npm run dev
```

App → http://localhost:3000  
Studio → http://localhost:3000/studio

## Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token
```

## Deploy

Push to GitHub → Import in Vercel → Add env vars → Done.
