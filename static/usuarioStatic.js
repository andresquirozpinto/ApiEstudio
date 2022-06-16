
const cargarElementosPlantilla = () => {
    const template = `
    <h1>Usuarios</h1>
    <form class="form-group" id="user-form">
        <div class="row">
            <div class="col-12">
                <div class=" form-group mt-2">
                    <label>Nombre</label>
                    <input class="form-control" type="text" id="name" name="name">
                </div>
                <div class="mt-2">
                    <label>LastName</label>
                    <input class="form-control" type="text" id="lastname" name="lastname">
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
}

const cargarDatos = async () => {
    const response = await fetch('/users')
    const usuarios = await response.json()
    console.log(usuarios)

    const template = usuario => `
    <li class="list-group-item">
    ${usuario.name} ${usuario.lastname} <button class="btn btn-danger" data-delete-id="${usuario._id}">Eliminar</button> <button class="btn btn-success" data-edit-id="${usuario._id}">Editar</button>
    </li>
    `
    const userList = document.getElementById('user-list')
    //user es un elemento quue estaremos iterando, la funcion que le pasamos se ejecutara tantas veces como elementos tenemos dentro del arreglo(evita el for)
    userList.innerHTML = usuarios.map(usuario => template(usuario)).join('')
    /*const todos = users.map(user => {

    })*/

    usuarios.forEach(usuario => {
        const deleteNodoUsuario = document.querySelector(`[data-delete-id="${usuario._id}"]`)
        const updateNodoUsuario = document.querySelector(`[data-edit-id="${usuario._id}"]`)

        deleteNodoUsuario.onclick = async e => {
            await fetch(`/users${user._id}`, {
                method: 'DELETE',
            })
            userNode.parentNode.remove()
            alert('Registro eliminado correctamente')
        }

        updateNodoUsuario.onclick = async e => {
            const inputNombre = document.getElementById('name')
            const inputApellido = document.getElementById('lastname')
            inputNombre.value = usuario.name
            inputApellido.value = usuario.lastname

            const formularioUsuario = document.getElementById('user-form')
            formularioUsuario.onsubmit = async (e) => {
                e.preventDefault()
                const formData = new FormData(formularioUsuario)
                const data = Object.fromEntries(formData.entries())
                console.log(data)
                if (usuario._id != null) {
                    await fetch(`/users/${usuario._id}`, {
                        method: 'PUT',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    alert('Registro actualizado correctamente')
                } else {
                    alert('El ID no es correcto')
                }
                formularioUsuario.reset()
                cargarDatos()
            }
        }

    })


}

const agregarDatosFormulario = () => {
    const formularioUsuario = document.getElementById('user-form')
    formularioUsuario.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(formularioUsuario)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        formularioUsuario.reset()
        cargarDatos()
    }
}

window.onload = () => {
    cargarElementosPlantilla()
    agregarDatosFormulario()
    cargarDatos()
}