requirejs.config({
    baseUrl: "/js",
    paths: {
        jquery: "../lib/jquery/dist/jquery.min",
        stopsList: "stopsList",
        distanceCalculator: "distanceCalculator"
    },
    shim: {
        jquery: {
            exports: '$'
        }
    }
});