

//add event listener to form for submit
$("#search-form").on("submit", function(event) {
    event.preventDefault();
    //store input value into variable
    var city = $("#search-input").val();
    console.log(city);
})