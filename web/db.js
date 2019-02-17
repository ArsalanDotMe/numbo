const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING || 'postgresq://localhost/numbo'
})

module.exports = pg
