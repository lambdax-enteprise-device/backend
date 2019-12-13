const router = require("express").Router();

const Users = require("../../data-models/users/users-model.js");

// Get all users
router.get("/", (req, res) => {
  Users.findAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get Users" });
    });
});

module.exports = router;
