function getAllCats(callback) {
  //get all the topics from DB

  var results = {
    categories: [
      { id: 1, category: "beverages" },
      { id: 2, category: "side dishes" },
      { id: 3, category: "main dishes" }
    ]
  };
  callback(null, results);
}

function getCatById(id, callback) {
  //get cat from DB that matches that id

  var results = { id: 1, category: "main dishes" };

  callback(null, results);
}

function insertNewCat(name, callback) {
  //create new topic in database with provided name

  var results = { success: true };
  callback(null, results);
}

module.exports = {
  getAllCats: getAllCats,
  getCatById: getCatById,
  insertNewCat: insertNewCat
};
