
const loadInitialTemplate = () => {
    const template = `
    <h1>Productos</h1>
    <form id="formulario-producto">
        <div>
            <label>Nombre</label>
            <input type="text" name="nombre">
        </div>
        <div>
            <label>Marca</label>
            <input type="text" name="marca">
        </div>
        <div>
            <label>Precio</label>
            <input type="text" name="precio">
        </div>
        <div>
            <label>Codigo</label>
            <input type="text" name="codigo">
        </div>

        <button type="submit">Enviar</button>
    </form>

    <ul id="lista-productos"></ul>

    <table class="table hover" id="tbl-alumnos">
        <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Codigo</th>
        </tr>
        </thead>
        <tbody id="data-productos">
        </tbody>
    </table>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}

const getProductos = async () => {
    const response = await fetch('/productos')
    const productos = await response.json()

    /*const template = producto => `
    <li>
    ${producto.nombre} ${producto.marca} <button data-id="${producto._id}">Eliminar</button>
    </li>
    `*/

    //const listaProductos = document.getElementById('lista-productos')data-productos

    const cuerpoTabla = producto => `
    <tr>
        <td>${producto._id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.marca}</td>
        <td>${producto.precio}</td>
        <td>${producto.codigo}</td>
        <td><button data-id="${producto._id}">Eliminar</button></td>
    </tr>
    `

    const listaProductos = document.getElementById('data-productos')

    //listaProductos.innerHTML = productos.map(producto => template(producto)).join('')
    listaProductos.innerHTML = productos.map(producto => cuerpoTabla(producto)).join('')
    productos.forEach(producto => {
        const productoNode = document.querySelector(`[data-id="${producto._id}"]`)
        productoNode.onclick = async e => {
            await fetch(`/productos/${producto._id}`, {
                method: 'DELETE',
            })
            productoNode.parentNode.remove()
        }
    })
}

const addFormListener = () => {
    const productoFormulario = document.getElementById('formulario-producto')
    productoFormulario.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(productoFormulario)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        await fetch('/productos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        productoFormulario.reset()
        getProductos()
    }
}

window.onload = () => {
    loadInitialTemplate()
    addFormListener()
    getProductos()
}
