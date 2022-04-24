//Declaro las variables necesarias para proceder con el desafio
require("dotenv").config();
const express = require("express");
const app = express();
const express_session = require("express-session");
const passport = require("passport");
const path=require("path");
require("../Desafio12/database");
const User = require("../Desafio12/models/productos");
const FacebookStrategy = require('passport-facebook').Strategy;
const { fork } = require("child_process");
const PORT = 8080;
let users = [];

app.set("view engine", "ejs");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express_session({
    secret: "Clase13",
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//Luego creo la estrategia para vincularme con facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);

        process.nextTick(function () {
            User.findOne({ "user_id": profile.id }, function (error, user) {
                if (error) {
                    return done(error);
                }

                if (user) {
                    console.log("El usuario encontrado es", user);
                    return done(null, user);
                } else {
                    let data_user = {
                        user_id: profile.id,
                        email: profile.emails[0].value,
                        name: profile.name.givenName + ' ' + profile.name.familyName,
                        pic: profile.photos[0].value
                    }

                    const new_user = User(data_user);
                    new_user.save(function (error) {
                        if (error) {
                            throw error;
                        } else {
                            return done(null, new_user);
                        }
                    })
                }
            })
        })
    }
));




//ahora defino las rutas
app.get("/", (req, res) => {
    res.render("ingresar")
})

app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email,user_photos" }))
app.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/main",
    failureRedirect: "/falied"
}));

//declaro la funcion para determianr si el usuario esta logeado o no
let isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/");
    }
}

app.get("/main", isAuth, (req, res) => {
    console.log(req.user);
    res.render("main", { usuario: req.user })
})



app.get("/falied", (req, res) => {
    res.send("No pudiste entrar")
})

app.get("/registro", (req, res) => {
    res.render("registro")
})

//serealizar/deserealizar
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (error, user) {
        done(error, user);
    });
});

//luego de plantear toda la logica, voy a la carpeta del desafio 12 y agrego el schema de los usuarios para luego agregarlos a la db de mongo atlas
//Creo el views donde voy a mostrar la info del usuario logeado con facebook

/*------------------------------
             DESAFIO 14:
--------------------------------*/
//1ro creo la variable del fork
//2do creo la conexion a la ruta
app.get("/api/randoms", (req, res) => {
    let { cant } = req.query;

    //en caso de que el cant no este definido o que su valor sea negativo
    if (!cant || cant < 0) {
        cant = 100000000
    } else {
        cant
    }

    //opero con el child.js
    const child = fork("child.js");
    child.send(cant)

    child.on("message", (msg) => {
        console.log("info de los msg", msg);
        res.render("random", { num: msg.numeros })
        //numeros.push(msg.numeros);
    })

    child.on("exit", (code) => {
        console.log("El hijo finalizo", code);
    })

});

//Luego confirmo el funcionamiento creando la ruta:
//http://localhost:8080/api/randoms?cant=50000000000
//y la ruta http://localhost:8080/api/randoms?cant=55
//En donde el query de cant=55 se ejecuta sin problemas


//creo info:
app.get("/info", (req, res) => {
    let pid = process.pid
    let path= __dirname
    res.render("info", {camino:path, pid:pid})
})

/*------------------------------
         FIN DESAFIO 14:
--------------------------------*/

//logout
app.get("/logout", (req, res) => {
    let { name } = req.user
    req.session.destroy(err => {
        if (!err) res.send(`<h1 style="text-align: center;color: blue;">Hasta Luego ${name}</h1>`)
        else res.send({ status: "Error al querer salir", body: err })
    })
})

//llamo al servidor
app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`)
});