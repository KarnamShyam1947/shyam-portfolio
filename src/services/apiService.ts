const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

export const create = async (serviceName: string, data: any) => {
  const response = await fetch(`${BASE_URL}/${serviceName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const read = async (serviceName: string, id = '') => {
  const url = id ? `${BASE_URL}/${serviceName}/${id}` : `${BASE_URL}/${serviceName}`;
  const response = await fetch(url);
  return handleResponse(response);
};

export const update = async (serviceName: string, id: any, data: any) => {
  const response = await fetch(`${BASE_URL}/${serviceName}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const remove = async (serviceName: string, id: any) => {
  const response = await fetch(`${BASE_URL}/${serviceName}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

const handleResponse = async (response: any) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API error');
  }
  return response.json().catch(() => ({}));
};
