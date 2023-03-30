const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../controllers/pokemon')

/// refactor this to have /pokmeon be the root of this route 


///// this route is no longer a restful route due to how we have changed our data model
// router.post('/teams/:id/pokemon', pokemonCtrl.create)

router.post('/pokemon', pokemonCtrl.create)

router.delete('/pokemon/:id', pokemonCtrl.delete)

router.get('/pokemon', pokemonCtrl.index)

router.get('/pokemon/new', pokemonCtrl.new)

router.get('/pokemon/:id', pokemonCtrl.edit)

router.put('/pokemon/:id', pokemonCtrl.update)

module.exports = router