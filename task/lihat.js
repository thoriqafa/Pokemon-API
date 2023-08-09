// Displaying pokemon images from this url:
// "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
const allPokemonContainer = document.querySelector('.all-pokemon-container');
function getAllPokemonImgs() {
    let allPokemonImgs = '';
    // 802 Pokemon with images available
    for (var i = 1; i <= 802; i++) {
        allPokemonImgs += `
      <img class='pokemon-img' data-id=${i} src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png'>
    `;
    }
    allPokemonContainer.innerHTML = allPokemonImgs;
}
getAllPokemonImgs();


// Getting id for displaying evolved Pokemon url
// INPUT 'str' example: 'https://pokeapi.co/api/v2/pokemon-species/121/'
// OUTPUT: 'str' id example: '121'
const getImageId = (urlStr) => {
    let regex = /[^v]\d/;  // looking for a number that doesn't with a 'v' before it,
    let searchIdx = urlStr.search(regex) // gives index position
    // grabbing the numbers inbetween the forward slashes
    let evoId = urlStr.slice(searchIdx + 1, -1);
    return evoId;
}


// Event Listener from all available Pokemon section
// fetches Pokemon api data with image #, for stats section
const selectedPokemon = document.querySelectorAll('.pokemon-img');
selectedPokemon.forEach((pokemon) => {
    pokemon.addEventListener('click', function () {
        const pokemonId = pokemon.getAttribute('data-id');
        fetchFeaturedPokemon(pokemonId);
    });
})


