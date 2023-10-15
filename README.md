<h3>Step1 : Use the local strategy</h3>

- what is our usernameFiled called? > email in this case
- what is our passwordFiled called? > password
- authenticateUser -> its is a function which will be called to authenticate the user

        authenticateUser(email, password, done)
    
done -> it's a function & will be called after we have authernticated a user

<br>

    done(serverError, userFound, message)

if we have no server error & user isn't found, then:-
    
    done(null,false,{message : "no user found"})

if we have no server error & user is found:-

    done(null,user)

if server error occurs:-

    done(err)

<h3>Step2: serializeUser & deserializeUser</h3>

<h3>Step3: Write the authenticateUser() method</h3>

- Get the user with the provided email from the database using getUserByEmail() & check the below cases:- 

    1. User not found with thr provided email.
    2. Password didn't matched.
    3. User found & password matched.

<h3>Steap4: Use flash, session & passport</h3>

```js
    const flash = require("express-flash")
    const session = require("express-session")

    app.use(flash())
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialize: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())// since we want session to be persited over all the pages

```
- **secret**: it is a secret key saved in .env file
- **resave**: do we want to save that session again if there isn't any changes
- **saveUninitialize**: do we want to save an empty session
    