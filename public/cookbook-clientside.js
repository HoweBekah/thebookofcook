function searchByCategory() {
  console.log("Found the recipes!");

  var category = $("#cat").val();
  console.log(`Category: ${category}`);

  $.get("/search", { category: category }, function(data) {
    console.log("Back from server with:");
    console.log(data);
    $("#ulRecipes").empty();
    for (var i = 0; i < data.list.length; i++) {
      var recList = data.list[i];
      $("#ulRecipes").append(`<li>${recList.recipe_name}</li>`);
    }
  });
}
