
// pokemonRepository variable for adding, retrieving, and printing the list of pokemons
let pokemonRepository = (function () {
    //initial list of pokemon
    let repository = [
        { name: 'Pikachu', height: 0.4, types: ['electric'] },
        { name: 'Rattata', height: 0.3, types: ['normal'] }
    ];   
// function within IIFE to add pokemon or print error option if an invalid name value is provided
    function add(pokemon) {
        if (typeof pokemon === "object" &&
            'name' in pokemon &&
            'height' in pokemon && 
            'types' in pokemon
            ) {
            repository.push(pokemon);
        } else {
            document.write("This is not a pokemon. Please enter a valid name." + "<br>");
        }
    }
// function to retrieve lists on pokemon in the array    
    function getAll() {
        return repository;
    }
// function to print list of all pokemon and also show pokemon information in the console for a pokemon when their 
// associated button is clicked
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }
//function to show pokemon information in console
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

// adding pokemon to the array
pokemonRepository.add({ name: 'Charizard', height: 5.07, types: ['fire', 'flying'] });
pokemonRepository.add({ name: 'Weedle', height: 0.3, types: ['bug', 'poison'] });
// test to prompt the printing of the invalid Pokemon message in the add function within the IIFE
pokemonRepository.add();
// get of the pokemon list in the console
console.log(pokemonRepository.getAll()); 
// print the list of pokemon
// pokemonRepository.getAll().forEach(printPokemonList);
// print the list of pokemon
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});


