let { mongoose } = require("../../config/mongoDB");
let { Schema, model } = mongoose;

let UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true }
});

let UsuarioModel = new model('Usuarios', UsuarioSchema);

class MongoDB {
    async nuevo(user) {
        try {
            let respuesta = UsuarioModel(user);
            await respuesta.save();
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    async todos(){
        try {
            let respuesta = await UsuarioModel.find({});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    async eliminar(id){
        try {
            let respuesta = await UsuarioModel.remove({"_id":id});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    async editar(id,modificado){
        try {
            let respuesta = await UsuarioModel.update({"_id":id}, {$set:{"nombre":modificado.nombre, "apellido":modificado.apellido,"edad":modificado.edad}});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new MongoDB();