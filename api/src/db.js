require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DataTypes } = require("sequelize");

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = require('../config.js')

const sequelize = new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false,
  native: false
})
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Books, Genres, Users, Cart, Reviews, Wishlist } = sequelize.models;

// Aca vendrian las relaciones
Books.belongsToMany(Genres, { through: "Books_Genres", timestamps: false });
Genres.belongsToMany(Books, { through: "Books_Genres", timestamps: false });

const Books_Carts = sequelize.define(
  "Books_Carts",
  { quantity: { type: DataTypes.INTEGER, defaultValue: 1 } },
  { timestamps: false }
);
Books.belongsToMany(Cart, { through: Books_Carts });
Cart.belongsToMany(Books, { through: Books_Carts });

Books.belongsToMany(Wishlist, { through: "Books_Wishlist", timestamps: false });
Wishlist.belongsToMany(Books, { through: "Books_Wishlist", timestamps: false });

Users.hasMany(Reviews);
Reviews.belongsTo(Users);

Books.hasMany(Reviews);
Reviews.belongsTo(Books);

Users.hasMany(Cart);
Cart.belongsTo(Users);

Users.hasOne(Wishlist);
Wishlist.belongsTo(Users);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
