# Apex CRM - Commercial Next.js Admin Theme

Welcome to **Apex CRM**, a premium, production-ready admin dashboard theme built for developers who want to ship faster. 

Unlike typical templates that just give you static HTML, this theme is wired up with industry-standard state management, routing, and data-fetching patterns. You get a "clone and go" experience so you can focus on building your backend.

## Features

- **Next.js 15 App Router** - Utilizing the latest React features and routing.
- **Redux Toolkit Integration** - Pre-configured store with Auth and App UI state slices.
- **TanStack React Query** - Fully configured query client for robust server-state caching.
- **Axios API Layer** - A dedicated `/lib/api` folder with configured interceptors for Auth tokens and 401 handling.
- **Advanced Components** - Includes complex, data-driven components like `DataTable` (with pagination/search) and `AsyncSelect` (with infinite scroll).
- **Beautiful UI** - Premium design powered by `shadcn/ui` and Tailwind CSS, featuring full Light/Dark mode support.

## Getting Started

Check out the `/docs` directory for complete integration instructions:

1. [Getting Started Guide](./docs/GETTING_STARTED.md) - Learn how to set up the project and wire it to your backend.
2. [API Contracts](./docs/API_CONTRACTS.md) - Learn what JSON response structures the components expect.
3. [State Management](./docs/STATE_MANAGEMENT.md) - Learn how Redux and React Query are used in this theme.
4. [Components Documentation](./docs/COMPONENTS.md) - Usage examples for the complex UI components.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env.local

# 3. Start development server
npm run dev
```

## Credits & Acknowledgements

Special thanks and attribution to the authors of open-source projects used in this theme:

- **[Motion Primitives](https://github.com/ibelick/motion-primitives)** by [Julien Thibeaut (@ibelick)](https://github.com/ibelick) — Beautiful, production-grade animated UI primitives powered by Motion and Tailwind CSS.
- **[Base UI](https://base-ui.com/)** and **[shadcn/ui](https://ui.shadcn.com/)** — Accessible foundational UI primitives and design system tokens.
- **[Lucide Icons](https://lucide.dev/)** — Clean, modern icon set.

## License
*Commercial License applies. Do not distribute or resell this template's source code.*
