import { toast } from 'react-toastify';

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

const getServiceDisplayName = (serviceName: string): string => {
  const serviceNames: { [key: string]: string } = {
    'education': 'Education',
    'experience': 'Experience',
    'skill': 'Skill',
    'certificate': 'Certificate',
    'publication': 'Publication',
    'project': 'Project',
    'home-section': 'Hero Section',
  };
  return serviceNames[serviceName] || serviceName;
};

export const create = async (serviceName: string, data: any) => {
  try {
    delete data._id;
    
    const response = await fetch(`${BASE_URL}/${serviceName}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const result = await handleResponse(response);

    const displayName = getServiceDisplayName(serviceName);
    toast.success(`${displayName} added successfully!`);

    return result;
  } catch (error) {
    const displayName = getServiceDisplayName(serviceName);
    toast.error(`Failed to add ${displayName.toLowerCase()}: ${(error as Error).message}`);
    throw error;
  }
};

export const read = async (serviceName: string, id = '') => {
  try {
    const url = id ? `${BASE_URL}/${serviceName}/${id}` : `${BASE_URL}/${serviceName}`;
    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    const displayName = getServiceDisplayName(serviceName);
    toast.error(`Failed to fetch ${displayName.toLowerCase()}: ${(error as Error).message}`);
    throw error;
  }
};

export const update = async (serviceName: string, id: any = null, data: any) => {
  try {
    const url = id ? `${BASE_URL}/${serviceName}/${id}` : `${BASE_URL}/${serviceName}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const result = await handleResponse(response);

    const displayName = getServiceDisplayName(serviceName);
    toast.success(`${displayName} updated successfully!`);

    return result;
  } catch (error) {
    const displayName = getServiceDisplayName(serviceName);
    toast.error(`Failed to update ${displayName.toLowerCase()}: ${(error as Error).message}`);
    throw error;
  }
};

export const remove = async (serviceName: string, id: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${serviceName}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const result = await handleResponse(response);

    const displayName = getServiceDisplayName(serviceName);
    toast.success(`${displayName} deleted successfully!`);

    return result;
  } catch (error) {
    const displayName = getServiceDisplayName(serviceName);
    toast.error(`Failed to delete ${displayName.toLowerCase()}: ${(error as Error).message}`);
    throw error;
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const toastId = toast.loading('Uploading file...');

  try {
    const formData = new FormData();
    formData.append('image', file);

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
    const fileUrl = data.imageUrl || data.path || data.fileUrl;

    toast.update(toastId, {
      render: 'File uploaded successfully!',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });

    return fileUrl;
  } catch (error) {
    toast.update(toastId, {
      render: `Upload failed: ${(error as Error).message}`,
      type: 'error',
      isLoading: false,
      autoClose: 5000,
    });
    throw error;
  }
};

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email, password }),
      });
      const result = await handleResponse(response);

      toast.success('Login successful! Welcome back.');

      return result;
    } catch (error) {
      toast.error(`Login failed: ${(error as Error).message}`);
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email, password, name }),
      });
      const result = await handleResponse(response);

      toast.success('Registration successful! Please log in.');

      return result;
    } catch (error) {
      toast.error(`Registration failed: ${(error as Error).message}`);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getHeaders(),
      });
      const result = await handleResponse(response);

      toast.success('Logged out successfully!');

      return result;
    } catch (error) {
      toast.error(`Logout failed: ${(error as Error).message}`);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/me`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/change-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ currentPassword, newPassword, reEnterPassword: newPassword }),
      });
      const result = await handleResponse(response);

      toast.success('Password changed successfully!');

      return result;
    } catch (error) {
      toast.error(`Failed to change password: ${(error as Error).message}`);
      throw error;
    }
  },
};
