# Components Documentation

Apex CRM provides highly reusable, data-driven components built on top of `shadcn/ui` primitives.

## DataTable

The `DataTable` is a powerful grid component that handles loading states, empty states, pagination, and dynamic headers/filters.

### Usage

```tsx
import { DataTable, ColumnDef } from "@/components/ui/data-table";

const columns: ColumnDef<User>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Role", render: (row) => <Badge>{row.role}</Badge> }
];

<DataTable
  columns={columns}
  data={data}
  isLoading={isLoading}
  totalItems={100}
  page={1}
  limit={10}
  onPageChange={(page) => setPage(page)}
  searchQuery={search}
  onSearchChange={(val) => setSearch(val)}
/>
```

### Key Props
- `columns`: Array of column definitions. Supports `accessorKey` for simple properties or `render` for custom JSX.
- `data`: Array of row data.
- `isLoading`: Shows skeleton loaders when true.
- `totalItems`, `page`, `limit`: Controls the pagination footer.
- `searchQuery`, `onSearchChange`: Automatically renders a debounced search input above the table if provided.
- `filters`: Slot for rendering additional filter buttons next to the search input.

## AsyncSelect

The `AsyncSelect` component is a combobox that automatically fetches data from an API via TanStack Query as the user scrolls or types.

### Usage

```tsx
import AsyncSelect from "@/components/ui/async-select";
import { customersApi } from "@/lib/api/customers";

<AsyncSelect
  placeholder="Select a customer..."
  labelKey="name"
  idKey="id"
  loadOptions={async ({ page, page_size, search }) => {
    // This matches the PaginatedResponse format
    return await customersApi.getCustomers({ page, limit: page_size, search });
  }}
  onChange={(customer) => setSelectedCustomer(customer)}
/>
```

### Key Props
- `loadOptions`: Async function that receives pagination and search params.
- `multi`: If true, enables multiple selections (tags).
- `creatable`: If true, allows typing a custom option not returned by the API.
- `labelKey` / `idKey`: Which properties in the API response objects to use for the label and value.
