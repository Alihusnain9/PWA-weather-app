import { useState } from "react";
import "./App.css";
import { FetchWeather } from "./API/FetchWeather";
function App() {
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState({});

  const Search = async (e) => {
    if (e.key === "Enter") {
      const result = await FetchWeather(value);
      console.log(result);
      setWeather(result);
      setValue("");
    }
  };

  return (
    <>
      <div className="container">
        <input
          autoFocus
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={Search}
        />

        {weather.main && (
          <div className="city">
            <div className="cntry">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </div>
            <div className="temp">
              <span>{Math.round(weather.main.temp)}</span>
              <sup>&deg;C</sup>
            </div>
            <div className="img">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <div className="info">
              <span>{weather.weather[0].description}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
