var emotions =["happy" , "releived", "party time", "lazy"];


$(document).on("click", ".emotion", function(){
	

	var emotion = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=47c3b661255144c09e348891cfbddd23&limit=25";

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
			
			console.log(response);

			var gif = $("<img>");
			gif.attr("src", results[Math.floor((Math.random() * 6) + 1)].images.original.url);
			gif.attr("id", "gifWidth");
			$("#gif").html(gif);
});
});



function renderButtons(){
	$("#emotions-view").empty();

	for (var i = 0; i < emotions.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<a>");
          // Adding a class
          a.addClass("emotion nav-link");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", emotions[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(emotions[i]);
          // Adding the button to the HTML
          $("#emotions-view").append(a);
        }
}

function handleKeyPress(e){
 var key=e.keyCode || e.which;
  if (key==13){
     
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var emotion = $("#emotion-input").val().trim();
    // The movie from the textbox is then added to our array
    emotions.push(emotion);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();

    $("#emotion-input").val("");

  }
}

renderButtons();


//Setting the date on the Calendar
	
function updateTime(){
	$(".month").html(moment().format('MMMM')); 
	$(".day").html(moment().format('Do')); 
	$("#time").html(moment().format('dddd LT')); 
}

updateTime();
setInterval(function(){
	updateTime();
},6000);


//The first gif diplayed in the calendar takes the day of the week keyword to find the initial gif

var day = moment().format('dddd');  
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + day + "&api_key=47c3b661255144c09e348891cfbddd23&limit=25";

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
			
			console.log(response);

			var gif = $("<img>");
			gif.attr("src", results[Math.floor((Math.random() * 24) + 1)].images.original.url);
			gif.attr("id", "gifWidth");
			$("#gif").html(gif);
});

//Weather
  
 $("#submit").on("click", function(){    
    $(".card-text").hide();

    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var zipcode = $("#zipcode").val().trim();
    
    // Clear localStorage
      localStorage.clear();

      localStorage.setItem("zipcode", zipcode);
 

// This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
      "zip=" + zipcode + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html("<h4>" + response.name + " Weather</h4>");
        $(".wind").html("Wind Speed: " + response.wind.speed);
        $(".humidity").html("Humidity: " + response.main.humidity + "%");
        $(".temp").html("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });



 });

