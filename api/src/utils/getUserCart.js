const { Cart, Users, Books } = require("../db");
const { Op } = require("sequelize");
const { pagination } = require("./pagination");

async function getUserCart({ userId }) {
  try {
    if (userId.includes("-")) {
      const id = userId.split("-")[0];
      const page = userId.split("-")[1];
      const userHistory = await Cart.findAll({
        where: {
          UserId: id,
          [Op.or]: [{ status: "Entregado" }, { status: "Procesando" }],
        },
        include: [
          {
            model: Books,

            attributes: ["name", "image", "price", "id"],
            through: { attributes: {} },
          },
        ],
      });
      return pagination(userHistory, page, 5);
    }
    const userCart = await Cart.findOne({
      where: {
        UserId: userId,
        status: "Abierto",
      },
      include: [
        {
          model: Users,
        },
        {
          model: Books,
          attributes: ["name", "image", "author", "price"],
          through: { attributes: {} },
        },
      ],
    });

    if (!userCart || !userCart.Books.length)
      return {
        messageError:
          "¡Oh! Tu carrito está vacío. ¿No sabes qué libro leer? ¡Tenemos muchos que te van a encantar!",
      };

    const userCartMap = userCart.Books.map((b) => {
      return {
        id: b.Books_Carts.BookId,
        cartId: b.Books_Carts.CartId,
        name: b.name,
        image: b.image,
        author: b.author,
        price: b.price,
        quantity: b.Books_Carts.quantity,
      };
    });

    return userCartMap;
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  getUserCart,
};
