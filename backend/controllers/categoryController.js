const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name }); // Sequelize: crear nueva categoría
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la categoría', error });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id); // Buscar por id
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    await category.destroy(); // Eliminar la categoría
    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
};
