const db = require("../../data/db-config.js");

module.exports = {
  findRequestedItemsByCompany,
  findById,
  add,
  update,
  remove
};

function findRequestedItemsByCompany(companyID) {
  //! Will need to figure out inner join context in order to list all items for given company as a 3 table join
  //? Does this NEED to be a 3-table join? Can we use company_id from user to match?
  return (
    db("request_items")
      // .select("first_name", "last_name")
      .innerJoin("requests", "request_items.request_id", "requests.id")
      .where({ id: companyID })
  );
}

function findById(id) {
  return db("request_items")
    .where({ id })
    .first();
}

async function add(requestItems) {
  const [id] = await db("groups").insert(requestItems, "id");

  return findById(id);
}

async function update(id, changes) {
  await db("request_items")
    .update(changes)
    .where({ id });

  return findById(id);
}

function remove(id) {
  return db("request_items")
    .del()
    .where({ id });
}
