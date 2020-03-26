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
  // var recipe_name = req.param("recipe_name");
  // var recipe_ingredients = req.param("recipe_ingredients");
  // var recipe_instructions = req.param("recipe_instructions");
  // var formCat = req.param("formCat");

  var recipe_name = req.body.recipe_name;
  var recipe_ingredients = req.body.recipe_ingredients;
  var recipe_instructions = req.body.recipe_instructions;
  var formCat = req.body.formCat;

  //var data = [recipe_name, recipe_ingredients, recipe_instructions, formCat];

  console.log(
    `Stop sucking. ${recipe_name}, ${recipe_ingredients}, ${recipe_instructions}, ${formCat}`
  );
  recipeModel.insertNewRecipe(
    recipe_name,
    recipe_ingredients,
    recipe_instructions,
    formCat,
    function(error, results) {
      res.json(results);
    }
  );
}

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
