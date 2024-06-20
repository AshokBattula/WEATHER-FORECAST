import React, { useState } from "react";

function App() {
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    // Reset error state and set loading state
    setError(null);
    setLoading(true);

    const API = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=96bc77a26485c73d24514fa6c50fe8d5&units=metric`;
    
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTemp(data.main.temp);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setCity(data.name);
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("There was an error fetching the weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      <div className="search">
        <input
          type="text"
          value={inputCity}
          name="search"
          placeholder="Enter City Name to Search"
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button onClick={handleClick} className="search-button">
          Search
        </button>
      </div>

      <div className="weather-img">
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/business-bicolor-icon/weather-109.png"
          alt="weather-logo"
        />
      </div>

      <div className="temp">
        <h1 className="degrees">{temp} °C</h1>
        <h2 className="place">{city}</h2>
      </div>

      <div className="humidity-wind">
        <div className="humidity">
          <img
            src="https://static-00.iconduck.com/assets.00/humidity-icon-512x419-5m7ztixz.png"
            alt="humidity-logo"
          />
        </div>
        <div className="humid">
          <h3 className="Humidity-percentage">{humidity}</h3>
          <p>Humidity</p>
        </div>

        <div className="wind">
          <img
            src="https://cdn-icons-png.flaticon.com/512/54/54298.png"
            alt="wind"
          />
        </div>
        <div className="wind-info">
          <h3 className="wind-percentage">{windSpeed} km/h</h3>
          <p>Wind Speed</p>
        </div>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;

