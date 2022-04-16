const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    nomprod: { type: String, required: true },
    precio: { type: Number, required: true },
    img: { type: String, required: true }
})

const UsuarioSchema = new Schema({
    user_id: String,
    email: String,
    name: String,
    pic: String
});

module.exports = mongoose.model("Prod", ProductoSchema);
module.exports = mongoose.model("User", UsuarioSchema);