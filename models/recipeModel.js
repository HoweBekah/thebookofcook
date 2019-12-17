const { Pool } = require("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: db_url });

function getAllRecipes(callback) {
  var sql =
    "SELECT recipe_id, recipe_name, ingredients, instructions, category FROM recipes";

  pool.query(sql, function(err, DBres) {
    if (err) {
      throw err;
    } else {
      // console.log("Back from DB with: ");
      //console.log(DBres.rows.category);

      var results = {
        list: DBres.rows
      };

      callback(null, results);
    }
  });
}
function getRecipeById(recipe_id, callback) {
  //console.log(`Searching for recipe id: ${recipe_id}`);
  var params = recipe_id;
  var sql =
    "SELECT recipe_id, recipe_name, ingredients, instructions, category FROM recipes WHERE recipe_id=" +
    params;

  //console.log(params);
  pool.query(sql, function(err, DBres) {
    // if (err) {
    //   throw err;
    // } else {
    //console.log("Back from DB with: ");
    //console.log(DBres);

    var results = {
      list: DBres.rows
    };

    callback(null, results);
    //}
  });
}
function insertNewRecipe(
  recipe_name,
  ingredients,
  instructions,
  catId,
  callback
) {
  var data = {
    recipe_name: recipe_name,
    ingredients: ingredients,
    instructions: instructions,
    catId: catId
  };
  console.log(data);
  var sql =
    "INSERT INTO recipes SET `recipe_name` =?, `ingredients`=?, `instructions`=?, `category`=?";

  //console.log(params);
  pool.query(sql, data, function(err, DBres) {
    if (err) {
      throw err;
    } else {
      //console.log("Back from DB with: ");
      //console.log(DBres);

      var results = {
        list: DBres.rows
      };

      callback(null, results);
    }
  });
}
function recipeToCat(recipeId, catId, callback) {
  var results = {
    success: true
  };
  callback(null, results);
}

module.exports = {
  getAllRecipes: getAllRecipes,
  getRecipeById: getRecipeById,
  insertNewRecipe: insertNewRecipe,
  recipeToCat: recipeToCat
};
