let express = require("express");
let app = express();
let { config } = require("./config");
let serverRoutes = require("./routes");


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

serverRoutes(app);


app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
})

module.exports = app;

//EXPLICACIÓN
/*
Nuevamente voy a retomar el ejemplo de los usuarios donde se va a poder agregar,modificar y eliminar.
En este caso voy a usar MongoDB como base de datos.
Las pruebas las voy a hacer por medio de postman

*1-Creo las variables principales: entre ellas las carpetas routes,models,config,etc.
*2-En la carpeta components creo el controlador y el servicio donde se van a ejecutar sus respectivas funciones
*3-En la carpeta models creo la subcarpeta "db", donde se van a reflejar las funciones de mongoose, mientras que en 
* el archivo de DAO se van a ejecutar estas acciones
*4-En la carpeta config creo las instacias para que el servidor se pueda conectar al puerto y a la base de datos de mongo
*5 En la carpeta routes, defino la relacion entre el index principal y la conexion hacia todas las rutas del crud(components)
*6 en el archivo del dotenv se encuentra el puerto y la credencial de conexion a mi bd de mongo

    *TESTING*
*1-Creo una carpeta llamada test donde se va a almacenar los testings, creo el archivo mocha donde voy a crear sus funciones
*2-Creo los describe y los it para el get y el post, particularmente los resultados se van a ver por consola
*3-Para ver estos resultados, en el package.json, cambio el script "test" por la descripcion de "mocha test/usuarios.test.js"
*4-Ejecuto el comando npm test por consola y se me refleja tanto en la consola como sus respectivos cambios en la base de datos de mongo
*/


