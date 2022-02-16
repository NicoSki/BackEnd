require("dotenv").config();

let config = {
    port: process.env.PORT || 8080,
    class: process.env.CLASE
}

let sockets = {

}

module.exports = { config, sockets }