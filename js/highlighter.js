// css browser prefix list: http://stackoverflow.com/questions/5411026/list-of-css-vendor-prefixes
var prefixes = ["ms", "mso", "moz", "o", "atscwap", "webkit", "khtml", "apple", "prince", "ah", "hp", "ro", "rim", "tc"];
var colornames = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
var functions = ["alpha", "annotation", "attr", "blur", "brightness", "calc", "character-variant", "circle", "contrast", "counter", "cross-fade", "cubic-bezier", "drop-shadow", "element", "ellipse", "fit-content", "format", "grayscale", "hsl", "hsla", "hue-rotate", "image", "image-set", "inset", "invert", "leader", "linear-gradient", "local", "matrix", "matrix3d", "minmax", "opacity", "ornaments", "perspective", "polygon", "radial-gradient", "rect", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "rgb", "rgba", "rotate", "rotate3d", "rotatex", "rotatey", "rotatez", "saturate", "scale", "scale3d", "scalex", "scaley", "scalez", "sepia", "skew", "skewx", "skewy", "steps", "styleset", "stylistic", "swash", "symbols", "target-counter", "target-counters", "target-text", "translate", "translate3d", "translatex", "translatey", "translatez", "url", "var", "dir", "lang", "not", "nth-child", "nth-last-child", "nth-last-of-type", "nth-of-type"];
var tags = ["body", "html", "img", "base", "head", "link", "meta", "style", "title", "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "nav", "section", "dd", "div", "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre", "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "rp", "rt", "rtc", "ruby", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "area", "audio", "map", "track", "video", "embed", "object", "param", "source", "canvas", "noscript", "script", "del", "ins", "caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "button", "datalist", "fieldset", "form", "input", "label", "legend", "meter", "optgroup", "option", "output", "progress", "select", "textarea", "details", "dialog", "menu", "menuitem", "summary", "content", "element", "shadow", "template", "acronym", "applet", "basefont", "big", "blink", "center", "command", "content", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "multicol", "nextid", "noembed", "plaintext", "spacer", "strike", "tt", "xmp"];
// https://developer.mozilla.org/en-US/docs/Web/CSS/time
var units = ["n", "dpi", "dppx", "deg", "em", "ex", "%", "px", "cm", "mm", "in", "pt", "pc", "ch", "rem", "vh", "vw", "vmin", "vmax", "s", "ms"];
// @-rules https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
var atrules = ["charset", "import", "namespace", "media", "supports", "document", "page", "font-face", "keyframes", "viewport", "counter-style", "font-feature-values", "swash", "ornaments", "annotation", "stylistic", "styleset", "character-variant"];
// http://www.w3schools.com/cssref/css_selectors.asp
var operators = ["~", "*", "=", ">", "+", "|", "^", "$", "~=", "|=", "^=", "$=", "*="];
// unique array: http://stackoverflow.com/questions/1960473/unique-values-in-an-array/39272981#39272981
// a = a.filter(function (x, i, a_) { return a_.indexOf(x) == i; });
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
var pseudos = ["!important", ":active", ":after", ":before", ":checked", ":disabled", ":empty", ":enabled", ":first-child", ":first-letter", ":first-line", ":first-of-type", ":focus", ":hover", ":in-range", ":invalid", ":last-child", ":last-of-type", ":link", ":only-of-type", ":only-child", ":optional", ":out-of-range", ":read-only", ":read-write", ":required", ":root", ":selection", ":target", ":valid", ":visited", ":any", ":default", ":first", ":fullscreen", ":indeterminate", ":left", ":right", ":scope"];
// css property list: http://www.blooberry.com/indexdot/css/propindex/all.htm
// unique array: http://stackoverflow.com/questions/6940103/how-do-i-make-an-array-with-unique-elements-i-e-remove-duplicates/23282067#23282067
var properties = ["accelerator", "azimuth", "background", "background-attachment", "background-color", "background-image", "background-position", "background-position-x", "background-position-y", "background-repeat", "behavior", "border", "border-bottom", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-style", "border-top-width", "border-width", "bottom", "caption-side", "clear", "clip", "color", "content", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "elevation", "empty-cells", "filter", "float", "font", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "height", "ime-mode", "include-source", "layer-background-color", "layer-background-image", "layout-flow", "layout-grid", "layout-grid-char", "layout-grid-char-spacing", "layout-grid-line", "layout-grid-mode", "layout-grid-type", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "max-height", "max-width", "min-height", "min-width", "-moz-binding", "-moz-border-radius", "-moz-border-radius-topleft", "-moz-border-radius-topright", "-moz-border-radius-bottomright", "-moz-border-radius-bottomleft", "-moz-border-top-colors", "-moz-border-right-colors", "-moz-border-bottom-colors", "-moz-border-left-colors", "-moz-opacity", "-moz-outline", "-moz-outline-color", "-moz-outline-style", "-moz-outline-width", "-moz-user-focus", "-moz-user-input", "-moz-user-modify", "-moz-user-select", "orphans", "outline", "outline-color", "outline-style", "outline-width", "overflow", "overflow-X", "overflow-Y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "pitch", "pitch-range", "play-during", "position", "quotes", "-replace", "richness", "right", "ruby-align", "ruby-overhang", "ruby-position", "-set-link-source", "size", "speak", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "table-layout", "text-align", "text-align-last", "text-decoration", "text-indent", "text-justify", "text-overflow", "text-shadow", "text-transform", "text-autospace", "text-kashida-space", "text-underline-position", "top", "unicode-bidi", "-use-link-source", "vertical-align", "visibility", "voice-family", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "background-blend-mode", "background-clip", "background-origin", "background-size", "border-radius", "border-bottom-left-radius", "border-bottom-right-radius", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-top-left-radius", "border-top-right-radius", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "font-kerning", "font-variant-ligatures", "font-variant-caps", "font-variant-numeric", "image-rendering", "isolation", "mix-blend-mode", "motion-offset", "motion-path", "motion-rotation", "object-fit", "object-position", "opacity", "outline-offset", "overflow-wrap", "overflow-x", "overflow-y", "pointer-events", "resize", "tab-size", "text-rendering", "text-size-adjust", "touch-action", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "will-change", "appearance", "backface-visibility", "border-horizontal-spacing", "border-image", "border-vertical-spacing", "box-align", "box-decoration-break", "box-direction", "box-flex", "box-flex-group", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-reflect", "clip-path", "column-count", "column-gap", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "align-content", "align-items", "align-self", "flex-flow", "flex-basis", "flex-grow", "flex-shrink", "flex-direction", "flex-wrap", "flex-pack", "flex-line-pack", "flex-align", "flex-order", "justify-content", "font-smoothing", "highlight", "hyphens", "hyphenate-character", "line-clamp", "locale", "margin-before-collapse", "margin-after-collapse", "mask-box-image", "mask-box-image-outset", "mask-box-image-repeat", "mask-box-image-slice", "mask-box-image-source", "mask-box-image-width", "mask-clip", "mask-composite", "mask-image", "mask-origin", "mask-position", "mask-repeat", "mask-size", "order", "perspective", "perspective-origin", "print-color-adjust", "rtl-ordering", "shape-outside", "shape-image-threshold", "shape-margin", "tap-highlight-color", "text-combine", "text-decorations-in-effect", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-fill-color", "text-orientation", "text-security", "text-stroke-color", "text-stroke-width", "transform", "transform-origin", "transform-style", "user-drag", "user-modify", "user-select", "app-region", "buffered-rendering", "clip-rule", "mask", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "marker-end", "marker-mid", "marker-start", "mask-type", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "alignment-baseline", "baseline-shift", "dominant-baseline", "text-anchor", "vector-effect", "paint-order", "d", "cx", "cy", "x", "y", "r", "rx", "ry", "touch-callout"];
// http://www.w3schools.com/cssref/css_websafe_fonts.asp
// https://www.granneman.com/webdev/coding/css/fonts-and-formatting/web-browser-font-defaults/
var fonts = ["Georgia", "Times", "serif", "sans-serif", "Arial", "Helvetica", "cursive", "Impact", "Tahoma", "Verdana", "Courier", "monospace"];
// http://www.w3schools.com/cssref/css3_pr_mediaquery.asp
var media_types = ["all", "aural", "braille", "embossed", "handheld", "print", "projection", "screen", "speech", "tty", "tv"];
var media_features = ["aspect-ratio", "color", "color-index", "device-aspect-ratio", "device-height", "device-width", "grid", "height", "max-aspect-ratio", "max-color", "max-color-index", "max-device-aspect-ratio", "max-device-height", "max-device-width", "max-height", "max-monochrome", "max-resolution", "max-width", "min-aspect-ratio", "min-color", "min-color-index", "min-device-aspect-ratio", "min-device-width", "min-device-height", "min-height", "min-monochrome", "min-resolution", "min-width", "monochrome", "orientation", "overflow-block", "overflow-inline", "resolution", "scan", "update-frequency", "width"];
// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
var media_logicals = ["and", "not", "only"];
var keywords = ["!important"];
// add 1 to include the last letter character of wanted string
var include_last_char = 1;
var flags = {
    ////////////////////
    "parts": [],
    "counter": -1,
    ////////////////////
    "is": {
        "wrap": null,
        "pair": null
    },
    "string_start": null,
    ////////////////////
    "atsign": null,
    "open": {
        "brace": null
    },
    "brace": {
        "counter": null
    }
};

function parser(string, mode) {

    // modes=selector|property|x-property-value

    // loop over string
    for (var i = 0, l = string.length; i < l; i++) {

        // cache the current character
        var char = string.charAt(i),
            prev_char = string.charAt(i - 1),
            next_char = string.charAt(i + 1);

        // skip current iteration on these characters
        if (-~["`", " ", "\"", "'", "{", "}"].indexOf(char)) {
            // fast forward index on ticks, as they are the placeholders
            // theresore...set loop index to character after the ending tick
            if (char === "`") i = string.indexOf("`", i + 1);
            // skip to next loop iteration
            continue;

        } else if (char === "@" && -~["selector"].indexOf(mode)) { // atrules

            // get the forward index
            var findex = forward(i, string, /[^a-z\-]/i);
            // get the fastforwarded string
            var atrule = string.substring(i, (findex + include_last_char));

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
                if (!-~prefixes.indexOf(prefix.toLowerCase())) {
                    prefix = "";
                    atrule = ""; // purposely invalidate atrule
                }
            }

            // check if string is in allowed atrules
            if (-~atrules.indexOf(atrule.slice(1).toLowerCase())) {

                // if a prefix is present...reset atrule back to normal
                if (prefix) atrule = ("@-" + prefix + "-" + atrule.slice(1));

                // add to array
                flags.parts.push([atrule, "atrule"]);
                // placehold atrule
                string = placehold(i, string, atrule);
                // reset the index
                i = new_index(i);
                l = string.length;

            }

        } else if (char === "(" && -~["selector", "x-property-value"].indexOf(mode)) { // functions

            // get the reverse index
            var rindex = reverse(i, string, /[^a-z-]/i);
            // get the fastforwarded string
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
                if (!-~prefixes.indexOf(prefix.toLowerCase())) {
                    prefix = "";
                    fn = ""; // purposely invalidate fn
                }
            }

            // check if string is in allowed functions
            if (-~functions.indexOf(fn.replace(/\($/, "").toLowerCase())) {

                // if a prefix is present...reset fn back to normal
                if (prefix) fn = ("-" + prefix + "-" + fn);

                // add to array
                flags.parts.push([fn, "function"]);
                // placehold function
                string = placehold(rindex, string, fn);
                // reset the index
                // add 1 to rindex to pick up after the open parenthesis
                // not adding 1 will cause an infinite loop as it starts
                // on the open parenthesis...triggering the function if
                // check again and again...
                i = new_index(rindex + 1);
                l = string.length;

            }

        } else if (char === ":" && -~["selector", "x-property-value"].indexOf(mode)) { // pseudos

            // if the next char after the current colon is anything
            // but a letter it must be skipped. this is done to cover
            // the use of double colons like ::after. the pseudo "after"
            // will get picked up on the next iteration.
            if (/[^a-z\-]/i.test(next_char)) continue;

            // get the forward index
            var findex = forward(i, string, /[^a-z\-]/i);
            // get the fastforwarded string
            var pseudo = string.substring(i, (findex + include_last_char));

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
                if (!-~prefixes.indexOf(prefix.toLowerCase())) {
                    prefix = "";
                    pseudo = ""; // purposely invalidate pseudo
                }
            }

            // check if string is in allowed pseudos
            if (-~pseudos.indexOf(pseudo.toLowerCase())) {

                // if a prefix is present...reset pseudo back to normal
                if (prefix) pseudo = (":-" + prefix + "-" + pseudo.slice(1));

                i++; // increase index to not include the starting colon
                // remove starting colon if present
                pseudo = pseudo.replace(/^:/g, "");

                // add to array
                flags.parts.push([pseudo, "pseudo"]);
                // placehold pseudo
                string = placehold(i, string, pseudo);
                // reset the index
                i = new_index(i);
                l = string.length;

            }

        } else if (char === "!" && -~["x-property-value"].indexOf(mode)) { // keywords

            // get the forward index
            var findex = forward(i, string, /[^a-z]/i);
            // get the fastforwarded string
            var keyword = string.substring(i, (findex + include_last_char));

            // check if string is in allowed keywords
            if (-~keywords.indexOf(keyword.toLowerCase())) {

                // add to array
                flags.parts.push([keyword, "keyword"]);
                // placehold keyword
                string = placehold(i, string, keyword);
                // reset the index
                i = new_index(i);
                l = string.length;

            }

        } else if (-~operators.indexOf(char) && -~["selector", "x-property-value"].indexOf(mode)) { // operators

            // check if the next character is an equal sign
            var operator = string.substring(i, (i + ((next_char === "=") ? 2 : 1)));

            // check if double operator is valid...
            // if not reset it back to a single operator
            if (operator.length === 2) {
                // check if operator is allowed
                if (!-~operators.indexOf(operator)) {
                    // if not reset it back to the single operator
                    operator = string.substring(i, (i + 1));
                }
            }

            // only add to list if operator is in list
            if (-~operators.indexOf(operator)) {

                // add the string to array
                flags.parts.push([operator, "operator"]);
                // placehold operator
                string = placehold(i, string, operator);
                // reset length and index
                i = new_index(i);
                l = string.length;

            }

        } else if (char === "-" && -~["selector", "x-property-value"].indexOf(mode)) { // potential number/prefixed property

            // get the forward index
            var findex = forward(i, string, /[^0-9\.\-]/i);
            // get the fastforwarded string
            var str = string.substring(i, (findex + include_last_char));

            // potential number
            if (str && str.length > 1 && /[^a-z]/i.test(str.charAt(1))) {

                var minus_count = str.split("-").length - 1;
                // skip if more than 2 consecutive minus signs in a row
                if (minus_count > 2) continue;
                var dot_count = str.split(".").length - 1;
                // skip if more than 2 consecutive minus signs in a row
                if (dot_count > 1) {
                    // cut string off at second dot
                    var parts = str.split(".");
                    // only want the first 2 parts
                    str = parts[0] + "." + parts[1];
                }
                // skip if no numbers are contained
                if (!/[0-9]/.test(str)) continue;

                // add to array
                flags.parts.push([str, "number"]);
                // placehold number
                string = placehold(i, string, str);
                // reset the index
                i = new_index(i);
                l = string.length;

                // increase the index to the next iteration character
                // to check for possible unit
                i++;

                // get the forward index
                var findex = forward((i), string, /[^a-z]/i);
                // get the fastforwarded string
                var unit = string.substring((i), (findex + include_last_char));

                if (-~units.indexOf(unit)) {

                    // check if "unit" is the nth selector
                    var css_class = (unit !== "n" ? "unit" : "nth");

                    // add to array
                    flags.parts.push([unit, css_class]);
                    // placehold unit
                    string = placehold(i, string, unit);
                    // reset the index
                    i = new_index(i);
                    l = string.length;

                } else {
                    // if no unit found move index back prior to check
                    i--;
                }

            } else if (mode === "x-property-value") {

                // get the forward index
                var findex = forward(i, string, /[^a-z\-]/i);
                // get the fastforwarded string
                var str = string.substring(i, (findex + include_last_char));

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
                    if (!-~prefixes.indexOf(prefix.toLowerCase())) {
                        prefix = "";
                        str = ""; // purposely invalidate str
                    }
                }

                // skip if word is an attribute or a function
                // attributes are left default color (black) and functions
                // are handled in their own if check
                // ** check for function prefix also???
                if ((string.charAt(findex + include_last_char) === "(" && -~functions.indexOf(str.toLowerCase()))) {
                    // reset the index so that the next iteration it starts at the parenthesis
                    // character so that it triggers the if function logic check
                    i = findex;
                    continue;
                }

                // check if string is in allowed strs
                if (str.length > 1) {

                    // if a prefix is present...reset str back to normal
                    if (prefix) str = ("-" + prefix + "-" + str);

                    // add to array
                    flags.parts.push([str, "x-property-value"]);
                    // placehold str
                    string = placehold(i, string, str);
                    // reset the index
                    i = new_index(i);
                    l = string.length;

                }

            }

        } else if (char === "-" && -~["property"].indexOf(mode)) { // prefixed property/word

            // get the forward index
            var findex = forward(i, string, /[^a-z\-]/i);
            // get the fastforwarded string
            var str = string.substring(i, (findex + include_last_char));

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
                if (!-~prefixes.indexOf(prefix.toLowerCase())) {
                    prefix = "";
                    str = ""; // purposely invalidate str
                }
            }

            // check if string is in allowed strs
            if (-~properties.indexOf(str)) {

                // if a prefix is present...reset str back to normal
                if (prefix) str = ("-" + prefix + "-" + str);

                // add to array
                flags.parts.push([str, "property"]);
                // placehold str
                string = placehold(i, string, str);
                // reset the index
                i = new_index(i);
                l = string.length;

            }

        } else if (char === "." && -~["selector", "x-property-value"].indexOf(mode)) { // potential number/class

            // get the forward index
            var findex = forward(i, string, /[^0-9]/i);
            // get the fastforwarded string
            var str = string.substring(i, (findex + include_last_char));

            // potential number
            // has to be more than the dot
            if (str.length > 1) {

                // add to array
                flags.parts.push([str, "number"]);
                // placehold number
                string = placehold(i, string, str);
                // reset the index
                i = new_index(i);
                l = string.length;

                // increase the index to the next iteration character
                // to check for possible unit
                i++;

                // get the forward index
                var findex = forward((i), string, /[^a-z]/i);
                // get the fastforwarded string
                var unit = string.substring((i), (findex + include_last_char));

                if (-~units.indexOf(unit)) {

                    // check if "unit" is the nth selector
                    var css_class = (unit !== "n" ? "unit" : "nth");

                    // add to array
                    flags.parts.push([unit, css_class]);
                    // placehold unit
                    string = placehold(i, string, unit);
                    // reset the index
                    i = new_index(i);
                    l = string.length;

                } else {
                    // if no unit found move index back prior to check
                    i--;
                }

            } else { // potential class

                // get the forward index
                var findex = forward(i, string, /[^a-z0-9\-_]/i);
                // get the fastforwarded string
                var selector = string.substring(i, (findex + include_last_char));

                // http://stackoverflow.com/questions/2812072/allowed-characters-for-css-identifiers/2812097#2812097
                // selector cannot start with a number or hyphen then number
                if (/[0-9]/.test(selector.charAt(1))) continue;
                // selector cannot start with hyphen then number
                if (selector.charAt(1) === "_" && /[0-9]/.test(selector.charAt(2))) continue;

                // if the first character after the dot or hash is number skip
                // the current iteration and set is_decimal flag. this will cause
                // the next iteration to pick up with the number and run the number
                // if check logic block.
                if (char === "." && /[0-9]/.test(selector.charAt(1))) continue;

                // check if string is in allowed ids
                if (selector.length > 1) {

                    // add to array
                    flags.parts.push([selector, "class"]);
                    // placehold selector
                    string = placehold(i, string, selector);
                    // reset the index
                    i = new_index(i);
                    l = string.length;

                }

            }

        } else if (/[0-9]/.test(char) && -~["selector", "x-property-value"].indexOf(mode)) { // potential number([negative] doubles, integers, floats, units)

            // get the forward index
            var findex = forward(i, string, /[^0-9\.]/i);
            // get the fastforwarded string
            var str = string.substring(i, (findex + include_last_char));

            // potential number
            if (str) {

                var dot_count = str.split(".").length - 1;
                // skip if more than 2 consecutive minus signs in a row
                if (dot_count > 1) continue;
                // skip if no numbers are contained
                if (!/[0-9]/.test(str)) continue;

                // add to array
                flags.parts.push([str, "number"]);
                // placehold number
                string = placehold(i, string, str);
                // reset the index
                i = new_index(i);
                l = string.length;

                // increase the index to the next iteration character
                // to check for possible unit
                i++;

                // get the forward index
                var findex = forward((i), string, /[^a-z]/i);
                // get the fastforwarded string
                var unit = string.substring((i), (findex + include_last_char));

                if (-~units.indexOf(unit)) {

                    // check if "unit" is the nth selector
                    var css_class = (unit !== "n" ? "unit" : "nth");

                    // add to array
                    flags.parts.push([unit, css_class]);
                    // placehold unit
                    string = placehold(i, string, unit);
                    // reset the index
                    i = new_index(i);
                    l = string.length;

                } else {
                    // if no unit found move index back prior to check
                    i--;
                }

            }

        } else if (char === "#" && -~["selector", "x-property-value"].indexOf(mode)) { // ids/hexcolors

            // get the forward index
            var findex = forward(i, string, /[^a-z0-9\-_]/);
            // get the fastforwarded string
            var str = string.substring(i, (findex + include_last_char));

            // // if the first character after the dot or hash is number skip
            // // the current iteration and set is_decimal flag. this will cause
            // // the next iteration to pick up with the number and run the number
            // // if check logic block.
            // if (char === "." && /[0-9]/.test(str.charAt(1))) continue;

            // check if string is in allowed ids
            if (str.length > 1) {

                // hexcolor must be either 3, 6, 8 hexadecimal characters in length
                if (!/[^a-f0-9]/.test(str.slice(1)) && -~[3, 6, 8].indexOf(str.length - 1)) {

                    // add to array
                    flags.parts.push([str, "hexcolor"]);
                    // placehold str
                    string = placehold(i, string, str);
                    // reset the index
                    i = new_index(i);
                    l = string.length;

                } else { // else the string is a hex

                    // http://stackoverflow.com/questions/2812072/allowed-characters-for-css-identifiers/2812097#2812097
                    // str cannot start with a number or hyphen then number
                    if (/[0-9]/.test(str.charAt(1))) continue;
                    // str cannot start with hyphen then number
                    if (str.charAt(1) === "_" && /[0-9]/.test(str.charAt(2))) continue;

                    // add to array
                    flags.parts.push([str, "id"]);
                    // placehold str
                    string = placehold(i, string, str);
                    // reset the index
                    i = new_index(i);
                    l = string.length;
                }

            }

        } else if (/[a-z]/i.test(char) && -~["selector", "property", "x-property-value"].indexOf(mode)) { // tags

            // get the forward index
            var findex = forward(i, string, /[^a-z0-9\-]/i);
            // get the fastforwarded string
            var str = string.substring(i, (findex + include_last_char));

            // the word must be a type, determined below, to by highlighted
            var type = null;

            // skip if word is an attribute or a function
            // attributes are left default color (black) and functions
            // are handled in their own if check
            if ((string.charAt(findex + include_last_char) === "(" && -~functions.indexOf(str.toLowerCase()))) {
                // reset the index so that the next iteration it starts at the parenthesis
                // character so that it triggers the if function logic check
                i = findex;
                continue;
            }

            // check if string is in allowed tags
            // check that if the previous character is not a letter
            // for example, in the word "this" the letter s will be
            // considered a tag element. this will prevent this case.
            // likewise, for the property "-webkit-box" the x will be
            // detected but because it is part of a word we must skip it
            if (-~tags.indexOf(str) && /[^a-z]/i.test(prev_char) && mode === "selector") {
                type = "tag";
                // check for colornames, fonts, media-types|features|logcials,
                // properties...all of which do not have any numbers
            } else if (/[^0-9]/.test(str)) {
                if (mode === "property") {
                    if (-~properties.indexOf(str) && mode === "property") {
                        type = "property";
                    }
                } else {
                    if (-~fonts.indexOf(str)) {
                        type = "font";
                    } else if (-~colornames.indexOf(str)) {
                        type = "colorname";
                    } else if (-~media_types.indexOf(str)) {
                        type = "media-type";
                    } else if (-~media_features.indexOf(str)) {
                        type = "media-feature";
                    } else if (-~media_logicals.indexOf(str)) {
                        type = "media-logical";
                    } else if (mode === "x-property-value") {
                        type = "x-property-value";
                    }
                }
            }

            if (type) {

                // add to array
                flags.parts.push([str, type]);
                // placehold tag
                string = placehold(i, string, str);
                // reset the index
                i = new_index(i);
                l = string.length;

            }

        }

    }

    // return string without the added initial padding
    return string.replace(/^\s{1}|\s{1}$/g, "");

}

