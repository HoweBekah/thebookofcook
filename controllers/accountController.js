const accountModel = require("../models/accountModel.js");

function getUser(req, res) {
  var recipe_id = req.param("recipe_id");
  //console.log(`Do you work ${recipe_id}`);
  recipeModel.getUserById(recipe_id, function(error, results) {
    res.json(results);
  });
}
function NewUser(req, res) {
  //catid and recipeId

  var recipe_name = req.body.recipe_name;
  var recipe_ingredients = req.body.recipe_ingredients;
  var recipe_instructions = req.body.recipe_instructions;
  var formCat = req.body.formCat;

  var data = [recipe_name, recipe_ingredients, recipe_instructions, formCat];

  console.log("Stop sucking. " + data);
  accountModel.NewUser(
    data,
    // recipe_name,
    // ingredients,
    // instructions,
    // catId,
    function(error, results) {
      res.json(results);
    }
  );
}

module.exports = {
  newUser: newUser,
  getCatList: getCatList
};
