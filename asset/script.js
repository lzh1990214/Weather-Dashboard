var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input")
var searchBtnEl = document.querySelector("#search-btn")
var resultCityEl = document.querySelector("#result-city")
var currentDateEl = document.querySelector("#current-date")
var cityBtnEl = document.querySelector("#city-button")
var currentTempEl = document.querySelector("#current-temp")
var currentWindEl = document.querySelector("#current-wind")
var currentHumidEl = document.querySelector("#current-humid")
var currentWeatherEl = document.querySelector("#current-weather")
// var cityNameEl = []

// enable "click" function on search and execute search of the key word
searchBtnEl.addEventListener("click", searchInputSubmit);
cityBtnEl.addEventListener("click", searchBtnSubmit);

// search by user input
function searchInputSubmit(event) {
    event.preventDefault();

    searchInputEl = searchInputEl.value.trim();
    console.log(searchInputEl);

    if (!searchInputEl) {
        console.error('You need a enter a valid city name!');
        return;
    };
    // execute fetch city data with geocoding API
    citySearchApi();
}

// search by clicking the city buttons
function searchBtnSubmit(event) {
    event.preventDefault();
    if (event.target.id = "#city-button") {
        console.log(event.target.textContent);
        searchBtnEl = event.target.textContent;

        var cityQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
        var apiKey = "&appid=bb14c28bb63d9f868721f7de3b94a011";
        cityQueryUrl = cityQueryUrl + searchBtnEl + "&limit=5" + apiKey;

        fetch(cityQueryUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // show the first city name in the search result on dashboard
                resultCityEl.textContent = data[0].name + " ";
                // extract latitude and longitude data, and only leave two digits after the decimal of each number
                cityLatEl = parseFloat(data[0].lat).toFixed(2);
                cityLonEl = parseFloat(data[0].lon).toFixed(2);
                weatherApi();
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};


//  function to fetch city data by city name with geocoding API
function citySearchApi() {
    var cityQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
    var apiKey = "&appid=bb14c28bb63d9f868721f7de3b94a011";
    cityQueryUrl = cityQueryUrl + searchInputEl + "&limit=5" + apiKey;

    fetch(cityQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // show the first city name in the search result on dashboard
            resultCityEl.textContent = data[0].name + " ";
            // extract latitude and longitude data, and only leave two digits after the decimal of each number
            cityLatEl = parseFloat(data[0].lat).toFixed(2);
            cityLonEl = parseFloat(data[0].lon).toFixed(2);
            // console.log(cityLatEl);
            // console.log(cityLonEl);
            // push city names into an array (5 city names max due to API limitation)
            // for (i = 0; i < data.length; i++) {
            //     cityNameEl.push(data[i].name);
            // }
            // console.log(cityNameEl);

            // run weather Api function
            weatherApi();
        })
        .catch(function (error) {
            console.error(error);
        });
}


function weatherApi() {
    var weatherQueryUrl = "https://api.openweathermap.org/data/2.5/weather?";
    var apiKey = "&appid=bb14c28bb63d9f868721f7de3b94a011";
    weatherQueryUrl = weatherQueryUrl + "lat=" + cityLatEl + "&" + "lon=" + cityLonEl + apiKey;

    fetch(weatherQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // convert "dt" (unix timestamp) to "month-date-year" format 
            var currentYear = new Date(data.dt * 1000).getFullYear();
            var currentMonth = new Date(data.dt * 1000).getUTCMonth();
            var currentDate = new Date(data.dt * 1000).getUTCDate();
            currentDateEl.textContent = "(" + currentMonth + "-" + currentDate + "-" + currentYear + ")";
            console.log(currentDate);

            var currentTemp = data.main.temp;
            // convert temperature data from K to F and only leave two digits after the decimal
            var currentTempF = parseFloat((Number(currentTemp) - 273.15) * 1.8 + 32).toFixed(2);
            var currentWind = data.wind.speed;
            var currentHumid = data.main.humidity;
            var currentWeather = data.weather[0].main;
            // display current temperature with fahrenheit format 
            currentTempEl.textContent = "Temperature: " + currentTempF + "\xB0" + "F";
            currentWindEl.textContent = "Wind: " + currentWind + " MPH";
            currentHumidEl.textContent = "Humidity: " + currentHumid + "%";
            currentWeatherEl.textContent = "Weather: " + currentWeather;

            // var weatherID = data.weather[0].id;
            // console.log(weatherID);
            var iconID = data.weather[0].icon;
            console.log(iconID);
            document.getElementById("current-icon").src = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
        })
        .catch(function (error) {
            console.error(error);
        });

}




