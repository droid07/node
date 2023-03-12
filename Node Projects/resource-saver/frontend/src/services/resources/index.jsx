import { baseURL } from '../base';

const createResource = async (data) => {
  const res = await fetch(`${baseURL}/resources`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  } else {
    return await res.json();
  }
};

const getAllResources = async () => {
  const res = await fetch(`${baseURL}/resources`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  } else {
    return await res.json();
  }
};

const updateResource = async ({ id, name, description }) => {
  const res = await fetch(`${baseURL}/resources/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  } else {
    return await res.json();
  }
};

const deleteResource = async (id) => {
  const res = await fetch(`${baseURL}/resources/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  } else {
    return await res.json();
  }
};

export { createResource, getAllResources, updateResource, deleteResource };
