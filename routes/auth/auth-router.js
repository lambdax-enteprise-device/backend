const router = require("express").Router();
const bcrypt = require("bcrypt");
const sendEmail = require('../../mailer/mailer')
const Auth = require("../../data-models/auth/auth-model.js");
const generateToken = require("../../utils/auth/generateToken.js");
const  { sevenDayCookie } = require('../../utils/constants')
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
  /** UserData passed to the sendEmail function 
      to, subject and text can be changed without breaking
      from can be changed except the domain name ex. {from: Any Name You Want <anyNameHereWillWork@-------->mg.mike-harley.com<----- changing that will break the function} 

  */
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
    .then((token)=>{
    
      sendEmail(userData)
            
      res.status(200).json({
        message: `Company ${company.company_name} and User ${user.email} created successfully`,
        token
      })
    
    
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
          message: "Login Success",
          user:{
            companyId:user.company_id,
            id:user.id,
            email:user.email,
            firstName:user.first_name,
            lastName:user.last_name,
            title:user.title
          },
          token:token,
        });
      } else {
        res.status(401).json({ message: "Email or password incorrect" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error: Unable to Login" ,error:error.message});
    });
});


module.exports = router;
