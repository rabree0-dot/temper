const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Network error" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string) => fetchAPI<T>(endpoint),
  post: <T>(endpoint: string, data?: unknown) =>
    fetchAPI<T>(endpoint, { method: "POST", body: JSON.stringify(data) }),
  put: <T>(endpoint: string, data?: unknown) =>
    fetchAPI<T>(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) => fetchAPI<T>(endpoint, { method: "DELETE" }),

  upload: async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Upload failed" }));
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
  },
};
