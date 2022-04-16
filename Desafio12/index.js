//Inicio el desafio con las variables principales para el funcionamiento del servidor
const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const express_session = require("express-session");
const PORT = 8080;
<<<<<<< HEAD
// require("../Desafio13");
=======
>>>>>>> aad8c196a69872afdf09a23c0f301d300c36d416

//Luego de crear la estructura basica, agrego los middlewares y la carpeta public
//Settings
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express_session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
}));
app.engine('ejs', engine);
app.set("view engine", "ejs");

//Luego de crear el formulario de ingreso, voy a crear el inicio de la pag donde se va a encontrar la tabla de productos y el nombre del usuario
//luego voy a crear la carpeta routes para administrar las rutas y la carpeta views

//Luego de crear la el formualario y la tabla de los productos, voy a crear la logica en el pie del archivo en la seccion script

//Ahora voy a usar las propiedades de session para el logeo del usuario y almacenar una cantidad particular de info para poder mostrarla en las otras secciones:

//llamo a la base de datos atlas 
require("./database");
//luego de conectar la base de datos, voy a crear el modelo de los productos que se van a almacenar

//Routes
app.use("/", require("./routes/index"));

//llamo al servidor 
app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`)
});
