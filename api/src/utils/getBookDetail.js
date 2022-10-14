<<<<<<< HEAD
require('dotenv').config();
const axios = require('axios');
const { } = require('../db');
const { API_KEY } = process.env;

async function getBookDetail(idBook) {}
=======
require("dotenv").config();
const { Books, Genres } = require("../db");

async function getBookDetail(idBook) {
  try {
    const idDb = await Books.findByPk(idBook, {
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!idDb) return { messageError: "This book does not exist" };

    return idDb;
  } catch (error) {
    return { messageError: "This book does not exist" };
  }
}
>>>>>>> 1fec79f201f56729d56fdb99ce885f2741d1dc4f

module.exports = {
  getBookDetail
}





