const router = require("express").Router();
const bcrypt = require("bcrypt");

const Auth = require("../../data-models/auth/auth-model.js");
const generateToken = require("../../utils/auth/generateToken.js");
const { sevenDayCookie } = require("../../utils/constants.js");

//! Primary signup endpoint. Creates new company and first user
router.post("/signup", (req, res) => {
  const company = { company_name: req.body.company_name };
  const user = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    title: req.body.title,
    password: req.body.password
  };
  const hashPW = bcrypt.hashSync(user.password, 10);
  user.password = hashPW;

  Auth.signUp(company, user)
    .then(user => {
      console.log(user);
      const token = generateToken(user);
      res.status(200).json({
        message: "Sign Up Success",
        user: {
          companyId: user.company_id,
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          title: user.title
        },
        token: token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Unable to Sign Up New User" });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Auth.login({ email })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "Login Success",
          user: {
            companyId: user.company_id,
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            title: user.title
          },
          token: token
        });
      } else {
        res.status(401).json({ message: "Email or password incorrect" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Server Error: Unable to Login",
        error: error.message
      });
    });
});

module.exports = router;
