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
var todayHeader = document.getElementById("cityNPic");
var searchEntry = document.getElementById("search-entry").value;

searchButton.addEventListener("click", getWeather);

//icon url
//  http://openweathermap.org/img/wn/ + icon ID + @2x.png
//future dates weather info
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly&units=imperial&appid={API key}

function getWeather(event){
    event.preventDefault();
    clearElements();
    var latitude;
    var longitude;
    searchEntry = document.getElementById("search-entry").value;
    localStorage.setItem("City", document.getElementById("search-entry").value );
    var previousSearches = document.createElement("button");
    previousSearches.classList.add("previousSearch");
    histoyDiv.appendChild(previousSearches);              
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+ searchEntry +"&mode=json&units=imperial&appid=2616b5aba9cde5c3435e1b66d6740d72").then(function(response){
        if(response.ok){
            response.json().then(function(apiData){
            console.log(apiData);
            latitude = apiData.coord.lat;
            longitude = apiData.coord.lon;
            //created html elements
            var weatherimg = document.createElement("img"); 
             weatherimg.src = "http://openweathermap.org/img/wn/" + apiData.weather[0].icon + "@2x.png";
             weatherimg.classList.add("weatherIcon");
            var City = document.createElement("h1");
            City.classList.add("city");
            City.innerHTML = apiData.name + " ";
            var tempToday = document.createElement("p");
            tempToday.innerHTML ="<strong>Temperature:</strong> " + apiData.main.temp + " deg F";
            var humidityToday = document.createElement("p");
            humidityToday.innerHTML ="<strong>Humidity:<strong> " + apiData.main.humidity + "%";
            var windSpeedToday = document.createElement("p");
            windSpeedToday.innerHTML = "<strong>Wind Speed:<strong> " + apiData.wind.speed + " MPH";
            //append the children
            todayHeader.appendChild(City);
            todayHeader.appendChild(weatherimg)
            todayDiv.appendChild(tempToday);
            todayDiv.appendChild(humidityToday)
            todayDiv.appendChild(windSpeedToday);
            //variable test
            console.log("icon id: "+apiData.weather[0].icon);
            console.log("Latitude: "+ latitude);
            console.log("Longitude: "+ longitude);
        })/*.then(function(){
           fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon="+ longitude +"&exclude=minutely,hourly&units=imperial&appid=2616b5aba9cde5c3435e1b66d6740d72")  
        })*/
    }
// End first fetch
})

//end function
}

function clearElements (){
    if(todayHeader !== null){
        todayHeader.innerHTML = "";
    }
    if(todayDiv !== null){
        todayDiv.innerHTML = "";
    }
    for(var i=1; i<=5; i++){
        if(("futureCard"+i) !== null)    
        ("futureCard" + i).innerHTML = "";
    }
}
