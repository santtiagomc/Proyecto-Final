const { Genres } = require("../db");
const { Op } = require("sequelize");

async function postGenre({ name }) {
  try {
    let [newGenre, created] = await Genres.findOrCreate({
      where: {
        name: {
          [Op.iLike]: name
        }
      },
      defaults: {
        name
      }
    });

    if (!created)
      return {
        messageError: "Esa categoría ya existe!",
      };

    return { message: `Has agregado la categoría: ${name}` };
  } catch (e) {
    return { messageError: "Error" };
  }
}

module.exports = {
  postGenre,
};
