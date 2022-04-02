let testingService = require("../service/testService");

class Testing {
    async test(req, res, next) {
        try {
            //en este caso voy a simular una cantidad de 5 usuarios
            let cantidad = 5

            let respuesta = await testingService.getProducts(cantidad);
            res.json(respuesta);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Testing();