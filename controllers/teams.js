const Team = require('../models/Team')



module.exports = {
    index,
    new: newTeam,
    create,
    show,
    delete: destroy
}

function index(req, res, next) {
    Team.find({'user': req.user._id})
    .populate('pokemon')
    .then(function(teams){
        res.render('teams/index', {teams, title: 'All Teams'})
    })
    .catch(function(err){
        console.log(err)
        res.redirect('/')
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

function show(req, res) {
    Team.findById(req.params.id)
    .populate('pokemon')
    .then(function(team){
        res.render('teams/show', {team, title: 'User Teams'})

    })
    .catch(function(err){
        console.log(err)
        res.redirect('/teams')
    })
}

function destroy(req, res){
    Team.deleteOne(req.params.id)
    .then(function(result){
        console.log(result)
        res.redirect('/teams')
    })
    .catch(function(err){
        console.log(err)
        res.redirect('teams')
    })

}

