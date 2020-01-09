const router = require("express").Router();

const DeviceTypes = require("../../data-models/devices/deviceTypes-model");

// Get all Manufacturers
router.get("/", (req, res) => {
  DeviceTypes.findAllTypes()
    .then(deviceTypes => {
      res.status(200).json(deviceTypes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not get device types", error: error });
    });
});

router.post("/", (req, res) => {
  const deviceType = req.body;
  DeviceTypes.add(deviceType)
    .then(deviceType => {
      res.status(200).json(deviceType);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to add device type", error: error });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  DeviceTypes.findById(id)
    .then(deviceType => {
      res.status(200).json(deviceType);
    })
    .catch(error => {
      res.status(500).json({
        message: `Unable to retrieve device type at ID of ${id}`,
        error: error
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  DeviceTypes.remove(id)
    .then(deletedDeviceType => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: "Request with that ID not found" });
    });
});

module.exports = router;
