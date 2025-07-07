/*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server'); // Importa el servidor Express para hacer peticiones

chai.use(chaiHttp);

let testId; // Variable global para almacenar el _id de un libro creado y usarlo en pruebas posteriores

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Test básico para GET /api/books que verifica:
  * - Status 200 OK
  * - La respuesta es un arreglo
  * - Los objetos dentro tienen las propiedades: commentcount, title, _id
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        if (!res.body[0]) {
          done();
          return;
        }
        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {

      // Prueba para crear un libro con título válido
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({ title: 'Libro de prueba' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.equal(res.body.title, 'Libro de prueba');
            testId = res.body._id; // Guardamos el id para pruebas posteriores
            done();
          });
      });

      // Prueba para crear un libro sin enviar título (debe fallar)
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required field title');
            done();
          });
      });

    });

    suite('GET /api/books => array of books', function() {

      // Prueba para obtener la lista de todos los libros
      test('Test GET /api/books',  function(done) {
        chai.request(server)
          .get('/api/books')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            done();
          });
      });

    });

    suite('GET /api/books/[id] => book object with [id]', function() {

      // Prueba para obtener un libro con un id inválido (no existente)
      test('Test GET /api/books/[id] with id not in db',  function(done) {
        chai.request(server)
          .get('/api/books/000000000000000000000000')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

      // Prueba para obtener un libro con un id válido (creado previamente)
      test('Test GET /api/books/[id] with valid id in db',  function(done) {
        chai.request(server)
          .get('/api/books/' + testId)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, '_id');
            assert.property(res.body, 'title');
            assert.property(res.body, 'comments');
            assert.isArray(res.body.comments);
            done();
          });
      });

    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function() {

      // Prueba para agregar un comentario a un libro existente
      test('Test POST /api/books/[id] with comment', function(done) {
        chai.request(server)
          .post('/api/books/' + testId)
          .send({ comment: 'Comentario de prueba' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'comments');
            assert.include(res.body.comments, 'Comentario de prueba');
            done();
          });
      });

      // Prueba para agregar un comentario sin enviar el campo comment (debe fallar)
      test('Test POST /api/books/[id] without comment field', function(done) {
        chai.request(server)
          .post('/api/books/' + testId)
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required field comment');
            done();
          });
      });

      // Prueba para agregar un comentario a un libro con id no existente
      test('Test POST /api/books/[id] with comment, id not in db', function(done) {
        chai.request(server)
          .post('/api/books/000000000000000000000000')
          .send({ comment: 'No existe' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      // Prueba para eliminar un libro con id válido
      test('Test DELETE /api/books/[id] with valid id in db', function(done) {
        chai.request(server)
          .delete('/api/books/' + testId)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'delete successful');
            done();
          });
      });

      // Prueba para eliminar un libro con id no existente
      test('Test DELETE /api/books/[id] with  id not in db', function(done) {
        chai.request(server)
          .delete('/api/books/000000000000000000000000')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

    });

  });

});
