const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

function abrirModal(html) {
    modalBody.innerHTML = html;
    modal.classList.remove("hidden");
}

function cerrarModal() {
    modal.classList.add("hidden");
}