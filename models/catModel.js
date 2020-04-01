const { Pool } = require("pg");
const db_url =
  "postgres://kqotaghsxoznkx:271e9a30b8f55b07e48f06395425ac2e40e5e1e1f2dcbb212b2a40bc8bfa41a0@ec2-174-129-254-235.compute-1.amazonaws.com:5432/d87nm6ji9guua9?ssl=true";
const pool = new Pool({ connectionString: db_url });

//getting categories from DB
function getAllCats(callback) {
  var sql = "SELECT category FROM category";

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

//getting recipe information based on category
function searchByCategory(category, callback) {
  var sql =
    "SELECT recipe_id, recipe_name, ingredients, instructions, category FROM recipes WHERE category=$1::text";
  var params = [category];
  pool.query(sql, params, function(err, DBres) {
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

//haven't started working on this functionality yes.
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
