# State Management

**Zustand Store**

## Struktura
```
index.ts            # Export all stores
documentStore.ts    # Document state
uiStore.ts          # UI state (loading, dialogs)
errorStore.ts       # Error handling
```

## documentStore

```typescript
interface DocumentStore {
  currentDocument: Document | null;
  items: DocumentLineItem[];
  costs: DependentCost[];
  
  // Actions
  setCurrentDocument: (doc: Document) => void;
  addItem: (item: DocumentLineItem) => void;
  updateItem: (id: string, updates: Partial<DocumentLineItem>) => void;
  deleteItem: (id: string) => void;
}
```

## uiStore

```typescript
interface UIStore {
  isLoading: boolean;
  showConflictDialog: boolean;
  conflictData: ConflictData | null;
  
  setLoading: (loading: boolean) => void;
  openConflictDialog: (data: ConflictData) => void;
  closeConflictDialog: () => void;
}
```
