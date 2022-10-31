const { Router } = require("express");

// Traigo las funciones necesarias
const { getGenres } = require("../utils/getGenres");
const { postGenre } = require("../utils/postGenre");
const { postAllGenres } = require("../utils/postAllGenres");
const { deleteGenre } = require("../utils/deleteGenre");

const router = Router();

router.get("/", async (req, res) => {
  const response = await getGenres(req.query);

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

router.post("/", async (req, res) => {
  const response = await postGenre(req.body);
  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

router.post("/all", async (req, res) => {
  const response = await postAllGenres(req.body);

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

router.delete("/:name", async (req, res) => {
  const response = await deleteGenre(req.params);
  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

module.exports = router;
