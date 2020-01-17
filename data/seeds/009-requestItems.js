exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("request_items")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("request_items").insert([
        { request_id: 1, device_type_id: 1 }
      ]);
    });
};
