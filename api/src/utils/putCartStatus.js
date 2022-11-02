const { Cart } = require("../db");
const { sendEmail } = require("../nodemailer");

async function putCartStatus(cartInfo) {
  try {
    const cart = await Cart.findByPk(cartInfo.id);

    if (cart === null)
      return { messageError: "No existe ningún carrito con ese ID" };

    cart.status === "Procesando"
      ? (cart.status = "Entregado")
      : (cart.status = "Procesando");
    await cart.save();

    if (cart.status === "Entregado") {
      sendEmail("delivered", { user: cartInfo.User, cart: cartInfo.Books });
      console.log("CORREO COMPRA ENTREGADA ENVIADO");
    }

    return { message: `Has cambiado el estado del carrito a "${cart.status}"` };
  } catch (error) {
    return { messageError: "Error" };
  }
}

module.exports = {
  putCartStatus,
};
