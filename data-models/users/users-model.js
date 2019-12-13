const knex = require("knex");

const db = require("../../data/db-config.js");

module.exports = {
  findAllUsers,
  findCompanyUsers
};

function findAllUsers() {
  return db("users");
}

function findCompanyUsers(company) {
  return db("users").where("company");
}
