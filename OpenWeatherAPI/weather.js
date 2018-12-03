var appId = '2f0c6bbc967e0ec77b9bb121874eddfa';
var units = 'imperial';
var searchMethod;

function getSearchMethod(searchTerm){
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
		searchMethod = 'zip';
	}
	else{
		searchMethod = 'q';
	}
}

function searchWeather(searchTerm){
	getSearchMethod(searchTerm);
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
		return result.json();
		}).then(result => {
			init(result);
		})
}

function init(resultFromServer){
	switch(resultFromServer.weather[0].main){
		case 'Clear':
			document.body.style.backgroundImage = 'url("clear.jpg")'
			break;

		case 'Clouds':
			document.body.style.backgroundImage = 'url("clouds.jpg")'
			break;

		case 'Rain':
		case 'Drizzle':
		case 'Mist':
			document.body.style.backgroundImage = 'url("rain.jpg")'
			break;

		case 'Thunderstorm':
			document.body.style.backgroundImage = 'url("storm.jpg")'
			break;

		case 'Snow':
			document.body.style.backgroundImage = 'url("snow.jpg")'
			break;

		default:
			document.body.style.backgroundImage = 'url("default.jpg")'
			break;
	}
	var weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	var temperatureElement = document.getElementById('temperature');
	var humidityElement = document.getElementById('humidity');
	var windSpeedElement = document.getElementById('windSpeed');
	var cityHeader = document.getElementById('cityHeader');
	var weatherIcon = document.getElementById('documentIconImg');

	weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

	var resultDescription = resultFromServer.weather[0].description;
	weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
	windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = 'humidity levels at ' + resultFromServer.main.humidity + '%';

	setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
	var weatherContainer = document.getElementById('weatherContainer');
	var weatherContainerHeight = weatherContainer.clientHeight;
	var weatherContainerWidth = weatherContainer.clientWidth;

	weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
	weatherContainer.style.visibility = 'visible';

}
document.getElementById('searchBtn').addEventListener('click', () => {
	var searchTerm = document.getElementById('searchInput').value;
		if(searchTerm)
			searchWeather(searchTerm);
})