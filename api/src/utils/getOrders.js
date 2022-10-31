const { Op } = require('sequelize');
const { Cart, Users, Books } = require('../db');

async function getOrders() {
  try {
    const carts = await Cart.findAll({
      where: {
        status: {
          [Op.or]: ["Procesando", "Entregado"]
        }
      },
      include: [{
        model: Users
      }, {
        model: Books,
        attributes: ["name", "image", "author", "price"],
        through: { attributes: {} },
      }]
    });

    if (!carts) return { messageError: `No hay ninguna orden` };

    // sort === "role-A-Z" && allUsersDb.sort((a, b) => a.role.localeCompare(b.role))
    // sort === "role-Z-A" && allUsersDb.sort((b, a) => a.role.localeCompare(b.role))
    // sort === "name-A-Z" && allUsersDb.sort((a, b) => a.fullName.localeCompare(b.fullName))
    // sort === "name-Z-A" && allUsersDb.sort((b, a) => a.fullName.localeCompare(b.fullName))
    // sort === "email-A-Z" && allUsersDb.sort((a, b) => a.email.localeCompare(b.email))
    // sort === "email-Z-A" && allUsersDb.sort((b, a) => a.email.localeCompare(b.email))
    // sort === "status-A-Z" && allUsersDb.sort((a, b) => a.status.localeCompare(b.status))
    // sort === "status-Z-A" && allUsersDb.sort((b, a) => a.status.localeCompare(b.status))

    return carts;

  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
};

module.exports = {
  getOrders
};