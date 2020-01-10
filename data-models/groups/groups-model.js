const db = require("../../data/db-config.js");

module.exports = {
  findAllGroups,
  findGroupsByCompany,
  findById,
  add,
  remove
};

function findAllGroups() {
  return db("groups");
}

function findGroupsByCompany(company) {
  return (
    db("groups")
      // .select("first_name", "last_name")
      .innerJoin("companies", "groups.company_id", "companies.id")
      .where({ company_name: company })
  );
}

function findById(id) {
  return db("groups")
    .where({ id })
    .first();
}

async function add(request) {
  const [id] = await db("groups").insert(request, "id");

  return findById(id);
}

function remove(id) {
  return db("groups")
    .del()
    .where({ id });
}
