require("dotenv").config();
const axios = require("axios");
const { Books } = require("../db");
const { API_KEY } = process.env;

async function putBookVisibility({ id }) {
  try {
    const book = await Books.findByPk(id);
    console.log(book);
    if (book === null) return { messageError: "No existe ningun libro con ese ID" };

    book.visible ? (book.visible = false) : (book.visible = true);
    await book.save();

    return { message: "El estado del libro ha sido modificado!" };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putBookVisibility,
};
