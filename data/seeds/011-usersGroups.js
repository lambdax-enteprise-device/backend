exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users_groups")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users_groups").insert([{ user_id: 1, group_id: 1 }]);
    });
};
