require("dotenv").config();

let config = {
    port: process.env.PORT
}

let mongoDB = {
    mongo_db: process.env.MONGO_DB 
}

module.exports = { config, mongoDB };