<<<<<<< HEAD
//1ro creo algunas variables que me van a ser utiles para el desarrollo del desafio
const express = require("express");
const { Router } = express
const app = express();
const PORT = 8085;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




/*======================================
            /api/productos
=======================================*/
//creo el array de los productos y utilizo las funciones del Router:
//Puntos a tener en cuenta: El array de productos comienza vacio, entonces va a convenir agregar un producto 1ero para poder utilizar las funciones
let todosLosProductos = new Router();

const productos = [];


todosLosProductos.get("/", (req, res) => {
    res.json(productos)
})






/*======================================
            /api/productos/:id
=======================================*/
//creo el get con los params que se van a pasar por la url:
//en este caso, no voy a usar el router
app.get("/api/productos/:id", (req, res) => {
    let { id } = req.params;
    let pos_real = Number(id) - 1
    let respuesta = null;

    if (Number(id) > productos.length) {
        respuesta = "Producto no encontrado"
    } else {
        respuesta = productos[pos_real]
    }

    res.json(respuesta)
})


/*======================================
            POST/PUT/DELETE
=======================================*/
//Para estos casos, voy a crear un html que contenga la funcion de agregar producto:
//en cuanto a los put y delete voy a crearlar ya que se ven por postman
//creo el html:
//luego creo la carpeta llamada public y le meto el html
//ahora creo la variable de la carpeta estatica para poder acceder al html
app.use(express.static("./Desafio4/public"));


//POST:

todosLosProductos.post("/", (req, res) => {
    id = productos.length + 1
    let titulo = req.body.title
    let precio = req.body.price
    productos.push({ titulo, precio, id });
    res.json({
        "title": titulo,
        "price": precio,
        "id": id
    })
})

//PUT
app.put("/api/productos/:id", (req, res) => {
    let { id } = req.params;
    let pos_final = Number(id) - 1;


    let prodMod = productos.splice(pos_final, 1, req.body)
    //en postman por ej:
    // {
    //     "title": "modificado",
    //     "price": "nuevo precio",
    //     "id": "mismo que el que quiero modificar"
    // }


    res.json({
        "anterior": prodMod,
        "actualizado": productos[pos_final]
    })
})


//DELETE
app.delete("/api/productos/:id", (req, res) => {
    let { id } = req.params;
    let pos_final = Number(id) - 1;
    let prodEliminado = productos.splice(pos_final, 1);

    res.json({
        "Eliminaste el elemento:": prodEliminado
    })
})


//defino la ruta para que se pueda ejecutar lo declarado previamente:
app.use("/api/productos", todosLosProductos);




//llamo al servidor
app.listen(PORT, () => {
    console.log(`El servidor es: http://localhost:${PORT}`);
=======
//1ro creo algunas variables que me van a ser utiles para el desarrollo del desafio
const express = require("express");
const { Router } = express
const app = express();
const PORT = 8085;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




/*======================================
            /api/productos
=======================================*/
//creo el array de los productos y utilizo las funciones del Router:
//Puntos a tener en cuenta: El array de productos comienza vacio, entonces va a convenir agregar un producto 1ero para poder utilizar las funciones
let todosLosProductos = new Router();

const productos = [];


todosLosProductos.get("/", (req, res) => {
    res.json(productos)
})






/*======================================
            /api/productos/:id
=======================================*/
//creo el get con los params que se van a pasar por la url:
//en este caso, no voy a usar el router
app.get("/api/productos/:id", (req, res) => {
    let { id } = req.params;
    let pos_real = Number(id) - 1
    let respuesta = null;

    if (Number(id) > productos.length) {
        respuesta = "Producto no encontrado"
    } else {
        respuesta = productos[pos_real]
    }

    res.json(respuesta)
})


/*======================================
            POST/PUT/DELETE
=======================================*/
//Para estos casos, voy a crear un html que contenga la funcion de agregar producto:
//en cuanto a los put y delete voy a crearlar ya que se ven por postman
//creo el html:
//luego creo la carpeta llamada public y le meto el html
//ahora creo la variable de la carpeta estatica para poder acceder al html
app.use(express.static("./Desafio4/public"));


//POST:

todosLosProductos.post("/", (req, res) => {
    id = productos.length + 1
    let titulo = req.body.title
    let precio = req.body.price
    productos.push({ titulo, precio, id });
    res.json({
        "title": titulo,
        "price": precio,
        "id": id
    })
})

//PUT
app.put("/api/productos/:id", (req, res) => {
    let { id } = req.params;
    let pos_final = Number(id) - 1;


    let prodMod = productos.splice(pos_final, 1, req.body)
    //en postman por ej:
    // {
    //     "title": "modificado",
    //     "price": "nuevo precio",
    //     "id": "mismo que el que quiero modificar"
    // }


    res.json({
        "anterior": prodMod,
        "actualizado": productos[pos_final]
    })
})


//DELETE
app.delete("/api/productos/:id", (req, res) => {
    let { id } = req.params;
    let pos_final = Number(id) - 1;
    let prodEliminado = productos.splice(pos_final, 1);

    res.json({
        "Eliminaste el elemento:": prodEliminado
    })
})


//defino la ruta para que se pueda ejecutar lo declarado previamente:
app.use("/api/productos", todosLosProductos);




//llamo al servidor
app.listen(PORT, () => {
    console.log(`El servidor es: http://localhost:${PORT}`);
>>>>>>> ed0f814d407be02630bc5388c1b5936cc6baab58
})