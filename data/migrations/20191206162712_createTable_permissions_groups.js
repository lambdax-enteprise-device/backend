exports.up = function(knex) {
  return knex.schema.createTable("permissions_groups", tbl => {
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
      .integer("permission_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("permissions")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.unique(["group_id", "permission_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("permission_groups");
};
