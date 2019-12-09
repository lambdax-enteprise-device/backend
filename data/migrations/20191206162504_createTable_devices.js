exports.up = function(knex) {
  return knex.schema.createTable("devices", tbl => {
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
      .integer("device_type_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("device_types")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("manufacturer_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("manufacturers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("internal_id");
    tbl.string("serial_number").notNullable();
    tbl.boolean("active");
    tbl.string("cost_center");
    tbl.string("location");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("devices");
};
