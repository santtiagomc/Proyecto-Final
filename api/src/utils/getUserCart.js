const { Cart, Users, Books } = require("../db");
const { Op } = require("sequelize");

async function getUserCart({ userId }) {
  try {
    if (userId.includes("-")) {
      const userHistory = await Cart.findAll({
        where: {
          UserId: userId.slice(0, userId.length - 1),
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
      return userHistory;
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
