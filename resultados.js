// Recuperar los votos almacenados en localStorage o inicializar si no existen
let votes = JSON.parse(localStorage.getItem('votes')) || { FRA: 0, AE: 0, Blanco: 0 };

// Actualizar los resultados mostrados en la página
document.getElementById('votesFRA').textContent = votes.FRA;
document.getElementById('votesAE').textContent = votes.AE;
document.getElementById('votesBlanco').textContent = votes.Blanco;

// Escuchar los eventos de teclado para incrementar o decrementar votos
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'H': votes.FRA++; break;  // Aumentar votos de FRA
        case 'B': if (votes.FRA > 0) votes.FRA--; break;  // Disminuir votos de FRA
        case 'J': votes.AE++; break;  // Aumentar votos de AE
        case 'N': if (votes.AE > 0) votes.AE--; break;  // Disminuir votos de AE
        case 'K': votes.Blanco++; break;  // Aumentar votos de Blanco
        case 'M': if (votes.Blanco > 0) votes.Blanco--; break;  // Disminuir votos de Blanco
        case 'Enter': printResults(); break;  // Al presionar Enter, imprimir los resultados
        default: return;
    }
    updateVotes();  // Actualizar los resultados visuales
});

// Función para actualizar los votos en la tabla
function updateVotes() {
    document.getElementById('votesFRA').textContent = votes.FRA;
    document.getElementById('votesAE').textContent = votes.AE;
    document.getElementById('votesBlanco').textContent = votes.Blanco;

    // Actualizar los votos en localStorage
    localStorage.setItem('votes', JSON.stringify(votes));
}

// Función para imprimir los resultados
function printResults() {
    window.print();
}
