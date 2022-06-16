const Users = require('../models/User')
//Gestion de usuarios
const User = {
    get: async (req, res) => {
        //en este caso comno es especifico lo sacamos de params, creamos objeto
        const {id} = req.params
        const user = await Users.findOne({_id: id})
        res.status(200).send(user)
    },
    list: async (req, res) => {
        const users = await Users.find()
        res.status(200).send(users)
    },
    create: async (req, res) => {
        //req.body los datos de las peticiones post vienen en el body, NO SE PUEDE ENVIAR ASI, se debe agregar configuracion en la app principal
        const user = new Users(req.body)
        const usuarioGuardado = await user.save()
        res.status(201).send(usuarioGuardado._id)
    },
    update: async (req, res) => {
        const {id} = req.params
        const user = await Users.findOne({_id: id})
        //buscamos al ujsuario que venmga dentgro del body de la peticion, parametro 1, usuario encontrado, parametro 2, peticion del body que viene desde el cliente
        Object.assign(user, req.body)
        //guardamos
        await user.save()
        res.sendStatus(204)
    },
    remove: async (req, res) => {
        const {id} = req.params
        const user = await Users.findOne({_id: id})
        if(user){
            user.remove()
        }
        res.sendStatus(204)
    }
}

//exportar objeto de Usuario
//cuando importemos este archivo, recibimos por defecto lo que esta aca en la linea siguiente
module.exports = User