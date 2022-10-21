const { Books, Genres, Reviews, Users } = require("../db");

async function putBookVisibility({ id }) {
  try {
    console.log(id);
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
    console.log(book);
    if (book === null)
      return { messageError: "No existe ningún libro con ese ID" };

    book.visible ? (book.visible = false) : (book.visible = true);
    await book.save();

    return book;
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putBookVisibility,
};
