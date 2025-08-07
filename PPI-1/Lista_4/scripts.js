const pokemonImg = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-btn');
const nextButton = document.getElementById('next-btn');
const successMessage = document.getElementById('success');
const errorMessage = document.getElementById('error');

function getRandomId() {
    return Math.floor(Math.random() * 250) + 1;
}

let id = getRandomId();

function carregarPokemon() {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    pokemonImg.src = imageUrl;
}
    
function toggleSuccessMessage(message) {
    if (message) {
        successMessage.textContent = message;
    } 

    successMessage.classList.toggle('hidden');
}

function toggleErrorMessage(message) {
    if (message) {
        errorMessage.textContent = message;
    }
    
    errorMessage.classList.toggle('hidden');
}

submitButton.addEventListener('click', () => {
    const guess = guessInput.value.trim().toLowerCase();
    if (guess) {

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokemon não encontrado');
                }
                return response.json();
            })
            .then(data => {
                const pokemonName = data.name.toLowerCase();
                if (pokemonName === guess) {

                    toggleSuccessMessage(`Você acertou!`);
                    pokemonImg.classList.add('revealed');
                } else {

                    toggleErrorMessage(`Você errou! Era ${pokemonName}`);
                }

                guessInput.disabled = true;
                submitButton.disabled = true;
                nextButton.disabled = false;
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao buscar Pokémon');
            });
    }
});

nextButton.addEventListener('click', () => {
    pokemonImg.classList.remove('revealed')
    id = getRandomId();
    carregarPokemon();
    guessInput.value = '';
    guessInput.disabled = false;
    submitButton.disabled = false;
    nextButton.disabled = true;
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
});

carregarPokemon();