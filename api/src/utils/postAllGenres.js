const { Op } = require('sequelize');
const { Genres } = require('../db');

async function postAllGenres(allGenres) {
  try {
    allGenres.forEach(async (genre) => {
      let newGenre = await Genres.findOrCreate({
        where: {
          name: {
            [Op.iLike]: genre.name,
          }
        }
      })
    })

    return { message: "Success" };
  } catch (e) {
    return { messageError: "Error" }
  }
}

module.exports = {
  postAllGenres
}