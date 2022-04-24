//muestro el child creado con su id
console.log("Hijo creado", process.pid);

//creo el procesos que va a escuchar el child
process.on("message", (num) => {
    const resultados = random(num)
    //envio los resultados
    process.send(resultados);

    //Finalizo el child
    setTimeout(process.exit, 2000)
})

//creo la funcion que me devuelve el numero aleatorio con sus caracteristicas
function random(number) {
    let numeros = [];
    //creo el numero random
    function generador_random(min, max) {
        min = 0
        max = 1000
        return Math.floor(Math.random() * max)
    }

    //creo que ciclo for que me devuelve la cantidad de numeros aleatorios solicitados por el usuario
    for (let i = 0; i < number; i++) {
        //En caso de que este repetido
        let rep = numeros.reduce((acc, numeros) => {
            acc[numeros.numero] = ++acc[numeros.numero] || 1;
            return acc;
        }, {});

//estructura del numero
        let numero = {
            numero: generador_random(0, 1000),
            orden: numeros.length + 1,
            repetido: rep[i] || 0
        }
        numeros.push(numero)
    }
    return {number, numeros }
}

