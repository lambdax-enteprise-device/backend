exports.up = function(knex) {
  return knex.schema.createTable("requests", tbl => {
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
      .integer("location_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("company_locations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("employee_id");
    tbl.string("employee_name").notNullable();
    tbl.string("employee_email").notNullable();
    tbl.string("approver_name");
    tbl.string("approver_email");
    tbl.text("request_justification").notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("requests");
};
