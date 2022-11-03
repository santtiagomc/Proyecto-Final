const { Op } = require("sequelize");
const { Books, Genres, Reviews } = require("../db");

const getAllBooksAdmin = async ({ sort, searchValue }) => {
  try {
    let allBooks;
    if (searchValue) {
      allBooks = await Books.findAll({
        where: { name: { [Op.iLike]: `%${searchValue}%` } },
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

      if (!allBooks.length) return { messageError: "Libro no encontrado." };
    } else {
      allBooks = await Books.findAll({
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

      if (!allBooks.length)
        return { messageError: "No hay libros disponibles." };
    }

    sort === "name-A-Z" &&
      allBooks.sort((a, b) => a.name.localeCompare(b.name));
    sort === "name-Z-A" &&
      allBooks.sort((b, a) => a.name.localeCompare(b.name));
    sort === "author-A-Z" &&
      allBooks.sort((a, b) => a.author.localeCompare(b.author));
    sort === "author-Z-A" &&
      allBooks.sort((b, a) => a.author.localeCompare(b.author));
    sort === "editorial-A-Z" &&
      allBooks.sort((a, b) => a.editorial.localeCompare(b.editorial));
    sort === "editorial-Z-A" &&
      allBooks.sort((b, a) => a.editorial.localeCompare(b.editorial));
    sort === "year-min-max" && allBooks.sort((a, b) => a.edition - b.edition);
    sort === "year-max-min" && allBooks.sort((b, a) => a.edition - b.edition);
    sort === "price-min-max" && allBooks.sort((a, b) => a.price - b.price);
    sort === "price-max-min" && allBooks.sort((b, a) => a.price - b.price);
    sort === "stock-min-max" && allBooks.sort((a, b) => a.stock - b.stock);
    sort === "stock-max-min" && allBooks.sort((b, a) => a.stock - b.stock);

    return allBooks;
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
};

module.exports = {
  getAllBooksAdmin,
};
