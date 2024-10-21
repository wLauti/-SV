let selectedParty = ''; // Partido seleccionado
let voteCount = localStorage.getItem('voteCount') || 1;
let votesLeft = voteCount;
let votes = JSON.parse(localStorage.getItem('votes')) || { FRA: 0, AE: 0, Blanco: 0 };
let canVote = true;

function selectParty(party) {
    if (!canVote) {
        document.getElementById('message').textContent = 'Ya has votado, no puedes votar 2 veces.';
        return;
    }

    // Quitar selección de otros botones
    document.querySelectorAll('.voting-button').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(party).classList.add('selected');
    selectedParty = party;

    // Habilitar el botón de votar
    const voteButton = document.getElementById('voteButton');
    voteButton.disabled = false;
    voteButton.classList.add('enabled');
}

function submitVote() {
    if (selectedParty === '') {
        document.getElementById('message').textContent = 'Error, reinicia la página e intenta de nuevo.';
        return;
    }

    votes[selectedParty]++;
    votesLeft--;
    canVote = false;

    localStorage.setItem('votes', JSON.stringify(votes));

    document.getElementById('message').textContent = `Has votado por ${selectedParty}.`;

    // Deshabilitar el botón de votar después de votar
    const voteButton = document.getElementById('voteButton');
    voteButton.disabled = true;
    voteButton.classList.remove('enabled');
    voteButton.classList.add('disabled');

    if (votesLeft === 0) {
        window.location.href = 'resultados.html';
    }
}

// Permitir volver a votar presionando "0"
document.addEventListener('keydown', function (event) {
    if (event.key === '0' && !canVote && votesLeft > 0) {
        canVote = true;
        document.querySelectorAll('.voting-button').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('message').textContent = '';

        // Deshabilitar el botón de votar hasta que se seleccione un nuevo partido
        const voteButton = document.getElementById('voteButton');
        voteButton.disabled = true;
        voteButton.classList.remove('enabled');
    }
});

