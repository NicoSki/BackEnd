//En este archivo voy a traer lo mismo que en el index, pero lo voy a utilizar por medio de forever:

const express = require("express");
const app = express();
let PORT = 8082;

//Middleware
app.set("view engine", "ejs");

let args = process.argv.slice(2);
let num = num => !isNaN(num);
if (args.length > 0) {
    if (num(args[0])) PORT = Number(args[0]);
}

let num_cpu = require("os").cpus().length;

//Rutas
if (PORT == 8081) {
    app.get("/", (req, res) => {
        // res.json({ response: `PORT:${PORT} , PID:${process.pid}`, servidor:"FORK"});
        let pid = process.pid
        let node = process.version
        let path = __dirname
        let plataforma = process.platform
        let memoria = process.memoryUsage().rss
        res.render("info", {
            camino: path,
            pid: pid,
            node: node,
            plataforma: plataforma,
            memoria: memoria,
            port: 8081,
            nucleos:num_cpu
        });
    })
} else {
    app.get("/", (req, res) => {
        // res.json({ response: `PORT:${PORT} , PID:${process.pid}`, servidor:"CLUSTER"});
        let pid = process.pid
        let node = process.version
        let path = __dirname
        let plataforma = process.platform
        let memoria = process.memoryUsage().rss
        res.render("info", {
            camino: path,
            pid: pid,
            node: node,
            plataforma: plataforma,
            memoria: memoria,
            port: 8082,
            nucleos:num_cpu
        });
    })
}


//Llamado al servidor
app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`);
});

/*--------------------------------------
            EXPLICACIÓN FOREVER
--------------------------------------*/
//1ro Voy a ir a la terminal de node y voy a ingresar a la carpeta de este proyecto:
//2do Ejecuto el codigo forever list
//3ro creo uno nuevo proceso por el comando: forever start forev.js y dsps forever list de nuevo para ver que se creo
//4to abro una pag en la web y pongo: localhost:8081 y me tiene que salir el render que le pase al get(me renderisa el fork)
//5to repito los pasos 3 y 4 pero para el puerto distinto al que viene por defecto
//6to una vez creado los dos procesos, solo resta seleccionar a cual ingresar, cambiando el puerto en la linea 5
/*--------------------------------------
            FIN EXPLICACIÓN
--------------------------------------*/

/*--------------------------------------
            EXPLICACIÓN PM2
--------------------------------------*/
//En este caso voy a ejecutar lo declarado en este archivo
//1ro instalo pm2 de forma global
//2do paso por consola el comando para FORK: pm2 start forev.js --name="ConFork" -- 8081 
//3ro En otra terminal paso por consola el comando para CLUSTER: pm2 start forev.js --name="Con_Cluster" -i max
//chequeo su funcionabilidad abriendo un nueva terminal y poniendo el comando pm2 logs
/*--------------------------------------
            FIN EXPLICACIÓN
--------------------------------------*/