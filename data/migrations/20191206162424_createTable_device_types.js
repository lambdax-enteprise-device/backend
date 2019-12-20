exports.up = function(knex) {
  return knex.schema.createTable("device_types", tbl => {
    tbl.increments();
    tbl
      .string("type")
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("device_types");
};
