// IIFE start
(function() {
    "use strict";
    var library = (function() {
        // =============================== Helper Functions
        /**
         * @description [Adds the provided item and CSS class name to the HTML highlight template.]
         * @param {Any} object        [The object that was parsed.]
         * @param {String} class_name [The CSS class name.]
         */
        function add(object, class_name) {
            // add the parts array
            flags.parts.push("<span class=\"lang-css-" + (class_name || "none") + "\">" + object + "</span>");
        }
        /**
         * @description [Going forward from the provided index, function returns the index
         *               where the Regular Expression fails.]
         * @param  {Number} index   [The index to start forward search]
         * @param  {String} string  [The string to use for forward search.]
         * @param  {RegExp} pattern [The RegExp pattern to test character.]
         * @return {Number}         [The index where the RegExp failed.]
         */
        function forward(index, string, pattern) {
            // fast-forward until anything pattern is false
            for (var i = index + 1; i < string.length; i++) {
                // remove 1 from index to not include the character that
                // broke the pattern. we do not want that character
                if (pattern.test(string.charAt(i))) return i - 1;
            }
            // else return the provided index
            return index;
        }
        /**
         * @description [Going in reverse from the provided index, function returns the index
         *               where the Regular Expression fails.]
         * @param  {Number} index   [The index to start reverse search]
         * @param  {String} string  [The string to use for reverse search.]
         * @param  {RegExp} pattern [The RegExp pattern to test character.]
         * @return {Number}         [The index where the RegExp failed.]
         */
        function reverse(index, string, pattern) {
            // loop backwards until pattern is false
            for (var i = index - 1; i > -1; i--) {
                // we add 1 to the returned index because the return happens on the
                // characters that does not pass the pattern test. therefore, we add
                // 1 because the next char (to its right) is the last char that did
                // pass the test
                if (pattern.test(string.charAt(i))) return i + 1;
            }
            // else return the provided index
            return index;
        }
        /**
         * @description [Splits the provided string into its prefix and its string.]
         * @param  {String} string      [The string to split.]
         * @param  {Array} definitions  [The list of valid CSS definitions.]
         * @return {Object}             [Object containing the prefix/string and their
         *                               validity.]
         */
        function split(string, definitions) {
            // remove start atsign
            string = string.replace(/\@/, "");
            // check for prefix pattern match
            var prefix = "",
                str = "",
                prefix_valid = false,
                str_valid = false;
            if (/^\-\w+\-/i.test(string)) {
                prefix = string.match((/^\-(\w+)\-/i))[0];
                str = string.substring(prefix.length, string.length);
            } else {
                // no prefix
                str = string;
            }
            // check for validity
            prefix_valid = (-~language.prefixes.indexOf((prefix || "")
                .replace(/-/g, "")
                .toLowerCase())) ? true : false;
            str_valid = (-~definitions.indexOf(str.toLowerCase())) ? true : false;
            // return the object containing the prefix/string and their validity
            return {
                "prefix": prefix,
                "string": str,
                "valid": {
                    "prefix": prefix_valid,
                    "string": str_valid
                }
            };
        }
        /**
         * @description [Returns the index where the provided character is found and
         *               is not being escaped.]
         * @param  {Number} i       [The index where to start search.]
         * @param  {String} str     [The character to stop search at.]
         * @param  {String} string  [The string used to search.]
         * @return {Number}         [The index where the provided substring was found
         *                           and is not being escaped.]
         */
        function ending(i, str, string) {
            // loop flag
            var on = true;
            while (on) {
                // find new instance of substring/character string
                i = string.indexOf(str, i + 1);
                if (!-~i) {
                    // stop loop
                    on = false;
                } else {
                    // check that previous character is not escaping
                    var rindex = reverse(i, string, /[^\\]/);
                    if (!((i - rindex) & 1)) {
                        // if the difference is a positive number the asterisk
                        // is not being escaped and can be used ad the comment
                        // end. otherwise, if the difference is odd then the
                        // asterisk is being escaped and the search should continue
                        on = false;
                    }
                }
            }
            // at the end return the index
            return i;
        }
        /**
         * @description [Sets the flags.warn flag with the provided message.]
         * @param {String} message   [The warning message.]
         * @param {Number} index     [The index where the problem was spotted.]
         * @param {Object} flags     [The flag object.]
         */
        function warn(message, index, flags) {
            // set the warning
            flags.warning = message + " " + index + ".";
        }
        /**
         * [language: CSS language keywords]
         * @type {Object}
         */
        var language = {
            // css browser prefix list: http://stackoverflow.com/questions/5411026/list-of-css-vendor-prefixes
            "prefixes": ["ah", "apple", "atscwap", "hp", "khtml", "moz", "ms", "mso", "o", "prince", "rim", "ro", "tc", "webkit"],
            "colornames": ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
            "functions": ["alpha", "annotation", "attr", "blur", "brightness", "calc", "character-variant", "circle", "contrast", "counter", "cross-fade", "cubic-bezier", "d", "dir", "drop-shadow", "element", "ellipse", "fit-content", "format", "grayscale", "hsl", "hsla", "hue-rotate", "image", "image-set", "inset", "invert", "lang", "leader", "linear-gradient", "local", "matrix", "matrix3d", "minmax", "not", "nth-child", "nth-last-child", "nth-last-of-type", "nth-of-type", "opacity", "ornaments", "perspective", "polygon", "radial-gradient", "rect", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "rgb", "rgba", "rotate", "rotate3d", "rotatex", "rotatey", "rotatez", "saturate", "scale", "scale3d", "scalex", "scaley", "scalez", "sepia", "skew", "skewx", "skewy", "steps", "styleset", "stylistic", "swash", "symbols", "target-counter", "target-counters", "target-text", "translate", "translate3d", "translatex", "translatey", "translatez", "url", "var"],
            "tags": ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "noembed", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "plaintext", "pre", "progress", "q", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"],
            // https://developer.mozilla.org/en-US/docs/Web/CSS/time
            "units": ["%", "ch", "cm", "deg", "dpi", "dppx", "em", "ex", "in", "mm", "ms", "n", "pc", "pt", "px", "rem", "s", "vh", "vmax", "vmin", "vw"],
            // artules https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
            "atrules": {
                "nested": ["annotation", "character-variant", "charset", "counter-style", "document", "font-face", "font-feature-values", "import", "keyframes", "media", "namespace", "ornaments", "page", "styleset", "stylistic", "supports", "swash", "viewport"],
                "oneliners": ["charset", "import", "namespace"]
            },
            // http://www.w3schools.com/cssref/css_selectors.asp
            "operators": {
                "singles": ["=", ">", "+", "~", "|", "^", "$", "*"],
                "doubles": ["~=", "|=", "^=", "$=", "*="]
            },
            // https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
            "pseudos": ["active", "after", "any", "before", "checked", "clear", "default", "disabled", "empty", "enabled", "file-upload-button", "first", "first-child", "first-letter", "first-line", "first-of-type", "focus", "focus-inner", "focusring", "fullscreen", "hover", "in-range", "indeterminate", "inner-spin-button", "input-placeholder", "invalid", "last-child", "last-of-type", "left", "link", "only-child", "only-of-type", "optional", "out-of-range", "outer-spin-button", "placeholder", "read-only", "read-write", "required", "right", "root", "scope", "scrollbar", "scrollbar-thumb", "scrollbar-track-piece", "search-cancel-button", "search-decoration", "selection", "target", "valid", "visited"],
            // css property list: http://www.blooberry.com/indexdot/css/propindex/all.htm
            // unique array: http://stackoverflow.com/questions/6940103/how-do-i-make-an-array-with-unique-elements-i-e-remove-duplicates/23282067#23282067
            "properties": ["accelerator", "align-content", "align-items", "align-self", "alignment-baseline", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "app-region", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "baseline-shift", "behavior", "binding", "border", "border-bottom", "border-bottom-color", "border-bottom-colors", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-horizontal-spacing", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-colors", "border-left-style", "border-left-width", "border-radius", "border-radius-bottomleft", "border-radius-bottomright", "border-radius-topleft", "border-radius-topright", "border-right", "border-right-color", "border-right-colors", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-colors", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-vertical-spacing", "border-width", "bottom", "box-align", "box-decoration-break", "box-direction", "box-flex", "box-flex-group", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-reflect", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "buffered-rendering", "caption-side", "clear", "clip", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-rendering", "column-count", "column-gap", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "content", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "cx", "cy", "d", "direction", "display", "dominant-baseline", "elevation", "empty-cells", "fill", "fill-opacity", "fill-rule", "filter", "flex", "flex-align", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-line-pack", "flex-order", "flex-pack", "flex-shrink", "flex-wrap", "float", "flood-color", "flood-opacity", "font", "font-family", "font-kerning", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-caps", "font-variant-ligatures", "font-variant-numeric", "font-weight", "height", "highlight", "hyphenate-character", "hyphens", "image-rendering", "ime-mode", "include-source", "interpolation-mode", "isolation", "justify-content", "layer-background-color", "layer-background-image", "layout-flow", "layout-grid", "layout-grid-char", "layout-grid-char-spacing", "layout-grid-line", "layout-grid-mode", "layout-grid-type", "left", "letter-spacing", "lighting-color", "line-break", "line-clamp", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "locale", "margin", "margin-after-collapse", "margin-before-collapse", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-end", "marker-mid", "marker-offset", "marker-start", "marks", "mask", "mask-box-image", "mask-box-image-outset", "mask-box-image-repeat", "mask-box-image-slice", "mask-box-image-source", "mask-box-image-width", "mask-clip", "mask-composite", "mask-image", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-height", "max-width", "min-height", "min-width", "mix-blend-mode", "motion-offset", "motion-path", "motion-rotation", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-X", "overflow-y", "overflow-Y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "pointer-events", "position", "print-color-adjust", "quotes", "r", "replace", "resize", "richness", "right", "rtl-ordering", "ruby-align", "ruby-overhang", "ruby-position", "rx", "ry", "scrollbar-3d-light-color", "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-track-color", "set-link-source", "shape-image-threshold", "shape-margin", "shape-outside", "shape-rendering", "size", "speak", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stop-color", "stop-opacity", "stress", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "table-layout", "tap-highlight-color", "text-align", "text-align-last", "text-anchor", "text-autospace", "text-combine", "text-decoration", "text-decoration-skip", "text-decorations-in-effect", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-fill-color", "text-indent", "text-justify", "text-kashida-space", "text-orientation", "text-overflow", "text-rendering", "text-security", "text-shadow", "text-size-adjust", "text-stroke-color", "text-stroke-width", "text-transform", "text-underline-position", "top", "touch-action", "touch-callout", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "use-link-source", "user-drag", "user-focus", "user-input", "user-modify", "user-select", "vector-effect", "vertical-align", "visibility", "voice-family", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "x", "y", "z-index", "zoom"],
            // http://www.w3schools.com/cssref/css_websafe_fonts.asp
            // https://www.granneman.com/webdev/coding/css/fonts-and-formatting/web-browser-font-defaults/
            "fontnames": ["Arial", "Courier", "cursive", "Georgia", "Helvetica", "Impact", "monospace", "sans-serif", "serif", "Tahoma", "Times", "Verdana"],
            "media": {
                // http://www.w3schools.com/cssref/css3_pr_mediaquery.asp
                "types": ["all", "aural", "braille", "embossed", "handheld", "print", "projection", "screen", "speech", "tty", "tv"],
                "features": ["aspect-ratio", "color", "color-index", "device-aspect-ratio", "device-height", "device-width", "grid", "height", "max-aspect-ratio", "max-color", "max-color-index", "max-device-aspect-ratio", "max-device-height", "max-device-width", "max-height", "max-monochrome", "max-resolution", "max-width", "min-aspect-ratio", "min-color", "min-color-index", "min-device-aspect-ratio", "min-device-height", "min-device-width", "min-height", "min-monochrome", "min-resolution", "min-width", "monochrome", "orientation", "overflow-block", "overflow-inline", "resolution", "scan", "update-frequency", "width"],
                // https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
                "logicals": ["and", "not", "only"]
            },
            "other": {
                "value": ["!important"],
                "selector": ["even", "odd"]
            }
        };
        /**
         * [flags: Used throughout parsing]
         * @type {Object}
         */
        var flags = {
            // universal flags
            "parts": [],
            "counter": -1,
            "mode": "selector",
            "INCLUDE_LAST": 1, // include the last character of wanted substring
            // selector/codeblock loop flags
            "nested": null,
            "codeblock": null,
            // error/warning flags
            "warning": null
        };
        // =============================== Core Library Functions
        /**
         * [parsers: The parser functions]
         * @type {Object}
         */
        var parsers = {
            "string": function(i, string, char, prev_char, next_char, flags) {
                // grab everything until the string ends, take into account escaped quotes
                var endquote_index = ending(i, char, string);
                // set warning if quote is unclosed
                if (!-~endquote_index) {
                    // this will return the originally provided index
                    // set warning message..will be displayed next loop iteration
                    warn("Possible unclosed string skipped at index", i, flags);
                    // add to the array
                    add(char, null);
                    // return here...and return the index
                    return i;
                }
                // else closing quote found, in other words valid string
                // get everything between the string plus the string start & end quotes
                var str = string.substring(i, (endquote_index + flags.INCLUDE_LAST));
                // add the string to array
                add(str, "string");
                // return new index
                return endquote_index;
            },
            "comment": function(i, string, char, prev_char, next_char, flags) {
                // next character must be an asterisk
                if (next_char !== "*") {
                    // add to the array
                    add(char, null);
                    // return the index
                    return i;
                }
                // grab everything until the comment ends
                var endcomment_index = string.indexOf("*/", i + 1);
                // set warning if comment is unclosed
                if (!-~endcomment_index) {
                    // set warning message..will be displayed next loop iteration
                    warn("Possible unclosed comment skipped at index", i, flags);
                    // add to the array
                    add(char, null);
                    // return here...and return the index
                    return i;
                }
                // else close comment ending found, in other words valid comment
                // get everything between the comment plus the comment start (/*) & end (*/)
                // this is why 2 is added to the endcomment_index, to grab the end (*/)
                var str = string.substring(i, (endcomment_index + (flags.INCLUDE_LAST * 2)));
                // add the string to array
                add(str, "comment");
                // reset the index
                i = endcomment_index + 1; // add 1 to include the end slash
                // return the index
                return i;
            },
            "openbrace": function(i, string, char, prev_char, next_char, flags) {
                // if the atrule nested flag is set skip setting any flag
                // and just add the brace to the parts array
                if (flags.nested) {
                    // unset the flag
                    flags.nested = false;
                } else {
                    // if flag is not set...it is a simple code block selector
                    // set the codeblock flag
                    flags.codeblock = true;
                    flags.mode = "property";
                }
                // add to the array
                add("{", "punct");
                // return the index
                return i;
            },
            "closebrace": function(i, string, char, prev_char, next_char, flags) {
                // if closing a simple code block...
                if (flags.codeblock) {
                    // unset the flag
                    flags.codeblock = null;
                    flags.mode = "selector";
                }
                // add to the array
                add("}", "punct");
                // return the index
                return i;
            },
            "colon": function(i, string, char, prev_char, next_char, flags) {
                // if in the code block, once the property is is accounted for
                // anything after that will run with the mode set to x-property-value
                if (flags.codeblock) {
                    // set the mode to x-property-value
                    flags.mode = "x-property-value";
                }
                // only run the the mode is allowed
                if (!-~["selector"].indexOf(flags.mode)) {
                    // add to the array
                    add(char, "punct");
                    // return the index
                    return i;
                }
                // if the next char after the current colon is anything
                // but a letter it must be skipped. this is done to cover
                // the use of double colons like ::after. the pseudo "after"
                // will get picked up on the next iteration.
                if (/[^a-z\-]/i.test(next_char)) {
                    // add to the array
                    add(char, "punct");
                    // return the index
                    return i;
                }
                // get the forward index
                var findex = forward(i, string, /[^a-z\-]/i);
                // get the fast forwarded string
                var pseudo = string.substring(i + 1, (findex + flags.INCLUDE_LAST));
                // next char cannot be an openparens, this means its a function
                if (string.charAt(findex + flags.INCLUDE_LAST) === "(") {
                    // skip so that the next iteration will start on the openparens
                    // and run the openparens function if check
                    add(char, "punct");
                    // return the index
                    return findex;
                }
                // in the case that there is not a real pseudo, for example,
                // something like this: margin-right:-4px;
                // the "pseudo" in this case will be "-"
                // skip to the next iteration and add the :
                if (pseudo === "-") {
                    // add to the array
                    add(char, "punct");
                    // return the index
                    return i;
                }
                // split string into prefix and string
                var parts = split(pseudo, language.pseudos);
                var prefix = parts.prefix,
                    str = parts.string,
                    is_valid_prefix = parts.valid.prefix,
                    is_valid_str = parts.valid.string;
                var invalid_css = "uo-pseudo lang-css-unofficial";
                var valid_css = "pseudo";
                // add to the array
                add(char, "punct");
                if (prefix) add(prefix, (!is_valid_prefix) ? invalid_css : valid_css);
                if (str) add(str, (!is_valid_str) ? invalid_css : valid_css);
                // return the index
                return findex;
            },
            "semicolon": function(i, string, char, prev_char, next_char, flags) {
                // if in the code block, once the value is is accounted for
                // the mode should be set back to property. it will be set back to
                // selector when the entire code block is done being parsed
                if (flags.codeblock) {
                    // set the mode to x-property-value
                    flags.mode = "property";
                }
                // add to the array
                add(char, "punct");
                // return the index
                return i;
            },
            "atrule": function(i, string, char, prev_char, next_char, flags) {
                // only run the the mode is allowed
                if (!-~["selector"].indexOf(flags.mode)) {
                    // add to the array
                    add(char, null);
                    // return the index
                    return i;
                }
                // get the forward index
                var findex = forward(i, string, /[^a-z\-]/i);
                // get the fast forwarded string
                var atrule = string.substring(i, (findex + flags.INCLUDE_LAST));
                // split string into prefix and string
                var parts = split(atrule, language.atrules.nested);
                var prefix = parts.prefix,
                    str = parts.string,
                    is_valid_prefix = parts.valid.prefix,
                    is_valid_str = parts.valid.string;
                var invalid_css = "uo-atrule lang-css-unofficial";
                var valid_css = "atrule";
                // add to the array
                add("@", (!is_valid_prefix && !is_valid_str) ? invalid_css : valid_css);
                if (prefix) add(prefix, (!is_valid_prefix) ? invalid_css : valid_css);
                if (str) add(str, (!is_valid_str) ? invalid_css : valid_css);
                // check if atrule is a oneliner..if so skip (not a code block)
                if (!-~language.atrules.oneliners.indexOf(str)) {
                    // set the nested flag
                    flags.nested = true;
                }
                // return the index
                return findex;
            },
            "openparens": function(i, string, char, prev_char, next_char, flags) {
                // only run the the mode is allowed
                if (!-~["selector", "x-property-value"].indexOf(flags.mode)) {
                    // add to the array
                    add(char, "punct");
                    // return the index
                    return i;
                }
                // get the reverse index
                var rindex = reverse(i, string, /[^a-z\-]/i);
                // get the fast forwarded string
                var fn = string.substring(rindex, i);
                // split string into prefix and string
                var parts = split(fn, language.functions);
                var prefix = parts.prefix,
                    str = parts.string,
                    is_valid_prefix = parts.valid.prefix,
                    is_valid_str = parts.valid.string;
                var invalid_css = "uo-function lang-css-unofficial";
                var valid_css = "function";
                // add to the array
                if (prefix) add(prefix, (!is_valid_prefix) ? invalid_css : valid_css);
                if (str) add(str, (!is_valid_str) ? invalid_css : valid_css);
                add(char, "punct");
                // return the index
                return i;
            },
            "punct": function(i, string, char, prev_char, next_char, flags) {
                // add to the array
                add(char, "punct");
                // return the index
                return i;
            },
            "space": function(i, string, char, prev_char, next_char, flags) {
                // add to the array
                add(char, "space");
                // return the index
                return i;
            },
            "hyphen": function(i, string, char, prev_char, next_char, flags) {
                // get the forward index --> number check
                var findex = forward(i, string, /[^0-9\.\-]/i);
                // get the fast forwarded string
                var str = string.substring(i, (findex + flags.INCLUDE_LAST));
                // get the forward index --> prefixed word check
                var findex_ = forward(i, string, /[^a-z\-]/i);
                // get the fast forwarded string
                var str_ = string.substring(i, (findex_ + flags.INCLUDE_LAST));
                // negative number
                if (str && str.replace(/\-/g, "")
                    .length > 0 && /[^a-z]/i.test(str.charAt(1))) {
                    var minus_count = str.split("-")
                        .length - 1;
                    // skip if more than 2 consecutive minus signs in a row
                    if (minus_count > 2) {
                        // add to the array
                        add(char, null);
                        // return the index
                        return i;
                    }
                    var dot_count = str.split(".")
                        .length - 1;
                    // skip if more than 2 consecutive minus signs in a row
                    if (dot_count > 1) {
                        // cut string off at second dot
                        var parts = str.split(".");
                        // only want the first 2 parts
                        str = parts[0] + "." + parts[1];
                    }
                    // skip if no numbers are contained
                    if (!/[0-9]/.test(str)) {
                        // add to the array
                        add(char, null);
                        // return the index
                        return i;
                    }
                    // add to array
                    add(str, "number");
                    // reset the index
                    i = findex;
                    // increase the index to the next iteration character
                    // to check for possible unit
                    i++;
                    // get the forward index
                    var findex = forward(i, string, /[^a-z]/i);
                    // get the fast forwarded string
                    var unit = string.substring(i, (findex + flags.INCLUDE_LAST));
                    if (-~language.units.indexOf(unit)) {
                        // check if "unit" is the nth selector
                        var css_class = (unit !== "n" ? "unit" : "nth");
                        // add to array
                        add(unit, css_class);
                        // reset the index
                        i = findex;
                    } else {
                        // if no unit found move index back prior to check
                        i--;
                    }
                    // prefixed property/function/value
                } else if (str_ && str_.length > 1) {
                    // reset the vars
                    str = str_;
                    findex = findex_;
                    // cache the mode
                    var mode = flags.mode;
                    // also skip to next iteration if the next character is also a hyphen
                    if (next_char === "-") {
                        // check for possible css variable (custom property)
                        // [https://developer.mozilla.org/en-US/docs/Web/CSS/var]
                        // [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables]
                        // **Note**: Although most examples on the web show that to define a variable 2 hyphens must
                        // be used, an unlimited amount of hyphens seem to be allowed. For example the following variable
                        // definitions are seem to work. Even "----: blanchedalmond;"
                        // :root {
                        //     --apple: red;
                        //     --a: green;
                        //     ----: blanchedalmond;
                        // }
                        // body {
                        //   background: var(----);
                        // }
                        // Therefore, the syntax to look for a variable is the following: --[-∞][number|letter|hyphen]+
                        if (/^\-\-(\-+)?[a-z0-9-]+$/i.test(str_)) {
                            if (mode === "property") {
                                // id the mode is set to property then the variable must be getting defined
                                // syntax color highlight
                                add(str, "variable-definition");
                            } else if (mode === "x-property-value") {
                                // if the mode is set to x-property-value then the variable must be getting used
                                // syntax color highlight
                                add(str, "variable-name");
                            }
                            // reset the index
                            i = findex;
                        } else {
                            // this covers anything else...
                            add(char, null);
                        }
                        // return the index
                        return i;
                    }
                    // next char cannot be an openparens, this means its a function
                    if (string.charAt(findex + flags.INCLUDE_LAST) === "(") {
                        // skip so that the next iteration will start on the openparens
                        // and run the openparens function if check
                        return findex;
                    }
                    if (mode === "property") {
                        // split string into prefix and string
                        var parts = split(str, language.properties);
                        var prefix = parts.prefix,
                            str = parts.string,
                            is_valid_prefix = parts.valid.prefix,
                            is_valid_str = parts.valid.string;
                        var invalid_css = "uo-property lang-css-unofficial";
                        var valid_css = "property";
                        // add to the array
                        if (prefix) add(prefix, (!is_valid_prefix) ? invalid_css : valid_css);
                        if (str) add(str, (!is_valid_str) ? invalid_css : valid_css);
                    } else if (mode === "x-property-value") {
                        // any words gets the default x-property-value
                        // syntax color highlight
                        add(str, "x-property-value");
                    } else if (mode === "selector") {
                        // this covers anything else that might be prefixed
                        // but is not valid
                        add(str, null);
                    }
                    // reset the index
                    i = findex;
                } else { // an empty hyphen followed by nothing
                    // add the string to array
                    add(char, null);
                }
                // return the index
                return i;
            },
            "letter": function(i, string, char, prev_char, next_char, flags) {
                // get the forward index
                var findex = forward(i, string, /[^a-z0-9\-]/i);
                // get the fast forwarded string
                var str = string.substring(i, (findex + flags.INCLUDE_LAST));
                // next char cannot be an openparens, this means its a function
                if (string.charAt(findex + flags.INCLUDE_LAST) === "(") {
                    // skip so that the next iteration will start on the openparens
                    // and run the openparens function if check
                    return findex;
                }
                // cache the mode
                var mode = flags.mode;
                // the word must be a type, determined below, to by highlighted
                var type = null;
                // check if string is in allowed tags
                // check that if the previous character is not a letter
                // for example, in the word "this" the letter s will be
                // considered a tag element. this will prevent this case.
                // likewise, for the property "-webkit-box" the x will be
                // detected but because it is part of a word we must skip it
                if (-~language.tags.indexOf(str) && /[^a-z\-\[]/i.test(prev_char) && mode === "selector") {
                    type = "tag";
                    // check for colornames, fonts, media-types|features|logicals,
                    // properties...all of which do not have any numbers
                } else if (/[^0-9]/.test(str)) { // only string that have letters
                    if (mode === "property") { // CSS properties
                        if (-~language.properties.indexOf(str)) {
                            type = "property";
                        }
                    } else if (mode === "selector") { // anything part of a CSS selector
                        if (-~language.media.types.indexOf(str)) {
                            type = "media-type";
                        } else if (-~language.media.features.indexOf(str)) {
                            type = "media-feature";
                        } else if (-~language.media.logicals.indexOf(str)) {
                            type = "media-logical";
                        } else if (-~language.other.selector.indexOf(str)) {
                            type = "selector-alternating";
                        }
                    } else if (mode === "x-property-value") { // anything part of a CSS declaration value
                        if (-~language.fontnames.indexOf(str)) {
                            type = "fontname";
                        } else if (-~language.colornames.indexOf(str)) {
                            type = "colorname";
                        } else { // anything else gets the default color
                            type = "x-property-value";
                        }
                    }
                }
                // add to the array
                add(str, type);
                // return the index
                return findex;
            },
            "number": function(i, string, char, prev_char, next_char, flags) {
                // only run the the mode is allowed
                if (!-~["selector", "x-property-value"].indexOf(flags.mode)) {
                    // add to the array
                    add(char, null);
                    // return the index
                    return i;
                }
                // get the forward index
                var findex = forward(i, string, /[^0-9\.]/i);
                // get the fast forwarded string
                var str = string.substring(i, (findex + flags.INCLUDE_LAST));
                // potential number
                if (str) {
                    var dot_count = str.split(".")
                        .length - 1;
                    // skip if more than 2 consecutive minus signs in a row
                    if (dot_count > 1) {
                        // add to the array
                        add(char, null);
                        // return the index
                        return i;
                    }
                    // skip if no numbers are contained
                    if (!/[0-9]/.test(str)) {
                        // add to the array
                        add(char, null);
                        // return the index
                        return i;
                    }
                    // add to array
                    add(str, "number");
                    // reset the index
                    i = findex;
                    // increase the index to the next iteration character
                    // to check for possible unit
                    i++;
                    // get the forward index
                    var findex = forward(i, string, /[^a-z]/i);
                    // get the fast forwarded string
                    var unit = string.substring(i, (findex + flags.INCLUDE_LAST));
                    if (-~language.units.indexOf(unit)) {
                        // check if "unit" is the nth selector
                        var css_class = (unit !== "n" ? "unit" : "nth");
                        // add to array
                        add(unit, css_class);
                        // reset the index
                        i = findex;
                    } else {
                        // if no unit found move index back prior to check
                        i--;
                    }
                } else { // just add the char
                    // add to the array
                    add(char, null);
                }
                // return the index
                return i;
            },
            "hash": function(i, string, char, prev_char, next_char, flags) {
                // get the forward index
                var findex = forward(i, string, /[^a-z0-9\-_]/i);
                // get the fast forwarded string
                var str = string.substring(i, (findex + flags.INCLUDE_LAST));
                // check if string is in allowed ids
                if (str.length > 1) {
                    // hexcolor must be either 3, 6, 8 hexadecimal characters in length
                    if (flags.mode === "x-property-value" && !/[^a-f0-9]/i.test(str.slice(1)) && -~[3, 6, 8].indexOf(str.length - 1)) {
                        // add to the array
                        add(str, "hexcolor");
                        // reset the index
                        i = findex;
                    } else if (flags.mode === "selector") { // an id
                        // http://stackoverflow.com/questions/2812072/allowed-characters-for-css-identifiers/2812097#2812097
                        // str cannot start with a number or hyphen then number
                        if (/[0-9]/.test(str.charAt(1))) {
                            // add to the array
                            add(char, null);
                            return i;
                        }
                        // str cannot start with hyphen then number
                        if (str.charAt(1) === "_" && /[0-9]/.test(str.charAt(2))) {
                            // add to the array
                            add(char, null);
                            return i;
                        }
                        // add to the array
                        add(str, "id");
                        // reset the index
                        i = findex;
                    }
                } else { // just add the char
                    // add to the array
                    add(char, null);
                }
                // return the index
                return i;
            },
            "dot": function(i, string, char, prev_char, next_char, flags) {
                // only run the the mode is allowed
                if (!-~["selector", "x-property-value"].indexOf(flags.mode)) {
                    // add to the array
                    add(char, null);
                    // return the index
                    return i;
                }
                // get the forward index
                var findex = forward(i, string, /[^0-9]/i);
                // get the fast forwarded string
                var str = string.substring(i, (findex + flags.INCLUDE_LAST));
                // get the forward index
                var findex_ = forward(i, string, /[^a-z0-9\-_]/i);
                // get the fast forwarded string
                var selector = string.substring(i, (findex_ + flags.INCLUDE_LAST));
                // potential number
                // has to be more than the dot
                if (str.length > 1) {
                    // add to array
                    add(str, "number");
                    // reset the index
                    i = findex;
                    // increase the index to the next iteration character
                    // to check for possible unit
                    i++;
                    // get the forward index
                    var findex = forward(i, string, /[^a-z]/i);
                    // get the fast forwarded string
                    var unit = string.substring(i, (findex + flags.INCLUDE_LAST));
                    if (-~language.units.indexOf(unit)) {
                        // check if "unit" is the nth selector
                        var css_class = (unit !== "n" ? "unit" : "nth");
                        // add to array
                        add(unit, css_class);
                        // reset the index
                        i = findex;
                    } else {
                        // if no unit found move index back prior to check
                        i--;
                    }
                } else if (selector && selector.length > 1) { // potential class
                    // reset the vars
                    str = selector;
                    findex = findex_;
                    // http://stackoverflow.com/questions/2812072/allowed-characters-for-css-identifiers/2812097#2812097
                    // selector cannot start with a number or hyphen then number
                    if (/[0-9]/.test(selector.charAt(1))) {
                        // add to the array
                        add(char, null);
                        // return the index
                        return i;
                    }
                    // selector cannot start with hyphen then number
                    if (selector.charAt(1) === "_" && /[0-9]/.test(selector.charAt(2))) {
                        // add to the array
                        add(char, null);
                        // return the index
                        return i;
                    }
                    // if the first character after the dot or hash is number skip
                    // the current iteration and set is_decimal flag. this will cause
                    // the next iteration to pick up with the number and run the number
                    // if check logic block.
                    if (char === "." && /[0-9]/.test(selector.charAt(1))) {
                        // add to the array
                        add(char, null);
                        // return the index
                        return i;
                    }
                    // check if string is in allowed ids
                    if (selector.length > 1) {
                        // add to array
                        add(selector, "class");
                        // reset the index
                        i = findex;
                    }
                } else { // just add the char
                    // add the string to array
                    add(char, null);
                }
                // return the index
                return i;
            },
            "exclamationpoint": function(i, string, char, prev_char, next_char, flags) {
                // only run the the mode is allowed
                if (!-~["x-property-value"].indexOf(flags.mode)) {
                    // add to the array
                    add(char, null);
                    // return the index
                    return i;
                }
                // get the forward index
                var findex = forward(i, string, /[^a-z]/i);
                // get the fast forwarded string
                var keyword = string.substring(i, (findex + flags.INCLUDE_LAST));
                // check if string is in allowed keywords
                if (-~language.other.value.indexOf(keyword.toLowerCase())) {
                    // add to array
                    add(keyword, "keyword");
                    // reset the index
                    i = findex;
                } else { // just add the char
                    // add to the array
                    add(char, null);
                }
                // return the index
                return i;
            },
            "openbracket": function(i, string, char, prev_char, next_char, flags) {
                // only run the the mode is allowed
                if (!-~["selector"].indexOf(flags.mode)) {
                    // add to the array
                    add(char, "punct");
                    // return the index
                    return i;
                }
                // get the forward index
                var findex = forward(i, string, /[^a-z\-]/i);
                // get the fast forwarded string
                var attribute = string.substring(i, (findex + flags.INCLUDE_LAST));
                // check if string is in allowed attributes
                if (i !== findex) {
                    // remove staring open bracket
                    attribute = attribute.replace(/^\[/g, "");
                    // add to array
                    add(char, "punct");
                    add(attribute, "attribute");
                    // reset the index
                    i = findex;
                } else { // no attribute just empty brackets, just add the char
                    // add to array
                    add(char, "punct");
                }
                // return the index
                return i;
            },
            "operator": function(i, string, char, prev_char, next_char, flags) {
                if (!-~["selector", "x-property-value"].indexOf(flags.mode)) {
                    // add to the array
                    add(char, null);
                    // return the index
                    return i;
                }
                // default let the operator be the current char
                var operator = char,
                    type = null;
                // check that single operator is allowed
                if (-~language.operators.singles.indexOf(char)) {
                    // set the type to operator
                    type = "operator";
                    // var is_valid_operator = -~language.operator.doubles.indexOf(char) ? true : false;
                    // check if next char is an equal sign
                    if (next_char === "=") {
                        // check if operator pair is a double
                        if (-~language.operators.doubles.indexOf(char + next_char)) {
                            // combine both operators into one
                            operator = char + next_char;
                            // to account fot the second operator add 1 to the index
                            i = i + 1;
                        } else {
                            // not a double...just use the first operator
                            operator = char;
                            // leave index alone as it is only 1 character
                        }
                    } else {
                        // single operator
                        operator = char;
                        // leave index alone as it is only 1 character
                    }
                }
                // just add it without highlighting
                add(operator, type);
                // return the index
                return i;
            }
        };
        /**
         * [lookup: Parser function lookup table.]
         * @type {Object}
         */
        var lookup = {
            // special characters
            "\"": parsers.string,
            "'": parsers.string,
            "/": parsers.comment,
            "@": parsers.atrule,
            "{": parsers.openbrace,
            "}": parsers.closebrace,
            "(": parsers.openparens,
            ")": parsers.punct,
            "[": parsers.openbracket,
            "]": parsers.punct,
            ":": parsers.colon,
            ";": parsers.semicolon,
            ",": parsers.punct,
            "!": parsers.exclamationpoint,
            "-": parsers.hyphen,
            ".": parsers.dot,
            "#": parsers.hash,
            " ": parsers.space,
            // letters (lowercase)
            "a": parsers.letter,
            "b": parsers.letter,
            "c": parsers.letter,
            "d": parsers.letter,
            "e": parsers.letter,
            "f": parsers.letter,
            "g": parsers.letter,
            "h": parsers.letter,
            "i": parsers.letter,
            "j": parsers.letter,
            "k": parsers.letter,
            "l": parsers.letter,
            "m": parsers.letter,
            "n": parsers.letter,
            "o": parsers.letter,
            "p": parsers.letter,
            "q": parsers.letter,
            "r": parsers.letter,
            "s": parsers.letter,
            "t": parsers.letter,
            "u": parsers.letter,
            "v": parsers.letter,
            "w": parsers.letter,
            "x": parsers.letter,
            "y": parsers.letter,
            "z": parsers.letter,
            // numbers
            "0": parsers.number,
            "1": parsers.number,
            "2": parsers.number,
            "3": parsers.number,
            "4": parsers.number,
            "5": parsers.number,
            "6": parsers.number,
            "7": parsers.number,
            "8": parsers.number,
            "9": parsers.number,
            // operators
            "~": parsers.operator,
            "*": parsers.operator,
            "=": parsers.operator,
            ">": parsers.operator,
            "+": parsers.operator,
            "|": parsers.operator,
            "^": parsers.operator
        };
        // =============================== Main Functions
        /**
         * @description [Parses the provided string.]
         * @param  {String} string [The string to parse.]
         * @return {Array}        [Array containing the parsed out parts.]
         */
        function parser(string) {
            // pad string to help with edge cases
            string = " " + string + " ";
            // loop over string
            for (var i = 0, l = string.length; i < l; i++) {
                if (i === -1) break; // used to stop infinite loop while debugging
                // handle warning if present
                if (flags.warning) {
                    console.warn(flags.warning);
                    // clear warning
                    flags.warning = null;
                }
                // cache the current character
                var char = string.charAt(i),
                    prev_char = string.charAt(i - 1),
                    next_char = string.charAt(i + 1);
                // get parser
                var parser_fn = lookup[char.toLowerCase()];
                // if the character is parsable run the returned function
                if (parser_fn) {
                    // reset the index to the returned index from the parser function
                    i = parser_fn(i, string, char, prev_char, next_char, flags);
                } else {
                    // simply add the character to array
                    add(char, (string.charCodeAt(i) === 10) ? "enter" : null);
                }
            }
            // return string without the added initial padding
            return flags.parts;
        }
        /**
         * @description [Main function calls the parser() function, removes left/right padding,
         *               and joins the parts to make the final highlighted string.]
         * @param  {String} string [The string to parse.]
         * @return {String}        [The highlighted CSS string.]
         */
        function main(string) {
            // parse the string
            var parts = parser(string);
            // remove initial padding from array (first and last item)
            parts.shift(); // remove start padding (first item)
            parts.pop(); // remove ending padding (last item)
            // join the parts to make the final highlighted string and return
            return parts.join("");
        }
        // the worker event listener
        self.addEventListener("message", function(e) {
            // cache the data object
            var message = e.data;
            // object collection of actions
            var actions = {
                "start": function() {
                    // run the main function
                    var highlighted = main(message.string);
                    // send back data
                    self.postMessage({
                        "action": "done",
                        "highlighted": highlighted
                    });
                },
                "stop": function() {
                    // stop the worker
                    self.close();
                }
            };
            // run the needed action
            (actions[message.action] || window.Function)();
        }, false);
        // return library to add to global scope later...
        return main;
    })();
    // =============================== Global Library Functions/Methods/Vars
    // IIFE end
})();