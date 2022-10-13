require('dotenv').config();
const axios = require('axios');
const { Books, Genres } = require('../db');

async function postAllBooks(allBooks) {
  try {
    allBooks.forEach(async (book) => {
      let [newBook, created] = await Books.findOrCreate({
        where: {
          name: book.name,
        },
        defaults: {
          image: book.image,
          author: book.author,
          description: book.description,
          price: book.price,
          stock: book.stock,
          editorial: book.editorial,
          edition: book.edition,
        }
      })

      let genresDb = await Genres.findAll()

      if (genresDb.length) {
        if (created) {
          newBook.addGenres(book.genres)
        }
      }

    })

    return { message: "Success" };
  } catch (e) {
    return { messageError: "Error" }
  }
}

module.exports = {
  postAllBooks
}