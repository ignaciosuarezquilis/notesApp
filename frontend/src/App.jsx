import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NoteForm from './pages/NoteForm';
import NotesFilter from './components/NotesFilter';
import CategoryNotes from './components/CategoryNotes';
import { getNotes, deleteNote, updateNote, archiveNote } from './services/notes';
import { getCategories } from './services/categories';
import './styles/App.css'; // Asegúrate de tener este archivo CSS

function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [notesData, categoriesData] = await Promise.all([getNotes(), getCategories()]);
      setNotes(notesData);
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error al eliminar nota:', error);
    }
  };

  const handleEdit = async (id, updatedNote) => {
    try {
      const updatedData = await updateNote(id, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedData : note))
      );
    } catch (error) {
      console.error('Error al editar nota:', error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const noteToUpdate = notes.find((note) => note.id === id);
      const updatedNote = { ...noteToUpdate, archived: !noteToUpdate.archived };
      await archiveNote(id, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote : note))
      );
    } catch (error) {
      console.error('Error al archivar nota:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <h1>Note Taking App</h1>
        <nav className="nav-buttons">
          <Link to="/note-form" className="nav-button">
            Crear Nota
          </Link>
          <Link to="/notes" className="nav-button">
            Ver Notas
          </Link>
          <Link to="/category-notes" className="nav-button">
            Filtrar por Categoría
          </Link>
        </nav>
        <Routes>
          <Route
            path="/note-form"
            element={<NoteForm onSave={(note) => setNotes([...notes, note])} />}
          />
          <Route
            path="/notes"
            element={
              loading ? (
                <p>Cargando notas...</p>
              ) : (
                <NotesFilter
                  notes={notes}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                />
              )
            }
          />
          <Route
            path="/category-notes"
            element={<CategoryNotes categories={categories} notes={notes} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
