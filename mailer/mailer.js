require('dotenv').config()
const mailgun = require('mailgun-js')
const DOMAIN = "sandbox8a329a5d78ff4cbf94fc98e636de2930.mailgun.org"
const api_key = ""
const mg = mailgun({apiKey:api_key,domain:DOMAIN});
const data = {
    from:"Node Test <test@sandbox8a329a5d78ff4cbf94fc98e636de2930.mailgun.org>",
    to:"Mike Harley <mharley12345@gmail.com>",
    subject:"Testing",
    text:"Just some testing text"
};
mg.messages().send(data,function (error,body){
    console.log(body)
})
