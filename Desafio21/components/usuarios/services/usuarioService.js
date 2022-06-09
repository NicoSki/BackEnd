let DAO = require("../../../models/DAO");

class Usuario{

    async agregar(user){
        try {
            let res = await DAO.nuevo(user);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async mostrar(){
        try {
            let res = await DAO.todos();
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async eliminar(id){
        try {
            let res = await DAO.eliminar(id);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async editar(id,modificado){
        try {
            let res = await DAO.editar(id,modificado);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Usuario();