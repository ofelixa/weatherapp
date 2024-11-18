function getWeather() {
    const apiKey = '8fa10489261f00c10684127c75a07005';
    const city = document.getElementById('city').value;
    if (!city){
        alert('Hey Masa Enter the City for There');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error=> {
        console.error('Error fetching current weather data:', error);
        alert( 'Could not fetch current weather data. Try Biom wai...Sorry');
    });
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data =>{
        displayHourlyForecast(data.list);
    })
    .catch(error=>{
        console.error('Error fetching hourly forecast data:', error);
        alert(`Couldn't fetch hourly forecast data. Try Biom wai...Sorry`);
    });
}
function displayWeather(data) {
    const tempdiv = document.getElementById('temp');
    const weatherinfodiv =document.getElementById('weatherinfo');
    const weatherIcon =document.getElementById('weather-icon')
    const hourlyforecastdiv = document.getElementById('hourly-forecast');
    weatherinfodiv.innerHTML = '';
    hourlyforecastdiv.innerHTML = '';
    tempdiv.innerHTML ='';
    if (data.cod =='404'){
        weatherinfodiv.innerHTML = `<p>${data.message}</p>`;
    } else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
        <p>${temperature}°C</p>
        `;
        const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>
        `;
        tempdiv.innerHTML = temperatureHTML;
        weatherinfodiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        showImage();
    }
    }
    function displayHourlyForecast(hourlydata) {
        const hourlyforecastdiv = document.getElementById('hourly-forecast');
        const next24Hours = hourlydata.slice(0,8)
        next24Hours.forEach(item =>{
            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            const hourlyItemHtml = `
            <div class= "hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
            </div>
            `;
            hourlyforecastdiv.innerHTML += hourlyItemHtml;
        });
    }
    function showImage(){
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }