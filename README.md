# 📊 ERP Accounting Online - Frontend

**Enterprise ERP Solution - React Frontend Application**

[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/MUI-5.15-blue)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2-purple)](https://vitejs.dev/)

---

## 🚀 Status Projekta

**Trenutni Branch:** `main`  
**Status:** 🌟 **MVP Dokumenata 99% Kompletiran**  
**Datum:** 11. Decembar 2025

### ✅ Šta je Implementirano:

- ✅ **Kompletan navigacioni meni** prema ERP specifikaciji
- ✅ **Dashboard** sa quick stats i akcijama
- ✅ **Kreiranje dokumenata** sa svim poljima i combosima
- ✅ **Pretraga dokumenata** po datumu, broju, statusu
- ✅ **Pregled/Edit dokumenta** sa 3 taba (Header, Items, Costs)
- ✅ **DocumentHeader** - Sva polja + Avans PDV subform
- ✅ **Dobavljač** - Dropdown sa svim partnerima + optimizovana server-side search 🔧 **OPTIMIZOVANO**
- ✅ **Poreske Tarife (Avansi)** - Tabela sa auto-kalkulacijom
- ✅ **DocumentItemsTable** - Excel-like grid sa autosave
- ✅ **Utils funkcije** - format, validation, calculation, etag
- ✅ **Routing** - Kompletna navigacija

### 🔶 Šta Treba Kompletirati:

- 🔶 **DocumentCostsTable** - Zavisni troškovi (30% done)
- ❌ **Master Data stranice** - CRUD za šifarnike (0% done)
- ❌ **Izveštaji** - Lager liste, analitike (0% done)
- ❌ **Finansije** - Izvodi, ulazni računi (0% done)

**Detaljno:** Pogledaj [docs/IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md)

---

## 🎯 Arhitektura

```
src/
├── api/                # API client i endpoints (100%)
├── types/              # TypeScript definicije (100%)
├── store/              # Zustand state management (100%)
├── hooks/              # Custom hooks (100%)
├── utils/              # Helper funkcije (100%)
├── components/         # React komponente (90%)
│   ├── Layout/        # Navigation + AppBar
│   └── Document/      # Document forms
└── pages/              # Page komponente (100%)
    ├── DashboardPage
    ├── DocumentListPage
    ├── DocumentCreatePage
    └── DocumentDetailPage
```

---

## 🛠️ Tech Stack

| Tehnologija | Verzija | Svrha |
|-------------|---------|-------|
| **React** | 18.2.0 | UI framework |
| **TypeScript** | 5.4.5 | Type safety |
| **Vite** | 7.2.4 | Build tool |
| **Material-UI** | 5.15.14 | UI components |
| **React Router** | 6.22.3 | Routing |
| **TanStack Query** | 4.36.1 | Data fetching & caching |
| **Zustand** | 4.5.2 | State management |
| **Axios** | 1.6.8 | HTTP client |
| **React Hook Form** | 7.51.3 | Form management |

---

## 🚀 Quick Start

### Prerequisites

```bash
# Node.js 20 LTS
node --version  # v20.x.x

# npm 10.x
npm --version   # 10.x.x

# Backend API mora biti pokrenut
# http://localhost:5286/swagger
```

### Installation

```bash
# 1. Clone repo
git clone https://github.com/sasonaldekant/accounting-online-frontend.git
cd accounting-online-frontend

# 2. Checkout branch sa implementacijom
git checkout main

# 3. Install dependencies
npm install

# 4. Setup environment
cp .env.example .env.local
```

### Environment Setup

**Edituj `.env.local`:**

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5286/api/v1

# JWT Token (generiši iz backend Swagger-a)
VITE_JWT_TOKEN=your-jwt-token-here

# Dev flags
VITE_ENABLE_MOCK_DATA=false
```

**⚠️ Kako generisati JWT token:**

1. Pokreni backend API
2. Otvori Swagger UI: http://localhost:5286/swagger
3. Pronađi endpoint za generisanje tokena
4. Generiši token (validnost: 24h)
5. Kopiraj token i dodaj u `.env.local`

📝 **Detaljno:** [docs/JWT_TOKEN_SETUP.md](docs/JWT_TOKEN_SETUP.md)

### Start Development Server

```bash
# Terminal 1 - Backend (mora prvo!)
cd ../accounting-online-backend
dotnet run --project src/ERPAccounting.API
# Backend: http://localhost:5286
# Swagger: http://localhost:5286/swagger

# Terminal 2 - Frontend
cd accounting-online-frontend
npm install  # if not done
npm run dev
# Frontend: http://localhost:3000
```

### Otvori Browser

```
http://localhost:3000
```

✨ **Aplikacija je spremna!**

---

## 📚 Dokumentacija

| Dokument | Opis |
|----------|------|
| [PARTNER_SEARCH_OPTIMIZATION.md](PARTNER_SEARCH_OPTIMIZATION.md) | 🔧 **API SAMO sa 2+ karaktera** (optimizovano) |
| [DROPDOWN_RENDERING_FIX.md](DROPDOWN_RENDERING_FIX.md) | 🔧 Dropdown sa svim partnerima na focus |
| [SERVER_SIDE_PARTNER_SEARCH_FIX.md](SERVER_SIDE_PARTNER_SEARCH_FIX.md) | 🔧 Server-side search sa debounce |
| [DOBAVLJAC_SEARCH_FIX.md](DOBAVLJAC_SEARCH_FIX.md) | 🔍 Dobavljač search sa real-time filteriranjem |
| [CHANGELOG_DOBAVLJAC_TARIFE.md](CHANGELOG_DOBAVLJAC_TARIFE.md) | 📊 Dobavljač dropdown + Poreske tarife |
| [IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md) | **⭐ START HERE** - Kompletan status implementacije |
| [CURRENT_STATE_ANALYSIS.md](docs/CURRENT_STATE_ANALYSIS.md) | Detaljna analiza koda i nedostataka |
| [FIXES_SUMMARY.md](docs/FIXES_SUMMARY.md) | Pregled rešenih problema |
| [IMPLEMENTATION-GUIDE.md](docs/IMPLEMENTATION-GUIDE.md) | Vodič za implementaciju |
| [JWT_TOKEN_SETUP.md](docs/JWT_TOKEN_SETUP.md) | Kako podesiti JWT token |
| [PORT_CONFIGURATION.md](docs/PORT_CONFIGURATION.md) | Port konfiguracija |
| [QUICK-START.md](docs/QUICK-START.md) | Brzi start vodič |

---

## 💻 Glavne Funkcionalnosti

### 1. Dashboard (`/`)

- **Quick Stats:** Dokumenti, Promet, Lager, Dugovanja
- **Quick Actions:** Novi dokument, Pregled, Izveštaji
- **Recent Documents:** Zadnjih 5 dokumenata
- **Navigacija:** Linkovi ka svim modulima

### 2. Kreiranje Dokumenta (`/documents/new`)

**Polja:**
- Tip dokumenta (dropdown)
- Broj dokumenta (text)
- Datum (date picker)
- **Dobavljač (OPTIMIZOVANA PRETRAGA)** 🔧 Klikni za sve, piši 2+ karaktera za pretragu
- Magacin (autocomplete combo, required)
- Referent (autocomplete combo)
- Način oporezivanja (autocomplete combo)
- Datum dospeca (date picker)
- Napomena (textarea)
- **PORESKE TARIFE (AVANSI)** 🆕 Nova sekcija sa auto-kalkulacijom

**Dobavljač - Optimizovana Pretraga:**
```
Korisnik klikne na polje:
           ↓ (onFocus event)
  "Loading all partners..."
           ↓ (API: GET /lookups/partners)
  Čekaj ~500ms
           ↓
  Dropdown sa 39 dobavljača
           ↓
Korisnik unese "d" (1 char):
           ↓
  Lokalni filter - BEZ API POZIVA
  Vidi samo partnere sa "d"
           ↓
Korisnik unese "o" ("do" = 2+ chars):
           ↓
  Čekaj 500ms (debounce)
           ↓
  API: GET /lookups/partners/search?query=do
  Vidi samo "Domaćeg", "Dobavljač..."
           ↓
Korisnik obriše sve:
           ↓
  Vrati sve 39 iz cache-a - BEZ NOVOG API POZIVA
```

**Validacija:**
- Obavezna polja označena
- Real-time error display
- Backend error handling

**Flow:**
1. Popuni zaglavlje (uključujući Poreske Tarife)
2. Klikni "Sačuvaj i Nastavi"
3. POST `/api/v1/documents`
4. Redirect na `/documents/{id}` za dodavanje stavki

### 3. Pretraga Dokumenata (`/documents`)

**Filteri:**
- Broj dokumenta (text search)
- Datum od-do (date range)
- Status (dropdown: Draft, Aktivan, Zatvoren, Storniran)

**Tabela:**
- Kolone: Broj, Datum, Tip, Partner, Magacin, Neto, PDV, Ukupno, Status
- Sortiranje po kolonama
- Paginacija (10, 20, 50, 100 per page)
- Click na red → otvara detalje

**Akcije:**
- "Novi Dokument" dugme
- "View" ikona za svaki dokument

### 4. Pregled/Edit Dokumenta (`/documents/:id`)

**3 Taba:**

#### Tab 1: Zaglavlje
- Sva polja za dokument
- Svi combosi povezani sa backend-om
- **🔍 Dobavljač:** Dropdown sa svim partnerima + optimizovana server-side pretraga
- **✅ Poreske Tarife (Avansi):** Nova subforma sa tabelom
  - Poreska Stopa (0%, 10%, 20%)
  - Osnov (user input)
  - PDV Iznos (auto-calculated: osnov × stopa / 100)
  - Ukupno (auto-calculated: osnov + pdv)
- Real-time save on change

#### Tab 2: Stavke
- Excel-like grid
- Kolone: Artikal, Količina, Cena, Rabat, PDV stopa, PDV iznos, Ukupno
- **Autosave:** 800ms debounce, PATCH sa ETag
- **Tab/Enter navigacija**
- **Status indikatori:** Saving, Saved, Error, Conflict
- **Add/Remove** redova
- Virtualizacija za 200+ redova

#### Tab 3: Zavisni Troškovi
- Lista troškova (zaglavlje)
- Stavke troška sa PDV-om
- Agregacija po artiklima
- "Primeni raspodelu" akcija
- **Status:** 30% implementirano

### 5. Navigacioni Meni

**Prema ERP-SPECIFIKACIJA.docx:**

```
📄 DOKUMENTI
  ├─ VP - Veleprodaja (18 tipova)
  │  ├─ Ulazna Kalkulacija VP
  │  ├─ Finansijsko Odobrenje
  │  ├─ Račun Otpremnica
  │  └─ ...
  └─ MP - Maloprodaja (14 tipova)
     ├─ Popis MP
     ├─ Otprema u Maloprodaju
     └─ ...

📦 STANJA MAGACINA
  └─ Robna Evidencija

⚙️ OSNOVNI PODACI
  ├─ Vrste Plaćanja
  ├─ Banke, Mesta, Države
  ├─ Organizacione Jedinice
  ├─ Artikli i Usluge
  ├─ Poreske Stope
  └─ ...

💰 FINANSIJE
```

**Features:**
- Nested struktura sa expand/collapse
- Active route highlighting
- Search u combosima
- Responsive (mobile + desktop)

---

## 🧑‍💻 Development

### Project Structure

```typescript
// Utils - Helper funkcije
import { formatCurrency, formatDate } from '@/utils/format';
import { validateDocumentNumber } from '@/utils/validation';
import { calculateVAT, calculateLineItemTotal } from '@/utils/calculation';
import { extractETag } from '@/utils/etag';
import { DOCUMENT_TYPES, AUTOSAVE_DEBOUNCE_MS } from '@/utils/constants';

// API - Pozivi backend-a
import { api } from '@/api';
const documents = await api.document.list({ pageNumber: 1, pageSize: 20 });
const newDoc = await api.document.create(data);
const updated = await api.lineItem.patch(docId, itemId, changes, etag);

// Store - State management
import { useDocumentStore, useUIStore } from '@/store';
const { currentDocument, items, setItems } = useDocumentStore();
const { showSnackbar, toggleTheme } = useUIStore();

// Hooks - Custom hooks
import { useCombos } from '@/hooks/useCombos';
import { useAutoSaveItems } from '@/hooks/useAutoSaveItems';
const { partners, articles, isLoading } = useCombos();
const { savingIds, handleCellChange } = useAutoSaveItems(documentId);
```

### Adding New Component

```tsx
// 1. Create component
// src/components/MyComponent.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export const MyComponent: React.FC<Props> = ({ ...props }) => {
  return <Box>...</Box>;
};

