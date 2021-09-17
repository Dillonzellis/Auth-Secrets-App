// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync(10);
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const PORT = 3000;
const dbUrl = "mongodb://localhost:27017/userDB";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "aslkdalskjdalskdjalskjfddikdcsdadsa",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(dbUrl, {});

const User = require("./models/User");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {});

// bcrypt hash login

// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.findOne({ email: username }, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         bcrypt.compare(password, foundUser.password, (err, results) => {
//           if (results === true) {
//             res.render("secrets");
//           }
//         });
//       }
//     }
//   });
// });

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("login");
  }
});

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    User.register(
      { username: req.body.username },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function () {
            res.redirect("/secrets");
          });
        }
      }
    );
  });

// bcrypt register user password hash

// app.post("/register", (req, res) => {
//   bcrypt.hash(req.body.password, salt, (err, hash) => {
//     const newUser = new User({
//       email: req.body.username,
//       password: hash,
//     });
//     newUser.save((err) => {
//       if (!err) {
//         res.render("secrets");
//       } else {
//         console.log(err);
//       }
//     });
//   });
// });

// app.get("/submit", (req, res) => {
//   res.render("submit");
// });

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
