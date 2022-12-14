const { Cart, Users, Books_Carts } = require("../db");

async function postCart({ userId, bookId, suma }) {
  try {
    if (!Array.isArray(bookId)) {
      const userCart = await Cart.findOne({
        where: {
          UserId: userId,
          status: "Abierto",
        },
      });
      if (!userCart) {
        const newCart = await Cart.create({
          UserId: userId,
        });
        await newCart.addBook(bookId);

        return { message: "Su libro ha sido añadido al carrito exitosamente!" };
      }

      const booksCart = await Books_Carts.findOne({
        where: {
          CartId: userCart.id,
          BookId: bookId,
        },
      });
      if (!booksCart) {
        await userCart.addBook(bookId);
        return { message: "Su libro ha sido añadido al carrito exitosamente!" };
      }
      if (suma) {
        if (booksCart.quantity < 5) {
          booksCart.quantity = booksCart.quantity + 1;
          await booksCart.save();
        }
      } else {
        booksCart.quantity = booksCart.quantity - 1;
        await booksCart.save();
      }

      return { message: "Su libro ha sido modificado exitosamente!" };
    } else {
      let [bId] = bookId;

      if (bId) {
        bookId.forEach(async (b) => {
          const userCart = await Cart.findOne({
            where: {
              UserId: userId,
              status: "Abierto",
            },
          });
          if (!userCart) {
            const newCart = await Cart.create({
              UserId: userId,
            });
            await newCart.addBook(b);
            return [false];
          }
          if (b) {
            const booksCart = await Books_Carts.findOne({
              where: {
                CartId: userCart.id,
                BookId: b,
              },
            });
            if (!booksCart) {
              await userCart.addBook(b);
              return [false];
            }
            if (suma) {
              if (booksCart.quantity < 5) {
                booksCart.quantity = booksCart.quantity + 1;
                await booksCart.save();
              }
            } else {
              booksCart.quantity = booksCart.quantity - 1;
              await booksCart.save();
            }
          }
        });
      } else {
        const userCart = await Cart.findOne({
          where: {
            UserId: userId,
            status: "Abierto",
          },
        });
        if (!userCart) {
          const newCart = await Cart.create({
            UserId: userId,
          });
        }
      }

      return [false];
    }
  } catch (error) {
    console.log(error);
    return { messageError: "Se ha producido un error." };
  }
}

module.exports = {
  postCart,
};
