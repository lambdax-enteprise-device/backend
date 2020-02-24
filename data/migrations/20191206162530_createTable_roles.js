exports.up = function(knex) {
  return knex.schema.createTable("roles", tbl => {
    tbl.increments();
    tbl
      .integer("company_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("name", 128).notNullable();
    tbl.string("assignment").notNullable();
    tbl.integer("access_level").notNullable();
    tbl.text("description");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("roles");
};
