const Team = require('../models/Team')
const Pokemon = require('../models/Pokemon')
const axios = require('axios')

let endpoint

module.exports = {
    create,
    delete: removePokemon,
    update
}

function create(req, res) {
    // req.body.user = req.user._id
    console.log(req.body)
    let pokeArray = Object.values(req.body)
    let foundPokemon
    console.log(pokeArray)
    pokeArray.forEach(pokemon => {
        endpoint = pokemon.toLowerCase()
        axios.get(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
            .then(function (response) {
                foundPokemon = {
                    name: response.data.name,
                    dexNumber: response.data.id,
                    sprite: response.data.sprites.front_default,
                    user: req.user._id,
                }
                Pokemon.create(foundPokemon)
            })
            .then(function(newPokemon){
                Team.find(req.params.id)
                .then(function(foundTeam){
                    foundTeam.pokemon.push(newPokemon._id)
                })
            })
    })
    res.redirect(`/teams/${req.params.id}`)

}


function removePokemon(req, res) {
    let pokeId = req.params.id
    Team.find({pokemon: pokeId})
    .then(function(team){
        team.pokemon.pull(pokeId)
        return team.save()
    })
    .then(function(newTeam){
        res.redirect(`/teams/${newTeam._id}`)
    })
    .catch(function(err){
        console.log(err)
        res.redirect('/teams')
    })
}

function update(req, res){
    let referencedTeamId
    Team.find({pokemon: foundPokemon})
    .then(function(team){        
        referencedTeamId = team._id
    })
    Pokemon.find(req.params.id)
    .then(function(foundPokemon){
        foundPokemon.nickname = req.body.nickname
        return foundPokemon.save()
    })
        .then(function(){
        res.redirect(`/teams/${referencedTeamId}`)
    })
    .catch(function(err){
        console.log(err)
        res.redirect(`/teams/${referencedTeamId}`)
    })
}