const { Router } = require('express');

// Traigo las funciones necesarias
const { getBooks } = require('../utils/getBooks')
const { createBook } = require('../utils/createBook')

const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    const books = await getBooks(name);

    books.messageError? 
    res.status(404).json(books):
    res.status(201).json(books);

});

router.post("/", async (req, res) => {

});

module.exports = router;