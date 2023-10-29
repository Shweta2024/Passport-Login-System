const router = require('express').Router()

// middleware to check if the current user is authenticated
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.render('home', { text: "Forbidden" })
    // res.redirect('/login')
}

router.get('/', checkAuthentication, (req, res) => {
    res.render("home",{text: `Welcome ${req.user.name}`})
})

module.exports = router