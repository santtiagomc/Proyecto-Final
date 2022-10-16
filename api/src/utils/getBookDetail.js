require("dotenv").config();
const { Books, Genres } = require("../db");

async function getBookDetail(idBook) {
  try {
    const idDb = await Books.findByPk(idBook, {
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!idDb) return { messageError: "No existe ningun libro con ese ID" };

    return idDb;
  } catch (error) {
    return { messageError: "No existe ningun libro con ese ID" };
  }
}

module.exports = {
  getBookDetail
}





