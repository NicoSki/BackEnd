//1ro voy a definir las variables y metodos necesarios para proceder con el desafio:
const express = require("express");
const fs = require("fs");
const { Router } = express
const app = express();
const hbs = require("express-handlebars");
//en este caso no voy a utilizar dotenv
const PORT = 8080;

//PUNTO A)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//2do creo el array de los productos y utilizo las funciones del Router:
let todosLosProductos = new Router();

const productos = [];

todosLosProductos.get("/", (req, res) => {
    res.send(productos);
})



//3ro creo el html(index.html) el cual se va a reflejar el formulario de carga de los productos:
//luego defino la carpeta donde sa va a encontrar le mismo:
app.use(express.static("./Desafio5/public"));


//4to creo el metodo post para agregar los productos
app.post("/productos", (req, res) => {
    id = productos.length + 1
    let titulo = req.body.title
    let precio = req.body.price
    let urlImg = req.body.urlImg
    productos.push({ titulo, precio, urlImg });
    console.log(productos);
    //en este caso uso redirect ya que vuelvo al formulario
    res.redirect("/")
})

//como recomienda el desafio; voy a utilizar iconfinder para las url de las imagenes
//5to defino la ruta para que se pueda ejecutar la funcion post:
app.use("/productos", todosLosProductos);
//FIN PUNTO A



//PUNTO B)
//1ro creo las variables necesarias e instalo express-handlebars:
app.get("/producto", (req, res) => {
    res.render("index", {
        title: "Manzana Verde",
        price: 200,
        urlImg: "https://cdn3.iconfinder.com/data/icons/education-209/64/apple-fruit-science-school-128.png",
        algo: false
    });
})

//2ro agrego el engine
app.engine("handlebars", hbs.engine());

// //3to agrego los set
app.set("views", "./Desafio5/views/hbs");
app.set("view engine", "handlebars");

//4to creo la carpeta views, creo la carpeta llamada hbs y dentro de esa carpeta hbs creo otra llamada layouts y dentro de esa carpeta un archivo llamado main.handlebars
//5to voy al archivo main.handlebars y creo el html donde solo va a figurar el {{{body}}}
//6mo ahora en la carpeta hbs creo el index.handlebars y creo la tabla donde se van a volcar los productos



//llamo al servidor
app.listen(PORT, error => {
    console.log(`Servidor en http://localhost:${PORT}`);
    //console.log(app.get("views"));
})


//ELECCION FINAL:
//Particularmente eligiria EJS ya que da una gran dinamica a la hora de codear, por otro lado es sencillo para cualquier tipo de programador ya sea principiante o avanzado, su unica interferencia son los signos a la hora de entrelazar el codigo, pero con un poco de practica se soluciona