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

    return carts;

  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
};

module.exports = {
  getOrders
};