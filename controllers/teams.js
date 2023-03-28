const Team = require('../models/Team')



module.exports = {
    index,
    new: newTeam,
   
}

function index(req, res, next) {
    res.render('teams/index', {title: 'All Teams'})


}

function newTeam(req, res, next){
    res.render('teams/new', {title: 'Create new team'})


}