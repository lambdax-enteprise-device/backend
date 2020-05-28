
exports.up = function(knex,Promise) {
    return knex.schema.table('users',function(tbl) {
        tbl.string('rand',400)
  
    })
  };
  
  exports.down = function(knex,Promise)  {
      return knex.schema.table('users',(tbl) => {
          tbl.dropColumn('rand')
      })
  };