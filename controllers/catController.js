//require model to get info
const catModel = require("../models/catModel.js");

function search(req, res) {
  //searches by category that is chosen from the cat list
  var category = req.query.category;
  catModel.searchByCategory(category, function(error, results) {
    res.json(results);
  });
}
//gets all of the categories to be populated into the list
function getCatList(req, res) {
  catModel.getAllCats(function(error, results) {
    res.json(results);
  });
}

//get 1 category by its id
function getCat(req, res) {
  var id = req.query.id;
  catModel.getCatById(id, function(error, results) {
    res.json(results);
  });
}

module.exports = {
  search: search,
  getCatList: getCatList,
  getCat: getCat
};
