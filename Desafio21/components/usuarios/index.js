let {Router} = require("express");
let usuarios = require("./controllers/usuarioController");

module.exports = app => {
    let router = new Router();

    app.use("/", router);
    router.get("/", (req,res)=>res.send("Todo en orden"));
    //*CRUD
    router.post("/agregar", usuarios.crear_usuario);
    router.get("/usuarios", usuarios.mostrar_usuarios);
    router.post("/eliminar/:id", usuarios.eliminar_usuario);
    router.post("/editar/:id", usuarios.editar_usuario);
}