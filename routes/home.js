const router = require('express').Router()
const {checkAuthentication,checkNotAuthenticated} = require("../middleware/checkAuthentication")



router.get('/', checkAuthentication, async (req, res) => {
    // since req.user is giving a promise so we must await it
    const user = await req.user
    res.render("home",{text: `Welcome ${user.name}`})
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
