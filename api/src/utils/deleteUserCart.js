const { Cart } = require("../db");

async function deleteUserCart({ cartId }) {
  try {
    const userCart = await Cart.findOne({
      where: {
        id: cartId,
      },
    });
    //------En el caso que en el detalle del carrito no haya nada y presiona 'vaciar carrito' le muestre messageError
    if (!userCart) return { messageError: "Tu carrito se encuentra vacío" };

    await userCart.destroy();
    await userCart.save();
    return {
      message:
        "¡Oh! Tu carrito está vacío. ¿No sabes qué libro leer? ¡Tenemos muchos que te van a encantar!",
    };
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  deleteUserCart,
};
