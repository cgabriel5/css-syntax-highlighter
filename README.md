# css-syntax-highlighter

An experimental CSS syntax highlighter.

##### Table of Contents

- [Project Setup](#project-setup)
- [Live Demo](#live-demo)
- [Usage](#usage)
    - [General Use](#usage-general-example)

<a name="project-setup"></a>
### Project Setup

Project uses [this](https://github.com/cgabriel5/snippets/tree/master/boilerplate/application) boilerplate. Its [README.md](https://github.com/cgabriel5/snippets/blob/master/boilerplate/application/README.md#-read-before-use) contains instructions for `Yarn` and `Gulp`.

<a name="live-demo"></a>
### Live Demo

See example of highlighted CSS [here](https://cgabriel5.github.io/css-syntax-highlighter/).

<a name="usage"></a>
### Usage

**Note**: The library, both minimized and unminimized, is located in `lib/`.

Take a look at `js/app.js`, `js/source/test.js`, `lib/lib.js`, and `index.html` to see how the live demo is made. Colors can be customized by editing `css/source/highlighter.css`.

<a name="usage-general-example"></a>
**General Use** &mdash; Gives an idea on how to use the library.

**Step 1**: Get The String To Parse

```js
// Get string either from the DOM (i.e. text value from textarea, input...etc) 
// or from server via an Ajax request.

var myString = ".red-text { color: red; }";
```

**Step 2**: Create The Web Worker
```js
var worker = new Worker("path/to/lib.js");
```

**Step 3**: Listen To The Web Worker
```js
worker.addEventListener("message", function(e) {

    // cache the data object
    var message = e.data;
    
    // object collection of actions
    var actions = {
        "done": function() {
            // cache highlighted CSS string
            var highlighted = message.highlighted;

            // do something with highlighted string...
            // (i.e. inject into an HTMLElement)

            // finally, close the worker
            worker.postMessage({ "action": "stop" });
        }
    };
    
    // run the needed action
    (actions[message.action] || window.Function)();

}, false);
```

**Step 4**: Send Data To Web Worker
```js
worker.postMessage({
    "action": "start", // required (tells worker to start and parse)
    "string": myString // required (the string to parse and highlight)
});
```

### Issues

* Very longs strings can take time to parse (strings > 300,000 characters will fail in Google Chrome). 

### Contributing

Contributions are welcome! Found a bug, feel like documentation is lacking/confusing and needs an update, have performance/feature suggestions or simply found a typo? Let me know! :)

See how to contribute [here](https://github.com/cgabriel5/css-syntax-highlighter/blob/master/CONTRIBUTING.md).

### TODO

- [ ] Re-write parser for better performance.

### License

This project uses the [MIT License](https://github.com/cgabriel5/css-syntax-highlighter/blob/master/LICENSE.txt).
