let usuarioAPI = require("../components/usuario");

module.exports = app => {
    usuarioAPI(app);
    app.get("/",(req,res)=>{res.send("Ingresar a la url /usuario")});
}