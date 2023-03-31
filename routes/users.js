const express = require('express');
const router = express.Router();
const usersCtrl = require("../controllers/users")
const ensureLoggedIn = require('../config/ensureLoggedIn')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get("/:id", ensureLoggedIn, usersCtrl.show)

router.put('/:id', ensureLoggedIn, usersCtrl.update)


module.exports = router;

