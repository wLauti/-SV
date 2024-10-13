let selectedParty = ''; // Variable de el partido seleccionado
let voteCount = localStorage.getItem('voteCount') || 1;  // Inicializar voto único
let votesLeft = voteCount; // Los votos que faltan es igual a la cantidad voteCount
let votes = JSON.parse(localStorage.getItem('votes')) || { FRA: 0, AE: 0, Blanco: 0 }; // Agarra las variables de votos de cada partido del localStorage
let canVote = true; // Inicializa la variable canVote como verdadero

function selectParty(party) { // Funcion de cuando se selecciona un partido
    if (!canVote) {
        document.getElementById('message').textContent = 'Ya has votado.';
        return;
    }

    // Quitar selección de los otros botones
    document.querySelectorAll('.voting-button').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(party).classList.add('selected');
    selectedParty = party; 
}

function submitVote() { // Funcion de cuando votas mas veces de las permitidas
    if (selectedParty === '') {
        document.getElementById('message').textContent = 'Error, asegurate de haber seleccionado un partido y votar una sola vez.';
        return;
    }

    // Incrementar el voto del partido seleccionado
    votes[selectedParty]++;
    votesLeft--;
    canVote = false;  // Bloquear más votos

    // Guardar votos en localStorage
    localStorage.setItem('votes', JSON.stringify(votes));

    document.getElementById('message').textContent = `Has votado por ${selectedParty}.`;

    if (votesLeft === 0) {
        // Redirigir a resultados si ya no hay votos disponibles
        localStorage.setItem('votes', JSON.stringify(votes));
        window.location.href = 'resultados.html';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === '0' && !canVote && votesLeft > 0) {
        canVote = true;
        document.querySelectorAll('.voting-button').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('message').textContent = '';
    }
});

document.querySelector('body').addEventListener('click', function() {
    if (canVote) {
        submitVote();
    }
});
