//PUG
//1ro declaro algunas variables e instalo pug
const express = require("express");
const app = express();
//en este caso lo voy a cambiar para ver su funcionamiento
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2do creo los set
app.set("views", "./Desafio5/views/pug");
app.set("view engine", "pug");

//3ro creo el get
app.get("/", (req, res) => {
    //al utilizar los query, voy a definirlos en el objeto:
    //creo el destructuing:
    let { title, price, urlImg } = req.query
    res.render("index", req.query);
})

//4to creo la carpeta pug y dentro de ella un archivo llamado index.pug
//5to en el archivo index.pug creo la tabla
//6to vuelvo al app.get, en este caso lo voy a a hacer mediante query 
//llamo al servidor
app.listen(PORT, error => {
    console.log(`Servidor en http://localhost:${PORT}`);
})


//Ejemplo de url de prueba:
//http://localhost:8081/?title=%22gorro%22&price=%221500%22&urlImg=%22https://cdn3.iconfinder.com/data/icons/education-209/64/graduation-square-academic-cap-school-128.png%22