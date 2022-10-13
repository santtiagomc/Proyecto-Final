const { Router } = require('express');

// Traigo las funciones necesarias
const { getGenres } = require('../utils/getGenres')
const { postAllGenres } = require('../utils/postAllGenres')

const router = Router();

router.get('/', async (req, res) => {

})

router.post("/all", async (req, res) => {
  const response = await postAllGenres(req.body);

  let statusCode
  response.messageError ? statusCode = 404 : statusCode = 201

  res.status(statusCode).json(response)
})

module.exports = router;