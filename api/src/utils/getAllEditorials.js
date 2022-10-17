const { getAllBooks } = require("./getAllBooks");

async function getAllEditorials() {
  try {
    const allBooks = await getAllBooks();

    let allEditorials;
    if (!allBooks.messageError) {
      allEditorials = allBooks.map((el) => el.editorial);
      allEditorials = allEditorials
        .reduce((acc, item) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
          return acc;
        }, [])
        .sort();
    }

    if (allBooks.messageError) return allBooks.messageError

    return allEditorials;

  } catch (error) {
    return { messageError: "Se ha producido un error." }
  };
};

module.exports = {
  getAllEditorials
};