
let usuarioDB = require("../../../models/usuarioDAO");

class Usuario {

    //Lo almaceno con el static

    async agregar(nombre, apellido, edad) {
        try {
            await usuarioDB.agregar(nombre, apellido, edad);

        } catch (error) {
            console.log(error);
        }
    }

    async mostrar(datos) {
        try {
            let usuario = { datos };
            return usuario;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new Usuario();