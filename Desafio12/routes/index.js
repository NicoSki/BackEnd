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

// router.get("/registro",(req, res)=>{
//     res.render("registrarse")
// })

/*-----------------------
ACCESO A LA PAG PRINCIPAL
------------------------*/
router.get("/mainPage", async (req, res) => {
    let userName = req.session.nombre_usuario;
    let allProd = await Prod.find().sort({ date: "desc" });
    //delete req.session.nombre_usuario;
    res.render("mainPage", { userName, allProd });
})

//Formulario de productos:
router.post("/createProducto", (req, res) => {
    req.session.producto = req.body;
    const newProducto = Prod(req.body);
    newProducto.save()
        .then((data) => console.log("Tu producto se añadio de forma exitosa"))
        .catch((error) => console.log(error))
    res.redirect("mainPage")
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

/*------------------
TODOS LOS PRODUCTOS
-------------------*/
router.get("/allProductos", (req, res) => {
    Prod.find()
        .then((data) => console.log("Los productos son", data))
        .catch((error) => console.log(error))
})

module.exports = router;