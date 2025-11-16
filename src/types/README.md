# TypeScript Types

**Type Definitions**

## Struktura
```
index.ts            # Exported types
document.ts         # Document types
item.ts             # Line Item types (sa ETag)
cost.ts             # Cost types
lookup.ts           # Lookup types
api.ts              # API response types
dto.ts              # DTO types
```

## Key Types

### DocumentLineItem (KRITIČNO)
```typescript
interface DocumentLineItem {
  id: string;
  dokumentId: string;
  artikalId: number;
  kolicina: number;
  fakturnaCena: number;
  rabat: number;
  marza: number;
  poreskaStopa: number;
  
  // Za autosave
  eTag: string;               // Base64 encoded RowVersion
  isSaving?: boolean;
  error?: string;
  
  // Audit
  createdAt?: Date;
  updatedAt?: Date;
}
```

### ConflictResponse
```typescript
interface ConflictResponse {
  statusCode: 409;
  message: "Conflict - row was modified by another user";
  detail: string;
}
```
