# Getting Started with Apex CRM

Welcome to Apex CRM! This admin dashboard theme provides a highly polished UI with robust boilerplate for state management (Redux Toolkit) and server state (TanStack Query).

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment file and update as needed.
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and set `NEXT_PUBLIC_API_URL` to your backend URL.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Folder Structure

- `app/`: Next.js App Router pages and layouts.
- `components/ui/`: Reusable, atomic UI components (buttons, inputs, etc).
- `components/layout/`: Layout components (Sidebar, Topbar, AppShell).
- `components/providers/`: Global context providers (Redux, Query, Theme).
- `lib/api/`: Axios client configuration and API service functions.
- `hooks/`: TanStack Query hooks and custom React hooks.
- `store/`: Redux Toolkit setup and slices.

## Connecting Your Backend

This theme is designed to be fully decoupled from the backend. Out of the box, it uses mock data and mock API services located in `lib/api/customers.ts`. 

To connect your own backend:
1. Update `NEXT_PUBLIC_API_URL` in `.env.local`.
2. Modify the API services in `lib/api/*.ts` to remove the mock delays and uncomment the real `apiClient.get(...)` calls.
3. Update `store/auth-slice.ts` with your actual authentication logic (e.g., storing the real JWT). The `apiClient` automatically attaches the token to all outgoing requests.
