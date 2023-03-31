const axios = require('axios')

const User = require("../models/User")

let endpoint 

module.exports = {
    addFavoritePokemon,
    show
}

function addFavoritePokemon(req, res){
    let foundPokemon
    endpoint = req.body.favorite.toLowerCase()
    axios.get(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
    .then(function(response){
        foundPokemon = {
             name: response.data.name,
             types: response.data.types,
             sprite: response.data.sprites.front_default
        }
        return foundPokemon
    } ).then(function (foundPokemon){
        User.findById(req.User._id)
        .then(function(foundUser){
            User.favorite=foundPokemon
            return User.save()
        })
        res.redirect(`/users/${req.user._id}`)
    }).catch(function (err){
        console.log(err)
    })
}

function show(req, res){
    // let user 
    // User.findById(req.user._id)
    // .then(function (foundUser){
    // })
    res.render("users/show", {title: "userPage"})
}