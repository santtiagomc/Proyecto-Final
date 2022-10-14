const { getAllBooks } = require("./getAllBooks");

async function getBooksByAll(all) {
    try{
        const allBooks = await getAllBooks();

    }catch(error){

    }
};

module.exports = {
    getBooksByAll
};