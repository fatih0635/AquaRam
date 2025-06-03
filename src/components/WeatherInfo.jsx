import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const city = "Istanbul"; // İsteğe bağlı sabit şehir

        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                );
                setWeather(response.data);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
            }
        };

        fetchWeather();
    }, []);

    if (!weather) return <p>Loading weather data...</p>;

    return (
        <div style={{ marginTop: "2rem", padding: "1rem", background: "#e3fcec", borderRadius: "8px" }}>
            <h3>🌦 Weather in {weather.name}</h3>
            <p>🌡 Temperature: {weather.main.temp}°C</p>
            <p>☁️ Condition: {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
    );
};

export default WeatherInfo;
