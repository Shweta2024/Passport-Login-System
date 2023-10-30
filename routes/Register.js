const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const users = require("../user")
const {checkAuthentication,checkNotAuthenticated} = require("../middleware/checkAuthentication")

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render("register")
})

router.post('/', checkNotAuthenticated, async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password,10)// no. of times to perform hash
        const newUser = await users.push({
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword
        })
        res.redirect("/login")
    }
    catch (err) {
        console.log(err.message)
        res.redirect("/register")
    }
})


module.exports = router