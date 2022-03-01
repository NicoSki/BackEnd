//importo db del index
let { db } = require("./index");
//uso la libreria instalada
let knex = require("knex");

//creo la conexion con el cliente mediante el host
let mysql = knex({
    client: 'mysql',
    connection: {
        ...db
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
        BaseDatos.client = mysql;
        this.client = BaseDatos.client;
    }
}

//lo exporto:
module.exports = new BaseDatos().client;