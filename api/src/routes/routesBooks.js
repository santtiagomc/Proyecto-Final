const { Router } = require('express');

// Traigo las funciones necesarias
const { getBooksByName } = require('../utils/getBooksByName')
const { createBook } = require('../utils/createBook')

const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    const books = await getBooksByName(name);

    books.messageError? 
    res.status(404).json(books):
    res.status(201).json(books);

});

router.post("/", async (req, res) => {
  const response = await postBook(req.body);

  let statusCode
  response.messageError ? statusCode = 404 : statusCode = 201

  res.status(statusCode).json(response)
});

router.post("/all", async (req, res) => {
  const response = await postAllBooks(req.body);

  let statusCode
  response.messageError ? statusCode = 404 : statusCode = 201

  res.status(statusCode).json(response)
})

module.exports = router;

