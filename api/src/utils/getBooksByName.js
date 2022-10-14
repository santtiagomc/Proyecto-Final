const { Books, Genres } = require('../db');

async function getBooksByName(name) {
  try{
    const allBooks = await Books.findAll({
      include: [{
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] }
      }]
    });

    const booksByName = allBooks.filter(b => b.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
      //{
        // if(!b.eliminated){
        //     return b.name.toLowerCase().includes(name.toLowerCase())
        // }
      //});
    if(!booksByName.length) return {messageError: `No se encontraron resultados para "${name}".`}
    return booksByName;
    
  }catch(error){
    return {messageError: "Se ha producido un error."}
  };
};

module.exports = {
  getBooksByName
};