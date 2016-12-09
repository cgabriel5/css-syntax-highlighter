(function() {

    /**
     * [db: CSS language keywords]
     * @type {Object}
     */
    var db = {
        // css browser prefix list: http://stackoverflow.com/questions/5411026/list-of-css-vendor-prefixes
        "prefixes": ["ah", "apple", "atscwap", "hp", "khtml", "moz", "ms", "mso", "o", "prince", "rim", "ro", "tc", "webkit"],
        "colornames": ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
        "functions": ["alpha", "annotation", "attr", "blur", "brightness", "calc", "character-variant", "circle", "contrast", "counter", "cross-fade", "cubic-bezier", "dir", "drop-shadow", "element", "ellipse", "fit-content", "format", "grayscale", "hsl", "hsla", "hue-rotate", "image", "image-set", "inset", "invert", "lang", "leader", "linear-gradient", "local", "matrix", "matrix3d", "minmax", "not", "nth-child", "nth-last-child", "nth-last-of-type", "nth-of-type", "opacity", "ornaments", "perspective", "polygon", "radial-gradient", "rect", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "rgb", "rgba", "rotate", "rotate3d", "rotatex", "rotatey", "rotatez", "saturate", "scale", "scale3d", "scalex", "scaley", "scalez", "sepia", "skew", "skewx", "skewy", "steps", "styleset", "stylistic", "swash", "symbols", "target-counter", "target-counters", "target-text", "translate", "translate3d", "translatex", "translatey", "translatez", "url", "var"],
        "tags": ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "noembed", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "plaintext", "pre", "progress", "q", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"],
        // https://developer.mozilla.org/en-US/docs/Web/CSS/time
        "units": ["%", "ch", "cm", "deg", "dpi", "dppx", "em", "ex", "in", "mm", "ms", "n", "pc", "pt", "px", "rem", "s", "vh", "vmax", "vmin", "vw"],
        // artules https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
        "atrules": ["annotation", "character-variant", "charset", "counter-style", "document", "font-face", "font-feature-values", "import", "keyframes", "media", "namespace", "ornaments", "page", "styleset", "stylistic", "supports", "swash", "viewport"],
        // http://www.w3schools.com/cssref/css_selectors.asp
        "operators": ["~", "*", "=", ">", "+", "|", "^", "$", "~=", "|=", "^=", "$=", "*="],
        // unique array: http://stackoverflow.com/questions/1960473/unique-values-in-an-array/39272981#39272981
        // a = a.filter(function (x, i, a_) { return a_.indexOf(x) == i; });
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
        "pseudos": [":active", ":after", ":any", ":before", ":checked", ":default", ":disabled", ":empty", ":enabled", ":file-upload-button", ":first", ":first-child", ":first-letter", ":first-line", ":first-of-type", ":focus", ":focus-inner", ":focus-inner", ":focus-inner", ":focus-inner", ":focusring", ":fullscreen", ":hover", ":in-range", ":indeterminate", ":inner-spin-button", ":invalid", ":last-child", ":last-of-type", ":left", ":link", ":only-child", ":only-of-type", ":optional", ":out-of-range", ":outer-spin-button", ":read-only", ":read-write", ":required", ":right", ":root", ":scope", ":search-cancel-button", ":search-decoration", ":selection", ":target", ":valid", ":visited"],
        // css property list: http://www.blooberry.com/indexdot/css/propindex/all.htm
        // unique array: http://stackoverflow.com/questions/6940103/how-do-i-make-an-array-with-unique-elements-i-e-remove-duplicates/23282067#23282067
        "properties": ["accelerator", "align-content", "align-items", "align-self", "alignment-baseline", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "app-region", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "baseline-shift", "behavior", "binding", "border", "border-bottom", "border-bottom-color", "border-bottom-colors", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-horizontal-spacing", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-colors", "border-left-style", "border-left-width", "border-radius", "border-radius", "border-radius-bottomleft", "border-radius-bottomright", "border-radius-topleft", "border-radius-topright", "border-right", "border-right-color", "border-right-colors", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-colors", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-vertical-spacing", "border-width", "bottom", "box-align", "box-decoration-break", "box-direction", "box-flex", "box-flex-group", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-reflect", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "buffered-rendering", "caption-side", "clear", "clip", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-rendering", "column-count", "column-gap", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "content", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "cx", "cy", "d", "direction", "display", "dominant-baseline", "elevation", "empty-cells", "fill", "fill-opacity", "fill-rule", "filter", "flex-align", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-line-pack", "flex-order", "flex-pack", "flex-shrink", "flex-wrap", "float", "flood-color", "flood-opacity", "font", "font-family", "font-kerning", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-caps", "font-variant-ligatures", "font-variant-numeric", "font-weight", "height", "highlight", "hyphenate-character", "hyphens", "image-rendering", "ime-mode", "include-source", "interpolation-mode", "isolation", "justify-content", "layer-background-color", "layer-background-image", "layout-flow", "layout-grid", "layout-grid-char", "layout-grid-char-spacing", "layout-grid-line", "layout-grid-mode", "layout-grid-type", "left", "letter-spacing", "lighting-color", "line-break", "line-clamp", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "locale", "margin", "margin-after-collapse", "margin-before-collapse", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-end", "marker-mid", "marker-offset", "marker-start", "marks", "mask", "mask-box-image", "mask-box-image-outset", "mask-box-image-repeat", "mask-box-image-slice", "mask-box-image-source", "mask-box-image-width", "mask-clip", "mask-composite", "mask-image", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-height", "max-width", "min-height", "min-width", "mix-blend-mode", "motion-offset", "motion-path", "motion-rotation", "object-fit", "object-position", "opacity", "opacity", "order", "orphans", "outline", "outline", "outline-color", "outline-color", "outline-offset", "outline-style", "outline-style", "outline-width", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-X", "overflow-y", "overflow-Y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "pointer-events", "position", "print-color-adjust", "quotes", "r", "replace", "resize", "richness", "right", "rtl-ordering", "ruby-align", "ruby-overhang", "ruby-position", "rx", "ry", "scrollbar-3d-light-color", "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-track-color", "set-link-source", "shape-image-threshold", "shape-margin", "shape-outside", "shape-rendering", "size", "speak", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stop-color", "stop-opacity", "stress", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "table-layout", "tap-highlight-color", "text-align", "text-align-last", "text-anchor", "text-autospace", "text-combine", "text-decoration", "text-decoration-skip", "text-decorations-in-effect", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-fill-color", "text-indent", "text-justify", "text-kashida-space", "text-orientation", "text-overflow", "text-rendering", "text-security", "text-shadow", "text-size-adjust", "text-stroke-color", "text-stroke-width", "text-transform", "text-underline-position", "top", "touch-action", "touch-callout", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "use-link-source", "user-drag", "user-focus", "user-input", "user-modify", "user-modify", "user-select", "user-select", "vector-effect", "vertical-align", "visibility", "voice-family", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "x", "y", "z-index", "zoom"],
        // http://www.w3schools.com/cssref/css_websafe_db.fontnames.asp
        // https://www.granneman.com/webdev/coding/css/fonts-and-formatting/web-browser-font-defaults/
        "fontnames": ["Arial", "Courier", "cursive", "Georgia", "Helvetica", "Impact", "monospace", "sans-serif", "serif", "Tahoma", "Times", "Verdana"],
        "media": {
            // http://www.w3schools.com/cssref/css3_pr_mediaquery.asp
            "types": ["all", "aural", "braille", "embossed", "handheld", "print", "projection", "screen", "speech", "tty", "tv"],
            "features": ["aspect-ratio", "color", "color-index", "device-aspect-ratio", "device-height", "device-width", "grid", "height", "max-aspect-ratio", "max-color", "max-color-index", "max-device-aspect-ratio", "max-device-height", "max-device-width", "max-height", "max-monochrome", "max-resolution", "max-width", "min-aspect-ratio", "min-color", "min-color-index", "min-device-aspect-ratio", "min-device-height", "min-device-width", "min-height", "min-monochrome", "min-resolution", "min-width", "monochrome", "orientation", "overflow-block", "overflow-inline", "resolution", "scan", "update-frequency", "width"],
            // https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
            "logicals": ["and", "not", "only"]

        },
        "keywords": {
            "value": ["!important"],
            "selector": ["even", "odd"]
        }
    };

    /**
     * [flags: used throughout parsing]
     * @type {Object}
     */
    var flags = {
        // universal flags
        "parts": [],
        "counter": -1,
        "INCLUDE_LAST": 1, // include the last character of wanted substring
        // string,comment loop flags
        "wrap": null,
        "pair": null,
        "start": null,
        // selector/codeblock loop flags
        "nested": null,
        "nestedlevel": -1,
        // error/warning flags
        "warning": null
    };

    function is_escaped(prev_char) {
        return (prev_char === "\\") ? true : false;
    }

    function ending(i, closing, string) {

        var on = true;

        while (on) {
            // console.log("??????????", i);
            // find new instance of closing string
            i = string.indexOf(closing, i + 1);
            if (!-~i) {
                // stop loop
                on = false;
            } else {
                // check that previous character is not escaping
                var rindex = reverse(i, string, /[^\\]/);
                // console.log(">>>>>>>>>>>>>>reverse", rindex, i, string, (i - rindex));
                if (!((i - rindex) & 1)) {
                    // if the difference is a positive number the asterisk
                    // is not being escaped and can be used ad the comment
                    // end. otherwise, if the difference is odd then the
                    // asterisk is being escaped and the search should continue
                    // console.log("is even");
                    on = false;
                }
            }
        }
        // console.log("))))))))))))))))))))", i);
        return i;

    }

    function parse_warning(msg, index, flags) {

        // set the warning
        flags.warning = msg + " " + index + ".";

        return index;

    }

    var parse_string = function(i, string, char, prev_char, next_char, flags, mode) {

        // grab everything until the string ends, take into account escaped quotes
        var close_index = ending(i, char, string)

        // set warning is unclosed
        if (!-~close_index) return parse_warning("Possible unclosed string skipped at index", i, flags);

        // else closing quote found, in other words valid string
        // get everything between the string plus the string start & end quotes
        var str = string.substring(i, (close_index + flags.INCLUDE_LAST));
        // add the string to array
        flags.parts.push([str, "string", i, str.length]);
        // reset the index
        i = close_index + 1;

        // return the index
        return i;

    };

    var parse_letter = function(i, string, char, prev_char, next_char, flags, mode) {

        if (!-~["selector", "property", "x-property-value"].indexOf(mode)) return i;

        // get the forward index
        var findex = forward(i, string, /[^a-z0-9\-]/i);
        // get the fast forwarded string
        var str = string.substring(i, (findex + flags.INCLUDE_LAST));

        // the word must be a type, determined below, to by highlighted
        var type = null;

        // skip if word is an attribute or a function
        // attributes are left default color (black) and functions
        // are handled in their own if check
        if ((string.charAt(findex + flags.INCLUDE_LAST) === "(" && -~db.functions.indexOf(str.toLowerCase()))) {
            // reset the index so that the next iteration it starts at the parenthesis
            // character so that it triggers the if function logic check
            // console.log("this is a potential function mane", str);
            i = findex;
            return i;
        }

        // check if string is in allowed tags
        // check that if the previous character is not a letter
        // for example, in the word "this" the letter s will be
        // considered a tag element. this will prevent this case.
        // likewise, for the property "-webkit-box" the x will be
        // detected but because it is part of a word we must skip it
        if (-~db.tags.indexOf(str) && /[^a-z\-\[]/i.test(prev_char) && mode === "selector") {
            // if (-~db.tags.indexOf(str) && -~["", "}"].indexOf(prev_char.trim()) && mode === "selector") {
            type = "tag";
            // check for colornames, fonts, media-types|features|logicals,
            // properties...all of which do not have any numbers
        } else if (/[^0-9]/.test(str)) { // only string that have letters
            if (mode === "property") { // CSS properties
                if (-~db.properties.indexOf(str)) {
                    type = "property";
                }
            } else if (mode === "selector") { // anything part of a CSS selector
                if (-~db.media.types.indexOf(str)) {
                    type = "media-type";
                } else if (-~db.media.features.indexOf(str)) {
                    type = "media-feature";
                } else if (-~db.media.logicals.indexOf(str)) {
                    type = "media-logical";
                } else if (-~db.keywords.selector.indexOf(str)) {
                    type = "selector-alternating";
                }
            } else if (mode === "x-property-value") { // anything part of a CSS declaration value
                if (-~db.fontnames.indexOf(str)) {
                    type = "fontname";
                } else if (-~db.colornames.indexOf(str)) {
                    type = "colorname";
                } else { // anything else gets the default color
                    type = "x-property-value";
                }
            }
        }

        if (type) {

            // add to array
            flags.parts.push([str, type]);
            // reset the index
            i = findex;

        }

        // return the index
        return i;

    };
    var parse_number = function(i, string, char, prev_char, next_char, flags, mode) {

        if (!-~["selector", "x-property-value"].indexOf(mode)) return i;

        // get the forward index
        var findex = forward(i, string, /[^0-9\.]/i);
        // get the fast forwarded string
        var str = string.substring(i, (findex + flags.INCLUDE_LAST));

        // potential number
        if (str) {

            var dot_count = str.split(".").length - 1;
            // skip if more than 2 consecutive minus signs in a row
            if (dot_count > 1) return i;
            // skip if no numbers are contained
            if (!/[0-9]/.test(str)) return i;

            // add to array
            flags.parts.push([str, "number"]);
            // reset the index
            i = findex;

            // // increase the index to the next iteration character
            // // to check for possible unit
            // i++;

            // get the forward index
            var findex = forward((i), string, /[^a-z]/i);
            // get the fast forwarded string
            var unit = string.substring((i), (findex + flags.INCLUDE_LAST));

            if (-~db.units.indexOf(unit)) {

                // check if "unit" is the nth selector
                var css_class = (unit !== "n" ? "unit" : "nth");

                // add to array
                flags.parts.push([unit, css_class]);
                // reset the index
                i = findex;

            }

            // else {
            //     // if no unit found move index back prior to check
            //     i--;
            // }

        }

        // return the index
        return i;

    };
    var parse_operator = function(i, string, char, prev_char, next_char, flags, mode) {

        if (!-~["selector", "x-property-value"].indexOf(mode)) return i;

        // check if the next character is an equal sign
        var operator = string.substring(i, (i + ((next_char === "=") ? 2 : 1)));

        // check if double operator is valid...
        // if not reset it back to a single operator
        if (operator.length === 2) {
            // check if operator is allowed
            if (!-~db.operators.indexOf(operator)) {
                // if not reset it back to the single operator
                operator = string.substring(i, (i + 1));
            }
        }

        // only add to list if operator is in list
        if (-~db.operators.indexOf(operator)) {

            // add the string to array
            flags.parts.push([operator, "operator"]);
            // reset length and index
            i = i + (operator.length - 1);

        }

        // return the index
        return i;

    };

    var parsers = {
        // "`": function() {},
        "\"": parse_string,
        "'": parse_string,
        "/": function(i, string, char, prev_char, next_char, flags, mode) {

            // skips are made to the next iteration character
            // skip if quote is being escaped
            // if (is_escaped(prev_char)) return i;
            // next character must be an asterisk
            if (next_char !== "*") return i;

            // grab everything until the comment ends
            var close_index = string.indexOf("*/", i + 1);

            // set warning is unclosed
            if (!-~close_index) return parse_warning("Possible unclosed comment skipped at index", i, flags);

            // else close comment ending found, in other words valid comment
            // get everything between the comment plus the comment start (/*) & end (*/)
            // this is why 2 is added to the close_index, to grab the end (*/)
            var str = string.substring(i, (close_index + (flags.INCLUDE_LAST * 2)));
            // add the string to array
            flags.parts.push([str, "comment", i, str.length]);
            // reset the index
            i = close_index + 1;

            // return the index
            return i;

        },
        "@": function(i, string, char, prev_char, next_char, flags, mode) {

            // must be the allowed mode to run
            if (!-~["selector"].indexOf(mode)) return i;

            // get the forward index
            var findex = forward(i, string, /[^a-z\-]/i);
            // get the fast forwarded string
            var atrule = string.substring(i, (findex + flags.INCLUDE_LAST));

            var prefix = "";
            // check for possible browser prefix
            if (atrule.charAt(1) === "-") {
                // get the second hyphen index
                var hyphen_index = atrule.indexOf("-", 2);
                // get/set the prefix
                prefix = atrule.substring(2, hyphen_index);
                // reset the atrule
                atrule = "@" + atrule.substring(hyphen_index + 1, atrule.length);
                // check if atrule is valid...if not reset back to empty
                if (!-~db.prefixes.indexOf(prefix.toLowerCase())) {
                    prefix = "";
                    atrule = ""; // purposely invalidate atrule
                }
            }

            // check if string is in allowed atrules
            if (-~db.atrules.indexOf(atrule.slice(1).toLowerCase())) {

                // if a prefix is present...reset atrule back to normal
                if (prefix) atrule = ("@-" + prefix + "-" + atrule.slice(1));

                // add to array
                flags.parts.push([atrule, "atrule", i, atrule.length]);
                // reset the index
                i = findex;

            }

            // check if atrule is a oneliner..if so skip as it does not contain
            //  an inner code block
            if (!-~["charset", "import", "namespace"].indexOf(atrule)) {
                // set the nested flag
                flags.nested = true;
            }

            // return the index
            return i;

        },
        "{": function(i, string, char, prev_char, next_char, flags, mode) {

            // if the nested flag is set
            if (flags.nested) {

                // increment nested level count
                flags.nestedlevel = flags.nestedlevel + 1;
                // turn off nested flag, no longer needed
                flags.nested = null;

            } else {

                // this is a normal code block, not a nested atrule
                // get the ending brace and code block
                var ending_brace = string.indexOf("}", i + 1);
                // only get text bwteeen the braces, the code block, but
                // do not get the braces
                var text_between = string.substring(i + 1, ending_brace);
                // placehold codeblock here
                // add to array
                flags.parts.push(["{", null, i]);
                flags.parts.push([text_between, "block"]);
                flags.parts.push(["}", null, ending_brace]);
                // reset length and index
                i = ending_brace;

            }

            // return the index
            return i;

        },
        "}": function(i, string, char, prev_char, next_char, flags, mode) {

            // if the nested count is present...reduce it by 1
            if (flags.nestedlevel > -1) {
                // decrease nested level by 1
                flags.nestedlevel = flags.nestedlevel - 1;
            }

            // return the index
            return i;

        },
        "(": function(i, string, char, prev_char, next_char, flags, mode) {

            // must be the allowed mode to run
            if (!-~["selector", "x-property-value"].indexOf(mode)) return i;

            // get the reverse index
            var rindex = reverse(i, string, /[^a-z-]/i);
            // get the fast forwarded string
            var fn = string.substring(rindex, i);

            var prefix = "";
            // check for possible browser prefix
            if (fn.charAt(0) === "-") {

                // get the second hyphen index
                var hyphen_index = fn.indexOf("-", 1);
                // get/set the prefix
                prefix = fn.substring(1, hyphen_index);
                // reset the fn
                fn = fn.substring(hyphen_index + 1, fn.length);
                // check if fn is valid...if not reset back to empty
                if (!-~db.prefixes.indexOf(prefix.toLowerCase())) {
                    prefix = "";
                    fn = ""; // purposely invalidate fn
                }
            }

            // check if string is in allowed functions
            if (-~db.functions.indexOf(fn.replace(/\($/, "").toLowerCase())) {

                // if a prefix is present...reset fn back to normal
                if (prefix) fn = ("-" + prefix + "-" + fn);

                // add to array
                flags.parts.push([fn, "function"]);
                flags.parts.push(["(", null]);
                // reset the index
                // i = i;

            }

            // return the index
            return i;

        },
        "[": function(i, string, char, prev_char, next_char, flags, mode) {

            // must be the allowed mode to run
            if (!-~["selector"].indexOf(mode)) return i;

            // get the forward index
            var findex = forward(i, string, /[^a-z\-]/i);
            // get the fast forwarded string
            var attribute = string.substring(i, (findex + flags.INCLUDE_LAST));

            // check if string is in allowed attributes
            if (attribute.length > 1) {

                i++; // increase index to not include the starting bracket
                // remove starting bracket
                attribute = attribute.replace(/^\[/g, "");

                // add to array
                flags.parts.push(["[", null]);
                flags.parts.push([attribute, "attribute"]);
                // reset the index
                i = findex;

            }

            // return the index
            return i;

        },
        ":": function(i, string, char, prev_char, next_char, flags, mode) {

            // must be the allowed mode to run
            if (!-~["selector", "x-property-value"].indexOf(mode)) return i;

            // if the next char after the current colon is anything
            // but a letter it must be skipped. this is done to cover
            // the use of double colons like ::after. the pseudo "after"
            // will get picked up on the next iteration.
            if (/[^a-z\-]/i.test(next_char)) {
                // add to the array and return the index
                flags.parts.push([":", null]);
                return i
            }

            // get the forward index
            var findex = forward(i, string, /[^a-z\-]/i);
            // get the fast forwarded string
            var pseudo = string.substring(i, (findex + flags.INCLUDE_LAST));

            var prefix = "";
            // check for possible browser prefix
            if (pseudo.charAt(1) === "-") {
                // get the second hyphen index
                var hyphen_index = pseudo.indexOf("-", 2);
                // get/set the prefix
                prefix = pseudo.substring(2, hyphen_index);
                // reset the pseudo
                pseudo = ":" + pseudo.substring(hyphen_index + 1, pseudo.length);
                // check if pseudo is valid...if not reset back to empty
                if (!-~db.prefixes.indexOf(prefix.toLowerCase())) {
                    prefix = "";
                    pseudo = ""; // purposely invalidate pseudo
                }
            }

            // check if string is in allowed pseudos
            if (-~db.pseudos.indexOf(pseudo.toLowerCase())) {

                // if a prefix is present...reset pseudo back to normal
                if (prefix) pseudo = (":-" + prefix + "-" + pseudo.slice(1));

                i++; // increase index to not include the starting colon
                // remove starting colon
                pseudo = pseudo.replace(/^:/g, "");

                // add to array
                flags.parts.push([":", null]);
                flags.parts.push([pseudo, "pseudo"]);
                // reset the index
                i = findex;

            }

            // return the index
            return i;

        },
        "!": function(i, string, char, prev_char, next_char, flags, mode) {

            // must be the allowed mode to run
            if (!-~["x-property-value"].indexOf(mode)) return i;

            // get the forward index
            var findex = forward(i, string, /[^a-z]/i);
            // get the fast forwarded string
            var keyword = string.substring(i, (findex + flags.INCLUDE_LAST));

            // check if string is in allowed keywords
            if (-~db.keywords.value.indexOf(keyword.toLowerCase())) {

                // add to array
                flags.parts.push([keyword, "keyword"]);
                // reset the index
                i = findex;

            }

            // return the index
            return i;

        },
        "-": function(i, string, char, prev_char, next_char, flags, mode) {

            // must be the allowed mode to run
            if (-~["selector", "x-property-value"].indexOf(mode)) {

                // get the forward index
                var findex = forward(i, string, /[^0-9\.\-]/i);
                // get the fast forwarded string
                var str = string.substring(i, (findex + flags.INCLUDE_LAST));

                // potential number
                if (str && str.length > 1 && /[^a-z]/i.test(str.charAt(1))) {

                    var minus_count = str.split("-").length - 1;
                    // skip if more than 2 consecutive minus signs in a row
                    if (minus_count > 2) return i;
                    var dot_count = str.split(".").length - 1;
                    // skip if more than 2 consecutive minus signs in a row
                    if (dot_count > 1) {
                        // cut string off at second dot
                        var parts = str.split(".");
                        // only want the first 2 parts
                        str = parts[0] + "." + parts[1];
                    }
                    // skip if no numbers are contained
                    if (!/[0-9]/.test(str)) return i;

                    // add to array
                    flags.parts.push([str, "number"]);
                    // reset the index
                    i = findex;

                    // increase the index to the next iteration character
                    // to check for possible unit
                    i++;

                    // get the forward index
                    var findex = forward((i), string, /[^a-z]/i);
                    // get the fast forwarded string
                    var unit = string.substring((i), (findex + flags.INCLUDE_LAST));

                    if (-~db.units.indexOf(unit)) {

                        // check if "unit" is the nth selector
                        var css_class = (unit !== "n" ? "unit" : "nth");

                        // add to array
                        flags.parts.push([unit, css_class]);
                        // reset the index
                        i = findex;

                    } else {
                        // if no unit found move index back prior to check
                        i--;
                    }

                } else if (mode === "x-property-value") {

                    // get the forward index
                    var findex = forward(i, string, /[^a-z\-]/i);
                    // get the fast forwarded string
                    var str = string.substring(i, (findex + flags.INCLUDE_LAST));

                    var prefix = "";
                    // check for possible browser prefix
                    if (str.charAt(0) === "-") {
                        // get the second hyphen index
                        var hyphen_index = str.indexOf("-", 1);
                        // get/set the prefix
                        prefix = str.substring(1, hyphen_index);
                        // reset the str
                        str = str.substring(hyphen_index + 1, str.length);
                        // check if str is valid...if not reset back to empty
                        if (!-~db.prefixes.indexOf(prefix.toLowerCase())) {
                            prefix = "";
                            str = ""; // purposely invalidate str
                        }
                    }

                    // skip if word is an attribute or a function
                    // attributes are left default color (black) and functions
                    // are handled in their own if check
                    // ** check for function prefix also???
                    if ((string.charAt(findex + flags.INCLUDE_LAST) === "(" && -~db.functions.indexOf(str.toLowerCase()))) {
                        // reset the index so that the next iteration it starts at the parenthesis
                        // character so that it triggers the if function logic check
                        i = findex;
                        return i;
                    }

                    // check if string is in allowed strs
                    if (str.length > 1) {

                        // if a prefix is present...reset str back to normal
                        if (prefix) str = ("-" + prefix + "-" + str);

                        // add to array
                        flags.parts.push([str, "x-property-value"]);
                        // reset the index
                        i = findex;

                    }

                }

                // return the index
                return i;

            } else if (-~["property"].indexOf(mode)) {

                // get the forward index
                var findex = forward(i, string, /[^a-z\-]/i);
                // get the fast forwarded string
                var str = string.substring(i, (findex + flags.INCLUDE_LAST));

                var prefix = "";
                // check for possible browser prefix
                if (str.charAt(0) === "-") {
                    // get the second hyphen index
                    var hyphen_index = str.indexOf("-", 1);
                    // get/set the prefix
                    prefix = str.substring(1, hyphen_index);
                    // reset the str
                    str = str.substring(hyphen_index + 1, str.length);
                    // check if str is valid...if not reset back to empty
                    if (!-~db.prefixes.indexOf(prefix.toLowerCase())) {
                        prefix = "";
                        str = ""; // purposely invalidate str
                    }
                }

                // check if string is in allowed strs
                if (-~db.properties.indexOf(str)) {

                    // if a prefix is present...reset str back to normal
                    if (prefix) str = ("-" + prefix + "-" + str);

                    // add to array
                    flags.parts.push([str, "property"]);
                    // reset the index
                    i = findex;

                }

            }

            // return the index
            return i;

        },
        ".": function(i, string, char, prev_char, next_char, flags, mode) {

            if (!-~["selector", "x-property-value"].indexOf(mode)) return i;

            // get the forward index
            var findex = forward(i, string, /[^0-9]/i);
            // get the fast forwarded string
            var str = string.substring(i, (findex + flags.INCLUDE_LAST));

            // potential number
            // has to be more than the dot
            if (str.length > 1) {

                // add to array
                flags.parts.push([str, "number"]);
                // reset the index
                i = findex;

                // // increase the index to the next iteration character
                // // to check for possible unit
                // i++;

                // get the forward index
                var findex = forward((i), string, /[^a-z]/i);
                // get the fast forwarded string
                var unit = string.substring((i), (findex + flags.INCLUDE_LAST));

                if (-~db.units.indexOf(unit)) {

                    // check if "unit" is the nth selector
                    var css_class = (unit !== "n" ? "unit" : "nth");

                    // add to array
                    flags.parts.push([unit, css_class]);
                    // reset the index
                    i = findex;

                }

                // else {
                //     // if no unit found move index back prior to check
                //     i--;
                // }

            } else { // potential class

                // get the forward index
                var findex = forward(i, string, /[^a-z0-9\-_]/i);
                // get the fast forwarded string
                var selector = string.substring(i, (findex + flags.INCLUDE_LAST));

                // http://stackoverflow.com/questions/2812072/allowed-characters-for-css-identifiers/2812097#2812097
                // selector cannot start with a number or hyphen then number
                if (/[0-9]/.test(selector.charAt(1))) {
                    flags.parts.push([".", null]);
                    return i;
                }
                // selector cannot start with hyphen then number
                if (selector.charAt(1) === "_" && /[0-9]/.test(selector.charAt(2))) {
                    flags.parts.push([".", null]);
                    return i;
                }

                // if the first character after the dot or hash is number skip
                // the current iteration and set is_decimal flag. this will cause
                // the next iteration to pick up with the number and run the number
                // if check logic block.
                if (char === "." && /[0-9]/.test(selector.charAt(1))) return i;

                // check if string is in allowed ids
                if (selector.length > 1) {

                    // add to array
                    flags.parts.push([selector, "class"]);
                    // reset the index
                    i = findex;

                }

            }

            // return the index
            return i;

        },
        "#": function(i, string, char, prev_char, next_char, flags, mode) {

            if (!-~["selector", "x-property-value"].indexOf(mode)) return i;

            // get the forward index
            var findex = forward(i, string, /[^a-z0-9\-_]/i);
            // get the fast forwarded string
            var str = string.substring(i, (findex + flags.INCLUDE_LAST));

            // // if the first character after the dot or hash is number skip
            // // the current iteration and set is_decimal flag. this will cause
            // // the next iteration to pick up with the number and run the number
            // // if check logic block.
            // if (char === "." && /[0-9]/.test(str.charAt(1))) continue;

            // check if string is in allowed ids
            if (str.length > 1) {

                // hexcolor must be either 3, 6, 8 hexadecimal characters in length
                if (mode === "x-property-value" && !/[^a-f0-9]/i.test(str.slice(1)) && -~[3, 6, 8].indexOf(str.length - 1)) {

                    // add to array
                    flags.parts.push([str, "hexcolor"]);
                    // reset the index
                    i = findex;

                } else { // else the string is a hex

                    // http://stackoverflow.com/questions/2812072/allowed-characters-for-css-identifiers/2812097#2812097
                    // str cannot start with a number or hyphen then number
                    if (/[0-9]/.test(str.charAt(1))) {
                        flags.parts.push(["#", null]);
                        return i;
                    }
                    // str cannot start with hyphen then number
                    if (str.charAt(1) === "_" && /[0-9]/.test(str.charAt(2))) {
                        flags.parts.push(["#", null]);
                        return i;
                    }

                    // add to array
                    flags.parts.push([str, "id"]);
                    // reset the index
                    i = findex;

                }

            }

            // return the index
            return i;

        },
        // letters
        "a": parse_letter,
        "b": parse_letter,
        "c": parse_letter,
        "d": parse_letter,
        "e": parse_letter,
        "f": parse_letter,
        "g": parse_letter,
        "h": parse_letter,
        "i": parse_letter,
        "j": parse_letter,
        "k": parse_letter,
        "l": parse_letter,
        "m": parse_letter,
        "n": parse_letter,
        "o": parse_letter,
        "p": parse_letter,
        "q": parse_letter,
        "r": parse_letter,
        "s": parse_letter,
        "t": parse_letter,
        "u": parse_letter,
        "v": parse_letter,
        "w": parse_letter,
        "x": parse_letter,
        "y": parse_letter,
        "z": parse_letter,
        // numbers
        "0": parse_number,
        "1": parse_number,
        "2": parse_number,
        "3": parse_number,
        "4": parse_number,
        "5": parse_number,
        "6": parse_number,
        "7": parse_number,
        "8": parse_number,
        "9": parse_number,
        // operators
        "~": parse_operator,
        "*": parse_operator,
        "=": parse_operator,
        ">": parse_operator,
        "+": parse_operator,
        "|": parse_operator,
        "^": parse_operator
    };

    /**
     * @description [After strings/comments/code blocks are placeholded this parser
     *               is run. Parser runs on 3 modes (selector|property|x-property-value).
     *               Either parsing selectors, CSS properties, or CSS value declarations.]
     * @param  {String} string [The string to parse.]
     * @param  {String} mode   [The parsing mode.]
     * @return {String}        [Syntax highlighted string.]
     */
    function parser(string, mode) {

        // pad string to help with edge cases
        string = " " + string + " ";

        // loop over string
        for (var i = 0, l = string.length; i < l; i++) {

            if (flags.warning) {
                console.warn(flags.warning);
                // clear warning
                flags.warning = null;
                // break;
            }

            if (i === -1) break; // used to stop infinite loop while debugging

            // cache the current character
            var char = string.charAt(i),
                prev_char = string.charAt(i - 1),
                next_char = string.charAt(i + 1);

            // console.log(i, char);

            // get parser
            var parser_fn = parsers[char];

            // if the character is parsable run the returned function
            if (parser_fn) {
                i = parser_fn(i, string, char, prev_char, next_char, flags, mode);
            } else {
                // simply add the character to array
                flags.parts.push([char, null, i]);
            }
            // anything else is not important and can be skipped

        }

        // flags.parts.forEach(function(item) {
        // if (item[1] !== null)
        // console.log(item);
        // });

        // return string without the added initial padding
        // return string.replace(/^\s{1}|\s{1}$/g, "");
        return flags.parts;

    }

    /**
     * @description [Calculates the new index the loop should be reset to.]
     * @param  {Number} index [The current index loop is in.]
     * @return {Number}       [The new index position to reset loop at.]
     */
    function new_index(index) {

        // get the counter and convert it to a string and add 2 for the placeholding ticks
        // then add that number to the provided index. this will be the new index to reset
        // to. but it needs to be reduced by 1..explained below
        var new_position = (index + (flags.counter.toString().length + 2));

        // it needs to be decreased by 1 as it naturally gets incremented after every
        // iteration. therefore, leaving it as it would forward it one position, or character,
        // the next iteration (skipping a character every time!).
        return (new_position - 1);

    }

    /**
     * @description [Removes passed substring at provided index with a placeholder. This
     *               placeholder will removed and replaced with original text and its
     *               corresponding syntax highlighting HTML.]
     * @param  {Number}  index      [The index point where placehold will occur.]
     * @param  {String}  string     [The string that will undergo placehold.]
     * @param  {String}  str        [The substring to placehold.]
     * @param  {Boolean} is_comment [Flag only used when placeholding comments. Needed as
     *                               comments use two characters (* && /).]
     * @return {String}             [The string with new placeholder.]
     */
    function placehold(index, string, str, is_comment) {

        // get the string from start to index point
        var start = string.substring(0, (!is_comment ? index : (index - 1)));
        // get string (index + substring length) to the end of the string
        var end = string.substring((index + (!is_comment ? str.length : (str.length - 1))), string.length);
        // create the placeholder
        var placeholder = "`" + (++flags.counter) + "`";
        // build new string with placeholder and return
        return (start + placeholder + end);

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
     * @description [Going forward from the provided index, function returns the index
     *               where the Regular Expression fails.]
     * @param  {Number} index   [The index to start forward search]
     * @param  {String} string  [The string to use for forward search.]
     * @param  {RegExp} pattern [The RegExp pattern to test character.]
     * @return {Number}         [The index where the RegExp failed.]
     */
    function forward(index, string, pattern) {

        // fastforward until anything pattern is false
        for (var i = index + 1; i < string.length; i++) {
            // remove 1 from index to not include the character that
            // broke the pattern. we do not want that character
            if (pattern.test(string.charAt(i))) return i - 1;
        }

        // else return the provided index
        return index;
    }

    /**
     * @description [Function placeholds strings/comments/code blocks. Essentially, prepares
     *               the string for the parser() function.]
     * @param  {String} string [The string to parse.]
     * @return {String}        [The placeholded string.]
     */
    function highlighter(string) {

        // return "-->"+parser(string)+"<--";
        var parts = parser(string, "selector");

        // remove initial padding from array (first and last item)
        parts.shift(); // remove start padding (first item)
        parts.pop(); // remove ending padding

        // build string with highlighting
        var build = [];
        var l = parts.length;
        parts.forEach(function(item, i) {

            // console.log(i, item);

            var str = item[0];
            var css_class = item[1] || "none";
            // console.log(i, item);
            var highlighted = "<span class=\"lang-css-" + css_class + "\">" + str + "</span>";
            // skip the first and last items in array
            // build.push((i === 0 || (i === (l - 1))) ? "" : highlighted);
            build.push(highlighted);

        });

        return build.join("");

    }

    self.addEventListener("message", function(e) {

        // cache the data object
        var message = e.data;

        // object collection of actions
        var actions = {
            "start": function() {

                // run the main function
                var highlighted = highlighter(message.string);
                // send back data
                self.postMessage({ "action": "done", "highlighted": highlighted });

            },
            "stop": function() {
                // stop the worker
                self.close();
            }
        };

        // run the needed action
        (actions[message.action] || new Function)();

    }, false);

})();
