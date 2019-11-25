/*//these functions will work together to get weather
//informaton for the current location and populate 
//a web page with the data.
'use strict';

// Set global variable for custom header required by 
//NWS API 
var idHeader = { headers: { "User-Agent":
"Student Learning Project - yourschoolemailaddress@byui.edu" } };

var storage = window.localStorage;
var sessStore = window.sessionStorage;
// Call the function to get our location
getGeoLocation();
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
     const lat = position.coords.latitude;
     const long = position.coords.longitude;
  
     // Combine the values
     const locale = lat + "," + long;
     console.log(`Lat and Long are: ${locale}.`);
  // Call getLocation function, send locale
  getLocation(locale);
  
    })
   } else {
    status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
   } // end else
  

// Gets longitude and latitude of current location
function getGeoLocation() {

} // end getGeoLocation
const status = document.getElementById('status');
 status.innerHTML = 'Getting Location...';

 // Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) is the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);

      var forecastHourlyURL = data.properties.forecastHourly;
      console.log(forecastHourlyURL);
      sessStore.setItem('forecastHourlyURL', forecastHourlyURL);
      
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
      
      let gridX = data.properties.gridX;
      console.log(gridX);
      storage.setItem('gridX', gridX);

      let gridY = data.properties.gridY;
      console.log(gridY);
      storage.setItem('gridY', gridY);
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
     getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function

   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function
   
   // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log(URL);
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store current weather information to sessionStorage 
      let temperature = data.properties.temperature.value;
      console.log(temperature);
      sessStore.setItem('temperature', temperature);

      let windChill = data.properties.windChill.value;
      console.log(windChill);
      sessStore.setItem('windChill', windChill);
   
      let windGust = data.properties.windGust.value;
      console.log(windGust);
      sessStore.setItem('windGust', windGust);

      let windSpeed = data.properties.windSpeed.value;
      console.log(windSpeed);
      sessStore.setItem('windSpeed', windSpeed);

      
      // Call the getForecast function
   let gridX = storage.getItem('gridX');
   console.log(gridX);

   let gridY = storage.getItem('gridY');
   console.log(gridY);
      getHiLo(gridX, gridY);
      // Call the getHourly function
      const forecastHourlyURL = sessStore.getItem('forecastHourlyURL');
      console.log(forecastHourlyURL);
      getHourly(forecastHourlyURL);
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

   function getHiLo(gridX, gridY) {
       const URL = 'https://api.weather.gov/gridpoints/PIH/' + gridX + "," + gridY + '/forecast';
       console.log(URL);
       fetch(URL, idHeader)
       .then(function(response){
        if(response.ok){ 
         return response.json(); 
        } 
        throw new ERROR('Response not OK.');
      })
      .then(function (data) {
        
        console.log(data);
        
        let tempHi = data.properties.periods[0].temperature;
        console.log(tempHi);
        sessStore.setItem('tempHi', tempHi);
        
        let tempLo = data.properties.periods[1].temperature;
        console.log(tempLo);
        sessStore.setItem('tempLo', tempLo);
    })
}
   /*function getForecastHourly(forecastHourlyURL) {
    fetch(forecastHourlyURL, idHeader)
    .then(function(response){
     if(response.ok){ 
      return response.json(); 
     } 
     throw new ERROR('Response not OK.');
   })
   .then(function (data) {
       console.log(data);
   })}

   function getHourly(forecastHourlyURL) {
    fetch(forecastHourlyURL)
     .then(function (response) {
      if (response.ok) {
       return response.json();
      }
      throw new ERROR('Response not OK.');
     })
     .then(function (data) {
      console.log('Data from getHourly function:');
      console.log(data); // Let's see what we got back
   
      // Store 12 hours of data to session storage  
      var hourData = [];
      let todayDate = new Date();
      var nowHour = todayDate.getHours();
      console.log(`nowHour is ${nowHour}`);
      for (let i = 0, x = 11; i <= x; i++) {
       if (nowHour < 24) {
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour++;
       } else {
        nowHour = nowHour - 12;
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour = 1;
       }
      }})}
     /* let forecastHourlyURL = "https://api.weather.gov/gridpoints/PIH/125,87/forecast/hourly"
      getHourly(forecastHourlyURL);*/