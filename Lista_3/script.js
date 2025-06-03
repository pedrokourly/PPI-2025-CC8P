const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("pokemonInput");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const pokemonCard = document.getElementById("pokemonCard");

const pokemonName = document.getElementById("pokemonName");
const pokemonNumber = document.getElementById("pokemonNumber");
const pokmeonSprite = document.getElementById("pokemonSprite");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonTypes = document.getElementById("pokemonTypes");

searchBtn.addEventListener("click", () => {
    const pokemonValue = searchInput.value.toLowerCase();

    if (!pokemonValue) {
        alert("Please enter a Pokémon name or number.");
        return;
    }

    loading.style.display = "block";
    error.style.display = "none";

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokemón não encontrado.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            pokemonName.textContent = data.name;
            pokemonNumber.textContent = `#${data.id}`;
            pokmeonSprite.src = data.sprites.front_default;
            pokemonHeight.textContent = `Height: ${data.height / 10} m`;
            pokemonWeight.textContent = `Weight: ${data.weight / 10} kg`;

            const types = data.types.map(typeInfo => typeInfo.type.name).join(", ");
            pokemonTypes.textContent = `Types: ${types}`;

            loading.style.display = "none";
            pokemonCard.style.display = "block";
        })
        .catch(err => {
            error.style.display = "block";
            error.textContent = err.message;
            loading.style.display = "none";
        });
});