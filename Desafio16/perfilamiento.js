const express = require("express");
const app = express();
const PORT = 8081;
let cluster = require("cluster");
let numCPUs = require("os").cpus().lenght;
let modo_clusters = process.argv[2] == "CLUSTER";

app.get("/info", (req, res) => {
    let numeros = [];
    let num=0;
    for(let i=0;i<1000000;i++){
        num = i;
        numeros.push(num);
    }
    res.send(`El array de los numeros son: ${numeros}`);
})

/*------------------------------------
  TEST DE CARGA CON AUTOCANNON Y 0X
-------------------------------------*/
const autocannon = require("autocannon");
const {PassThrough} = require("stream");

function run (url){
    const buf=[];
    const outputStream = new PassThrough();

    const inst = autocannon({
        url,
        connections:100,
        duration:20
    });

    autocannon.track(inst, {outputStream})

    outputStream.on("data", data => buf.push(data))
    inst.on("data",function(){
        process.stdout.write(Buffer.concat(buf))
    });
}

console.log("Corriendo todos los benchmarks");

//Bloqueante:
app.get("/bloq", (req, res) => {
    let numeros = [];
    let num=0;
    for(let i=0;i<1000000;i++){
        num = i;
        numeros.push(num);
    }
    res.send(`El array de los numeros son: ${numeros}`);
})

//No Bloqueante:
app.get("/nobloq", (req, res) => {
    let numeros = [];
    let num=0;
    for(let i=0;i<1000000;i++){
        num = i;
        numeros.push(num);
    }
    res.send(`El array de los numeros son: ${numeros}`);
})



if (modo_clusters && cluster.isPrimary) {
    pino.info(`PID -> ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, a, b) => {
        pino.error(`Murió el subproceso ${worker.process.pid}`);
        cluster.fork();
    });

} else {
    app.listen(PORT, () => {
        console.log(`Server on port http://localhost:${PORT}`);
    })
}

run("http://localhost:8081/bloq");
run("http://localhost:8081/nobloq");