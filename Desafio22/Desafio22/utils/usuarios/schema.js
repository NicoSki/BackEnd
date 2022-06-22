let { buildSchema } = require("graphql");

const schema = buildSchema(`
type Usuario{
        id: ID!
        nombre: String
        apellido: String
        edad: String
        fecha: String
}


input UsuarioInput{
        nombre: String
        apellido: String
        edad: Int
}

type Query{
    getUsuario( id: ID! ): Usuario
    getUsuarios( datos:String,valor:String ): [Usuario]
}

type Mutation{
    crearUsuario( datos:UsuarioInput ): Usuario
    actualizarUsuario( id: ID!, datos:UsuarioInput ): Usuario
    eliminarUsuario( id: ID! ): Usuario
}
`);

module.exports = { schema };