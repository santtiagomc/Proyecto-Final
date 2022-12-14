// ESTA RUTA LUEGO VA A SER PARA FILTRAR POR EDITORIAL EN VEZ DE AUTORES
const { Router } = require("express");

// Traigo las funciones necesarias
const { getAllEditorials } = require("../utils/getAllEditorials");

const router = Router();

router.get("/", async (req, res) => {

  const response = await getAllEditorials()

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

module.exports = router;