const router = require("express").Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const db = require('../../../data-models/users/users-model')
const jwtSecret = require('../../../utils/secrets')
const bcrypt = require('bcrypt')
const mg = require('mailgun-js')
const sendPasswordReset = require('../../../mailer/mailer')
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/forgotpassword', (req, res) => {
    res.send(`<form action="/passwordreset" method="POST">` +
        `<input type="email" name="email" value="" placeholder="Enter Your Email Address..."/>` +
        `<input type="submit" value="Reset Password" />` +
        `</form>`)
})


router.post('/passwordreset', (req, res) => {

    if (req.body.email !== undefined) {
        const emailAddress = req.body.email
        db.findByEmail(emailAddress)
            .then((response) => {
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
                    , html: `<a href="http://localhost:4545/api/auth/password/resetpassword/` + payload.id + '/' + token + `">Reset password</a>`
                }
                sendPasswordReset(userData)
                res.status(201).json('Email Sent')
            })
    } else {
        res.send('Email address is missing')
    }
})
router.get(`/resetpassword/:id/:token`, (req, res) => {
    const id = req.params.id
    const token = req.params.token
    db.findById(id)
        .then((response) => {
            console.log(response)
            const secret = response.password + '-' + response.created_at.getTime()
            const payload = jwt.decode(token, secret)
            res.send('<form action="/api/auth/password/resetpassword" method="POST">' +
                '<input type="hidden" name="id" value="' + response.id + '" />' +
                '<input type="hidden" name="token" value="' + req.params.token + '" />' +
                '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
                `<input type="submit" value="Reset Password" />` +
                `</form>`);
        });
})
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