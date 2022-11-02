const { Cart } = require("../db");

async function putCartStatus({ id }) {
  try {
    const cart = await Cart.findByPk(id);

    if (cart === null)
      return { messageError: "No existe ningún carrito con ese ID" };

    cart.status === "Procesando" ? (cart.status = "Entregado") : (cart.status = "Procesando");
    await cart.save();
    return { message: `Has cambiado el estado del carrito a "${cart.status}"` }

    return { message: `Has cambiado el estado del carrito a: ${cart.status}` };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putCartStatus,
};
