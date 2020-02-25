exports.up = function(knex) {
  return knex.schema.createTable("company_locations", tbl => {
    tbl.increments();
    tbl
      .integer("company_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("street_address");
    tbl.string("city", 128);
    tbl.string("state_province", 64);
    tbl.string("postal_code", 32);
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("company_locations");
};
