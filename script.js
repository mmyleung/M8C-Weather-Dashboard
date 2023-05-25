//history array to store searches
var historyArray = [];

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
        //empty children in today container
        $("#today").empty();
        //store required data into variables
        var date = moment().format('L');
        var icon = data.weather[0].icon;
        var iconContainer = $("<img>").attr("src", `https://openweathermap.org/img/wn/${icon}.png`);
        var temperature = data.main.temp;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        //create new elements to display data
        var todayHeader = $("<h2>").text(`${cityName} (${date})`);
        todayHeader.append(iconContainer);
        var todayTemp = $("<p>").text(`Temp: ${temperature} °C`);
        var todayWind = $("<p>").text(`Wind: ${windSpeed} KPH`);
        var todayHumidity = $("<p>").text(`Humidity: ${humidity}%`);
        //target container for todays weather
        $("#today").append(todayHeader, todayTemp, todayWind, todayHumidity);
        $("#today").addClass("border border-dark p-1");
        clearSearchField();
        addSearch(cityName);
    })
})


function clearSearchField() {
    $("#search-input").val("");
}



function addSearch(city) {
    //clear previous children from history container
    $("#history").empty();
    //push new city search onto array
    historyArray.push(city);
    //for loop to dynamically add buttons 
    for (let i = 0; i < historyArray.length; i ++) {
        //add new button element
        var historyButton = $("<button>").attr("class", "btn btn-secondary rounded w-100 mt-1");
        //set button text to array value
        historyButton.text(historyArray[i]);
        //target history container and append new buttons
        $("#history").append(historyButton);
    }

}