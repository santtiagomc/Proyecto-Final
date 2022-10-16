const { getAllBooks } = require("./getAllBooks");

async function getAllAuthors() {
  try {
    const allBooks = await getAllBooks();

    let allAuthors;
    if (!allBooks.messageError) {
      allAuthors = allBooks.map((el) => el.author);
      allAuthors = allAuthors
        .reduce((acc, item) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
          return acc;
        }, [])
        .sort();
    }

    if (allBooks.messageError) return allBooks.messageError

    return allAuthors;

  } catch (error) {
    return { messageError: "Se ha producido un error." }
  };
};

module.exports = {
  getAllAuthors
};