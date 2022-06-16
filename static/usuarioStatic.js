
const loadInitialTemplate = () => {
    const template = `
    <h1>Usuarios</h1>
    <form class="form-group" id="user-form">
        <div class="row">
            <div class="col-12">
                <div class=" form-group mt-2">
                    <label>Nombre</label>
                    <input class="form-control" type="text" id="nombre" name="name">
                </div>
                <div class="mt-2">
                    <label>LastName</label>
                    <input class="form-control" type="text" name="lastname">
                </div>
                <button class="btn btn-primary" type="submit">Enviar</button>
            </div>
        </div>
    </form>

    <div class="col-6">
        <ul id="user-list" class="list-group"></ul>
    </div>
    `
    const seccionFormulario = document.getElementById('seccion-formulario')
    seccionFormulario.innerHTML = template

}

const testFuncionAgregar = async () => {
    //interactuar con html
    const userForm = document.getElementById('user-form')
    const txtNombre = document.getElementsByName('name')
    const txtLastName = document.getElementsByName('lastname')

    /*if(txtNombre.value==="" || txtLastName.value===""){
        alert('campos vacios')
    } else {
        alert('campos con datos')
    }*/
    
}

const getUsers = async () => {
    const response = await fetch('/users')
    const users = await response.json()
    console.log(users)

    const template = user => `
    <li class="list-group-item">
    ${user.name} ${user.lastname} <button class="btn btn-danger" data-id="${user._id}">Eliminar</button> <button class="btn btn-success" data-id="${user._id}">Editar</button>
    </li>
    `
    const userList = document.getElementById('user-list')

    userList.innerHTML = users.map(user => template(user)).join('')

    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`)
        userNode.onclick = async e => {
            await fetch(`/users/${user._id}`, {
                method: 'DELETE',
            })
            userNode.parentNode.remove()
            alert('Eliminado con exito')
        }
    })
}

const addFormListener = () => {
    const userForm = document.getElementById('user-form')
    userForm.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(userForm)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        userForm.reset()
        getUsers()
    }
}

window.onload = () => {
    loadInitialTemplate()
    addFormListener()
    getUsers()
}