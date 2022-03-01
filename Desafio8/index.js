//antes de comenzar con el desafio instalo algunas librerias: knex, cors, dotenv, mysql,better-sqlite3 y sqlite3
//comienzo declarando algunas variables:

//1ro creo el archivo ".env" y le declaro las caracteristicas de la base de datos:
//2do croe la carpeta config y dentro el archivo index.js donde voy a dotenv y relacionar los datos del archivo .env
//3ro dentro de la carpeta config, creo un archivo de la base de datos llamado baseDeDatos.js, donde voy a traer toda la info del index.js y usar la libreria knex

//4to creo mi nueva base de datos que se va a llamar desafio8, previamente iniciado xampp y Dbeaver

//5to creo las variables que voy a necesitar para relacionar los archivos/librerias creadas:
const express = require("express");
let { config } = require("./config");
let db_knex = require("./config/baseDeDatos");
let path = require("path");
let moment = require("moment");
let { Server: HttpServer } = require("http");
let { Server: SocketIO } = require("socket.io");
const ejs = require("ejs");
let cors = require("cors");
let app = express();
let PORT = config.port;

//6to creo el middleware y settings:
app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//7mo luego creo las variables para su funcionabilidad
let http = new HttpServer(app);
let io = new SocketIO(http);

//8vo los arrays donde se va a almacenar la info
//para los mensajes
let mensajeria = [];

//para los productos:
let prod = [];

//9no creo la coneccion
io.on("connection", socket => {
    console.log("Se conecto un nuevo usuario:", socket.id);

    /*------------
      AREA DE CHAT
    -------------*/

    //creo la emit de la mensajeria

    //socket.emit("init", mensajeria)

    //llamo y creo la funcion que agrega los mesajes al chat


    // socket.on("desde_cliente", data => {
    //     mensajeria.push({ ...data, id: socket.id, date: moment().format("DD/MM/YYYY HH:mm:ss") });
    //     console.log("Desde el Servidor", data);
    //     io.sockets.emit("desde_servidor", mensajeria)
    // })

    /*----------------
    TABLA DE PRODUCTOS
    ----------------*/
    //creo la emit de la tabla
    socket.emit("init1", prod)

    //agrego el socket.on:
    socket.on("tabla", data_prod => {
        //console.log(data_prod);
        //ahora vuelvo al index.ejs y creo la funcion on para volcar los productos
        //creo la funcion que agrega los productos a la tabla:
        prod.push(data_prod);
        io.sockets.emit("tabla", prod);
        console.log("Los productos son", prod);
    })

})



//ahora comienzo con el desafio:

/*--------------------------
      Tabla de productos
---------------------------*/
//para iniciar con la tabla de productos, voy a crear una funcion autoinvocada:
// (async () => {
//     try {
//         //ahora creo una variables y una funcion para que no se cree mas de una vez
//         let tablaExistente = await db_knex.schema.hasTable("productos");
//         if (!tablaExistente) {
//             await db_knex.schema.createTable("productos", table => {
//                 table.increments("id").primary(),
//                     table.string("name"),
//                     table.float("price"),
//                     table.string("img")
//             });
//         } else {
//             console.log("La tabla ya existe");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();
//inicio el servidor y me creo la tabla





   

// (async () => {
//     try {
//         if(prodDesafio6.prod.length > 0){
//             let response = await db_knex.from("productos").insert(prodDb);
//             console.log("se agrego",response);
//         }else{
//            console.log("No se agrego ningun producto");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();





//creo un get que me lleva a el formulario:
app.set("view engine", "ejs");


app.get("/", (req, res) => {
   res.render("index");
})


//llamo al servidor:
app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
})