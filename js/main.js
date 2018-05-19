(function (){
  navigator.geolocation.getCurrentPosition(success, error, options);
})()

// Test: get current location
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// get location successfully
function success (pos) {
  var result = {}
  var crd = pos.coords;
  if (timer) {
    clearTimeout(timer)
  }
  // prevent to manny http requests
  timer = setTimeout(getInfo(crd), 50)
}
// get location fail
function error (err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// get location successfully: entry function
function getInfo (pos, resObj) {
  var lat = 'lat=' + floatTwoDigits(pos.latitude)
  var lon = 'lon=' + floatTwoDigits(pos.longitude)

  var urlStr = 'https://fcc-weather-api.glitch.me/api/current?'+ lat + '&' + lon

  // testing data
  // var urlStr = '../mock/weather.json'
  fetch(urlStr)
  .then(res => {
    return res.json()
  })
  .then(data => {
    handleDOM(data)
  })
}