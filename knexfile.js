require('./src/env')

module.exports = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL
}
