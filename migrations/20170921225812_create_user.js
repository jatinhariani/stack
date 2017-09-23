exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('givenName')
    table.string('familyName')
    table.enu('provider', ['email', 'google', 'facebook'])
    table.enu('role', ['admin', 'editor', 'user'])
    table.string('profileImage')
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