// Setting an array of the evolution chain data
// INPUT: {object} evolution data from the selected pokemon
// OUTPUT: [Array] of {Objs}&[nested Array of {Objs}]: evolution chain of pokemon
//    {Ojbs} = single evolution path
//    [nested Array of {Objs}] = multiple evolution paths
// output example: [oddish, gloom, [vileplume, bellossom]
const setEvoChainArr = (data) => {
    // console.log(data);

    // Set 2 arrays: 1 for tracking api data, 1 for returning formatted data
    // Initialize both with base pokemon
    let trackingApiData = [data.chain];
    let evoId = getImageId(data.chain.species.url);
    // let nextEvoData;
    let evoChainFormattedData = [{
        id: evoId,
        name: data.chain.species.name,
    }];

    // loop through tracking api data array,
    // pokemon can go through max of 2 evolutions
    let maxEvo = 2;
    for (var i = 0; i < maxEvo; i++) {

        if (trackingApiData[i].evolves_to.length > 1) {
            // First, checks is there are multiple paths of evolution, like in the case of Eevee or Oddish

            // API data example #1: Eevee
            // const poke1 = data.chain.species.name; // eevee
            // const poke2 = data.chain.evolves_to[0].species.name; // vaporeon
            // const poke3 = data.chain.evolves_to[1].species.name; // jolteon
            // const poke4 = data.chain.evolves_to[2].species.name; // flareon
            // -------------------------------
            // evoChainFormattedData = [eevee, [vaporeon, jolteon, flareon, ...]]

            // API data example #2: Oddish
            // const poke1 = data.chain.species.name; // oddish
            // const poke2 = data.chain.evolves_to[0].species.name; // gloom
            // const poke3 = data.chain.evolves_to[0].evolves_to[0].species.name; // vileplume
            // const poke4 = data.chain.evolves_to[0].evolves_to[1].species.name; // bellossom
            // -------------------------------
            // evoChainFormattedData = [oddish, gloom, [vileplume, bellossom]

            let multiEvoPath = [];
            trackingApiData[i].evolves_to.forEach((pokemon) => {
                trackingApiData.push(pokemon);
                evoId = getImageId(pokemon.species.url);
                multiEvoPath.push({
                    id: evoId,
                    name: pokemon.species.name,
                });
            });
            evoChainFormattedData.push(multiEvoPath);

        } else {
            // Then formats for single evolution path

            // API data example: Bulbasaur
            // const poke1 = data.chain.species.name; // bulbasaur
            // const poke2 = data.chain.evolves_to[0].species.name; // ivysaur
            // const poke3 = data.chain.evolves_to[0].evolves_to[0].species.name; // venusaur

            // Checks api data if there are any values available for this pokemon's evolution
            if (trackingApiData[i].evolves_to.length) {
                let nextEvoData = trackingApiData[i].evolves_to[0];
                trackingApiData.push(nextEvoData);
                evoId = getImageId(nextEvoData.species.url);
                evoChainFormattedData.push({
                    id: evoId,
                    name: nextEvoData.species.name,
                    // multiPaths: false
                });
            } else {
                // end early if this pokemon doesn't have any other evolutions
                i = maxEvo;
            }
        }
    }
    return evoChainFormattedData;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


// Extracting pre evolved pokemon data
// INPUT: 'str' of selected pokemon, [Array] of {Objs}&[nested Array of {Objs}] of formatted evolution chain data
//   {Ojbs} = single evolution path
//   [nested Array of {Objs}] = multiple evolution paths
//   example: [oddish, gloom, [vileplume, bellossom]
// OUTPUT: {object} of next evolved pokemon data
const getPreEvoData = (pokemonName, evoChainArr) => {
    for (var i = 0; i < evoChainArr.length; i++) {
        if (evoChainArr[i].name === pokemonName) {
            // Finds selected pokemon, if pokemon is found then this pokemon has a single evolution path
            if (i == 0) {
                return {
                    id: evoChainArr[0].id,
                    name: evoChainArr[0].name,
                    evoStatus: 'Base Evolution:  ',
                    isBookendEvo: true
                }
            } else {
                return {
                    id: evoChainArr[i - 1].id,
                    name: evoChainArr[i - 1].name,
                    evoStatus: 'Previous evolution:  ',
                    isBookendEvo: false
                }
            }
        } else {
            // if cannot find pokemon's name, the data is a nested array (multiple evolution path)
            for (var j = 0; j < evoChainArr[i].length; j++) {
                // finds the selected pokemon in the nested array
                if (evoChainArr[i][j].name === pokemonName) {
                    return {
                        id: evoChainArr[i - 1].id,
                        name: evoChainArr[i - 1].name,
                        evoStatus: 'Previous evolution:  ',
                        isBookendEvo: false
                    }
                }
            }
        }
    };
}


// Extracting next evolved pokemon data
// INPUT: 'str' of selected pokemon, [Array] of {Objs}&[nested Array of {Objs}] of formatted evolution chain data
//   {Ojbs} = single evolution path
//   [nested Array of {Objs}] = multiple evolution paths
//   example: [oddish, gloom, [vileplume, bellossom]
// OUTPUT: {object} of next evolved pokemon data
const getNextEvoData = (pokemonName, evoChainArr) => {
    for (var i = 0; i < evoChainArr.length; i++) {
        if (evoChainArr[i].name === pokemonName) {
            // Finds selected pokemon, if pokemon is found then this pokemon has a single evolution path

            // check if the next pokemon has a single or multiple evolution path
            if (Array.isArray(evoChainArr[i + 1])) {
                // true = multiple paths (nested array)

                // randomly display another pokemon in the nested array
                let randomIdx = getRandomInt(0, evoChainArr[i + 1].length);
                return {
                    id: evoChainArr[i + 1][randomIdx].id,
                    name: evoChainArr[i + 1][randomIdx].name,
                    evoStatus: 'One of possible evolution:  ',
                    isBookendEvo: false
                }
            } else {
                // false = single path (object)

                // checks if pokemon is at end of the evolution chain
                if (i == evoChainArr.length - 1) {
                    // return the same pokemon, because it is at full evolution
                    return {
                        id: evoChainArr[i].id,
                        name: evoChainArr[i].name,
                        evoStatus: 'Fully evolved:  ',
                        isBookendEvo: true
                    }
                } else {
                    // return the next pokemon in the evolution chain
                    return {
                        id: evoChainArr[i + 1].id,
                        name: evoChainArr[i + 1].name,
                        evoStatus: 'Next evolution:  ',
                        isBookendEvo: false
                    }
                }
            }

        } else {
            // if cannot find pokemon's name, the data is a nested array (multiple evolution path)
            // output the same pokemon, because these pokemon are at it's final evolution
            for (var j = 0; j < evoChainArr[i].length; j++) {
                // finds the selected pokemon in the nested array
                if (evoChainArr[i][j].name === pokemonName) {
                    return {
                        id: evoChainArr[i][j].id,
                        name: evoChainArr[i][j].name,
                        evoStatus: 'Fully evolved:  ',
                        isBookendEvo: true
                    }
                }
            }
        }
    };
}


// Template for displaying selected Pokemon
// INPUT: {object} of pokemon from api data
// OUTPUT example: displays bulbasaur
const pokemonContainer = document.querySelector('.pokemon-container');
const displaySelectedPokemon = (data) => {
    const pokemonMoves = data.moves.map(move => move.move.name);
    const pokemonMovesStr = pokemonMoves.join(', ');
    const pokemonTypes = data.types.map(type => type.type.name);
    const pokemonTypesStr = pokemonTypes.join(', ');
    let output = '';
    // Checks whether back image is available and displays accordingly
    if (data.sprites.back_default) {
        output += `
      <h2 class='pokemon-name'>${data.species.name}</h2>
      <p class='pokemon-type'>Type: ${pokemonTypesStr}</p>
      <div class='pokemon-moves'>
        <p class='pokemon-moves-text'><strong>Moves: </strong>${pokemonMovesStr}</p>
      </div>
      <div class='pokemon-img-container'>
        <img src='${data.sprites.front_default}' />
        <img src='${data.sprites.back_default}' />
      </div>
      `
    } else {
        output += `
      <h2>${data.species.name}</h2>
      <p class='pokemon-type'>Type: ${pokemonTypesStr}</p>
      <div class='pokemon-moves'>
        <p class='pokemon-moves-text'><strong>Moves: </strong>${pokemonMovesStr}</p>
      </div>
      <div class='pokemon-img-container'>
        <img src='${data.sprites.front_default}' />
      </div>
      `
    }
    pokemonContainer.innerHTML = output;
}


// Template for displaying the pre-evolved Pokemon
// INPUT: {object} of pokemon from formatted data
// OUTPUT example: displays pichu
const displayPreEvoData = (preEvoData) => {
    const preEvoContainer = document.querySelector('.pre-evo-container');
    let output = '';
    output += `
    <img class='pre-evo-img'
      src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${preEvoData.id}.png'
      data-is-disabled=${preEvoData.isBookendEvo} />
    <p class='evolution-desc' data-is-base=${preEvoData.isBookendEvo}>${preEvoData.evoStatus}</p>
    <span class='evolution-name'>${preEvoData.name}</span>
    `
    preEvoContainer.innerHTML = output;
    return preEvoData.id;
}


// Template for displaying the evolved Pokemon
// INPUT: {object} of pokemon from formatted data
// OUTPUT example: displays ivysaur, pokemon id
const displayNextEvoData = (nextEvoData) => {
    const nextEvoContainer = document.querySelector('.next-evo-container');
    let output = '';
    output += `
    <p class='evolution-desc' data-is-base=${nextEvoData.isBookendEvo}>${nextEvoData.evoStatus}</p>
    <span class='evolution-name'>${nextEvoData.name}</span>
    <img class='next-evo-img'
      src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextEvoData.id}.png'
      data-is-disabled=${nextEvoData.isBookendEvo} />
    `
    nextEvoContainer.innerHTML = output;
    return nextEvoData.id;
}


// #1 - First fetch request of API data
// Get the data for displaying stats of selected Pokemon
// INPUT: 'str' of id from selected Pokemon
// Fetch INPUT example: https://pokeapi.co/api/v2/pokemon/1/
// OUTPUT: {object} of selected Pokemon's api data
const fetchFeaturedPokemon = (pokemonId => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            displaySelectedPokemon(data);
            getEvolutionChainUrl(data.species.name).catch(err => console.error(err));
        })
        .catch(err => {
            console.error(err);
        });
});


