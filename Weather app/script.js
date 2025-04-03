const search = document.getElementById('search-btn')   // getting access of search button
const input = document.getElementById('city-input')   // getting access of user input
const weatherIcon = document.getElementById('weather-icon')   // getting access of weather icon to be displayed
const temperature = document.getElementById('temp')   // getting access of temperature to be displayed
let city = document.getElementById('city')   // getting access of city name to be displayed
const humidity = document.getElementById('humidity')   // getting access of humidity to be displayed
const wind = document.getElementById('wind')   // getting access of wind speed to be displayed
const container = document.getElementById('container')   // getting access of the main div container


async function getData(cityName) {   // creating function for fetching API response

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=1d407b3639ed4292b77225159252903&q=${cityName}&aqi=yes`);  // Makes a network request to the WeatherAPI.
        if (!response.ok) {   // If the API returns an error response (e.g., 404), handle it manually
            throw new Error(`City not found (${response.status})`)   // This stops execution if the API call fails.
            // The throw keyword manually generates an error in JavaScript. It stops execution and sends the error to the nearest catch block.
        }
        return await response.json()   // converts the response data (which is in JSON format) into a JavaScript object.

    } catch (error) {
        alert(error.message);   // Shows an alert with the error message
        return null;   // Use return null in catch to avoid crashes and gracefully handle errors
    }
}

search.addEventListener('click', async function () {   // adding event listener on search button
    const userInput = input.value.trim();   // storing the user input in variable and clearing extra spaces

    if (userInput === '') {   // condition check if user doesn't enter anything
        alert('Please enter a city name')
        return;   // Stops the function from running further
    }

    const result = await getData(userInput)   // calling the fetch function
    // If we don’t use await, result will store the Promise itself, not the actual weather data. await getData(userInput); pauses execution until getData() finishes fetching and processing the API response.
    document.querySelector('.weather').style.display = 'block'   // Displaying weather details after search as initially they were hidden


    const condition = result.current.condition.text.toLowerCase()   // storing weather condition in variable. toLowerCase() ensures case-insensitive comparison.

    if (condition.includes('clear')) {   // includes() allows partial matches (e.g., "Light rain" will match "rain").
        weatherIcon.src = 'images/clear.png'   // updating weather icon based on diff weather condition
        container.style.backgroundImage = "url('https://i.gifer.com/Lx0q.gif')"   // updating the bg of div based on weather condition
    }
    else if (condition.includes('cloudy')) {
        weatherIcon.src = 'images/clouds.png'
        container.style.backgroundImage = "url('https://i.gifer.com/srG.gif')"
    }
    else if (condition.includes('drizzle')) {
        weatherIcon.src = 'images/drizzle.png'
        container.style.backgroundImage = "url('https://i.gifer.com/LSzq.gif')"
    }
    else if (condition.includes('mist')) {
        weatherIcon.src = 'images/mist.png'
        container.style.backgroundImage = "url('https://i.gifer.com/CRl.gif')"
    }
    else if (condition.includes('rain')) {
        weatherIcon.src = 'images/rain.png'
        container.style.backgroundImage = "url('https://i.gifer.com/WHmL.gif')"
    }
    else if (condition.includes('snow')) {
        weatherIcon.src = 'images/snow.png'
        container.style.backgroundImage = "url('https://i.gifer.com/YWuH.gif')"
    }

    temperature.innerText = `${Math.round(result.current.temp_c)}°c`   // updating temperature & using Math.round() to remove decimals
    city.innerText = `${result.location.name}, ${result.location.country}`   // updating city & country name
    humidity.innerText = `${result.current.humidity} %`   // updating humidity
    wind.innerText = `${result.current.wind_kph} km/h`   // updating wind speed
})