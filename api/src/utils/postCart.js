const {Cart, Users} = require("../db");

async function postCart({userId}, books){
    let orders 
    if(userId && books){
        // const newCart = await Cart.create({
        //     UserId: userId,
        //     books: [...books]
        // })
        const [newCart, boolean] = await Cart.findOrCreate({
            where: {
                UserId: userId,
                status: "Abierto"
            },
            defaults: {
                books: [...books]
            }
        });

        return newCart;
        
    }else if(userId && !books.length){

    }

};

module.exports = {
    postCart
}