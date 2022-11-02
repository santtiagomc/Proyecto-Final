const { templatePurchase } = require("./templatePurchase");

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

      return `<h1>Bienvenido a Books Nook!</h1>
            <h3>Hola ${data.user.fullName},</h3> 
            <p>aqui te dejamos los datos de tu cuenta.</p>
            <ul>
              <li>Correo: ${data.user.email}</li>
              <li>Nombre de usuario: ${data.user.fullName}</li>
            </ul>
            <span>Saludos el equipo de Books Nook</span>
            `;

    case purchase:
      if (!data.user.fullName || !data.cart.length || !data.stripeId)
        throw new Error("Necessary values missing");

      console.log(data.user.fullName);
      console.log(data.cart);
      console.log(data.stripeId);

      /* let booksQuantity = data.cart.map((el) => {
        return {
          name: el.name,
          quantity: el.quantity,
          price: el.price,
        };
      }); */
      let totalPrice = data.cart.reduce((acc, el) => {
        return (acc = acc + el.quantity * el.price);
      }, 0);

      return templatePurchase(data.user, data.cart, data.stripeId, totalPrice);

    case delivered:
      if (!data.user.fullName || !data.cart.length)
        throw new Error("Necessary values missing");

      return `<h1>Entregamos tus nuevos libros!</h1>
            <p>Hola ${
              data.user.fullName
            }, dimos por entregada la compra que realizaste con la dirección ${
        data.user.address
      } en ${data.user.city}, ${data.user.province}</p>
            
            <span>Entregamos los productos</span>
            <ul>
            ${
              data.cart &&
              data.cart
                .map((el) => {
                  return `<li>${el.name}</li>`;
                })
                .join("")
            }
            </ul>
              
            <span>Por cualquier inconveniente con tu compra puedes comunicarte con booksnookpf@gmail.com, con el asunto "Error en mi compra"</span>

            <p>Esperamos que los disfrutes, saludos el equipo de Books Nook</p>
            `;

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
