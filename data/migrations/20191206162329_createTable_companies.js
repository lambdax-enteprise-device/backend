exports.up = function(knex) {
  return knex.schema.createTable("companies", tbl => {
    tbl.increments();
    tbl.string("company_name").notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.scheme.dropTableIfExists("companies");
};
