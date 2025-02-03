import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError } from "./error";
import type { Response } from "./response";

const DOMAIN = import.meta.env.BASE_URL;

export interface RequestConfig extends Omit<AxiosRequestConfig, "url"> {
  version?: string;
  endpoint: string;
}

const httpClient: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = jsCookie.get(import.meta.env.JWT_NAME);
    const token = null;
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace("Bearer ", "")}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling success responses
httpClient.interceptors.response.use(
  (response: AxiosResponse<Response<any>>) => {
    // Directly return the data payload for successful responses
    return response.data;
  },
  (error: AxiosError<Response<any>>) => {
    // Handle API error responses
    if (error.response) {
      // Convert error response to ApiError instance
      throw new ApiError(error.response.data);
    }

    // Handle network errors/no response
    throw new Error(
      error.message || "Network error occurred. Please try again.",
    );
  },
);

const buildUrl = (config: RequestConfig): string => {
  const { version = "v1", endpoint } = config;
  const cleanEndpoint = endpoint.replace(/^\//, ""); // Remove leading slash if exists

  return `${DOMAIN}/api/${version}/${cleanEndpoint}`;
};

export const httpRequest = {
  get: <T>(config: RequestConfig): Promise<AxiosResponse<T>> => {
    const { headers, params, ...rest } = config;
    return httpClient.get<T>(buildUrl(config), {
      headers,
      params,
      ...rest,
    });
  },

  post: <T>(config: RequestConfig): Promise<AxiosResponse<T>> => {
    const { headers, params, data, ...rest } = config;
    return httpClient.post<T>(buildUrl(config), data, {
      headers,
      params,
      ...rest,
    });
  },

  put: <T>(config: RequestConfig): Promise<AxiosResponse<T>> => {
    const { headers, params, data, ...rest } = config;
    return httpClient.put<T>(buildUrl(config), data, {
      headers,
      params,
      ...rest,
    });
  },

  delete: <T>(config: RequestConfig): Promise<AxiosResponse<T>> => {
    const { headers, params, ...rest } = config;
    return httpClient.delete<T>(buildUrl(config), {
      headers,
      params,
      ...rest,
    });
  },
};

// Custom Hook for components
export const useHttp = () => {
  return {
    get: async <T>(config: RequestConfig) => await httpRequest.get<T>(config),
    post: async <T>(config: RequestConfig) => await httpRequest.post<T>(config),
    put: async <T>(config: RequestConfig) => await httpRequest.put<T>(config),
    delete: async <T>(config: RequestConfig) =>
      await httpRequest.delete<T>(config),
  };
};
