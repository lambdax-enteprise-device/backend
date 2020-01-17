exports.up = function(knex) {
  return knex.schema.createTable("groups", tbl => {
    tbl.increments();
    tbl.string("group_name").notNullable();
    tbl
      .integer("company_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("groups");
};
