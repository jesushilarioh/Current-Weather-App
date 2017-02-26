$(document).ready(function() {

    $.getJSON("http://ip-api.com/json", function(data2) {
        let lat;
        let long;
        lat = data2.lat;
        long = data2.lon;
        let api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=f62651bb11bb663233a4e55634a22266';

        $.getJSON(api, function(data) {
            let fTemp;
            let cTemp;
            let kTemp;
            let tempSwap = true;
            //JSON call for Open Weather api
            let weatherType = data.weather[0].description;
            kTemp = data.main.temp;
            let windSpeed = data.wind.speed;
            let city = data.name;

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
            } else if (fTemp > 56) {
                $('body').css('background-image', 'url(two.jpg)');
            } else if (fTemp > 40) {
                $('body').css('background-image', 'url(three.jpg)');
            } else if (fTemp > 20) {
                $('body').css('background-image', 'url(four.jpg)');
            }
        });
    });
});
