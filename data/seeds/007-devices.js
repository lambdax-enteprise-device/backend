exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("devices")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("devices").insert([
        {
          company_id: 2,
          device_type_id: 1,
          location_id: 1,
          manufacturer_id: 1,
          internal_id: "ABC123",
          serial_number: "STP128E294",
          active: true,
          cost_center: 120
        }
      ]);
    });
};
