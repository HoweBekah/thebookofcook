require("dotenv").config();
const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var sessions = require("client-sessions");
var bouncer = require("heroku-bouncer");

const catController = require("./controllers/catController.js");
const recipeController = require("./controllers/recipeController.js");

const PORT = process.env.PORT || 8080;

var app = express();

app.use(cookieParser("your cookie secret"));

app.use(
  sessions({
    cookieName: "session",
    secret: "your session secret",
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    cookie: {
      path: "/",
      ephemeral: false,
      httpOnly: true,
      secure: false
    }
  })
);

app.use(
  bouncer({
    oAuthClientID: "client-id",
    oAuthClientSecret: "client-secret",
    encryptionSecret: "abcd1234abcd1234"
  })
);

app.get("/", function(req, res) {
  res.end("You must be logged in.");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cat gets and posts
app.get("/categories", catController.getCatList);
app.get("/search", catController.search);

//recipes gets and posts
app.get("/search", recipeController.search);
app.get("/recipes", recipeController.getRecipeList);
app.get("/recipe", recipeController.getRecipe);
app.post("/recipe", recipeController.insertNewRecipe);
app.post("/recipeToCat", recipeController.recipeToCat);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});
