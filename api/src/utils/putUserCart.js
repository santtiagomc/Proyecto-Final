const { Cart, Books, Books_Carts } = require("../db");

async function putUserCart({ cartId, bookId }) {
  try {
    const booksCart = await Books_Carts.findOne({
      where: {
        CartId: cartId,
        BookId: bookId,
      },
    });
    await booksCart.destroy();
    await booksCart.save();

    // const userCart = await Cart.findOne({
    //   where: {
    //     id: cartId,
    //   },
    //   include: [
    //     {
    //       model: Books,
    //       attributes: ["name"],
    //       through: { attributes: [] },
    //     },
    //   ],
    // });

    // const book = await Books.findOne({
    //   where: {
    //     id: bookId,
    //   },
    // });
    // const bookName = await capitalize(book.name);

    return {
      message: `Se eliminó '${bookName}' de tu carrito`,
      // messageVacio:
      //   "¡Oh! Tu carrito está vacío. ¿No sabes qué libro leer? ¡Tenemos muchos que te van a encantar!",
    };
  } catch (error) {
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  putUserCart,
};
