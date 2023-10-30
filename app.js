const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

app.set("view engine", "ejs")

//  initialize passport
initializePassport(passport)

// importing routes
const loginRoute = require("./routes/Login")
const registerRoute = require("./routes/Register")
const homeRoute = require("./routes/home")


// middlewares
app.use(bodyParser.urlencoded({ extended: true })) // make sure to use bodyParser before the router
app.use(session({
    secret: process.env.SESSION_SECRET || 'tempSecret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/home", homeRoute)

app.listen(PORT, (req, res) => {
    console.log(`server started at port: ${PORT}`)
})