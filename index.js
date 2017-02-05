(function() {
  // Global Variables
  const request = new XMLHttpRequest(), // Create a new instance
        cityContainer = document.getElementById('city'),
        countryContainer = document.getElementById('country'),
        conditionContainer = document.getElementById('condition'),
        icon = document.getElementById('conditionDescription'),
        tempContainer = document.getElementById('temp'),
        windContainer = document.getElementById('wind'),
        C2FButton = document.getElementById("CtoF"),
        imgList = document.getElementById('imgList');
        // newImg = document.createTextNode("hello");
  var tempChange = document.getElementsByClassName('fahrenheit');

        // imgList.appendChild(newImg);

  // GET request from ip-api
  request.open('GET', 'http://ip-api.com/json');

  // Function to load on initial page load
  request.onload = function() {
      // Local Constant Variables (LCVs)
      const ourData = JSON.parse(request.responseText),
            lat = ourData.lat,
            lon = ourData.lon,
            city = ourData.city + ", " + ourData.region,
            country = ourData.country;

      // GET request from open weather map
      request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=f62651bb11bb663233a4e55634a22266');

      // Function to load on initial page load
      request.onload = function(){
          // Local variable
          const weatherData = JSON.parse(request.responseText),
                condition = weatherData.weather,
                conditionDescription = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png",
                temp = weatherData.main.temp,
                wind = weatherData.wind.speed,
                temp1 = ((temp-273) * (9/5) + 32).toFixed(1),
                temp2 = (temp - 273.15).toFixed(1);

            for (var i = 0; i < condition.length; i++) {
                let imgNode = document.createElement("IMG");
                imgList.appendChild(imgNode);
                console.log("http://openweathermap.org/img/w/" + condition[i].icon + ".png")
            }

          // Display info onto index.html
          renderHTML(conditionContainer, condition);
          renderHTML(icon, conditionDescription);
          renderHTML(tempContainer, temp1);
          renderHTML(windContainer, wind);

          // add click event that convets C to F and F to C
          C2FButton.addEventListener("click", convertTemp);

          // Function used for click event
          function convertTemp() {

            // if / else statement used to convert temperature
            if (tempChange != "fahrenheit") {
              tempContainer.innerHTML = temp2 + " C";
              console.log('Celsius');
              tempChange = 'fahrenheit';
            } else {
              tempContainer.innerHTML = temp1 + " F";
              tempChange = "celsius";
              console.log('Fahrenheit');
            }
          }
      };

      // Send GET request to open weather map
      request.send();
      renderHTML(cityContainer, city);
      renderHTML(countryContainer, country);
  };

  // Send GET request to ip-api
  request.send();

  // renderHTML function called in lines 34 - 36;
  function renderHTML(info, data) {
      let htmlString = "";
      htmlString += data;

      switch (info) {
        case conditionContainer:

          for (var i = 0; i < data.length; i++) {
              console.log(data[i].main);
              info.innerHTML += data[i].main + " ";
          }

          break;
        case icon:
          info.src = data;
          break;
        case tempContainer:
          info.innerHTML = htmlString + " F";
          break;
        case countryContainer:
          info.innerHTML = htmlString;
          break;
        case cityContainer:
          info.innerHTML = htmlString;
          break;
        case windContainer:
          info.innerHTML = "Wind speed " + htmlString + " mph.";
          break;
        default:
          console.log("no work");
          break;
      }
  }


}());
