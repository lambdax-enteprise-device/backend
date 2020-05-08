require("dotenv").config('./env');
// Update with your config settings.

module.exports = {
  // development: {
  //   client: "pg",
  //   connection: {
  //     database: process.env.DB_LOCAL,
  //     user: process.env.DB_LOCAL_USER,
  //     password: process.env.DB_LOCAL_PASSWORD
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     directory: "./data/migrations"
  //   },
  //   seeds: {
  //     directory: "./data/seeds"
  //   },
  //   useNullAsDefault: true
  // },
  testing: {
    client: "pg",
    connection: process.env.DB_DATEBASE,
    ssl:true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true
  },
  // production: {
  //   client: "pg",
  //   connection: process.env.DATABASE_URL,
  //   // || {
  //   //   database: process.env.DB,
  //   //   user: process.env.DB_USER,
  //   //   password: process.env.DB_PASSWORD
  //   // },
  //   migrations: {
  //     directory: "./data/migrations"
  //   },
  //   seeds: {
  //     directory: "./data/seeds"
  //   }
  // }
};
