const mongoose = require('mongoose')

const CuentasUsuarios = mongoose.model('CuentaUsuario', {
    nombre: {type: String, require: true, minlenght: 3},
    apellido: {type: String, require: true, minlenght: 3}
})

module.exports = CuentasUsuarios
