const Team = require('../models/Team')

module.exports = {

}

function addPokemon(req, res) {
    // not functional until endpoint is defined based on what is received from the user
    axios.get(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
    .then(function (response) {
        let foundPokemon = {
            name: response.data.name,
            dexNumber: response.data.id,
            sprite: response.data.sprites.front_default
        }
        // counter ++
        // console.log("count: ", counter, foundPokemon)
        // console.log(foundPokemon)
        return foundPokemon
    })
    .then(function (foundPokemon) {
        Team.findById(req.params.id)
            .then(function (foundTeam) {
                // console.log("count: ", counter, foundTeam)
                foundTeam.pokemon.push(foundPokemon)
                return foundTeam.save()
            })
    })
}


