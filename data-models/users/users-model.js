const db = require("../../data/db-config.js");

module.exports = {
  findAllUsers,
  findUsersByCompany
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
