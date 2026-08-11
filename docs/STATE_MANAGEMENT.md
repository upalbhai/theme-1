# State Management

Apex CRM uses a dual state management strategy to provide the best developer experience and performance.

## 1. Global UI & Auth State (Redux Toolkit)

We use Redux Toolkit for true global application state. This includes data that is needed synchronously across the entire app and isn't tied directly to server-side cache.

### Existing Slices
- `auth`: Stores the authenticated user profile, JWT token, and login status.
- `app`: Stores global UI preferences like sidebar collapse state, theme accents, and locale.

### Usage
```tsx
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleSidebar } from '@/store/app-slice';

function Sidebar() {
  const isCollapsed = useAppSelector((state) => state.app.sidebarCollapsed);
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(toggleSidebar())}>
      Toggle Sidebar
    </button>
  );
}
```

## 2. Server State (TanStack React Query)

For fetching, caching, synchronizing, and updating server state, we use TanStack Query (React Query). You should **not** store API responses in Redux.

### Pattern
Instead of calling API endpoints directly in components, we wrap them in custom hooks inside the `hooks/` directory.

Example:
```tsx
import { useQuery } from '@tanstack/react-query';
import { customersApi } from '@/lib/api/customers';

export function useCustomer(id: string) {
  return useQuery({
    queryKey: ['customers', 'detail', id],
    queryFn: () => customersApi.getCustomerById(id),
  });
}
```

This pattern ensures that data is deduplicated, cached, and automatically refetched when the window regains focus or when mutations occur.
