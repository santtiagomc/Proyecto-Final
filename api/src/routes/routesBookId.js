const { Router } = require('express');

// Traigo las funciones necesarias
const { getBookDetail } = require('../utils/getBookDetail')

const router = Router();

router.get('/:id', async (req, res) => {

})

module.exports = router;