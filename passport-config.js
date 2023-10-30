const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const Users = require("./user")

async function getUserById(id) {
    for (let i = 0; i < Users.length; i++){
        if (Users[i].id === id)
            return Users[i]
    }
    return null
}

async function getUserByEmail(email) {
    for (let i = 0; i < Users.length; i++){
        if (Users[i].email === email)
            return Users[i]
    }
    return null
}

async function authenticateUser(email, password, done) {
    try {
        const user = await getUserByEmail(email)

        if (user == null)
            return done(null, false, { message: "No user with that email exists!" })
        if (await bcrypt.compare(password, user.password))
            return done(null, user)
        else
            return done(null, false, { message: "Incorrect password!" })
    }    
    catch (err) {
        return done(err)
    }
}

function initialize(passport) {
    //  use LocalStrategy
    passport.use(new LocalStrategy(
        { usernameField: "email", passwordField: "password" }, authenticateUser))
    
    // serialize & deserialize
    // serialize user to store inside of a session
    passport.serializeUser((user,done) => done(null,user.id))
    passport.deserializeUser((id,done) => done(null,getUserById(id)))
}

module.exports = initialize