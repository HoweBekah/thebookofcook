function searchByRecipe() {
  console.log("Found the recipe!");

  var recipeName = $("#recipe").val();
  console.log(`Recipe: ${recipeName}`);

  $.get("/search", { recipeName: recipeName }, function(data) {
    console.log("Back from server with:");
    console.log(data);

    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];
      $("#ulRecipes").append(`<li>${recList.recipeName}`);
    }
  });
}
