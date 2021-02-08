//Html Elements
var histoyDiv   = document.getElementById("search-history");
var todayDiv    = document.getElementById("today");
var futureDiv   = document.getElementById("future-div");
var futureCard1 = document.getElementById("future1");
var futureCard2 = document.getElementById("future2");
var futureCard3 = document.getElementById("future3");
var futureCard4 = document.getElementById("future4");
var futureCard5 = document.getElementById("future5");
var searchButton = document.getElementById("search-button");

var searchEntry = document.getElementById("search-entry").value;

searchButton.addEventListener("click", getWeather);

//icon url
//  http://openweathermap.org/img/wn/ + icon ID + @2x.png
//future dates weather info
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly&units=imperial&appid={API key}

function getWeather(event){
    var latitude;
    var longitude;
    event.preventDefault();
    searchEntry = document.getElementById("search-entry").value;
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+ "suisun" +"&mode=json&units=imperial&appid=2616b5aba9cde5c3435e1b66d6740d72").then(function(response){
        if(response.ok){
            response.json().then(function(apiData){
            console.log(apiData);
            latitude = apiData.lat;
            longitude = apiData.lon;
            //created html elements
            var weatherimg = document.createElement("img"); 
             weatherimg.src = "http://openweathermap.org/img/wn/" + apiData.weather[0].icon + "@2x.png";
            var City = document.createElement("h1");
            City.textContent = apiData.name + " " + todaysDate.text(moment().format('LL')) + weatherimg;
            var 
        }).then(function(){
           fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon="+ longitude +"&exclude=minutely,hourly&units=imperial&appid=2616b5aba9cde5c3435e1b66d6740d72")  
        })
    }
// End first fetch
})

//end function
}
