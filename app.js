const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// var LocalStrategy = require("passport-local-mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
var helmet = require("helmet");
var compression = require("compression");
const routeConfig = require("./routes");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const User = require("./Schematics/User");
const cors = require("cors");
// User.createStrategy();

dotenv.config();

const app = express();

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(
    mongoDb,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, client) => {
        if (err) {
            console.log(err);
            return;
        }
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
// app.use(passport.session());
app.use(
    session({
        cookie: { maxAge: 86400000 },
        store: new MemoryStore({
            checkPeriod: 86400000,
        }),
        resave: false,
        saveUninitialized: true,
        secret: "dogs",
    })
);
// passport.use(new LocalStrategy(User.authenticate()));
// passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passport.use(User.createStrategy());
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Err" });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    // passwords match! log user in
                    return done(null, user);
                } else {
                    // passwords do not match!
                    return done(null, false, { message: "Incorrect password" });
                }
            });
        });
    })
);

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Routes
app.use("/", routeConfig);
app.listen(8080, () => console.log("app listening on port 8080!"));
module.exports = app;
