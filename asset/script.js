var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input")
var searchBtnEl = document.querySelector("#search-btn")
var resultCityEl = document.querySelector("#result-city")

var cityLatEl = ""
var cityLonEl = ""


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

// enable "click" function on search and execute search of the key word
searchBtnEl.addEventListener("click", searchInputSubmit);


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
            resultCityEl.textContent = data[0].name;
            // extract latitude and longitude data, and only leave two digits after the decimal of each number
            cityLatEl = parseFloat(data[0].lat).toFixed(2);
            cityLonEl = parseFloat(data[0].lon).toFixed(2);

            console.log(cityLatEl);
            console.log(cityLonEl);

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
            // convert "dt" (unix timestamp) to date format as a string and assign to a variable
            var currentDate = new Date(data.dt * 1000).toLocaleDateString();
            console.log(currentDate);


            
        })
        .catch(function (error) {
            console.error(error);
        });

}

// var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=Boston&limit=5&appid=bb14c28bb63d9f868721f7de3b94a011";

// function getApi(requestUrl) {
//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });
// }

// getApi(requestUrl);

