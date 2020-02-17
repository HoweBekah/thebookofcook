require("dotenv").config();
const express = require("express");
const path = require("path");
//

const catController = require("./controllers/catController.js");
const recipeController = require("./controllers/recipeController.js");
const accountController = require("./controllers/accountController.js");

const PORT = process.env.PORT || 8080;

var app = express();

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

//user post and get
app.get("/account", accountController.getUser);
//app.post("/account", accountController.newUser);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});
