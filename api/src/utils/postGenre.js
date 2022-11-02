const { Op } = require("sequelize");
const { Genres } = require("../db");

async function postGenre({ name }) {
  try {
    let [newGenre, created] = await Genres.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
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
