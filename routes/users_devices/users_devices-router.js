const router = require('express').Router();

const UsersDevices = require("../../data-models/users_devices/users_devices-model.js")

// Get all UsersDevices
router.get("/", (req, res) => {
    UsersDevices.findAllUsersDevices()
    .then(usersDevices => {
        res.status(200).json(usersDevices);
    })
    .catch(error => {
        res.status(500).json({ message: "Could not get Users Devices"});
    });
});

// Add UsersDevice
router.post('/', (req, res) => {
    const userdevice = req.body;
    //console.log(userdevice)
    UsersDevices.add(userdevice)
    .then(usersDevices => {
        res.status(200).json(usersDevices)
    })
    .catch(error => {
        res.status(500).json({
            message: "Unable to add users device"
        })
    })
})

module.exports = router;