import React, { useState } from 'react';
import './Openwheather.css'; // Import CSS

const Openwheather = () => {
    let Api = {
        key: "b222b945d0dde803ca7bbd6c7e6c98b8",
        url: "https://api.openweathermap.org/data/2.5/weather"
    };

    let [search, setSearch] = useState("");
    let [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const SearchWeather = () => {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors
        fetch(`${Api.url}?q=${search}&appid=${Api.key}&units=metric`)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === "404") {
                    setError("City not found");
                    setWeather(null);
                } else {
                    setWeather(data);
                }
                setLoading(false); // Stop loading
            })
            .catch((err) => {
                setError("An error occurred");
                setLoading(false); // Stop loading
            });
    };

    const enter = (e) => {
        if (e.key === "Enter") {
            SearchWeather();
        }
    };

    return (
        <div className="weather-container">
            <section className="weather-section">
                <h1>Welcome to the Weather Forecasting Center</h1>
                <input
                    type="text"
                    placeholder="Enter city name..."
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={enter}
                    className="search-input"
                />
                <br /><br />
                <button onClick={SearchWeather} className="search-button">Search</button>
            </section>

            {loading ? (
                <p>Loading... 🏃‍♂️</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : weather ? (
                <>
                    <h1>Place name : {weather.name} ✔</h1>
                    <h2>Temperature: {weather.main.temp}°C ✔</h2>
                </>
            ) : (
                <p>No data available. Please search for a city.</p>
            )}
        </div>
    );
};

export default Openwheather;

