const apiKey = "86b728f2e284e6b1efba8ea79f9f349a";  // For security reasons this should be hidden
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const currentHour = new Date().getHours();

// Fetch and update static weather icons
async function updateStaticWeather(city, id) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status == 200) {
            var data = await response.json();
            
            document.querySelector(`.city-${id}`).innerHTML = data.name;
            document.querySelector(`.temp-${id}`).innerHTML = Math.round(data.main.temp) + "°F";
            document.querySelector(`.humidity-${id}`).innerHTML = data.main.humidity + "%";
            document.querySelector(`.wind-${id}`).innerHTML = data.wind.speed + " mp/h";
            
            const iconElement = document.querySelector(`.weather-icon-${id}`);

            if (data.weather[0].main == "Clouds") {
                iconElement.src = "weather_icons/cloudsWmoon.png";
                if (6 <= currentHour && currentHour <= 18) {
                    iconElement.src = "weather_icons/cloudsWsun.png";
                }
            } 
            else if (data.weather[0].main == "Clear") {
                iconElement.src = "weather_icons/moon.png";
                if (6 <= currentHour && currentHour <= 18) {
                    iconElement.src = "weather_icons/sun.png";
                }
            } 
            else if (data.weather[0].main == "Rain") {
                iconElement.src = "weather_icons/rain.png";
            } 
            else if (data.weather[0].main == "Drizzle") {
                iconElement.src = "weather_icons/drizzle.png";
            } 
            else if (data.weather[0].main == "Mist") {
                iconElement.src = "weather_icons/mist.png";
            } 
            else if (data.weather[0].main == "Snow") {
                iconElement.src = "weather_icons/snow.png";
            }
        } else {
            console.error(`Failed to fetch weather for ${city}: ${response.status}`);
        }
    };

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
            weatherIcon.src = "weather_icons/cloudsWmoon.png";
            if (6 <= currentHour && currentHour <= 18) {
                weatherIcon.src = "weather_icons/cloudsWsun.png";
            }
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "weather_icons/moon.png";
            if (6 <= currentHour && currentHour <= 18) {
                weatherIcon.src = "weather_icons/sun.png";
            }
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "weather_icons/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "weather_icons/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "weather_icons/mist.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "weather_icons/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click", () => { checkWeather(searchBox.value); })

updateStaticWeather('Mukilteo', 'mukilteo');
updateStaticWeather('Edmonds', 'edmonds');
updateStaticWeather('Bellingham', 'bellingham');