// 2. Export from index
// src/components/index.ts
export { MyComponent } from './MyComponent';

// 3. Use in pages
import { MyComponent } from '@/components';
```

### Adding New Page

```tsx
// 1. Create page
// src/pages/MyPage.tsx
import React from 'react';
export const MyPage: React.FC = () => { ... };

// 2. Add route
// src/App.tsx
<Route path="/my-page" element={<MyPage />} />

// 3. Add to menu
// src/components/Layout/AppMenu.tsx
{ id: 'my-page', label: 'My Page', path: '/my-page' }
```

---

## 🧪 Testing

### Manual Testing Checklist

```bash
# 1. Start backend
cd ../accounting-online-backend
dotnet run

# 2. Start frontend
cd accounting-online-frontend
npm install  # if not done
npm run dev

# 3. Test flow:
[] Otvori http://localhost:3000
[] Vidi dashboard
[] Klikni "Novi Dokument"
[] Popuni zaglavlje (svi combosi rade)
[] NOVO: Dobavljač OPTIMIZOVANA pretraga:
   [] Klikni na Dobavljač polje
   [] Trebalo bi videti spinner ("⏳")
   [] Čekaj ~500ms
   [] Trebalo bi videti sve 39+ dobavljača
   [] Unesi "d" (samo 1 char)
   [] Trebalo bi: Lokalni filter, BEZ API POZIVA
   [] Unesi "o" ("do" = 2 chars)
   [] Trebalo bi: Spinner, API POZVAN sa "do"
   [] Testiraj filtrirane rezultate
   [] Obriši sve (backspace)
   [] Trebalo bi: Vrati sve 39 iz cache-a, bez novog API poziva
