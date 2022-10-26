const { Reviews } = require('../db');

async function deleteReviews({ UserId, BookId }) {
  try {
    await Reviews.destroy({
      where: {
        UserId,
        BookId
      }
    });

    return { message: "La reseña ha sido eliminada con éxito!" };

  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  deleteReviews
}