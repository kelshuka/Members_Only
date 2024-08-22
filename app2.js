require("dotenv").config();
const pool = require("./db/pool");
const express = require("express");

const session =  require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const handleInternalError = require('./middleware/handleInternalError');

const bcrypt = require('bcryptjs');
const path = require("node:path");

//const indexRouter = require("./routes/indexRouter");
//const postRouter = require("./routes/postsRouter");
const indexController = require("./controllers/indexController");


const app = express();

//app.set("views", __dirname);
app.set("views", "./views");
app.set("view engine", "ejs");




/* app.use(session({
    store: new (require('connect-pg-simple')(session)) ({
        conString: process.env.DATABASE_URL // change to DATABASE_URL later
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,// false
    cookie: {
        maxAge: 1 * 24 * 60 * 1000 // 1 day
    }
})); */


app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// serving static assets (for the css in this case)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


app.get("/", (req, res) => {
    res.render("index", {user: req.user, title: "Home"});
});

app.get("/sign-up", indexController.createNewMemberGet);
//app.post("/sign-up", indexController.createNewMemberPost);

app.post("/sign-up", async (req, res, next) => {
    try {

        const hash = await bcrypt.hash(req.body.password, 10);

    
        await pool.query("INSERT INTO members (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)", [
            req.body.firstName, req.body.lastName, req.body.username, req.body.email, hash,]
        );
        res.redirect("/");
    } catch(err) {
        return next(err);
    }
});


// Middleware to set locals
/* app.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    next();
}); */


// Debugging Middleware
/* app.use( (req, res, next) => {
    //console.log('session: ', req.session);
    //console.log('user: ', req.user);
    next();
}); */


//app.use("/", indexRouter);
//app.use("/pubPosts", postRouter);

app.get('*', (req, res) => {
    res.render('pageNotFoundError', {title: 'Page Not Found'})
});


// setting up the LocalStartegy. Authenticating setup
passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM members WHERE username = $1", [username]);
        const user = rows[0];
  
        if (!user) {
          return done(null, false, { message: "Username not found" });
        }

       const match = await bcrypt.compare(password, user.password);
       if (!match){
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
       }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch(err) {
        done(err);
    }
});

app.get("/log-in", indexController.loginGet);

app.post("/log-in", indexController.loginPost);

app.use(handleInternalError);

/* app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
}); */



const PORT = process.env.PORT || 8080;
app.listen(PORT);

