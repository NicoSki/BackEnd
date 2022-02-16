// //1ro creo las variables necesarias e instalo express-handlebars:
// const express = require("express");
// //nueva variable
// let { config } = require("./config");
// const hbs = require("express-handlebars");
// const app = express();
// const PORT = config.port;

// //2do creo el metodo get
// app.get("/", (req, res) => {
//     let data = {
// titulo: "naranja",
// precio: 200,
// urlImg: "https://cdn4.iconfinder.com/data/icons/fruits-and-veggies-2/242/fruits-and-veggies-icons_orange-128.png"
//     }
//     res.render("index", {productos});
// })

// //3ro agrego el engine
// app.engine("handlebars", hbs.engine());

// //4to agrego los set
// app.set("views","./views/hbs");
// app.set("view engine", "handlebars");

// //5to creo la carpeta views, creo la carpeta llamada hbs y dentro de esa carpeta hbs creo otra llamada layouts y dentro de esa carpeta un archivo llamado main.handlebars
// //6to voy al archivo main.handlebars y creo el html donde solo va a figurar el {{{body}}}
// //7mo ahora en la carpeta hbs creo el index.handlebars y creo la tabla donde se van a volcar los productos
// //8vo llamo al servidor

// app.listen(PORT, error => {
//     console.log(`Servidor en http://localhost:${PORT}`);
// })

// //creo la carpeta config y el archivo index.js
// //vuelvo al index.js punto B