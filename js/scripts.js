
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
        listItem.classList.add('list-group-item');
        let button = document.createElement("button");
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');

        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        })

        button.innerText = pokemon.name;
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
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
                showModal(item);
            }).catch(function (e) {
                console.error(e);
            });
        }

        function showDetails(pokemon) {
            loadDetails(pokemon).then(function () {
                showModal(pokemon);
            });
        }

        // display a modal once a pokemon is selected that displays the pokemon's name, height, types, image, and a close button
        function showModal(item) {
            let modalBody = $(".modal-body");
            let modalTitle = $(".modal-title");

            modalTitle.empty();
            modalBody.empty();

            let pokemonName = $("<h5>" + item.name + "</h5>");
            let pokemonHeight = $("<p>" + "Height : " + item.height + "</p>");

            let allTypes = "";
            item.types.forEach(function (types) {
                allTypes += [types.type.name + "<br>"];
            });

            let pokemonTypes = $("<p>" + "Types : " + allTypes + "</p>");
            let pokemonImage = $('<img class="modal-imgstyle=width:50%">');
            pokemonImage.attr("src", item.imageUrl);

            modalTitle.append(pokemonName);
            modalBody.append(pokemonHeight);
            modalBody.append(pokemonTypes);
            modalBody.append(pokemonImage);

        }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


   