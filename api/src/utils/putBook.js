const { Books, Genres, Books_Genres } = require("../db");

async function putBook({ id }, body) {
  try {
    const book = await Books.findByPk(id);
    if (book === null)
      return { messageError: "No existe ningún libro con ese ID" };

    if (!body.visits) {
      let allGenres = await Genres.findAll({
        attributes: ["name"],
        through: { attributes: [] },
      });

      book.set(body);
      book.removeGenres(allGenres);
      book.addGenres(body.genre);

      await book.save();

      return { message: "Libro editado con éxito!" };
    } else {
      await book.increment("visits")
      return [false]
    }

  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putBook,
};
