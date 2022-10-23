const { Genres } = require("../db");

async function getGenres() {
  try {
    let genresDb = await Genres.findAll();

    if (!genresDb.length) return { messageError: "No se encontraron géneros" }

    return genresDb.map(genre => genre.name)

  } catch (error) {
    return { messageError: "Error" }
  }

}

module.exports = {
  getGenres,
};
