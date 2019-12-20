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
    tbl.string("employee_id");
    tbl.string("employee_name").notNullable();
    tbl.string("employee_email").notNullable();
    tbl.string("approver_name");
    tbl.string("approver_email");
    tbl.text("request_justification").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("requests");
};
