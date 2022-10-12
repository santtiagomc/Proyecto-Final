const { Router } = require('express');

// Traigo las funciones necesarias
const { getBooks } = require('../utils/getBooks')
const { createBook } = require('../utils/createBook')

const router = Router();

router.get('/', async (req, res) => {

})

router.post("/", async (req, res) => {

});

module.exports = router;