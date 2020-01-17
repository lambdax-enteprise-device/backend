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

async function add(company, user) {
  const [companyId] = await db("companies").insert(company, "id");
  user["company_id"] = companyId;

  await db("users").insert(user, "id");
  return findById(companyId);
}

async function update(id, changes) {
  await db("companies")
    .update(changes)
    .where({ id });

  return findById(id);
}
