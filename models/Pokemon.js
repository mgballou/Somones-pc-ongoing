const mongoose = require('mongoose')


const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dexNumber: {
        type: Number,
        required: true
    },
    sprite: {
        type: String,
        required: true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    team: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
}
)

module.exports = mongoose.model('Pokemon', pokemonSchema)