const { Router } = require("express");
const router = Router();

const { getUserCart } = require("../utils/getUserCart");
const { getGuestCart } = require("../utils/getGuestCart");
const { postCart } = require("../utils/postCart");

router.get('/:userId', async (req, res) => {
  const userCart = await getUserCart(req.params);

  userCart.messageError ? res.status(404).json(userCart) : res.status(201).json(userCart);
});

router.get('/', async (req, res) => {
  const guestCart = await getGuestCart(req.query);

  guestCart.messageError ? res.status(404).json(guestCart) : res.status(201).json(guestCart);
});

router.post("/", async (req, res) => {
  const userCart = await postCart(req.body);

  userCart.messageError ? res.status(404).json(userCart) : res.status(201).json(userCart);
});

module.exports = router;
