require('dotenv').config();
const axios = require('axios');
const { Books, Genres } = require('../db');

async function postAllBooks(allBooks) {
  try {
    allBooks.forEach(async (book) => {
      let [newBook, created] = await Books.findOrCreate({
        name: book.name,
        image: book.image,
        author: book.author,
        description: book.description,
        price: book.price,
        stock: book.stock,
        editorial: book.editorial,
        edition: book.edition,
      })

      if (Genres.length) {
        if (created) {
          newBook.addGenres(allBooks.genres)
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