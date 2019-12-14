const db = require("../../data/db-config.js");

module.exports = {
  findAllUsers,
  findUsersByCompany,
  findById,
  add
};

function findAllUsers() {
  return db("users");
}

function findUsersByCompany(company) {
  return (
    db("users")
      // .select("first_name", "last_name")
      .innerJoin("companies", "users.company_id", "companies.id")
      .where({ company_name: company })
  );
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}
