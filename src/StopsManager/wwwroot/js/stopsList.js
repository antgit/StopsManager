define("stopsList", ["jquery"], function($) {
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
                var contentString = stop.name;

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