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

    if (!created) return { messageError: "Ya existe un libro con ese nombre, por favor elige otro y vuelva a intentar!" };

    let genresDb = await Genres.findAll()

    if (genresDb.length) {
      newBook.addGenres(genres)
    }

    return { message: "El libro ha sido agregado con éxito!" };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  postBook
}