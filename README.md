# Personal Library

Este proyecto es una aplicación full stack en JavaScript que funciona como una **API para una biblioteca personal**, permitiendo administrar libros y sus comentarios. Su desarrollo se basa en el proyecto original de freeCodeCamp.

---

## Descripción

Se implementó una API RESTful que permite a los usuarios:

- Registrar libros nuevos mediante un título.
- Consultar la lista completa de libros con sus respectivos títulos, identificadores únicos y cantidad de comentarios.
- Obtener los detalles de un libro específico, incluyendo todos sus comentarios.
- Agregar comentarios a libros existentes.
- Eliminar libros de forma individual o masiva.

El backend está desarrollado utilizando **Node.js**, **Express** y **MongoDB**, con **Mongoose** para el modelado de datos.

---

## Origen del proyecto

Este proyecto fue clonado y adaptado desde el repositorio oficial de freeCodeCamp:

[https://github.com/freeCodeCamp/boilerplate-project-personal-library](https://github.com/freeCodeCamp/boilerplate-project-personal-library)

Se realizaron modificaciones con el objetivo de cumplir con los requisitos funcionales propuestos.

---

## Funcionalidades principales

- **POST /api/books**: Se crea un libro nuevo con un título obligatorio. Si no se proporciona el título, se devuelve un mensaje de error.
- **GET /api/books**: Se obtiene un arreglo con todos los libros, incluyendo el título, el _id y la cantidad de comentarios.
- **GET /api/books/{_id}**: Se obtiene un libro específico con todos sus comentarios. Si el libro no existe, se devuelve un mensaje de error.
- **POST /api/books/{_id}**: Se añade un comentario a un libro. El campo comment es obligatorio. Si no existe el libro o no se proporciona el comentario, se devuelve un mensaje de error.
- **DELETE /api/books/{_id}**: Se elimina un libro específico por su ID. Se devuelve una confirmación o un mensaje de error si el libro no existe.
- **DELETE /api/books**: Se eliminan todos los libros de la base de datos.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Mocha y Chai (para pruebas funcionales)
