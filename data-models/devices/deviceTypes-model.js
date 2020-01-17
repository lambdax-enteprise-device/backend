const db = require("../../data/db-config.js");

module.exports = {
  findAllTypes,
  findById,
  add,
  remove
};

function findAllTypes() {
  return db("device_types");
}

function findById(id) {
  return db("device_types")
    .where({ id })
    .first();
}

async function add(request) {
  const [id] = await db("device_types").insert(request, "id");

  return findById(id);
}

function remove(id) {
  return db("device_types")
    .del()
    .where({ id });
}