function new_index(index) {
    var new_position = (index + (flags.counter.toString().length + 2));
    // however, it needs to be decreased by 1 as it naturally gets
    // incremented after every iteration. therefore, leaving it as it
    // would forward it one position, or character.
    return (new_position - 1);
}

function counter_to_string() {
    return (flags.counter.toString().length + 2);
}

function placehold(index, string, str, is_comment) {
    var start = string.substring(0, (!is_comment ? index : (index - 1)));
    var placeholder = "`" + (++flags.counter) + "`";
    var end = string.substring((index + (!is_comment ? str.length : (str.length - 1))), string.length);
    // reset the string with the placeholder
    return (start + placeholder + end);
}

function reverse(index, string, pattern) {
    // loop backwords until pattern is false
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

function highlighter(string) {

    // universal: strings, comments
    // selector: selectors(class, id, tags), numbers, units, atrules, functions?, pseudos
    // property: properties
    // value: hexcolors, numbers, units, functions, pseudos, colornames

    // pad string to help with edge cases
    string = " " + string + " ";

    // loop over string
    for (var i = 0, l = string.length; i < l; i++) {

        // cache the current character
        var char = string.charAt(i);
        // get the previous char
        var prev_char = string.charAt(i - 1),
            next_char = string.charAt(i + 1);

        // skip current iteration on these characters
        if (-~["`", " ", "{", "}"].indexOf(char)) {

            // fast forward index on ticks, as they are the placeholders
            // theresore...set loop index to character after the ending tick
            if (char === "`") i = string.indexOf("`", i + 1);
            // skip to next loop iteration
            continue;

            // string detection
        } else if (-~["\"", "'"].indexOf(char) && prev_char !== "\\") {

            // if pair flag is set, the current char must match the pair character.
            // the starting quote must be of the same type as the ending quote...
            // if they do not match skip iteration as they are not a match
            if (flags.is.pair && char !== flags.is.pair) continue;

            if (flags.is.wrap !== "comment") {

                if (flags.string_start === null && flags.is.wrap === null) {

                    // set flags
                    flags.is.wrap = "string";
                    flags.string_start = i;
                    // must match the same type of quote
                    flags.is.pair = char;

                } else if (flags.string_start !== null && flags.is.wrap === "string" && flags.is.pair === char) {

                    // store original index to see code clearer
                    var original_index = flags.string_start;

                    // get the string since the open quote
                    var str = string.substring(original_index, (i + include_last_char));
                    // add the string to array
                    flags.parts.push([str, "string"]);
                    // placehold string
                    string = placehold(original_index, string, str);
                    // reset the index
                    i = new_index(original_index);
                    l = string.length;

                    // unset flags
                    flags.is.wrap = null;
                    flags.string_start = null;
                    // must match the same type of quote
                    flags.is.pair = null;

                }
            }

            // comment detection
        } else if (((prev_char === "/" && char === "*") || (char === flags.is.pair && next_char === "/"))) {

            if (flags.is.wrap !== "string") {

                if (flags.string_start === null && flags.is.wrap === null) {

                    // set flags
                    flags.is.wrap = "comment";
                    flags.string_start = i;
                    // must match the same type of quote
                    flags.is.pair = char;

                } else if (flags.string_start !== null && flags.is.wrap === "comment") {

                    // store original index to see code clearer
                    var original_index = flags.string_start;

                    // get the comment since the open /*
                    var str = string.substring((original_index - 1), (i + (include_last_char * 2)));
                    // add the comment to array
                    flags.parts.push([str, "comment"]);
                    // placehold string
                    string = placehold(original_index, string, str, true /* set is_comment flag */ );
                    // reset the index
                    // move back 1 extra position to compensate for the 2 characters --> /*
                    i = new_index(original_index) - 1;
                    l = string.length;

                    // unset flags
                    flags.is.wrap = null;
                    flags.string_start = null;
                    // must match the same type of quote
                    flags.is.pair = null;

                }
            }
        }

        // id the end is reached and the flags.string_start is on...there was an unmatched
        // quote or comment. to prevent an infinite loop the index is reset to the next character
        // after the unmatched quote/comment chars so the parsing can continue as normal
        if ((i === (l - 1)) && flags.string_start) {

            // reset the index to skip unmatched ending character.
            // the index will increase naturally when the new
            // iteration begins. this will continue the loop where
            // the unmatched quote was plus 1 position ahead, or the
            // next charcters after the unmatched quote :)
            i = flags.string_start;
            // unset flags
            flags.is.wrap = null;
            flags.string_start = null;
            // must match the same type of quote
            flags.is.pair = null;

        }

    }

    ///////////////////////////
    ///////////////////////////

    // distinguish between selectors and code blocks
    for (var i = 0, l = string.length; i < l; i++) {

        if (i === -1) break; // used to stop infinite loop while debugging

        // cache the current character in loop
        var char = string.charAt(i),
            cb = null;

        // look out for these characters: @, {, }, /*, */
        if (-~["`", " ", "\"", "'"].indexOf(char)) {
            // reset the loop index to the character after the ending tick
            // and skip to the next loop iteration
            if (char === "`") i = string.indexOf("`", i + 1);
            // all other characters will just skip but not reset index
            continue;

            // check for atsigns
        } else if (char === "@") { // character: @

            // check to see that it is not a one-liner (i.e. @charset, @import, @namespace)
            // get the index of the immediate space after the last letter
            var space_index = string.indexOf(" ", (i + 1)),
                atrule_name = string.substring((i + 1), space_index);

            // check if artule is a simple one-liner
            if (-~["charset", "import", "namespace"].indexOf(atrule_name)) {

                // get the index of the next semicolon; meaning the end of the atrule
                // forward loop all the way to the position of the ending of atrule
                i = string.indexOf(";", (i + 1));

            } else { // all other CSS atrules

                // // ?????????
                // only run when there is no active atsign flag
                // if (flags.atsign) continue;
                // // ?????????

                // get the index of the opening brace + set the brace_open flag
                flags.open.brace = string.indexOf("{", (i + 1));

                // there is no open brace...prevent an infinite loop and continue;
                if (flags.open.brace === -1) continue;

                // set the atsign flag
                flags.atsign = i;
                // set the brace counter
                flags.brace.counter = 1;
                // forward loop all the way to the position of the start brace
                i = flags.open.brace;

                // grab selector (text between atsign and open brace indices)
                var selector = string.substring(flags.atsign, flags.open.brace).trim();
                // keep track of the brace indices
                var brace_indices_track = [i];
                // the amount of nested (complex "@") levels
                var nested_levels = 0;

                // start parsing CSS code block...start by getting the next brace index
                while (flags.brace.counter) {

                    // get the indices for the next open and closed brace
                    var start_brace_index = string.indexOf("{", i + 1),
                        end_brace_index = string.indexOf("}", i + 1);

                    // place both indices into an array and then filter array to only
                    // have numbers, -1 will be replaced with null, which will then
                    // get pruned out with the filter function
                    // filter(Number): http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript/2843625#2843625
                    var brace_indices = [(!-~start_brace_index ? null : start_brace_index), (!-~end_brace_index ? null : end_brace_index)].filter(Number);

                    // get the lowest index number. this index will be the
                    // closest to the first open brace. if there is no brace at all,
                    // null is returned in place of -1.
                    var next_index = (brace_indices.length) ? Math.min.apply(null, brace_indices) : null;
                    // get the last brace index from stored brace indices
                    var last_index = brace_indices_track[brace_indices_track.length - 1];

                    // increment index by 1 as we do not want to get the opening brace
                    // only want what is bwteen the beaces
                    var between_text_index = last_index + 1;

                    // the text between the last and next brace points. depending on the braces
                    // this could be a selector (simple "s" or complex "@":"x") or a CSS code block
                    var text_between = string.substring(between_text_index, next_index);

                    // get the brace character using the last and next index points
                    var first_brace = string.charAt(last_index);
                    var last_brace = string.charAt(next_index);

                    // check if simple or complex, used later on
                    // var type = (text_between.charAt(0) === "@") ? "x" : "s";

                    // the types of possible brace match ups
                    // { { --> Start of block (simple or complex)
                    // { } --> CSS code block
                    // } { --> End of code block, start of new code block
                    // } } --> End of complex block

                    // differentiate between brace match ups
                    // if (first_brace === "{" && last_brace === "{") { // child selector
                    // leave alone dont do anything
                    // } else if (first_brace === "{" && last_brace === "}") { // code block
                    if (first_brace === "{" && last_brace === "}") { // code block

                        // set the codeblock flag to true
                        cb = true;
                        // add to array
                        flags.parts.push([text_between, "block"]);
                        // placehold block
                        string = placehold(between_text_index, string, text_between);
                        // reset length and index
                        i = new_index(between_text_index);
                        l = string.length;

                        // placehold block
                        // string = placehold(between_text_index, string, text_between);

                    }
                    // else if (first_brace === "}" && last_brace === "{") { // end of code block, start of new code block
                    // leave alone dont do anything
                    // } else if (first_brace === "}" && last_brace === "}") { // end of complex code block
                    // leave alone dont do anything
                    // }

                    // add the next brace point to track track it
                    brace_indices_track.push(next_index);

                    // if the index matches the start brace "{", increase the brace counter
                    if (start_brace_index === next_index) flags.brace.counter++;
                    // else if the brace is a closing brace "}", decrease the brace counter
                    else if (end_brace_index === next_index) flags.brace.counter--;

                    // forward loop index to the next brace position
                    if (!cb) {
                        i = next_index;
                    } else {
                        cb = null; // turn flag off
                    }

                    // if no more braces are found end the while loop by unsetting the
                    // flags.brace.counter flag
                    if (flags.brace.counter === 0) flags.brace.counter = null; // unset flag

                }

                // unset the flag atsign
                flags.atsign = null;

            }

            // check for braces, this is for simple code blocks
        } else if (char === "{") { // character: {

            // get the indices for the previous closed brace & semicolon
            var end_brace_index = string.lastIndexOf("}", i);
            // semicolon_index = string.lastIndexOf(";", i);

            // place both indices into an array
            // filter(Number): http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript/2843625#2843625
            // var prev_indices = [(!-~end_brace_index ? null : end_brace_index), (!-~semicolon_index ? null : semicolon_index)].filter(Number);

            // get the lowest indice in number. this index will be the
            // closest to the first open brace. if there is no brace at all,
            // null is returned in place of -1.
            // var prev_index = (prev_indices.length) ? Math.max.apply(null, prev_indices) : null;
            var prev_index = end_brace_index;

            // finally, get selector from CSS string
            var selector = string.substring(((prev_index) ? (prev_index + 1) : 0), i);

            // increment index by 1 as we do not want to get the opening brace
            // only want what is bwteen the beaces
            var between_text_index = i + 1;

            // get the CSS code block by using the current index + 1 as the start
            // and the closing brace index as the end point
            var text_between = string.substring(between_text_index, string.indexOf("}", (i + 1)));

            // add to array
            flags.parts.push([text_between, "block"]);
            // placehold block
            string = placehold(between_text_index, string, text_between);
            // reset length and index
            i = new_index(between_text_index);
            l = string.length;

        }

    }

    // parse string only highliting the selectors
    string = parser(string, "selector");

    // remove place holders with HTML
    return string.replace(/`\d+`/g, function() {
        // get the info array for each replacement. the item contains the
        // replaced text and its corresponding index to the flags.parts array
        var info = flags.parts[(arguments[0].replace(/`/g, "") * 1)];
        var string;

        // seperate code block into individual declaration prop: value;
        // once their own item parse each and join after
        if (info[1] === "block") {

            // get the code block
            var block = info[0];
            // count the number of semicolons
            var semicolon_count = block.split(";").length - 1;
            // split into declarations
            var declarations = block.split(";");
            // code block parts will be held in an array
            var build = [];

            // loop over declarations
            for (var i = 0, l = declarations.length; i < l; i++) {

                // cache each declaration
                var declaration = declarations[i];
                // split into property and value
                var colon_index = declaration.indexOf(":");
                var prop = declaration.substring(0, colon_index + 1);
                var value = declaration.substring(colon_index + 1, declaration.length);
                // add terminator to all except the last one
                if (i !== (l - 1)) value += ";";
                // parse the property and value, join, then push it to build array
                build.push(parser((" " + prop + " "), "property") + parser((" " + value + " "), "x-property-value"));

            }

            // remove place holders with HTML
            string = build.join("").replace(/`\d+`/g, function() {
                // get the info array for each replacement. the item contains the
                // replaced text and its corresponding index to the flags.parts array
                var block_info = flags.parts[(arguments[0].replace(/`/g, "") * 1)];
                // add the syntax highlighting calss and the corresponsing replacement text
                return "<span class=\"lang-css-" + block_info[1] + "\">" + block_info[0] + "</span>";
            });

        } else {

            // add the syntax highlighting calss and the corresponsing replacement text
            string = "<span class=\"lang-css-" + info[1] + "\">" + info[0] + "</span>";
        }

        // return highlighted string
        return string;

    });

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
