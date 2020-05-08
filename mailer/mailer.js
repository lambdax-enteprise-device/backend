// Creds for mail api 
require('dotenv').config('/.env')
const mailgun = require('mailgun-js')
const DOMAIN = "mg.mike-harley.tech"
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

module.exports = sendEmail