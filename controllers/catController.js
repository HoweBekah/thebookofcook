const catModel = require("../models/catModel.js");

function getCatList(req, res) {
  //get list of categories
  console.log("getting categories");
  catModel.getAllCats(function(error, results) {
    res.json(results);
  });
}

function getCat(req, res) {
  //get 1category's recipes by catid
  var id = req.query.id;
  console.log("getting category recipes");
  catModel.getCatById(id, function(error, results) {
    res.json(results);
  });
}

function postCat(req, res) {
  var recipe = req.body.recipe;
  catModel.insertNewCat(recipe, function(error, results) {
    res.json(results);
  });

  console.log("creating new recipe: " + recipe);
}

module.exports = {
  getCatList: getCatList,
  getCat: getCat,
  postCat: postCat
};
