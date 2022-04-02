const faker = require("faker");
faker.locale = "es";

let usuarios = [];

(async () => {
    try {
        for (let i = 0; i < 25; i++) {
            //esta seria la estructura de mi usuario
            const obj = {
                nombre: faker.name.firstName(),
                apellido: faker.name.lastName(),
                id:faker.internet.email(),
                img: faker.image.food()
            }
            usuarios.push(obj);
        }
        return usuarios;
    } catch (error) {
        console.log(error);
    }
})()

module.exports = usuarios;