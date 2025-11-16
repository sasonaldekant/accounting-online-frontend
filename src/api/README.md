# API Layer

**HTTP Client & Endpoints**

## Struktura
```
client.ts           # Axios instance sa interceptors
endpoints.ts        # API paths constants
documentsApi.ts     # Documents endpoints
itemsApi.ts         # Line Items endpoints (KRITIČNO)
costsApi.ts         # Costs endpoints
lookupsApi.ts       # Lookup endpoints
```

## Key Features

### Axios Interceptors
- Request interceptor: Dodaj ETag headers
- Response interceptor: Handle 409 Conflict
- Error handling

### ETag Support (KRITIČNO)
```typescript
// PATCH sa If-Match header
axios.patch(
  `/documents/${docId}/items/${itemId}`,
  data,
  {
    headers: {
      'If-Match': eTag  // Base64 encoded RowVersion
    }
  }
)
```

### Error Handling
- 409 Conflict → showConflictDialog()
- 404 Not Found → notifikacija
- 500 Server Error → error boundary
