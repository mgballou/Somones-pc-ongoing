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
    nickname: {
        type: String,
        default: ''
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    
}
)

module.exports = mongoose.model('Pokemon', pokemonSchema)