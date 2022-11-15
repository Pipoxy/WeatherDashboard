var userInput = document.getElementById("input");
var searchBtn = document.getElementById("searchBtn");
var areaName = document.getElementById("areaName");
var areaDate = document.getElementById("areaDate");
var areaWeather = document.getElementById("areaWeather");
var areaTemp = document.getElementById("areaTemp");
var areaHumidity = document.getElementById("areaHumidity");
var areaWind = document.getElementById("areaWind");
var btnArea = document.getElementById("btnArea");

var city;
var cities = [];

var days = document.getElementById("days");

function getCords(location) {
  var cityNameAPI =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&limit=1&appid=5a4ba5c5c82048606013e67eeb230ce2";
  fetch(cityNameAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      var LatLonAPI =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=imperial&appid=5a4ba5c5c82048606013e67eeb230ce2";

      fetch(LatLonAPI)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var todaysDate = data.list[0].dt_txt;
          var todaysWeather = data.list[0].weather[0].main;
          var todaysTemp = data.list[0].main.temp;
          var todaysHumidity = data.list[0].main.humidity;
          var todaysWind = data.list[0].wind.speed;
          var cityName = data.city.name;

          areaName.textContent = " " + cityName;
          areaDate.textContent = todaysDate;
          // make emoji show up instead
          areaWeather.textContent = todaysWeather;
          areaTemp.textContent = "Temp: " + todaysTemp + " °F";
          areaHumidity.textContent = "Humidity: " + todaysHumidity + "%";
          areaWind.textContent = "Wind Speed: " + todaysWind + " mph";

          for (var i = 0; i < 5; i++) {
            let dates = data.list[i * 8].dt_txt;
            let weathers = data.list[i * 8].weather[0].main;
            let temps = data.list[i * 8].main.temp;
            let humiditys = data.list[i * 8].main.humidity;
            let winds = data.list[i * 8].wind.speed;

            let day = document.createElement("span");
            let date = document.createElement("h5");
            let weather = document.createElement("h5");
            let temp = document.createElement("h5");
            let humidity = document.createElement("h5");
            let wind = document.createElement("h5");

            date.innerHTML = dates;
            weather.innerHTML = weathers;
            temp.innerHTML = "Temp:" + temps + " °F";
            humidity.innerHTML = "Humidity: " + humiditys + "%";
            wind.innerHTML = "Wind Speed: " + winds + " mph";

            day.classList.add("day");

            day.appendChild(date);
            day.appendChild(weather);
            day.appendChild(temp);
            day.appendChild(humidity);
            day.appendChild(wind);

            days.appendChild(day);
          }
        });
    })
    .catch((err) => console.log(err));
}

function makeCityBtn() {
  days.innerHTML = "";

  for (var j = 0; j < cities.length; j++) {
    city = cities[j];

    var makeBtn = document.createElement("button");

    makeBtn.textContent = city;
    makeBtn.classList.add("newButtons");

    btnArea.appendChild(makeBtn);

    makeBtn.addEventListener("click", function (e) {
      days.innerHTML = "";
      getCords(e.target.textContent);
    });
  }
}

async function clearBtn() {
  btnArea.innerHTML = "";
}

async function getstoredItems() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cities = storedCities;
  }
  await clearBtn();
  makeCityBtn();
}

function storeItems() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  days.innerHTML = "";

  userInput = input.value.trim();

  cities.push(userInput);

  storeItems();
  getCords(userInput);
  getstoredItems();
});

getstoredItems();
