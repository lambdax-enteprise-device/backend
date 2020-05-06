exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("companies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("companies").insert([
        { company_name: "Enterprise Devices", active: true },
        { company_name: "Test Company 2", active: true },
        { company_name: "Test Company 3", active: true }
      ]);
    });
};
