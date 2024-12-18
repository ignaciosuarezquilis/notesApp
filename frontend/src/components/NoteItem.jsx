import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/categories';
import  '../styles/NoteItem.css';


const NoteItem = ({ note, onDelete, onEdit, onArchive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [availableCategories, setAvailableCategories] = useState([]); // Almacena las categorías disponibles
  const [selectedCategories, setSelectedCategories] = useState(note.categories || []); // Almacena las categorías seleccionadas

  // Obtener las categorías disponibles
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setAvailableCategories(categories); // Asigna las categorías disponibles
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleSaveEdit = () => {
    // Guarda el título, contenido y categorías de la nota
    onEdit(note.id, { ...note, title: editedTitle, content: editedContent, categories: selectedCategories });
    setIsEditing(false);
  };

  const handleArchiveToggle = () => {
    onArchive(note.id); // Cambia el estado de "archived"
  };

  const handleCategoryChange = (category, isChecked) => {
    if (isChecked) {
      // Si la categoría está seleccionada, añádela a las categorías seleccionadas
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    } else {
      // Si la categoría no está seleccionada, elimínala de las categorías seleccionadas
      setSelectedCategories((prevSelected) => prevSelected.filter((cat) => cat !== category));
    }
  };

  return (
    <li className="note-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Edit title"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edit content"
          />
          
          <div>
            <strong>Categorías actuales:</strong>
            {note.categories && note.categories.length > 0 ? (
              <ul>
                {note.categories.map((category, index) => (
                  <li key={index}>
                    {category}
                    <button 
                      onClick={() => setSelectedCategories(selectedCategories.filter((cat) => cat !== category))}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No categories assigned</p>
            )}
          </div>

          <div>
            <strong>Seleccionar categorías para agregar:</strong>
            <ul>
              {availableCategories.map((category) => (
                <li key={category.id}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={(e) => handleCategoryChange(category.name, e.target.checked)}
                  />
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div>
            <strong>Categorías:</strong>
            {note.categories && note.categories.length > 0 ? (
              <ul>
                {note.categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            ) : (
              <p>No categories assigned</p>
            )}
          </div>

          <div className="note-actions">
            <button className="note-action-button" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="note-action-button" onClick={() => onDelete(note.id)}>Eliminar</button>
            <button className="note-action-button" onClick={handleArchiveToggle}>
              {note.archived ? 'Active' : 'Archive'}
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default NoteItem;
