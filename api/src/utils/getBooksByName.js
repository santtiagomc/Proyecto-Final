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

    if(name){
      const booksByName = allBooks.filter(b => b.name.toLowerCase().includes(name.toLowerCase()));
      //{
        // if(!b.eliminated){
        //     return b.name.toLowerCase().includes(name.toLowerCase())
        // }
      //});
      if(!booksByName.length) return {messageError: `No se encontraron resultados para "${name}".`}
      return booksByName;
    }else{
      return allBooks;
    }
  }catch(error){
    return {messageError: "Se ha producido un error."}
  };
};

module.exports = {
  getBooksByName
};