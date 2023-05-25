//history array to store searches
var historyArray = [];

//add event listener to form for submit
$("#search-form").on("submit", function(event) {
    event.preventDefault();
    //store input value into variable
    var city = $("#search-input").val().trim();
    var cityName = city.charAt(0).toUpperCase() + city.slice(1);
    //apiKey
    var APIkey = "0fdfab0bcf3590a8e7a2c9aecb8d3388"
    //use geocoding API to return weather by city name
    //query url for calling openweathermap API using city name and api key
    var queryTodayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey + "&units=metric";
    console.log(queryTodayUrl);
    console.log(cityName);
    //calling ajax to get data from openweathermap API
    $.ajax({
        url: queryTodayUrl,
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

        //call api for 5 day forecast data
        //save new queryUrl
        var queryFDUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey + "&units=metric";
        console.log(queryFDUrl);
        $.ajax({
            url: queryFDUrl,
            method: "GET"
        }).then(function(data) {
            console.log(data);
            //add header for 5-Day forecast
            var fdHeader = $("<h4>").text("5-Day Forecast");
            fdHeader.attr("class", "pl-2");

            //create row
            var row = $("<div>").attr("class", "row pl-3 mr-1");
            row.attr("id", "forecast-row");

            //array to store the numbers for for loop
            var eigthHourly = [7, 15, 23, 31, 39];
            for (let i = 0; i < eigthHourly.length; i++) {

                console.log(data.list[eigthHourly[i]]);
                //take the date and format it using moment.js
                var dataSet = data.list[eigthHourly[i]];
                //store required data into variables
                var fdDate = moment(dataSet.dt_txt).format('L');
                var fdIcon = dataSet.weather[0].icon;
                var fdTemp = dataSet.main.temp;
                var fdWind = dataSet.wind.speed;
                var fdHumidity = dataSet.main.humidity;

                //create new elements to display data
                var column = $("<div>").attr("class", "col text-white m-2 p-2");
                column.attr("id", "forecastCol");
                var fdDateHeader = $("<h5>").text(fdDate);
                var fdIconContainer = $("<img>").attr("src", `https://openweathermap.org/img/wn/${fdIcon}.png`);
                var fdTempContainer = $("<p>").text(`Temp: ${fdTemp} °C`);
                var fdWindContainer = $("<p>").text(`Wind: ${fdWind} KPH`);
                var fdHumidityContainer = $("<p>").text(`Humidity: ${fdHumidity}%`);
                column.append(fdDateHeader, fdIconContainer, fdTempContainer, fdWindContainer, fdHumidityContainer);
                row.append(column);
            }
            //append fd header and row to forecast div
            $("#forecast").append(fdHeader, row);


        })

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