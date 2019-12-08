const recipeModel = require("../models/recipeModel.js");

function searchByRecipe(recipeId, callback) {
  var results = {
    list: [
      {
        id: 1,
        recipeName: "Hot Chocolate",
        ingredients: "4 eggs, 2 cups water",
        instructions: "heat and mix together"
      },
      {
        id: 1,
        recipeName: "Hot Chocolate",
        ingredients: "4 eggs, 2 cups water",
        instructions: "heat and mix together"
      },
      {
        id: 1,
        recipeName: "Hot Chocolate",
        ingredients: "4 eggs, 2 cups water",
        instructions: "heat and mix together"
      }
    ]
  };

  callback(null, results);
}
function getAllRecipes(callback) {
  var results = {
    list: [
      {
        id: 1,
        recipeName: "Hot Chocolate",
        ingredients: "4 eggs, 2 cups water",
        instructions: "heat and mix together"
      },
      {
        id: 1,
        recipeName: "Hot Chocolate",
        ingredients: "4 eggs, 2 cups water",
        instructions: "heat and mix together"
      },
      {
        id: 1,
        recipeName: "Hot Chocolate",
        ingredients: "4 eggs, 2 cups water",
        instructions: "heat and mix together"
      }
    ]
  };

  callback(null, results);
}
function getRecipeById(id, callback) {
  var results = {
    id: 1,
    recipeName: "Hot Chocolate",
    ingredients: "4 eggs, 2 cups water",
    instructions: "heat and mix together"
  };

  callback(null, results);
}
function insertNewRecipe(recipeName, ingredients, instructions, callback) {
  var results = {
    success: true,
    recipe: {
      id: 1,
      recipeName: recipeName,
      ingredients: ingredients,
      instructions: instructions
    }
  };
  callback(null, results);
}
function recipeToCat(recipeId, catId, callback) {
  var results = {
    success: true
  };
  callback(null, results);
}

module.exports = {
  searchByRecipe: searchByRecipe,
  getAllRecipes: getAllRecipes,
  getRecipeById: getRecipeById,
  insertNewRecipe: insertNewRecipe,
  recipeToCat: recipeToCat
};
