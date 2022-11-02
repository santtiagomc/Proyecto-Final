const templateDelivered = (user, cart) => {
  return `<div
  style="
    height: fit-content;
    background-color: #181818;
    width: 600px;
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
      style="text-decoration: none; width: fit-content"
    >
      <img
        src="https://i.ibb.co/b2RBPyq/Logo-Books-Nook.png"
        height="155px"
        width="300px"
        alt="Books Nook logo"
      />
    </a>
    <h1 style="border-bottom: 2px solid #95d9c3; padding-bottom: 5px">
      Entregamos tus nuevos libros!
    </h1>
    <p>
      Hola <b>${user.fullName}</b>, dimos por entregada la compra que
      realizaste con la dirección
      <b
        >${user.address} en ${user.city},
        ${user.province}</b
      >
    </p>

    <span>Entregamos los productos</span>
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
        ${el.name}
      </li>
      `;
          })
          .join("")
      }
    </ul>

    <p>
      Por cualquier inconveniente con tu compra puedes comunicarte con
      booksnookpf@gmail.com, con el asunto <b>"Error en mi compra"</b>
    </p>
  </div>

  <div>
    <p style="font-size: 1.5rem; margin-top: 70px">
      Esperamos que los disfrutes, saludos el equipo de
      <b style="color: #95d9c3">Books</b>
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
</div>`;
};

module.exports = {
  templateDelivered,
};
