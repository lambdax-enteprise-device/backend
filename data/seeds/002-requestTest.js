exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("requests")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("requests").insert([
        {
          company_id: 1,
          employee_id: 1234,
          employee_name: "Ben Dover",
          employee_email: "ben.dover@testcompany.com",
          approver_name: "Jack Sparrow",
          approver_email: "jack.sparrow@testcompany.com",
          request_justification: "I just want new stuff!"
        }
      ]);
    });
};
