exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("device_types")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("device_types").insert([{ type: "Laptop" }]);
    });
};
