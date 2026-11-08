<div align="center">

# ⚡ Apex CRM

**High-Conversion Enterprise Next.js Admin Theme & Living Design System**

A production-grade, full-stack ready SaaS CRM dashboard and component library built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion 14, and Base UI.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Motion](https://img.shields.io/badge/Motion-14.10-f08?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-ff4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-color-palette--typography">Color Palette</a> •
  <a href="#-pages--sitemap">Pages & Sitemap</a> •
  <a href="#-motion-primitives">Motion Primitives</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-credits--acknowledgements">Credits</a>
</p>

</div>

---

## 🌟 Overview

Unlike typical admin templates that provide static, un-wired HTML mockups, **Apex CRM** is architected as a real SaaS application. It ships with pre-configured client-state slices (Redux Toolkit), server-state caching (TanStack React Query v5), an Axios API interceptor layer, full CRUD task & notes managers, an interactive drag-and-drop Kanban deal board, and over 32 interactive spring-physics motion components.

---

## 🚀 Key Features

### 🏢 Complete CRM & Operations Suite
- **Interactive Kanban Board**: Zero-dependency HTML5 drag-and-drop board with cross-column deal transfers, in-column card reordering, drop indicator lines, and stage-mover submenus.
- **Enterprise Task Manager**: Full CRUD with priority tags (`Urgent`, `High`, `Medium`, `Low`), category filters, search, inline status toggles, and edit modals.
- **Rich Notes Workspace**: Full CRUD notes repository with pinned notes, tag filters, color-coded categories, and modal editor.
- **Executive Analytics Dashboard**: Recharts-powered revenue velocity charts, conversion funnels, deal distribution, and real-time counter metrics.
- **Customer & Deals Pipeline**: Customer health scores, ARR tracking, pipeline stages, and contact directories.
- **Documents, Invoices & Storage**: File upload dropzone, storage usage breakdown, PDF invoice generators, and contract sign-off tracking.

### 🎨 Bespoke Unslop Design System
- **Signature Palette**: Warm editorial sand (`#f3eee3`), deep charcoal (`#111111`), and vibrant burnt orange (`#d9541e`).
- **Harmonized Typography**: Multi-tiered Google Fonts setup featuring `DM Sans` (body and UI), `Geist` (numbers and code), and `Manrope` (headings and displays).
- **Navigation Feedback**: Global route-change progress loader with top accent pulse bar for immediate tactile feedback.

### ✨ 32+ Spring Motion Primitives
- Powered by `motion/react` v14 and Julien Thibeaut's [motion-primitives](https://github.com/ibelick/motion-primitives).
- Includes text morphing, live character scrambling, text loops, shimmer illumination, 3D mouse parallax tilt, magnetic cursor physics, interactive macOS dock, infinite scrolling marquees, and spring accordions.

### 🛠️ Developer Experience & Architecture
- **Next.js 16 App Router**: 69 statically prerendered routes with zero build errors or layout shifts.
- **React 19 Compatibility**: Directly leverages React 19 actions, hooks, and clean server-client boundaries.
- **Tailwind CSS v4**: Uses the modern `@theme inline` specification with CSS variables for dynamic dark/light mode toggling.
- **Type-Safe Primitives**: Built on `@base-ui/react` and Radix foundations for complete keyboard accessibility (WCAG 2.1 AA compliant).

---

## 🎨 Color Palette & Typography

Apex CRM avoids generic purple AI gradients, utilizing a high-contrast editorial identity:

| Token | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| **Canvas / Background** | `#f3eee3` | Warm sand foundation for light mode surfaces |
| **Foreground / Ink** | `#111111` | Deep charcoal for crisp typography and primary buttons |
| **Accent / Brand** | `#d9541e` | Energetic burnt orange for highlights, badges, and CTAs |

### Typography Hierarchy
```css
--font-sans: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
--font-heading: "Manrope", sans-serif;
--font-mono: "Geist", monospace;
```

---

## 🗺️ Pages & Sitemap

Apex CRM includes over 20 pre-built enterprise routes:

```
app/
├── (public)/
│   └── page.tsx                     # High-converting marketing landing page
├── (dashboard)/
│   ├── dashboard/page.tsx           # Executive revenue & pipeline dashboard
│   ├── crm/
│   │   ├── deals/page.tsx           # Drag-and-drop Kanban deal pipeline
│   │   ├── customers/page.tsx       # Customer accounts & health metrics
│   │   └── activities/page.tsx      # Audit trail & timeline activity stream
│   ├── tasks/page.tsx               # Full CRUD task management board
│   ├── notes/page.tsx               # Full CRUD rich notes manager
│   ├── calendar/page.tsx            # Event scheduling & agenda calendar
│   ├── messages/page.tsx            # Team communication channels
│   ├── documents/page.tsx           # Document repository & version history
│   ├── storage/page.tsx             # Cloud storage & upload dropzone
│   ├── invoices/page.tsx            # Invoice generator & payment tracking
│   ├── proposals/page.tsx           # Client proposal pipeline
│   ├── projects/page.tsx            # Sprint tracker & milestone delivery
│   ├── analytics/page.tsx           # User acquisition & CAC vs LTV analytics
│   ├── reports/
│   │   ├── sales/page.tsx           # Sales velocity & revenue forecast
│   │   ├── leads/page.tsx           # Lead source attribution & funnel
│   │   ├── project/page.tsx         # Resource utilization reports
│   │   └── timesheets/page.tsx      # Billable hours & timesheets
│   ├── components/
│   │   ├── page.tsx                 # Interactive component catalog (40+ items)
│   │   └── [slug]/page.tsx          # Dedicated playground with API prop tables
│   ├── motion-primitives/page.tsx   # Interactive motion primitives gallery
│   ├── profile/page.tsx             # User security, sessions & credentials
│   └── settings/page.tsx            # Workspace config, API keys & webhooks
```

---

## ✨ Motion Primitives

All motion primitives live under `components/core/` and are built with Framer Motion (`motion/react` v14):

| Primitive | Category | Description |
| :--- | :--- | :--- |
| **`TextEffect`** | Typography | Staggered entrance animations per word, character, or line |
| **`TextShimmer`** | Typography | High-end glossy illumination sweep across text |
| **`TextMorph`** | Typography | Fluid SVG character morphing between arbitrary words |
| **`TextScramble`** | Typography | Matrix-style cybernetic character deciphering effect |
| **`TextLoop`** | Typography | Smooth vertical carousel alternating phrases |
| **`SlidingNumber`** | Numbers | Financial-grade digit ticker rolling upwards/downwards |
| **`Magnetic`** | Interaction | Cursor-attracting spring physics on buttons and icons |
| **`Tilt`** | Interaction | 3D parallax card perspective rotation tracking mouse position |
| **`Spotlight`** | Interaction | Radial atmospheric glow revealing card borders |
| **`BorderTrail`** | Interaction | Continuous luminous tracer moving along element borders |
| **`Dock`** | Surfaces | macOS-style magnification scaling dock on hover |
| **`InfiniteSlider`**| Surfaces | Hardware-accelerated continuous marquee for logos and tags |
| **`Accordion`** | Overlays | Spring-animated collapsible panels with zero height-jump glitches |
| **`Disclosure`** | Overlays | Single expandable section with state-aware toggle icons |
| **`MorphingDialog`**| Overlays | Smooth layout-morphing modal window with spring geometry |

---

## 🏗️ Architecture

```
theme-1/
├── app/                             # Next.js 16 App Router pages & layouts
│   ├── layout.tsx                   # Root HTML shell, fonts, navigation loader
│   └── globals.css                  # Tailwind v4 theme tokens & color variables
├── components/
│   ├── core/                        # Motion Primitives (Framer Motion v14)
│   ├── ui/                          # Standard Design System UI (Base UI + shadcn)
│   ├── layout/                      # Topbar, Sidebar, NavigationLoader, Popovers
│   ├── docs/                        # Interactive component playground & sidebar
│   └── providers/                   # Redux, TanStack Query, Theme Providers
├── hooks/                           # Custom React & TanStack Query hooks
├── lib/
│   ├── api/                         # Axios client with JWT auth interceptors
│   ├── components-registry.ts       # Central metadata registry for 40+ components
│   └── utils.ts                     # Tailwind class merge helper (`cn`)
├── store/                           # Redux Toolkit store, auth & UI state slices
└── docs/                            # Integration guides & API contract specs
```

### Dual State Management
```
                     ┌───────────────────────────────┐
                     │          Client App           │
                     └───────┬───────────────┬───────┘
                             │               │
                             ▼               ▼
                   ┌──────────────────┐    ┌──────────────────┐
                   │  Redux Toolkit   │    │  TanStack Query  │
                   │  (Client State)  │    │  (Server State)  │
                   ├──────────────────┤    ├──────────────────┤
                   │ • Active Theme   │    │ • Customer Data  │
                   │ • Sidebar Open   │    │ • Deal Pipelines │
                   │ • User Session   │    │ • Task Caching   │
                   │ • Notifications  │    │ • Auto-Refetch   │
                   └──────────────────┘    └──────────────────┘
```

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm, pnpm, or bun

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/apex-crm.git
cd apex-crm

# Install dependencies
npm install
```

### 3. Environment Setup
```bash
# Copy example environment configuration
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/v1
NEXT_PUBLIC_APP_NAME="Apex CRM"
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📚 Documentation

Detailed integration guides are available in the [`/docs`](./docs) folder:

- 📖 [Getting Started Guide](./docs/GETTING_STARTED.md) — Backend wiring and deployment instructions.
- 🔌 [API Contracts](./docs/API_CONTRACTS.md) — Expected JSON payloads and REST endpoint specs.
- 🧠 [State Management](./docs/STATE_MANAGEMENT.md) — Guide to Redux slices and React Query hooks.
- 🧩 [Components Guide](./docs/COMPONENTS.md) — Reusable component usage patterns.

---

## 🤝 Credits & Acknowledgements

Special thanks and attribution to the authors of open-source projects used in this theme:

- **[Motion Primitives](https://github.com/ibelick/motion-primitives)** by [Julien Thibeaut (@ibelick)](https://github.com/ibelick) — Outstanding animated UI primitives built with Framer Motion and Tailwind CSS.
- **[Base UI](https://base-ui.com/)** & **[shadcn/ui](https://ui.shadcn.com/)** — Production-ready, accessible foundational components.
- **[TanStack Table & Query](https://tanstack.com/)** — High-performance table manipulation and async server state management.
- **[Lucide Icons](https://lucide.dev/)** — Clean, consistent iconography.

---

## 📄 License

Commercial license applies. Built with precision for modern SaaS developers.
