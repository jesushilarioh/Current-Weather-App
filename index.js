(function() {
  // Global Variables
  var request = new XMLHttpRequest(); // Create a new instance
  var cityContainer = document.getElementById('city');
  var conditionContainer = document.getElementById('condition');
  var tempContainer = document.getElementById('temp');
  var windContainer = document.getElementById('wind');
  var C2FButton = document.getElementById("CtoF");
  var tempChange = document.getElementsByClassName('fahrenheit');

  // GET request from ip-api
  request.open('GET', 'http://ip-api.com/json');

  // Function to load on initial page load
  request.onload = function() {
      // Local Constant Variables (LCVs)
      const ourData = JSON.parse(request.responseText);
      const lat = ourData.lat;
      const lon = ourData.lon;
      const city = ourData.city;

      // GET request from open weather map
      request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=f62651bb11bb663233a4e55634a22266');

      // Function to load on initial page load
      request.onload = function(){
          // Local variable
          var weatherData = JSON.parse(request.responseText);
          var condition = weatherData.weather[0].main;
          var temp = weatherData.main.temp;
          var wind = weatherData.wind.speed;
          var temp1 = ((temp-273) * (9/5) + 32).toFixed(1);
          var temp2 = (temp - 273.15).toFixed(1);

          // Display info onto index.html
          renderHTML(conditionContainer, condition);
          renderHTML(tempContainer, temp1);
          renderHTML(windContainer, wind);

          // add click event that convets C to F and F to C
          C2FButton.addEventListener("click", convertTemp);

          // Function used for click event
          function convertTemp() {

            // if / else statement used to convert temperature
            if (tempChange != "fahrenheit") {
              tempContainer.innerHTML = temp2 + " C";
              console.log('Hello');
              tempChange = 'fahrenheit';
            } else {
              tempContainer.innerHTML = temp1 + " F";
              tempChange = "celsius";
              console.log('Goodbye');
            }
          }
      };

      // Send GET request to open weather map
      request.send();
      renderHTML(cityContainer, city);
  };

  // Send GET request to ip-api
  request.send();

  // renderHTML function called in lines 34 - 36;
  function renderHTML(info, data) {
      var htmlString = " ";
      htmlString += data;

      switch (info) {
        case conditionContainer:
          info.innerHTML = htmlString;
          break;
        case tempContainer:
          info.innerHTML = htmlString + " F";
          break;
        case cityContainer:
          info.innerHTML = htmlString;
          break;
        case windContainer:
          info.innerHTML = "Wind speed " + htmlString + " mph.";
          break;
      }
  }

}());
