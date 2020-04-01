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
    var mainRecTitle = document.createElement("h2");
    mainRecTitle.id = "mainRecTitle";
    mainRecTitle.innerText = "Recipes";
    $("#recipeDiv").append(mainRecTitle);

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

  // $.post("/account", function(data) {});
};

//read in list. use a counter, on odds add white space, on evens add </br>. Use classes to apply grid to separate sides

function searchByCategory() {
  //console.log("Found the recipes!");

  var category = $("#catOptions").val();
  //console.log(`Category: ${category}`);

  $.get("/search", { category: category }, function(data) {
    //console.log("Back from server with:");
    //console.log(data);
    //console.log(category);

    $("#ulRecipes").empty();
    document.getElementById("allRecipes").style.display = "none";
    document.getElementById("mainRecTitle").style.display = "none";
    document.getElementById("ulDiv").style.display = "inherit";
    document.getElementById("recTitle").style.display = "inherit";
    document.getElementById("ulRecipes").style.display = "inherit";

    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];

      $("#ulRecipes").append(
        `<li onclick="getRecipeById(${recList.recipe_id})">${recList.recipe_name}</li>`
      );
    }
    $("#ulDiv").append(
      `<a class="navButtons" id ="addButton" onclick="newRecipe()">Add Recipe</a>`
    );
  });
}

function getRecipeById(recipe_id) {
  //console.log(recipe_id);
  $.get("/recipe", { recipe_id: recipe_id }, function(data) {
    $("#ulRecipes").empty();
    $("#recipeDiv").empty();
    document.getElementById("searchDiv").style.display = "none";

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
      //console.log(ingList);
      for (var i = 0; i < ingList.length; i++) {
        if (i % 2 != 0) {
          //console.log(`Odd: ${ingList[i]}`);
          $("#ingredientList").append(
            `<li class= "rightIngList">${ingList[i]}</li>`
          );
        } else {
          //console.log(`Even: ${ingList[i]}`);
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
function newRecipe() {
  var category = $("#catOptions").val();
  // $.post("/recipe", { category: category }, function(data) {
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
      <td><textarea id='recipe_instructions' name="recipe_instructions" class= "padInputs" rows="10" cols="40" required></textarea></textarea></td>
      </tr>
      <input type="hidden" name="formCat" value="${category}"/>
<tr>
      <td colspan="2" id="subRec" ><input type='submit' value='Save Recipe' id='recSubmit' class= "navButtons" onclick="insertNewRecipe()"/></td>
      </tr>
      </table>
      </fieldset>`;
  // });<input type="hidden" id="formCat" value="${category}"/>
  //console.log(myForm);
  $("#recipeDiv").append(myForm);

  // if (myForm) {
  //       myForm.empty();
  //     } else {
  //       var recList = data.list;
  //       var myForm = document.createElement("form");
  //       myForm.id = "newRecForm";
  //       myForm.method = "POST";
  //       myForm.action = "/recipe";

  //       myForm.innerHTML = `<fieldset><legend>New Recipe</legend>
  //     <label for="recipe_name">Recipe Name:</label>
  //       <input type="text" id="recipe_name" name="recipe_name" required />
  //       <label for="recipe_ingredients">Ingredients:</label>
  //       <textarea id="recipe_ingredients" rows="10" cols="40" placeholder="Separate ingredients with comma" required></textarea>
  //       <label for="recipe_instructions">Instructions:</label>
  //       <textarea id='recipe_instructions' rows="10" cols="40" required></textarea></textarea>
  //       <label for="formCat">Category:</label>
  //       <input type="text" id="formCat" value="${recList.category}" disabled />
  //       <input type='submit' value='Add Recipe' id='recSubmit' /></fieldset>`;
  //     }
  //     $("#recipeDiv").append(myForm);});
}
