const { Cart, Users, Books } = require('../db');

async function getOrders({ status }) {
  try {
    const carts = await Cart.findAll({
      where: {
        status
      },
      include: [{
        model: Users
      }, {
        model: Books,
        attributes: ["name", "image", "author", "price"],
        through: { attributes: {} },
      }]
    });
    console.log(carts)

    if (!carts) return { messageError: `No hay ninguna orden con el estado ${status}` };

    return carts;

  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
};

module.exports = {
  getOrders
};