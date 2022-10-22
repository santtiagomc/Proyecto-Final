const { Cart, Users, Books, Books_Carts } = require('../db');

async function getUserCart({ userId }) {
  try {
    const userCart = await Cart.findOne({
      where: {
        UserId: userId,
        status: "Abierto"
      },
      include: [{
        model: Users
      }, {
        model: Books,
        attributes: ["name", "image", "author", "price"],
        through: { attributes: {} },
      }]
    });

    if (!userCart) return { messageError: "¡Oh! Tu carrito está vacío. ¿No sabes qué libro leer? ¡Tenemos muchos que te van a encantar!" };
    return userCart;


  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
};

module.exports = {
  getUserCart
};