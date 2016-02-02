requirejs.config({
    baseUrl: "/js",
    paths: {
        jquery: "../lib/jquery/dist/jquery.min",
        stopsList: "stopsList"
    },
    shim: {
        jquery: {
            exports: '$'
        }
    }
});