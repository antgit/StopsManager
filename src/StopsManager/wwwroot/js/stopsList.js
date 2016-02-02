define("stopsList", ["jquery"], function($) {
    function init() {
        //todo move google to dependencies
        var map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.78, lng: -73.95 },
            zoom:13
        });

        $.ajax({
            url: "/Stops/Get"
        }).done(function(data) {
            data.forEach(function(stop) {
                var marker = new google.maps.Marker({
                    position: {lat: stop.latitude, lng: stop.longitude},
                    map: map,
                    title: stop.name
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