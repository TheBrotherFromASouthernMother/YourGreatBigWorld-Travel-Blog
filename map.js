let map;
let infowindow;

// function AutoCenter(markers) {
// let bounds = new google.maps.LatLngBounds();
// markers.forEach(function (index, marker) {
// bounds.extend(markers.position);
// map.fitBounds(bounds);
// });
//
// }


function initialize() {
  let austin = {lat: 30.2393146, lng: -97.7697075};
  let houston = {lat: 29.760434, lng: -95.3698075}
  map = new google.maps.Map(document.getElementById('map'), {
    center: houston,
    zoom: 3
    });

    infowindow = new google.maps.InfoWindow({
          content: "Young Blood"
        });

    // Create the search box and link it to the UI element.
            let input = document.getElementById('pac-input');
            let searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });

            let markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();

              if (places.length == 0) {
                return;
              }

              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];

              // For each place, get the icon, name and location.
              let bounds = new google.maps.LatLngBounds();

              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                let icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));

              for (let i = 0; i < markers.length; i++) {
                  let marker = markers[i]
                  google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                    });
                }

                //AutoCenter()

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });




 } //end of function initialize
