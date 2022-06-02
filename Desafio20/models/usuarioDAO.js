
//En este archivo voy a crear las distintas funciones que tengo con daos

class UsuarioDAO {
    static datosUsuarios = [];

    async agregar(nombre, apellido, edad) {
        try {
            let usuario = { nombre, apellido, edad };
            await UsuarioDAO.datosUsuarios.push(usuario);
            return usuario;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UsuarioDAO();