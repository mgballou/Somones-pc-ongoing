const Team = require('../models/Team')
const Pokemon = require('../models/Pokemon')
const axios = require('axios')

let endpoint

module.exports = {
    create
}

function create(req, res) {
    // req.body.user = req.user._id
    console.log(req.body)
    let pokeArray = Object.values(req.body)
    let foundPokemon
    console.log(pokeArray)
    pokeArray.forEach(pokemon =>{
        endpoint = pokemon.toLowerCase()
        axios.get(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
        .then(function (response) {
           
            foundPokemon = {
                name: response.data.name,
                dexNumber: response.data.id,
                sprite: response.data.sprites.front_default,
                user: req.user._id,
                team: req.params.id
            }
            
            Pokemon.create(foundPokemon)
        })
        // .then(function (foundPokemon) {
        //     Team.findById(req.params.id)
        //         .then(function (foundTeam) {
        //             // console.log("count: ", counter, foundTeam)
        //             foundTeam.pokemon.push(foundPokemon)
        //             return foundTeam.save()
        //         })
        // })
    })

    // not functional until endpoint is defined based on what is received from the user
}


