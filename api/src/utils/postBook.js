const { Books, Genres } = require('../db');
const { capitalize } = require('./capitalize');
const { Op } = require("sequelize")

async function postBook({ name, image, author, description, price, stock, editorial, edition, genres }) {
  try {
    let capitalizeEditorial = await capitalize(editorial);
    let capitalizeAuthor = await capitalize(author);
    let [newBook, created] = await Books.findOrCreate({
      where: {
        name: {
          [Op.iLike]: name
        }
      },
      defaults: {
        name,
        image,
        author: capitalizeAuthor,
        description,
        price,
        stock,
        editorial: capitalizeEditorial,
        edition,
      },
    });

    if (!created) return { messageError: "Ya existe un libro con ese nombre, por favor eliga otro y vuelva a intentar!" };

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
