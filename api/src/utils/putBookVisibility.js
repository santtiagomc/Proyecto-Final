const { Books, Genres, Reviews, Users } = require("../db");

async function putBookVisibility({ id }) {
  try {
    const book = await Books.findByPk(id, {
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Reviews,
          attributes: ["title", "description", "rating"],
          include: [
            {
              model: Users,
              attributes: ["fullName"],
            },
          ],
        },
      ],
    });
    if (book === null)
      return { messageError: "No existe ningún libro con ese ID" };

    book.visible ? (book.visible = false) : (book.visible = true);
    await book.save();

    return { message: "Success" };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putBookVisibility,
};
