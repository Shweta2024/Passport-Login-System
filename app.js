const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000
const app = express()

app.set("view engine", "ejs")


// importing routes
const loginRoute = require("./routes/Login")
const registerRoute = require("./routes/Register")

// middlewares
app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use(bodyParser.urlencoded({extended:true}))


app.listen(PORT, (req, res) => {
    console.log(`server started at port: ${PORT}`)
})