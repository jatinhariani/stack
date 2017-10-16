import knex from 'knex'
import bookshelf from 'bookshelf'
import bookshelfModelbase from 'bookshelf-modelbase'

const connection = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
})

const model = bookshelf(connection)
model.plugin('virtuals')
model.plugin('visibility')
model.plugin('pagination')
model.plugin('registry')
model.plugin(bookshelfModelbase.pluggable)

module.exports = model
