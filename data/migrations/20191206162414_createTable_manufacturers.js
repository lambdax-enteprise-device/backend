exports.up = function(knex) {
  return knex.schema.createTable("manufacturers", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("manufacturers");
};
