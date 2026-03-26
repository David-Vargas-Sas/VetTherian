// PROTEGER DASHBOARD
if (!localStorage.getItem("auth")) {
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("auth");
    window.location.href = "index.html";
}

function cargarVista(vista) {
    if (vista === "mascotas") renderVistaMascotas();
    if (vista === "propietarios") renderVistaPropietarios();
    if (vista === "veterinarios") renderVistaVeterinarios();
}