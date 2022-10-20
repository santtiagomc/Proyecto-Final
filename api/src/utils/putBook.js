require("dotenv").config();
const axios = require("axios");
const { Books } = require("../db");
const { API_KEY } = process.env;

async function putBook({ id }, body) {
	try {
		const book = await Books.findByPk(id);
		if (book === null)
			return { messageError: "No existe ningún libro con ese ID" };

		book.set(body);
		await book.save();

		return book;
	} catch (error) {
		return { messageError: "Error" };
	}
}

module.exports = {
	putBook,
};
