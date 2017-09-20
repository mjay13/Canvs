//sets up global variables
var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 9
  });
infoWindow = new google.maps.InfoWindow;


//Begins the phase to set markers for each Canvs location

//uses an array to store each location information
var markers = [
    {coords:{lat: 28.540951, lng: -81.381265},
    content: "<p><strong>Downtown Location</strong></p><p>101 S. Garland Ave., Suite 108</p><p>Orlando, FL 32801</p>"},

    {coords:{lat: 28.597509, lng: -81.352940},
    content: "<p><strong>Winter Park Location</strong></p><p>101 S. New York Ave., Suite 201</p><p>Winter Park, FL 32789</p>"},

    {coords:{lat: 28.546614, lng: -81.385805},
    content: "<p><strong>Parramore Location</strong></p><p>500 W Livingston St</p><p>Orlando, FL 32801</p>"}
];

//loops over the array to populate on each marker
for(var i=0; i<markers.length; i++){
  addMarker(markers[i]);
}

//sets up the function to create a marker, checks for content and populates the information and waits for a click to show to the user
function addMarker(props){
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map
  });

  if(props.content){
    var infoWindow = new google.maps.InfoWindow({
      content: props.content
    })
    marker.addListener("click", function(){
      infoWindow.open(map, marker);
    });
  }
}

//sets up the phase to grab the users location using Google and HTML geolocation
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Your location');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
} //closes initMap

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}