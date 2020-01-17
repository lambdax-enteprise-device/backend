exports.up = function(knex) {
  return knex.schema.createTable("request_items", tbl => {
    tbl.increments();
    tbl
      .integer("request_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("requests")
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
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("request_items");
};
