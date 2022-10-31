const { Op } = require("sequelize");
const { Users } = require("../db");

async function getAllUsers({ sort, search }) {
  try {
    if (search !== "undefined") {
      const searchedUser = await Users.findAll({
        where: { fullName: { [Op.iLike]: `${search}%` } },
      });
      console.log(searchedUser);
      sort === "role-A-Z" &&
        searchedUser.sort((a, b) => a.role.localeCompare(b.role));
      sort === "role-Z-A" &&
        searchedUser.sort((b, a) => a.role.localeCompare(b.role));
      sort === "name-A-Z" &&
        searchedUser.sort((a, b) => a.fullName.localeCompare(b.fullName));
      sort === "name-Z-A" &&
        searchedUser.sort((b, a) => a.fullName.localeCompare(b.fullName));
      sort === "email-A-Z" &&
        searchedUser.sort((a, b) => a.email.localeCompare(b.email));
      sort === "email-Z-A" &&
        searchedUser.sort((b, a) => a.email.localeCompare(b.email));
      sort === "status-A-Z" &&
        searchedUser.sort((a, b) => a.status.localeCompare(b.status));
      sort === "status-Z-A" &&
        searchedUser.sort((b, a) => a.status.localeCompare(b.status));

      if (!searchedUser.length)
        return {
          messageError: `No se encontraron coincidencias para "${search}".`,
        };
      return searchedUser;
    } else {
      const allUsersDb = await Users.findAll();
      if (!allUsersDb.length)
        return { messageError: "No hay usuarios registrados." };

      sort === "role-A-Z" &&
        allUsersDb.sort((a, b) => a.role.localeCompare(b.role));
      sort === "role-Z-A" &&
        allUsersDb.sort((b, a) => a.role.localeCompare(b.role));
      sort === "name-A-Z" &&
        allUsersDb.sort((a, b) => a.fullName.localeCompare(b.fullName));
      sort === "name-Z-A" &&
        allUsersDb.sort((b, a) => a.fullName.localeCompare(b.fullName));
      sort === "email-A-Z" &&
        allUsersDb.sort((a, b) => a.email.localeCompare(b.email));
      sort === "email-Z-A" &&
        allUsersDb.sort((b, a) => a.email.localeCompare(b.email));
      sort === "status-A-Z" &&
        allUsersDb.sort((a, b) => a.status.localeCompare(b.status));
      sort === "status-Z-A" &&
        allUsersDb.sort((b, a) => a.status.localeCompare(b.status));
      // sort === "province-A-Z" && allUsersDb.sort((a, b) => a.province.localeCompare(b.province))
      // sort === "province-Z-A" && allUsersDb.sort((b, a) => a.province.localeCompare(b.province))
      // sort === "city-A-Z" && allUsersDb.sort((a, b) => a.city.localeCompare(b.city))
      // sort === "city-Z-A" && allUsersDb.sort((b, a) => a.city.localeCompare(b.city))
      // sort === "address-A-Z" && allUsersDb.sort((a, b) => a.address.localeCompare(b.address))
      // sort === "address-Z-A" && allUsersDb.sort((b, a) => a.address.localeCompare(b.address))

      return allUsersDb;
    }
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  getAllUsers,
};
