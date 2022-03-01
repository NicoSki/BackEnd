//importo db del index
let { db } = require("./index");
//uso la libreria instalada
let knex = require("knex");

//creo la conexion 
let sqlite3 = knex({
    client: 'sqlite3',
    connection: {
        filename: "./mydb.sqlite"
    },
    pool: { min: 0, max: 7 }
});

//creo la clase de la base de datos
class BaseDatos {
    static client;
    constructor() {
        if (BaseDatos.client) {
            return BaseDatos.client;
        }
        BaseDatos.client = sqlite3;
        this.client = BaseDatos.client;
    }
}

//lo exporto:
module.exports = new BaseDatos().client;