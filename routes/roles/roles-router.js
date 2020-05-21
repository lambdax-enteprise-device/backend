const router = require("express").Router();

const Roles = require("../../data-models/roles/roles-model.js");


router.get("/", (req, res) => {
  Roles.findAllGroups()
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get roles", error: error });
    });
});

router.get("/company", (req, res) => {
  const { companyId } = req.body;

  Roles.findRolesByCompany(companyId)
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `Could not find roles with company ID: ${companyId}`
        });
    });
});

router.post("/", (req, res) => {
  const role = req.body;
  Roles.add(role)
    .then(role => {
      res.status(200).json(role);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add role", error: error });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Roles.findById(id)
    .then(role => {
      res.status(200).json(role);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to retrieve role", error: error });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Roles.update(id, changes)
    .then(updatedRole => {
      res.status(200).json(updatedRole);
    })
    .catch(error => {
      res.status(500).json({
        message: `Unable to update role with ID: ${id}`,
        error: error
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Roles.remove(id)
    .then(deletedRole => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: "Role with that ID not found" });
    });
});

module.exports = router;
