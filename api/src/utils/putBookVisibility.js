const { Books } = require("../db");

async function putBookVisibility({ id }) {
	try {
		const book = await Books.findByPk(id);
		if (book === null)
			return { messageError: "No existe ningún libro con ese ID" };

		book.visible ? (book.visible = false) : (book.visible = true);
		await book.save();

		return book;
	} catch (error) {
		return { messageError: "Error" };
	}
}

module.exports = {
	putBookVisibility,
};
