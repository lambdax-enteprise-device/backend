const db = require("../../data/db-config.js");

module.exports = {
  findAllRequests,
  findRequestsByCompany,
  findById,
  add,
  update,
  remove
};

function findAllRequests() {
  return db("requests");
}

function findRequestsByCompany(company) {
  return (
    db("requests")
      // .select("first_name", "last_name")
      .innerJoin("companies", "requests.company_id", "companies.id")
      .where({ company_name: company })
  );
}

function findById(id) {
  return db("requests")
    .where({ id })
    .first();
}

async function add(request) {
  const [id] = await db("requests").insert(request, "id");

  return findById(id);
}

async function update(id, changes) {
  await db("requests")
    .update(changes)
    .where({ id });

  return findById(id);
}

function remove(id) {
  return db("requests")
    .del()
    .where({ id });
}
