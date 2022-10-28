const { Op } = require('sequelize');
const { Genres } = require('../db');

async function postGenre({ name }) {
  try {
    let [newGenre, created] = await Genres.findOrCreate({
      where: {
        name: {
          [Op.iLike]: name,
        }
      }
    })

    if (!created)
      return { messageError: "Ya existe esa categoría, por favor eliga otra y vuelva a intentar!" };

    return { message: `Has agregado la categoría: ${name}` };
  } catch (e) {
    return { messageError: "Error" }
  }
}

module.exports = {
  postGenre
}