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


<h3>Step6: Forbidden home route to the unauthenticated users</h3>

- Forbidden home route to the unauthenticated users

```js

// this is a middleware: if the user is authenticated we pass the control to the next middleware
// else we display 'Forbidden' message in the home route 
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.render('home', { text: "Forbidden" })
    // res.redirect('/login') // uncomment this & comment the above line, if want to redirect unauthenticated users to 'login page' instead of displaying a forbidden message 
}

// add the 'checkAuthentication' middleware to the get method of home route
// now if the user is authenticated then the control passes to the next middleware which is written below that displays 'Welcome' message along with the name of the user
router.get('/', checkAuthentication, (req, res) => {
    res.render("home",{text: `Welcome ${req.user.name}`})
})

```

- 

```js

// if user is authenticated then they don't need to get access to login or register,so they'll be redirected to home page
// else they will be continuting whatever they were doing i.e. either login or register
// i.e. authenticated user if type /login route or register route in the browser they'll be redirected to home page 
//and if they are not authenticated then they'll be simply redirected to whatever route they typed
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('home')
    }
    next()
}

```

<h3>Step7: Add Logout functionality</h3>

- if successfully logged out then the user will be directed to the login page

```js

router.post('/', (req, res,next) => {
    // it is a built-in function in passport that clears the session
    req.logOut(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('login')
    })
})

```


