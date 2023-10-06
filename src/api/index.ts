import { TOKEN_KEY } from '@/utils/constants';
import { getLocalStorage } from '@/utils/localStorage';
import axios from 'axios';
import type { AxiosError } from 'axios';
import router from '@/router';

export type ApiError<E = {}> = E & {
  type: string;
  title: string;
  detail: string;
  status: number;
};

export type Failable<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };

export type ApiResponse<T, E = {}> = Failable<T, ApiError<E>>;
let token = getLocalStorage(TOKEN_KEY);

export let apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000',
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export function createNewAxiosInstance() {
  token = getLocalStorage(TOKEN_KEY);
  apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export function errorResponse<E = {}>(e: AxiosError): ApiResponse<never, E> {
  if (
    e.code === 'ERR_NETWORK' &&
    router.currentRoute.value.name !== 'service_unavailable' && 
    router.currentRoute.value.name !== 'not_found'
  ) {
    router.push({ name: 'service_unavailable' });
  } else if (e.response != null) {
    const defaultMessage =
      'The server encountered an internal error and was unable to complete your request.';
    const defaultType = 'Server error';

    const data: any = e.response.data ?? {};
    const error: ApiError<E> =
      typeof data === 'string'
        ? {
            type: defaultType,
            title: data,
            detail: defaultMessage,
            status: e.response.status ?? 500,
          }
        : {
            type: data.type ?? defaultType,
            title: data.title ?? 'Internal server error',
            detail: data.detail ?? defaultMessage,
            status: data.status ?? e.response.status ?? 500,
            ...data,
          };

    return { success: false, error };
  } else {
    const error: ApiError<any> = {
      type: e.name,
      title: e.name,
      detail: e.message,
      status: 500,
    };

    return { success: false, error };
  }
}