[] Poreske Tarife:
   [] Vidi tabelu sa 4 kolone
   [] Testiraj kalkulaciju (Stopa 20%, Osnov 1000)
   [] Trebalo bi: PDV 200, Ukupno 1200
[] Klikni "Sačuvaj i Nastavi"
[] Dodaj 3 stavke (autosave radi)
[] Proveri Tab/Enter navigaciju
[] Proveri status indikatore (Saving, Saved)
[] Vrati se na /documents
[] Pretraži po broju
[] Otvori postojeći dokument
[] Edit stavku (autosave radi)
```

### Unit Tests

```bash
# Run tests
npm run test

# Coverage
npm run test:coverage
```

---

## 🚀 Deployment

### Production Build

```bash
# Build
npm run build
# Output: dist/

# Preview
npm run preview
```

### Environment Variables (Production)

```env
# .env.production
VITE_API_BASE_URL=https://api.production.com/api/v1
VITE_JWT_TOKEN=  # Ne stavljati token ovde! Koristi login flow.
VITE_ENABLE_MOCK_DATA=false
```

### Deploy Options

**Static Hosting:**
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Traditional:**
- Nginx
- Apache

**Container:**
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🐛 Troubleshooting

### Problem: Frontend se ne otvara

**Proveri:**
```bash
# Port 3000 zauzet?
lsof -i :3000

