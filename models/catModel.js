const { Pool } = require("pg");
const db_url =
  "postgres://kqotaghsxoznkx:271e9a30b8f55b07e48f06395425ac2e40e5e1e1f2dcbb212b2a40bc8bfa41a0@ec2-174-129-254-235.compute-1.amazonaws.com:5432/d87nm6ji9guua9?ssl=true";
const pool = new Pool({ connectionString: db_url });

function getAllCats(callback) {
  //get all the topics from DB
  console.log("Entered getAllCats");
  var sql = "SELECT category FROM category";

  pool.query(sql, function(err, DBres) {
    if (err) {
      throw err;
    } else {
      // console.log("Back from DB with: ");
      //console.log(DBres.rows.category);
      //console.log("Found result: " + JSON.stringify(DBres.rows));

      var results = {
        list: DBres.rows
      };

      callback(null, results);
    }
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
