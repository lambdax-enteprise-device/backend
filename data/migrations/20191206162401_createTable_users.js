exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .integer("company_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .string("email")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl.string("title");
    tbl.timestamps(true, true);
    tbl.unique(["company_id", "email"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
