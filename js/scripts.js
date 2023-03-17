
// pokemonRepository variable for adding, retrieving, and printing the list of pokemons
let pokemonRepository = (function () {
    let pokemonList = []; 

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

// function to print the list of pokemon in the array and also call out they are big if heigth is greater than 1    
    function print() {
        for (let i = 0; i < pokemonList.length; i++) {
            if (pokemonList[i].height < 1) {
                document.write(pokemonList[i].name + ' ' + '(height) ' + pokemonList[i].height + ' ' + "<br>")
            }
            if (pokemonList[i].height >= 1) {
                document.write(pokemonList[i].name + ' ' + '(height) ' + pokemonList[i].height + ' ' + 'Wow, that\'s big!' + "<br>")
            }
        }
    }
    return {
        add: add,
        getAll: getAll,
        print: print
    };
})();
// adding pokemon to the array
pokemonRepository.add({ name: 'Pikachu', height: 0.4, types: ['electric'] });
pokemonRepository.add({ name: 'Rattata', height: 0.3, types: ['normal'] });
pokemonRepository.add({ name: 'Charizard', height: 5.07, types: ['fire', 'flying'] });
pokemonRepository.add({ name: 'Weedle', height: 0.3, types: ['bug', 'poison'] });
// test to prompt the printing of the invalid Pokemon message in the add function within the IIFE
pokemonRepository.add();
// get of the pokemon list in the console
console.log(pokemonRepository.getAll()); 
// print the list of the pokemon
pokemonRepository.print();


