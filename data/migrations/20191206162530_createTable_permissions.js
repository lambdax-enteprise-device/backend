exports.up = function(knex) {
  return knex.schema.createTable("roles", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string("assignment").notNullable();
    tbl.string("access_level").notNullable();
    tbl.text("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("roles");
};
