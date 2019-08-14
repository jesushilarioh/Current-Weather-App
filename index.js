if ("geolocation" in navigator || navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    // navigator.geolocation.watchPosition(success, error);
} else {
    alert("Geolocation is not supported by this browser. Check your location settings, make sure it's enabled.");
}
    
function success(position) {
    let longitude = position.coords.longitude,
        latitude  = position.coords.latitude;
        // params = 'longitude=' + longitude + '&latitude=' + latitude;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', './connection/location.php?latitude=' + latitude + '&longitude=' + longitude, true);
    xhr.onloadstart = function() {
        console.log('xhr started');
    }
    xhr.onerror = function() {
        console.log('xhr onerror');
    }
    xhr.onload = function() {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            console.log(results);
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