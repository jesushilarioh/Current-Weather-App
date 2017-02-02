var request = new XMLHttpRequest(); // Create a new instance
var cityContainer = document.getElementById('city');
var conditionContainer = document.getElementById('condition');
var tempContainer = document.getElementById('temp');
var windContainer = document.getElementById('wind');

// GET request from ip-api
request.open('GET', 'http://ip-api.com/json');

// Function to load on initial page load
request.onload = function() {
    // Local variables
    var ourData = JSON.parse(request.responseText);
    var lat = ourData.lat;
    var lon = ourData.lon;
    var city = ourData.city;

    // GET request from open weather map
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=f62651bb11bb663233a4e55634a22266');

    // Function to load on initial page load
    request.onload = function(){
        // Local variable
        var weatherData = JSON.parse(request.responseText);
        var condition = weatherData.weather[0].main;
        var temp = weatherData.main.temp;
        var wind = weatherData.wind.speed;
        temp = ((temp-273) * (9/5) + 32).toFixed(1);
        renderHTML(conditionContainer, condition);
        renderHTML(tempContainer, temp);
        renderHTML(windContainer, wind);
    };
    // Send GET request to open weather map
    request.send();
    renderHTML(cityContainer, city);
};
// Send GET request to ip-api
request.send();

// Render HTML
function renderHTML(info, data) {
    var htmlString = " ";
    htmlString += data;

    if (info === conditionContainer || info === tempContainer || info === cityContainer) {
      info.insertAdjacentHTML('beforeend', htmlString);
    } else {
      info.insertAdjacentHTML('beforeend', "The winds speed is " + htmlString + " mph.")
    }
}
