requirejs.config({
    baseUrl: "/js",
    paths: {
        jquery: "../lib/jquery/dist/jquery.min",
        stopsList: "stopsList",
        distanceCalculator: "distanceCalculator",
        routeRenderer: "routeRenderer"
    },
    shim: {
        jquery: {
            exports: '$'
        }
    }
});