const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories); // Obtener todas las categorías
router.post('/', categoryController.createCategory); // Crear una nueva categoría
router.delete('/:id', categoryController.deleteCategory); // Eliminar una categoría

module.exports = router;
