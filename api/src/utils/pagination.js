function pagination(books, page) {
  if (!isNaN(page)) {
    const offset = Number(page);
    const limit = offset + 12;
    const pageBooks = books.slice(offset, limit);
    return {
      books: pageBooks,
      total: books.length,
    };
  }
}

module.exports = { pagination };
