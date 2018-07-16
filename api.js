$(document).ready(function() {

  var topics = ["Columbo"];
  console.log(topics);

  function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");
      button.addClass("gif-button");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);
      $("#buttons").append(button);
    };
  };
  
  $("#add-thing").on("click", function (event) {
    event.preventDefault();
    var thing = $("#thing-input").val().trim();
    if (!thing) { return };
    topics.push(thing);
    $("#thing-input").val("");
    renderButtons();

    $("button").on("click", gifSearch)
  });


  function gifSearch() {
  var gif = $(this).attr("data-name");
  // var gifStr = gif.split(" ").join("+");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=Gtl8YGKTa0pryKVfcYHYpDP7oD4ek6Hx&&s&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function(response) {
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        var gifImage = $("<img>");

        gifImage.attr("src", results[i].images.fixed_height.url);
-       gifImage.attr("data-state");
+       gifImage.attr("data-still", results[i].images.fixed_height_still.url);
+       gifImage.attr("data-animate", results[i].images.fixed_height.url);
+       gifImage.attr("data-state", "still");

        $("#gifs").prepend(p);
        $("#gifs").prepend(gifImage);
      }

      $("img").on("click", function() {
        var state = $(this).attr("data-state");
    
        console.log (state)
    
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        }
    
        else if (state === "animate") {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    })

  })

};

renderButtons();

$(document).on("click", ".gif-button", gifSearch);

});


