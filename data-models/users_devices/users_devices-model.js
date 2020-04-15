const db = require('../../data/db-config.js');

module.exports = {
    findAllUsersDevices,
    findById,
    add
}

function findAllUsersDevices() {
    return db("users_devices");
}

function findById(id) {
    return db("users_devices")
    .where({ id })
    .first();
}

async function add(userDevice) {
    const [id] = await db("users_devices").insert(userDevice, "id");

    return findById(id);
}