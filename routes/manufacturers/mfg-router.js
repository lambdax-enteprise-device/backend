const router = require("express").Router();

const Manufacturers = require("../../data-models/manufacturers/mfg-model.js");

// Get all Manufacturers
router.get("/", (req, res) => {
  Manufacturers.findAllMfgs()
    .then(manufacturers => {
      res.status(200).json(manufacturers);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not get Manufacturers", error: error });
    });
});

router.post("/", (req, res) => {
  const manufacturer = req.body;
  Manufacturers.add(manufacturer)
    .then(manufacturer => {
      res.status(200).json(manufacturer);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to add manufacturer", error: error });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Manufacturers.findById(id)
    .then(manufacturer => {
      res.status(200).json(manufacturer);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to retrieve manufacturer", error: error });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Manufacturers.remove(id)
    .then(deletedmanufacturer => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: "Request with that ID not found" });
    });
});

module.exports = router;
