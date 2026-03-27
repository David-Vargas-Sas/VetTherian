function renderVistaMascotas() {
    contenido.innerHTML = `
        <div class="card">
            <h2>🐶 Mascotas</h2>
            <button class="btn btn-primary" onclick="modalMascota()">+ Nueva</button>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Tipo</th>
                        <th>Propietario</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tabla"></tbody>
            </table>
        </div>
    `;
    renderMascotas();
}

function modalMascota(index = null) {
    let data = getData("mascotas");
    let propietarios = getData("propietarios");

    let m = index !== null ? data[index] : {};

    let options = propietarios.map((p, i) => `
        <option value="${i}" ${m.propietarioId == i ? 'selected' : ''}>
            ${p.nombre}
        </option>
    `).join("");

    abrirModal(`
        <div class="modal-form">

            <h3>${index !== null ? "Editar" : "Nueva"} Mascota 🐾</h3>

            <div class="form-group">
                <input id="nombre" value="${m.nombre || ''}" placeholder="Nombre">
            </div>

            <div class="form-group">
                <input id="edad" type="number" value="${m.edad || ''}" placeholder="Edad">
            </div>

            <div class="form-group">
                <input id="tipo" value="${m.tipo || ''}" placeholder="Tipo">
            </div>

            <div class="form-group">
                <select id="propietario">
                    <option value="">Seleccione propietario</option>
                    ${options}
                </select>
            </div>

            <button class="btn btn-primary" onclick="guardarMascota(${index})">
                Guardar
            </button>

        </div>
    `);
}

function guardarMascota(index) {
    let nombre = document.getElementById("nombre").value.trim();
    let edad = document.getElementById("edad").value;
    let tipo = document.getElementById("tipo").value;
    let propietarioId = document.getElementById("propietario").value;

    if (!nombre) return alert("Nombre requerido");
    if (!propietarioId) return alert("Seleccione propietario");

    let data = getData("mascotas");

    let mascota = { nombre, edad, tipo, propietarioId };

    if (index !== null) {
        data[index] = mascota;
    } else {
        data.push(mascota);
    }

    setData("mascotas", data);
    cerrarModal();
    renderMascotas();
}

function renderMascotas() {
    let data = getData("mascotas");
    let propietarios = getData("propietarios");

    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    data.forEach((m, i) => {

        let propietario = propietarios[m.propietarioId];

        tabla.innerHTML += `
            <tr>
                <td>${m.nombre}</td>
                <td>${m.edad}</td>
                <td>${m.tipo || ''}</td>
                <td>${propietario ? propietario.nombre : 'Sin asignar'}</td>
                <td>
                    <button class="btn btn-edit" onclick="modalMascota(${i})">✏️</button>
                    <button class="btn btn-delete" onclick="eliminarMascota(${i})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

function eliminarMascota(i) {
    let data = getData("mascotas");

    if (!confirm("¿Eliminar mascota?")) return;

    data.splice(i, 1);
    setData("mascotas", data);
    renderMascotas();
}