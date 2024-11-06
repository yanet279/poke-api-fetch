const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelectorAll(".previous");
const next = document.querySelectorAll(".next");

let limit = 8;
let offset = 1;

previous.forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        if (offset > 1) {
            offset -= 9;
            removeChildNodes(pokemonContainer);
            fetchPokemons(offset, limit);
        }
    });
});

next.forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        offset += 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    });
});

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function fetchPokemons(offset, limit) {
    console.log(`Fetching Pokémon from offset: ${offset}, limit: ${limit}`);
}

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
        createPokemon(data);
        spinner.style.display = "none";
    });
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `N°${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");

    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++) {
        // -----Obtengo la información de cada pokemon y la guardo en cada etiqueta de html
        const stat = stats[i];

        const statPercent = stat.base_stat / 2 + "%";
        
        // Contenedor de la información del pokemon
        const statContainer = document.createElement("stat-container");
        statContainer.classList.add("stat-container");

        // Titulo de los detalles
        const statName = document.createElement("p");
        statName.textContent = stat.stat.name;

        // franja de medida
        const progress = document.createElement("div");
        progress.classList.add("progress");

        const progressBar = document.createElement("div");
        //Agrego una clase  
        progressBar.classList.add("progress-bar");
        // Agregamos atributos a las etiquetas
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        // ------Agregamos el contenido en el container de información del pokemon
        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);

        statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}

//remueve los pokemon y pone otro en su lugar
function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);
