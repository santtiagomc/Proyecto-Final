function pagination(books, page, max = 12) {
  if (!isNaN(page)) {
    const offset = Number(page);
    const limit = offset + max;
    const pageBooks = books.slice(offset, limit);
    console.log(books);
    return {
      books: pageBooks,
      total: books.length,
    };
  }
}

module.exports = { pagination };
