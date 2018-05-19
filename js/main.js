(function () {
  // Test: get current location
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  // get location successfully
  function success (pos) {
    let result = {}
    let crd = pos.coords;
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
    let lat = 'lat=' + floatTwoDigits(pos.latitude)
    let lon = 'lon=' + floatTwoDigits(pos.longitude)

    // let urlStr = 'https://fcc-weather-api.glitch.me/api/current?'+ lat + '&' + lon

    // testing data
    let urlStr = '../mock/weather.json'
    fetch (urlStr)
      .then(res => {
        return res.json()
      })
      .then(data => {
        handleDOM(data)
        handleCelToFah()
      })
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
})()