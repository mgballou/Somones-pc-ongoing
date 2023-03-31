const Team = require('../models/Team')
const Pokemon = require('../models/Pokemon')
const axios = require('axios')

let endpoint

module.exports = {
    create,
    delete: destroy,
    update,
    index,
    new: newPokemon,
    edit
}

function create(req, res) {
    if (req.body.name > 1008){
        res.redirect('/pokemon/new')
    }
    
    let foundPokemon
    let randomInt = Math.floor(Math.random() * 10)
    
    
    if (typeof (req.body) !== Number) {
        endpoint = req.body.name.toLowerCase()

    } else {
        endpoint = req.body.name
    }
    axios.get(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
        .then(function (response) {
            foundPokemon = {
                name: response.data.name,
                dexNumber: response.data.id,
                user: req.user._id,
                sprite: response.data.sprites.front_default
            }
            if (randomInt === 1) {
                foundPokemon.sprite = response.data.sprites.front_shiny
            }
            Pokemon.create(foundPokemon)
        })
        .then(function (newPokemon) {
            console.log(newPokemon)
            res.redirect('/pokemon')
        })
        .catch(function (err) {
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

    Pokemon.findById(req.params.id)
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


function newPokemon(req, res) {
    res.render('pokemon/new', { title: 'Create a new pokemon' })
}

function edit(req, res) {
    Pokemon.findById({ _id: req.params.id })
        .then(function (pokemon) {
            // console.log(pokemon)
            res.render('pokemon/edit', { pokemon, title: "Edit Pokemon Details" })
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/pokemon')
        })
}

function destroy(req, res) {
    Pokemon.deleteOne(req.body.id)
        .then(function (results) {
            console.log(results)
            res.redirect('/pokemon')
        })
}