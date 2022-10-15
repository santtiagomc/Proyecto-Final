const { getAllBooks } = require("./getAllBooks");
const { Op } = require("sequelize");
const { Books, Genres } = require('../db');

async function getBooksByFilters(filters) {
  try {

    // let booksFiltereds
    // if (filters.genres !== "none" && filters.author !== "none") {
    //   booksFiltereds = await Books.findAll({
    //     where: {
    //       visible: true,
    //       stock: {
    //         [Op.gt]: 0
    //       },
    //       author: filters.author
    //     },
    //     include: [{
    //       model: Genres,
    //       where: { name: filters.genres },
    //       // attributes: ["name"],
    //       through: { attributes: [] }
    //     }]
    //   });
    // }


    let booksFiltereds = await getAllBooks()
    booksFiltereds = booksFiltereds.map(book => {
      let genres = []
      book.Genres.length && book.Genres.forEach(g => genres.push(g.name))
      return {
        id: book.id,
        name: book.name,
        image: book.image,
        author: book.author,
        description: book.description,
        price: book.price,
        stock: book.stock,
        editorial: book.editorial,
        edition: book.edition,
        visible: book.visible,
        UserId: book.UserId,
        Genres: genres
      }
    })

    if (filters.genres !== "none") {
      booksFiltereds = booksFiltereds.filter(b => b.Genres.includes(filters.genres))
    }

    if (filters.author !== "none") {
      booksFiltereds = booksFiltereds.filter(b => b.author === filters.author)
    }

    // if (filters.editorial !== "none") {
    //   booksFiltereds = booksFiltereds.filter
    // }

    // console.log(booksFiltereds, "Este es")
    return booksFiltereds

  } catch (error) {
    return { messageError: "Se ha producido un error." };
  };
};

module.exports = {
  getBooksByFilters
}