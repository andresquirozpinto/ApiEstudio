const express = require('express')
const app = express()
const producto = require('./controllers/productoController')
const cuentaUsuario = require('./controllers/CuentaUsuarioController')
const mongoose = require('mongoose')
const port = 3000

app.use(express.json())

mongoose.connect('mongodb+srv://system:system@cluster0.jbnnh.mongodb.net/miapp?retryWrites=true&w=majority')

app.get('/cuentas-usuarios', cuentaUsuario.list)
app.post('/cuentas-usuarios', cuentaUsuario.create)
app.get('/cuentas-usuarios/:id', cuentaUsuario.get)
app.put('/cuentas-usuarios/:id', cuentaUsuario.update)
app.patch('/cuentas-usuarios/:id', cuentaUsuario.update)
app.delete('/cuentas-usuarios/:id', cuentaUsuario.remove)

app.get('/productos', producto.list)
app.post('/productos', producto.create)
app.get('/productos/:id', producto.get)
app.put('/productos/:id', producto.update)
app.patch('/productos/:id', producto.update)
app.delete('/productos/:id', producto.remove)

app.use(express.static('static'))
app.use(express.static('public'))

app.get("/", (req ,res) =>{
    console.log(__dirname)
    res.sendFile(`${__dirname}/index.html`)
})

app.get('*', (req, res) => {
    res.status(404).send('Esta pagina no existe')
})

app.listen(port, () => {
    console.log('Corriendo la aplicacion')
})










