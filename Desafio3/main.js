//1ro voy a agregar el package.json y el nodemon
//2do añado express para poder utilizarlo y luego creo algunas variables para sus futuros usos:
const express = require("express");
const fs = require("fs");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const app = express();
const PORT = 8085;


const server = app.listen(PORT, () => {
    console.log(`El servidor es on http://localhost:${PORT}`);
})

//le agrego un aviso en caso de algun error
server.on("error", (error) => { console.log(`Hubo un error en el servidor: ${error}`); })

//Ahora le voy a agregar algo significativo a la hora de ejecutarlo:
app.get("/", (request, response, next) => {
    response.send(`<h1 style="text-align:center">Desafio N° 3</h1>
    <ul>
    <li>Ruta A: /productos</li>
    <li>Ruta B: /productoRandom</li>
    <li>Ruta C: /actividad2</li>
    </ul>
    `);
})


//Punto 1)
//A) Creo la ruta y el array de productos:

const productos = [
    { nombre: 'regla', precio: 200, id: 1 },
    { nombre: 'compas', precio: 500, id: 2 },
    { nombre: 'globo', precio: 150, id: 3 },
    { nombre: 'lapiz', precio: 20, id: 4 },
    { nombre: 'goma', precio: 50, id: 5 },
    { nombre: 'taza', precio: 1150, id: 6 },
    { nombre: 'mouse', precio: 250, id: 7 },
    { nombre: 'cable', precio: 2000, id: 8 }
];

//creo una funcion que los pase a string:
const objToJson = JSON.stringify(productos);

app.get("/productos", (request, response, next) => {
    response.send(`Los productos son: <br><br> ${objToJson}`)
})


//B) creo la nueva ruta y una variable que devuelva un valor random del array declarado en el apartado A:

//creo la logica del objeto random:

function mostrarProducto() {
    let numeroRandom = Math.floor(Math.random() * productos.length);
    let prodRandom = productos[numeroRandom]
    //console.log(prodRandom)
    return JSON.stringify(prodRandom)
}

//lo llevo a la ruta:
app.get("/productoRandom", (request, response, next) => {
    mostrarProducto()
    const mostrar = mostrarProducto();
    response.send(`El producto Random ES: <br><br>${mostrar}`)
})
//puede ocurrir que se repitan los productos, probar actualizar varias veces


//Punto 2)
//1ro creo mi carpeta productos.txt de forma manual y  dentro le creo un array con algunos objetos(los del ejemplo del ppt):
//2do voy a crear una funcion que me traiga este array con los productos, voy a tener que usar fs, asi que creo su respectiva variable:

const productosDelArchivo = () => {
    const data = fs.readFileSync("./productos.txt", "utf-8")
    //let cambio = JSON.stringify(data)
    return data;
}

//3ro le agrego una nueva ruta para ver los productos:
app.get("/actividad2", (request, response) => {
    const prodArchivo = productosDelArchivo()
    response.send(prodArchivo);
})