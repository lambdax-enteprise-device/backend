exports.up = function(knex) {
  return knex.schema.createTable("users_groups", tbl => {
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
      .integer("group_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.unique(["user_id", "group_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users_groups");
};
