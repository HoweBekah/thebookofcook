window.onload = function getAllCats() {
  console.log("Butts.com");

  $.get("/categories", function(data) {
    console.log("Back from server with:");
    console.log(data);
    // $("#catOptions").empty();
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];
      $("#catOptions").append(`<option>${recList.category}</option>`);
    }
  });
};

function searchByCategory() {
  console.log("Found the recipes!");

  var category = $("#catOptions").val();
  console.log(`Category: ${category}`);

  $.get("/search", { category: category }, function(data) {
    console.log("Back from server with:");
    console.log(data);

    $("#ulRecipes").empty();
    $("#ulRecipes").prepend("<h2>Recipes</h2>");
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];

      $("#ulRecipes").append(
        `<li onclick="getRecipeById(${recList.recipe_id})">${recList.recipe_name}</li>`
      );
    }
  });
}

function getRecipeById(id) {
  console.log(id);
  $.get("/recipe", { recipe_id: id }, function(data) {
    console.log("Back from server with:");
    console.log(data);
    // var para = document.createElement("P");                 // Create a <p> element
    // para.innerHTML = "This is a paragraph.";                // Insert text
    // document.getElementById("myDIV").appendChild(para);
    $("#recipeDiv").empty();
    $("#recipeDiv").prepend(`<h2>${data.recipe_name}</h2>`);
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];
      $("#recipeDiv").append(`<p>${recList}</p>`);
    }
  });
}
