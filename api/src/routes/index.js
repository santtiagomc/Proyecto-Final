const { Router } = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesBookId = require('./routesBookId');
const routesBooks = require('./routesBooks');
const routesGenres = require('./routesGenres');
const routesAuthors = require('./routesAuthors');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/book', routesBookId);
router.use('/books', routesBooks);
router.use('/genres', routesGenres);
router.use('/authors', routesAuthors);

module.exports = router;
