define("infoWindow", [], function () {
    var lastOpenedInfoWindow = null;

    function openOnMarker(map, marker, stop) {
        if (lastOpenedInfoWindow) {
            lastOpenedInfoWindow.close();
        }

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

        infoWindow.open(map, marker);

        lastOpenedInfoWindow = infoWindow;
    }

    return {
        openOnMarker: openOnMarker
    };
});