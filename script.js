//add event listener to form for submit
$("#search-form").on("submit", function(event) {
    event.preventDefault();
    //store input value into variable
    var cityName = $("#search-input").val().trim();
    //apiKey
    var APIkey = "0fdfab0bcf3590a8e7a2c9aecb8d3388"
    //use geocoding API to return weather by city name
    //query url for calling openweathermap API using city name and api key
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey + "&units=metric";

    console.log(cityName);
    //calling ajax to get data from openweathermap API
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(data) {
        console.log(data);
        //store required data into variables
        var date = moment();
        var icon = data.weather[0].icon;
        var iconContainer = $("<img>").attr("src", `https://openweathermap.org/img/wn/${icon}.png`);
        $("#today").append(iconContainer);
        var temperature = data.main.temp;
        var humidity = data.main.humidity;
        console.log(humidity);
    })
})


