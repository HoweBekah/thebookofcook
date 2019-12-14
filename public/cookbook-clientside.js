window.onload = function getAllCats() {
  //console.log("Butts.com");

  $.get("/categories", function(data) {
    //console.log("Back from server with:");
    //console.log(data);
    // $("#catOptions").empty();
    $("#catOptions").append(
      `<option selected disabled>Choose a Category</option>`
    );
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];
      $("#catOptions").append(`<option>${recList.category}</option>`);
    }
  });

  $.get("/recipes", function(data) {
    var allRecipes = document.createElement("ol");
    allRecipes.id = "allRecipes";
    $("#recipeDiv").append(allRecipes);
    document.getElementById("recTitle").style.display = "contents";
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];
      $("#allRecipes").append(
        `<li onclick="getRecipeById(${recList.recipe_id})">${recList.recipe_name}</li>`
      );
    }
  });
};
//read in list. use a counter, on odds add white space, on evens add </br>. Use classes to apply grid to separate sides

function searchByCategory() {
  //console.log("Found the recipes!");

  var category = $("#catOptions").val();
  //console.log(`Category: ${category}`);

  $.get("/search", { category: category }, function(data) {
    //console.log("Back from server with:");
    //console.log(data);
    console.log(category);
    $("#ulRecipes").empty();
    $("#allRecipes").empty();

    document.getElementById("recTitle").style.display = "contents";

    document.getElementById("ulRecipes").style.display = "contents";
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];

      $("#ulRecipes").append(
        `<li onclick="getRecipeById(${recList.recipe_id})">${recList.recipe_name}</li>`
      );
    }
  });
}

function getRecipeById(recipe_id) {
  //console.log(recipe_id);
  $.get("/recipe", { recipe_id: recipe_id }, function(data) {
    $("#ulRecipes").empty();
    $("#recipeDiv").empty();
    document.getElementById("searchDiv").style.display = "none";
    document.getElementById("mainTitle").style.marginBottom = ".5em";
    var homeButton = document.createElement("a");
    homeButton.id = "homeButton";
    homeButton.innerText = "Back to Home";
    homeButton.href = "../cookbook.html";
    $("#titleDiv").append(homeButton);

    //$("#recipeDiv").prepend(`<h2>${data.list.recipe_name}</h2>`);
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];

      $("#recipeDiv").append(
        `<h2 id="recipeTitle">${recList.recipe_name}</h2>`
      );

      var ingsDiv = document.createElement("div");
      ingsDiv.id = "ingsDiv";
      $("#recipeDiv").append(ingsDiv);

      var myList = document.createElement("ul");
      myList.id = "ingredientList";
      $("#ingsDiv").append(myList);

      var ingreds = recList.ingredients;
      var ingList = ingreds.split(",");
      console.log(ingList);
      for (var i = 0; i < ingList.length; i++) {
        if (i % 2 != 0) {
          console.log(`Odd: ${ingList[i]}`);
          $("#ingredientList").append(
            `<li class= "rightIngList">${ingList[i]}</li>`
          );
        } else {
          console.log(`Even: ${ingList[i]}`);
          $("#ingredientList").append(
            `<li class= "leftIngList">${ingList[i]}</li>`
          );
        }
      }

      //$("#recipeDiv").append(`<h5>${recList.ingredients}</h5>`);
      $("#recipeDiv").append(`<p id="instruct">${recList.instructions}</p>`);
    }
  });
}
