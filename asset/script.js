var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input")
var searchBtnEl = document.querySelector("#search-btn")
var resultCityEl = document.querySelector("#result-city")


function searchInputSubmit (event) {
    event.preventDefault();

    searchInputEl = searchInputEl.value.trim();
    console.log (searchInputEl);

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
            console.log(data[0].name);
            // show the first city name on dashboard
            resultCityEl.textContent = data[0].name;
        })

        .catch(function (error) {
            console.error(error);
        });

    ;
    

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

