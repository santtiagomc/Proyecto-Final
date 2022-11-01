const nodemailer = require("nodemailer");
const { templateHTML, templateSubject } = require("./templates");

const sendEmail = async (subject, data) => {
  if (!data.email) throw new Error("El email es necesario.");
  if (!data.fullName)
    throw new Error("El nombre completo (fullName) es necesario.");

  const config = {
    host: `${process.env.NM_HOST}`,
    port: process.env.NM_PORT,
    auth: {
      user: `${process.env.NM_USER}`,
      pass: `${process.env.NM_PASS}`,
    },
  };

  const message = {
    from: `${process.env.NM_USER}`,
    to: data.email,
    subject: templateSubject(subject),
    html: templateHTML(subject, data),
  };

  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(message);

  console.log(info);
};

/* sendEmail("purchase", {
  email: "germancourvoisier1138@gmail.com",
  fullName: "ElGermis",
  orderNumber: "pm_1LzNabGm2004ZMTNvNhF2stu",
  books: [
    {
      id: "6ddde042-ca91-4edd-92a7-c0fe1b911f53",
      cartId: "ead143ad-ee44-43e9-a465-3375bcc08740",
      name: "El corazón delator y otras historias",
      image: "https://editorial.tirant.com/high/9788412071887.jpg",
      author: "Poe Edgar Allan",
      price: "30.00",
      quantity: 1,
    },
    {
      id: "cf4c3c8b-4c0e-4505-b27f-0180ce5da78a",
      cartId: "ead143ad-ee44-43e9-a465-3375bcc08740",
      name: "Juego de tronos (canción de hielo y fuego 1)",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_779250-MLA30414595995_052019-O.webp",
      author: "George Martin",
      price: "35.18",
      quantity: 2,
    },
  ],
}); */

module.exports = {
  sendEmail,
};
