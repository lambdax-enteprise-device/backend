exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("requests")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("requests").insert([
        {
          company_id: 1,
          location_id: 1,
          employee_id: 1337,
          employee_name: "Joel Perez",
          employee_email: "joel.perez@enterprisedevices.com",
          approver_name: "Jack Sparrow",
          approver_email: "jack.sparrow@enterprisedevices.com",
          request_justification: "I just want new stuff!"
        }
      ]);
    });
};
