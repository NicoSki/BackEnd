const mongoose = require("mongoose");
const { mongoDB } = require("./index");

let connection;

(async () => {
    try {
        connection = await mongoose.connect(mongoDB.mongo_db, { useNewUrlParser: true });
        console.log("La BD de mongo esta conectada");
    } catch (error) {
        console.log(error);
    }
})()

module.exports = { connection, mongoose };