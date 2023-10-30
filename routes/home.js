const router = require('express').Router()
const {checkAuthentication,checkNotAuthenticated} = require("../middleware/checkAuthentication")



router.get('/', checkAuthentication, (req, res) => {
    console.log(req.user.name)
    res.render("home",{text: `Welcome ${req.user.name}`})
})

router.post('/', (req, res,next) => {
    // it is a built-in function in passport that clears the session
    req.logOut(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('login')
    })
})

module.exports = router
