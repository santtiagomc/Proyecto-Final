const { Op } = require('sequelize');
const { Cart, Users, Books, Genres } = require('../db');

async function getOrders({ sort, searchValue }) {
  try {
    let allCarts
    if (searchValue) {
      allCarts = await Cart.findAll({
        where: {
          status: {
            [Op.or]: ["Procesando", "Entregado"]
          }
        },
        include: [{
          model: Users,
          where: {
            fullName: {
              [Op.iLike]: `${searchValue}%`
            }
          }
        }, {
          model: Books,
          attributes: ["name", "image", "author", "price"],
          through: { attributes: {} },
        }]
      });

      if (!allCarts.length) return { messageError: `No se encontraron coincidencias para "${searchValue}".` };
    } else {
      allCarts = await Cart.findAll({
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
          include: [{
            model: Genres
          }]
        }]
      });

      if (!allCarts) return { messageError: `No hay ninguna orden` };
    }

    sort === "status-A-Z" && allCarts.sort((a, b) => a.status.localeCompare(b.status))
    sort === "status-Z-A" && allCarts.sort((b, a) => a.status.localeCompare(b.status))
    sort === "name-A-Z" && allCarts.sort((a, b) => a.User.fullName.localeCompare(b.User.fullName))
    sort === "name-Z-A" && allCarts.sort((b, a) => a.User.fullName.localeCompare(b.User.fullName))
    sort === "price-min-max" && allCarts.sort((a, b) => a.Books.reduce((acc, el) => {
      acc = acc + (el.Books_Carts.quantity * el.price)
      return acc
    }, 0) - b.Books.reduce((acc, el) => {
      acc = acc + (el.Books_Carts.quantity * el.price)
      return acc
    }, 0))
    sort === "price-max-min" && allCarts.sort((b, a) => a.Books.reduce((acc, el) => {
      acc = acc + (el.Books_Carts.quantity * el.price)
      return acc
    }, 0) - b.Books.reduce((acc, el) => {
      acc = acc + (el.Books_Carts.quantity * el.price)
      return acc
    }, 0))

    return allCarts;

  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
};

module.exports = {
  getOrders
};