const { Reviews } = require('../db');
const { capitalize } = require('./capitalize');

async function postReviews({ title, description, rating, UserId, BookId }) {
  try {

    if (!title || !description || !rating || !UserId || !BookId) return { message: "Faltaron datos obligatorios" };

    let [newReviews, created] = await Reviews.findOrCreate({
      where: {
        UserId,
        BookId
      },
      defaults: {
        title,
        description,
        rating,
      }
    });

    if (!created) return { messageError: "Solo puedes agregar una reseña por libro!" }

    return { message: "La reseña ha sido agregada con éxito!" };

  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  postReviews
}