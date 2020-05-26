const router = require("express").Router();
const bcrypt = require("bcrypt");
const sendEmail = require('../../mailer/mailer');
const  sendIsVerifiedEmail = require('../../mailer/mailer')
const Auth = require("../../data-models/auth/auth-model.js");
const generateToken = require("../../utils/auth/generateToken.js");
const jwtSecret = process.env.jwtSecret
const  { sevenDayCookie } = require('../../utils/constants')
//! Primary signup endpoint. Creates new company and first user
/**
 * @api {post}  /api/auth/signup Signup
 * @apiName Auth
 * @apiGroup Admin
 * 
 * @apiParam {String} email user email
 * @apiParam {String} password user password 
 * @apiParam {String} first_name 
 * @apiParam {String} last_name
 * @apiParam {boolean} isVerified
 * @apiParam {String}  title
 * @apiExample {json} Example Body:
{
  "email":"info@mike-harley.tech",
	"password":"test123",
	"first_name":"Mike",
  "last_name":"Harley",
   "isVerified":"false"
	"title":"Tester",
  "company_name":"test"
}
@apiParamExample {json} Example Return: 
{
  "message": "Company test and User info@mike-harley.tech created successfully",
  "token": "
 @apiSuccess {String} verify_email welcome message is returned reminding the user to check and verify their email.
 * @apiSuccess {String} welcome_message 
   @apiDeprecated {string} jwt_deprecated This jwt is no longer returned during this api call. Once the user verifies the email address t
                             they are asked to login and the jwt is returned then 
 * @apiSuccess {String} jwt json web token
 */
router.post("/signup", (req, res) => {
 
  const company = { company_name: req.body.company_name };
  const user = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    isVerified:false,
    title: req.body.title,
    password: req.body.password
  };
  /** UserData passed to the sendEmail function 
      to, subject and text can be changed without breaking
      from can be changed except the domain name ex. {from: Any Name You Want <anyNameHereWillWork@-------->support.enterprise-devices.com<----- changing that will break the function} 
         
  */
    
  // WIP Stared creating the validateEmail function and response email
  // need to test function on dummy accounts 
  const hashPW = bcrypt.hashSync(user.password, 10);
  user.password = hashPW;

  Auth.signUp(company, user)
    .then(async (user) => {
      const url = await generateValidateEmailToken(user);
      const token = await generateToken(user)
      const userData = {from:"Lambda X Enterprise Devices <developers@support.enterprise-devices.com>",
      to:`${user.first_name}  <${user.email}>`,
      subject:"Signup Conformation",
      text:`Hello ${user.first_name},\n Please click the link blow to confirm your email address\n Thank You,\n Lambda X Enterprise Device Dev Team
                if you did not sign up for an account Thank You Lambda X Enterprise Devices`,
        html:`<a href=${url} target="_blank">Confirm Email Address</a>`}
        sendEmail.sendIsVerifiedEmail(userData,response)
          const response = function(body, error){
            if (error) console.log(error.message)
                   return body
        }
     return response
      
    })
    .then((response)=>{
          console.log(response)
      // sendEmail.sendEmail(userData)
            
      res.status(200).json({
        message: `Company ${company.company_name} and User ${user.email} created successfully`,
        token
      })
  
    
    
  })
    .catch(error => {
         res.status(400).json({message:error.message});
    });
    
    


});

/**
 * @api {post}  /api/auth/login Login
 * @apiName Auth
 * @apiGroup Admin
 * 
 * @apiParam {String} email
 * @apiParam {String} password
* @apiParamExample {json} Example Return:
 * {
  "message": "Login Success",
  "user": {
    "companyId": 28,
    "id": 26,
    "email": "info@mike-harley.tech",
    "firstName": "Mike",
    "lastName": "Harley",
    "title": "Admins"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2LCJ1c2VybmFtZSI6ImluZm9AbWlrZS1oYXJsZXkudGVjaCIsImlhdCI6MTU4OTkyOTcxNywiZXhwIjoxNTkwNTM0NTE3fQ.hdbEfVTLSgJh616OhEs54J7bYaaObhtppQqCdf0Z7MQ"
}
 * @apiSuccess {String} welcome_message 
 * @apiSuccess {String} jwt json web token
 * 
 */
router.post("/login", (req, res) => {

  const email = req.body.email
  const password = req.body.password
  Auth.login(req.body.email)
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
      console.error(error)
      res.status(500).json({ message: "Server Error: Unable to Login" ,error:error});
    });
});


generateValidateEmailToken(user,jwt )

module.exports = router;
