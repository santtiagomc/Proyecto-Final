require('dotenv').config();
const axios = require('axios');
const { Books, Genres} = require('../db');

async function getBookDetail(idBook) {
  const idDb = await Books.findByPk(id, {
    include: Genres,
  });
  const ApiUrl = await axios("https://");
  const detailBook = await ApiUrl.data.map((e) => {
    return {
      name: e.name,
      author: e.author,
      image: e.image,
      description: e.description,
      price: e.price,
      editorial: e.editorial,
    };
  });
  return detailBook;

}

module.exports = {
  getBookDetail
}





