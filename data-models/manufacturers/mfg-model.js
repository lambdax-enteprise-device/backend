const db = require("../../data/db-config.js");

module.exports = {
  findAllMfgs,
  findById,
  add,
  remove
};

function findAllMfgs() {
  return db("manufacturers");
}

function findById(id) {
  return db("manufacturers")
    .where({ id })
    .first();
}

async function add(request) {
  const [id] = await db("manufacturers").insert(request, "id");

  return findById(id);
}

function remove(id) {
  return db("manufacturers")
    .del()
    .where({ id });
}
