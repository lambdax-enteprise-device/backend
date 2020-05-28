const router = require("express").Router();

const Users = require("../../data-models/users/users-model.js");

// Get all users
/**@api {get}  /api/users  Get users
 *
 * @apiName Users
 * @apiPermission Admin
 * @apiGroup Admin
 * 
 *@apiUse Token
 *
 *@apiSuccess {string} Users A list of users
*/
router.get("/", (req, res) => {
  Users.findAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get Users", error: error });
    });
});

/**@api {post}  /api/users/company  Get user by company name.
 *
 * @apiName Users
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiParam {string} company The name of the company
 *@apiUse Token
 *
 *@apiSuccess {object} User Returns a list of users for the company
*/
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

/**@api {post}  /api/users  Post Add a new user.
 *
 * @apiName Users
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiParam {string} company_id 
 * @apiParam {string} email User email address.
 * @apiParam {string} password User password
 * @apiParam {string} first_name 
 * @apiParam {string} last_name
 * @apiParam {string} title 
 * @apiParam {boolean} isVerified 
 *@apiUse Token
 *
 *@apiSuccess {object} Returns user object upon success
*/

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
/**
 * @api {get}  /api/users/:id  Get user by user id.
 *
 * @apiName Users
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiParam {number} id user_id
 *@apiUse Token
 *
 *@apiSuccess {object} User Returns user object.
 */


router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to retrieve User" });
    });
});
/**
 * @api {put}  /api/users/:id Update user.
 *
 * @apiName Users
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiParam {string} updates In the body in json enter any updates for the user,
 *@apiUse Token
 *
 *@apiSuccess {object} User Returns updated user object.
 */
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
