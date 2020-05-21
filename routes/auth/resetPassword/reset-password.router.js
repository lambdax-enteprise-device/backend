
const router = require("express").Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const db = require('../../../data-models/users/users-model')
const jwtSecret = require('../../../utils/secrets')
const bcrypt = require('bcrypt')
const sendPasswordReset = require('../../../mailer/mailer')
router.use(bodyParser.urlencoded({ extended: false }))




/**
 * @api {get} /api/auth/password/forgotpassword Change User Password
 * @apiName Auth
 * @apiGroup Users

 * @apiSuccess {form} Password_Reset form 
 *   
 *
 */
router.get('/forgotpassword', (req, res) => {
    res.send(`<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
         <h2 style="text-align:center">Reset Your Password</h2>
        <form  className="form-group" action="https://enterprise-devices-testing.herokuapp.com/api/auth/password/passwordreset" method="POST">` +
        `<input style="width:15rem ; margin-left:500px ; margin-top:200px" className="form-control" type="email" name="email" value="" placeholder="Enter Your Email Address..."/>` +
        `<input className="btn btn-primary" type="submit" value="Reset Password" />` +
        `</form>`)
})

/**
 * @api {post} /api/auth/password/passwordreset Send Password
 * @apiName Auth
 * @apiGroup Users

 * @apiError {object} Error_Object If not found an error message is returned .
 @apiSuccess {string} Success_Message "Email Sent"
 */
router.post('/passwordreset', async (req, res) => {
        
    if (req.body.email !== undefined) {
        const emailAddress = req.body.email
      await  db.findByEmail(emailAddress)
            .then(async (response) => {
                const id = response.id
                const payload = {
                    id: id,
                    email: emailAddress
                }
                const secret = response.password + '-' + response.created_at.getTime()
                const token = jwt.sign(payload, secret)
                const link = "<a href=`/resetpassword/` + payload.id + '/' + token + " > `Reset Password</a>`

                const userData = {
                    from: "Enterprise Device <noreply@mg.mike-harley.tech>",
                    to: `${payload.email} <${payload.email}>`,
                    subject: "Password Reset",
                    text: `Hello ${payload.email},\n Your password reset link is below. \n This is a one time only link good for 1 hour.\n`
                    , html: `<a href="https://enterprise-devices-testing.herokuapp.com/api/auth/password/resetpassword/` + payload.id + '/' + token + `">Reset password</a>`
                }
            await    sendPasswordReset.sendPasswordReset(userData)
             return    res.status(201).json('Email Sent')
            })
    } else {
        res.send('Email address is missing')
    }
})

/**
 * @api {get} /api/auth/password/resetpassword/:id/:token
 * @apiName Auth
 * @apiGroup Users

 * @apiSuccess {form} New_Password_Form Form for the user to update their password.
 */
router.get(`/resetpassword/:id/:token`, (req, res) => {
    const id = req.params.id
    const token = req.params.token
    db.findById(id)
        .then((response) => {
         
            const secret = response.password + '-' + response[0].created_at.getTime()
            const payload = jwt.decode(token, secret)
            res.send('<h1 style="text-align:center">New Password</h1>'+
                   '<form className="reset" action="https://enterprise-devices-testing.herokuapp.com/api/auth/password/resetpassword" method="POST">' +
                      '<input  name="id" type="hidden" value="' + response[0].id + '" />' +
                '<input type="hidden" name="token" value="' + req.params.token + '" />' +
                '<input style="margin-left:530px ; margin-top:250px;size:lg;width:20rem;height:2rem" type="password" name="password" value="" placeholder="Enter your new password..." />' +
                `<input  style="height:2rem" type="submit" value="Reset Password" />` +
                `</form>`);
        });
})

/** @api {post} /api/auth/password/resetpassword
@apiName Auth
@apiGroup Users

@apiSuccess {json} Updated_User_Object Send the user object back with the updated hashed password/
 */
router.post('/resetpassword', async (req, res) => {

    const id = req.body.id

    const password = req.body.password
    await db.findById(id)
        .then(async (response) => {

            const secret = response.password + '-' + response[0].created_at.getTime()
            const payload = jwt.decode(req.body.token, secret)

            const hash = bcrypt.hashSync(password, 10)
            const changes = { password: hash }
            const id = response[0].id
            await db.update(id, changes)
                .then((response) => {

                    return res.status(201).json({ message: 'Your Password Has Been Updated', data: response })
                })
                .catch(error => { res.status(400).json({ message: error.message, error: error }) })
        })
})
module.exports = router