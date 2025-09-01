const API_KEY = "C34YB34KU24R89EZLUYW2CYBD";

async function fetchWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    location
  )}?unitGroup=us&key=${API_KEY}&contentType=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const simplifiedWeatherData = processWeatherData(data);
    return simplifiedWeatherData;
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
}

function processWeatherData(data) {
  const today = data.days[0];

  return {
    location: data.address,
    date: today.datetime,
    temperature: today.temp,
    feelsLike: today.feelslike,
    conditions: today.conditions,
    icon: today.icon,
  };
}

function displayWeather(weather) {
  const display = document.getElementById("weather-display");

  display.innerHTML = `
    <h2>Weather in ${weather.location}</h2>
    <p><strong>Date:</strong> ${weather.date}</p>
    <p><strong>Temperature:</strong> ${weather.temperature}°F</p>
    <p><strong>Feels Like:</strong> ${weather.feelsLike}°F</p>
    <p><strong>Conditions:</strong> ${weather.conditions}</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("location-form");
  const input = document.getElementById("location-input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const location = input.value.trim();
    if (!location) return;

    const weatherData = await fetchWeather(location);
    displayWeather(weatherData);

    input.value = "";
  });
});
