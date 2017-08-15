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