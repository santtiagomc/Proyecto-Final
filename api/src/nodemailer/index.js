const nodemailer = require("nodemailer");
const { templateHTML, templateSubject } = require("./templates");

const sendEmail = async (subject, data) => {
  if (!data.email) throw new Error("El email es necesario.");
  if (!data.fullName)
    throw new Error("El nombre completo (fullName) es necesario.");

  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "booksnookpf@gmail.com",
      pass: "taabechkqvilvtyw",
    },
  };

  const message = {
    from: "booksnookpf@gmail.com",
    to: data.email,
    subject: templateSubject(subject),
    html: templateHTML(subject, data),
  };

  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(message);

  console.log(info);
};

/* sendEmail("purchase", {
  orderNumber: 15156165,
  books: ["Look Back", "El eternauta", "El eternauta", "La metamorfosis"],
}); */

module.exports = {
  sendEmail,
};
