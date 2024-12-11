const apiKey = "86b728f2e284e6b1efba8ea79f9f349a";  // For security reasons this should be hidden
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const staticWeatherIcon = document.querySelector(".static-weather-icon");

// Cities for static weather display
const staticCities = ["Mukilteo", "Edmonds", "Bellingham"];

// Fetch and update static weather icons
async function updateStaticWeather() {
    staticCities.forEach(async (city, index) => {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status == 200) {
            const data = await response.json();
            const iconElement = staticCities[index];
            if (data.weather[0].main == "Clouds") {
                iconElement.src = "images/clouds.png";
            } 
            else if (data.weather[0].main == "Clear") {
                iconElement.src = "images/sun.png";
            } 
            else if (data.weather[0].main == "Rain") {
                iconElement.src = "images/rain.png";
            } 
            else if (data.weather[0].main == "Drizzle") {
                iconElement.src = "images/drizzle.png";
            } 
            else if (data.weather[0].main == "Mist") {
                iconElement.src = "images/mist.png";
            } 
            else if (data.weather[0].main == "Snow") {
                iconElement.src = "images/snow.png";
            }
        } else {
            console.error(`Failed to fetch weather for ${city}: ${response.status}`);
        }
    });
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    // print what response says here
    console.log(response.status);

    if (response.status != 200) {  // ERRORS: 404, 500, 400 
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " mp/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/sun.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click", () => { checkWeather(searchBox.value); })

/*updateStaticWeather();*/
