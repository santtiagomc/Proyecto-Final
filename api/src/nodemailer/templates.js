const { templateDelivered } = require("./templateDelivered");
const { templatePurchase } = require("./templatePurchase");
const { templateWelcome } = require("./templateWelcome");

const welcome = "welcome";
const purchase = "purchase";
const delivered = "delivered";
const error = "error";

const templateSubject = (subject) => {
  switch (subject) {
    case welcome:
      return "Bienvenide a Books Nook!";

    case purchase:
      return "Gracias por comprar en Books Nook!";

    case delivered:
      return "Recibiste tus libros, ¡que los disfrutes!";

    case error:
      return "Error al procesar el pago";

    default:
      break;
  }
};

const templateHTML = (subject, data) => {
  switch (subject) {
    case welcome:
      if (!data.user.email || !data.user.fullName)
        throw new Error("Necessary values missing");

      return templateWelcome(data.user);

    case purchase:
      if (!data.user.fullName || !data.cart.length)
        throw new Error("Necessary values missing");

      let totalPrice = data.cart.reduce((acc, el) => {
        return (acc = acc + el.quantity * el.price);
      }, 0);
      return templatePurchase(data.user, data.cart, totalPrice);

    case delivered:
      if (!data.user.fullName || !data.cart.length)
        throw new Error("Necessary values missing");

      return templateDelivered(data.user, data.cart);

    case error:
      if (!data.user.fullName || !data.cart.length || !data.stripeId)
        throw new Error("Necessary values missing");

      return `<h1>Error al procesar la compra</h1>
            <h3>Hola ${data.user.fullName},</h3> 
            <p>	
            Estamos teniendo problemas para procesar el pago de tu orden número: ${data.stripeId}. Te pedimos que revises los detalles de pago y verifiques si hay fondos en la cuenta asociada.</p>
            <span>Books Nook</span>
            `;

    default:
      break;
  }
};

module.exports = { templateHTML, templateSubject };
