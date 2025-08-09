import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather({ trip }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            fetchWeather();
        }
    }, [trip]);

    const fetchWeather = async () => {
        try {
            setLoading(true);
            const location = trip.userSelection.location.label;

            // Using OpenWeatherMap API (you'll need to add VITE_WEATHER_API_KEY to .env.local)
            const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

            if (!API_KEY) {
                setError("Weather API key not configured");
                return;
            }

            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
            );

            setWeather(response.data);
        } catch (err) {
            console.error("Weather fetch error:", err);
            setError("Unable to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (condition) => {
        const iconMap = {
            'clear': '☀️',
            'clouds': '☁️',
            'rain': '🌧️',
            'snow': '❄️',
            'thunderstorm': '⛈️',
            'drizzle': '🌦️',
            'mist': '🌫️',
            'fog': '🌫️'
        };

        return iconMap[condition.toLowerCase()] || '🌤️';
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white">
                <div className="animate-pulse">
                    <div className="h-6 bg-blue-300 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-blue-300 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-600 mb-2">Weather Information</h3>
                <p className="text-gray-500">{error || "Weather data not available"}</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                🌤️ Current Weather in {weather.name}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                    <div className="text-3xl mb-2">
                        {getWeatherIcon(weather.weather[0].main)}
                    </div>
                    <p className="text-sm opacity-90">{weather.weather[0].description}</p>
                </div>

                <div className="text-center">
                    <div className="text-2xl font-bold mb-1">
                        {Math.round(weather.main.temp)}°C
                    </div>
                    <p className="text-sm opacity-90">Temperature</p>
                </div>

                <div className="text-center">
                    <div className="text-2xl font-bold mb-1">
                        {weather.main.humidity}%
                    </div>
                    <p className="text-sm opacity-90">Humidity</p>
                </div>

                <div className="text-center">
                    <div className="text-2xl font-bold mb-1">
                        {Math.round(weather.wind.speed)} m/s
                    </div>
                    <p className="text-sm opacity-90">Wind Speed</p>
                </div>
            </div>

            <div className="mt-4 flex justify-between text-sm opacity-90">
                <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
                <span>Visibility {Math.round(weather.visibility / 1000)}km</span>
            </div>
        </div>
    );
}

export default Weather;