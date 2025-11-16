# Custom Hooks

**Reusable React Hooks**

## Struktura
```
useAutoSaveItems.ts         # KRITIČNO - Excel-like autosave
useAutoSaveCosts.ts         # Costs autosave
useDocuments.ts             # Documents CRUD
useLookupsCache.ts          # Cached lookups
useConflictResolver.ts      # 409 handling
useFocus.ts                 # Focus management
```

## useAutoSaveItems (KRITIČNO)

**Funkcionalnost:**
- Debounce autosave (800ms)
- ETag tracking
- Tab/Enter navigacija
- Error handling
- Conflict resolution

**Signature:**
```typescript
interface UseAutoSaveItemsReturn {
  items: DocumentLineItem[];
  setItems: React.Dispatch<SetStateAction<DocumentLineItem[]>>;
  savingIds: Set<string>;
  errors: Record<string, string>;
  scheduleAutosave: (itemId: string, delay?: number) => void;
  autosaveItem: (itemId: string) => Promise<void>;
  handleCellChange: (itemId: string, field: keyof DocumentLineItem, value: any) => void;
  handleKeyDown: (
    e: React.KeyboardEvent,
    itemId: string,
    rowIndex: number,
    fieldIndex: number,
    isLastField: boolean
  ) => void;
  handleDelete: (itemId: string) => Promise<void>;
  handleAddRow: () => void;
}
```

**Usage:**
```typescript
const {
  items,
  savingIds,
  errors,
  handleCellChange,
  handleKeyDown
} = useAutoSaveItems(documentId);
```
