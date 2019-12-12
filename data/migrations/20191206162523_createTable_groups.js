exports.up = function(knex) {
  return knex.schema.createTable("groups", tbl => {
    tbl.increments();
    tbl.string("group_name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("groups");
};
