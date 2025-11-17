import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  PartnerCombo,
  OrgUnitCombo,
  TaxationMethodCombo,
  ReferentCombo,
  DocumentNDCombo,
  TaxRateCombo,
  ArticleCombo,
  DocumentCostsListDto,
  CostTypeCombo,
  CostDistributionMethodCombo,
  CostArticleCombo,
} from '../types';
import { api } from '../api/endpoints';

/**
 * Custom hook za sve 11 Stored Procedures
 * Koristi React Query za keširanje i automatsku invalidaciju
 */

// ==========================================
// QUERY KEYS
// ==========================================

const queryKeys = {
  partners: ['lookups', 'partners'],
  orgUnits: (docTypeId: string) => ['lookups', 'orgUnits', docTypeId],
  taxationMethods: ['lookups', 'taxationMethods'],
  referents: ['lookups', 'referents'],
  documentsND: ['lookups', 'documentsND'],
  taxRates: ['lookups', 'taxRates'],
  articles: ['lookups', 'articles'],
  documentCosts: (documentId: number) => ['lookups', 'documentCosts', documentId],
  costTypes: ['lookups', 'costTypes'],
  costDistributionMethods: ['lookups', 'costDistributionMethods'],
  costArticles: (documentId: number) => ['lookups', 'costArticles', documentId],
};

// ==========================================
// INDIVIDUAL HOOKS
// ==========================================

/**
 * SP 1: Svi partneri
 */
export const usePartners = (): UseQueryResult<PartnerCombo[], unknown> => {
  return useQuery({
    queryKey: queryKeys.partners,
    queryFn: async () => api.lookups.getPartners(),
    staleTime: 5 * 60 * 1000, // 5 minuta
    gcTime: 30 * 60 * 1000, // 30 minuta (staro cacheTime)
  });
};

/**
 * SP 2: Org. jedinice za vrstu dokumenta
 */
export const useOrgUnits = (
  docTypeId: string = 'UR'
): UseQueryResult<OrgUnitCombo[], unknown> => {
  return useQuery({
    queryKey: queryKeys.orgUnits(docTypeId),
    queryFn: async () => api.lookups.getOrgUnits(docTypeId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * SP 3: Načini oporezivanja
 */
export const useTaxationMethods = (): UseQueryResult<
  TaxationMethodCombo[],
  unknown
> => {
  return useQuery({
    queryKey: queryKeys.taxationMethods,
    queryFn: async () => api.lookups.getTaxationMethods(),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

/**
 * SP 4: Referenti (zaposleni)
 */
export const useReferents = (): UseQueryResult<ReferentCombo[], unknown> => {
  return useQuery({
    queryKey: queryKeys.referents,
    queryFn: async () => api.lookups.getReferents(),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

/**
 * SP 5: ND dokumenti
 */
export const useDocumentsND = (): UseQueryResult<DocumentNDCombo[], unknown> => {
  return useQuery({
    queryKey: queryKeys.documentsND,
    queryFn: async () => api.lookups.getDocumentsND(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * SP 6: Poreske stope
 */
export const useTaxRates = (): UseQueryResult<TaxRateCombo[], unknown> => {
  return useQuery({
    queryKey: queryKeys.taxRates,
    queryFn: async () => api.lookups.getTaxRates(),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

/**
 * SP 7: Artikli
 */
export const useArticles = (): UseQueryResult<ArticleCombo[], unknown> => {
  return useQuery({
    queryKey: queryKeys.articles,
    queryFn: async () => api.lookups.getArticles(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * SP 8: Troškovi za dokument
 */
export const useDocumentCosts = (
  documentId: number
): UseQueryResult<DocumentCostsListDto[], unknown> => {
  return useQuery({
    queryKey: queryKeys.documentCosts(documentId),
    queryFn: async () => api.lookups.getDocumentCosts(documentId),
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!documentId, // Samo ako je documentId prosleđen
  });
};

/**
 * SP 9: Vrste troškova
 */
export const useCostTypes = (): UseQueryResult<CostTypeCombo[], unknown> => {
  return useQuery({
    queryKey: queryKeys.costTypes,
    queryFn: async () => api.lookups.getCostTypes(),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

/**
 * SP 10: Načini deljenja troškova (1, 2, 3)
 */
export const useCostDistributionMethods = (): UseQueryResult<
  CostDistributionMethodCombo[],
  unknown
> => {
  return useQuery({
    queryKey: queryKeys.costDistributionMethods,
    queryFn: async () => api.lookups.getCostDistributionMethods(),
    staleTime: Infinity, // Nikad se ne menja
    gcTime: Infinity,
  });
};

/**
 * SP 11: Artikli iz stavki dokumenta za raspodelu troškova
 */
export const useCostArticles = (
  documentId: number
): UseQueryResult<CostArticleCombo[], unknown> => {
  return useQuery({
    queryKey: queryKeys.costArticles(documentId),
    queryFn: async () => api.lookups.getCostArticles(documentId),
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!documentId,
  });
};

// ==========================================
// COMBO HOOK - SVE ODJEDNOM (za initial load)
// ==========================================

export interface AllCombos {
  partners: PartnerCombo[];
  orgUnits: OrgUnitCombo[];
  taxationMethods: TaxationMethodCombo[];
  referents: ReferentCombo[];
  documentsND: DocumentNDCombo[];
  taxRates: TaxRateCombo[];
  articles: ArticleCombo[];
  costTypes: CostTypeCombo[];
  costDistributionMethods: CostDistributionMethodCombo[];
}

export const useAllCombos = (
  docTypeId: string = 'UR'
): UseQueryResult<AllCombos, unknown> => {
  return useQuery({
    queryKey: ['lookups', 'all', docTypeId],
    queryFn: async () => {
      const [
        partners,
        orgUnits,
        taxationMethods,
        referents,
        documentsND,
        taxRates,
        articles,
        costTypes,
        costDistributionMethods,
      ] = await Promise.all([
        api.lookups.getPartners(),
        api.lookups.getOrgUnits(docTypeId),
        api.lookups.getTaxationMethods(),
        api.lookups.getReferents(),
        api.lookups.getDocumentsND(),
        api.lookups.getTaxRates(),
        api.lookups.getArticles(),
        api.lookups.getCostTypes(),
        api.lookups.getCostDistributionMethods(),
      ]);

      return {
        partners,
        orgUnits,
        taxationMethods,
        referents,
        documentsND,
        taxRates,
        articles,
        costTypes,
        costDistributionMethods,
      };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export default {
  usePartners,
  useOrgUnits,
  useTaxationMethods,
  useReferents,
  useDocumentsND,
  useTaxRates,
  useArticles,
  useDocumentCosts,
  useCostTypes,
  useCostDistributionMethods,
  useCostArticles,
  useAllCombos,
};
