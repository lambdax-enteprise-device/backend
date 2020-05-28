// Creds for mail api 
require('dotenv').config('/.env')
const mailgun = require('mailgun-js')
const DOMAIN = "support.enterprise-devices.com"
const api_key = process.env.MAILER_APIKEY
const mg = mailgun({apiKey:api_key,domain:DOMAIN});

/** This fuction is called in auth-router.signup after signup is accepted 
 *  It sends an email to the user welcoming them to the application
 *  The message can be changed in  /routes/auth/auth-router.userData */ 
function sendEmail(userData){
return mg.messages().send(userData,function (error,body){
    if (error) {console.log(error.messages)}
   return  console.log(body)
})
}
/** This function is called in auth-router/resetPassWord/reset-password.router
     It sends a one time password reset link to the user after node confirms the 
     user exists in the DB    */
function sendPasswordReset(userData){
    return mg.messages().send(userData,function (error,body){
        if (error) {console.log(error.message)}
        return console.log(body)
    })
}

module.exports = {sendEmail,sendPasswordReset}