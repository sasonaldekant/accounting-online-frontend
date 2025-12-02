import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PartnerComboDto } from '../types/api.types';
import { api } from '../api';

/**
 * 🔍 Server-side search hook za partnere (6000+ records)
 * 
 * Autocomplete funkcionalnost:
 * - Minimum 2 karaktera za search
 * - Debounce 300ms (handle u komponenti)
 * - Max 50 rezultata
 * - Keširanje po search term-u
 * 
 * @param searchTerm - Query string (min 2 karaktera)
 * @param limit - Max broj rezultata (default: 50)
 * @returns React Query result sa PartnerComboDto[]
 * 
 * @example
 * ```tsx
 * const { data: partners, isLoading } = usePartnerSearch('sim', 50);
 * ```
 */
export const usePartnerSearch = (
  searchTerm: string,
  limit: number = 50
): UseQueryResult<PartnerComboDto[], unknown> => {
  return useQuery(
    ['partners', 'search', searchTerm, limit] as const,
    async () => {
      // Ne zovemo API ako je search term prekratak
      if (!searchTerm || searchTerm.trim().length < 2) {
        return [];
      }
      return api.lookup.searchPartners(searchTerm.trim(), limit);
    },
    {
      enabled: searchTerm.trim().length >= 2,  // Pozovi samo ako je 2+ karaktera
      staleTime: 2 * 60 * 1000,                // 2 minuta - search results ostaju fresh
      cacheTime: 10 * 60 * 1000,               // 10 minuta - keširaj u memoriji
      keepPreviousData: true,                  // Zadrži prethodne rezultate tokom novog fetch-a
    }
  );
};

export default usePartnerSearch;
