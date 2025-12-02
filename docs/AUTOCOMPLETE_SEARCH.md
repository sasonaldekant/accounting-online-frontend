# 🔍 Autocomplete Search Implementation

## 🎯 Overview

Server-side search са autocomplete функционалношћу за велике dropdown-ове:

- **Partners**: 6000+ records
- **Articles**: 11000+ records

---

## 💡 Problem

**Old Approach (Load All):**
```
User opens page
  ↓
Fetch ALL 6000+ partners (28KB, 29+ seconds)
  ↓
Timeout / Performance issue
  ↓
All dropdowns fail
```

**New Approach (Search):**
```
User types "sim"
  ↓
Fetch only matching results (< 1KB, < 500ms)
  ↓
Show max 50 results
  ↓
Fast & efficient!
```

---

## 🛠️ Architecture

### Backend (LINQ + EF Core)

```
GET /api/v1/lookups/partners/search?query=sim&limit=50
  ↓
LookupsController.SearchPartners()
  ↓
LookupService.SearchPartnersAsync()
  ↓
EF Core: WHERE StatusNabavka='Aktivan' AND (Sifra LIKE '%sim%' OR Naziv LIKE '%sim%')
  ↓
Return max 50 results
```

### Frontend (React Query + MUI Autocomplete)

```
User types in <PartnerAutocomplete>
  ↓
Debounce 300ms
  ↓
usePartnerSearch hook
  ↓
React Query fetches & caches
  ↓
Show results in dropdown
```

---

## 💻 Usage Examples

### 1. Partner Autocomplete

```tsx
import { PartnerAutocomplete } from '../components/PartnerAutocomplete';
import { PartnerComboDto } from '../types/api.types';

function MyComponent() {
  const [partner, setPartner] = useState<PartnerComboDto | null>(null);

  return (
    <PartnerAutocomplete
      value={partner}
      onChange={setPartner}
      label="Partner"
      placeholder="Unesi šifru ili naziv..."
      required
    />
  );
}
```

### 2. Article Autocomplete

```tsx
import { ArticleAutocomplete } from '../components/ArticleAutocomplete';
import { ArticleComboDto } from '../types/api.types';

function MyComponent() {
  const [article, setArticle] = useState<ArticleComboDto | null>(null);

  return (
    <ArticleAutocomplete
      value={article}
      onChange={setArticle}
      label="Artikal"
      placeholder="Unesi šifru ili naziv..."
      required
    />
  );
}
```

### 3. Direct Hook Usage

```tsx
import { usePartnerSearch } from '../hooks/usePartnerSearch';

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: partners, isLoading } = usePartnerSearch(searchTerm, 50);

  return (
    <div>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {isLoading && <p>Loading...</p>}
      {partners?.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}
```

---

## ⚙️ Configuration

### Debounce Timing

```typescript
// src/components/PartnerAutocomplete.tsx
const debouncedSetSearch = useCallback(
  debounce((term: string) => {
    setDebouncedSearchTerm(term);
  }, 300),  // ← Promeni na 500ms za sporiju konekciju
  []
);
```

### Result Limit

```typescript
// Promeni limit u component-i
<PartnerAutocomplete ... />
// ili
const { data } = usePartnerSearch(searchTerm, 100);  // ← Max 100 rezultata
```

### Cache Duration

```typescript
// src/hooks/usePartnerSearch.ts
return useQuery(
  ['partners', 'search', searchTerm, limit],
  () => api.lookup.searchPartners(searchTerm, limit),
  {
    staleTime: 2 * 60 * 1000,   // ← 2 minuta
    cacheTime: 10 * 60 * 1000,  // ← 10 minuta
  }
);
```

---

## 📦 React Query Caching

### How It Works

```typescript
// First search: "sim"
usePartnerSearch('sim', 50)
  ↓
Fetch from Backend
  ↓
Cache key: ['partners', 'search', 'sim', 50]
  ↓
Store in memory for 10 minutes

// Second search: "sim" (within 2 minutes)
usePartnerSearch('sim', 50)
  ↓
Return from cache (instant!)
  ↓
No API call

// Third search: "simon" (different term)
usePartnerSearch('simon', 50)
  ↓
Fetch from Backend
  ↓
New cache key: ['partners', 'search', 'simon', 50]
```

### Cache Keys

