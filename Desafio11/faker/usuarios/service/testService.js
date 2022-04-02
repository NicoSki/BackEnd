const faker = require("faker");
faker.locale = "es";


class Testing {
    async getUser(cantidad) {
        try {
            let respuesta = [];
            for (let i = 0; i < cantidad; i++) {
                //esta seria la estructura de mi usuario
                const obj = {
                    nombre: faker.name.firstName(),
                    apellido: faker.name.lastName(),
                    id: faker.internet.email(),
                    img: faker.image.food()
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