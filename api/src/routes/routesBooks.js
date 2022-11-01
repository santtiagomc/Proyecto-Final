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
const { pagination } = require("../utils/pagination");
const { getAllBooksAdmin } = require("../utils/getAllBooksAdmin");

const router = Router();

router.get("/", async (req, res) => {
  const { name, author, all, page } = req.query;

  let books;
  if (all) {
    books = await getBooksByAll(all);
  } else if (name) {
    books = await getBooksByName(name);
  } else if (author) {
    books = await getBooksByAuthor(author);
  } else {
    books = await getAllBooks();
  }

  let booksFiltereds = books.messageError
    ? books
    : await getBooksByFilters(books, req.query);

  booksFiltereds = booksFiltereds.messageError
    ? booksFiltereds
    : pagination(booksFiltereds, page);

  booksFiltereds.messageError
    ? res.status(404).json(booksFiltereds)
    : res.status(201).json(booksFiltereds);
});

router.post("/", async (req, res) => {
  const response = await postBook(req.body);

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

router.post("/all", async (req, res) => {
  const response = await postAllBooks(req.body);

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

router.get("/page", async (req, res) => {
  const { page } = req.query;

  let books = await getBooks(page);

  books.messageError
    ? res.status(404).json(books)
    : res.status(201).json(books);
});

router.get("/admin", async (req, res) => {
  let books = await getAllBooksAdmin(req.query);

  books.messageError
    ? res.status(404).json(books)
    : res.status(201).json(books);
});

module.exports = router;
