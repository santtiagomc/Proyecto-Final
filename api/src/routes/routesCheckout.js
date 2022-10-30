const { Router } = require("express");

const { postCheckout } = require("../utils/postCheckout");

const router = Router();

router.post("/", async (req, res) => {
  const response = await postCheckout(req.body);

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

module.exports = router;
