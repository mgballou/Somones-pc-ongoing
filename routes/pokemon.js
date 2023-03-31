const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../controllers/pokemon')
const ensureLoggedIn = require('../config/ensureLoggedIn')

/// refactor this to have /pokmeon be the root of this route 


///// this route is no longer a restful route due to how we have changed our data model
// router.post('/teams/:id/pokemon', pokemonCtrl.create)

router.post('/pokemon', ensureLoggedIn, pokemonCtrl.create)

router.delete('/pokemon/:id', ensureLoggedIn, pokemonCtrl.delete)

router.get('/pokemon', ensureLoggedIn, pokemonCtrl.index)

router.get('/pokemon/new', ensureLoggedIn, pokemonCtrl.new)

router.get('/pokemon/:id', ensureLoggedIn, pokemonCtrl.edit)

router.put('/pokemon/:id', ensureLoggedIn, pokemonCtrl.update)

module.exports = router