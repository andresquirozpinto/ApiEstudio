
const loadInitialTemplate = () => {
    //creamos html
    const template = `
    <h1>Usuarios</h1>
    <form id="user-form">
        <div>
            <label>Nombre</label>
            <input type="text" name="name">
        </div>
        <div>
            <label>LastName</label>
            <input type="text" name="lastname">
        </div>
        <button type="submit">Enviar</button>
    </form>
    <ul id="user-list"></ul>
    `
    //guardamos en el body las etiquetas
    //buscamos por etiqueta
    //metodo devulve un listado, agregamos acceder al primer indice de este arreglo
    const body = document.getElementsByTagName('body')[0]
    //asignar html dentro de la etiqueta de body, y le pasamos la etiqueta a la plantilla que creamos
    body.innerHTML = template
}
//funcion para traer los datos a dibujar
const getUsers = async () => {
    //dibujamos en la etiqueta user-list
    //cuenta con un metodo de json para transformar respuestas en objeto javascript
    const response = await fetch('/users')
    const users = await response.json()
    console.log(users)
    //igual a funcion que recibe un usuario
    const template = user => `
    <li>
    ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
    </li>
    `
    const userList = document.getElementById('user-list')
    //es igual a, iteramos usuarios que la api nos haya deveulto,dentro de map() queremos ejecutar la funcion de la platilla pero le queremos pasar el usuario
    //devuelve arreglo el cual; va a contener muchos strings donde se encontrara la plantilla del usuario
    //join(''), cuando este arreglo se una no coloque nada
    //map es para retornar
    userList.innerHTML = users.map(user => template(user)).join('')
    //recorremos el usuario para encontrar su id (para eliminar el seleccionado)
    users.forEach(user => {
        //buscamos el boton con el id del usuario, nodo de usuario
        const userNode = document.querySelector(`[data-id="${user._id}"]`)
        //funcion async , llamamos el endpoint para eliminar
        userNode.onclick = async e => {
            await fetch(`/users${user._id}`, {
                method: 'DELETE',
            })
            //sidejamos esto userNode.remove() , solo eliminara el boton seleccionado, la idea es sacar el elemento de la lista, entonces:
            //debemos subir dentro del arbol de html al nodo que viene el elemento de arriba etiqueta li
            userNode.parentNode.remove()
            alert('Eliminado con exito')
        }
    })
}
//funcion capturar los datos y transformalos en el formato JSON 
const addFormListener = () => {
    const userForm = document.getElementById('user-form')
    //agregar evento listener , funcion asyncrona usaremos promnesas cuando llamemos fetch
    userForm.onsubmit = async (e) => {
        //pagina no se refresce cuando presiones en enviar dentro del formulario
        e.preventDefault()
        //pasamos todos los datos del formulario (etiqueta html)
        const formData = new FormData(userForm)
        //mejor alternativa para pasar valor de formulario, siguiente instruccion:
        //transformar objeto que cuente con condicion de ser un (fromEntries) iterable de entrada Y TRANSFORMA en objeto JSON
        //formData tiene una funcion que devuelve un iterador, entries()
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        //mandamos los datos a la api
        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //limpiando formulario (todos)
        userForm.reset()
        getUsers()
    }
}
//window.onload, funcion que se ejecutara cuando se haya cargado todo el contenido de nuestra plantilla html
window.onload = () => {
    //toda la logica, separada en funciones
    loadInitialTemplate()
    addFormListener()
    getUsers()
}