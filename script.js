var userInput = document.getElementById("input");
var searchBtn = document.getElementById("searchBtn");
var userInput;

function getCords(city) {
  var cityNameAPI =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=5a4ba5c5c82048606013e67eeb230ce2";

  fetch(cityNameAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));

  var LatLonAPI =
    "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=5a4ba5c5c82048606013e67eeb230ce2";
}
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  userInput = input.value.trim();
  getCords(userInput);
});
