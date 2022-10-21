const { Cart, Users, Books } = require("../db");

async function postCart({ userId, bookId }) {
    try {
        if (userId && bookId) {
            const userCart = await Cart.findOne({
                where: {
                    UserId: userId,
                    status: "Abierto"
                }
            })
            console.log(userCart)

            //if(userCart.length) userCart.addBooks(books)
            if (!userCart) {
                const newCart = await Cart.create({
                    UserId: userId,
                    status: "Abierto"
                });
                // bookId.forEach(b => {

                // })
                newCart.addBooks(bookId);
                return newCart;
            };

            return userCart;
        }
    }catch(error){
        console.log(error);
        return { messageError: "Se ha producido un error." };
    }

    //else if (userId && !books) {
    //     const findCart = await Cart.findAll({
    //         where: {
    //             UserId: userId,
    //             status: "Abierto"
    //         },
    //         include: [{
    //             model: Users,
    //             attributes: ["id"],
    //             through: { attributes: [] }
    //         }, {
    //             model: Books,
    //             attributes: ["name", "image", "author", "price"],
    //             through: { attributes: [] },
    //         }]
    //     });

    //     return findCart;
    // };

};

module.exports = {
    postCart
}

// const newCart = await Cart.create({
            //     UserId: userId,
            //     books: [...books]
            // })
            // const [newCart, boolean] = await Cart.findOrCreate({
            //     where: {
            //         UserId: userId,
            //         status: "Abierto"
            //     },
            //     // include: [{
            //     //     model: Users
            //     // }]
            // });

            // if (boolean) {
            //     allBooks.length && newCart.addBooks(books)
            // } else {
            //     allBooks.length && newCart.addBooks(books)
            // }
