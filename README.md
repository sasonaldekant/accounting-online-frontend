# 📊 Accounting Online - Frontend

## Enterprise ERP Solution - React Frontend

**Status:** 🟡 FAZA 0 - Setup
**Tech Stack:** React 18.2, TypeScript 5.3, Material-UI 5.14, Vite 5.0

---

## 🏗️ Arhitektura

Component-based architecture sa React Hooks:
```
src/
├── api/             # API client i endpoints
├── components/      # React komponente
├── hooks/           # Custom hooks (useAutoSaveItems - KRITIČNO)
├── store/           # Zustand state management
├── types/           # TypeScript definicije
├── utils/           # Helper funkcije
└── pages/           # Page komponente
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20 LTS
- npm 10.x

### Setup
```bash
# Kloniraj repo
git clone https://github.com/ykliugi-beep/accounting-online-frontend.git
cd accounting-online-frontend

# Instaliraj dependencies
npm install

# Run development server
npm run dev
```

Aplikacija će biti dostupna na: `http://localhost:3000`

## 📋 Faze Implementacije

### ✅ FAZA 0: PRIPREMA (Tekuća)
- [x] Projektna struktura
- [ ] Dependency setup
- [ ] TypeScript konfiguracija

### 🔄 FAZA 4: FRONTEND - SETUP (1 dan)
- [ ] Komponente & Routing
- [ ] API Integration
- [ ] Types & Interfaces

### 🔄 FAZA 5: FRONTEND - FORMS (1 dan)
- [ ] Document Header Tab
- [ ] Document Items Tab (osnovna)

### 🔄 FAZA 6: FRONTEND - AUTOSAVE (3 dana - KRITIČNO)
- [ ] useAutoSaveItems Hook
- [ ] Autosave na Tab/Enter
- [ ] Conflict Resolution (409)
- [ ] Virtualizacija za 200+ redova
- [ ] Status Indicators

### 🔄 FAZA 7: FRONTEND - TROŠKOVI (1 dan)
- [ ] Costs Table
- [ ] Cost Distribution UI

---

## 🛠️ Tech Stack

| Komponenta | Verzija |
|------------|--------|
| React | 18.2.0 |
| TypeScript | 5.3.3 |
| Vite | 5.0.0 |
| Material-UI (MUI) | 5.14.13 |
| TanStack React Query | 5.25.0 |
| React Hook Form | 7.48.0 |
| Zustand | 4.4.1 |
| Axios | 1.6.2 |
| react-window | 1.8.10 |
| Jest | 29.7.0 |

## 📚 Dokumentacija

- [Kompletan Arhitekturni Dokument](docs/arhitektura-kompletna.md)
- [TypeScript Tipovi](docs/typescript-csharp-v2-excel-like.md)
- [Component Hierarhija](docs/component-hierarchy.md)

## 💻 Key Components

### DocumentForm (Main)
- **DocumentHeader** - Tab 1: Osnovni podaci
- **DocumentItems** - Tab 2: Stavke (Excel-like sa autosave)
- **DocumentCosts** - Tab 3: Zavisni troškovi

### ItemsTable (KRITIČNO)
```tsx
<ItemsTable documentId={docId}>
  - Excel-like grid
  - Tab/Enter navigacija
  - Autosave debounce (800ms)
  - ETag konkurentnost
  - Virtualizacija za 200+ redova
</ItemsTable>
```

### useAutoSaveItems Hook (KRITIČNO)
```typescript
const {
  items,
  savingIds,
  errors,
  handleCellChange,
  handleKeyDown,
  autosaveItem
} = useAutoSaveItems(documentId);
```

## 🔥 Features

### Excel-like Unos
- ⌨️ **Tab** - Navigacija na sledeće polje
- ⏎ **Enter** - Novi red (ako si na poslednjem polju)
- 💾 **Autosave** - 800ms debounce nakon promene
- ♻️ **ETag** - Konkurentnost handling (409 Conflict)
- ⚡ **Virtualizacija** - Brz rendering za 200+ redova

### Status Indicators
- 🔵 **Saving...** - U toku čuvanje
- ✅ **Saved** - Uspešno sačuvano
- ❌ **Error** - Greška pri čuvanju
- ⚠️ **Conflict** - Konkurentnost konflikt (409)

## 🧪 Testing

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

**Target Coverage:** 75%+

## 🎯 Milestone-i

3. **MILESTONE 3:** "Frontend Forms" (Dan 17)
4. **MILESTONE 4:** "Excel-like Autosave" (Dan 24) ⭐
5. **MILESTONE 5:** "Production Ready" (Dan 30)

---

## 🔗 Backend Integration

API Base URL: `http://localhost:5000/api/v1`

### Key Endpoints
```
GET    /partners/combo
GET    /articles/combo
POST   /documents
PATCH  /documents/{id}/items/{itemId}  # sa If-Match header
```

## 📄 License
MIT

## 👤 Author
ERPAccounting Team
