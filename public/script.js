let weatherData = null;  
document.getElementById("weather-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const location = document.getElementById("location").value;
    const resultDiv = document.getElementById("weather-result");
    const apiKey = '4d7ace6903e44e04aca180533252801';  

    try {
        const currentResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        const currentData = await currentResponse.json();

        if (currentData.error) {
            resultDiv.innerHTML = `<p>Error: ${currentData.error.message}</p>`;
            return;
        }

        const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`);
        const forecastData = await forecastResponse.json();

        if (forecastData.error) {
            resultDiv.innerHTML = `<p>Error: ${forecastData.error.message}</p>`;
            return;
        }

        // Store data globally for export
        weatherData = { current: currentData, forecast: forecastData };

        let resultHTML = `
            <h2>Weather in ${currentData.location.name}, ${currentData.location.country}</h2>
            <p>Temperature: ${currentData.current.temp_c}°C</p>
            <p>Weather: ${currentData.current.condition.text}</p>
            <p>Humidity: ${currentData.current.humidity}%</p>
            <p>Wind: ${currentData.current.wind_kph} km/h</p>
        `;

        resultHTML += `<h3>Following 4-Day Forecast</h3>`;
        resultHTML += `<div class="forecast-day-container">`;
        forecastData.forecast.forecastday.slice(1, 5).forEach((day) => {
            resultHTML += `
                <div class="forecast-day">
                    <h4>${day.date}</h4>
                    <p><strong>Max Temp:</strong> ${day.day.maxtemp_c}°C</p>
                    <p><strong>Min Temp:</strong> ${day.day.mintemp_c}°C</p>
                    <p><strong>Condition:</strong> ${day.day.condition.text}</p>
                    <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
                </div>
            `;
        });
        resultHTML += `</div>`; 

        resultDiv.innerHTML = resultHTML;

    } catch (err) {
        resultDiv.innerHTML = `<p>Error fetching weather data.</p>`;
    }
});

function exportToJson() {
    if (!weatherData) {
        alert("No weather data available to export!");
        return;
    }
    const jsonString = JSON.stringify(weatherData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "weather_data.json";
    link.click();
}

document.getElementById("export-button").addEventListener("click", exportToJson);
