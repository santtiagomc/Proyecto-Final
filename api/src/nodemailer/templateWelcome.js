const templateWelcome = (user) => {
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
      Bienvenido a <b style="color: #95d9c3">Books</b>
      <b style="color: #b270a2">Nook</b>!
    </h1>
    <h3 style="margin-bottom: 5px">Hola ${user.fullName},</h3>
    <p style="margin-top: 0; margin-bottom: 5px">
      graicas por unirte a Books Nook, esperamos que encuetres tus libros
      deseados!
    </p>
    <p style="margin-top: 0">Aqui te dejamos los datos de tu cuenta.</p>
    <ul
      style="
        background-color: #b270a2;
        padding: 20px 50px;
        color: #181818;
        border-radius: 10px;
        text-align: center;
        font-size: 1.2rem;
        list-style-position: inside;
      "
    >
      <li><b>Correo:</b> ${user.email}</li>
      <li><b>Nombre de usuario:</b> ${user.fullName}</li>
    </ul>
  </div>
  <div style="margin-top: 30px; width: fit-content">
    <h3>Te adjuntamos algunos de nuestros titulos más exitosos!</h3>
    <div
      style="
        background-color: #355070;
        width: fit-content;
        border-radius: 10px;
        padding: 10px;
      "
    >
      <a href="https://proyecto-f-eight.vercel.app/"
        ><img
          src="https://i.ibb.co/vcrRnbq/anillos.jpg"
          alt="anillos"
          border="0"
          width="150px"
          height="214px"
      /></a>
      <a href="https://proyecto-f-eight.vercel.app/"
        ><img
          src="https://i.ibb.co/n7Jv99B/eternauta.jpg"
          alt="eternauta"
          width="150px"
          height="214px"
      /></a>
      <a href="https://proyecto-f-eight.vercel.app/"
        ><img
          src="https://i.ibb.co/fX0dL9g/estudiodeescarlata.jpg"
          alt="estudiodeescarlata"
          border="0"
          width="150px"
          height="214px"
      /></a>
      <a href="https://proyecto-f-eight.vercel.app/"
        ><img
          src="https://i.ibb.co/t3mYFZM/look-back.jpg"
          alt="look-back"
          width="150px"
          height="214px"
      /></a>
      <a href="https://proyecto-f-eight.vercel.app/"
        ><img
          src="https://i.ibb.co/LZ7Z3pG/transcrepuscular.jpg"
          alt="transcrepuscular"
          border="0"
          width="150px"
          height="214px"
      /></a>
    </div>
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
</div>`;
};

module.exports = {
  templateWelcome,
};
