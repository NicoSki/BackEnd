let express = require("express");
let app = express();
let { config } = require("./config");
let serverRoutes = require("./routes");
let responseTime = require("response-time");


//este middleware me muestra el tiempo de ejecución del request
app.use(responseTime());

serverRoutes(app);


app.listen(config.port, () => {
    console.log(`Server on http://localhost:${config.port}`);
})


//EXPLICACIÓN
/*
1ro creo las variables para poder iniciar el servidor, luego sus middlewares y el listen
2do creo la carpeta config con su respectivo index donde declaro el puerto(creo el archivo .env)
3ro creo la carpeta components con el usuario(recopilando las funciones de la entrega anterior solo que adaptandolas a las estructuras de dao y factory)
4to creo las carpetas de controller y service dentro de components con sus respectivas logicas y tmbn su index que luego lo exporto a la carpeta de routes
5to a diferencia del desafio anterior, este lo voy a hacer por medio de los comandos de la consola, para ello uso process.argv
6to creo la carpeta models donde voy a crear la logica del DAO
7mo creo la carpeta utils donde voy a añadir el singleton que me va a marcar cuando cree el usuario
*/