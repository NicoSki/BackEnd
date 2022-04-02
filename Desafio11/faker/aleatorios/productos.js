const faker = require("faker");
faker.locale = "es";

let productos = [];

(async () => {
    try {
        for (let i = 0; i < 5; i++) {
            //esta seria la estructura de mi usuario
            const obj = {
                nombre: faker.commerce.productMaterial(),
                precio: faker.commerce.price(100, 500, 0, "$"),
                img: faker.image.food()
            }
            productos.push(obj);
        }
        return productos;
    } catch (error) {
        console.log(error);
    }
})()

module.exports = productos;
