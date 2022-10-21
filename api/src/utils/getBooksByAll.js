const { getAllBooks } = require("./getAllBooks");

async function getBooksByAll(all) {
  try {
    const allBooks = await getAllBooks();

    if (allBooks.length) {
      const booksByName = allBooks.filter(b => b.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(all.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

      const booksByAuthor = allBooks.filter(b => b.author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(all.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

      const booksByEditorial = allBooks.filter(b => b.editorial.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(all.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

      const bookNames = [...new Set([...booksByName, ...booksByAuthor, ...booksByEditorial].map(b => b.name))];

      const filtered = allBooks.filter(b => {
        let find = bookNames.find(bookName => bookName == b.name)
        if (find) return b.name == find
      });

      if (!filtered.length) return { messageError: `No se encontraron resultados para: ${all}.` };
      return filtered;
    };
  } catch (error) {

  }
};

module.exports = {
  getBooksByAll
};