```typescript
['partners', 'search', 'sim', 50]      // Cached separately
['partners', 'search', 'simon', 50]    // Cached separately
['partners', 'search', 'sim', 100]     // Different limit = different cache
['articles', 'search', 'crna', 50]     // Articles cached separately
```

---

## 🚀 Performance

### Old Approach (Load All)

| Metric | Partners | Articles |
|--------|----------|----------|
| Records | 6000+ | 11000+ |
| Response Size | 28KB | 50KB+ |
| Load Time | 29+ seconds | 60+ seconds |
| First Paint | Slow | Very slow |
| Memory | High | Very high |

### New Approach (Search)

| Metric | Partners | Articles |
|--------|----------|----------|
| Records per query | Max 50 | Max 50 |
| Response Size | < 1KB | < 2KB |
| Load Time | < 500ms | < 500ms |
| First Paint | Instant | Instant |
| Memory | Low | Low |

---

## 🔍 Backend Endpoints

### Partner Search

```
GET /api/v1/lookups/partners/search?query={term}&limit={max}
```

**Parameters:**
- `query` (required): Search term (min 2 characters)
- `limit` (optional): Max results (default: 50, max: 100)

**Response:**
```json
[
  {
    "id": 1,
    "code": "P001",
    "name": "Partner ABC"
  },
  ...
]
```

### Article Search

```
GET /api/v1/lookups/articles/search?query={term}&limit={max}
```

**Parameters:**
- `query` (required): Search term (min 2 characters)
- `limit` (optional): Max results (default: 50, max: 100)

**Response:**
```json
[
  {
    "id": 1,
    "code": "A001",
    "name": "Artikal XYZ",
    "unit": "kom",
    "taxRateId": 1
  },
  ...
]
```

---

## 🧪 Testing

### Manual Testing

1. **Open DocumentCreatePage**
   ```
   http://localhost:3000/documents/vp/ur
   ```

2. **Click Partner field**
   - Type "s" → Should show "Još 1 karakter..."
   - Type "si" → Should fetch results
   - Type "sim" → Should show matching partners

3. **Check Network Tab**
   - Should see `GET /lookups/partners/search?query=sim&limit=50`
   - Response should be < 1KB
   - Time should be < 500ms

4. **Test Caching**
   - Clear input and type "sim" again
   - Should be instant (no new API call)

### Unit Testing

```typescript
// tests/hooks/usePartnerSearch.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { usePartnerSearch } from '../../hooks/usePartnerSearch';

test('fetches partners when search term >= 2 chars', async () => {
  const { result } = renderHook(() => usePartnerSearch('sim', 50));
  
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  expect(result.current.data).toBeDefined();
  expect(result.current.data?.length).toBeLessThanOrEqual(50);
});

test('does not fetch when search term < 2 chars', () => {
  const { result } = renderHook(() => usePartnerSearch('s', 50));
  
  expect(result.current.data).toEqual([]);
  expect(result.current.isFetching).toBe(false);
});
```

---

## ⚠️ Migration Notes

### Old Code (Load All)

```tsx
// ❌ OLD - Don't use
import { Select, MenuItem } from '@mui/material';
import { usePartners } from '../hooks/useCombos';  // Loads all 6000+

function MyComponent() {
  const { data: partners } = usePartners();  // 29+ seconds!
  
  return (
    <Select>
      {partners?.map(p => (
        <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
      ))}
    </Select>
  );
}
```

### New Code (Search)

```tsx
// ✅ NEW - Use this
import { PartnerAutocomplete } from '../components/PartnerAutocomplete';

function MyComponent() {
  const [partner, setPartner] = useState(null);
  
  return (
    <PartnerAutocomplete
      value={partner}
      onChange={setPartner}
    />
  );
}
```

---

## 📝 Summary

### ✅ Benefits

1. **Fast**: < 500ms response time (vs 29+ seconds)
2. **Efficient**: Max 50 results (vs 6000+)
3. **Cached**: React Query kešira rezultate
4. **UX**: Debounce 300ms - smooth typing
5. **Scalable**: Works sa 100,000+ records

### 🔧 Components

- `PartnerAutocomplete` - Ready-to-use component
- `ArticleAutocomplete` - Ready-to-use component
- `usePartnerSearch` - Reusable hook
- `useArticleSearch` - Reusable hook

### 📦 APIs

- `GET /lookups/partners/search` - Backend search
- `GET /lookups/articles/search` - Backend search

---

**Last Updated**: 2025-12-03  
**Related PRs**: #36 (Frontend), Backend PR (pending)
