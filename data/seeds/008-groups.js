exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("groups")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("groups").insert([
        { group_name: "Admins", company_id: 1 },
        { group_name: "Finance", company_id: 1 },
        { group_name: "IT Support", company_id: 1 }
      ]);
    });
};
