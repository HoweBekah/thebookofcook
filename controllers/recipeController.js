const recipeModel = require("../models/recipeModel.js");

function search(req, res) {
  //TODO: check if query is recipe id or cat id to call proper function
  var category = req.query.category; //TODO: comes from query
  catModel.searchByCategory(category, function(error, results) {
    res.json(results);
  });
}
function getRecipeList(req, res) {
  recipeModel.getAllRecipes(function(error, results) {
    res.json(results);
  });
}
function getRecipe(req, res) {
  var recipe_id = req.param("recipe_id");
  //console.log(`Do you work ${recipe_id}`);
  recipeModel.getRecipeById(recipe_id, function(error, results) {
    res.json(results);
  });
}
function insertNewRecipe(req, res) {
  //catid and recipeId
  var recipe_name = req.param("recipe_name");
  var ingredients = req.param("recipe_ingredients");
  var instructions = req.param("recipe_instructions");
  var catId = req.param("recipe_cat");
  recipeModel.insertNewRecipe(
    recipe_name,
    ingredients,
    instructions,
    catId,
    function(error, results) {
      res.json(results);
    }
  );
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
