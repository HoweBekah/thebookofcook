//require model to use it's information
const accountModel = require("../models/accountModel.js");

//send search request to model for search for account by id
function getUser(req, res) {
  var account_id = req.param("account_id");
  accountModel.getUserById(account_id, function(error, results) {
    res.json(results);
  });
}
//sends account data to model
function newUser(req, res) {
  var account_lname = req.body.account_lname;
  var account_fname = req.body.account_fname;
  var account_email = req.body.account_email;
  var account_password = req.body.account_password;

  accountModel.createNewUser(
    account_lname,
    account_fname,
    account_email,
    account_password,
    function(error, results) {
      res.json(results);
    }
  );
}

module.exports = {
  newUser: newUser,
  getUser: getUser
};
