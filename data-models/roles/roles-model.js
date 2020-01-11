const db = require("../../data/db-config.js");

module.exports = {
  findAllRoles,
  findRolesByCompany,
  findById,
  add,
  update,
  remove
};

function findAllRoles() {
  return db("roles");
}

function findRolesByCompany(company) {
  return (
    db("roles")
      // .select("first_name", "last_name")
      .innerJoin("companies", "roles.company_id", "companies.id")
      .where({ company_name: company })
  );
}

function findById(id) {
  return db("roles")
    .where({ id })
    .first();
}

async function add(role) {
  const [id] = await db("roles").insert(role, "id");

  return findById(id);
}

async function update(id, changes) {
  await db("roles")
    .update(changes)
    .where({ id });

  return findById(id);
}

function remove(id) {
  return db("roles")
    .del()
    .where({ id });
}
