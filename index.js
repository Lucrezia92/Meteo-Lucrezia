function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "52o0ta3a4163e34b468085936bcf4c78";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}


function getForecast(city){
  let apiKey = "52o0ta3a4163e34b468085936bcf4c78";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  

}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let formElement = document.querySelector("#search-form")
formElement.addEventListener("submit", handleSearchSubmit)

function displayForecast(response) {

  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  

  let forecastHtml = '<div class="row">';

  response.data.daily.forEach(function (day) {

    forecastHtml =

      forecastHtml + `
  <div class="col-2">
    <div class="date">Tue</div>
    <img
    src=http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png
    width="50px" style="float: left; margin-right: 15px;" />
    <div class="weather-forecast-temp">${Math.round(day.temperature.minimum)}°
      
      <span class="weather-temp-min">12°</span>
      <div class="weather-temperature"></div>
      <strong>${Math.round(day.temperature.maximum)}°</strong>
    </div>
  </div>
`;

  });

  forecastHtml = forecastHtml + "</div>"
  forecastElement.innerHTML = forecastHtml;

}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu","Fri","Sat"];
  return days[date.getDay()];
}
getForecast();