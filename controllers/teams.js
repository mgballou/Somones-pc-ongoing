const Team = require('../models/Team')
const Pokemon = require('../models/Pokemon')



module.exports = {
    index,
    new: newTeam,
    create,
    show,
    delete: destroy,
    update
}

function index(req, res, next) {
    Team.find({ 'user': req.user._id })
        .populate('pokemon')
        .then(function (teams) {
            res.render('teams/index', { teams, title: 'All Teams' })
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })


}

function newTeam(req, res, next) {
    res.render('teams/new', { title: 'Create new team' })
}

function create(req, res, next) {
    req.body.user = req.user._id
    Team.create(req.body)
        .then(function (newTeam) {
            console.log(newTeam)
            res.redirect(`/teams`)
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/teams')
        })
}

function show(req, res) {
    let foundTeam
    Team.findById(req.params.id)
        .populate('pokemon')
        .then(function (team) {
            return foundTeam = team

        })
        .then(function (team) {
            return Pokemon.find({ _id: { $nin: team.pokemon }, 'user': req.user._id })

        })
        .then(function (allPokemon) {
            res.render('teams/show', { team: foundTeam, title: 'User Teams', allPokemon })

        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/teams')
        })
}

function destroy(req, res) {
    Team.deleteOne({_id: req.params.id})
        .then(function (result) {
            console.log(result)
            res.redirect('/teams')
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('teams')
        })

}

function update(req, res) {
    Team.findById(req.params.id)
        .then(function (foundTeam) {
            if (foundTeam.pokemon.length > 5) {
                return
            }
            foundTeam.pokemon.push(req.body.addPokemon)
            return foundTeam.save()
        })
        .then(function () {
            res.redirect(`/teams/${req.params.id}`)
        })
        .catch(function (err) {
            console.log(err)
        })
}