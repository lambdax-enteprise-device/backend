exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          company_id: 2,
          email: "joel.perez@testcompany.com",
          first_name: "Joel",
          last_name: "Perez",
          title: "CTO"
        }
      ]);
    });
};
