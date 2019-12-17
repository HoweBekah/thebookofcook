const { Pool } = require("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: db_url });

function getAllCats(callback) {
  //get all the topics from DB

  var sql = "SELECT category FROM category";

  pool.query(sql, function(err, DBres) {
    // if (err) {
    //   throw err;
    // } else {
    // console.log("Back from DB with: ");
    //console.log(DBres.rows.category);

    var results = {
      list: DBres.rows
    };

    callback(null, results);
    // }
  });
}
function searchByCategory(category, callback) {
  //console.log(`Searching for category: ${category}`);
  var sql =
    "SELECT recipe_id, recipe_name, ingredients, instructions, category FROM recipes WHERE category=$1::text";
  var params = [category];
  pool.query(sql, params, function(err, DBres) {
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

function insertNewCat(name, callback) {
  //create new topic in database with provided name

  var results = { success: true };
  callback(null, results);
}

module.exports = {
  getAllCats: getAllCats,
  searchByCategory: searchByCategory,
  insertNewCat: insertNewCat
};
