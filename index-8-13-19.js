(function() {
    // Global Variables
    const request = new XMLHttpRequest(), // Create a new instance
        tempContainer = document.getElementById('temp'),
        imgList = document.getElementById('imgList'),
        cityContainer = document.getElementById('city'),
        conditionContainer = document.getElementById('condition'),
        conditionDesContainer = document.getElementById('conditionDescription'),
        countryContainer = document.getElementById('country'),
        windContainer = document.getElementById('wind');

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
        request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=<-- API KEY HERE -->');

        // Function to load on initial page load
        request.onload = function() {
            // Local variable
            const weatherData = JSON.parse(request.responseText),
                C2FButton = document.getElementById("CtoF"),
                condition = weatherData.weather,
                temp = weatherData.main.temp,
                wind = (weatherData.wind.speed * 2.237).toFixed(1),
                temp1 = ((temp - 273) * (9 / 5) + 32).toFixed(1),
                temp2 = (temp - 273.15).toFixed(1);
            let tempChange = document.getElementsByClassName('fahrenheit');

            // Display info onto index.html
            renderHTML(conditionContainer, condition);
            renderHTML(conditionDesContainer, condition);
            renderHTML(tempContainer, temp1);
            renderHTML(windContainer, wind);
            renderHTML(imgList, condition);

            // add click event that convets C to F and F to C
            C2FButton.addEventListener("click", function() {

                // if / else statement used to convert temperature
                if (tempChange != "fahrenheit") {
                    tempContainer.textContent = temp2 + " C";
                    tempChange = 'fahrenheit';
                } else {
                    tempContainer.textContent = temp1 + " F";
                    tempChange = "celsius";
                }
            });

            // Change background image according to weather icon
            backgroundImage(condition[0].icon);
        };

        // Send GET request to open weather map
        request.send();

        // Display info onto index.html
        renderHTML(cityContainer, city);
        renderHTML(countryContainer, country);
    };

    // Send GET request to ip-api
    request.send();

    // renderHTML function used to display info to index.html
    function renderHTML(info, data) {
        let htmlString = "";
        htmlString += data;

        switch (info) {
            // write each weather condition to #condition element
            case conditionContainer:
                for (var i = 0; i < data.length; i++) {
                    info.textContent += data[i].main + " ";
                }
                break;
                // write each weather condition to #conditionDescription selement
            case conditionDesContainer:
                for (i = 0; i < data.length; i++) {
                    info.textContent += data[i].description + " ";
                }
                break;
                // write to element with #temp id
            case tempContainer:
                info.textContent = htmlString + " F";
                break;
                // write to element with #country id
            case countryContainer:
                info.textContent = htmlString;
                break;
                // write to element with #city id
            case cityContainer:
                info.textContent = htmlString;
                break;
                // write to element with #wind id
            case windContainer:
                info.textContent = "Wind speed " + htmlString + " mph.";
                break;
                // Write to element with #imgList id
            case imgList:
                for (i = 0; i < data.length; i++) {
                    const imgNode = document.createElement("IMG");
                    info.appendChild(imgNode);
                    info.children[i].setAttribute("id", "img" + i);
                    info.children[i].src = "http://openweathermap.org/img/w/" + data[i].icon + ".png";
                }
                break;
                // In case there is an error upon loading.
            default:
                document.write("I'm sorry, an error has occured.");
        }
    }

    // backgroundImage function used to add a background image according to weather icon
    function backgroundImage(data) {
        // Local Variable
        let backgroundImg = document.body;

        switch (data) {
            // clear sky
            case "01d":
            case "01n":
                if (data === "01d") {
                    backgroundImg.style.backgroundImage = "url('Images/clearSkyDay.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/clearSkyNight1.jpg')";
                }
                break;
                // few clouds
            case "02d":
            case "02n":
                if (data === "02d") {
                    backgroundImg.style.backgroundImage = "url('Images/fewCloudsDay.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/fewCloudsNight1.jpg')";
                }
                break;
                // scattered clouds
            case "03d":
            case "03n":
                if (data === "03d") {
                    backgroundImg.style.backgroundImage = "url('Images/fewCloudsDay.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/fewCloudsNight1.jpg')";
                }
                break;
                // broken clouds
            case "04d":
            case "04n":
                if (data === "04d") {
                    backgroundImg.style.backgroundImage = "url('Images/fewCloudsDay.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/fewCloudsNight1.jpg')";
                }
                break;
                // shower rain
            case "09d":
            case "09n":
                if (data === "09d") {
                    backgroundImg.style.backgroundImage = "url('Images/rainDay.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/rainNight.jpg')";
                }
                break;
                // rain
            case "10d":
            case "10n":
                if (data === "10d") {
                    backgroundImg.style.backgroundImage = "url('Images/rainDay.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/rainNight.jpg')";
                }
                break;
                // thunderstorm
            case "11d":
            case "11n":
                if (data === "11d") {
                    backgroundImg.style.backgroundImage = "url('Images/rainDay.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/rainNight.jpg')";
                }
                break;
                // snow
            case "13d":
            case "13n":
                if (data === "13d") {
                    backgroundImg.style.backgroundImage = "url('Images/snowDay1.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/snowNight1.jpg')";
                }
                break;
                // mist
            case "50d":
            case "50n":
                if (data === "50d") {
                    backgroundImg.style.backgroundImage = "url('Images/mistDay.jpg')";
                } else {
                    backgroundImg.style.backgroundImage = "url('Images/mistyNight.jpg')";
                }
                break;
                // No image
            default:
                backgroundImg.style.backgroundImage = "";
        }
    }
})();
// http://api.openweathermap.org/data/2.5/weather?lat=27.7693&lon=-97.444&APPID=f62651bb11bb663233a4e55634a22266
// Please use your own API!
