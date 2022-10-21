const { Router } = require("express");
const router = Router();

const { getUserCart } = require('../utils/getUserCart');

router.get('/:userId', async (req, res) => {
  const userCart = await getUserCart(req.params);

  userCart.messageError ? res.status(404).json(userCart) : res.status(201).json(userCart);
});

module.exports = router;
