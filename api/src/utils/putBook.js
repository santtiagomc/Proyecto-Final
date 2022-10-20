const { Books } = require("../db");

async function putBook({ id }, body) {
	try {
		const book = await Books.findByPk(id);
		if (book === null)
			return { messageError: "No existe ningun libro con ese ID" };

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
