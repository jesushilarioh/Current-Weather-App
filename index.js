(function() {
  // Global Variables
  const request = new XMLHttpRequest(), // Create a new instance
        cityContainer = document.getElementById('city'),
        countryContainer = document.getElementById('country'),
        conditionContainer = document.getElementById('condition'),
        tempContainer = document.getElementById('temp'),
        windContainer = document.getElementById('wind'),
        C2FButton = document.getElementById("CtoF"),
        imgList = document.getElementById('imgList');
  var tempChange = document.getElementsByClassName('fahrenheit');

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
                temp = weatherData.main.temp,
                wind = weatherData.wind.speed,
                temp1 = ((temp-273) * (9/5) + 32).toFixed(1),
                temp2 = (temp - 273.15).toFixed(1);

            for (var i = 0; i < condition.length; i++) {
                let imgNode = document.createElement("IMG");
                imgList.appendChild(imgNode);
                console.log("http://openweathermap.org/img/w/" + condition[i].icon + ".png");
                imgList.children[i].setAttribute("id", "img" + i);
                imgList.children[i].src = "http://openweathermap.org/img/w/" + condition[i].icon + ".png";
                console.log(imgList.children[i].src);
                console.log(imgList);
            }

          // Display info onto index.html
          renderHTML(conditionContainer, condition);
          renderHTML(tempContainer, temp1);
          renderHTML(windContainer, wind);

          // add click event that convets C to F and F to C
          C2FButton.addEventListener("click", function() {

              // if / else statement used to convert temperature
              if (tempChange != "fahrenheit") {
                tempContainer.innerHTML = temp2 + " C";
                tempChange = 'fahrenheit';
              } else {
                tempContainer.innerHTML = temp1 + " F";
                tempChange = "celsius";
              }
          });

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
