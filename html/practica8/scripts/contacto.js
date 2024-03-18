let nombre = document.getElementById("campoNombre");
let correo = document.getElementById("campoCorreo");

function comprobarNombre() {
    switch (nombre.value) {
        case "alex":
        case "juan":
        case "ana":
        case "pedro":
            nombre.setCustomValidity("");
        break;
        default:
            nombre.setCustomValidity("El usuario introducido no existe");
    }
}

function comprobarCorreo() {
    if (correo.value.endsWith(".es")) {
        correo.setCustomValidity("");
    } else {
        correo.setCustomValidity("Debes introducir una dirección de correo española");
    }
}

function iniciar() {
    nombre.addEventListener("input", comprobarNombre, false);
    correo.addEventListener("input", comprobarCorreo, false);
}

window.addEventListener("load", iniciar, false);