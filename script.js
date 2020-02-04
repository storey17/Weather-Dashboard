$(document).ready(function () {

    // WHEN I search for a city
    // THEN I am presented with current and future conditions for that city and that city is added to the search history
    $(".btn").on("click", function () {
        event.preventDefault();
        var $cityName = $("#city-input").val();
        console.log($cityName);
        localStorage.setItem("cityname", $cityName);
        var liElement = $("<li>");
        var appendedLi = liElement.prependTo($("#search1"));
        var retrievedLocalCity = localStorage.getItem($cityName);
        appendedLi.text(retrievedLocalCity);

        var $cityName;
        // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $cityName + "&appid=094a2720fa99404e218aff094ec83870";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=094a2720fa99404e218aff094ec83870";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $(".card-title").text($cityName);
            $("#temp").text("Temperature: " + response.main.temp);
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#wind").text("Wind Speed: " + response.wind.speed);
            $("#uv").text("UV Index: " + response.main.uv);

        })
    });


});

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
