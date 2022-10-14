const { Books, Genres } = require("../db");

// async function getBooks(page, size) {
//   let options = {
//     limit: size,
//     offset: page * size,
//   };

//   const { count, rows } = await Books.findAndCountAll(options);

//   return { total: count, paginas: rows };
// }

async function getBooks(page) {
  const books = await Books.findAll();
  return pagination(books, page);
}

function pagination(model, page) {
  const books = model.slice(page, 3);
  return books;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  if (endIndex < model.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.results = model.slice(startIndex, endIndex);
}

module.exports = { getBooks };
