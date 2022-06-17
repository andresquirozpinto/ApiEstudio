const CuentasUsuarios = require('../models/CuentaUsuario')
//Gestion de usuarios
const CuentaUsuario = {
    get: async (req, res) => {
        //en este caso comno es especifico lo sacamos de params, creamos objeto
        const {id} = req.params
        const cuentaUsuario = await CuentasUsuarios.findOne({_id: id})
        res.status(200).send(cuentaUsuario)
    },
    list: async (req, res) => {
        const cuentaUsuario = await CuentasUsuarios.find()
        res.status(200).send(cuentaUsuario)
    },
    create: async (req, res) => {
        //req.body los datos de las peticiones post vienen en el body, NO SE PUEDE ENVIAR ASI, se debe agregar configuracion en la app principal
        const cuentaUsuario = new CuentasUsuarios(req.body)
        const cuentaUsuarioGuardado = await cuentaUsuario.save()
        res.status(201).send(cuentaUsuarioGuardado._id)
    },
    update: async (req, res) => {
        const {id} = req.params
        const cuentaUsuario = await CuentasUsuarios.findOne({_id: id})
        //buscamos al ujsuario que venmga dentgro del body de la peticion, parametro 1, usuario encontrado, parametro 2, peticion del body que viene desde el cliente
        Object.assign(cuentaUsuario, req.body)
        //guardamos
        await cuentaUsuario.save()
        res.sendStatus(204)
    },
    remove: async (req, res) => {
        const {id} = req.params
        const cuentaUsuario = await CuentasUsuarios.findOne({_id: id})
        if(cuentaUsuario){
            cuentaUsuario.remove()
        }
        res.sendStatus(204)
    }
}

//exportar objeto de Usuario
//cuando importemos este archivo, recibimos por defecto lo que esta aca en la linea siguiente
module.exports = CuentaUsuario