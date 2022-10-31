const { Router } = require("express");
const router = Router();

const { getUserCart } = require("../utils/getUserCart");
const { getGuestCart } = require("../utils/getGuestCart");
const { getOrders } = require("../utils/getOrders");
const { postCart } = require("../utils/postCart");
const { putUserCart } = require("../utils/putUserCart");
const { putCartStatus } = require("../utils/putCartStatus");
const { deleteUserCart } = require("../utils/deleteUserCart");

router.get("/orders", async (req, res) => {
  const response = await getOrders();
  response.messageError
    ? res.status(404).json(response)
    : res.status(201).json(response);
});

router.get("/:userId", async (req, res) => {
  const userCart = await getUserCart(req.params);

  userCart.messageError
    ? res.status(404).json(userCart)
    : res.status(201).json(userCart);
});

router.get("/", async (req, res) => {
  const guestCart = await getGuestCart(req.query);

  guestCart.messageError
    ? res.status(404).json(guestCart)
    : res.status(201).json(guestCart);
});

router.post("/", async (req, res) => {
  const userCart = await postCart(req.body);

  userCart.messageError
    ? res.status(404).json(userCart)
    : res.status(201).json(userCart);
});

router.put("/status", async (req, res) => {
  const response = await putCartStatus(req.query);

  response.messageError
    ? res.status(404).json(response)
    : res.status(201).json(response);
});

router.put("/", async (req, res) => {
  const updateUserCart = await putUserCart(req.query);

  updateUserCart.messageError
    ? res.status(404).json(updateUserCart)
    : res.status(201).json(updateUserCart);
});

router.delete("/", async (req, res) => {
  const removeUserCart = await deleteUserCart(req.query);

  removeUserCart.messageError
    ? res.status(404).json(removeUserCart)
    : res.status(201).json(removeUserCart);
});

module.exports = router;
