import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ApiError, ConflictErrorResponse } from '../types';

/**
 * API Klijent sa ETag konkurentnost podrškom
 * OBAVEZNO: Sve stavke koriste If-Match header sa ETag-om
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_VERSION = '/api/v1';

// ==========================================
// AXIOS INSTANCE
// ==========================================

const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}${API_VERSION}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ==========================================
// REQUEST INTERCEPTOR - Dodaj JWT token
// ==========================================

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR - Ekstrakcija ETag-a
// ==========================================

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Ekstraktuj ETag iz response header-a i prosleđi u data
    const eTag = response.headers['etag'];
    if (eTag && response.data) {
      // Ako je array, dodaj eTag samo prvom elementu (debug)
      if (Array.isArray(response.data)) {
        // Za lookup liste, nemamo ETag
      } else {
        response.data.eTag = eTag;
      }
    }
    return response;
  },
  (error) => {
    // Hendluj 409 Conflict posebno
    if (error.response?.status === 409) {
      const conflictData: ConflictErrorResponse = error.response.data;
      return Promise.reject({
        status: 409,
        message: conflictData.message || 'Stavka je promenjena od drugog korisnika',
        data: conflictData,
      } as ApiError);
    }

    // Ostale greške
    const apiError: ApiError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'API greška',
      data: error.response?.data,
    };

    return Promise.reject(apiError);
  }
);

// ==========================================
// HELPER FUNKCIJE
// ==========================================

/**
 * Get zahtev sa opsionalnim query parametrima
 */
export const apiGet = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> => {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
};

/**
 * Post zahtev - kreiraj novi resurs
 */
export const apiPost = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

/**
 * PATCH zahtev sa If-Match header-om za ETag konkurentnost
 * OBAVEZNO: eTag mora biti prosleđen!
 */
export const apiPatch = async <T>(
  url: string,
  data: unknown,
  eTag: string
): Promise<T> => {
  const response = await apiClient.patch<T>(url, data, {
    headers: {
      'If-Match': `"${eTag}"`, // Navodnici su obavezni!
    },
  });
  return response.data;
};

/**
 * Delete zahtev - obriši resurs
 */
export const apiDelete = async (
  url: string
): Promise<void> => {
  await apiClient.delete(url);
};

/**
 * Wrapper za 409 Conflict detekciju
 */
export const handleConflict = (error: unknown): ConflictErrorResponse | null => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as ApiError).status === 409
  ) {
    return (error as ApiError).data as ConflictErrorResponse;
  }
  return null;
};

export default apiClient;
