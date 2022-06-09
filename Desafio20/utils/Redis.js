let redis = require("redis");

class Redis {
    static connect;

    constructor() {
        if (Redis.connect) {
            return Redis.connect;
        }
        this.client = redis.createClient({
            host: "127.0.0.1",
            port: 6380
        });
        Redis.connect = this.client;
        this.connect();
    }

    connect() {
        this.events();
        this.client.connect();
    }

    events() {
        this.client.on("connect", async () => {
            console.log("Sirviendo el Redis!");
        });

        this.client.on("error", async () => {
            console.log("Error de coneccion en Redis!");
        });
    }
}

module.exports = new Redis();