const { getAllBooks } = require("./getAllBooks");

async function getBooksByName(name) {
  try{
    const allBooks = await getAllBooks();

    const booksByName = allBooks.length && allBooks.filter(b => b.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
      
    if(!booksByName.length) return {messageError: `No se encontraron resultados para ${name}.`}
    return booksByName;
    
  }catch(error){
    return {messageError: "Se ha producido un error."}
  };
};

module.exports = {
  getBooksByName
};