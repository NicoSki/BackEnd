//Inicio el desafio declarando las variables principales del express
const express = require("express");
const app = express();
const ejs = require("ejs");
let serverRoutes = require("./routes");
const path = require("path");
let { Server: HttpServer } = require("http");
let { Server: SocketIO } = require("socket.io");
let productos = require("./faker/aleatorios/productos");
let usuarios = require("./faker/aleatorios/usuarios");
let { schema, normalize, denormalize } = require("normalizr")
let inspect = require("./utils/inspect");
const PORT = 8080;

//una vez creado la estructura del index principal, voy a crear la coneccion de zocket.io


/*--------------------------------------
               SOCKET.IO
---------------------------------------*/
//Variable que almacena los mensajes
let mensajes = [];

//lugo creo las variables para su funcionabilidad
let http = new HttpServer(app);
let io = new SocketIO(http);


//websocket
io.on("connection", socket => {
    /*--------------------
            CHAT
     ---------------------*/
    //este console log es para mostrar los usuarios que ingresan:
    console.log(`Ingreso un nuevo usuario`, socket.id);

    //emito los mensajes:
    socket.emit("init", mensajes)


    //recibo la info del main.js
    socket.on("respuesta_formulario", data => {
        //data en este caso va a ser el obj del msj
        console.log("desde index pricipal", data);
        mensajes.push(data)
        //para enviarlos a todos los usuarios que se conecten :
        io.sockets.emit("respuesta_formulario", mensajes);
    })



    /*--------------------
         TABLA DE PRODUCTOS
       ---------------------*/
    socket.emit("prod", productos)

});

//luego de crear el emit, creo la carpeta public y dentro de ella, una main.js y un index.html
//en el html voy a crear la estructura y en el Js la logica
//en este caso, la tabla va a ser fija y los elementos volcados van a ser generados por Faker
//el socketio se va a aplicar a la mensajeria

//----------------------------------------FIN SOCKET------------------------------------------


//Settings
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
serverRoutes(app);
app.use("/", require("./routes/index"));


/*--------------------------------------
               FAKER
---------------------------------------*/
//Con faker voy a hacer los 5 objetos aleatorios y los usuarios random

//Empiezo con los 5 productos:
//creo la carpeta faker y dentro dos carpetas con sus respectivos archivos(controllers/service)
//dentro de cada una declaro las variables y funciones que luego voy a utilizar
//luego creo el index(dentro de la carpeta faker) donde voy a concentrar y exprortar lo declarado en controllers y service
//luego creo la ruta en el archivo de routes para poder acceder a los productos creados
//todo funciona correctamente a la hora de acceder a la ruta /testing/test
//entonces creo los 5 productos y random en el archivo random.js de la carpeta aleatorios 

/*--------------------------------------
               NORMALIZR
---------------------------------------*/
//Ahora voy a crear el normalizr
//instalo normalizr y agrego la carpeta de utils, donde voy a declarar el inspect
//una vez declarado el inspect, voy a crearlo y agregar las variables de normalizr
//entonces, voy a nomalizar y desnormalizar a los autores:

//creo a los autores con sus mensajes:
const author = new schema.Entity('usuarios');

const organigrama = new schema.Entity('organigrama', {
    author: author,
});

// Normalizacion
let resultado_normalizado = normalize(usuarios, organigrama);
inspect(resultado_normalizado);
console.log("Longitud Normal", JSON.stringify(usuarios).length);
console.log("Longitud Normalizada", JSON.stringify(resultado_normalizado).length);

// Desnormalizacion
let resultado_desnormalizado = denormalize(resultado_normalizado.result, organigrama, resultado_normalizado.entities);
console.log("Longitud Desnormalizada", JSON.stringify(resultado_desnormalizado).length);
inspect(resultado_desnormalizado);



//llamo al servidor con la configuracion de socket:
http.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`)
});

