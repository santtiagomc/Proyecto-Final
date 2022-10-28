const { Cart } = require("../db");

async function putCartStatus({ id, status }) {
  try {
    const cart = await Cart.findByPk(id);

    if (cart === null)
      return { messageError: "No existe ningún carrito con ese ID" };

    cart.status = status
    await cart.save();

    return { message: `Has cambiado el estado del carrito a: ${cart.status}` };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putCartStatus,
};
