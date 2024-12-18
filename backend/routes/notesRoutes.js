const express = require('express');
const { getNotes, getNote, createNote, updateNote, deleteNote, getNotesByCategory, updateCategories} = require('../controllers/notesController');
const router = express.Router();

router.get('/', getNotes); // Obtener todas las notas
router.get('/:id', getNote); // Obtener una nota por ID
router.post('/', createNote); // Crear una nueva nota
router.put('/:id', updateNote); // Actualizar una nota existente
router.delete('/:id', deleteNote); // Eliminar una nota
router.get('/category/:category',getNotesByCategory);
router.put('/update-category/:id', updateCategories);

module.exports = router;
