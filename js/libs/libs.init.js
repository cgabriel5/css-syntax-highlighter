(function() {
    // initialize 3rd-party libraries
    // init FastClickJS
    if ("addEventListener" in document) {
        document.addEventListener("DOMContentLoaded", function() {
            FastClick.attach(document.body);
        }, false);
    }
})();