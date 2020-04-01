const { Pool } = require("pg");
var passwordHash = require("password-hash");
const db_url =
  "postgres://kqotaghsxoznkx:271e9a30b8f55b07e48f06395425ac2e40e5e1e1f2dcbb212b2a40bc8bfa41a0@ec2-174-129-254-235.compute-1.amazonaws.com:5432/d87nm6ji9guua9?ssl=true";
const pool = new Pool({ connectionString: db_url });

//find user by id in DB
function getUserById(account_id, callback) {
  var params = account_id;
  var sql =
    "SELECT account_id, account_lname, account_fname, account_email, account_password FROM accounts WHERE accounts_id=" +
    params;

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

//posting new user data to DB
function createNewUser(
  account_lname,
  account_fname,
  account_email,
  account_password,
  callback
) {
  //hashing password for security
  var passHash = passwordHash.generate(`${account_password}`);
  var sql = `INSERT INTO accounts (account_id, account_lname, account_fname, account_email, account_password) VALUES(DEFAULT, '${account_lname}', '${account_fname}', '${account_email}', '${passHash}');`;

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

module.exports = {
  getUserById: getUserById,
  createNewUser: createNewUser
};
