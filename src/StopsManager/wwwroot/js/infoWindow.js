define("infoWindow", [], function () {
    var lastOpenedInfoWindow = null;

    function close() {
        if (lastOpenedInfoWindow) {
            lastOpenedInfoWindow.close();
        }
    }

    function openOnMarker(map, marker, stop) {
        close();

        var contentString =
                    "<div id='content'>" +
                        "<h1 class='firstHeading'>" + stop.name + "</h1>" +
                        "<div id='bodyContent'>" +
                            "<p>" + stop.description + "</p>" +
                            "<p><a href='#' id='aFrom'>From</a></p>" +
                            "<p><a href='#' id='aTo'>To</a></p>" +
                        "</div>" +
                    "</div>";

        var infoWindow = new google.maps.InfoWindow();

        infoWindow.setContent((contentString));

        infoWindow.open(map, marker);

        lastOpenedInfoWindow = infoWindow;
    }

    function openOnRoute(map, route, distance) {
        close();

        if (route.legs.length > 0) {
            var leg = route.legs[0];
            var step = Math.floor(leg.steps.length / 2);

            var infoWindow = new google.maps.InfoWindow();

            infoWindow.setContent(
                "<b>Distance:</b> " + Number((distance).toFixed(1)) + " km<br>"+
                "<b>Google distance:</b> " + leg.distance.text + "<br>" +
                "<b>Google time:</b> " + leg.duration.text);

            infoWindow.setPosition(leg.steps[step].end_location);
            infoWindow.open(map);

            lastOpenedInfoWindow = infoWindow;
        }
    }

    return {
        openOnMarker: openOnMarker,
        openOnRoute: openOnRoute,
        close: close
    };
});