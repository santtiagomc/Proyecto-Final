const { Router } = require('express');

// Traigo las funciones necesarias
const { getBooks } = require("../utils/getBooks");
const { createBook } = require("../utils/createBook");

const { Books, Genres } = require("../db");

const router = Router();

router.get("/", async (req, res) => { });

router.post("/", async (req, res) => {
  const response = await createBook(req.body);

  let statusCode
  response.messageError ? statusCode = 404 : statusCode = 201

  res.status(statusCode).json(response)
});

module.exports = router;

