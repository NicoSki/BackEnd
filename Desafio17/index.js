const express = require("express");
const app = express();
let PORT = process.env.PORT || 8080;

//Middlewares
app.set("view engine", "ejs");


app.get("/", (req,res)=>{
    res.send("Usando HEROKU");
})

app.get("/num-random", (req,res)=>{
    res.render("random");
})

app.listen(PORT, () => {
    console.log(`Servidor en puerto http://localhost:${PORT}`);
})

// EXPLICACIÓN:
/*
Para el desafio voy a crear un proyecto basico, el fin de este desafio es el funcionamieto de HEROKU
1-Para iniciar, creo la estructura base de node
2-creo una ruta que me devuelva un numero random
3-luego creo mi cuenta en heroku y descarlo heroku GLI,luego verifico su versión.
4-Luego agrego heroku al proyecto con el comando "heroku login" y siguendo sus pasos, para corroborar que se añadio, utilizo el comando remote para verificarlo
en este caso me aparece conectado al de heroku y al de github
5-Despues le modifico el puerto agregandole process.env.PORT
6-Modifico el package.json en el apartado "start"
7-luego añado los cambios con el comando git add . (me guarda todos los cambios)
8-Le hago el commit y luego lo pusheo a heroku con "git push heroku master"
9-A la hora de pushear, se puede ver tanto en la consola como en el sitio de heroku, como se va subiendo el desafio
*/