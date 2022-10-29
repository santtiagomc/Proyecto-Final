const { Users } = require("../db");

async function getAllUsers() {
  try {
    const allUsersDb = await Users.findAll();

    if (!allUsersDb.length)
      return { messageError: "No hay usuarios registrados." };

    allUsersDb.sort((a, b) => a.fullName.localeCompare(b.fullName))

    return allUsersDb;
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  getAllUsers,
};
