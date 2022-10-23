const Cart = require ("../models/Cart")


async function deleteCart({id}){
    // const {id} = req.query;
    try {
        const cartSave = await Cart.findOne(id);
        if (cartSave) {
        const cartDelete = await cartSave.destroy();
        return res.json({
            message: "carrito eliminado",
            cartSave,
            cartDelete
        })
        } else {
        res
            .status(400)
            .json({error: "No existen datos con ese ID", id})
        }
    }catch (error) {
        return { messageError: "Se ha producido un error." };
    }
}

module.exports = {
    deleteCart
};