define("stopsList", ["jquery", "distanceCalculator", "routeRenderer"], function ($, distanceCalculator, routeRenderer) {
    var stopFrom = null;
    var stopTo = null;

    function recalculateDistance() {
        if (!stopFrom || !stopTo) {
            return;
        }

        var distance = distanceCalculator.getDistanceFromLatLonInKm(stopFrom.latitude, stopFrom.longitude, stopTo.latitude, stopTo.longitude);
        $("#distance").val(Number((distance).toFixed(2)) + " km");

        routeRenderer.calculateAndDisplayRoute({
            lat: stopFrom.latitude,
            lng: stopFrom.longitude
        }, {
            lat: stopTo.latitude,
            lng: stopTo.longitude
        }, function(metrics) {
            $("#distanceGoogle").val(metrics.distance);
            $("#timeGoogle").val(metrics.time);
        });
    }

    function init() {
        var lastOpenedInfoWindow = null;
        

        //todo move google to dependencies
        var map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.78, lng: -73.95 },
            zoom:13
        });

        routeRenderer.init(map);

        //todo load stops in parts
        $.ajax({
            url: "/Stops/Get"
        }).done(function(data) {
            data.forEach(function (stop) {
                var contentString =
                    "<div id='content'>" +
                        "<h1 class='firstHeading'>" + stop.name + "</h1>" +
                        "<div id='bodyContent'>" +
                            "<p>" + stop.description + "</p>" +
                            "<p><a href='#' id='aFrom'>From</a></p>" +
                            "<p><a href='#' id='aTo'>To</a></p>" +
                        "</div>" + 
                    "</div>";

                var infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                var marker = new google.maps.Marker({
                    position: {lat: stop.latitude, lng: stop.longitude},
                    map: map,
                    title: stop.name
                });

                marker.addListener("click", function () {
                    if (lastOpenedInfoWindow) {
                        lastOpenedInfoWindow.close();
                    }

                    infoWindow.open(map, marker);

                    lastOpenedInfoWindow = infoWindow;

                    $("#aFrom").click(function() {
                        $("#inputFrom").val(stop.name);
                        stopFrom = stop;
                        recalculateDistance();
                    });

                    $("#aTo").click(function () {
                        $("#inputTo").val(stop.name);
                        stopTo = stop;
                        recalculateDistance();
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