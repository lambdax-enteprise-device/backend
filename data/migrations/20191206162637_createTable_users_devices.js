exports.up = function(knex) {
  return knex.schema.createTable("users_devices", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("device_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("devices")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.date("reserve_start");
    tbl.date("reserve_end");
    tbl.timestamps(true, true);
    tbl.unique(["user_id", "device_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users_devices");
};
