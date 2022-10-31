const Stripe = require("stripe");
const { Cart, Books } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE);

async function postCheckout({ cart, stripeId }) {
  try {
    const cartBuy = await Cart.findByPk(cart[0].cartId);
    const total = Math.round(
      cart.reduce((acc, act) => acc + Number(act.price), 0)
    );

    const payment = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "USD",
      payment_method: stripeId,
      confirm: true,
    });

    cartBuy.status = "Procesando";
    await cartBuy.save();

    cart.forEach(async (cart) => {
      const findBook = await Books.findByPk(cart.id);
      findBook.stock = findBook.stock - cart.quantity;
      await findBook.save();
    });

    return { message: "Pago realizado correctamente" };
  } catch (error) {
    console.log(error);
    console.log(error.raw?.message);
    return { messageError: error.raw?.message };
  }
}

module.exports = {
  postCheckout,
};
