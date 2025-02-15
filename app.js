const apiKey = "f8aa17092f80c90b681477bf72e250c9";

const cityName = document.getElementById("cityName");
const dateDisplay = document.getElementById("date");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIconLarge = document.getElementById("weatherIconLarge");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const forecastContainer = document.getElementById("forecast");
const errorInfo = document.getElementById("errorInfo");
const cityInput = document.getElementById("cityInput");
const getWeatherButton = document.getElementById("getWeatherButton");

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      cityName.textContent = `${data.city.name}, ${data.city.country}`;
      const currentData = data.list[0];
      temperature.textContent = `${Math.round(currentData.main.temp)}°C`;
      description.textContent = currentData.weather[0].description;
      wind.textContent = `Wind: ${currentData.wind.speed} m/s`;
      humidity.textContent = `Humidity: ${currentData.main.humidity}%`;
      weatherIconLarge.innerHTML = `<img src="http://openweathermap.org/img/w/${currentData.weather[0].icon}.png" alt="Weather Icon" class="w-24 h-24 mx-auto">`;

      const currentDate = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      dateDisplay.textContent = currentDate.toLocaleDateString(
        "en-US",
        options
      );

      forecastContainer.innerHTML = "";
      for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const forecastDate = new Date(forecast.dt * 1000);
        const forecastDay = forecastDate.toLocaleDateString("en-US", {
          weekday: "short",
        });
        const forecastTemp = Math.round(forecast.main.temp);
        const forecastIcon = forecast.weather[0].icon;
        forecastContainer.innerHTML += `
              <div class="forecast-item text-center">
                <p class="text-sm text-gray-300">${forecastDay}</p>
                <img src="http://openweathermap.org/img/w/${forecastIcon}.png" alt="Forecast Icon" class="w-12 h-12 mx-auto">
                <p class="text-sm">${forecastTemp}°C</p>
              </div>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      errorInfo.textContent = "City not found or invalid input.";
      errorInfo.classList.remove("hidden");
    });
}

getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    errorInfo.classList.add("hidden");
    getWeather(city);
  } else {
    errorInfo.textContent = "Please enter a city name.";
    errorInfo.classList.remove("hidden");
  }
});
