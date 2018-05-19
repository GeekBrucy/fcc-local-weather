// used for timeout which prevent to manny http requests
var timer = null

// DOM manipulating
function handleDOM (dataObj) {
  var windDirection = handleWindDirection(WINDDIRECTION_DEG, dataObj.wind.deg)
  var sunrise = handleTimeStampToTime(dataObj.sys.sunrise)
  var sunset = handleTimeStampToTime(dataObj.sys.sunset)

  var pgContent = document.querySelector('.pg-content')
  var contentTitle = document.querySelector('.content-title')
  var contentBody = document.querySelector('.content-body')
  var titleHTML = `
  <h1 class="weather-info location-weather">
    <span class="city">${dataObj.name}</span>
    <span class="weather"><span class="icon"><img src='${dataObj.weather[0].icon}'></span>${dataObj.weather[0].main}</span>
  </h1>
  <h2 class="weather-info">
    <span class="desc">${dataObj.weather[0].description}</span>
  </h2>
  `
  var bodyHTML = `
  <div class="weather-info temperature">
    <div class="weather-info-item">
      <span class="weather-info-item-key">Lowest Temp:</span>
      <span class="weather-info-item-value">${dataObj.main.temp_min} &#8451;</span>
    </div>
    <div class="weather-info-item">
      <span class="weather-info-item-key">Highest Temp:</span>
      <span class="weather-info-item-value">${dataObj.main.temp_max} &#8451;</span>
    </div>
  </div>
  <div class="weather-info pressure-humidity">
    <div class="weather-info-item">
      <span class="weather-info-item-key">Atomspheric Pressure:</span>
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

function handlePageBGImage (weather, targetEle) {
  for (var key in BG_IMAGE) {
    if(key.includes(weather.toLowerCase())){
      console.dir(targetEle)
      console.log(BG_IMAGE[key].img)
      targetEle.style.backgroundImage = "url('"+ BG_IMAGE[key].img +"')"
    }
  }
  
}

// Preserve 2 digits after decimal point
function floatTwoDigits (num) {
  return Math.round(num * 100) / 100
}

// Make timestamp human readable
function handleTimeStampToTime (timeStamp) {
  var date_format = new Date(timeStamp * 1000)
  var hour = date_format.getHours().toString()
  var minute = date_format.getMinutes().toString()
  var second = date_format.getSeconds().toString()

  return hour.padStart(2, '0') + ':' + minute.padStart(2, '0') + ':' + second.padStart(2, '0')
}

// According to the given degree, return direction in string
function handleWindDirection (windObj, deg) {
  var direction = ''
  for(key in windObj) {
    if (deg > windObj[key].min && deg < windObj[key].max) {
      direction = key
    }
  }
  return direction
}