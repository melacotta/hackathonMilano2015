/**
 * Maps
 */
window.addEventListener('google-map-ready', function(event) {

    var polylines = [];

    shp("resources/CICLABILI/CICLABILI").then(function(ciclabili) {

        console.log(ciclabili);

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
            flightPath.setVisible(false);

            if (!polylines[ciclabili.features[i].properties.NOME_VIA]) {
                polylines[ciclabili.features[i].properties.NOME_VIA] = [];
            }
            
            polylines[ciclabili.features[i].properties.NOME_VIA].push(flightPath);
        }

        console.log(polylines);
    });

    addEventListener('core-select', function(e) {
        if (e.detail.isSelected) {

            if (e.detail.item.label === 'TUTTE') {
                for (p in polylines) {
                    for (pezzo in polylines[p]) {
                        polylines[p][pezzo].setVisible(true);
                    }
                }
            } else {
                for (p in polylines) {
                    for (pezzo in polylines[p]) {
                        polylines[p][pezzo].setVisible(false);
                    }
                }

                for (pezzo in polylines[e.detail.item.label]) {
                    polylines[e.detail.item.label][pezzo].setVisible(true);
                }
            }
        }
    });
});
