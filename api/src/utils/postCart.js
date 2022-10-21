const { Cart, Users, Books } = require("../db");

async function postCart({ userId }, books) {
    let allBooks = await Books.findAll();
    if (userId && books.length) {
        // const newCart = await Cart.create({
        //     UserId: userId,
        //     books: [...books]
        // })
        const [newCart, boolean] = await Cart.findOrCreate({
            where: {
                UserId: userId,
                status: "Abierto"
            },
            include: [{
                model: Users
            }]
        });

        if (boolean) {
            allBooks.length && newCart.addBooks(books)
        } else {
            allBooks.length && newCart.addBooks(books)
        }

        return newCart;

    } else if (userId && !books.length) {
        const findCart = await Cart.findAll({
            where: {
                UserId: userId,
                status: "Abierto"
            },
            include: [{
                model: Users
            }, {
                model: Books,
                attributes: ["name", "image", "author", "price"],
                through: { attributes: [] },
            }]
        });

        return findCart;
    };

};

module.exports = {
    postCart
}