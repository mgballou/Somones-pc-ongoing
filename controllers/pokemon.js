const Team = require('../models/Team')
const Pokemon = require('../models/Pokemon')
const axios = require('axios')

let endpoint

module.exports = {
    create,
    delete: removePokemon,
    update,
    index,
    new: newPokemon,
    edit
}

function create(req, res) {
    // req.body.user = req.user._id
    // console.log(req.body)
    // let pokeArray = Object.values(req.body)
    let foundPokemon
    // console.log(pokeArray)

    if (typeof(req.body) !== Number){
        endpoint = req.body.name.toLowerCase()

    } else {
        endpoint = req.body.name
    }
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
            .then(function (newPokemon) {
                console.log(newPokemon)
                res.redirect('/pokemon')
            })
            .catch(function(err){
                console.log(err)
                res.redirect('/pokemon/new')
            })
                
   
   

}



function removePokemon(req, res) {
    let pokeId = req.params.id
    Team.find({ pokemon: pokeId })
        .then(function (team) {
            team.pokemon.pull(pokeId)
            return team.save()
        })
        .then(function (newTeam) {
            res.redirect(`/teams/${newTeam._id}`)
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/teams')
        })
}

function update(req, res) {
    
    Pokemon.find(req.params.id)
        .then(function (foundPokemon) {
            foundPokemon.nickname = req.body.nickname
            return foundPokemon.save()
        })
        .then(function () {
            res.redirect(`/pokemon`)
        })
        .catch(function (err) {
            console.log(err)
            res.redirect(`/pokemon`)
        })
}



function index(req, res) {
    Pokemon.find({ 'user': req.user._id })
        .then(function (pokemon) {
            res.render('pokemon/index', { pokemon, title: 'All Your Pokemon' })
        })
}


function newPokemon(req, res){
    res.render('pokemon/new', {title: 'Create a new pokemon'})
}

function edit(req, res){
    Pokemon.find({_id: req.params.id})
    .then(function(pokemon){
        // console.log(pokemon)
        res.render('pokemon/edit', {pokemon, title: "Edit Pokemon Details"})
    })
    .catch(function(err){
        console.log(err)
        res.redirect('/pokemon')
    })
}