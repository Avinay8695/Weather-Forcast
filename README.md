# Weather App

A web-based weather application that allows users to check the current weather conditions for any location around the world.

## Features

- Search for weather by city name
- Display of current temperature in Celsius
- Weather description and corresponding icon
- Additional weather details (feels like temperature, humidity, wind speed)
- Responsive design that works on all device sizes
- Dynamic background that changes based on temperature
- Geolocation support to automatically show weather for user's current location

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API

## Setup Instructions

1. Clone or download this repository to your local machine.
2. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api).
3. Open the `script.js` file and replace `"YOUR_API_KEY"` with your actual API key:
   ```javascript
   const API_KEY = "your_actual_api_key_here";
   ```
4. Open the `index.html` file in your web browser.

## How to Use

1. When the app loads, it will attempt to get your current location (if you allow it) and display the weather for your area.
2. To check the weather for a different location, type a city name in the search box and click the "Search" button or press Enter.
3. The app will display the current weather conditions for the specified location, including:
   - City name and country
   - Current temperature
   - Weather description and icon
   - "Feels like" temperature
   - Humidity percentage
   - Wind speed

## Error Handling

The app includes error handling for various scenarios:
- If you don't enter a location, you'll be prompted to enter one.
- If the location you entered cannot be found, you'll see an error message.
- If there's an issue with the API request, you'll be notified.

## Notes

- The temperature is displayed in Celsius by default.
- The background color changes based on the temperature range:
  - Below 0°C: Cold (blue-green gradient)
  - 0-10°C: Cool (light blue gradient)
  - 10-20°C: Mild (purple gradient)
  - 20-30°C: Warm (pink gradient)
  - Above 30°C: Hot (red gradient)

## Future Improvements

- Option to switch between Celsius and Fahrenheit
- 5-day weather forecast
- Sunrise and sunset times
- Air quality index
- Weather alerts and warnings 