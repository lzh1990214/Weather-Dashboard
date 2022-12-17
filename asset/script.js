var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input")
var searchBtnEl = document.querySelector("#search-btn")
var resultCityEl = document.querySelector("#result-city")
var currentDateEl = document.querySelector("#current-date")

var currentTempEl = document.querySelector("#current-temp")
var currentWindEl = document.querySelector("#current-wind")
var currentHumidEl = document.querySelector("#current-humid")
var cityNameEl = []

// autocomplete(document.getElementById("search-input"), cityNameEl);

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
            // weatherApi();
        })
        .catch(function (error) {
            console.error(error);
        });
}

// auto-complete input list
// function autocomplete(inp, arr) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
//     /*execute a function when someone writes in the text field:*/
//     inp.addEventListener("input", function (e) {
//         var a, b, i, val = this.value;
//         /*close any already open lists of autocompleted values*/
//         closeAllLists();
//         if (!val) { return false; }
//         currentFocus = -1;
//         /*create a DIV element that will contain the items (values):*/
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /*append the DIV element as a child of the autocomplete container:*/
//         this.parentNode.appendChild(a);
//         /*for each item in the array...*/
//         for (i = 0; i < arr.length; i++) {
//             /*check if the item starts with the same letters as the text field value:*/
//             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//                 /*create a DIV element for each matching element:*/
//                 b = document.createElement("DIV");
//                 /*make the matching letters bold:*/
//                 b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//                 b.innerHTML += arr[i].substr(val.length);
//                 /*insert a input field that will hold the current array item's value:*/
//                 b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                 /*execute a function when someone clicks on the item value (DIV element):*/
//                 b.addEventListener("click", function (e) {
//                     /*insert the value for the autocomplete text field:*/
//                     inp.value = this.getElementsByTagName("input")[0].value;
//                     /*close the list of autocompleted values,
//                     (or any other open lists of autocompleted values:*/
//                     closeAllLists();
//                 });
//                 a.appendChild(b);
//             }
//         }
//     });
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function (e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//             /*If the arrow DOWN key is pressed,
//             increase the currentFocus variable:*/
//             currentFocus++;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode == 38) { //up
//             /*If the arrow UP key is pressed,
//             decrease the currentFocus variable:*/
//             currentFocus--;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode == 13) {
//             /*If the ENTER key is pressed, prevent the form from being submitted,*/
//             e.preventDefault();
//             if (currentFocus > -1) {
//                 /*and simulate a click on the "active" item:*/
//                 if (x) x[currentFocus].click();
//             }
//         }
//     });
//     function addActive(x) {
//         /*a function to classify an item as "active":*/
//         if (!x) return false;
//         /*start by removing the "active" class on all items:*/
//         removeActive(x);
//         if (currentFocus >= x.length) currentFocus = 0;
//         if (currentFocus < 0) currentFocus = (x.length - 1);
//         /*add class "autocomplete-active":*/
//         x[currentFocus].classList.add("autocomplete-active");
//     }
//     function removeActive(x) {
//         /*a function to remove the "active" class from all autocomplete items:*/
//         for (var i = 0; i < x.length; i++) {
//             x[i].classList.remove("autocomplete-active");
//         }
//     }
//     function closeAllLists(elmnt) {
//         /*close all autocomplete lists in the document,
//         except the one passed as an argument:*/
//         var x = document.getElementsByClassName("autocomplete-items");
//         for (var i = 0; i < x.length; i++) {
//             if (elmnt != x[i] && elmnt != inp) {
//                 x[i].parentNode.removeChild(x[i]);
//             }
//         }
//     }
//     /*execute a function when someone clicks in the document:*/
//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target);
//     });
// }




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
            // display current temperature with fahrenheit format 
            currentTempEl.textContent = "Temperature: " + currentTempF + "\xB0" + "F";
            currentWindEl.textContent = "Wind: " + currentWind + "MPH";
            currentHumidEl.textContent = "Humidity: " + currentHumid + "%";


            //






        })
        .catch(function (error) {
            console.error(error);
        });

}




