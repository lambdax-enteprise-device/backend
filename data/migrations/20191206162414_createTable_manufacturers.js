exports.up = function(knex) {
  return knex.schema.createTable("manufacturers", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .notNullable()
      .unique();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("manufacturers");
};
