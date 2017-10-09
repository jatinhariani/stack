
exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('verificationCode')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('verificationCode')
  })
}
