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
    if (!idDb) return { messageError: "This book does not exist" };

    return idDb;
  } catch (error) {
    return { messageError: "This book does not exist" };
  }
}

module.exports = {
  getBookDetail,
};
