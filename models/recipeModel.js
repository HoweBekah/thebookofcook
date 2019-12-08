const { Pool } = require("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: db_url });

function searchByCategory(category, callback) {
  console.log(`Searching for category: ${category}`);
  var sql =
    "SELECT recipe_id, recipe_name, ingredients, instructions, category FROM recipes WHERE category=$1::text";
  var params = [category];
  pool.query(sql, params, function(err, DBres) {
    if (err) {
      throw err;
    } else {
      console.log("Back from DB with: ");
      console.log(DBres);

      var results = {
        list: DBres.rows
      };

      callback(null, results);
    }
  });
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
  searchByCategory: searchByCategory,
  getAllRecipes: getAllRecipes,
  getRecipeById: getRecipeById,
  insertNewRecipe: insertNewRecipe,
  recipeToCat: recipeToCat
};
