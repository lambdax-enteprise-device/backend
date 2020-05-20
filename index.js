const dotenv = require("dotenv");

dotenv.config();

const server = require("./api/server.js");

const PORT = process.env.PORT || 4545;


server.listen(PORT, () => {
  console.log(`**** Server listening on port ${PORT}. ****`);
});
