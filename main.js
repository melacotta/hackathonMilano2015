/**
 * Maps
 */
window.addEventListener('google-map-ready', function(event) {

    console.log(event.target.map);

    shp("resources/CICLABILI/CICLABILI").then(function(ciclabili) {

        var point;

        for (var i = 0; i < ciclabili.features.length; i++) {

            var flightPlanCoordinates = [];

            for (var j = 0; j < ciclabili.features[i].geometry.coordinates.length; j++) {
                point = ciclabili.features[i].geometry.coordinates[j];
                flightPlanCoordinates.push(new google.maps.LatLng(point[1] + 0.0015, point[0]));
            }

            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            flightPath.setMap(event.target.map);
        }
    });
});
