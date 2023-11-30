var currentCity = document.getElementById("currentDay");
var searchEl = document.getElementById("searchBtn");
var  forecastBoxesEl =document.getElementById("forecastBoxes");
var cityButtonsList = document.getElementById("cityButtonsList");
var defaultCity = "Nashville"

function getCurrentDayApi(lat, lon) {
    // If latitude and longitude are not provided, use the default city
    if (!lat || !lon) {
        const defaultCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=69a921b4fa027e06293fbe2493b27f37&units=imperial`;

        fetch(defaultCityUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                currentCity.innerHTML = '';

                var cityName = document.createElement('h3');
                var cityTemp = document.createElement('p');
                var cityWind = document.createElement('p');
                var cityHumid = document.createElement('p');

                const date = new Date(data.dt * 1000);
                const fixedDate = date.toISOString().split('T')[0];

                var cityDate = document.createElement('p');
                cityDate.textContent = fixedDate;

                cityName.textContent = data.name;
                cityTemp.textContent = ("Temp: " + data.main.temp + " F");
                cityWind.textContent = ("Wind: " + data.wind.speed + " MPH");
                cityHumid.textContent = ("Humidity: " + data.main.humidity + "%");

                if (data.weather && data.weather.length > 0) {
                    const weatherIcon = document.createElement('img');
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                    weatherIcon.src = iconUrl;

                    currentCity.append(cityName);
                    currentCity.append(weatherIcon);
                    currentCity.append(cityTemp);
                    currentCity.append(cityWind);
                    currentCity.append(cityHumid);
                }
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    } else {
        // If latitude and longitude are provided, fetch data based on those coordinates
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=69a921b4fa027e06293fbe2493b27f37&units=imperial`;

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                currentCity.innerHTML = '';

                var cityName = document.createElement('h3');
                var cityTemp = document.createElement('p');
                var cityWind = document.createElement('p');
                var cityHumid = document.createElement('p');

                const date = new Date(data.dt * 1000);
                const fixedDate = date.toISOString().split('T')[0];

                var cityDate = document.createElement('p');
                cityDate.textContent = fixedDate;

                cityName.textContent = data.name;
                cityTemp.textContent = ("Temp: " + data.main.temp + " F");
                cityWind.textContent = ("Wind: " + data.wind.speed + " MPH");
                cityHumid.textContent = ("Humidity: " + data.main.humidity + "%");

                if (data.weather && data.weather.length > 0) {
                    const weatherIcon = document.createElement('img');
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                    weatherIcon.src = iconUrl;

                    currentCity.append(cityName);
                    currentCity.append(weatherIcon);
                    currentCity.append(cityTemp);
                    currentCity.append(cityWind);
                    currentCity.append(cityHumid);
                }
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    }
}



