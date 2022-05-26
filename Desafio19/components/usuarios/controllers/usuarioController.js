let usuario = require("../services/usuarioServicio");
let logger = require("../../../utils/pino");

//En el controlador recibo la informacion del formulario

class Usuario {
    async user(req, res) {
        try {
            let { nombre, apellido, edad } = req.body;

            //en caso de que falte algun campo del formulario:
            if (!nombre) {
                logger.fatal("El usuario no ingreso su nombre");
                throw new Error;
            }
            if (!apellido) {
                logger.error("El usuario no ingreso su apellido");
                throw new Error;
            }
            if (!edad) {
                logger.warn("El usuario no ingreso su edad");
                throw new Error;
            }

            //el controlador le envia la info del formulario y el service crea el usuario
            let response = await usuario.crear_usuario(nombre, apellido, edad);
            res.json(req.body);
        } catch (error) {
            res.send({ ATENCION: "No completastes todos los campos" });
        }

    }

    async mostrar_usuarios(req, res, next) {
        let response = await usuario.todos_usuarios();
        res.json(response);
    }
}

module.exports = new Usuario();