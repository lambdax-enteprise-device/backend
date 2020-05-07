const router = require("express").Router();
const bcrypt = require("bcrypt");
const sendEmail = require('../../mailer/mailer')
const Auth = require("../../data-models/auth/auth-model.js");
const generateToken = require("../../utils/auth/generateToken.js");

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
  const userData = {from:"Lambda X Enterprise Device <noreply@mg.mike-harley.tech>",
                    to:`${user.first_name}  <${user.email}>`,
                    subject:"Signup Conformation",
                    text:`Hello ${user.first_name},\n This is to confirm you've sucessfully signed up with Lambda X Enterprise Device\n Thank You,\n Lambda X Enterprise Device Dev Team`}
  const hashPW = bcrypt.hashSync(user.password, 10);
  user.password = hashPW;

  Auth.signUp(company, user)
    .then(user => {
      const token = generateToken(user);
      return token
      
    })
    .then(userData,(token)=>{
      if(token){
      sendEmail(userData)
            
      res.status(200).json({
        message: `Company ${company.company_name} and User ${user.email} created successfully`,
        token
      })
    }
  })
    .catch(error => {
       console.error(error.message);
    });

});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Auth.login({ email })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.first_name}`,
          token
        });
      } else {
        res.status(401).json({ message: "Email or password incorrect" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error: Unable to Login" });
    });
});

module.exports = router;
