const { Cart } = require('../db');

async function getCart(){
  try{
    const cart = await Cart.findAll();
    
  }catch(error){
    return { messageError: "Se ha producido un error." };
  }
};

module.exports = { 
  getCart 
};