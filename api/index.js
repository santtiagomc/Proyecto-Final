const server = require("./src/app.js");
const { conn, sequelize } = require("./src/db.js");
const { PORT } = require("./config.js")

// Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(PORT, () => {
//     console.log("%s listening at 3001"); // eslint-disable-line no-console
//   });
// });
sequelize.sync().then(() => {
  server.listen(PORT)
})