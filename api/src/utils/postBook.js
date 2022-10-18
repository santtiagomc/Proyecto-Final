require('dotenv').config();
const { Books, Genres } = require('../db');
const { capitalize } = require('./capitalize');

async function postBook({ name, image, author, description, price, stock, editorial, edition, genres }) {
  try {
    let capitalizeEditorial = await capitalize(editorial);
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
        editorial: capitalizeEditorial,
        edition,
      },
    });

    if (!created) return { messageError: "Ya existe un libro con ese nombre, por favor elige otro y vuelva a intentar!" };

    let genresDb = await Genres.findAll()

    if (genresDb.length) {
      newBook.addGenres(genres)
    }

    return { newBook, message: "El libro ha sido agregado con éxito!" };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  postBook
}