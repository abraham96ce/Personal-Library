// Se importa Mongoose para manejar la conexión con MongoDB
const mongoose = require("mongoose");

// Se obtiene la URI de conexión desde las variables de entorno
const uri = process.env.DB;

// Se establece la conexión con la base de datos utilizando la URI
const db = mongoose.connect(uri);

// Se exporta la conexión para poder utilizarla en otras partes de la aplicación
module.exports = db;
