const { Router } = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesBookId = require('./routesBookId');
const routesBooks = require('./routesBooks');
const routesGenres = require('./routesGenres');
const routesEditorials = require('./routesEditorials');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/book', routesBookId);
router.use('/books', routesBooks);
router.use('/genres', routesGenres);
router.use('/editorials', routesEditorials);

module.exports = router;
