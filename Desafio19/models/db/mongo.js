let { mongoose } = require("../../config/mongoDB");
let { Schema, model } = mongoose;

let UsuarioShema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true }
});

let UsuarioModel = new model('Usuarios_Des19', UsuarioShema);

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
}

module.exports = new MongoDB();