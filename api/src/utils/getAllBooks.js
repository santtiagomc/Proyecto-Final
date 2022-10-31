const { Op } = require("sequelize");
const { Books, Genres, Reviews } = require("../db");

async function getAllBooks() {
  try {
    const allBooksDb = await Books.findAll({
      // where: {
      //     /* visible: true, */
      //     stock: {
      //         [Op.gt]: 0,
      //     },
      // },
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Reviews,
          attributes: ["rating"],
        },
      ],
    });
    if (!allBooksDb.length)
      return { messageError: "No hay libros disponibles." };
    return allBooksDb;
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  getAllBooks,
};
