async function getBooksByFilters(booksFiltereds, filters) {
  try {
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

    if (filters.editorial !== "none") {
      booksFiltereds = booksFiltereds.filter(b => b.editorial === filters.editorial)
    }

    if (booksFiltereds.length) {
      if (filters.sort === "A-Z")
        booksFiltereds.sort((a, b) => a.name.localeCompare(b.name))
      if (filters.sort === "Z-A")
        booksFiltereds.sort((b, a) => a.name.localeCompare(b.name))
      if (filters.sort === "price-min-max")
        booksFiltereds.sort((a, b) => a.price - b.price)
      if (filters.sort === "price-max-min")
        booksFiltereds.sort((b, a) => a.price - b.price)
      if (filters.sort === "edition-min-max")
        booksFiltereds.sort((a, b) => a.edition - b.edition)
      if (filters.sort === "edition-max-min")
        booksFiltereds.sort((b, a) => a.edition - b.edition)
    }

    if (!booksFiltereds.length) return { messageError: "No se encontraron resultados" }
    return booksFiltereds

  } catch (error) {
    return { messageError: "Se ha producido un error." };
  };
};

module.exports = {
  getBooksByFilters
}
