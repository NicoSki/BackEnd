//EJS
//en este caso voy a crear tanto el formulario como la tabla en el mismo sitio
//1ro instalo ejs y declaro las variables para su uso:
const express = require("express");
const app = express()
//le voy a cambiar el puerto para verificar su funcionamiento
const PORT = 8082;
let productos = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2do defino los set:
app.set("view engine", "ejs")
app.set("views", "./Desafio5/views/ejs");

//3ro en la carpeta views, creo la carpeta llamada ejs y dentro de esa carpeta creo otra llamada partial y
//dentro de la carpeta partial, creo 4 archivos: footer.ejs, header.ejs, formulario.ejs y tabla.ejs
//4to creo la carpeta index en la carpeta ejs y le defino los includes
//5to voy al archivo formulario.ejs y creo el formulario
//6to defino app.get:

app.get("/", (req, res) => {
    res.render("index", { productos });
})

app.post("/productos", (req, res) => {
    productos.push(req.body);
    res.redirect("/");
})

//7mo creo la tabla en tabla.ejs

//llamo al servidor:
app.listen(PORT, error => {
    console.log(`Servidor en http://localhost:${PORT}`);
})