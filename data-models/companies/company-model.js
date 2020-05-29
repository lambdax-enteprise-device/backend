const db = require("../../data/db-config.js");

module.exports = {
  findAllCompanies,
  findById,
  update
};

//* Add Company moved to Auth Model

function findAllCompanies() {
  return db("companies")
        
}

function findById(id) {
  return db("companies")
        .innerJoin("company_locations as cl","companies.id","cl.company_id")
        .where(id,'=','cl.company_id')
        .first();
}

async function update(id, changes) {
  await db("companies")
    .update(changes)
    .where({ id });

  return findById(id);
}
