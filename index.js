
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "d6a5215dabc9526c2db8ba810ed2f205";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault(); // prevents default refresh page

    const city = cityInput.value; // gets the value of cityInput

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    } else {
        displayError("Please enter a city")
    }

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city,
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = ""; // resets text content
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city; // retrieves destructured city data from data
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`

    cityDisplay.classList.add("cityDisplay"); // adds css styling
    tempDisplay.classList.add("tempDisplay");

    card.appendChild(cityDisplay); // adds the city display to the card
    card.appendChild(tempDisplay); // adds the temp display to the card


}

function getWeatherEmoji(weatherId){

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent  = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}