// #2 - Second fetch request of API data
// Extract the evolution chain url
// INPUT: 'str' of selected Pokemon's name (bulbasaur)
// Fetch INPUT example: https://pokeapi.co/api/v2/pokemon-species/bulbasaur/
// OUTPUT: {object} of selected Pokemon's species data
async function getEvolutionChainUrl(pokemonName) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
    const data = await res.json();
    // console.log(data)
    // #3 - Third fetch request of API data
    // Get the evolution chain data of selected Pokemon
    // INPUT: 'str' url for selected pokemon's evolution chain api
    // Fetch INPUT example: https://pokeapi.co/api/v2/evolution-chain/1/
    // OUTPUT: {object} of selected Pokemon's evolution chain data
    fetch(data.evolution_chain.url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const evoChainArr = setEvoChainArr(data);
            // Grabbing and displaying previous and next evo pokemon

            const preEvoData = getPreEvoData(pokemonName, evoChainArr);
            const preEvoId = displayPreEvoData(preEvoData);
            const preEvoImage = document.querySelector('.pre-evo-img');
            preEvoImage.addEventListener('click', function () {
                // Update featured pokemon stats when clicking on previous evo Pokemon image
                let isAtBase = preEvoImage.nextElementSibling.dataset.isBase;
                isAtBase === "true" ? null : fetchFeaturedPokemon(preEvoId);
            });

            const nextEvoData = getNextEvoData(pokemonName, evoChainArr);
            const nextEvoId = displayNextEvoData(nextEvoData);
            const nextEvoImage = document.querySelector('.next-evo-img');
            nextEvoImage.addEventListener('click', function () {
                // Update featured pokemon stats when clicking on next evo Pokemon image
                fetchFeaturedPokemon(nextEvoId);
            });
        })
        .catch(err => {
            console.error(err);
        })
}