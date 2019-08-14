if ("geolocation" in navigator || navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    // navigator.geolocation.watchPosition(success, error);
} else {
    alert("Geolocation is not supported by this browser. Check your location settings, make sure it's enabled.");
}
    
function success(position) {
    let longitude = position.coords.longitude,
        latitude  = position.coords.latitude,
        params = 'longitude=' + longitude + '&latitude=' + latitude,
        requestURL = './connection/location.php?' + params;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL, true);
    xhr.onloadstart = function() {
        console.log('xhr started');
    }
    xhr.onerror = function() {
        console.log('xhr onerror');
    }
    xhr.onload = function() {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText),
                city = results.city,
                cityInfo = {
                    name: city.name,
                    country: city.country,
                    population: city.population,
                    timezone: city.timezone,
                    sunrise: new Date(city.sunrise * 1000),
                    sunset: new Date(city.sunset * 1000)
                },
                forecast = results.list.slice();
                
            console.log("Forcast", forecast);

        } else {
            console.log('Error: ', this.statusText);
        }
    }
    xhr.onloadend = function() {
        console.log('xhr ended');
    }
    xhr.send();
}

function error(e) {
    alert('Unable to retrieve your location. Here\'s why: ' + 'ERROR(' + e.code + '): ' + e.message);
}