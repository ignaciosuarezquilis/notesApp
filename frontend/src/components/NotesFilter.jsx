import React, { useState } from 'react';
import NotesList from './NotesList';
import '../styles/NotesFilter.css';

const NotesFilter = ({ notes, onDelete, onEdit, onArchive }) => {
  const [filter, setFilter] = useState('all');

  const filteredNotes = notes.filter((note) => {
    if (filter === 'active') return !note.archived;
    if (filter === 'archived') return note.archived;
    return true;
  });

  return (
    <div>
      <div>
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active-filter' : ''}
        >
          Todas
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active-filter' : ''}
        >
          Activas
        </button>
        <button 
          onClick={() => setFilter('archived')}
          className={filter === 'archived' ? 'active-filter' : ''}
        >
          Archivadas
        </button>
      </div>
      <NotesList 
        notes={filteredNotes} 
        onDelete={onDelete} 
        onEdit={onEdit} 
        onArchive={onArchive} 
      />
    </div>
  );
};

export default NotesFilter;