# Node verzija?
node --version  # Treba 20.x

# Dependencies instalirani?
rm -rf node_modules package-lock.json
npm install
```

### Problem: 401 Unauthorized

**Proveri:**
```bash
# JWT token postavljen?
cat .env.local | grep VITE_JWT_TOKEN

# Token istekao? (validity 24h)
# Generiši novi iz Swagger-a

# Backend radi?
curl http://localhost:5286/swagger
```

### Problem: Dobavljač pretraga ne radi kako treba

**Proveri:**
```bash
# 1. Klikni na Dobavljač polje
# 2. Trebalo bi videti spinner
# 3. Čekaj ~500ms
# 4. Trebalo bi videti 39 stavki

# 5. Unesi "d" (1 char):
#    - Trebalo bi: Lokalni filter
#    - Console: "🔍 Local filter for: \"d\""
#    - NEMA API poziva

# 6. Unesi "o" ("do" = 2 chars):
#    - Trebalo bi: Spinner
#    - Čekaj 500ms
#    - Console: "🔍 Server search for: \"do\""
#    - API: GET /lookups/partners/search?query=do

# 7. Console trebalo bi:
#    "🔍 Loading all partners..." (klik)
#    "🔍 Local filter for: \"d\""  (1 char)
#    "🔍 Preparing server search for: \"do\"..." (2 chars)
#    "🔍 Server search for: \"do\"..." (nakon debounce)
```

### Problem: Pretraga ne filtrira rezultate

**Proveri:**
```bash
# 1. Klikni na Dobavljač (učita 39)
# 2. Počni pisati "ilk"
# 3. API: GET /lookups/partners/search?query=ilk
# 4. Trebalo bi videti samo "ILKE TRANS"

# Ako ne radi:
# - Otvóri Network tab (F12)
# - Proveri Response
# - Trebalo bi array sa matching partnerima
```

### Problem: Autosave ne radi

**Proveri:**
```bash
# ETag header u response-u?
# Network tab -> Response Headers -> etag

# Console errors?
# F12 -> Console

# Debounce delay?
# Čekaj 800ms posle promene
```

---

## 📊 Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Frontend Dev | 3000 | http://localhost:3000 |
| Backend HTTP | 5286 | http://localhost:5286 |
| Backend Swagger | 5286 | http://localhost:5286/swagger |

📝 **Detaljno:** [docs/PORT_CONFIGURATION.md](docs/PORT_CONFIGURATION.md)

---

## 🤝 Contributing

1. Fork repo
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit Pull Request

**Code style:**
- TypeScript strict mode
- ESLint + Prettier
- Meaningful commit messages

---

## 📝 License

MIT License - vidi [LICENSE](LICENSE) fajl

---

## 👥 Team

**Development Team:**
- Backend: .NET Core / Entity Framework / SQL Server
- Frontend: React / TypeScript / Material-UI
- DevOps: Docker / CI/CD

**Contact:**
- Email: sasonal.dekant@gmail.com
- GitHub: https://github.com/sasonaldekant/accounting-online-frontend

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

**⭐ Status:** MVP Dokumenata 99% Kompl  etan - Samo Zavisni Troškovi Preostaju!  
**📅 Updated:** 11. Decembar 2025  
**👨‍💻 Developer:** AI Assistant + Development Team
