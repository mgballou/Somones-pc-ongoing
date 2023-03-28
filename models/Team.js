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
    }
}
)

const teamSchema = new mongoose.Schema({
    name: String,
    pokemon: [pokemonSchema],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

})


module.exports = mongoose.model('Team', teamSchema)