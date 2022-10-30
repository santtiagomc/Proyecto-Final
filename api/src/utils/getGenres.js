const { Genres } = require("../db");

async function getGenres({ rank }) {
  try {
    let genresDb = await Genres.findAll();

    if (!genresDb.length) return { messageError: "No se encontraron géneros" };

    let allGenres = genresDb.map((genre) => genre.name);

    if (!rank) rank = "A-Z";
    rank === "A-Z" && allGenres.sort((a, b) => a.localeCompare(b));
    rank === "Z-A" && allGenres.sort((b, a) => a.localeCompare(b));

    return allGenres;
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  getGenres,
};
