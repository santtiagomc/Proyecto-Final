const { Op } = require("sequelize");
const { Users } = require("../db");

async function getAllUsers({ sort, searchValue }) {
  try {
    let allUsers
    if (searchValue) {
      allUsers = await Users.findAll({
        where: { fullName: { [Op.iLike]: `${searchValue}%` } },
      });

      if (!allUsers.length) return { messageError: `No se encontraron coincidencias para "${searchValue}".` };

    } else {
      allUsers = await Users.findAll();
      if (!allUsers.length)
        return { messageError: "No hay usuarios registrados." };
    }

    sort === "role-A-Z" &&
      allUsers.sort((a, b) => a.role.localeCompare(b.role));
    sort === "role-Z-A" &&
      allUsers.sort((b, a) => a.role.localeCompare(b.role));
    sort === "name-A-Z" &&
      allUsers.sort((a, b) => a.fullName.localeCompare(b.fullName));
    sort === "name-Z-A" &&
      allUsers.sort((b, a) => a.fullName.localeCompare(b.fullName));
    sort === "email-A-Z" &&
      allUsers.sort((a, b) => a.email.localeCompare(b.email));
    sort === "email-Z-A" &&
      allUsers.sort((b, a) => a.email.localeCompare(b.email));
    sort === "status-A-Z" &&
      allUsers.sort((a, b) => a.status.localeCompare(b.status));
    sort === "status-Z-A" &&
      allUsers.sort((b, a) => a.status.localeCompare(b.status));

    return allUsers;

  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  getAllUsers,
};
