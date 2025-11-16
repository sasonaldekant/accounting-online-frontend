# 🏗️ Projektna Struktura - Frontend

**Datum:** 16.11.2025
**Faza:** FAZA 0.1 - Checkpoint

---

## Component-Based Architecture

```
accounting-online-frontend/
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   ├── documentsApi.ts
│   │   ├── itemsApi.ts              # KRITIČNO: ETag
│   │   ├── costsApi.ts
│   │   └── lookupsApi.ts
│   │
│   ├── types/
│   │   ├── index.ts
│   │   ├── document.ts
│   │   ├── item.ts                  # DocumentLineItem sa ETag
│   │   ├── cost.ts
│   │   ├── lookup.ts
│   │   ├── api.ts
│   │   └── dto.ts
│   │
│   ├── hooks/
│   │   ├── useAutoSaveItems.ts      # KRITIČNO
│   │   ├── useAutoSaveCosts.ts
│   │   ├── useDocuments.ts
│   │   ├── useLookupsCache.ts
│   │   ├── useConflictResolver.ts
│   │   └── useFocus.ts
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── documentStore.ts
│   │   ├── uiStore.ts
│   │   └── errorStore.ts
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   │
│   │   ├── document/
│   │   │   ├── DocumentForm.tsx
│   │   │   ├── DocumentHeader.tsx
│   │   │   ├── DocumentItems.tsx
│   │   │   ├── DocumentCosts.tsx
│   │   │   ├── ItemsTable.tsx           # KRITIČNO
│   │   │   ├── CostsTable.tsx
│   │   │   └── DocumentPreview.tsx
│   │   │
│   │   ├── controls/
│   │   │   ├── EditableCell.tsx
│   │   │   ├── ComboSelect.tsx
│   │   │   ├── NumericInput.tsx
│   │   │   └── StatusBadge.tsx
│   │   │
│   │   └── dialogs/
│   │       ├── ConflictDialog.tsx       # 409 handling
│   │       ├── ConfirmDialog.tsx
│   │       └── ErrorDialog.tsx
│   │
│   ├── utils/
│   │   ├── etag.ts                  # ETag helpers
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   ├── calculation.ts
│   │   └── constants.ts
│   │
│   ├── pages/
│   │   ├── DocumentsPage.tsx
│   │   ├── DocumentEditPage.tsx
│   │   └── DashboardPage.tsx
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
│
├── public/
│   └── index.html
│
├── docs/
│   ├── arhitektura-kompletna.md
│   ├── typescript-csharp-v2-excel-like.md
│   ├── component-hierarchy.md
│   └── PROJEKTNA-STRUKTURA.md
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── .gitignore
├── LICENSE
└── README.md
```

---

## package.json (Parcijalno)

```json
{
  "name": "accounting-online-frontend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.14.13",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@tanstack/react-table": "^8.13.2",
    "@tanstack/react-query": "^5.25.0",
    "axios": "^1.6.2",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.4",
    "zustand": "^4.4.1",
    "react-window": "^1.8.10",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.0",
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "cypress": "^13.6.2",
    "eslint": "^8.54.0",
    "@typescript-eslint/parser": "^6.13.1",
    "tailwindcss": "^3.3.6"
  }
}
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{"path": "./tsconfig.node.json"}]
}
```

---

## Next Steps (FAZA 0.2)

- [ ] Kreiraj package.json
- [ ] Kreiraj tsconfig.json
- [ ] Kreiraj vite.config.ts
- [ ] Instaliraj npm pakete
- [ ] Setup env variables

---

**Status:** ✅ FAZA 0.1 COMPLETED
