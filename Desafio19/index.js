//Para comenzar con el desafio, creo la estructura basica del servidor
let express = require("express");
let app = express();
let { config } = require("./config");
let serverRoutes = require("./routes");

app.set("view engine", "ejs");


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

serverRoutes(app);


app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
})

/*--------------------------------
            EXPLICACIÓN
----------------------------------*/
//1ero una vez declarado las variables iniciales del index principal, voy a crear la carpeta config donde voy a
//integrar el puerto y la base de datos(mongoDB) y creo el archivo de dotenv

//2do creo la carpeta components con el controlador, el servicio y su index

//3ro creo la carpeta routes con su index donde voy a pasar lo declarado en components

//4to creo la carpeta model donde voy creo el modelo con el que se van a almacenar los usuarios en la base de datos
//por otra parte en su interior creo la carpeta db y dentro mongo.js y luego el archivo daos, agrego sus datos en el
//archivo de config

//5to una vez establecida la conexion con las base de datos y declarado los procesos,controladores, logica de negocios,
//agrego los logger en caso de que el usuario no complete algun campo del formulario

//6to creo la carpeta utils donde voy a integrar la libreria PINO y luego las voy a exportar a al service
