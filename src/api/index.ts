import axios from "axios";
import type { AxiosError } from "axios";

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

export const apiInstance = axios.create({
  baseURL: import.meta.env.API_BASE_URL ?? "http://localhost:5000",
});

export function errorResponse<E = {}>(e: AxiosError): ApiResponse<never, E> {
  if (e.response != null) {
    const data: any = e.response.data ?? {};

    const error: ApiError<E> = {
      type: data.type ?? "about:blank",
      title: data.title ?? "Internal server error",
      detail:
        data.detail ??
        "The server encountered an internal error and was unable to complete your request.",
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
