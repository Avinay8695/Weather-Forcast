// API key for OpenWeatherMap
const API_KEY = "e1e20da6df692cffb19e74593359cd6e"; // Replace with your actual API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM elements
const locationInput = document.getElementById("location-input");
const searchBtn = document.getElementById("search-btn");
const errorContainer = document.getElementById("error-container");
const weatherContainer = document.getElementById("weather-container");
const cityName = document.getElementById("city-name");
const dateTime = document.getElementById("date-time");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// Event listeners
searchBtn.addEventListener("click", getWeatherData);
locationInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        getWeatherData();
    }
});

// Initialize the app
function init() {
    // Hide the weather container initially
    weatherContainer.style.display = "none";
    
    // Add loading animation to search button
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    
    // Check if geolocation is available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Get weather data for current location
                getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.log("Geolocation error:", error);
                // Default to a popular city if geolocation fails
                locationInput.value = "London";
                getWeatherData();
            }
        );
    } else {
        // Default to a popular city if geolocation is not supported
        locationInput.value = "London";
        getWeatherData();
    }
}

// Get weather data by city name
async function getWeatherData() {
    const location = locationInput.value.trim();
    
    if (!location) {
        showError("Please enter a location");
        return;
    }
    
    try {
        showError(""); // Clear any previous errors
        
        // Show loading state
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        cityName.textContent = "Loading...";
        weatherContainer.style.display = "block";
        
        const response = await fetch(`${API_URL}?q=${location}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            if (response.status === 404) {
                showError("Location not found. Please try another location.");
            } else {
                showError("An error occurred. Please try again later.");
            }
            weatherContainer.style.display = "none";
            searchBtn.innerHTML = '<i class="fas fa-search"></i>';
            return;
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
        // Reset search button
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("Failed to fetch weather data. Please try again later.");
        weatherContainer.style.display = "none";
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    }
}

// Get weather data by coordinates
async function getWeatherByCoordinates(lat, lon) {
    try {
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            locationInput.value = "London";
            getWeatherData();
            return;
        }
        
        const data = await response.json();
        locationInput.value = data.name;
        displayWeatherData(data);
        
        // Reset search button
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    } catch (error) {
        console.error("Error fetching weather data by coordinates:", error);
        locationInput.value = "London";
        getWeatherData();
    }
}

// Display weather data
function displayWeatherData(data) {
    // Update UI with weather data
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Set date and time
    const date = new Date();
    dateTime.textContent = formatDate(date);
    
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    
    // Set weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
    // Show the weather container with animation
    weatherContainer.style.display = "block";
    weatherContainer.style.animation = "fadeIn 0.8s ease";
    
    // Change background color based on temperature
    setBackgroundColor(data.main.temp);
    
    // Add animation to temperature
    temperature.style.animation = "fadeIn 1s ease";
}

// Format date
function formatDate(date) {
    const options = { 
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Show error message
function showError(message) {
    errorContainer.textContent = message;
    if (message) {
        errorContainer.style.padding = "10px";
        errorContainer.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
    } else {
        errorContainer.style.padding = "0";
        errorContainer.style.backgroundColor = "transparent";
    }
}

// Set background color based on temperature
function setBackgroundColor(temp) {
    let color1, color2;
    
    if (temp < 0) {
        // Cold
        color1 = "#74ebd5";
        color2 = "#ACB6E5";
    } else if (temp < 10) {
        // Cool
        color1 = "#89f7fe";
        color2 = "#66a6ff";
    } else if (temp < 20) {
        // Mild
        color1 = "#667eea";
        color2 = "#764ba2";
    } else if (temp < 30) {
        // Warm
        color1 = "#ff9a9e";
        color2 = "#fad0c4";
    } else {
        // Hot
        color1 = "#ff512f";
        color2 = "#dd2476";
    }
    
    document.body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    
    // Add smooth transition
    document.body.style.transition = "background 1.5s ease";
}

// Initialize the app when the page loads
window.addEventListener("load", init); 