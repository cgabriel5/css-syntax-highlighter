/* jshint shadow:true */
/* jshint bitwise: false */
// http://jshint.com/docs/options/#shadow

document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    /* [app.body] */

    // all resources have loaded (document + sub-resources)
    if (document.readyState === "complete") {

        // get the code element
        var element = document.getElementsByTagName("code")[0];
        // cache code element's innerHTML (CSS string)
        var string = document.getElementsByTagName("textarea")[0].value;

        // create new web worker
        var worker = new Worker("js/highlighter.js");
        // send data to web worker
        worker.postMessage({ "action": "start", "string": string });

        // listen for web worker messages
        worker.addEventListener("message", function(e) {

            // cache the data object
            var message = e.data;

            // object collection of actions
            var actions = {
                "done": function() {

                    // replace old HTML with colored HTML
                    element.innerHTML = message.highlighted;

                    // terminate worker
                    // worker.terminate(); // close worker from main file
                    worker.postMessage({ "action": "stop" }); // cose worker from worker file

                }
            };

            // run the needed action
            (actions[message.action] || new Function)();

        }, false);

        // cache the mouseover-info-cont
        var $mouseover_info_cont = document.getElementById("mouseover-info-cont"),
            $mouseover_info = document.getElementById("mouseover-info");

        // mouseover code
        document.addEventListener("mouseover", function(e) {

            // cache the target element
            var $target = e.target;

            // use delegation on SPAN elements with the class lang-css-*
            if ($target.nodeName === "SPAN" && -~$target.className.indexOf("lang-css-")) {
                // set the mouseover element's text to the token type
                $mouseover_info.textContent = ($target.className.match(/lang\-css\-[\w\-]+/g) || ["Null"])[0].replace("lang-css-", "");
                // show the element
                $mouseover_info_cont.classList.remove("none");
                // highlight the element being hovered
                $target.classList.add("lang-css-highlight-yellow");
                // hide the element on a timer
                clearTimeout(window.timer_hide);
            }

        }, false);

        // mouseover code
        document.addEventListener("mouseout", function(e) {

            // cache the target element
            var $target = e.target;

            // use delegation on SPAN elements with the class lang-css-*
            if ($target.nodeName === "SPAN" && -~$target.className.indexOf("lang-css-")) {
                // unhighlight the element
                $target.classList.remove("lang-css-highlight-yellow");
                // clear any previous timer
                clearTimeout(window.timer_hide);
                // hide the element on a timer
                window.timer_hide = setTimeout(function() {
                    // hide the mouseover element cont
                    $mouseover_info_cont.classList.add("none");
                }, 500);
            }

        }, false);

    }

};
