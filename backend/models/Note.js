const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Tu configuración de la base de datos

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Para almacenar un arreglo de categorías
    defaultValue: [],
  },
}, {
  tableName: 'notes', // Asegúrate de que el nombre de la tabla sea 'notes'
  timestamps: false,  // Si quieres que Sequelize maneje los campos createdAt y updatedAt
});

module.exports = Note;
