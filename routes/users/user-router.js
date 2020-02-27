const router = require("express").Router();

const Users = require("../../data-models/users/users-model.js");

// Get all users
router.get("/", (req, res) => {
  Users.findAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get Users", error: error });
    });
});

router.post("/company", (req, res) => {
  const { company } = req.body;
  Users.findUsersByCompany(company)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Could not find users under ${company}` });
    });
});

// Add new Users
router.post("/", (req, res) => {
  const user = req.body;
  Users.add(user)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add user" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to retrieve User" });
    });

router.put("/:id", (req, res) => {
  const { id } = req.params;

  Users.update(id, req.body)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to update user" });
    });
});

//* Will need to add delete once the process for user deletion is created (i.e. once all the other dependent foreign keys are deleted in the proper order)

module.exports = router;
