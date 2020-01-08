exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("permissions_groups")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("permissions_groups").insert([
        {
          group_id: 1,
          permission_id: 1
        }
      ]);
    });
};
