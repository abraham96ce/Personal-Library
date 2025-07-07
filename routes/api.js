/*
*
*       Complete the API routing below
*
*/

'use strict';

const Book = require("../models").Book;

module.exports = function (app) {

  // Rutas para /api/books (colección completa de libros)
  app.route('/api/books')
    // Obtiene todos los libros
    .get(async (_req, res) => {
      try {
        const books = await Book.find({});
        if (!books) {
          return res.json([]);
        }
        // Se formatea cada libro con título, _id, comentarios y el número de comentarios
        const formatData = books.map((book) => ({
          _id: book._id,
          title: book.title,
          comments: book.comments,
          commentcount: book.comments.length,
        }));
        return res.json(formatData);
      } catch (err){
        // En caso de error se responde con un arreglo vacío
        res.json([]);
      }
    })

    // Crea un nuevo libro
    .post(async (req, res) => {
      const title = req.body.title;
      if (!title) {
        return res.send("missing required field title");
      }
      const newBook = new Book({ title, comments: [] });
      try {
        const book = await newBook.save();
        return res.json({ _id: book._id, title: book.title });
      } catch (err) {
        res.send("there was an error saving");
      }
    })

    // Elimina todos los libros
    .delete(async (_req, res) => {
      try {
        const deleted = await Book.deleteMany();
        console.log("deleted :>> ", deleted);
        res.send("complete delete successful");
      } catch {
        res.send("error");
      }
    });

  // Rutas para /api/books/:id (libro específico por ID)
  app.route('/api/books/:id')
    // Obtiene un libro específico por su ID
    .get(async (req, res) => {
      const bookid = req.params.id;
      try {
        const book = await Book.findById(bookid);
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
          commentcount: book.comments.length,
        });
      } catch (err) {
        res.send("no book exists");
      }
    })

    // Agrega un comentario a un libro específico
    .post(async (req, res) => {
      const bookid = req.params.id;
      const comment = req.body.comment;

      if (!comment) {
        return res.send("missing required field comment");
      }

      try {
        let book = await Book.findById(bookid);
        book.comments.push(comment);
        book = await book.save();
        res.json({
          comments: book.comments,
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        });
      } catch (err) {
        res.send("no book exists");
      }
    })

    // Elimina un libro específico
    .delete(async (req, res) => {
      const bookid = req.params.id;
      try {
        const deleted = await Book.findByIdAndDelete(bookid);
        console.log("deleted :>> ", deleted);
        if (!deleted) throw new Error("no book exists");
        res.send("delete successful");
      } catch (err) {
        res.send("no book exists");
      }
    });
};