function get5DayApi(lat, lon) {
    // If latitude and longitude are not provided, use the default city
    if (!lat || !lon) {
        const defaultCityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=69a921b4fa027e06293fbe2493b27f37&units=imperial`;

        fetch(defaultCityUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                forecastBoxesEl.innerHTML = '';
                currentCity.innerHTML = '';

                // Keep track of unique dates
                const uniqueDates = [];

                for (let i = 0; i < data.list.length; i++) {
                    const date = new Date(data.list[i].dt * 1000);
                    const fixedDate = date.toISOString().split('T')[0];

                    // Check if the date is already added
                    if (!uniqueDates.includes(fixedDate)) {
                        uniqueDates.push(fixedDate);

                        // Check if the weather data is available for the current forecast
                        if (data.list[i].weather && data.list[i].weather.length > 0) {
                            const weatherIcon = document.createElement('img');
                            const iconCode = data.list[i].weather[0].icon;
                            const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                            weatherIcon.src = iconUrl;
                            weatherIcon.alt = data.list[i].weather[0].description;

                            // Create the dayContainer and append it to forecastBoxesEl
                            var dayContainer = document.createElement('div');
                            dayContainer.classList.add('col-md-2');
                            dayContainer.classList.add('indivBoxes');

                            var cityDate = document.createElement('p');
                            cityDate.textContent = fixedDate;

                            var cityTemp = document.createElement('p');
                            cityTemp.textContent = ("Temp: " + data.list[i].main.temp + " F");

                            var cityWind = document.createElement('p');
                            cityWind.textContent = ("Wind: " + data.list[i].wind.speed + " MPH");

                            var cityHumid = document.createElement('p');
                            cityHumid.textContent = ("Humidity: " + data.list[i].main.humidity + "%");

                            if (i === 0) {
                                var cityName = document.createElement('h3');
                                cityName.textContent = data.city.name;

                                dayContainer.classList.remove('indivBoxes');
                                dayContainer.append(cityName);
                                dayContainer.append(cityDate);
                                dayContainer.appendChild(weatherIcon);
                                dayContainer.append(cityTemp);
                                dayContainer.append(cityWind);
                                dayContainer.append(cityHumid);

                                currentCity.append(dayContainer);
                            } else {
                                dayContainer.append(cityDate);
                                dayContainer.appendChild(weatherIcon);
                                dayContainer.append(cityTemp);
                                dayContainer.append(cityWind);
                                dayContainer.append(cityHumid);

                                forecastBoxesEl.append(dayContainer);
                            }
                        }
                    }
                }
            })
            .catch(function (error) {
                console.error('Error fetching 5-day forecast data:', error);
            });
    } else {
        // If latitude and longitude are provided, fetch data based on those coordinates
        const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=69a921b4fa027e06293fbe2493b27f37&units=imperial`;

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                forecastBoxesEl.innerHTML = '';
                currentCity.innerHTML = '';

                // Keep track of unique dates
                const uniqueDates = [];

                for (let i = 0; i < data.list.length; i++) {
                    const date = new Date(data.list[i].dt * 1000);
                    const fixedDate = date.toISOString().split('T')[0];

                    // Check if the date is already added
                    if (!uniqueDates.includes(fixedDate)) {
                        uniqueDates.push(fixedDate);

                        // Check if the weather data is available for the current forecast
                        if (data.list[i].weather && data.list[i].weather.length > 0) {
                            const weatherIcon = document.createElement('img');
                            const iconCode = data.list[i].weather[0].icon;
                            const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                            weatherIcon.src = iconUrl;
                            weatherIcon.alt = data.list[i].weather[0].description;

                            // Create the dayContainer and append it to forecastBoxesEl
                            var dayContainer = document.createElement('div');
                            dayContainer.classList.add('col-md-2');
                            dayContainer.classList.add('indivBoxes');

                            var cityDate = document.createElement('p');
                            cityDate.textContent = fixedDate;

                            var cityTemp = document.createElement('p');
                            cityTemp.textContent = ("Temp: " + data.list[i].main.temp + " F");

                            var cityWind = document.createElement('p');
                            cityWind.textContent = ("Wind: " + data.list[i].wind.speed + " MPH");

                            var cityHumid = document.createElement('p');
                            cityHumid.textContent = ("Humidity: " + data.list[i].main.humidity + "%");

                            if (i === 0) {
                                var cityName = document.createElement('h3');
                                cityName.textContent = data.city.name;

                                dayContainer.classList.remove('indivBoxes');
                                dayContainer.append(cityName);
                                dayContainer.append(cityDate);
                                dayContainer.appendChild(weatherIcon);
                                dayContainer.append(cityTemp);
                                dayContainer.append(cityWind);
                                dayContainer.append(cityHumid);

                                currentCity.append(dayContainer);
                            } else {
                                dayContainer.append(cityDate);
                                dayContainer.appendChild(weatherIcon);
                                dayContainer.append(cityTemp);
                                dayContainer.append(cityWind);
                                dayContainer.append(cityHumid);

                                forecastBoxesEl.append(dayContainer);
                            }
                        }
                    }
                }
            })
            .catch(function (error) {
                console.error('Error fetching 5-day forecast data:', error);
            });
    }
}



function getCityApi(cityName) {

    const citySearchInput = cityName || document.getElementById('cityInput').value;

    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchInput}&appid=69a921b4fa027e06293fbe2493b27f37`;

    if (citySearchInput.trim() !== '') {
        const userCityApi = requestUrl.replace(`q=${cityName}`, `q=${encodeURIComponent(citySearchInput)}`);

        fetch(userCityApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data.name);
                console.log(data.coord.lat);
                console.log(data.coord.lon);

                get5DayApi(data.coord.lat, data.coord.lon);
                getCurrentDayApi(data.coord.lat, data.coord.lon);
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    }
}
searchEl.addEventListener('click', function(){
    getCityApi();
});


window.onload = function () {
    getCurrentDayApi();
    get5DayApi();
};

cityButtonsList.addEventListener('click', function (event) {

    if (event.target.tagName === 'BUTTON') {
    
        var selectedCity = event.target.textContent;

        getCityApi(selectedCity);
    }
});