$(document).ready(function () {
    //check local storage
    var savedLocal = localStorage.getItem("cityname");
    var $liElement = $("<li>");
    $liElement.text(savedLocal);
    $("#search1").append($liElement);



    // WHEN I search for a city
    // THEN I am presented with current and future conditions for that city and that city is added to the search history
    $(".btn").on("click", function () {
        event.preventDefault();
        var $cityName = $("#city-input").val();
        localStorage.setItem("cityname", $cityName);
        var $liElement = $("<li>");
        $liElement.text($cityName);
        $("#search1").append($liElement);

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $cityName + "&appid=094a2720fa99404e218aff094ec83870";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#card-title").text($cityName);
            $("#temp").text("Temperature: " + response.main.temp);
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#wind").text("Wind Speed: " + response.wind.speed);

            var cityLat = response.coord.lat;
            var cityLong = response.coord.lon;

            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=094a2720fa99404e218aff094ec83870" + "&lat=" + cityLat + "&lon=" + cityLong + "&appid=094a2720fa99404e218aff094ec83870"

            //Created another call for the UV index value
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {
                $("#uv").text("UV Index: " + response.value)
        });

         //5 day forecast
         var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + $cityName + "&appid=094a2720fa99404e218aff094ec83870";

         $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
            console.log(response.list);
            var day1 = response.list[5];
            var day2 = response.list[13];
            var day3 = response.list[21];
            var day4 = response.list[29];
            var day5 = response.list[37];
            var days =[day1, day2, day3, day4, day5]

            for (let i = 0; i < days.length; i++) {
                console.log(i);
                var $day1Forecast = $(`<li>Temperature: ${days[i].main.temp}</li>
                                    <li>Humidity: ${days[i].main.humidity}</li>`);
                $(`#day-${i+1}`).append($day1Forecast);
            }
        });

        });
    });

});


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
