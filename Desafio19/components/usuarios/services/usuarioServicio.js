let DAOS = require("../../../models/daos");

class Usuario {

    //Lo almaceno con el static
    static datosUsuarios = [];

    async crear_usuario(nombre, apellido, edad) {
        try {
            //creo el usuario con la info del controller y la añado al array de los usuarios
            let usuario = { nombre, apellido, edad }
            console.log("Estoy en service", usuario);
            Usuario.datosUsuarios.push(usuario);
            //lo agrego a la base de datos
            DAOS.nuevo(usuario);
        } catch (error) {
            console.log(error);
        }
    }

    async todos_usuarios() {
        try {
            //para el caso de visualizar todos los usuarios almacenados
            return DAOS.todos_usuarios();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Usuario();
