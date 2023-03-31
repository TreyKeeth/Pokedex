
// IIFE for adding, retrieving, and printing the list of pokemons
let pokemonRepository = (function () {
    let pokemonList = [];  
    // API where Pokemon information is pulled from
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === "object" &&
            'name' in pokemon
            ) {
            pokemonList.push(pokemon);
        } else {
            document.write("This is not a pokemon. Please enter a valid name." + "<br>");
        }
    }
   
    function getAll() {
        return pokemonList;
    }
    // adding a listing of buttons for each pokemon from the API
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener("click", function (event) {
            showDetails(pokemon);
        })
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList, 
        loadDetails: loadDetails, 
        showDetails: showDetails, 
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



