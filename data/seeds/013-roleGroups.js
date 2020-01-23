exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("role_groups")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("role_groups").insert([
        {
          group_id: 1,
          role_id: 1
        }
      ]);
    });
};
