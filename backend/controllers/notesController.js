const Note = require('../models/Note'); // Importa el modelo Note
const { Op } = require('sequelize');

// Obtener todas las notas
const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll(); // Recupera todas las notas de la base de datos
    res.json(notes); // Devuelve las notas
  } catch (error) {
    console.error('Error al obtener las notas:', error);
    res.status(500).json({ message: 'Error al obtener las notas' });
  }
};

// Obtener una nota por su ID
const getNote = async (req, res) => {
  const noteId = parseInt(req.params.id);
  try {
    const note = await Note.findByPk(noteId); // Encuentra una nota por su ID
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json(note); // Devuelve la nota encontrada
  } catch (error) {
    console.error('Error al obtener la nota:', error);
    res.status(500).json({ message: 'Error al obtener la nota' });
  }
};

// Crear una nueva nota
const createNote = async (req, res) => {
  const { title, content, archived = false, categories = [] } = req.body;
  try {
    const newNote = await Note.create({
      title,
      content,
      archived,
      categories
    }); // Crea la nueva nota en la base de datos
    res.status(201).json(newNote); // Devuelve la nueva nota creada
  } catch (error) {
    console.error('Error al crear la nota:', error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
};

const updateNote = async (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, content, archived, categories } = req.body;
  try {
    const note = await Note.findByPk(noteId); // Encuentra la nota por su ID
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.archived = archived !== undefined ? archived : note.archived;
    note.categories = categories || note.categories;

    await note.save(); 

    res.json(note); 
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
    res.status(500).json({ message: 'Error al actualizar la nota' });
  }
};

// Eliminar una nota
const deleteNote = async (req, res) => {
  const noteId = parseInt(req.params.id);
  try {
    const note = await Note.findByPk(noteId); 
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    await note.destroy(); 

    res.status(204).end(); 
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
    res.status(500).json({ message: 'Error al eliminar la nota' });
  }
};


const getNotesByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const notes = await Note.findAll({
      where: {
        categories: {
          [Op.contains]: [category],  
        }
      }
    });

    if (notes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron notas con esa categoría' });
    }

    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener las notas' });
  }
};

const updateCategories = async (req, res) => {
  const { id } = req.params;  // Obtienes el id de la URL
  const { categoriesToAdd, categoriesToRemove } = req.body;

  try {
    // Buscar la nota por id
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    // Actualizar las categorías
    const updatedCategories = [
      ...note.categories.filter(cat => !categoriesToRemove.includes(cat)),
      ...categoriesToAdd
    ];

    // Guardar la actualización
    note.categories = updatedCategories;
    await note.save();

    return res.status(200).json(note); // Devolver la nota actualizada
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar las categorías' });
  }
};







module.exports = { getNotes, getNote, createNote, updateNote, deleteNote, getNotesByCategory, updateCategories };
