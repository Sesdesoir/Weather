//Html Elements
var histoyDiv   = document.getElementById("search-history");
var todayDiv    = document.getElementById("today");
var futureDiv   = document.getElementById("future-div");
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
    previousSearches.textContent = document.getElementById("search-entry").value;
    previousSearches.addEventListener("click", function(){
        clearElements();
    var latitude;
    var longitude;
    searchEntry = this.textContent;
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
            }).then(function(){
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon="+ longitude +"&exclude=minutely,hourly&units=imperial&appid=2616b5aba9cde5c3435e1b66d6740d72").then(function(respond){
                 if(respond.ok){
                     respond.json().then(function(data){
                         var uvIndexToday = document.createElement("p");
                         uvIndexToday.innerHTML = "<strong>UV Index:</strong> " + data.current.uvi;
                         if(data.current.uvi < 3){
                             uvIndexToday.classList.add("lowRisk");
                         }else if(data.current.uvi <6){
                             uvIndexToday.classList.add("ModerateRisk");
                         }else if(data.current.uvi <8){
                             uvIndexToday.classList.add("highRisk");
                         }else{
                             uvIndexToday.classList.add("extremeRisk");
                         }
                         todayDiv.appendChild(uvIndexToday);
                         var forcastHeader = document.createElement("h1");
                         forcastHeader.textContent = "5 Day Forecast";
                         futureDiv.appendChild(forcastHeader);
                         var cardGroup = document.createElement("div");
                         cardGroup.classList.add("card-group")
                         futureDiv.appendChild(cardGroup);
                         //Card Creation
                         for(var j=0; j<5; j++){
                         var card = document.createElement("div");
                         card.classList.add("card");
                         card.style = "width: 18rem;";
                         var cardBody = document.createElement("div");
                         cardBody.classList.add("card-body");
                         var cardHead = document.createElement("h5");
                         cardHead.classList.add("card-title");
                         cardHead.textContent = data.daily[j].dt;
                         var futureweatherimg = document.createElement("img"); 
                         futureweatherimg.src = "http://openweathermap.org/img/wn/" + data.daily[j].weather[0].icon + "@2x.png";
                         futureweatherimg.classList.add("futureweatherIcon");
                         var futureTemp = document.createElement("p");
                         futureTemp.innerHTML = "<strong>Temp:</strong> " + data.daily[j].temp.day + " F";
                         var futureHumidity = document.createElement("p");
                         futureHumidity.innerHTML = "<strong>Humidity:</strong> " + data.daily[j].humidity + "%";
                         //card appendage
                         cardGroup.appendChild(card);
                         card.appendChild(cardBody);
                         cardBody.appendChild(cardHead);
                         cardBody.appendChild(futureweatherimg);
                         cardBody.appendChild(futureTemp);
                         cardBody.appendChild(futureHumidity);
                         }
                         //testing
                         console.log("Second Call:");
                         console.log(data);
                     }) //End data.then
                 //End if .ok    
                 } 
                })
             //End 2nd call     
             })
        } //end if
    })
    });
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
            //second fetch starts here
        }).then(function(){
           fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon="+ longitude +"&exclude=minutely,hourly&units=imperial&appid=2616b5aba9cde5c3435e1b66d6740d72").then(function(respond){
            if(respond.ok){
                respond.json().then(function(data){
                    var uvIndexToday = document.createElement("p");
                    uvIndexToday.innerHTML = "<strong>UV Index:</strong> " + data.current.uvi;
                    if(data.current.uvi < 3){
                        uvIndexToday.classList.add("lowRisk");
                    }else if(data.current.uvi <6){
                        uvIndexToday.classList.add("ModerateRisk");
                    }else if(data.current.uvi <8){
                        uvIndexToday.classList.add("highRisk");
                    }else{
                        uvIndexToday.classList.add("extremeRisk");
                    }
                    todayDiv.appendChild(uvIndexToday);
                    var forcastHeader = document.createElement("h1");
                    forcastHeader.textContent = "5 Day Forecast";
                    futureDiv.appendChild(forcastHeader);
                    var cardGroup = document.createElement("div");
                    cardGroup.classList.add("card-group")
                    futureDiv.appendChild(cardGroup);
                    //Card Creation
                    for(var j=0; j<5; j++){
                    var card = document.createElement("div");
                    card.classList.add("card");
                    card.style = "width: 18rem;";
                    var cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
                    var cardHead = document.createElement("h5");
                    cardHead.classList.add("card-title");
                    cardHead.textContent = data.daily[j].dt;
                    var futureweatherimg = document.createElement("img"); 
                    futureweatherimg.src = "http://openweathermap.org/img/wn/" + data.daily[j].weather[0].icon + "@2x.png";
                    futureweatherimg.classList.add("futureweatherIcon");
                    var futureTemp = document.createElement("p");
                    futureTemp.innerHTML = "<strong>Temp:</strong> " + data.daily[j].temp.day;
                    var futureHumidity = document.createElement("p");
                    futureHumidity.innerHTML = "<strong>Humidity:</strong> " + data.daily[j].humidity;
                    //card appendage
                    cardGroup.appendChild(card);
                    card.appendChild(cardBody);
                    cardBody.appendChild(cardHead);
                    cardBody.appendChild(futureweatherimg);
                    cardBody.appendChild(futureTemp);
                    cardBody.appendChild(futureHumidity);
                    }
                    //testing
                    console.log("Second Call:");
                    console.log(data);
                }) //End data.then
            //End if .ok    
            } 
           })
        //End 2nd call     
        })
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
    if(futureDiv !== null){
        futureDiv.innerHTML = ""
    }
}
