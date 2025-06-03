import React from "react";
import "./App.css";
import PlantList from "./components/PlantList";
import WeatherInfo from "./components/WeatherInfo";


console.log("ENV TEST:", process.env.REACT_APP_WEATHER_API_KEY);

function App() {
    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>🌿 Aqua-Ram</h1>
            <PlantList />
            <WeatherInfo />
        </div>
    );
}

export default App;
