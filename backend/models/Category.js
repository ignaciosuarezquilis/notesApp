const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importamos la configuración de la DB

const Category = sequelize.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: false,  // Deshabilita la creación de createdAt y updatedAt
  });
  

module.exports = Category;
