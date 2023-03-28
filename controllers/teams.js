const Team = require('../models/Team')



module.exports = {
    index,
    new: newTeam,
   
    new: newTeam,
    create
}

function index(req, res, next) {
    Team.find({'user': req.user._id})
    .then(function(teams){
        res.render('teams/index', {teams, title: 'All Teams'})
    })


}

function newTeam(req, res, next){
    res.render('teams/new', {title: 'Create new team'})
}

function create(req, res, next){
    req.body.user = req.user._id
    Team.create(req.body)
    .then(function(newTeam){
        console.log(newTeam)
        res.redirect(`/teams`)
    })
    .catch(function(err){
        console.log(err)
        res.redirect('/teams')
    })
}