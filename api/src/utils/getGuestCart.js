const { Books } = require("../db");

async function getGuestCart({ localS }) {
  try {
    let idArray = localS.split(",");
    let allBooks = await Books.findAll();
    let guestCart = allBooks.reduce((acc, item) => {
      if (idArray.includes(item.id)) acc.push(item);
      return acc;
    }, []);

    if (!guestCart.length)
      return { messageError: "No se encontraron resultados" };
    guestCart = guestCart.map((b) => {
      return {
        id: b.id,
        name: b.name,
        image: b.image,
        author: b.author,
        price: b.price,
        stock: b.stock,
      };
    });
    return guestCart;
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  getGuestCart,
};
