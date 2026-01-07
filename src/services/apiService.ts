const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

const getHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export const create = async (serviceName: string, data: any) => {
  const response = await fetch(`${BASE_URL}/${serviceName}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const read = async (serviceName: string, id = '') => {
  const url = id ? `${BASE_URL}/${serviceName}/${id}` : `${BASE_URL}/${serviceName}`;
  const response = await fetch(url, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const update = async (serviceName: string, id: any, data: any) => {
  const response = await fetch(`${BASE_URL}/${serviceName}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const remove = async (serviceName: string, id: any) => {
  const response = await fetch(`${BASE_URL}/${serviceName}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Upload failed');
  }

  const data = await response.json();
  return data.url || data.path || data.fileUrl;
};

export const auth = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (email: string, password: string, name: string) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password, name }),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    const response = await fetch(`${BASE_URL}/user/me`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(response);
  },
};
