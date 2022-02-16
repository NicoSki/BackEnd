//Como ya tengo las librerias descargadas, solo voy a crear las variables necesarias:
// y agrego websocket
//Lo que se reflaja en este archivo hace referencia al servidor

const express = require("express");
let app = express();
let path = require("path");
let moment = require("moment");
let { Server: HttpServer } = require("http");
let { Server: SocketIO } = require("socket.io");
const PORT = 3001;

//ahora creo la carpeta views donde voy a almacenar mi index.ejs

//agrego las variables del json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//creo los motores de busqueda, en este caso para la carpeta views:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//creo el get
app.get("/", (req, res) => {
    res.render("index", {});
})

//lugo creo las variables para su funcionabilidad
let http = new HttpServer(app);
let io = new SocketIO(http);


//ahora comienzo con el desafio, voy al index.ejs para crear el html:

//luego de crear el html, voy a seguir con el chat(seccion derecha)
//creo la coneccion y la parte del script en el index.ejs:
//creo un array donde se almacenan los mensajes:

//para los mensajes
let mensajeria = [];

//para los productos:
let prod = [];

io.on("connection", socket => {
    console.log("Se conecto un nuevo usuario:", socket.id);

    /*------------
      AREA DE CHAT
    -------------*/

    //creo la emit de la mensajeria
    socket.emit("init", mensajeria)

    //llamo y creo la funcion que agrega los mesajes al chat
    socket.on("desde_cliente", data => {
        mensajeria.push({ ...data, id: socket.id, date: moment().format("DD/MM/YYYY HH:mm:ss") });
        console.log("Desde el Servidor", data);
        io.sockets.emit("desde_servidor", mensajeria)
    })

    /*----------------
    TABLA DE PRODUCTOS
    ----------------*/
    //creo la emit de la tabla
    socket.emit("init1", prod)

    //agrego el socket.on:
    socket.on("tabla", data_prod => {
        //esto es para ver si funciona:
        //console.log(data_prod);
        //ahora vuelvo al index.ejs y creo la funcion on para volcar los productos
        //creo la funcion que agrega los productos a la tabla:
        prod.push(data_prod);
        io.sockets.emit("tabla", prod);
    })

})

//ahora voy a pasar a la tabla de la seccion de la izquierda, donde voy a una logica parecida a la de la seccion derecha, voy al index.ejs

//llamo al servidor:
http.listen(PORT, error => {
    console.log(`Server on http://localhost:${PORT}`);
})
