//primero instalar libreria por terminal, npm i -S mongoose (libreria para conectar a bd por url)
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://system:system@cluster0.jbnnh.mongodb.net/miapp?retryWrites=true&w=majority')

//creando modelo, primer argumento es el nombre del modelo, segundo argumento objeto que guardaremos (JSON) forma que tendran los documentos dentro de la coleccion de Users
const User = mongoose.model('User', {
    username: String,
    edad: Number,
})

//funcion para crear usuarios
const crear = async () => {
    //modelo con mayuscula, instancia con minuscula
    const user = new User({username: 'Camila Paredes', edad: 20})
    //guardamos en la bd, si imprimimos el resultado lo guardamos en una variable
    const usuarioGuardado = await user.save()
    console.log(usuarioGuardado)
}

//crear()

const buscarTodo = async () => {
    const users = await User.find()
    console.log(users)
}

//buscarTodo()

const buscar = async () => {
    //buscar por alguna condicion
    const user = await User.find({username: 'Andres Quiroz'})
    console.log(user)
    //devuelve un arreglo
}

//buscar()

const buscarUnElemento = async () => {
    //buscar por alguna condicion
    const user = await User.findOne({username: 'Andres Quiroz'})
    console.log(user)
    //devuelve un objeto, siempre y cuando lo encuentre, si no lo encuentra lo devuelve NULL
}

//buscarUnElemento()

const actualizar = async () => {
    const user = await User.findOne({username: 'Andres Quiroz'})
    console.log(user)
    user.edad = 30
    await user.save()

}

//actualizar()

const eliminar = async () => {
    const user = await User.findOne({username: 'Andres Quiroz'})
    //se llama remove siempre y cuandoi existe el registro
    console.log(user)
    if(user){
        await user.remove()
    }
}

//eliminar()