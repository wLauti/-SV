// Variables para seleccionar el mínimo y máximo tiempo de carga
let minTime = 50; // Puedes ajustar el mínimo (en milisegundos)
let maxTime = 150; // Puedes ajustar el máximo (en milisegundos)

let porcentajeActual = 0;
let porcentajeElemento = document.getElementById('porcentaje');
let barraCarga = document.querySelector('.loader-bar');

// Función que genera un valor aleatorio entre el min y el max
function obtenerTiempoAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

// Función para actualizar la barra de carga y el porcentaje
function cargar() {
    if (porcentajeActual < 100) {
        porcentajeActual++;
        porcentajeElemento.textContent = `${porcentajeActual}%`;
        barraCarga.style.width = `${porcentajeActual}%`;

        // Generar un tiempo aleatorio para cada incremento
        setTimeout(cargar, obtenerTiempoAleatorio(minTime, maxTime));
    } else {
        // Redirigir a resultados.html cuando la carga llegue al 100%
        window.location.href = "resultados.html";
    }
}

// Iniciar la carga
window.onload = function() {
    cargar();
};
