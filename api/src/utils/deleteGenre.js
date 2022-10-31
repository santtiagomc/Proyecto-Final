const { Genres } = require("../db");

async function deleteGenre({ name }) {
  try {
    await Genres.destroy({
      where: {
        name,
      },
    });

    return { message: `Categoría ${name} eliminada!` };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  deleteGenre,
};
