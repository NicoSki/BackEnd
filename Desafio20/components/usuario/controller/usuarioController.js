let usuService = require("../services/usuarioService");
let minimist = require("minimist");
let Singleton = require("../../../utils/singleton");



class Usuario {

    async agregar(req, res) {
        try {
            let datos = minimist(process.argv.slice(2));

            let { nombre, apellido, edad } = datos;

            await usuService.agregar(datos.nombre, datos.apellido, datos.edad);

            res.json(`El usuario ${nombre} se añadio correctamente`);

        } catch (error) {
            //en este caso envio un log ya que el desafio no aclara nada sobre los errores
            console.log(error);
        }
    }

    async mostrar(req, res) {
        try {
            let datos = minimist(process.argv.slice(2));

                /*------------------
                       SINGLETON
                --------------------*/
            let singleton = new Singleton();

            let usuario_datos = await usuService.mostrar(datos);

            res.json({usuario_datos, "El usuario se creo:":singleton});

        } catch (error) {
            //en este caso envio un log ya que el desafio no aclara nada sobre los errores
            console.log(error);
        }
    }

}

module.exports = new Usuario();