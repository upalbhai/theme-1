# 🚀 Commercial CRM & Customer Portal Admin Theme - Project Progress

> **Tech Stack:** Next.js (App Router) • Tailwind CSS v4 • shadcn/ui Design Tokens • Lucide Icons • TypeScript

---

## 🎨 Single-File Color Variable Architecture

All theme colors, dark mode tokens, and theme accent variations are managed centrally in [`app/globals.css`](file:///d:/projects/dummy-theme/app/globals.css).

### Color Token Structure
- `--background` / `--foreground`: Base page contrast tokens.
- `--card` / `--card-foreground`: Container and card surface colors.
- `--primary` / `--primary-foreground`: Main brand accent color (used for buttons, active badges, highlights).
- `--muted` / `--muted-foreground`: Secondary text, disabled states, background hover fills.
- `--border` / `--input` / `--ring`: Subtle structural lines and input field focus rings.
- `--chart-1` to `--chart-5`: Standardized chart color palette for data visualizations.

---

## 📊 Project Features & Completion Checklist

### 1. Core System & Setup
- [x] Initial project planning & tech stack selection
- [x] Project progress tracker (`PROJECT_PROGRESS.md`) created
- [x] Centralized color architecture & dark mode tokens in [`app/globals.css`](file:///d:/projects/dummy-theme/app/globals.css)
- [x] Theme provider ([`components/providers/theme-provider.tsx`](file:///d:/projects/dummy-theme/components/providers/theme-provider.tsx)) with Color Presets (Violet, Emerald, Sapphire, Amber, Rose)

### 2. Layout & Shell
- [x] Collapsible CRM Navigation Sidebar ([`components/layout/sidebar.tsx`](file:///d:/projects/dummy-theme/components/layout/sidebar.tsx)) with grouped sections & badges
- [x] Top Header Navigation ([`components/layout/topbar.tsx`](file:///d:/projects/dummy-theme/components/layout/topbar.tsx)) with `Cmd+K` search, notifications, profile menu, and live theme palette switcher
- [x] Responsive Mobile Drawer overlay in [`components/layout/app-shell.tsx`](file:///d:/projects/dummy-theme/components/layout/app-shell.tsx)

### 3. CRM Feature Pages
- [x] **Sales & Analytics Dashboard ([`app/page.tsx`](file:///d:/projects/dummy-theme/app/page.tsx))**: Key KPI cards, Revenue Velocity area chart, Lead generation channel bar chart, recent deals table, and live team activity feed.
- [x] **Deals Kanban Pipeline ([`app/crm/deals/page.tsx`](file:///d:/projects/dummy-theme/app/crm/deals/page.tsx))**: Drag & drop style stage columns (New Lead, Contacted, Proposal, Negotiation, Closed Won) with stage subtotal calculations & deal priority badges.
- [x] **Customer Directory Table ([`app/crm/customers/page.tsx`](file:///d:/projects/dummy-theme/app/crm/customers/page.tsx))**: High-density data table with sorting, search query filtering, status indicators, LTV formatting, and action toolbars.
- [x] **Activity & Interactions Feed ([`app/crm/activities/page.tsx`](file:///d:/projects/dummy-theme/app/crm/activities/page.tsx))**: Chronological interaction timeline with quick activity logger (Calls, Emails, Meetings, Notes) and category tab filtering.

---

## 📁 File & Folder Structure Guide

```
dummy-theme/
├── app/
│   ├── crm/
│   │   ├── activities/
│   │   │   └── page.tsx      # Interaction & timeline feed
│   │   ├── customers/
│   │   │   └── page.tsx      # Customer table page
│   │   └── deals/
│   │       └── page.tsx      # Deals Kanban board
│   ├── globals.css           # ⚡ ALL COLOR VARIABLES & THEME TOKENS
│   ├── layout.tsx            # Main layout wrapper with sidebar & topbar
│   └── page.tsx              # Sales Analytics Dashboard
├── components/
│   ├── layout/               # Sidebar, Topbar, AppShell
│   └── providers/            # ThemeProvider (Dark mode & Accent Presets)
├── lib/
│   └── utils.ts              # Styling utilities (cn helper)
└── PROJECT_PROGRESS.md       # Project tracker & documentation
```

---

*Last Updated:* 2026-08-10
