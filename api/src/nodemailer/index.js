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

module.exports = {
  sendEmail,
};
