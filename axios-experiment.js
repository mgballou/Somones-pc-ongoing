const axios = require('axios')

require('dotenv').config()
require('./config/database')

const mongoose = require('mongoose')

const Team = require('./models/Team')
const User = require('./models/User')


const pokePath = 'https://pokeapi.co/api/v2/pokemon/'
let endpoint
let teamId = '64234eadaf28704c3d6517a6'

// const user = '64235a439752593bca261cf9' // Matthew's user ObjectId from database

// const requestBody = {
//     name: 'Awesome',
//     user: user
// }

const pokeIds = [359, 196, 3, 448, 445, 130]

// function createTeam(userInput) {
//     Team.create(userInput)
//         .then(function (newTeam) {
//             console.log(newTeam)
//             teamId = newTeam._id
//         })
//         .catch(function (err) {
//             console.log(err)
//         })
// }

function addPokemon(arrayofIds) {
    let counter = 0
    arrayofIds.forEach((pokemon) => {
        
        endpoint = pokemon
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
                Team.findById(teamId)
                    .then(function (foundTeam) {
                        // console.log("count: ", counter, foundTeam)
                        foundTeam.pokemon.push(foundPokemon)
                        return foundTeam.save()
                    })
            })
                 
    })
   
    
}

// createTeam(requestBody)
addPokemon(pokeIds)