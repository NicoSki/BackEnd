//Comienzo el desafio instalando passport y passport-facebook
//una vez instalado comienzo a declarar las variables:
const express = require("express");
const app = express();
const express_session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
let path = require("path");
const FACEBOOK_ID = "359103989508388";
const FACEBOOK_SECRET = "a4057167591f35168d9163219772e2b7";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//ahora creo el passport.use para y le declaro algunas funcionabilidades:
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_ID,
    clientSecret: FACEBOOK_SECRET,
    callbackURL:"http://localhost:8080/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate(profile.id, function (error, user) {
            if (error) { return done(error); }
            done(null, user)
        });
    }
));

//Ahora creo las rutas:
app.get("/auth/facebook", passport.authenticate("FacebookStrategy"));

app.get("/auth/facebook/callback",passport.authenticate("FacebookStrategy",{failureRedirect:"/login"}),
function(req,res){
    res.redirect("/mainPage");
})

//Luego de declarar las variables y funciones, voy a crear dos nuevos archivos en la carpeta de views, uno para ingresar a la app y otro para registrarse
