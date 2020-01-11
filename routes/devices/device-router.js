const router = require("express").Router();

const Devices = require("../../data-models/devices/devices-model.js");

// Get all users
router.get("/", (req, res) => {
  Devices.findAllDevices()
    .then(devices => {
      res.status(200).json(devices);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get Devices" });
    });
});

router.post("/company", (req, res) => {
  const { company } = req.body;
  Devices.findDevicesByCompany(company)
    .then(devices => {
      res.status(200).json(devices);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Could not find devices under ${company}` });
    });
});

router.post("/", (req, res) => {
  const device = req.body;
  Devices.add(device)
    .then(device => {
      res.status(200).json(device);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add device" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Devices.findById(id)
    .then(device => {
      res.status(200).json(device);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to retrieve device" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  Devices.update(id, req.body)
    .then(updatedDevice => {
      res.status(200).json(updatedDevice);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//* Will need to add delete once the process for user deletion is created (i.e. once all the other dependent foreign keys are deleted in the proper order)

module.exports = router;