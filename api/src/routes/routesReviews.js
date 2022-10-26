const { Router } = require('express');

// Traigo las funciones necesarias
const { postReviews } = require('../utils/postReviews')
const { deleteReviews } = require('../utils/deleteReviews')

const router = Router();

router.post("/", async (req, res) => {
  const response = await postReviews(req.body);

  let statusCode
  response.messageError ? statusCode = 404 : statusCode = 201

  res.status(statusCode).json(response)
})

router.delete("/", async (req, res) => {
  const response = await deleteReviews(req.query);

  let statusCode
  response.messageError ? statusCode = 404 : statusCode = 201

  res.status(statusCode).json(response)
})

module.exports = router;