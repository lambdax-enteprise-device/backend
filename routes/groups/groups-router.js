const router = require("express").Router();

const Groups = require("../../data-models/groups/groups-model.js");

// Get all Manufacturers
router.get("/", (req, res) => {
  Groups.findAllGroups()
    .then(groups => {
      res.status(200).json(groups);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get groups", error: error });
    });
});

router.post("/", (req, res) => {
  const group = req.body;
  Groups.add(group)
    .then(group => {
      res.status(200).json(group);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add group", error: error });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Groups.findById(id)
    .then(group => {
      res.status(200).json(group);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to retrieve group", error: error });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Groups.update(id, changes)
    .then(updatedGroup => {
      res.status(200).json(updatedGroup);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `Unable to update group with ID: ${id}`,
          error: error
        });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Groups.remove(id)
    .then(deletedGroup => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: "Group with that ID not found" });
    });
});

module.exports = router;
