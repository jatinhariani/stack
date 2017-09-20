exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('things', function (table) {
    table.increments()
    table.string('name')
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('things')
}
