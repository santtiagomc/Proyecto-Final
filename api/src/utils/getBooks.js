const axios = require('axios');
const { Books, Genres } = require('../db');

async function getBooks(name) {
  try{
    const allBooks = await Books.findAll({
      include: [{
        model: Genres,
        attributes: ['name'],
        through: { attributes: [] }
      }]
    });

    if(name){
      const books = allBooks.filter(b => b.name.toLowerCase().includes(name.toLowerCase()));
      //{
      // if(!b.eliminated){
        //     return b.name.toLowerCase().includes(name.toLowerCase())
        // }
        //});
      if(!books.length) return {messageError: 'No se encontraron coincidencias.'}
      return books;
    }else{
      return allBooks;
    }
  }catch(error){
    return {messageError: 'Se ha producido un error.'}
  };
};

module.exports = {
  getBooks
};