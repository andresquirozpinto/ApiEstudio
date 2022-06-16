const mongoose = require('mongoose')

const Users = mongoose.model('User', {
    name: {type: String, require: true, minlenght: 3},
    lastname: {type: String, require: true, minlenght: 3}
})

module.exports = Users
