function renderVistaMascotas() {
    contenido.innerHTML = `
        <div class="card">
            <h2>🐶 Mascotas</h2>
            <button class="btn btn-primary" onclick="modalMascota()">+ Nueva</button>
            <table>
                <thead>
                    <tr><th>Nombre</th><th>Edad</th><th>Tipo</th><th></th></tr>
                </thead>
                <tbody id="tabla"></tbody>
            </table>
        </div>
    `;
    renderMascotas();
}

function modalMascota(index = null) {
    let data = getData("mascotas");
    let m = index !== null ? data[index] : {};

    abrirModal(`
        <h3>${index !== null ? "Editar" : "Nueva"} Mascota 🐾</h3>
        <input id="nombre" value="${m.nombre || ''}" placeholder="Nombre">
        <input id="edad" type="number" value="${m.edad || ''}" placeholder="Edad">
        <input id="tipo" value="${m.tipo || ''}" placeholder="Tipo">
        <button onclick="guardarMascota(${index})">Guardar</button>
    `);
}

function guardarMascota(index) {
    let nombre = document.getElementById("nombre").value.trim();
    let edad = document.getElementById("edad").value;

    if (!nombre) return alert("Nombre requerido");

    let data = getData("mascotas");

    if (index !== null) {
        data[index] = { nombre, edad };
    } else {
        data.push({ nombre, edad });
    }

    setData("mascotas", data);
    cerrarModal();
    renderMascotas();
}

function renderMascotas() {
    let data = getData("mascotas");
    let tabla = document.getElementById("tabla");

    tabla.innerHTML = "";

    data.forEach((m, i) => {
        tabla.innerHTML += `
            <tr>
                <td>${m.nombre}</td>
                <td>${m.edad}</td>
                <td>${m.tipo || ''}</td>
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