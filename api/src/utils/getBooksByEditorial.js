const { Books, Genres } = require('../db');

async function getBooksEditorial(editorial){
    try{
        const allBooks = await Books.findAll({
            include: [{
                model: Genres,
                attributes: ["name"],
                through: { attributes: [] }
              }]
        });

    }catch(error){
        
    }
};

module.exports = {
    getBooksEditorial
};