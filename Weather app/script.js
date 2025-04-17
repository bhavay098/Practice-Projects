const search = document.getElementById('search-btn')   // getting access of search button
const input = document.getElementById('city-input')   // getting access of user input
const weatherIcon = document.getElementById('weather-icon')   // getting access of weather icon to be displayed
const temperature = document.getElementById('temp')   // getting access of temperature to be displayed
let city = document.getElementById('city')   // getting access of city name to be displayed
const humidity = document.getElementById('humidity')   // getting access of humidity to be displayed
const wind = document.getElementById('wind')   // getting access of wind speed to be displayed
const container = document.getElementById('container')   // getting access of the main div container
const apiKey = "7be0e4f3594f76ee554ae4f5027627f7";  // API key
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";  // API URL


async function getData(cityName) {   // creating function for fetching API response

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);  // Makes a network request to the WeatherAPI.
        let data = await response.json();  // converts the response data (which is in JSON format) into a JavaScript object.
        if (!response.ok) {   // API responded, but something's wrong (e.g., wrong city). handles all failed HTTP responses (like 404, 401, 500).
            alert(data.message || 'City not found')  // data.message gives user-friendly messages from the API itself (like "city not found").
            return null;  // prevents crashes
        }
        return data;  // if API call is successful, returns the API response when this function will be caled

    } catch (error) {  // API didn't even get the request (network issue, bad fetch)
        alert('Network error. Please try again later.');   // Shows an alert with the error message
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


    const condition = result.weather[0].main.toLowerCase()   // storing weather condition in variable. toLowerCase() ensures case-insensitive comparison.

    if (condition.includes('clear')) {   // includes() allows partial matches (e.g., "Light rain" will match "rain").
        weatherIcon.src = 'images/clear.png'   // updating weather icon based on diff weather condition
        container.style.backgroundImage = "url('https://i.gifer.com/Lx0q.gif')"   // updating the bg of div based on weather condition
    }
    else if (condition.includes('clouds')) {
        weatherIcon.src = 'images/clouds.png'
        container.style.backgroundImage = "url('https://i.gifer.com/srG.gif')"
    }
    else if (condition.includes('drizzle')) {
        weatherIcon.src = 'images/drizzle.png'
        container.style.backgroundImage = "url('https://i.gifer.com/LSzq.gif')"
    }
    else if (condition.includes('atmosphere')) {
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

    temperature.innerText = `${Math.round(result.main.temp)}°c`   // updating temperature & using Math.round() to remove decimals
    city.innerText = `${result.name}, ${result.sys.country}`   // updating city & country name
    humidity.innerText = `${result.main.humidity} %`   // updating humidity
    wind.innerText = `${result.wind.speed} km/h`   // updating wind speed
})