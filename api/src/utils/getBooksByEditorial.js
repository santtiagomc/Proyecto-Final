const { getAllBooks } = require("./getAllBooks");

async function getBooksByEditorial(editorial){
    try{
        const allBooks = await getAllBooks();

        const booksByEditorial = allBooks.length && allBooks.filter(b => b.editorial.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(editorial.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

        if(!booksByEditorial.length ) return {messageError: `No se encontraron resultados para ${editorial}.`};
        return booksByEditorial;

    }catch(error){
        return {messageError: "Se ha producido un error."};
    }
};

module.exports = {
    getBooksByEditorial
};