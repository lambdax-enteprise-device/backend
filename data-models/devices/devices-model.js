const db = require("../../data/db-config.js");

module.exports = {
  findAllDevices,
  findDevicesByCompany,
  findById,
  add,
  update
};

function findAllDevices() {
  return db("devices");
}

function findDevicesByCompany(company) {
  return (
    db("devices")
      // .select("first_name", "last_name")
      .innerJoin("companies", "devices.company_id", "companies.id")
      .where({ company_name: company })
  );
}

function findById(id) {
  return db("devices")
    .where({ id })
    .first();
}

async function add(device) {
  const [id] = await db("devices").insert(device, "id");

  return findById(id);
}

async function update(id, changes) {
  await db("devices")
    .update(changes)
    .where({ id });

  return findById(id);
}
