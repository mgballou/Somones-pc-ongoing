require('dotenv').config();
require('./config/database');

const Pokemon = require('./models/Pokemon')
const Team = require('./models/Team')
const Item = require('./models/Item')

const axios = require('axios')
const Nature = require('./models/Nature')

const apiPath = 'https://pokeapi.co/api/v2/'
const itemEndpoint = 'item-attribute/7/'
const naturesEndpoint = 'nature/?limit=100'


let allItems = []

let allNatures = []
let naturesData

function getAllItems() {
    axios.get(apiPath + itemEndpoint)
        .then(function (response) {

            allItems = response.data.items.map(item => {
                return {
                    name: item.name
                }
            })
            console.log(allItems)
            return allItems
        })
        .catch(function (err) {
            console.log(err)
        })

}


function getNatureData() {
    axios.get(apiPath + naturesEndpoint)
        .then(function (response) {
            naturesData = response.data.results
            return getNestedNaturesInfo(naturesData)
        })
        .catch(function (err) {
            console.log(err)
        })
}

function getNestedNaturesInfo(array) {
    let promiseArray = array.map(nature => {
        return axios.get(nature.url)
    })

    Promise.all(promiseArray)
        .then(function (responsesArray) {
            responsesArray.forEach(response => {
                let natureObject = {
                    name: response.data.name
                }
                if (response.data.increased_stat === null) {
                    natureObject.statUp = 'none'
                    natureObject.statDown = 'none'
                } else {
                    natureObject.statUp = response.data.increased_stat.name
                    natureObject.statDown = response.data.decreased_stat.name
                }
                allNatures.push(natureObject)
            })
            return allNatures
        })
        .then(function(){
            console.log(allNatures)
        })
        .catch(function (err) {
            console.log(err)
        })

}

function seedDatabase() {
    Pokemon.deleteMany({})
        .then(function (results) {
            console.log(results)
        })
        .then(function () {
            return Team.deleteMany({})
        })
        .then(function (response) {
            console.log(response)
            return Item.create(allItems)
        })
        .then(function (result) {
            console.log(result)
            return Nature.create(allNatures)
        })
        .then(function(outcome){
            console.log(outcome)
        })
        .catch(function (err) {
            console.log(err)
        })
        .finally(function () {
            process.exit()
        })
}


getAllItems()


getNatureData()

seedDatabase()

