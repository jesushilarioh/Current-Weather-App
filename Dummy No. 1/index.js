$(document).ready(function() {
    var lat;
    var long;
    $.getJSON("http://ip-api.com/json", function(data2) {
        lat = data2.lat;
        long = data2.lon;
        var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=f62651bb11bb663233a4e55634a22266';

        $.getJSON(api, function(data) {
            var fTemp;
            var cTemp;
            var kTemp;
            var tempSwap = true;
            //JSON call for Open Weather api
            var weatherType = data.weather[0].description;
            kTemp = data.main.temp;
            var windSpeed = data.wind.speed;
            var city = data.name;

            // Temp in Kelvin
            fTemp = (kTemp * (9 / 5) - 459.67).toFixed(1);
            //Temp in F
            //City Name
            cTemp = (kTemp - 273).toFixed(1);
            console.log(city);
            $("#city").html(city);
            $("#weatherType").html(weatherType);
            $("#fTemp").html(fTemp + " &#8457;");
            $("#fTemp").click(function() {
                if (tempSwap === false) {
                    $("#fTemp").html(fTemp + " &#8457;");
                    tempSwap = true;
                } else {
                    $("#fTemp").html(cTemp + " &#8451;");
                    tempSwap = false;
                }
            });
            windSpeed = (2.237 * (windSpeed)).toFixed(1);
            $("#windSpeed").html("Wind Speed " + windSpeed + " mph");
            if (fTemp > 80) {
                $('body').css('background-image', 'url(one.jpg)');
            } else if (fTemp > 70) {
                $('body').css('background-image', 'url(two.jpg)');
            } else if (fTemp > 60) {
                $('body').css('background-image', 'url(three.jpg)');
            } else if (fTemp > 50) {
                $('body').css('background-image', 'url(four.jpg)');
            }
        });
    });
});
