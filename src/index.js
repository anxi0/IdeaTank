const addIdea = document.querySelector('.js-record'),
    tankList = document.querySelector('.js-tankList'),
    clock = document.querySelector('.timeWeather').querySelector('div:nth-child(1)'),
    weather = document.querySelector('.timeWeather').querySelector('div:nth-child(2)'),
    API = '0df1fd45f42e3e488478273b9f8ba1f8',
    userName = document.querySelector('.js-name'); //good

const USER_LS = 'currentUser';
const WEATHER_LS = 'currentWeather';

function paintIdea(idea) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    delBtn.innerText = "❌";
    span.innerText = idea;
    li.appendChild(delBtn);
    li.appendChild(span);
    tankList.appendChild(li);
}

function handleInput(event) {
    event.preventDefault();
    const text = addIdea.querySelector('input').value;
    paintIdea(text);
}
function getTime() {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    clock.innerText=`${hour<10 ?  "0"+hour: hour}:${minute<10 ?  "0"+minute: minute}:${second<10 ?  "0"+second: second}`;
}

function getWeather(lat,long) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}&units=metric`
    ).then(function (res) {
        return res.json();
    }).then(function (json) {
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp}°C in ${place}`;
    });
}

function handleGeoSuccess(location) {
    const latitude = location.coords.latitude,
        longitude = location.coords.longitude;
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
    getWeather(latitude,longitude); 
}

function handleGeoFail() {
    console.log('can\'t');
    
}

function getCoord() {
    const location = navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoFail);
}

function printName() {
    const name = localStorage.getItem(USER_LS);
    userName.querySelector('h1').innerText = 'Hi, ' + name;
}

function handleSubmit() {
    const inputName = userName.querySelector('input').value;
    localStorage.setItem(USER_LS, inputName);
}

function loadName() {
    const name = localStorage.getItem(USER_LS);
    if (name !== null) {
        printName();
    }
}

function loadWeather() {
    const currentWeather = localStorage.getItem(WEATHER_LS);
    if (currentWeather !== null) {
        const parseCoords = JSON.parse(currentWeather);
        getWeather(parseCoords.latitude,parseCoords.longitude);
        weather.innerText = parseCoords;
    } else {
        getCoord();
    }
}

function init() {   
    loadWeather();
    loadName();
    userName.addEventListener('submit', handleSubmit);
    addIdea.addEventListener('submit', handleInput);
    setInterval(getTime, 1000);
    setInterval(getCoord, 600000);
}

init();