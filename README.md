# css-syntax-highlighter

An experimental CSS syntax highlighter.

##### Table of Contents

- [Project Setup](#project-setup)
- [Demo](#demo)
- [Usage](#usage)
    - [Step By Step](#usage-general-example)
- [Issues](#issues)
- [Contributing](#contributing)
- [TODO](#todo)
- [License](#license)

<a name="project-setup"></a>
### Project Setup

Project uses [this](https://github.com/cgabriel5/snippets/tree/master/boilerplate/application) boilerplate. Its [README.md](https://github.com/cgabriel5/snippets/blob/master/boilerplate/application/README.md#-read-before-use) contains instructions for `Yarn` and `Gulp`.

<a name="demo"></a>
### Demo

Example of highlighted CSS [here](https://cgabriel5.github.io/css-syntax-highlighter/).

<a name="usage"></a>
### Usage

**Note**: The library, both minimized and unminimized, is located in `lib/`.

Take a look at `js/app.js`, `js/source/test.js`, `lib/lib.js`, and `index.html` to see how the demo is made. Colors can be customized by editing `css/source/highlighter.css`.

<a name="usage-general-example"></a>
**Step By Step** &mdash; General usage.

* **Step 1**: Get String To Parse

```js
// Get string either from the DOM (i.e. text value from textarea, input...etc) 
// or from server via an Ajax request.

var myString = ".red-text { color: red; }";
```

* **Step 2**: Create Web Worker

```js
var worker = new Worker("path/to/lib.js");
```

* **Step 3**: Listen To Web Worker

```js
worker.addEventListener("message", function(e) {

    // cache the data object
    var message = e.data;

    // once finished parsing string
    if (message.action === "done") {
    
        // cache highlighted CSS string
        var highlighted = message.highlighted;

        // do something with highlighted string...
        // (i.e. inject into an HTMLElement)

        // finally, close the worker
        worker.postMessage({ "action": "stop" }); 

    }

}, false);
```

* **Step 4**: Send Data To Web Worker

```js
worker.postMessage({
    "action": "start", // required (tell worker to start & parse)
    "string": myString // required (string to parse & highlight)
});
```

<a name="issues"></a>
### Issues

* Very longs strings can take time to parse (strings > 300,000 characters will fail in Google Chrome). 

<a name="contributing"></a>
### Contributing

Contributions are welcome! Found a bug, feel like documentation is lacking/confusing and needs an update, have performance/feature suggestions or simply found a typo? Let me know! :)

See how to contribute [here](https://github.com/cgabriel5/css-syntax-highlighter/blob/master/CONTRIBUTING.md).

<a name="todo"></a>
### TODO

- [ ] Re-write parser for better performance.

<a name="license"></a>
### License

This project uses the [MIT License](https://github.com/cgabriel5/css-syntax-highlighter/blob/master/LICENSE.txt).
