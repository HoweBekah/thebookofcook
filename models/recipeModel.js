const { Pool } = require("pg");
const db_url =
  "postgres://kqotaghsxoznkx:271e9a30b8f55b07e48f06395425ac2e40e5e1e1f2dcbb212b2a40bc8bfa41a0@ec2-174-129-254-235.compute-1.amazonaws.com:5432/d87nm6ji9guua9?ssl=true";
const pool = new Pool({ connectionString: db_url });
////////redirect attempt
// const express = require("express");
// const app = express();
// const targetBaseUrl = "https://arcane-coast-74365.herokuapp.com/cookbook.html";
// function handleRedirect(req, res){
//   const targetUrl = targetBaseUrl + req.originalUrl;
//   res.redirect(targetUrl);
// }
// app.get('*', handleRedirect);

//select all recipes from DB
function getAllRecipes(callback) {
  var sql =
    "SELECT recipe_id, recipe_name, ingredients, instructions, category FROM recipes";

  pool.query(sql, function(err, DBres) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      var results = {
        list: DBres.rows
      };

      callback(null, results);
    }
  });
}

//selecting recipe by its id from the DB
function getRecipeById(recipe_id, callback) {
  var params = recipe_id;
  var sql =
    "SELECT recipe_id, recipe_name, ingredients, instructions, category FROM recipes WHERE recipe_id=" +
    params;

  pool.query(sql, function(err, DBres) {
    if (err) {
      throw err;
    } else {
      var results = {
        list: DBres.rows
      };

      callback(null, results);
    }
  });
}
//inserts form data into database
function insertNewRecipe(
  recipe_name,
  recipe_ingredients,
  recipe_instructions,
  formCat,
  callback
) {
  var sql = `INSERT INTO recipes (recipe_id, recipe_name,ingredients,instructions, category) VALUES (DEFAULT, '${recipe_name}','${recipe_ingredients}', '${recipe_instructions}','${formCat}')`;
  console.log(sql);
  pool.query(sql, function(err, DBres) {
    //} else {
    //do this before fixing page issue
    console.log(err);
    var results = {
      list: DBres.rows
    };
    /////////redirect attempt
    //var recRow = DBres.rowCount;
    //console.log(recRow);
    // if (DBres.rowCount == 1) {
    //   res.redirect(
    //     "C:/Users/bekah/Documents/GitHub/FamCookbook/public/cookbook.html"
    //   );
    // }
    callback(null, results);
    //  }
  });
}

function recipeEdit() {}

function recipeDelete() {}

module.exports = {
  getAllRecipes: getAllRecipes,
  getRecipeById: getRecipeById,
  insertNewRecipe: insertNewRecipe,
  recipeEdit: recipeEdit,
  recipeDelete: recipeDelete
};
