import React, { useState } from 'react';
import { addCategory, deleteCategory } from '../services/categories'; // Importar las funciones necesarias para el manejo de categorías

const CategoryPopup = ({ isVisible, onClose, categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return; // Si el campo está vacío, no hacemos nada

    try {
      const addedCategory = await addCategory(newCategory);
      setCategories([...categories, addedCategory]); // Agregamos la nueva categoría a la lista
      setNewCategory(''); // Limpiamos el campo
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId); // Llama al servicio para eliminar la categoría
      setCategories(categories.filter((category) => category.id !== categoryId)); // Elimina la categoría de la lista
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  if (!isVisible) return null; // Si el pop-up no está visible, no renderizamos nada

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Categorías</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}
              <button onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
            </li>
          ))}
        </ul>

        {/* Formulario para agregar nueva categoría */}
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
        />
        <button onClick={handleAddCategory}>Agregar Categoría</button>

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CategoryPopup;
