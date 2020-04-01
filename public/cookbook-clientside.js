//calls models to get data from database
window.onload = function getAllCats() {
  //getting categories through model
  $.get("/categories", function(data) {
    //dynamically populating category options
    $("#catOptions").append(
      `<option selected disabled>Choose a Category</option>`
    );
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];
      $("#catOptions").append(`<option>${recList.category}</option>`);
    }
  });

  //getting recipes through model
  $.get("/recipes", function(data) {
    var mainRecTitle = document.createElement("h2");
    mainRecTitle.id = "mainRecTitle";
    mainRecTitle.innerText = "Recipes";
    $("#recipeDiv").append(mainRecTitle);

    //creating ol for recipe names
    var allRecipes = document.createElement("ol");
    allRecipes.id = "allRecipes";
    $("#recipeDiv").append(allRecipes);

    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];
      $("#allRecipes").append(
        `<li onclick="getRecipeById(${recList.recipe_id})">${recList.recipe_name}</li>`
      );
    }
  });
  //STRUGGLE: still struggling with account funtionality
  // $.post("/account", function(data) {});
};

//read in list. use a counter, on odds add white space, on evens add </br>.
//Use classes to apply grid to separate sides

function searchByCategory() {
  var category = $("#catOptions").val();
  //sending category to model to find recipes
  $.get("/search", { category: category }, function(data) {
    $("#ulRecipes").empty();
    //needed to be a semi-single page application
    document.getElementById("allRecipes").style.display = "none";
    document.getElementById("mainRecTitle").style.display = "none";
    document.getElementById("ulDiv").style.display = "inherit";
    document.getElementById("recTitle").style.display = "inherit";
    document.getElementById("ulRecipes").style.display = "inherit";
    //display all recipes in the category
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];

      $("#ulRecipes").append(
        `<li onclick="getRecipeById(${recList.recipe_id})">${recList.recipe_name}</li>`
      );
    }
    //button to add new recipe in that category
    $("#ulDiv").append(
      `<a class="navButtons" id ="addButton" onclick="newRecipe()">Add Recipe</a>`
    );
  });
}
//getting all of specific recipe info
function getRecipeById(recipe_id) {
  $.get("/recipe", { recipe_id: recipe_id }, function(data) {
    $("#ulRecipes").empty();
    $("#recipeDiv").empty();
    document.getElementById("searchDiv").style.display = "none";

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
      //splitting ingredients at the comma
      var ingreds = recList.ingredients;
      var ingList = ingreds.split(",");
      //for loop to create a left and right list of the ingredients
      for (var i = 0; i < ingList.length; i++) {
        if (i % 2 != 0) {
          $("#ingredientList").append(
            `<li class= "rightIngList">${ingList[i]}</li>`
          );
        } else {
          $("#ingredientList").append(
            `<li class= "leftIngList">${ingList[i]}</li>`
          );
        }
      }
      //adding instructions
      $("#recipeDiv").append(`<p id="instruct">${recList.instructions}</p>`);
    }
  });
}
//function to add recipe form after button is pushed
function newRecipe() {
  var category = $("#catOptions").val();

  var myForm = document.createElement("form");
  myForm.id = "newRecForm";
  myForm.method = "POST";
  myForm.action = "/recipe";
  myForm.innerHTML = `<fieldset>
  <table>
  <tr>
  <th colspan="2" ><legend id="legend">New ${category} Recipe</legend></th>
  </tr>
  <tr>
    <td ><label for="recipe_name" style="white-space:nowrap">Recipe Name:</label></td>
    <td>  <input type="text" id="recipe_name" name="recipe_name" class= "padInputs" required /></td>
     </tr>
     <tr>
    <td><label for="recipe_ingredients">Ingredients:</label></td>
     <td> <textarea id="recipe_ingredients" name="recipe_ingredients" class= "padInputs" rows="10" cols="40" placeholder="Separate ingredients with comma" required></textarea></td>
     </tr>
     <tr>
     <td><label for="recipe_instructions">Instructions:</label></td>
      <td><textarea id='recipe_instructions' name="recipe_instructions" class= "padInputs" rows="10" cols="40" required></textarea></td>
      </tr>
      <input type="hidden" name="formCat" value="${category}"/>
<tr>
      <td colspan="2" id="subRec" ><input type='submit' value='Save Recipe' id='recSubmit' class= "navButtons" onclick="insertNewRecipe()"/></td>
      </tr>
      </table>
      </fieldset>`;

  $("#recipeDiv").append(myForm);
  ///////post/redirect attempt
  //   $.post("/recipe", function(req, res) {
  //   var recipe_name = req.body.recipe_name;
  // var recipe_ingredients = req.body.recipe_ingredients;
  // var recipe_instructions = req.body.recipe_instructions;
  // var formCat = req.body.formCat;
  // });
}
