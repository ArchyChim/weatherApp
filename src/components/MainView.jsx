import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'

function  MainView () {
   const [city, setCity] = useState("");
   const [weather, setWeather] = useState(null);
   const [error, setError] =  useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const fetchWeather = async () => {
      setIsLoading(true);
      try {
         const API_KEY = "379a02cbe90444e4abf15914252607";
         const response = await fetch (
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=es`
         );

         if (!response.ok) throw new Error ("Ciudad no encontrada");
         const data = await response.json();
         setWeather({
            city: data.location.name,
            temp: data.current.temp_c,
            description: data.current.condition.text,
            humidity: data.current.humidity,
            icon: data.current.condition.icon
         });
         setError(null);
      } catch(err) {
         setError(err.message);
         setWeather(null);
      } finally {
         setIsLoading(false);
      }
   };

   return (

      <div className="weather-app">

         <div className="card-container">
            <header className="header">
               <h1 className="title">Zamna Weather</h1>
            </header>

            <div className="search-wrapper">
               
               <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e)=> {
                     if (e.key === "Enter") {
                        fetchWeather();
                     }
                  }}
                  placeholder="Buscar ciudad"
                  className="search-input"
               />

               <span className="search-icon" onClick={fetchWeather}>
                  <FontAwesomeIcon icon={isLoading ? faSpinner: faSearch} spin={isLoading}/>
               </span> 

            </div>

            {weather && (

               <div className="weather-data">
            
                  <h2 className="city">{weather.city}</h2>
                  <img src={weather.icon} alt={weather.description} className="weather-icon" />
                  <p className="temperature">{weather.temp}°C</p>
                  <p className="description">{weather.description}</p>
                  <p className="humidity">Humedad: {weather.humidity}%</p>
                  
               </div>
            )}

         </div>
      
      </div>
  );

}

export default MainView