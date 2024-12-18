import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data; // Suponiendo que el backend devuelve las categorías en un array
};


export const addCategory = async (categoryName) => {
    const response = await axios.post(`${API_URL}/categories`, { name: categoryName });
    return response.data; // Devuelve la categoría recién agregada
  };
  
  // Eliminar categoría
export const deleteCategory = async (id) => {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data; // Suponiendo que el backend devuelve un mensaje de éxito o la categoría eliminada
  };