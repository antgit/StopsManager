define("stopsList", ["jquery", "distanceCalculator", "routeRenderer", "infoWindow"], function ($, distanceCalculator, routeRenderer, infoWindow) {
    var stopFrom = null;
    var stopTo = null;
    var map = null;

    function showInfoWindowAndRoute() {
        infoWindow.close();

        if (!stopFrom || !stopTo) {
            return;
        }

        var distance = distanceCalculator.getDistanceFromLatLonInKm(stopFrom.latitude, stopFrom.longitude, stopTo.latitude, stopTo.longitude);

        routeRenderer.calculateAndDisplayRoute({
            lat: stopFrom.latitude,
            lng: stopFrom.longitude
        }, {
            lat: stopTo.latitude,
            lng: stopTo.longitude
        }, function (route) {
            infoWindow.openOnRoute(map, route, distance);
        });
    }

    function init() {
        //todo move google to dependencies
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.78, lng: -73.95 },
            zoom:13
        });

        routeRenderer.init(map);

        //todo load stops in parts
        $.ajax({
            url: "/Stops/Get"
        }).done(function(data) {
            data.forEach(function (stop) {

                var marker = new google.maps.Marker({
                    position: {lat: stop.latitude, lng: stop.longitude},
                    map: map,
                    title: stop.name
                });

                marker.addListener("click", function () {
                    
                    infoWindow.openOnMarker(map, marker, stop);

                    $("#aFrom").click(function() {
                        stopFrom = stop;
                        showInfoWindowAndRoute();
                    });

                    $("#aTo").click(function () {
                        stopTo = stop;
                        showInfoWindowAndRoute();
                    });
                });
            });
        }).fail(function(data) {
            console.error("Can't load stops data");
        });
    }

    return {
        init: init
    };
});