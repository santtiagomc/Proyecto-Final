require('dotenv').config();
const axios = require('axios');
const { Genres } = require('../db');

async function postAllGenres(allGenres) {
  try {
    allGenres.forEach(async (genre) => {
      let newGenre = await Genres.findOrCreate({
        name: genre.name
      })
    })

    return { message: "Success" };
  } catch (e) {
    return { messageError: "Error" }
  }
}

module.exports = {
  postAllGenres
}