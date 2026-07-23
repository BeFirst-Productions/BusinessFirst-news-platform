/**
 * Centralized API Client for Website
 * 
 * Features:
 * - Server & Client side compatible
 * - Automatic request deduplication
 * - Built-in error handling
 * - Type-safe responses
 * - Request/Response interceptors
 * - Automatic token management
 */

import { ApiResponse, PaginatedResponse } from '@businessfirst/shared-types';

// ==================== TYPES ====================

interface RequestConfig extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  timeout?: number;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
}

// ==================== ERROR CLASSES ====================

export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export class NetworkError extends ApiClientError {
  constructor(message: string) {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends ApiClientError {
  constructor(message = 'Authentication required') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends ApiClientError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends ApiClientError {
  constructor(message: string, data?: unknown) {
    super(message, 422, data);
    this.name = 'ValidationError';
  }
}

export class ServerError extends ApiClientError {
  constructor(message = 'Internal server error') {
    super(message, 500);
    this.name = 'ServerError';
  }
}

// ==================== API CLIENT CLASS ====================

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;
  
  // In-memory request deduplication (server-side)
  private pendingRequests: Map<string, Promise<unknown>> = new Map();

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.defaultHeaders,
    };
    this.timeout = config.timeout || 30000;
  }

  // ==================== PUBLIC METHODS ====================

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', endpoint, config);
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', endpoint, { ...config, body: data });
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', endpoint, { ...config, body: data });
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', endpoint, { ...config, body: data });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', endpoint, config);
  }

  // ==================== PAGINATED REQUESTS ====================

  async getPaginated<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<PaginatedResponse<T>> {
    return this.request<PaginatedResponse<T>>('GET', endpoint, config);
  }

  // ==================== FILE UPLOAD ====================

  async upload<T>(
    endpoint: string,
    formData: FormData,
    config?: RequestConfig
  ): Promise<T> {
    const { 'Content-Type': _, ...headers } = this.defaultHeaders;
    return this.request<T>('POST', endpoint, {
      ...config,
      body: formData,
      headers,
    });
  }

  // ==================== CORE REQUEST METHOD ====================

  private async request<T>(
    method: string,
    endpoint: string,
    config?: RequestConfig
  ): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);
    const requestKey = this.getRequestKey(method, url);

    // Request deduplication for GET requests
    if (method === 'GET' && this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey) as Promise<T>;
    }

    const requestPromise = this.executeRequest<T>(method, url, config);
    
    if (method === 'GET') {
      this.pendingRequests.set(requestKey, requestPromise);
      requestPromise.finally(() => {
        this.pendingRequests.delete(requestKey);
      });
    }

    return requestPromise;
  }

  private async executeRequest<T>(
    method: string,
    url: string,
    config?: RequestConfig
  ): Promise<T> {
    const { params, body, timeout, next, ...fetchConfig } = config || {};

    // Build headers
    const headers = new Headers(this.defaultHeaders);
    
    // Add auth token if available (client-side only)
    if (typeof window !== 'undefined') {
      const token = this.getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    // Add custom headers from config
    if (fetchConfig.headers) {
      const customHeaders = new Headers(fetchConfig.headers as HeadersInit);
      customHeaders.forEach((value, key) => {
        headers.set(key, value);
      });
    }

    // Build fetch options
    const fetchOptions: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
      method,
      headers,
      ...fetchConfig,
      // Next.js fetch cache options
      ...(next ? { next } : {}),
    };

    // Add body for non-GET requests
    if (body !== undefined && method !== 'GET') {
      fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    fetchOptions.signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout || this.timeout);

    try {
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      return await this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new NetworkError('Request timeout');
      }

      if (error instanceof ApiClientError) {
        throw error;
      }

      throw new NetworkError(
        error instanceof Error ? error.message : 'Network error occurred'
      );
    }
  }

  // ==================== RESPONSE HANDLER ====================

  private async handleResponse<T>(response: Response): Promise<T> {
    // Handle no content
    if (response.status === 204) {
      return undefined as T;
    }

    // Parse JSON response
    let data: ApiResponse<T>;
    try {
      data = await response.json();
    } catch {
      throw new ServerError('Invalid response format');
    }

    // Handle API errors
    if (!response.ok || !data.success) {
      this.handleErrorResponse(response.status, data);
    }

    return data.data as T;
  }

  private handleErrorResponse(statusCode: number, data: ApiResponse): never {
    const message = data.message || 'An error occurred';

    switch (statusCode) {
      case 400:
        throw new ValidationError(message, data.error);
      case 401:
        this.clearAuthToken();
        throw new AuthenticationError(message);
      case 403:
        throw new ApiClientError(message, 403);
      case 404:
        throw new NotFoundError(message);
      case 409:
        throw new ApiClientError(message, 409);
      case 422:
        throw new ValidationError(message, data.error);
      case 429:
        throw new ApiClientError('Too many requests. Please try again later.', 429);
      case 500:
      case 502:
      case 503:
        throw new ServerError(message);
      default:
        throw new ApiClientError(message, statusCode);
    }
  }

  // ==================== HELPERS ====================

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private getRequestKey(method: string, url: string): string {
    return `${method}:${url}`;
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Get from localStorage or cookie
    try {
      const authStore = localStorage.getItem('auth-storage');
      if (authStore) {
        const parsed = JSON.parse(authStore);
        return parsed?.state?.accessToken || null;
      }
    } catch {
      // Ignore parse errors
    }
    
    return null;
  }

  private clearAuthToken(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('auth-storage');
    } catch {
      // Ignore errors
    }
  }

  // ==================== CACHE INVALIDATION ====================

  async revalidateTag(tag: string): Promise<void> {
    if (typeof window !== 'undefined') return;
    
    try {
      await fetch(`${this.baseUrl}/api/revalidate?tag=${tag}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to revalidate tag:', tag, error);
    }
  }

  async revalidatePath(path: string): Promise<void> {
    if (typeof window !== 'undefined') return;
    
    try {
      await fetch(`${this.baseUrl}/api/revalidate?path=${path}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to revalidate path:', path, error);
    }
  }
}

// ==================== SINGLETON INSTANCE ====================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083/api/v1';

export const apiClient = new ApiClient({
  baseUrl: API_BASE_URL,
  timeout: 30000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});

// Export for direct use
export default apiClient;