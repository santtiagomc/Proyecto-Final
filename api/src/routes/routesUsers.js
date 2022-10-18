const { Router } = require("express");

const { getUser } = require("../utils/getUser");
const { postUser } = require("../utils/postUser");

const router = Router();

router.get("/", async (req, res) => {
	const response = await getUser(req.body);

	let statusCode;
	response.messageError ? (statusCode = 404) : (statusCode = 201);

	res.status(statusCode).json(response);
});

router.post("/", async (req, res) => {
	console.log(req.body);
	const response = await postUser(req.body);
	let statusCode;
	response.messageError ? (statusCode = 404) : (statusCode = 201);

	res.status(statusCode).json(response);
});

module.exports = router;
