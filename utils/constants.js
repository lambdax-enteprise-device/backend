const isProduction = process.env.DB_ENV === "production";

const sevenDayCookie = {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  secure: isProduction,
  httpOnly: true,
  sameSite: false
};

module.exports = sevenDayCookie;
