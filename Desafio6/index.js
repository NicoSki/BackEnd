//Como ya tengo las librerias descargadas, solo voy a crear las variables necesarias:
// y agrego websocket
//Lo que se reflaja en este archivo hace referencia al servidor

const express = require("express");
let app = express();
let path = require("path");
let moment = require("moment");
let { Server: HttpServer } = require("http");
let { Server: SocketIO } = require("socket.io");
let { config } = require("./config");
let db_knex = require("./config/baseDeDatos");
let db_knex1 = require("./config/dataBase");
let cors = require("cors");
let PORT = config.port;

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
        //mensajeria.push({ ...data, id: socket.id, date: moment().format("DD/MM/YYYY HH:mm:ss") });
        mensajeria.push(data)
        console.log("Desde el Servidor", data);
        io.sockets.emit("desde_servidor", mensajeria)
        Agregar1()
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
        console.log("Los productos son", prod);
        Agregar()   
    })

})

//ahora voy a pasar a la tabla de la seccion de la izquierda, donde voy a una logica parecida a la de la seccion derecha, voy al index.ejs



/*--------------------------------
             DESAFIO 8
--------------------------------*/
//Para el desafio 8 voy a reutilizar mi codigo, con la diferencias que le voy a a gregar algunas cosas:
//1ro le agrego algunas variables nuevos: db_knex, cors y config
//2do creo el archivo ".env" y le declaro las caracteristicas de la base de datos:
//3ro creo la carpeta config y dentro el archivo index.js donde voy a dotenv y relacionar los datos del archivo .env
//4to dentro de la carpeta config, creo un archivo de la base de datos llamado baseDeDatos.js, donde voy a traer toda la info del index.js y usar la libreria knex
//modifico el PORT
//5to creo el middleware y settings:
app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ahora comienzo con el desafio:

/*--------------------------
      Tabla de productos
---------------------------*/
//para iniciar con la tabla de productos, voy a crear una funcion autoinvocada:
(async () => {
    try {
        //ahora creo una variables y una funcion para que no se cree mas de una vez
        let tablaExistente = await db_knex.schema.hasTable("productos");
        if (!tablaExistente) {
            await db_knex.schema.createTable("productos", table => {
                table.increments("id").primary(),
                    table.string("name"),
                    table.float("price"),
                    table.string("img")
            });
        } else {
            console.log("La tabla ya existe");
        }
    } catch (error) {
        console.log(error);
    }
})();
//inicio el servidor y me creo la tabla

//ahora voy a crear la funcion para que me agregue los datos a la db:
async function Agregar() {
        try {
                let response = await db_knex.from("productos").insert(prod);
                console.log("se agrego",response);
        } catch (error) {
            console.log(error);
        }
    };
//la llevo dentro del socket.on de productos


/*--------------------------
           Mensajes
---------------------------*/
//antes de crear la funcion autoinvocada, voy a crear una base de datos dentro de config llamada dabase.js, la cual es con sqlite3
//despues instalo sqlite3

//ahora creo la funcion autoinvocada:
(async () => {
    try {
        //ahora creo una variables y una funcion para que no se cree mas de una vez
        let tablaExistente = await db_knex1.schema.hasTable("mensajes");
        if (!tablaExistente) {
            await db_knex1.schema.createTable("mensajes", table => {
                table.increments("id").primary(),
                    table.string("email"),
                    table.string("message")
            });
        } else {
            console.log("La tabla ya existe");
        }
    } catch (error) {
        console.log(error);
    }
})();
//como veo que funciona, ahora le creo la funcion de agregar los mensajes
async function Agregar1() {
    try {
            let response = await db_knex1.from("mensajes").insert(mensajeria);
            console.log("se agrego el mensaje",response);
    } catch (error) {
        console.log(error);
    }
};

//todo funciona asi que aqui termina el desafio




//llamo al servidor:
http.listen(PORT, error => {
    console.log(`Server on http://localhost:${PORT}`);
})