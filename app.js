const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const PORT = 3000;
const dbUrl = "";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose.connect(dbUrl, {});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/secrets", (req, res) => {
  res.render("secrets");
});
app.get("/submit", (req, res) => {
  res.render("submit");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
