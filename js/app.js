/* jshint shadow:true */
/* jshint bitwise: false */
// http://jshint.com/docs/options/#shadow

document.onreadystatechange = function() {

    "use strict";

    // all resources have loaded (document + sub-resources)
    if (document.readyState === "complete") {

        // Step 1: Get Needed Element(s) & CSS String
        //
        // element that will be injected the highlighted code
        var $output_element = document.getElementsByTagName("code")[0];
        // the CSS string to highlight
        var string = document.getElementsByTagName("textarea")[0].value;

        // Step 2: Setup Web Worker
        //
        // create the web worker
        var worker = new Worker("js/highlighter.js");

        // listen for web worker messages
        worker.addEventListener("message", function(e) {

            // cache the data object
            var message = e.data;

            // object collection of actions
            var actions = {
                "done": function() {
                    // inject highlighted CSS
                    $output_element.innerHTML = message.highlighted;
                    // terminate worker
                    // worker.terminate(); // close worker from main file
                    worker.postMessage({ "action": "stop" }); // close worker from worker file
                }
            };

            // run the needed action
            (actions[message.action] || new Function)();

        }, false);

        // Step 3: Send Data To Web Worker
        //
        // send data to web worker
        worker.postMessage({
            "action": "start", // required
            "string": string   // required; -- [your CSS string]
        });

        // *************************************************************************************
        // **Note: The following code is only used to denote the CSS class used to highlight the
        // hovered element in the upper left corner. This is only done and used for development
        // purposes.

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

        // mouseout code
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

        // *************************************************************************************

    }

};
