const { Pool, Client } = require("pg");
const db_url =
  "postgres://kqotaghsxoznkx:271e9a30b8f55b07e48f06395425ac2e40e5e1e1f2dcbb212b2a40bc8bfa41a0@ec2-174-129-254-235.compute-1.amazonaws.com:5432/d87nm6ji9guua9?ssl=true";
const pool = new Pool({ connectionString: db_url });

// const client = new Client({
//   connectionString: db_url,
//   ssl: true
// });

// client.connect();

// client.query("SELECT recipe_name FROM recipes;", (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

function getAllRecipes(callback) {
  var sql =
    "SELECT recipe_id, recipe_name, ingredients, instructions, category FROM recipes";

  pool.query(sql, function(err, DBres) {
    if (err) {
      console.log(err);
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
    if (err) {
      throw err;
    } else {
      //console.log("Found result: " + JSON.stringify(DBres.rows));
      //console.log("Back from DB with: ");
      //console.log(DBres);

      var results = {
        list: DBres.rows
      };

      callback(null, results);
    }
  });
}
function insertNewRecipe(data, callback) {
  // var data = {
  //   recipe_name: recipe_name,
  //   ingredients: ingredients,
  //   instructions: instructions,
  //   catId: catId
  // };
  console.log("You are the data:" + data);
  var sql = `INSERT INTO recipes (recipe_id, recipe_name,ingredients,instructions, category) VALUES (DEFAULT, ${data.recipe_name},${data.recipe_ingredients}, ${data.recipe_instructions},${data.formCat})`;

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

function recipeEdit() {}

function recipeDelete() {}

module.exports = {
  getAllRecipes: getAllRecipes,
  getRecipeById: getRecipeById,
  insertNewRecipe: insertNewRecipe,
  recipeEdit: recipeEdit,
  recipeDelete: recipeDelete
};
