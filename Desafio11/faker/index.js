let { Router } = require("express");
let router_faker = new Router();
let testController = require("./productos/controllers/testController");

module.exports = app => {
    app.use("/testing", router_faker);
    //esta ruta es para comprobar que se hayan creado los 5 productos
    router_faker.get("/test", testController.test);
}