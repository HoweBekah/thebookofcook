const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/categories", function(req, res) {
  //get list of categories
  console.log("getting categories");

  var results = {
    categories: [
      { id: 1, category: "beverages" },
      { id: 2, category: "side dishes" },
      { id: 3, category: "main dishes" }
    ]
  };

  res.json(results);
});
app.get("/category", function(req, res) {
  //get 1category's recipes by catid
  console.log("getting category recipes");

  var results = { id: 1, category: "beverages" };

  res.json(results);
});

app.post("/category", function(req, res) {
  var recipe = req.body.recipe;

  console.log("creating new recipe: " + recipe);
  res.json({ success: true });
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});
