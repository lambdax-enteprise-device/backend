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

function findRolesByCompany(companyId) {
  return (
    db("roles")
      // * Not sure inner join is needed. Best to go off of company ID tied to user account
      //   .innerJoin("companies", "roles.company_id", "companies.id")
      .where({ company_id: companyId })
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
