# API Contracts & Data Structures

This document outlines the expected API response shapes for the core components in this theme. By designing your backend to return data in these formats, the UI components will work without any modifications.

## Global Response Wrapper

All API calls are expected to return JSON. A generic response wrapper can be used, but is not strictly enforced unless utilizing the pagination patterns below.

## Pagination Structure (DataTable)

The `DataTable` component expects your list endpoints (e.g., `/api/customers?page=1&limit=10`) to return a response matching the `PaginatedResponse<T>` interface in `lib/api/client.ts`.

**Expected JSON Response:**
```json
{
  "data": [
    { "id": "1", "name": "Item 1" },
    { "id": "2", "name": "Item 2" }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "page_size": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```
*Note: If your backend returns a different pagination structure (e.g., Spring Boot Page or Django Rest Framework), you can map the response inside your `lib/api/*.ts` service functions before passing the data to the UI.*

## AsyncSelect Search API

The `AsyncSelect` component supports infinite scrolling and search filtering. It expects an API endpoint that accepts `page`, `page_size`, and an optional `search` query parameter.

It relies on the exact same `PaginatedResponse` structure as above to calculate if there are more pages to load on scroll (`hasNextPage`).

## Authentication & Errors

### Auth Headers
The `apiClient` automatically injects the Bearer token from the Redux store:
```http
Authorization: Bearer <your_jwt_token>
```

### 401 Unauthorized
If your backend responds with a `401 Unauthorized` status code, the Axios interceptor in `lib/api/client.ts` will automatically dispatch the `logout()` action to the Redux store, clearing the user's session and state.
