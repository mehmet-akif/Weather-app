# Weather App

## Overview
This is a simple Weather App that fetches current weather data and a 4-day forecast using the WeatherAPI. Users can enter a location to get weather details, including temperature, weather condition, humidity, and wind speed. The app also allows users to download the weather data as a JSON file.

## Features
- Fetch current weather details for any location.
- Display a 4-day weather forecast.
- Responsive UI with horizontally arranged weather data.
- Download weather data as a JSON file.

## Technologies Used
- HTML
- CSS
- JavaScript
- WeatherAPI (https://www.weatherapi.com/)
- Node.js
- MongoDB

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (for running a local server, if needed)
- A modern web browser (Chrome, Firefox, Edge, etc.)

### Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/mehmet-akif/Weather-app.git
   ```
2. Navigate into the project folder:
   ```sh
   cd Weather-app
   ```
3. Install dependencies (if any):
   ```sh
   npm install
   ```

### Running the Application
You can open the `index.html` file directly in a browser or use a local server for better performance.

To use a simple local server:
1. Install the Live Server extension (for VS Code) and right-click `index.html` -> "Open with Live Server".
2. Or, run a simple HTTP server using Python:
   ```sh
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

### Usage
1. Enter a location (e.g., "Toronto") in the search box.
2. Click the "Get Weather" button.
3. View current weather details and a 4-day forecast.
4. Click the "Download JSON" button to save weather data as a JSON file.

## API Integration
The app uses the WeatherAPI to fetch weather details. Ensure you replace the `apiKey` in `script.js` with your own API key.


## LICENSE
This project is MIT Licensed, meaning you can freely use, modify, and distribute it.





