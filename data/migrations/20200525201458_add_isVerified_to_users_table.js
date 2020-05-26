
exports.up = function(knex,Promise) {
  return knex.schema.table('users',function(tbl) {
      tbl.boolean('isVerified').defaultTo(false)

  })
};

exports.down = function(knex,Promise)  {
    return knex.schema.table('users',(tbl) => {
        tbl.dropColumn('isVerified')
    })
};
