let { Router } = require("express");
let usuarioController = require("./controller/usuarioController");

module.exports = app => {
    let router = new Router();
    app.use("/usuarios", router);
  
    //Ruta del CRUD
    router.get("/agregar", usuarioController.agregar);
    router.get("/mostrar", usuarioController.mostrar);
}