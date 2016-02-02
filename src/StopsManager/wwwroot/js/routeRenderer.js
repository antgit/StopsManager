define("routeRenderer", function () {
    var directionsService = null;
    var directionsDisplay = null;

    function init(map) {
        //todo move google to dependencies
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(map);
    }

    function calculateAndDisplayRoute(origin, destination, callback) {
        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);

                if (callback && response.routes.length > 0) {
                    var route = response.routes[0];

                    if (route.legs.length > 0) {
                        var leg = route.legs[0];

                        callback({
                            distance: leg.distance.text,
                            time: leg.duration.text
                        });
                    }
                }
            } else {
                window.alert("Directions request failed due to " + status);
            }
        });
    };

    return {
        init: init,
        calculateAndDisplayRoute: calculateAndDisplayRoute
    }
});