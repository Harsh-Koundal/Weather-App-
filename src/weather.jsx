import React, { useEffect, useState } from 'react'
import './weather.css'
import sunny from './images/sunny.png'
import cloud from './images/partly-cloudy.png'
import rain from './images/rainy.png'
import snow from './images/snowy.webp'

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("india");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const Api_Key = "110125b3ec34ffff24fe01794633a5eb";

    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`);
            if (!response.ok) {
                throw new Error("city not Found");

            }
            const data = await response.json();
            setWeather(data);
            console.log(data);
            
            
            
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
        
    };
    useEffect(() => {
        fetchWeather();

    }, []);
     let icon = sunny;
        if (weather) {
            const main = weather.weather[0].main.toLowerCase();
            if (main.includes("rain")) icon = rain;
            if (main.includes("cloud")) icon = cloud;
            if (main.includes("snow")) icon = snow;
        } else {
            icon = sunny
        }
    return (
        <div className="main">
      <h1>Weather</h1>
      <div className="input">
        <input
          type="text"
          placeholder="Search for a city..."
          id="city"
          onChange={(e) => setCity(e.target.value)}
         onKeyDown={(e)=>{
            if(e.key === "Enter"){
                fetchWeather();
            }
         }}/>
        <button id="search" onClick={fetchWeather} >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <>
          <div className="display">
            <div className="left">
              <h3>{weather.name}</h3>
              <h2>{weather.main.temp} °C</h2>
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="right">
              <img src={icon} alt={weather.weather[0].description} />
            </div>
          </div>

          <div className="main-data">
            <div className="data-headings">
              <p>High/Low</p>
              <p>Wind</p>
              <p>Humidity</p>
            </div>
            <div className="data">
              <h4>
                {weather.main.temp_max}°C / {weather.main.temp_min}°C
              </h4>
              <h4>{weather.wind.speed} km/h</h4>
              <h4>{weather.main.humidity}%</h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;