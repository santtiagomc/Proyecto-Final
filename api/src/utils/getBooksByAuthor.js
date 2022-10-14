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

        const booksByAuthor = allBooks.filter(b => b.author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
        
        if(!booksByAuthor.length) return {messageError: `No se encontraron resultados para "${author}".`}
        return booksByAuthor;

    }catch(error){
        return {messageError: "Se ha producido un error."};
    };
};

module.exports = {
    getBooksByAuthor
};