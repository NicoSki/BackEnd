require("dotenv").config();

//creo el objeto donde se refleja el puerto y la medida de desarrollo
let config = {
    dev: process.env.NODE_ENV !== "production",
    port: process.env.PORT
}

//creo el objeto de la base de datos
let db = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME
}

//los exporto
module.exports = { config, db }