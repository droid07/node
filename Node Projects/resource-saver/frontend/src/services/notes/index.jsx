import { baseURL } from '../base';

const createNote = async ({ id, title, content }) => {
  const res = await fetch(`${baseURL}/notes/add/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  } else {
    return await res.json();
  }
};

const getAllNotes = async (slug) => {
  const res = await fetch(`${baseURL}/resources?slug=${slug}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  } else {
    return await res.json();
  }
};

const updateNote = async ({ id, title, content }) => {
  const res = await fetch(`${baseURL}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  } else {
    return await res.json();
  }
};

const deleteNote = async (id) => {
  const res = await fetch(`${baseURL}/notes/${id}`, {
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

export { createNote, getAllNotes, updateNote, deleteNote };
