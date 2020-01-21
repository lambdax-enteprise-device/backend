exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("roles").insert([
        {
          name: "Devices - Edit",
          company_id: 1,
          access_level: "Write",
          assignment: "Devices",
          description: "Role assigned to allow device edits"
        },
        {
          name: "Devices - View",
          company_id: 1,
          access_level: "Read",
          assignment: "Devices",
          description: "Role assigned to view all devices"
        },
        {
          name: "Devices - Create",
          company_id: 1,
          access_level: "Create",
          assignment: "Devices",
          description: "Role assigned to create new devices"
        },
        {
          name: "Devices - Delete",
          company_id: 1,
          access_level: "Delete",
          assignment: "Devices",
          description: "Role assigned to allow deletion of devices"
        }
      ]);
    });
};
