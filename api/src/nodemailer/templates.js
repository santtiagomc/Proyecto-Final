const welcome = "welcome";
const purchase = "purchase";
const error = "error";

const templateSubject = (subject) => {
  switch (subject) {
    case welcome:
      return "Bienvenide a Books Nook!";

    case purchase:
      return "Gracias por comprar en Books Nook!";

    case error:
      return "Error al procesar el pago";

    default:
      break;
  }
};

const templateHTML = (subject, data) => {
  switch (subject) {
    case welcome:
      if (!data.email || !data.fullName)
        throw new Error("Necessary values missing");

      return `<h1>Bienvenido a Books Nook!</h1>
            <h3>Hola ${data.fullName},</h3> 
            <p>aqui te dejamos los datos de tu cuenta.</p>
            <ul>
              <li>Correo: ${data.email}</li>
              <li>Nombre de usuario: ${data.fullName}</li>
            </ul>
            <span>Saludos el equipo de Books Nook</span>
            `;

    case purchase:
      if (!data.fullName || !data.books.length || !data.orderNumber)
        throw new Error("Necessary values missing");

      console.log(data.fullName);
      console.log(data.books);
      console.log(data.orderNumber);

      /* let booksQuantity = data.books.map((el) => {
        return {
          name: el.name,
          quantity: el.quantity,
          price: el.price,
        };
      }); */
      let totalPrice = data.books.reduce((acc, el) => {
        return (acc = acc + el.quantity * el.price);
      }, 0);

      return `<h1>Gracias por tu compra!</h1>
            <p>Hola ${
              data.fullName
            }, aqui te dejamos los datos de tu compra.</p>
            <ul>
              ${
                data.books &&
                data.books
                  .map((el) => {
                    return `<li>$${el.price * el.quantity} | ${el.name} x(${
                      el.quantity
                    })</li>`;
                  })
                  .join("")
              }
            </ul>
            
            <p>Valor total: $${totalPrice}</p>
            <p>Número de orden: ${data.orderNumber}</p>
            <span>Saludos el equipo de Books Nook</span>
            `;

    case error:
      if (!data.fullName || !data.books.length || !data.orderNumber)
        throw new Error("Necessary values missing");

      return `<h1>Error al procesar la compra</h1>
            <h3>Hola ${data.fullName},</h3> 
            <p>	
            Estamos teniendo problemas para procesar el pago de tu orden número: ${data.orderNumber}. Te pedimos que revises los detalles de pago y verifiques si hay fondos en la cuenta asociada.</p>
            <span>Books Nook</span>
            `;

    default:
      break;
  }
};

module.exports = { templateHTML, templateSubject };
