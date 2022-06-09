let mongo = require("./db/mongoDB");

class DAO {

    async nuevo(user) {
        try {
            return mongo.nuevo(user);
        } catch (error) {
            console.log(error);
        }
    }

    async todos() {
        try {
            return mongo.todos();
        } catch (error) {
            console.log(error);
        }
    }

    async eliminar(id) {
        try {
            return mongo.eliminar(id);
        } catch (error) {
            console.log(error);
        }
    }

    async editar(id,modificado) {
        try {
            return mongo.editar(id,modificado);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new DAO();