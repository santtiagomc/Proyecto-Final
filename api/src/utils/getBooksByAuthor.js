const { Books, Genres } = require('../db');

async function getBooksByAuthor(author){
    try{
        const allBooks = await Books.findAll({
            include: [{
                model: Genres,
                attributes: ["name"],
                through: { attributes: [] }
              }]
        });

        const booksByAuthor = allBooks.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
        !booksByAuthor.length ? {messageError: `No se encontraron resultados para "${author}".`} : booksByAuthor;

    }catch(error){
        return {messageError: "Se ha producido un error."};
    };
};

module.exports = {
    getBooksByAuthor
};