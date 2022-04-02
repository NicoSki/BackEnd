const faker = require("faker");
faker.locale = "es";


class Testing {
    async getProducts(cantidad) {
        try {
            let respuesta = [];
            for (let i = 0; i < cantidad; i++) {
                //esta seria la estructura de mi usuario
                const obj = {
                    nombre:faker.commerce.productMaterial(),
                    precio:faker.commerce.price(100,500,0,"$"),
                    img:faker.image.food()
                }
                respuesta.push(obj);
            }
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = new Testing();