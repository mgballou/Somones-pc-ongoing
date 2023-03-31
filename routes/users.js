const express = require('express');
const router = express.Router();
const usersCtrl = require("../controllers/users")

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get("/:id", usersCtrl.show)

router.put('/:id', usersCtrl.update)


module.exports = router;

