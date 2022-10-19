const { Users } = require("../db");

async function postUser({ id, fullName, email, province, city, address, zipCode, }) {
  try {
    const [user, created] = await Users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        id,
        fullName,
        province,
        city,
        address,
        zipCode,
      },
    });

    return { message: "Usuario creado correctamente" };
  } catch (e) {
    return { messageError: "Error" };
  }
}

module.exports = {
  postUser,
};
