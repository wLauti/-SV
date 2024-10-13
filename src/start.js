function startVoting() { /* Abro funcion startVoting() */

    const voteCount = document.getElementById('voteCount').value; /* Defino variable constante voteCount que la saco de la input del html */

    if (voteCount > 0) { /* Si votos > 0 */

        localStorage.setItem('voteCount', voteCount); /* Guarda la cantidad de votos */
        window.location.href = 'votacion.html'; /* Cambia la ubicacion URL a la de votacion.html */

    } else { /* Si votos no es > 0 */

        alert('Error, ingrese un numero de votantes mayor a 0.'); /* Envia una alerta */

    }
}
