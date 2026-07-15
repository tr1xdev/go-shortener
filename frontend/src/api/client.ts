const API_BASE = 'http://localhost:8181';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  public get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  public post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const apiClient = new ApiClient();
