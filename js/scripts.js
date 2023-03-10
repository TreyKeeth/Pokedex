
// An initial list of pokemon with with each pokemon having a name, height, and an array of types since each can 
// potentially have multiple types.
const pokemon = [
    { name: 'Rattata', height: 0.3, types: ['normal'] }, 
    { name: 'Charizard', height: 5.07, types: ['fire', 'flying'] },
    { name: 'Weedle', height: 0.3, types: ['bug', 'poison']},
    { name: 'Pikachu', height: 0.4, types: ['electric'] },
];

// Loop through each of pokemon display their name, height, and calling out that a pokemon is big when the height is 
// greater than 1.
for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].height < 1) {
        document.write(pokemon[i].name + ' ' + '(height) ' + pokemon[i].height + ' ' + "<br>")
    }
    if (pokemon[i].height >= 1) {
        document.write(pokemon[i].name + ' ' + '(height) ' + pokemon[i].height + ' ' + 'Wow, that\'s big!' + "<br>")
    }
    
    
}

