const API_KEY = "810fd98fc6b59dcbfde1687bbe5b5c5b"

const getCurrentWeatherData = async() =>{
    const city="Pune";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return response.json()
}

const getHourlyForecast = async ({name : city}) =>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    return data.list.map(forecast => {
        const {main:{temp, temp_min, temp_max}, dt, dt_txt, weather :[{description, icon}]} = forecast;
        return { temp, temp_min, temp_max, dt, dt_txt, description, icon}
    })
}

// here temp is just the argument.
const formatTemperature = (temp) => `${temp?.toFixed(1)}°`; 

const loadCurrentWeather = ({name, main:{temp, temp_max, temp_min}, weather:[{description}] }) =>{
    const currentForecastElement = document.querySelector("#current-forecast");
    currentForecastElement.querySelector(".city").textContent = name;
    currentForecastElement.querySelector(".temp").textContent = formatTemperature(temp);
    currentForecastElement.querySelector(".description").textContent = description;
    currentForecastElement.querySelector(".min-max-temp").textContent = `H: ${formatTemperature(temp_max)} L: ${formatTemperature(temp_min)}`;



}

const loadHourlyForecast = (hourlyForecast) =>{
    
}


document.addEventListener("DOMContentLoaded", async ()=>{
   const currentWeather = await getCurrentWeatherData();
   loadCurrentWeather(currentWeather)
   const hourlyForecast = await getHourlyForecast(currentWeather)
})