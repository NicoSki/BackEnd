let usuarioService = require("../services/usuarioService");



class Usuario {
    async crear_usuario(req, res) {
        try {
            let info_usuario = req.body;
            await usuarioService.agregar(info_usuario);
            res.send("Se añadio el usuario");
        } catch (error) {
            console.log(error);
        }
    }

    async mostrar_usuarios(req, res) {
        try {
            let response = await usuarioService.mostrar();
            res.send(response); //*Tambien lo puedo mandar como un objeto {response}
        } catch (error) {
            console.log(error);
        }
    }

    async eliminar_usuario(req, res) {
        try {
            let { id } = req.params;
            await usuarioService.eliminar(id);
            res.send("Se elimino el usuario");
        } catch (error) {
            console.log(error);
        }
    }

    async editar_usuario(req, res) {
        try {
            let { id } = req.params;
            let modificado_usuario = req.body;
            await usuarioService.editar(id,modificado_usuario);
            res.send("Se edito el usuario");
        } catch (error) {
            console.log(error);
        }
    }





}


module.exports = new Usuario();