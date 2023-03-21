
// pokemonRepository variable for adding, retrieving, and printing the list of pokemons
let pokemonRepository = (function () {
    //initial list of pokemon
    let pokemonList = [
        { name: 'Pikachu', height: 0.4, types: ['electric'] },
        { name: 'Rattata', height: 0.3, types: ['normal'] }
    ];   
// function within IIFE to add pokemon or print error option if an invalid name value is provided
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            document.write("This is not a pokemon. Please enter a valid name." + "<br>");
        }
    }
// function to retrieve lists on pokemon in the array    
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll,
    };
})();

//function to display list of Pokemon on interface
function printPokemonList(pokemon) {
    if (pokemon.height < 1) {
                document.write(pokemon.name + ' ' + '(height) ' + pokemon.height + ' ' + "<br>")
            } 
            else {
                document.write(pokemon.name + ' ' + '(height) ' + pokemon.height + ' ' + 'Wow, that\'s big!' + "<br>")
            }
};

// adding pokemon to the array
pokemonRepository.add({ name: 'Charizard', height: 5.07, types: ['fire', 'flying'] });
pokemonRepository.add({ name: 'Weedle', height: 0.3, types: ['bug', 'poison'] });
// test to prompt the printing of the invalid Pokemon message in the add function within the IIFE
pokemonRepository.add();
// get of the pokemon list in the console
console.log(pokemonRepository.getAll()); 
// print the list of pokemon
pokemonRepository.getAll().forEach(printPokemonList);


