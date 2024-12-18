const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notesRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const sequelize = require('./config/db');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/categories', categoryRoutes);
app.use('/api/notes', notesRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Conexión a la base de datos exitosa!');
}).catch((error) => {
    console.error('Error al conectar con la base de datos', error);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
