require('dotenv').config();
const { Books, Genres } = require('../db');

async function postBook({ name, image, author, description, price, stock, editorial, edition, genres }) {
  try {
    let [newBook, created] = await Books.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        image,
        author,
        description,
        price,
        stock,
        editorial,
        edition,
      },
    });

    if (!created) return { messageError: "Book already exist" };

    let genresDb = await Genres.findAll()

    if (genresDb.length) {
      newBook.addGenres(genres)
    }

    return { message: "Success" };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  postBook
}