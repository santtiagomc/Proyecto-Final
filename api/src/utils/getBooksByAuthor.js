const { getAllBooks } = require("./getAllBooks");

async function getBooksByAuthor(author) {
  try {
    const allBooks = await getAllBooks();

    const booksByAuthor = allBooks.length && allBooks.filter(b => b.author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

    if (!booksByAuthor.length) return { messageError: `No se encontraron resultados para el autor: ${author}.` }
    return booksByAuthor;

  } catch (error) {
    return { messageError: "Se ha producido un error." };
  };
};

module.exports = {
  getBooksByAuthor
};