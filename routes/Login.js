const express = require("express")
const passport = require("passport")
const router = express.Router()
const {checkAuthentication,checkNotAuthenticated} = require("../middleware/checkAuthentication")

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render("login")
})

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router