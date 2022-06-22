let { schema } = require("./schema");
let crypto = require("crypto");


class Usuario {
    constructor(id, { nombre, apellido, edad }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.fecha = new Date().toLocaleTimeString();
    }
}

const usuariosMap = {};


function getUsuario({ id }) {
    if (!usuariosMap[id]) {
        throw new Error("No se encontro el usuario");
    }
    return usuariosMap[id];
}

function getUsuarios({ campo, valor }) {
    const usuarios = Object.values(usuariosMap)

    if (campo && valor) {
        return usuarios.filter(p => p[campo] == valor);
    } else {
        return usuarios;
    }
}

function crearUsuario({ datos }) {
    let id = crypto.randomBytes(10).toString("hex");
    const nuevoUsuario = new Usuario(id, datos)
    usuariosMap[id] = nuevoUsuario;
    return nuevoUsuario;
}

function actualizarUsuario({ id, datos }) {
    if (!usuariosMap[id]) {
        throw new Error("No se encontro el usuario");
    }
    const usuarioActualizado = new Usuario(id, datos)
    usuariosMap[id] = usuarioActualizado;
    return usuarioActualizado;
}

function eliminarUsuario({ id }) {
    if (!usuariosMap[id]) {
        throw new Error("No se encontro el usuario");
    }
    const usuarioEliminado = usuariosMap[id]
    delete usuariosMap[id];
    return usuarioEliminado;
}


module.exports = [schema, getUsuario, getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario];