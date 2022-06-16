const mongoose = require('mongoose')

const Productos = mongoose.model('Producto', {
    nombre: {type: String, require: true, minlenght: 3},
    marca: {type: String, require: true, minlenght: 3},
    precio: {type: String, require: true, minlenght: 3},
    codigo: {type: String, require: true, minlenght: 3}
})

module.exports = Productos