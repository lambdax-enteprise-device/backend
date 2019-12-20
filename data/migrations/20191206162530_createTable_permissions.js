exports.up = function(knex) {
  return knex.schema.createTable("permissions", tbl => {
    tbl.increments();
    tbl
      .string("permission_type")
      .notNullable()
      .unique();
    tbl.string("access_level").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("permissions");
};
