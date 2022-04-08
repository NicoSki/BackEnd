const express = require("express");
const router = express.Router();
const Prod = require("../models/productos");

/*-----------------------
   INICIO DE SERVIDOR
------------------------*/
router.post("/createUser", (req, res) => {
    let { userName } = req.body
    req.session.nombre_usuario = userName;
    res.redirect("/mainPage");
})


/*-----------------------
ACCESO A LA PAG PRINCIPAL
------------------------*/
router.get("/mainPage", (req, res) => {
    let userName = req.session.nombre_usuario;
    //delete req.session.nombre_usuario;
    res.render("mainPage", { userName });
})

//Formulario de productos:
router.post("/createProducto", async(req, res) => {
    let producto = req.body;
    //console.log(producto);
    const newProducto = new Prod(producto);
    await newProducto.save();
    res.redirect("mainPage");
})


/*-----------------------
          LOGOUT
------------------------*/
router.get("/logout", (req, res) => {
    let userName = req.session.nombre_usuario;
    req.session.destroy(err => {
        if (!err) res.send(`<h1 style="text-align: center;color: blue;">Hasta Luego ${userName}</h1>`)
        else res.send({ status: "Error al querer salir", body: err })
    })
})

module.exports = router;