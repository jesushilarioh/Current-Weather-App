if ("geolocation" in navigator || navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    // navigator.geolocation.watchPosition(success, error);
} else {
    alert("Geolocation is not supported by this browser. Check your location settings, make sure it's enabled.");
}
    
function success(position) {
    longitude = position.coords.longitude;
    latitude  = position.coords.latitude;
    console.log("In function, Latitude: " + latitude + ", Longitude: " + longitude);

}

function error(e) {
    alert('Unable to retrieve your location. Here\'s why: ' + 'ERROR(' + e.code + '): ' + e.message);
}