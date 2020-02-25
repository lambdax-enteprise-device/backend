exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("company_locations")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("company_locations").insert([
        {
          company_id: 1,
          street_address: "560 S Carr Ave",
          city: "Lafayette",
          state_province: "Colorado",
          postal_code: "80026"
        },
        {
          company_id: 1,
          street_address: "640 Stonebridge Dr.",
          city: "Longmont",
          state_province: "Colorado",
          postal_code: "80503"
        }
      ]);
    });
};
