const isProduction = process.env.DB_ENV === "production";

const sevenDayCookie = {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  secure: isProduction,
  httpOnly: true,
  sameSite: false
};
const localUrl = 'http://localhost:4545'
const stagingUrl = 'https://enterprise-devices-staging.herokuapp.com'
module.exports = {sevenDayCookie,localUrl,stagingUrl};
