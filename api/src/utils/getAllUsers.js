const { Users } = require("../db");

async function getAllUsers() {
  try {
    const allUsersDb = await Users.findAll();

    if (!allUsersDb.length)
      return { messageError: "No hay usuarios registrados." };

    return allUsersDb;
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  getAllUsers,
};
