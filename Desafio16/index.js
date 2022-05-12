//Para iniciar con el desafio, declaro las variables principales para ejecutar node js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
let gzip = require("compression");
let con_Gzip = "Este archivo esta comprimido con gzip";
let sin_Gzip = "Este archivo no esta comprimido";
//Variables de PINO
const pino = require("pino");
const logger = pino({
    prettyPrint: {
        translateTime: "dd-mm-yyyy hh:mm",
        ignore: "pid,hostname"
    }
});
//Variables de log4js:
let logger4js = require("log4js");
logger4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        //warn
        chesee: { type: "file", filename: "warn.log" },
        //error
        chesee1: { type: "file", filename: "error.log" },
    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        archivo: { appenders: ["chesee"], level: "warn" },
        archivo1: { appenders: ["chesee1"], level: "error" }
    }
});


app.get("/info", (req, res) => {
    res.send((sin_Gzip).repeat(500));
    logger.info("Mensaje desde pino");
})

app.get("/infocomp", gzip(), (req, res) => {
    res.send((con_Gzip).repeat(500));
    logger.info("Mensaje desde pino");
})

//Ruta de pino:
app.get("/", (req, res) => {
    //prueba para corroborar que se muestre en el archivo de warn.log
    //const loggerConsola = logger4js.getLogger('archivo');
    try {
        logger.info("Mensaje desde pino");
        logger.warn("Advertencia desde pino");
        //prueba para corroborar que se muestre en el archivo de warn.log
        //loggerConsola.warn("Advertencia desde pino");

    } catch (error) {
        logger.error("Error desde pino");
    }
    //logger.fatal("Error fatal desde pino");
})


let isNum = num => !isNaN(num);
app.get("/suma", (req,res)=>{
    const loggerArchivo = logger4js.getLogger('archivo');
    const loggerArchivo1 = logger4js.getLogger('archivo1');
    try {
        let { a, b } = req.query;
        if (!a || !b) {
            loggerArchivo.warn("Ingrese el numero faltante");
            throw new Error("Ingrese el numero faltante");
        }

        if (!isNum(a) || !isNum(b)) {
            loggerArchivo.warn("El argumento debe ser un valor numerico");
            throw new Error("El argumento debe ser un valor numerico");
        }

        let sum = Number(a) + Number(b);

        logger.info(`El resultado de la suma es: ${sum}`);

        res.send(`${sum}`);

    } catch (error) {
        loggerArchivo1.error(JSON.stringify(error));
        res.send(JSON.stringify(error));
    }
})



app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`)
});

/*-------------------------
        EXPLICACIÓN
--------------------------*/
//1ro)Una vez creado las variables de node y llamado el servidor, intalo la libreria compression y creo dos get con la ruta info donde voy a mostrar las diferencias entre los bytes
//ahora creo le agrego la funcion gzip al 2do get para ver la diferencia
//voy a crear una carpeta llamada imagenes donde voy a mostrar los resutados para ser mas claro, en este caso añado a la carpeta imagenes, "conGzip" y "sinGzip" donde se ven los kB resources

//2do) Para el loggeo voy a utilizar la libreria PINO: instalo la libreria y creo sus variables donde voy a almacenar su logica:
//una vez creada las variables,creo una nueva ruta principal con un mensaje simple para corroborar que funcione creo un arhivo de .rest
//funciona, pero se ve feo, le agrego algunas condiciones para que se vea mejor a la variable logger:
//luego para las peticiones del usuario, le agrego el logger.info, en este caso a las 3 rutas del get: "/", "/info","/infocomp"
//en el caso del error, lo voy a pasar mas adelante cuando solicite unos datos por query

//3ro) Creo las funciones que me crean un archivo para cada aviso de pino:
//Para este apartado voy a usar la libreria Log4js:Creo sus variables y sus logicas:
//Al ejecutarlos en el .rest, se me crear los dos archivos declarados con la libreira log4js

//4to) para el perfilamiento del servidor voy a crear una nueva ruta llamada suma donde voy a requerir unos numeros y en base a lo ingresado por elusuario, me devuelve los distintos logs
//luego de crear la ruta de sumar, paso al --prof de node donde voy a crear la ruta bloqueante y la no bloqueante con un ciclo for que me devuelva una gran cantidad de numeros, para ello voy a crear un archivo llamado perfilamiento.js

//5to)instalo artillery y creo sus variables en el archivo de perfilamiento.js, entre ellas la que me define si es en modo fork o cluster
//luego creo una funcion que me denote los nucleos con sus pid
//ahora seteo el comando: node perfilamiento.js 8081 FORK
// y despues en una nueva terminal: artillery quick --count 50 -n 20 http://localhost:8081/info > fork.txt
//no adjunto una imagen ya que queda guardado el archivo fork.txt

//6to) Luego para el Autocannon y el 0x, procedo a instalarlos y a crear sus variables para su funcionamiento, todas estas variables/logicas se van a encontrar en perfilamiento.js
//el 0x lo voy a instalar de forma global
//luego modifico el script en el package.json
//ahora invoco la funcion run y le paso la ruta como parametro tanto para la ruta bloqueante como la no bloqueante
//luego abro dos nuevas terminales una de ellas la llamo autocannon y la otra auto_test
//en la terminal de autotest ejecuto el comando npm start y en la de autocannon el comando npm test
//entonces se me crea la carpeta 8104.0x donde voy a visualizar el gráfico de flama(adjunto una imagen en la carpeta con le resultado)




