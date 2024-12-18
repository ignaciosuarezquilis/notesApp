const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.DB_HOST, // Leer desde el archivo .env
  dialect: 'postgres',
  username: process.env.DB_USER, // Leer desde el archivo .env
  password: process.env.DB_PASSWORD, // Leer desde el archivo .env
  database: 'notas_app', // Leer desde el archivo .env
  logging: false, // Opcional: Desactivar los logs SQL
});

module.exports = sequelize;
