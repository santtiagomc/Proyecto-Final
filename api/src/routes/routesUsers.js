const { Router } = require("express");

const { getUser } = require("../utils/getUser");
const { postUser } = require("../utils/postUser");
const { putUser } = require("../utils/putUser");
const { getAllUsers } = require("../utils/getAllUsers");

const router = Router();

router.get("/:id", async (req, res) => {
  const response = await getUser(req.params);

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

router.get("/", async (req, res) => {
  const response = await getAllUsers(req.query)

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

router.post("/", async (req, res) => {
  const response = await postUser(req.body);

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

router.put("/", async (req, res) => {
  let response = await putUser(req.body);

  let statusCode;
  response.messageError ? (statusCode = 404) : (statusCode = 201);

  res.status(statusCode).json(response);
});

module.exports = router;
