function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);
  }


function searchCity(city){
    
    let apiKey = "52o0ta3a4163e34b468085936bcf4c78";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    }
    
    
    

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);