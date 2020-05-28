const router = require("express").Router();
const bcrypt = require("bcrypt");
const sendEmail = require('../../mailer/mailer')
const Auth = require("../../data-models/auth/auth-model.js");
const Db = require("../../data-models/users/users-model")
const generateToken = require("../../utils/auth/generateToken.js");
const jwt = require('jsonwebtoken')
const secret = require('../../utils/secrets')
const { sevenDayCookie } = require('../../utils/constants')
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
 * @apiParam {boolean} isVerified Defaults to false 
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
  "message": "Company test and User info@mike-harley.tech created successfully.Please check your email",
 
}
 * @apiSuccess {String} welcome_message 
 * 
 */
router.post("/signup", (req, res) => {
  const num = Math.floor((Math.random() * 100) + 54)
  const rand = bcrypt.hashSync(JSON.stringify(num), 10)
  const company = { company_name: req.body.company_name };
  const user = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    isVerified: false,
    title: req.body.title,
    password: req.body.password,
    rand: rand
  };
  /** UserData passed to the sendEmail function 
      to, subject and text can be changed without breaking
      from can be changed except the domain name ex. {from: Any Name You Want <anyNameHereWillWork@-------->support.enterprise-devices.com<----- changing that will break the function} 
         
  */


  const hashPW = bcrypt.hashSync(user.password, 10);
  user.password = hashPW;

  Auth.signUp(company, user)
    .then(user => {
      const token = generateToken(user);
      return token

    })
    .then((token) => {
      console.log(token)
      const userData = {
        from: "Lambda X Enterprise Devices <developers@support.enterprise-devices.com>",
        to: `${user.first_name}  <${user.email}>`,
        subject: "Signup Conformation",
        html: `<p Hello ${user.first_name},\n This is to confirm you signed up with Lambda X Enterprise Devices\n Please verify your email by clicking the link below.\n Thank You,\n Lambda X Enterprise Device Dev Team` +
          `<a href="https://enterprise-devices-testing.herokuapp.com/api/auth/signup/` + token + `">Confirm Email</a></p>`
      }
      sendEmail.sendEmail(userData)

      res.status(200).json({
        message: `Company ${company.company_name} and User ${user.email} created successfully.Please check your email.`,

      })

      return token

    })
    .catch(error => {
      res.status(400).json({ message: error.message });
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
 * @apiSuccess {String} Ok  "Login Success"
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
          user: {
            companyId: user.company_id,
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            title: user.title
          },
          token: token,
        });
      } else {
        res.status(401).json({ message: "Email or password incorrect" });
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ message: "Server Error: Unable to Login", error: error });
    });
});

/**@api {get} /signup/:token Email Verification Endpoint
 * @apiName Auth
 * @apiGroup Users
 * @apiDescription Url sent via verification email to new user. Url is only valid 24 hours. It takes the from the url and compares it to the token stored in the DB.
 * @apiSuccess Ok Returns a success message and deletes the token from the DB
 * @apiError  Unauthorized "Please Verify Your Email"
 * 
 */
router.get('/signup/:token', async (req, res) => {


  const token = req.params.token
  const changes = { isVerified: true, rand: '' }
  const decodedToken = jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {

    if (err) {
      res.status(401).json({ message: 'Please Verify Your Email' })
    } else {
      req.jwtToken = decodedToken
      return decodedToken

    }
  })
  let id = decodedToken.userId
  await Db.findById(id)
    .then(user => {

      if (user[0].id === id) {
        Db.update(id, changes)
        return res.status(200).json({ message: `Thank you ${user[0].first_name} your email is verified` })
      } else {
        return res.status(400).json({ message: "Please verify your email" })
      }

    })
    .catch(error => { res.status(500).json(error) })
})

module.exports = router;
