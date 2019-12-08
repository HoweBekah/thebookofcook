const recipeModel = require("../models/recipeModel.js");

function search(req, res) {
  //TODO: check if query is recipe id or cat id to call proper function
  var recipeName = req.query.recipeName; //TODO: comes from query
  recipeModel.searchByRecipe(recipeName, function(error, results) {
    res.json(results);
  });
}
function getRecipeList(req, res) {
  recipeModel.getAllRecipes(function(error, results) {
    res.json(results);
  });
}
function getRecipe(req, res) {
  var id;
  recipeModel.getRecipeById(id, function(error, results) {
    res.json(results);
  });
}
function insertNewRecipe(req, res) {
  //catid and recipeId
  var recipeName;
  var ingredients;
  var instructions;
  recipeModel.insertNewRecipe(recipeName, ingredients, instructions, function(
    error,
    results
  ) {
    res.json(results);
  });
}
function recipeToCat(req, res) {
  var recipeId;
  var catId;
  recipeModel.recipeToCat(recipeId, catId, function(error, results) {
    res.json(results);
  });
}

module.exports = {
  search: search,
  getRecipeList: getRecipeList,
  getRecipe: getRecipe,
  insertNewRecipe: insertNewRecipe,
  recipeToCat: recipeToCat
};
