require("dotenv").config();

module.exports = {
    development: {
        user: "johpynptvrndwg",
        password: "f4c64a3bda58d4c54660e081da73c847dd229fb7c8939be15e34594705134aa4",
        database: "dms68l6dhvv7c",
        port: 5432,
        host: "ec2-34-231-221-151.compute-1.amazonaws.com",
        dialect: "postgres",
        // user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_DATABASE,
        // port: process.env.DB_PORT,
        // host: process.env.DB_HOST,
        // dialect: "postgres",
    },
    test: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    production: {
        user: "johpynptvrndwg",
        password: "f4c64a3bda58d4c54660e081da73c847dd229fb7c8939be15e34594705134aa4",
        database: "dms68l6dhvv7c",
        port: 5432,
        host: "ec2-34-231-221-151.compute-1.amazonaws.com",
        dialect: "postgres",
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        use_env_variable: "DATABASE_URL",
    },
};