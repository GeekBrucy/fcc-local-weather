// used for timeout which prevent to manny http requests
let timer = null

// DOM manipulating
function handleDOM(dataObj) {
  let windDirection = handleWindDirection(WINDDIRECTION_DEG, dataObj.wind.deg)
  let sunrise = handleTimeStampToTime(dataObj.sys.sunrise)
  let sunset = handleTimeStampToTime(dataObj.sys.sunset)

  let pgContent = document.querySelector('.pg-content')
  let contentTitle = document.querySelector('.content-title')
  let contentBody = document.querySelector('.content-body')
  let titleHTML = `
  <h1 class="weather-info location-weather">
    <span class="city">${dataObj.name}</span>
    <span class="weather"><img class=icon src='${dataObj.weather[0].icon}'>${dataObj.weather[0].main}</span>
  </h1>
  <h2 class="weather-info">
    <span class="desc">${dataObj.weather[0].description}</span>
  </h2>
  `
  let bodyHTML = `
  <div class="weather-info temperature">
    <div>
      <div class="weather-info-item">
        <span class="weather-info-item-key">Current Temp:</span>
        <span class="weather-info-item-value">
          <span class="temp-value">${dataObj.main.temp}</span>
          <span class="temp-unit">&#8451;</span>
        </span>
      </div>
      <div class="weather-info-item">
        <span class="weather-info-item-key">Lowest Temp:</span>
        <span class="weather-info-item-value">
          <span class="temp-value">${dataObj.main.temp_min}</span>
          <span class="temp-unit">&#8451;</span>
        </span>
      </div>
      <div class="weather-info-item">
        <span class="weather-info-item-key">Highest Temp:</span>
        <span class="weather-info-item-value">
          <span class="temp-value">${dataObj.main.temp_max}</span>
          <span class="temp-unit">&#8451;</span>
        </span>
      </div>
      <div><button class="btn-celtofah toFah">To Fahrenheit</button></div>
    </div>
  </div>

  <div class="weather-info pressure-humidity">
    <div class="weather-info-item">
      <span class="weather-info-item-key">Atom Pressure:</span>
      <span class="weather-info-item-value">${dataObj.main.pressure} hPa</span>
    </div>
    <div class="weather-info-item">
      <span class="weather-info-item-key">Humidity:</span>
      <span class="weather-info-item-value">${dataObj.main.humidity}%</span>
    </div>
  </div>
  <div class="weather-info wind">
    <div class="weather-info-item">
      <span class="weather-info-item-key">Wind Speed:
      </span>
      <span class="weather-info-item-value">${dataObj.wind.speed} km/h</span>
    </div>
    <div class="weather-info-item">
      <span class="weather-info-item-key">Direction:</span>
      <span class="weather-info-item-value">${windDirection}</span>
    </div>
  </div>
  <div class="weather-info sun-info">
    <div class="weather-info-item">
      <span class="weather-info-item-key">Sunrise:
      </span>
      <span class="weather-info-item-value">${sunrise}</span>
    </div>
    <div class="weather-info-item">
      <span class="weather-info-item-key">Sunset:</span>
      <span class="weather-info-item-value">${sunset}</span>
    </div>
  </div>
  `
  handlePageBGImage(dataObj.weather[0].main, pgContent)
  contentTitle.innerHTML += titleHTML
  contentBody.innerHTML += bodyHTML
}

function handlePageBGImage(weather, targetEle) {
  for (let key in BG_IMAGE) {
    if (key.includes(weather.toLowerCase())) {
      targetEle.style.backgroundImage = "url('" + BG_IMAGE[key].img + "')"
    }
  }
}

// Preserve 2 digits after decimal point
function floatTwoDigits(num) {
  return Math.round(num * 100) / 100
}

// Make timestamp human readable
function handleTimeStampToTime(timeStamp) {
  let date_format = new Date(timeStamp * 1000)
  let hour = date_format.getHours().toString()
  let minute = date_format.getMinutes().toString()
  let second = date_format.getSeconds().toString()

  return hour.padStart(2, '0') + ':' + minute.padStart(2, '0') + ':' + second.padStart(2, '0')
}

// According to the given degree, return direction in string
function handleWindDirection(windObj, deg) {
  let direction = ''
  for (key in windObj) {
    if (deg > windObj[key].min && deg < windObj[key].max) {
      direction = key
    }
  }
  return direction
}

function handleCelToFah() {
  let temperatureDOM = document.querySelector('.temperature')
  let tempUnitDOM = temperatureDOM.querySelectorAll('.temp-unit')
  let btnCelToFah = document.querySelector('.btn-celtofah')
  btnCelToFah.addEventListener('click', function () {
    if (this.classList.contains('toFah')) {
      tempUnitDOM.forEach(function (el) {
        el.previousElementSibling.innerHTML =floatTwoDigits(+el.previousElementSibling.innerHTML * 1.8 + 32)
        el.innerHTML = '℉'
      })
      this.innerHTML = 'To Celsius'
    } else {
      tempUnitDOM.forEach(function (el) {
        el.previousElementSibling.innerHTML =floatTwoDigits((+el.previousElementSibling.innerHTML - 32) / 1.8)
        el.innerHTML = '℃'
      })
      this.innerHTML = "To Fahrenheit"
    }
    this.classList.toggle('toFah')
  })
}