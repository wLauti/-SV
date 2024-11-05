// Recuperar los votos almacenados en localStorage o inicializar si no existen
let votes = JSON.parse(localStorage.getItem('votes')) || { FRA: 0, AE: 0, Blanco: 0, UPP: 0, NBA: 0 };

// Crear la gráfica circular
let ctx = document.getElementById('votingChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'doughnut', // Tipo de gráfica circular
    data: {
        labels: ['FRA', 'AE', 'Voto en Blanco', "UPP", "NBA"],
        datasets: [{
            label: 'Porcentaje de Votos',
            data: [votes.FRA, votes.AE, votes.Blanco, votes.UPP, votes.NBA], // Datos iniciales
            backgroundColor: ['#00ff3a', '#00c9ff', '#b4b4b4', "#ff1e1e", "#ff8b00"], // Colores para cada partido
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true, // Asegurar que sea responsiva
        maintainAspectRatio: true, // Mantener la relación de aspecto
        aspectRatio: 1, // Relación de aspecto 1:1 para evitar que se expanda demasiado
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});


// Actualizar los resultados mostrados en la página
updateVotes();

// Escuchar los eventos de teclado para incrementar o decrementar votos
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'H': votes.FRA++; break;  // Aumentar votos de FRA
        case 'B': if (votes.FRA > 0) votes.FRA--; break;  // Disminuir votos de FRA
        case 'J': votes.AE++; break;  // Aumentar votos de AE
        case 'N': if (votes.AE > 0) votes.AE--; break;  // Disminuir votos de AE
        case 'Q': votes.UPP++; break;  // Aumentar votos de FRA
        case 'A': if (votes.UPP > 0) votes.UPP--; break;  // Disminuir votos de FRA
        case 'W': votes.NBA++; break;  // Aumentar votos de FRA
        case 'S': if (votes.NBA > 0) votes.NBA--; break;  // Disminuir votos de FRA
        case 'K': votes.Blanco++; break;  // Aumentar votos de Blanco
        case 'M': if (votes.Blanco > 0) votes.Blanco--; break;  // Disminuir votos de Blanco
        case 'Enter': printResults(); break;  // Al presionar Enter, imprimir los resultados
        default: return;
    }
    updateVotes();  // Actualizar los resultados visuales
});

// Función para actualizar los votos en la tabla y la gráfica
// Verificar si los votos cambiaron antes de actualizar la gráfica
function updateVotes() {
    const totalVotes = votes.FRA + votes.AE + votes.UPP + votes.NBA;

    // Evitar división por cero
    const percentFRA = totalVotes > 0 ? (votes.FRA / totalVotes * 100).toFixed(2) : 0;
    const percentAE = totalVotes > 0 ? (votes.AE / totalVotes * 100).toFixed(2) : 0;
    const percentUPP = totalVotes > 0 ? (votes.UPP / totalVotes * 100).toFixed(2) : 0;
    const percentNBA = totalVotes > 0 ? (votes.NBA / totalVotes * 100).toFixed(2) : 0;
    const percentBlanco = totalVotes > 0 ? (votes.Blanco / (totalVotes + votes.Blanco) * 100).toFixed(2) : 0;

    // Actualizar solo si los votos han cambiado
    if (document.getElementById('votesFRA').textContent != votes.FRA.toString()) {
        document.getElementById('votesFRA').textContent = votes.FRA;
        document.getElementById('percentFRA').textContent = percentFRA + '%';
    }

    if (document.getElementById('votesAE').textContent != votes.AE.toString()) {
        document.getElementById('votesAE').textContent = votes.AE;
        document.getElementById('percentAE').textContent = percentAE + '%';
    }

    if (document.getElementById('votesUPP').textContent != votes.UPP.toString()) {
        document.getElementById('votesUPP').textContent = votes.UPP;
        document.getElementById('percentUPP').textContent = percentUPP + '%';
    }

    if (document.getElementById('votesNBA').textContent != votes.NBA.toString()) {
        document.getElementById('votesNBA').textContent = votes.NBA;
        document.getElementById('percentNBA').textContent = percentNBA + '%';
    }

    if (document.getElementById('votesBlanco').textContent != votes.Blanco.toString()) {
        document.getElementById('votesBlanco').textContent = votes.Blanco;
        document.getElementById('percentBlanco').textContent = percentBlanco + '%';
    }

    if (document.getElementById('totalVotes').textContent != totalVotes.toString()) {
        document.getElementById('totalVotes').textContent = totalVotes;
    }

    // Solo actualizamos la gráfica si los datos han cambiado
    chart.data.datasets[0].data = [votes.FRA, votes.AE, votes.UPP, votes.NBA, votes.Blanco];
    chart.update();

    // Guardar los votos en localStorage
    localStorage.setItem('votes', JSON.stringify(votes));
}


// Función para imprimir los resultados
function printResults() {
    window.print();
}
