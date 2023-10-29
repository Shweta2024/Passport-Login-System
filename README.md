<h3>Step1 : Use the local strategy</h3>

```js

    passport.use(new LocalStrategy(
        { usernameField: "email", passwordField: "password" }, authenticateUser))
    

``` 

- what is our usernameFiled called? > email in this case
- what is our passwordFiled called? > password
- authenticateUser -> its is a function which will be called to authenticate the user


<h3>Step2: Write the authenticateUser() method</h3>

- Get the user with the provided email from the database using getUserByEmail() & check the below cases:- 

    1. User not found with thr provided email.
    2. Password didn't matched.
    3. User found & password matched.

 ```
 authenticateUser(email, password, done)
 ```

done -> it's a function & will be called after we have authernticated a user

<br>

    done(serverError, userFound, message)

if we have no server error & user isn't found, then:-
    
    done(null,false,{message : "no user found"})

if we have no server error & user is found:-

    done(null,user)

if server error occurs:-

    done(err)

<h3>Step3: Use flash, session & passport</h3>

```js
    const flash = require("express-flash")
    const session = require("express-session")

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialize: false
    }))
    app.use(passport.initialize()) // initialize is a function inside passport, it set some of the basics
    app.use(passport.session())// since we want session to be persited over all the pages
    app.use(flash()) // make sure to use flash middleware before the routing because they gets access to the req or res or locals 

```
- **secret**: it is a secret key saved in .env file
- **resave**: do we want to save that session again if there isn't any changes
- **saveUninitialize**: do we want to save an empty session
    
<h3>Step4: Add passport authentication middleware to login route</h3>
//strategy, options

```js

// passport.authenticate(<strategyName>, <options>)
app.get('/login', passport.authenticate('local',{
    successRedirect: '/', // on successful login we get redirected to home page
    faliureRedirect: '/login', // if login falied we get redirected to login page
    faliureFlash: true // in case of any error we'll be displaying the respective error message that we have specified in the `authenticateUser` function
}))

```

- make changes in the login.ejs file so as to display the error messages in case of errors

```html

<!-- messages-> flash is going to set a variable messages, for all the messages
error -> passport is going to set the error, which is whatever error we get as specified in the `authenticateUser` function -->
<%if(messages.error)%>
    <%=messages.error%>
<%}%>

```

<h3>Step5: serializeUser & deserializeUser</h3>

```js

// serialize & deserialize
// serialize user to store inside of a session
passport.serializeUser((user,done) => done(null,user.id))
passport.deserializeUser((id,done) => done(null,getUserById(id)))


```
to display the name of the loggedIn user in the home page:-
```js

// since we are using session, so req.user is always going to contain the user which is authenticated for that moment
router.get('/', (req, res) => {
    res.render("home",{user: req.user.name})
})

```