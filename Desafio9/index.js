//para iniciar con el desafio voy a abrir una nueva terminal y voy a conectar con mongo:
//1ro en la 1er terminal pongo mongod --version
//2do en la misma terminal utilizo el comando mongod --dbpath "rutaDeLaBaseDeDatos"
//3ro entro al siguiente link para verificar el funcionamiento: http://localhost:27017/
//todo funciona correctamente

//4to agrego una 2da consola y comienzo con el desafio:
//5to en la 2da consola pogo el comando mongo para crear la conexion
//6to creo la base de datos ecommerce con el comando use ecommerce


/*------------------------- 
         CONSIGNAS
---------------------------*/

//1)Agrego los productos y los mesajes a la nueva base de datos con el siguiete comando:
//PRODUCTOS:
/*
db.productos.insertMany([
    {"nombre":"Remera", "precio":2000, "img":"#"},
    {"nombre":"Pantalon", "precio":2500, "img":"#"},
    {"nombre":"Buzo", "precio":1000, "img":"#"},
    {"nombre":"Zapatillas", "precio":5000, "img":"#"},
    {"nombre":"Gorra", "precio":1500, "img":"#"},
    {"nombre":"Lentes", "precio":500, "img":"#"},
    {"nombre":"Shots", "precio":900, "img":"#"},
    {"nombre":"Trajes de baño", "precio":3500, "img":"#"},
    {"nombre":"Medias", "precio":300, "img":"#"},
    {"nombre":"Guantes", "precio":700, "img":"#"},
])
*/
//para corroborar que se agregaron, uso el comando db.productos.find().pretty() y me muestra los produtos agregados recientemente

//MENSAJES:
/*
db.mensajes.insertMany([
    {"email":"DL@GMAIL.COM", "message":"Hola a todos"},
    {"email":"PD@GMAIL.COM", "message":"Como andan?"},
    {"email":"JE@GMAIL.COM", "message":"Saludos desde Argentina"},
    {"email":"OB@GMAIL.COM", "message":"Aguante Messi"},
    {"email":"LP@GMAIL.COM", "message":"Hicieron el desafio?"},
    {"email":"NS@GMAIL.COM", "message":"Estoy usando Mongo"},
    {"email":"MJ@GMAIL.COM", "message":"Los comandos son re dinamicos"},
    {"email":"HS@GMAIL.COM", "message":"Me pasan el link del zoom"},
    {"email":"SA@GMAIL.COM", "message":"La clave de acceso es 1234"},
    {"email":"FT@GMAIL.COM", "message":"Me agregan al grupo de wpp?"},  
])
*/
//para corroborar que se agregaron, uso el comando db.mensajes.find().pretty() y me muestra los produtos agregados recientemente


//2)En el caso del punto 2 ya fue establecido al crear el array

//3)Este paso se realiza con los siguientes comandos:
//db.productos.find().pretty()
//db.mensajes.find().pretty()

//4)Este paso se realiza con los siguientes comandos:
//db.productos.find().length()
//db.mensajes.find().length()
//en si la respuesta va a ser 10 que son los objetos agregados

//5)
//A)El comando que voy a utilizar para este paso es db.productos.insertOne({"nombre":"Bufanda", "precio":2780, "img":"#"})
//para verificarlo, vuelvo a mostrar los productos con el comando del punto 3

//B)Para estos pasos comienzo a utilizar los filtros que ofrece mongo
// I)el comando para este caso es: db.productos.find({"precio":{$lt:1000}}) 
// II)el comando para este caso es:  db.productos.find({$and:[{"precio":{$gte:1000}},{"precio":{$lte:3000}}]})
// III)el comando para este caso es: db.productos.find({"precio":{$gt:3000}})
// IV)el comando para este caso es: db.productos.find().sort({"precio":1}).skip(2).limit(1).map(e => e.nombre)


//C)el comando para este caso es: db.productos.updateMany({},{$set:{"stock":100}})

//D)el comando para este caso es: db.productos.updateMany({"precio":{$gt:4000}},{$set:{"stock":0}})

//E)el comando para este caso es: db.productos.remove({"precio":{$lt:1000}})

//6)Creo el usuario pepe por medio del siguiente comando:
// db.createUser({user:"pepe",pwd: "asd456",roles:[{role:"read",db:"ecommerce"}]})