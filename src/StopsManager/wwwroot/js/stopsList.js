define("stopsList", ["jquery"], function ($) {
    var stopFrom = null;
    var stopTo = null;

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    function recalculateDistance() {
        if (!stopFrom || !stopTo) {
            return;
        }

        var distance = getDistanceFromLatLonInKm(stopFrom.latitude, stopFrom.longitude, stopTo.latitude, stopFrom.longitude);
        $("#distance").val(Number((distance).toFixed(2))+ " km");
    }

    function init() {
        var lastOpenedInfoWindow = null;
        

        //todo move google to dependencies
        var map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.78, lng: -73.95 },
            zoom:13
        });

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