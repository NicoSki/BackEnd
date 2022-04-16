const express = require("express");
const express_session = require("express-session");
const app = express();

//Middlewares
app.use(express_session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Funcion getName:
const getName = req => req.session.name || "";

app.get("/con-session", (req,res)=>{
    let { name } = req.query;
    if (name) {
        req.session.name = name;
    }
    res.send(`<h1>Bienvenido ${getName(req)} a session con nodeJs, pasate por la pagina unas ${req.session.contador}</h1>`);
})

//salir de la session
app.get("/logout1", (req, res) => {
    let name = getName(req);
    req.session.destroy(err => {
        if (!err) res.send(`${name} Saliste Ok!`)
        else res.send({ status: "Error al querer salir", body: err })
    })
})