const axios = require('axios')
const Team = require('./models/Team')

const pokePath = 'https://pokeapi.co/api/v2/pokemon/'
let endpoint

const user = '64235a439752593bca261cf9' // Matthew's user ObjectId from database

const requestBody = {
    name: 'Awesome',
    user: user
}

const pokeIds = [359, 196, 3, 448, 445, 130]

function createTeam(userInput) {
    Team.create(userInput)
        .then(function (newTeam) {
            console.log(newTeam)
        })
        .catch(function (err) {
            console.log(err)
        })
}

function addPokemon(arrayofIds) {
    arrayofIds.forEach((pokemon) => {
        endpoint = pokemon
        axios.get(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
            .then(function (response) {
                foundPokemon = response.data
                console.log('pokemon: ', foundPokemon.name, "Dex #: ", foundPokemon.id)
            })
            .catch(function (err) {
                console.log(err)
            })
    })
}


addPokemon(pokeIds)