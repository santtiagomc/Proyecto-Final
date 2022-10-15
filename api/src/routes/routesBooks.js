const { Router } = require("express");

// Traigo las funciones necesarias
const { getAllBooks } = require("../utils/getAllBooks");
const { getBooksByName } = require("../utils/getBooksByName");
const { getBooksByAuthor } = require("../utils/getBooksByAuthor");
const { getBooksByEditorial } = require("../utils/getBooksByEditorial");
const { postBook } = require("../utils/postBook");
const { postAllBooks } = require("../utils/postAllBooks");
const { getBooksByAll } = require("../utils/getBooksByAll");
const { getBooksByFilters } = require("../utils/getBooksByFilters");

const router = Router();

router.get("/", async (req, res) => {
  const { name, author, editorial, all } = req.query;

  let books
  if (all) {
    books = await getBooksByAll(all)
  } else if (name) {
    books = await getBooksByName(name);
  } else if (author) {
    books = await getBooksByAuthor(author);
  } else if (editorial) {
    books = await getBooksByEditorial(editorial);
  } else {
    books = await getAllBooks();
  }

  books.messageError ? res.status(404).json(books) : res.status(201).json(books);
});

router.get("/filters", async (req, res) => {
  // const { filters } = req.body;

  const response = await getBooksByFilters(req.body);

  let statusCode
  response.messageError ? statusCode = 404 : statusCode = 201

  res.status(statusCode).json(response)
})

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

