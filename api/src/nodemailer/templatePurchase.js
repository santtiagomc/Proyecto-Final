const templatePurchase = (user, cart, totalPrice) => {
  return `<div
  style="
    height: fit-content;
    background-color: #181818;
    width: fit-content;
    color: white;
    padding: 10px;
    font-family: Helvetica, sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 5px;
  "
>
  <div style="margin-top: 15px">
    <a
      href="https://proyecto-f-eight.vercel.app/"
      target="_blank"
      style="text-decoration: none"
    >
      <img
        src="https://i.ibb.co/b2RBPyq/Logo-Books-Nook.png"
        height="155px"
        width="300px"
        alt="Books Nook logo"
      />
    </a>

    <h1 style="border-bottom: 2px solid #95d9c3; padding-bottom: 5px">
      Gracias por tu compra!
    </h1>
    <p style="margin-bottom: 5px">
      Hola <b>${user.fullName}</b>, actualmente estamos procesando tu
      compra,
    </p>
    <p style="margin-top: 0">aqui te dejamos los datos de la misma.</p>

    <div style="margin: 30px 0px">
      <ul
        style="
          padding: 20px 50px;
          color: #181818;
          border-radius: 10px;
          text-align: center;
          font-size: 1.2rem;
          list-style: none;
        "
      >
        ${
          cart &&
          cart
            .map((el) => {
              return `
        <li
          style="
            background-color: #b270a2;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
          "
        >
          $${el.price * el.quantity} | ${el.name} x(${el.quantity})
        </li>
        `;
            })
            .join("")
        }
      </ul>

      <span
        style="background-color: #355070; padding: 10px; border-radius: 5px"
        >Número de orden: <b>${cart[0].cartId}</b></span
      >
      <span
        style="
          background-color: #95d9c3;
          color: #181818;
          padding: 10px;
          border-radius: 5px;
          margin-left: 5px;
        "
        >Valor total: <b>$${Math.round(totalPrice)}</b></span
      >

      <p style="margin-top: 30px">
        Lo estaremos enviando a
        <b>${user.address} en ${user.city}, ${user.province}</b>
      </p>
    </div>
    <div>
      <p style="font-size: 1.5rem; margin-top: 70px">
        Saludos, el equipo de <b style="color: #95d9c3">Books</b>
        <b style="color: #b270a2">Nook</b>
      </p>
      <p>Nuestras redes sociales</p>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        style="text-decoration: none"
      >
        <img
          src="https://i.ibb.co/K91j4s5/5296499-fb-facebook-facebook-logo-icon.png"
          alt="logo facebook"
          style="margin-right: 20px"
        />
      </a>
      <a
        href="https://www.facebook.com/"
        target="_blank"
        style="text-decoration: none"
      >
        <img
          src="https://i.ibb.co/BscNDPV/5296765-camera-instagram-instagram-logo-icon.png"
          alt="logo facebook"
        />
      </a>
    </div>
  </div>
</div>`;
};

module.exports = {
  templatePurchase,
};
