const Productos = require('./Producto')

const Producto = {
    get: async (req, res) => {
        const {id} = req.params
        const producto = await Productos.findOne({_id: id})
        res.status(200).send(producto)
    },
    list: async (req, res) => {
        const productos = await Productos.find()
        res.status(200).send(productos)
    },
    create: async (req, res) => {
        const producto = new Productos(req.body)
        const productoGuardado = await producto.save()
        res.status(201).send(productoGuardado._id)
    },
    update: async (req, res) => {
        const {id} = req.params
        const producto = await Productos.findOne({_id: id})
        Object.assign(producto, req.body)
        await producto.save()
        res.sendStatus(204)
    },
    remove: async (req, res) => {
        const {id} = req.params
        const user = await Productos.findOne({_id: id})
        if(user){
            user.remove()
        }
        res.sendStatus(204)
    }
}

module.exports = Producto