// src/libs/apiClient.ts
// Um cliente API simples usando fetch, com suporte a query params e tratamento de erros
// ALISSON RAMOS AQUINO DOS SANTOS - 2025, https://github.com/Alisson-Ramos

const API_PUBLIC_URL = process.env.NEXT_PUBLIC_API_PUBLIC_URL;



function buildQueryParams(params: Record<string, any>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  return query.toString();
}

async function apiClient<T>(
  endpoint: string,
  options?: RequestInit & { params?: Record<string, any> }
): Promise<T> {
  let url = `${API_PUBLIC_URL}${endpoint}`;
  if (options?.params) {
    const queryString = buildQueryParams(options.params);
    url += `?${queryString}`;
  }

  // Pega token do localStorage
  const token = localStorage.getItem('token');

  // Monta headers
  let headers: HeadersInit = {

    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers || {}),
  };
  if (
    !(options?.body instanceof FormData) &&
    (!options?.headers || !('Content-Type' in options.headers))
  ) {
    headers = { ...headers, 'Content-Type': 'application/json' };
  }
  console.log('Requisição para:', url, 'com opções:', options);

  const res = await fetch(url, {
    method: options?.method || 'GET',
    headers,
    ...options,
  });

  // Se o token expirou ou for inválido
  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Token inválido ou expirado');
  }

  if (!res.ok) {
    throw new Error(`Erro ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string, options?: { params?: Record<string, any> }) =>
    apiClient<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body: any, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),

  put: <T>(endpoint: string, body: any) =>
    apiClient<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    apiClient<T>(endpoint, { method: 'DELETE' }),
};
