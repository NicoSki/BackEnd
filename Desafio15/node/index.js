//Por una cuestion de organización, voy a volver a crear mi proyecto en la carpeta de Desafio15
//Declaro las variables principales
const express = require("express");
const app = express();
let PORT = process.env.PORT || 8081;
let cluster = require("cluster");

//Middleware
app.set("view engine", "ejs");


//PASO 1: creo algunas variables y funciones para lo detallado en "EXPLICACIÓN":
let args = process.argv.slice(2);
let num = num => !isNaN(num);
if (args.length > 0) {
    if (num(args[0])) PORT = Number(args[0]);
}
//Luego creo las rutas con un if para que me lleve a un servidor o al otro, a modo de ejemplo platie un json que lo diferencie
//Tambien creo un archivo .ret para verificar lo planteado

//PASO 2: Creo la variable de los procesadores/nucleos
let num_cpu = require("os").cpus().length;

//Rutas
if (PORT == 8081) {
    app.get("/api/randoms", (req, res) => {
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
        // process.exit();
    })
} else {
    app.get("/api/randoms", (req, res) => {
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



//5to agrego la funcion que me devuelve los pid y cuando muere y se inicia un nuevo proceso
if (cluster.isMaster) {
    console.log(`Master PID --> ${process.pid}`);

    //WORKERS
    for (let i = 0; i < num_cpu; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Murio el subproceso ${worker.process.pid}`);
        cluster.fork();
    });
} else {
    app.listen(PORT, () => {
        console.log(`Servidor en puerto http://localhost:${PORT} || Worker: ${process.pid}`);
    })
}

//EJECUTAR SERVIDORES NODE
/*--------------------------------------
            EXPLICACIÓN
--------------------------------------*/
//1ro creo una funcion que determine la funcionabilidad: Por defecto(FORK, en puerto 8081) o la secundaria(CLUSTER,en el puerto pasado por parametro),
//esto se va a decidir a la hora de pasar el parametro del puerto por la terminal

//2do creo la carpeta views y dentro de ella un archivo de info.ejs donde voy a mostrar el cuadro de la clase pasada + lo que solicita la consigna
//luego modifico las rutas, renderizando el archivo y le paso los procesadores(creo la variable num_cpu)
//Ya sea con el comando de node o nodemon, ambos puertos funcionan correctamente

//3ro ahora le incorporo forever, instalo su dependencia global, para mayor orden y que el index no quede tan saturado,
// voy a crear un archivo llamado forev.js donde voy a mostrar la logica

//4to luego de finalizar con forever, paso a pm2, voy a reutilizar el codigo declarado en el archivo forev.js

//5to para finalizar la primera parte de las consignas, voy a agregarle las finalizaciones de los procesos tanto en fork como en cluster
//esto lo voy a agregar en el index.js

//Nuevamente todo funciona con normalidad
/*--------------------------------------
            FIN EXPLICACIÓN
--------------------------------------*/


//SERVIDOR NGINX
/*--------------------------------------
            EXPLICACIÓN
--------------------------------------*/
//1ro inserto la carpeta de nginx
//2do creo una carpeta llamado node donde se va a almacenar todo lo declarado hasta el momento
//3ro modifico algunas cosas del nginx.conf
//4to accedo a la carpeta de nginx e ingreso en la terminal el comando: tasklist /fi "imagename eq nginx.exe"
//5to dentro de la carpeta de node, creo una carpeta de public y creo un index.html figurativo
//6to cambio las rutas de los get a /api/randoms y les anulo los exit
//7mo abro dos nuevas terminales y accedo a la carpeta node, donde voy a ejecutar ambos procesos

//En resumen, los comandos utilizados para esta ultima parte del desafio fueron los sig:
//*tasklist /fi "imagename eq nginx.exe"
//*pm2 start forev.js --name="ConFork"
//Antes de ejectutar este, cambiar el port por uno diferente al 8081
//*pm2 start forev.js --name="Con_Cluster" -i max
//*pm2 logs

/*--------------------------------------
            FIN EXPLICACIÓN
--------------------------------------*/