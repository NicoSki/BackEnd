//Aca defino el modelo del usuario

class UsuarioModel{
    constructor(nombre,apellido,edad){
        this.nombre=nombre,
        this.apellido=apellido,
        this.edad=edad
    }
}

module.exports = new UsuarioModel();