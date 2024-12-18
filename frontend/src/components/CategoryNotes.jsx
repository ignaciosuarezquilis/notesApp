import React, { useState } from 'react';

function CategoryNotes({ categories, notes }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredNotes = notes.filter(note =>
    selectedCategory ? note.categories.includes(selectedCategory) : true
  );

  return (
    <div>
      <h2>Filtrar Notas por Categoría</h2>

      <div>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            style={{
              backgroundColor: selectedCategory === category.name ? '#4CAF50' : '#008CBA',
              color: 'white',
              padding: '10px',
              margin: '5px',
              borderRadius: '5px'
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <h3>Notas en la categoría "{selectedCategory}":</h3>

      <div>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id}>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
          ))
        ) : (
          <p>No hay notas en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryNotes;
