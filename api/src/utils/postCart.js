const { Cart, Users, Books_Carts } = require("../db");

async function postCart({ userId, bookId, suma }) {
    try {
        const userCart = await Cart.findOne({
            where: {
                UserId: userId,
                status: "Abierto"
            }
        });
        if (!userCart) {
            const newCart = await Cart.create({
                UserId: userId
            });
            await newCart.addBook(bookId);
            // return newCart;
            return { message: "Su libro ha sido añadido al carrito exitosamente!" }
        };

        const booksCart = await Books_Carts.findOne({
            where: {
                CartId: userCart.id,
                BookId: bookId
            }
        });
        if (!booksCart) {
            userCart.addBook(bookId);
            return { message: "Su libro ha sido añadido al carrito exitosamente!" }
        };
        if(suma){
            booksCart.quantity = booksCart.quantity + 1;
            await booksCart.save();
        }else {
            booksCart.quantity = booksCart.quantity - 1;
            await booksCart.save();
        }
        return { message: "Su libro ha sido modificado exitosamente!" }

    } catch (error) {
        console.log(error);
        return { messageError: "Se ha producido un error." };
    };
};

module.exports = {
    postCart
};