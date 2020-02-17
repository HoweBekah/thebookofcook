const accountModel = require("../models/accountModel.js");

function getUser(req, res) {
  var account_id = req.param("account_id");
  //console.log(`Do you work ${recipe_id}`);
  recipeModel.getUserById(account_id, function(error, results) {
    res.json(results);
  });
}
function NewUser(req, res) {
  //catid and recipeId

  var account_lname = req.body.account_lname;
  var account_fname = req.body.account_fname;
  var account_email = req.body.account_email;
  var account_password = req.body.account_password;

  var data = [account_lname, account_fname, account_email, account_password];

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
  //newUser: newUser,
  getUser: getUser
};
