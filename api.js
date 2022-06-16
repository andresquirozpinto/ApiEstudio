//np install -S express ->dependencia a instalar
//express nombre de la dependencia
const express = require('express')
//express
const app = express()
//llamamos al controlador, indicamos importar algo de nuestro proyecto y NO un modulo
const user = require('./userController')
const producto = require('./productoController')
//conexion
const mongoose = require('mongoose')

const port = 3000
/*
-despues de app definir express
-tomara todas las peticiones que vengan en formato json
-las va a transformar en objeto javascript
-y las va asignar a la propiedad de body
*/
app.use(express.json())

/**DOCUMENTACION
*request, toda la peticion del cliente
*response, enviar cosas al usuario
ENDPOINT: es una ruta a la cual se puede llegar atyraves de peticiones que se puede hacer que se puede realizar de navegador o app movil
STATUS: 
200 resultado OK y ademas devolver datos al cliente, puede ser objeto{} o arreglo[], strings, etc
201 resultado OK significa CREADO
204 resultado OK hemos procesado peticion con exito, significa NO CONTENT , no devolvemos nada se utiliza p=or lo general con PUT, PATCH, DELETE
 
MONGODB
-base de datos orientada a documentos(JSON)
-se compone en:
    .colecciones, listado de documentos
    .Users, tiene listado de documentos, esos seran usuarios
*/


//conexion a db
mongoose.connect('mongodb+srv://system:system@cluster0.jbnnh.mongodb.net/miapp?retryWrites=true&w=majority')
//definiendo modelo de usuario

//ingresamos a raiz, se ejecutra la funcion que le vamos a pasar
app.get('/users', user.list)
app.post('/users', user.create)
app.get('/users/:id', user.get)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id', user.remove)

app.get('/productos', producto.list)
app.post('/productos', producto.create)
app.get('/productos/:id', producto.get)
app.put('/productos/:id', producto.update)
app.patch('/productos/:id', producto.update)
app.delete('/productos/:id', producto.remove)

//agregar carpeta y entrar a ella, crear archivos necesarios (main.js)
app.use(express.static('static'))

app.get("/", (req ,res) =>{
    //enviamos archivo html a nuestro usuario
    //dirname indica a sendfile donde nos encontramos, middleware de express
    console.log(__dirname)
    res.sendFile(`${__dirname}/producto.html`)
})

//Controladores de paginas no encontradas (metodos), * para todas las rutas antes que yo
app.get('*', (req, res) => {
    res.status(404).send('Esta pagina no existe')
})

//ejecutar aplicacion para escuchar las peticiones desde el navegador
app.listen(port, () => {
    console.log('Corriendo la aplicacion')
})










