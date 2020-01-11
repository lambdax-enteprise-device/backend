exports.up = function(knex) {
  return knex.schema.createTable("roles", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl
      .integer("company_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE")
      .OnUpdate("CASCADE");
    tbl.string("assignment").notNullable();
    tbl.string("access_level").notNullable();
    tbl.text("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("roles");
};
