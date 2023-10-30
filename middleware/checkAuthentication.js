// if user is authenticated then they don't need to get access to login or register,so they'll be redirected to home page
// else they will be continuting whatever they were doing i.e. either login or register
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('home')
    }
    next()
}

// middleware to check if the current user is authenticated
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.render('home', { text: "Forbidden" })
    // res.redirect('/login')
}

module.exports = {checkAuthentication, checkNotAuthenticated}