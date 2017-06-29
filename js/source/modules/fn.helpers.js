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
