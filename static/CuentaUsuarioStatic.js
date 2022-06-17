
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

const cargarDatos = async () => {
    const response = await fetch('/cuentas-usuarios')
    const cuentasUsuarios = await response.json()
    console.log(cuentasUsuarios)

    const template = cuentaUsuario => `
    <li class="list-group-item">
    ${cuentaUsuario.nombre} ${cuentaUsuario.apellido} <button class="btn btn-danger" data-delete-id="${cuentaUsuario._id}">Eliminar</button> <button class="btn btn-success" data-edit-id="${cuentaUsuario._id}">Editar</button>
    </li>
    `
    const listaCuentasUsuarios = document.getElementById('user-list')
    //user es un elemento quue estaremos iterando, la funcion que le pasamos se ejecutara tantas veces como elementos tenemos dentro del arreglo(evita el for)
    listaCuentasUsuarios.innerHTML = cuentasUsuarios.map(cuentaUsuario => template(cuentaUsuario)).join('')
    /*const todos = users.map(user => {

    })*/

    //respuesta GET
    cuentasUsuarios.forEach(cuentaUsuario => {
        
        const deleteNodoUsuario = document.querySelector(`[data-delete-id="${cuentaUsuario._id}"]`)
        const updateNodoUsuario = document.querySelector(`[data-edit-id="${cuentaUsuario._id}"]`)

        deleteNodoUsuario.onclick = async e => {
            await fetch(`/cuentas-usuarios/${cuentaUsuario._id}`, {
                method: 'DELETE',
            })
            deleteNodoUsuario.parentNode.remove()
            console.log(cuentaUsuario._id)
            alert('Registro eliminado correctamente')
        }

        updateNodoUsuario.onclick = async e => {
            const inputNombre = document.getElementById('name')
            const inputApellido = document.getElementById('lastname')
            inputNombre.value = cuentaUsuario.nombre
            inputApellido.value = cuentaUsuario.apellido

            const formularioUsuario = document.getElementById('user-form')
            formularioUsuario.onsubmit = async (e) => {
                e.preventDefault()
                const formData = new FormData(formularioUsuario)
                const data = Object.fromEntries(formData.entries())
                console.log(data)
                if (cuentaUsuario._id != null) {
                    await fetch(`/cuentas-usuarios/${cuentaUsuario._id}`, {
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
        await fetch('/cuentas-usuarios', {
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