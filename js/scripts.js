
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
        let listItem = document.createElement("list-group-item");
        let button = document.createElement("btn");
        listItem.classList.add("list-group-item");
        button.innerText = pokemon.name;
        button.classList.add("btn");
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
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    let modalContainer = document.querySelector("#modal-container");

    // display a modal once a pokemon is selected that displays the pokemon's name, height, types, image, and a close button
    function showModal(item) {
        pokemonRepository.loadDetails(item).then(function () {

            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            let closeButtonElement = document.createElement('btn');
            closeButtonElement.classList.add('btn-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            let pokemonName = document.createElement('h2')
            pokemonName.innerText = item.name;

            let pokemonHeight = document.createElement('p');
            pokemonHeight.innerText = "Height: " + item.height;

            let allTypes = "";
            item.types.forEach(function (types) {
                allTypes += [types.type.name + "<br>"];
            });

            let pokemonTypes = document.createElement('p');
            pokemonTypes.innerHTML = "Types: " + " " + allTypes + "<br>";

            let pokemonImage = document.createElement('img');
            pokemonImage.src = item.imageUrl;

            modal.appendChild(closeButtonElement);
            modal.appendChild(pokemonName);
            modal.appendChild(pokemonHeight);
            modal.appendChild(pokemonTypes);
            modal.appendChild(pokemonImage);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');

        });
    }


    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // close modal by pressing Escape/Esc key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains("is-visible")) {
            hideModal();
        }
    });

    // close modal by clicking outside of the modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

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





