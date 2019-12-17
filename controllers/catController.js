const catModel = require("../models/catModel.js");

function search(req, res) {
  //TODO: check if query is recipe id or cat id to call proper function
  var category = req.query.category; //TODO: comes from query
  catModel.searchByCategory(category, function(error, results) {
    res.json(results);
  });
}
function getCatList(req, res) {
  catModel.getAllCats(function(error, results) {
    res.json(results);
  });
}

// function getCat(req, res) {
//   //get 1category's recipes by catid
//   var id = req.query.id;
//   //console.log("getting category recipes");
//   catModel.getCatById(id, function(error, results) {
//     res.json(results);
//   });
// }

// function postCat(req, res) {
//   var recipe = req.body.recipe;
//   catModel.insertNewCat(recipe, function(error, results) {
//     res.json(results);
//   });

//   console.log("creating new recipe: " + recipe);
// }

module.exports = {
  search: search
   getCatList: getCatList,
  // getCat: getCat,
  // postCat: postCat
};
