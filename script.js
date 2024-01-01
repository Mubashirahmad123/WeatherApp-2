const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("Humidity");
const wind_speed = document.getElementById("Wind-speed");
const weatherData = document.getElementById("weather-data");
const unitToggle = document.getElementById("unit-toggle");
const locationInput = document.getElementById("location");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

// Function to fetch weather data
async function checkWeather(city) {
  const api_key = "94b2580023024aae1c501204efd6f70c";
  const unit = unitToggle.value; // Get the selected unit from the dropdown
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${api_key}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    const weather_data = await response.json();

    if (weather_data.cod == '404') {
      location_not_found.style.display = "flex";
      weather_body.style.display = "none";
      weather_img.style.display = "none"; // Hide the weather image
      console.log("error");
      return;
    } else {
      location_not_found.style.display = "none";
      weather_body.style.display = "flex";
      weather_img.style.display = "block"; // Show the weather image
    }

    temperature.innerHTML = `${Math.round(weather_data.main.temp)}°${unit === 'metric' ? 'C' : 'F'}`; // Display temperature in the selected unit
    description.innerHTML = weather_data.weather[0].description;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} km/hr`;

    // Updated switch statement for weather images
    switch (weather_data.weather[0].main) {
      case 'Clouds':
        weather_img.src = "/images/cloud.png";
        break;
      case 'Clear':
        weather_img.src = "/images/clear.png";
        break;
      case 'Rain':
        weather_img.src = "/images/rain.png";
        break;
      case 'Haze':
        weather_img.src = "/images/haze.png";
        break;
      case 'Snow':
        weather_img.src = "/images/snow.png";
        break;
      default:
        weather_img.src = "/images/404.png"; 
        break;
    }

    weatherData.innerHTML = `
      <p>Temperature: ${Math.round(weather_data.main.temp)}°${unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity: ${weather_data.main.humidity}%</p>
      <p>Wind Speed: ${weather_data.wind.speed} km/hr</p>
      <p>Description: ${weather_data.weather[0].description}</p>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherData.textContent = "An error occurred while fetching data. Please try again later.";
    location_not_found.style.display = "flex"; // Show the error message div
    weather_body.style.display = "none"; // Hide weather content
    weather_img.style.display = "none"; // Hide the weather image
    document.getElementById("error-img").style.display = "block"; // Show the error image
  }
}

// Add an event listener for the unitToggle change event
unitToggle.addEventListener("change", () => {
  checkWeather(locationInput.value); 
});

// Add an event listener for the search button
searchBtn.addEventListener("click", () => {
  checkWeather(locationInput.value);
});

checkWeather(locationInput.value);
