const { Op } = require("sequelize");
const { Books, Genres, Reviews } = require("../db");

const getAllBooksAdmin = async ({ search }) => {
  try {
    console.log(search.length);
    if (search !== "undefined") {
      let searchedBook = await Books.findAll({
        where: { name: { [Op.iLike]: `${search}%` } },
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

      if (!searchedBook.length) return { messageError: "Libro no encontrado." };
      return searchedBook;
    } else {
      const allBooksDb = await Books.findAll({
        // where: {
        // 	/* visible: true, */
        // 	stock: {
        // 		[Op.gt]: 0,
        // 	},
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
    }
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
};

module.exports = {
  getAllBooksAdmin,
};
