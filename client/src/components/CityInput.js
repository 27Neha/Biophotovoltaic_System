import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Wifi, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

// Sample city data for autocomplete (would be replaced with API call)
const MAJOR_CITIES = [
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
  { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
  { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729 },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173 },
  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437 },
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832 }
];

function CityInput({ userData, updateUserData, onNext, onPrevious }) {
  const [cityInput, setCityInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Filter cities based on input
  useEffect(() => {
    if (cityInput.length >= 2) {
      const filtered = MAJOR_CITIES.filter(city =>
        city.name.toLowerCase().includes(cityInput.toLowerCase()) ||
        city.country.toLowerCase().includes(cityInput.toLowerCase())
      ).slice(0, 8);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [cityInput]);

  // Handle geolocation
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding to get city name (would use API in production)
          const mockCity = {
            name: 'Current Location',
            country: 'Detected Country',
            lat: latitude,
            lon: longitude
          };

          updateUserData({
            city: mockCity.name,
            coordinates: { lat: latitude, lon: longitude }
          });

          // Fetch weather data
          await fetchWeatherData(mockCity.lat, mockCity.lon);

          setCityInput(mockCity.name);
          setIsLocating(false);
        } catch (err) {
          setError('Failed to detect your location');
          setIsLocating(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location. Please try again or enter manually.');
        setIsLocating(false);
      }
    );
  };

  // Fetch weather data
  const fetchWeatherData = async (lat, lon) => {
    try {
      // This would be replaced with actual API call
      // const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);

      // Mock weather data for now
      const mockWeather = {
        temperature: 22,
        humidity: 65,
        uvIndex: 6,
        cloudCover: 30,
        conditions: 'Partly Cloudy',
        windSpeed: 12,
        visibility: 10
      };

      updateUserData({ weather: mockWeather });
    } catch (err) {
      console.error('Failed to fetch weather data:', err);
      setError('Failed to fetch weather data');
    }
  };

  // Handle city selection
  const handleCitySelect = async (city) => {
    setCityInput(city.name);
    setShowSuggestions(false);
    setError('');
    setIsLoading(true);

    try {
      updateUserData({
        city: city.name,
        coordinates: { lat: city.lat, lon: city.lon }
      });

      await fetchWeatherData(city.lat, city.lon);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch data for this city');
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityInput.trim()) {
      setError('Please enter a city name');
      return;
    }

    // Find exact match or closest suggestion
    const selectedCity = suggestions.find(city =>
      city.name.toLowerCase() === cityInput.toLowerCase()
    ) || suggestions[0];

    if (selectedCity) {
      await handleCitySelect(selectedCity);
    } else {
      setError('City not found. Please select from the suggestions.');
    }
  };

  const canProceed = userData.city && userData.coordinates && userData.weather;

  return (
    <div className="city-input-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="city-input-container"
      >
        <div className="input-header">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="icon-container"
          >
            <MapPin size={48} />
          </motion.div>

          <h1>Enter Your City</h1>
          <p>
            Tell us your location to get personalized fruit recommendations
            and accurate solar energy calculations based on local weather conditions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="city-form">
          <div className="input-group">
            <div className="input-wrapper">
              <Search className="input-icon" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name (e.g., London, Tokyo, New York)"
                className="city-input"
                disabled={isLoading || isLocating}
                autoComplete="off"
              />

              {(isLoading || isLocating) && (
                <div className="input-spinner">
                  <Loader2 size={20} className="spinner" />
                </div>
              )}
            </div>

            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="suggestions-dropdown"
                >
                  {suggestions.map((city, index) => (
                    <motion.div
                      key={`${city.name}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="suggestion-item"
                      onClick={() => handleCitySelect(city)}
                    >
                      <div className="suggestion-info">
                        <div className="city-name">{city.name}</div>
                        <div className="country-name">{city.country}</div>
                      </div>
                      <MapPin size={16} className="suggestion-icon" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="error-message"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <div className="location-buttons">
            <button
              type="button"
              onClick={handleGeolocation}
              disabled={isLocating || isLoading}
              className="geo-location-btn"
            >
              <Wifi size={20} />
              {isLocating ? 'Detecting...' : 'Use My Location'}
            </button>
          </div>

          {userData.weather && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="weather-preview"
            >
              <h3>Current Weather Conditions</h3>
              <div className="weather-grid">
                <div className="weather-item">
                  <div className="weather-value">{userData.weather.temperature}°C</div>
                  <div className="weather-label">Temperature</div>
                </div>
                <div className="weather-item">
                  <div className="weather-value">{userData.weather.humidity}%</div>
                  <div className="weather-label">Humidity</div>
                </div>
                <div className="weather-item">
                  <div className="weather-value">{userData.weather.uvIndex}</div>
                  <div className="weather-label">UV Index</div>
                </div>
                <div className="weather-item">
                  <div className="weather-value">{userData.weather.cloudCover}%</div>
                  <div className="weather-label">Cloud Cover</div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={onPrevious}
              className="btn-secondary"
            >
              Previous
            </button>

            <button
              type="submit"
              disabled={!canProceed || isLoading}
              className="btn-primary"
            >
              {isLoading ? 'Processing...' : 'Continue to Recommendations'}
            </button>
          </div>
        </form>
      </motion.div>

      <style jsx>{`
        .city-input-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .city-input-container {
          max-width: 600px;
          width: 100%;
        }

        .input-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.2) 100%);
          border: 2px solid rgba(74, 222, 128, 0.5);
          border-radius: 50%;
          margin-bottom: 24px;
          color: #4ade80;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .input-header p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.8);
        }

        .city-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group {
          position: relative;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.6);
          pointer-events: none;
        }

        .city-input {
          width: 100%;
          padding: 16px 50px 16px 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .city-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .city-input:focus {
          outline: none;
          border-color: #4ade80;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.1);
        }

        .input-spinner {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #4ade80;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          margin-top: 8px;
          max-height: 300px;
          overflow-y: auto;
          z-index: 50;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .suggestion-item:hover {
          background: rgba(74, 222, 128, 0.1);
        }

        .suggestion-item:last-child {
          border-bottom: none;
        }

        .suggestion-info {
          flex: 1;
        }

        .city-name {
          font-weight: 600;
          color: white;
          margin-bottom: 2px;
        }

        .country-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .suggestion-icon {
          color: rgba(255, 255, 255, 0.4);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          color: #ef4444;
          font-size: 0.9rem;
        }

        .location-buttons {
          display: flex;
          justify-content: center;
        }

        .geo-location-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .geo-location-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(74, 222, 128, 0.5);
        }

        .geo-location-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .weather-preview {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
        }

        .weather-preview h3 {
          text-align: center;
            margin-bottom: 20px;
          color: #4ade80;
          font-weight: 600;
        }

        .weather-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .weather-item {
          text-align: center;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .weather-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #4ade80;
          margin-bottom: 4px;
        }

        .weather-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .form-actions {
          display: flex;
          gap: 16px;
          justify-content: space-between;
        }

        .btn-secondary,
        .btn-primary {
          padding: 14px 28px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .btn-primary {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(74, 222, 128, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          .input-header p {
            font-size: 1rem;
          }

          .weather-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-secondary,
          .btn-primary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default CityInput;