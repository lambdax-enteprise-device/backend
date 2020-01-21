exports.up = function(knex) {
  return knex.schema.createTable("role_groups", tbl => {
    tbl.increments();
    tbl
      .integer("group_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
    tbl.unique(["group_id", "role_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("role_groups");
};
