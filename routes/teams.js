const express = require('express');
const router = express.Router();
const teamsCtrl = require('../controllers/teams')
const ensureLoggedIn = require('../config/ensureLoggedIn')



router.get('/', ensureLoggedIn, teamsCtrl.index)

router.get('/new', ensureLoggedIn, teamsCtrl.new)

router.get('/:id', ensureLoggedIn, teamsCtrl.show)

router.post('/', ensureLoggedIn, teamsCtrl.create)

router.delete('/:id', ensureLoggedIn, teamsCtrl.delete)

router.put('/:id', ensureLoggedIn, teamsCtrl.update)

module.exports = router