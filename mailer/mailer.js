require('dotenv').config('/.env')
const mailgun = require('mailgun-js')
const DOMAIN = "mg.mike-harley.tech"
const api_key = process.env.MAILER_APIKEY
const mg = mailgun({apiKey:api_key,domain:DOMAIN});


function sendEmail(userData){
return mg.messages().send(userData,function (error,body){
    if (error) {console.log(error.messages)}
   return  console.log(body)
})
}

module.exports = sendEmail