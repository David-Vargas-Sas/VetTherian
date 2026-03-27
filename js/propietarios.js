function renderVistaPropietarios() {
    contenido.innerHTML = `
        <div class="card">
            <h2>👤 Propietarios</h2>
            <button class="btn btn-primary" onclick="modalPropietario()">+ Nuevo</button>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tabla"></tbody>
            </table>
        </div>
    `;
    renderPropietarios();
}

// MODAL
function modalPropietario(index = null) {
    let data = getData("propietarios");
    let p = index !== null ? data[index] : {};

    abrirModal(`
        <h3>${index !== null ? "Editar" : "Nuevo"} Propietario 👤</h3>

        <input id="nombre" value="${p.nombre || ''}" placeholder="Nombre">
        <input id="telefono" value="${p.telefono || ''}" placeholder="Teléfono">
        <input id="direccion" value="${p.direccion || ''}" placeholder="Dirección">

        <button class="btn btn-primary" onclick="guardarPropietario(${index})">Guardar</button>
    `);
}

// GUARDAR
function guardarPropietario(index) {
    let nombre = document.getElementById("nombre").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let direccion = document.getElementById("direccion").value.trim();

    // VALIDACIONES PRO
    if (!nombre) return alert("Nombre obligatorio");
    if (!telefono || telefono.length < 7) return alert("Teléfono inválido");
    if (!direccion) return alert("Dirección obligatoria");

    let data = getData("propietarios");

    if (index !== null) {
        data[index] = { nombre, telefono, direccion };
    } else {
        data.push({ nombre, telefono, direccion });
    }

    setData("propietarios", data);

    cerrarModal();
    renderPropietarios();
}

// LISTAR
function renderPropietarios() {
    let data = getData("propietarios");
    let tabla = document.getElementById("tabla");

    tabla.innerHTML = "";

    data.forEach((p, i) => {
        tabla.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.telefono}</td>
                <td>${p.direccion}</td>
                <td>
                    <button class="btn btn-edit" onclick="modalPropietario(${i})">✏️</button>
                    <button class="btn btn-delete" onclick="eliminarPropietario(${i})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// ELIMINAR
function eliminarPropietario(i) {
    let data = getData("propietarios");

    if (!confirm("¿Eliminar propietario?")) return;

    data.splice(i, 1);
    setData("propietarios", data);
    renderPropietarios();
}