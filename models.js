// Se importa Mongoose para definir el esquema y el modelo
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Se define el esquema para los libros
const BookSchema = new Schema({
  // Título del libro, campo obligatorio (required)
  title: { type: String, required: true },

  // Arreglo de comentarios asociados al libro
  comments: [String],
});

// Se crea el modelo Book basado en el esquema definido
const Book = mongoose.model("Book", BookSchema);

// Se exporta el modelo para que pueda ser utilizado en otros archivos
exports.Book = Book;

