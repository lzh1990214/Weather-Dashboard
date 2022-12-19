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
var cityName;
// set key to 0 for localStorage
var key = 0;

// enable "click" function on search and execute search of the key word
searchBtnEl.addEventListener("click", searchInputSubmit);
cityBtnEl.addEventListener("click", searchBtnSubmit);

// search by user input
function searchInputSubmit(event) {
    event.preventDefault();
    cityName = searchInputEl.value.trim();
    // console.log(cityName);

    // key number +1 everytime when the submit function execute
    key++;
    // store key number and city name in localStorage
    localStorage.setItem(key, cityName);
    // control the number of search history to 8 max, 
    // new search history will overwrite the old list if the list number is more than 8
    if (key >= 8) {
        key = 0;
    }
    createHistoryBtn();
    // execute fetch city data with geocoding API
    citySearchApi();
    // clear the input value after search
    searchInputEl.value = "";
}

// create search history list in html
function createHistoryBtn() {
    var historyBtnEl = document.createElement("button");
    var btnId = "historyBtn-" + key;
    historyBtnEl.setAttribute("class", "button is-rounded is-fullwidth is-info is-light");
    historyBtnEl.setAttribute("id", btnId);
    historyBtnEl.textContent = cityName;
    // if the history button number is less than 8, can create a new button
    if (cityBtnEl.children.length < 8) {
        cityBtnEl.appendChild(historyBtnEl);
    } else {
        // if the history button is 8, replace the buttons from the first row on the history list
        var replaceBtn = cityBtnEl.children[key-1];
        cityBtnEl.replaceChild(historyBtnEl, replaceBtn);
    };
}

// search by clicking the city buttons in the search history list
function searchBtnSubmit(event) {
    event.preventDefault();
    if (event.target.id = "#city-button") {
        console.log(event.target.textContent);
        searchBtnEl = event.target.textContent;

        var cityQueryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
        var apiKey = "&appid=bb14c28bb63d9f868721f7de3b94a011";
        cityQueryUrl = cityQueryUrl + searchBtnEl + "&limit=5" + apiKey;

        fetch(cityQueryUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                // show the first city name in the search result on dashboard
                resultCityEl.textContent = data[0].name + " ";
                // extract latitude and longitude data, and only leave two digits after the decimal of each number
                cityLatEl = parseFloat(data[0].lat).toFixed(2);
                cityLonEl = parseFloat(data[0].lon).toFixed(2);
                console.log(cityLatEl);
                console.log(cityLonEl);
                weatherApi();
                weather5dayApi();
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

//  function to fetch city data by city name with geocoding API
function citySearchApi() {
    var cityQueryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
    var apiKey = "&appid=bb14c28bb63d9f868721f7de3b94a011";
    cityQueryUrl = cityQueryUrl + cityName + "&limit=5" + apiKey;

    fetch(cityQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // show the first city name in the search result on dashboard
            resultCityEl.textContent = data[0].name + " ";
            // extract latitude and longitude data, and only leave two digits after the decimal of each number
            cityLatEl = parseFloat(data[0].lat).toFixed(2);
            cityLonEl = parseFloat(data[0].lon).toFixed(2);

            // run weather Api function
            weatherApi();
            weather5dayApi();
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
            // console.log(data);
            // convert "dt" (unix timestamp) to numeric format 
            var currentYear = new Date(data.dt * 1000).toLocaleString("en-US", { year: "numeric" });
            var currentMonth = new Date(data.dt * 1000).toLocaleString("en-US", { month: "numeric" });
            var currentDay = new Date(data.dt * 1000).toLocaleString("en-US", { day: "numeric" });
            // console.log(currentYear);
            // console.log(currentMonth);
            // console.log(currentDay);
            currentDateEl.textContent = "(" + currentYear + "-" + currentMonth + "-" + currentDay + ")";

            var currentTemp = data.main.temp;
            // convert temperature data from K to F and only leave two digits after the decimal
            var currentTempF = parseFloat((Number(currentTemp) - 273.15) * 1.8 + 32).toFixed(2);
            var currentWind = data.wind.speed;
            var currentHumid = data.main.humidity;
            var currentWeather = data.weather[0].main;
            // display current temperature with fahrenheit format 
            currentTempEl.textContent = "Temp: " + currentTempF + "\xB0" + "F";
            currentWindEl.textContent = "Wind: " + currentWind + " MPH";
            currentHumidEl.textContent = "Humidity: " + currentHumid + "%";
            currentWeatherEl.textContent = "Weather: " + currentWeather;

            // var weatherID = data.weather[0].id;
            // console.log(weatherID);
            var iconID = data.weather[0].icon;
            // console.log(iconID);
            document.getElementById("current-icon").src = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
        })
        .catch(function (error) {
            console.error(error);
        });
}

function weather5dayApi() {
    var weather5dayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?";
    var apiKey = "&appid=bb14c28bb63d9f868721f7de3b94a011";
    weather5dayQueryUrl = weather5dayQueryUrl + "lat=" + cityLatEl + "&" + "lon=" + cityLonEl + apiKey;
    fetch(weather5dayQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            var date5day = [];
            var weather5day = [];
            var temp5day = [];
            var wind5day = [];
            var humid5day = [];
            var iconID5day = [];

            // Loop through all days and time (40 objects in an array called "list").
            // note: because the free API "5day/3hour forecast" has weather data with 3-hour steps,
            // i have to extact the data from index 7 (24 hrs interval) to make sure getting the data from "tomorrow"
            for (i = 7; i < data.list.length; i += 8) {
                // extact the first 10 letters in the date & time string then push in an array. Extracted date example "2022-12-18".
                date5day.push(data.list[i].dt_txt.substr(0, 10));
                weather5day.push(data.list[i].weather[0].main);
                temp5day.push(data.list[i].main.temp);
                wind5day.push(data.list[i].wind.speed);
                humid5day.push(data.list[i].main.humidity);
                iconID5day.push(data.list[i].weather[0].icon);
            }

            // console.log(date5day);
            // get all elements with "date" class and use a for loop to show the date of each day
            var allDateEl = document.getElementsByClassName("date-future");
            var allWeatherEl = document.getElementsByClassName("weather-future");
            var allTempEl = document.getElementsByClassName("temp-future");
            var allWindEl = document.getElementsByClassName("wind-future");
            var allHumidEl = document.getElementsByClassName("humid-future");
            var allIconEl = document.getElementsByClassName("icon-future");

            // run a for-loop with the array index to show the date, weather, temp, wind, 
            // humidity, and weather icon for each of the 5 days on the panel
            for (i = 0; i < allDateEl.length; i++) {
                allDateEl[i].textContent = date5day[i];
                allWeatherEl[i].textContent = "Weather: " + weather5day[i];
                allTempEl[i].textContent = "Temp: " + parseFloat((Number(temp5day[i]) - 273.15) * 1.8 + 32).toFixed(2) + "\xB0" + "F";
                allWindEl[i].textContent = "Wind: " + wind5day[i] + " MPH";
                allHumidEl[i].textContent = "Humidity: " + humid5day[i] + "%";
                allIconEl[i].src = "https://openweathermap.org/img/wn/" + iconID5day[i] + "@2x.png";
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

