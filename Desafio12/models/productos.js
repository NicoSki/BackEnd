const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    nomprod: { type: String, required: true },
    precio: { type: Number, required: true },
    img: { type: String, required: true }
})

module.exports = mongoose.model("Prod", ProductoSchema)