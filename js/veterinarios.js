function renderVistaVeterinarios() {
    contenido.innerHTML = `
        <div class="card">
            <h2>🩺 Veterinarios</h2>
            <button class="btn btn-primary" onclick="modalVeterinario()">+ Nuevo</button>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Contacto</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tabla"></tbody>
            </table>
        </div>
    `;
    renderVeterinarios();
}

// MODAL
function modalVeterinario(index = null) {
    let data = getData("veterinarios");
    let v = index !== null ? data[index] : {};

    abrirModal(`
        <h3>${index !== null ? "Editar" : "Nuevo"} Veterinario 🩺</h3>

        <input id="nombre" value="${v.nombre || ''}" placeholder="Nombre">
        <input id="especialidad" value="${v.especialidad || ''}" placeholder="Especialidad">
        <input id="contacto" value="${v.contacto || ''}" placeholder="Contacto">

        <button onclick="guardarVeterinario(${index})">Guardar</button>
    `);
}

// GUARDAR
function guardarVeterinario(index) {
    let nombre = document.getElementById("nombre").value.trim();
    let especialidad = document.getElementById("especialidad").value.trim();
    let contacto = document.getElementById("contacto").value.trim();

    // VALIDACIONES PRO
    if (!nombre) return alert("Nombre obligatorio");
    if (!especialidad) return alert("Especialidad obligatoria");
    if (!contacto) return alert("Contacto obligatorio");

    let data = getData("veterinarios");

    if (index !== null) {
        data[index] = { nombre, especialidad, contacto };
    } else {
        data.push({ nombre, especialidad, contacto });
    }

    setData("veterinarios", data);

    cerrarModal();
    renderVeterinarios();
}

// LISTAR
function renderVeterinarios() {
    let data = getData("veterinarios");
    let tabla = document.getElementById("tabla");

    tabla.innerHTML = "";

    data.forEach((v, i) => {
        tabla.innerHTML += `
            <tr>
                <td>${v.nombre}</td>
                <td>${v.especialidad}</td>
                <td>${v.contacto}</td>
                <td>
                    <button class="btn btn-edit" onclick="modalVeterinario(${i})">✏️</button>
                    <button class="btn btn-delete" onclick="eliminarVeterinario(${i})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// ELIMINAR
function eliminarVeterinario(i) {
    let data = getData("veterinarios");

    if (!confirm("¿Eliminar veterinario?")) return;

    data.splice(i, 1);
    setData("veterinarios", data);
    renderVeterinarios();
}