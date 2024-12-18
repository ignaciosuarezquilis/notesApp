import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data; // Asumiendo que el backend devuelve las notas en un array
};

export const deleteNote = async (id) => {
  await axios.delete(`${API_URL}/notes/${id}`);
};

export const updateNote = async (id, updatedNote) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, updatedNote);
  return response.data;
};

export const addNote = async (note) => {
  const response = await axios.post(`${API_URL}/notes`, note);
  return response.data; // Devuelve la nueva nota con el ID generado
};

export const archiveNote = async (id, updatedNote) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, updatedNote); // Asumimos que la actualización se hace con PUT
  return response.data; // Devuelve la nota actualizada
};

export const updateNoteCategories = async (id, categoriesToAdd, categoriesToRemove) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      categoriesToAdd,
      categoriesToRemove
    });
    return response.data;
  } catch (error) {
    console.error("Error updating categories:", error);
    throw error;
  }
};