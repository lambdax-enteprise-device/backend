const db = require("../../data/db-config.js");

module.exports = {
  findAllUsers,
  findUsersByCompany,
  findById,
  add,
  update,
  findByEmail
};

function findAllUsers() {
  return db("users");
}

function findUsersByCompany(company) {
  return (
    db("users")
       .select("first_name", "last_name")
      .innerJoin("companies", "users.company_id", "companies.id")
      .where( "companies.company_name","=",company )
  );
}

function findById(id) {
  return db("users").select('*').where('id', '=', id).orderBy('id', 'desc');
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

async function update(id, changes) {
  console.log(id)
  await db("users").update(changes).where("id", "=", id);

  return findById(id);
}


function findByEmail(emailAddress) {
  return db('users')
    .where('users.email', '=', emailAddress)
    .first()

}