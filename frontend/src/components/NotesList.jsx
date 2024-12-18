import React from 'react';
import NoteItem from './NoteItem';
import '../styles/NotesList.css'; // Importa el archivo CSS

const NotesList = ({ notes, onDelete, onEdit, onArchive }) => {
  if (notes.length === 0) {
    return <p>No hay notas para mostrar.</p>;
  }

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
          onEdit={onEdit} 
          onArchive={onArchive} 
        />
      ))}
    </ul>
  );
};

export default NotesList;
