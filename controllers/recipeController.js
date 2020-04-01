//require model to get info from model
const recipeModel = require("../models/recipeModel.js");

function search(req, res) {
  //pulling category from view
  var category = req.query.category;
  catModel.searchByCategory(category, function(error, results) {
    res.json(results);
  });
}
//getting all recipe information and displaying it
function getRecipeList(req, res) {
  recipeModel.getAllRecipes(function(error, results) {
    res.json(results);
  });
}

//getting specific recipe based on recipe id
function getRecipe(req, res) {
  var recipe_id = req.param("recipe_id");
  recipeModel.getRecipeById(recipe_id, function(error, results) {
    res.json(results);
  });
}
//getting data from view to send to controller
function insertNewRecipe(req, res) {
  //catid and recipeId

  var recipe_name = req.body.recipe_name;
  var recipe_ingredients = req.body.recipe_ingredients;
  var recipe_instructions = req.body.recipe_instructions;
  var formCat = req.body.formCat;

  recipeModel.insertNewRecipe(
    recipe_name,
    recipe_ingredients,
    recipe_instructions,
    formCat,
    function(error, results) {
      res.json(results);
      if (results.list.length == 0) {
        console.log("It was successful!");
      }
    }
  );
  //res.redirect(req.originalUrl);
}
//haven't started on these features
function recipeEdit() {}

function recipeDelete() {}

module.exports = {
  search: search,
  getRecipeList: getRecipeList,
  getRecipe: getRecipe,
  insertNewRecipe: insertNewRecipe,
  recipeEdit: recipeEdit,
  recipeDelete: recipeDelete
};
