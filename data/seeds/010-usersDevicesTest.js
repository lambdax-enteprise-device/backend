exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users_devices")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users_devices").insert([
        {
          user_id: 1,
          device_id: 1,
          reserve_start: "12-11-2019",
          reserve_end: "12-11-2022"
        }
      ]);
    });
};
