require("dotenv").config();

module.exports = {
    development: {
        username: "hgxcubhryniish",
        password: "8183d0f59db68e73736052f71caeb382315b29ecc09f2372a6d2bd1b7b06a1c7",
        database: "dcj58732otq7ms",
        port: 5432,
        host: "ec2-3-226-163-72.compute-1.amazonaws.com",
        dialect: "postgres",

        // username: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_DATABASE,
        // port: process.env.DB_PORT,
        // host: process.env.DB_HOST,
        // dialect: "postgres",
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    production: {
        username: "hgxcubhryniish",
        password: "8183d0f59db68e73736052f71caeb382315b29ecc09f2372a6d2bd1b7b06a1c7",
        database: "dcj58732otq7ms",
        port: 5432,
        host: "ec2-3-226-163-72.compute-1.amazonaws.com",
        // username: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_DATABASE,
        // port: process.env.DB_PORT,
        // host: process.env.DB_HOST,
        dialect: "postgres",
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};