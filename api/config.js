const PORT = process.env.PORT || 3001
const DB_USER = process.env.PGUSER
const DB_PASSWORD = process.env.PGPASSWORD
const DB_HOST = process.env.PGHOST
const DB_PORT = process.env.PGPORT
const DB_NAME = process.env.PGDATABASE

module.exports = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT
}