const { Router } = require("express");
const router = Router();

const { getUserCart } = require('../utils/getUserCart');
const { postCart } = require("../utils/postCart");

router.get('/:userId', async (req, res) => {
  const userCart = await getUserCart(req.params);

  userCart.messageError ? res.status(404).json(userCart) : res.status(201).json(userCart);
});

router.post("/:userId", async (req, res) => {
  const userCart = await postCart(req.params, req.body);

  userCart.length ? res.status(201).json(userCart) : res.status(404).json({message: "MAL"})
});

module.exports = router;
