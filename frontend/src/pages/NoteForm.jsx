import React, { useState, useEffect } from 'react';
import { addNote } from '../services/notes';
import { getCategories } from '../services/categories';
import { FaTimes } from 'react-icons/fa'; // Icono para eliminar categoría
import '../styles/NoteForm.css'; // Importar el archivo CSS

function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content, categories: selectedCategories };

    try {
      await addNote(newNote);
      setTitle('');
      setContent('');
      setSelectedCategories([]);
      setError(null);
      console.log('Nota guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      setError('Hubo un problema al guardar la nota. Intenta de nuevo.');
    }
  };

  const handleCategoryChange = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        category,
      ]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.filter((cat) => cat !== category)
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create New Note</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            placeholder="Enter note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            rows="5"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categories" className="form-label">Categories</label>
          <select
            id="categories"
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="form-select"
            multiple
          >
            {categories
              .filter((category) => !selectedCategories.includes(category.name))
              .map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <h5>Selected Categories:</h5>
          <ul className="list-group">
            {selectedCategories.map((category, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {category}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="btn btn-sm btn-danger"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn btn-primary w-100">Save Note</button>
      </form>

      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
}

export default NoteForm;
