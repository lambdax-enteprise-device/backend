const db = require("../../data/db-config.js");

module.exports = {
  findAllCompanies,
  findById,
  add,
  update
};

function findAllCompanies() {
  return db("companies");
}

function findById(id) {
  return db("companies")
    .where({ id })
    .first();
}

async function add(company) {
  const [id] = await db("companies").insert(company, "id");

  return findById(id);
}

async function update(id, changes) {
  await db("companies")
    .update(changes)
    .where({ id });

  return findById(id);
}
