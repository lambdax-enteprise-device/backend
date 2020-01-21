exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("manufacturers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("manufacturers").insert([{ name: "HP" }]);
    });
};
