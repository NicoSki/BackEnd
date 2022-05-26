let {Router} = require("express");
let info_usuarios = require("./controllers/usuarioController");

//aca es donde se me van a derivar todos los request

module.exports = app => {
    let router = new Router();

    app.use("/", router);
    router.get("/", (req,res)=>res.render("formulario"));
    router.post("/agregar",info_usuarios.user);
    router.get("/todos", info_usuarios.mostrar_usuarios);
}