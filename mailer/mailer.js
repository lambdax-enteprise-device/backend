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
/** This function is called when a new user signs up before the welcome email is sent. 
 * This function verifies that the email belongs to the user and that the user actually signed up for the account. 
 * We will create the user with an isVerified attribute set to false. As long as that is false the user will not be able to login.
 * We send a link with an embedded jwt to the email address. The user clicks on the link and if the secret key and user id match the
 * isVerified changes to true and the user is able to login.
 * */
function sendIsVerifiedEmail(userdata){
    return mg.messages().send(userdata,function( error, body){
        if(error) {console.log(error.message)}
        return body 
    } )
}

module.exports = {sendEmail,sendPasswordReset,sendIsVerifiedEmail}