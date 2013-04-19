if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-i18n-utils/gallery-i18n-utils.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-i18n-utils/gallery-i18n-utils.js",
    code: []
};
_yuitest_coverage["build/gallery-i18n-utils/gallery-i18n-utils.js"].code=["YUI.add('gallery-i18n-utils', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","var Format;","","//","// Format class","//","Y.namespace(\"Intl.Utils\");","","/**"," * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which"," * returns the formatted string."," * For internal use only."," * @class BaseFormat"," * @namespace Intl"," * @constructor"," * @private"," * @param {String} pattern"," * @param {Object} formats"," */","Y.Intl.Utils.BaseFormat = function(pattern, formats) {","    if ( !pattern && !formats ) {","        return;","    }","","    Y.mix(this, {","        /**","         * Pattern to format/parse","         * @property _pattern","         * @type String","         */","        _pattern: pattern,","        /**","         * Segments in the pattern","         * @property _segments","         * @type Intl.Utils.BaseFormat.Segment","         */","        _segments: [],","        Formats: formats","    });","};","","Format = Y.Intl.Utils.BaseFormat;","","Y.mix(Format.prototype, {","    /**","     * Format object","     * @method format","     * @param object The object to be formatted","     * @return {String} Formatted result","     */","    format: function(object) {","        var s = [], i = 0;","    ","        for (; i < this._segments.length; i++) {","            s.push(this._segments[i].format(object));","        }","        return s.join(\"\");","    },","","    ","    /**","     * Parses the given string according to this format's pattern and returns","     * an object.","     * Note:","     * The default implementation of this method assumes that the sub-class","     * has implemented the _createParseObject method.","     * @method parse","     * @for Intl.Utils.BaseFormat","     * @param {String} s The string to be parsed","     * @param {Number} [pp=0] Parse position. String will only be read from here","     */","    parse: function(s, pp) {","        var object = this._createParseObject(),","            index = pp || 0,","            i = 0;","        for (; i < this._segments.length; i++) {","            index = this._segments[i].parse(object, s, index);","        }","        ","        if (index < s.length) {","            Y.error(\"Parse Error: Input too long\");","        }","        return object;","    },","    ","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Note:","     * This must be implemented by sub-classes.","     * @method _createParseObject","     * @private","     * //return {Object}","     */","    _createParseObject: function(/*s*/) {","        Y.error(\"Not implemented\");","    }","});","","//","// Segment class","//","","/**"," * Segments in the pattern to be formatted"," * @class BaseFormat.Segment"," * @for BaseFormat"," * @namespace Intl"," * @private"," * @constructor"," * @param {Format} format The format object that created this segment"," * @param {String} s String representing this segment"," */","Format.Segment = function(format, s) {","    if( !format && !s ) { return; }","    this._parent = format;","    this._s = s;","};","","Y.mix(Format.Segment.prototype, {","    /**","     * Formats the object. Will be overridden in most subclasses.","     * @method format","     * //param o The object to format","     * @return {String} Formatted result","     */","    format: function(/*o*/) {","        return this._s;","    },","","    /**","     * Parses the string at the given index, initializes the parse object","     * (as appropriate), and returns the new index within the string for","     * the next parsing step.","     *","     * Note:","     * This method must be implemented by sub-classes.","     *","     * @method parse","     * //param o     {Object} The parse object to be initialized.","     * //param s     {String} The input string to be parsed.","     * //param index {Number} The index within the string to start parsing.","     * //return The parsed result.","     */","    parse: function(/*o, s, index*/) {","        Y.error(\"Not implemented\");","    },","","    /**","     * Return the parent Format object","     * @method getFormat","     * @return {Intl.Utils.BaseFormat}","     */","    getFormat: function() {","        return this._parent;","    }","});","","Y.mix(Format.Segment, {","    /**","     * Parse literal string that matches the pattern","     * @method _parseLiteral","     * @static","     * @private","     * @param {String} literal The pattern that literal should match","     * @param {String} s The literal to be parsed","     * @param {Number} index The position in s where literal is expected to start from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    _parseLiteral: function(literal, s, index) {","        if (s.length - index < literal.length) {","            Y.error(\"Parse Error: Input too short\");","        }","        for (var i = 0; i < literal.length; i++) {","            if (literal.charAt(i) !== s.charAt(index + i)) {","                Y.error(\"Parse Error: Input does not match\");","            }","        }","        return index + literal.length;","    },","    ","    /**","     * Parses an integer at the offset of the given string and calls a","     * method on the specified object.","     *","     * @method _parseInt","     * @private","     *","     * @param o           {Object}   The target object.","     * @param f           {function|String} The method to call on the target object.","     *                               If this parameter is a string, then it is used","     *                               as the name of the property to set on the","     *                               target object.","     * @param adjust      {Number}   The numeric adjustment to make on the","     *                               value before calling the object method.","     * @param s           {String}   The string to parse.","     * @param index       {Number}   The index within the string to start parsing.","     * @param fixedlen    {Number}   If specified, specifies the required number","     *                               of digits to be parsed.","     * @param [radix=10]  {Number}   Specifies the radix of the parse string.","     * @return {Number}   The position where the parsed number was found","     */","    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {","        var len = fixedlen || s.length - index,","            head = index,","            i = 0,","            tail, value, target;","        for (; i < len; i++) {","            if (!s.charAt(index++).match(/\\d/)) {","                index--;","                break;","            }","        }","        tail = index;","        if (head === tail) {","            Y.error(\"Error parsing number. Number not present\");","        }","        if (fixedlen && tail - head !== fixedlen) {","            Y.error(\"Error parsing number. Number too short\");","        }","        value = parseInt(s.substring(head, tail), radix || 10);","        if (f) {","            target = o || Y.config.win;","            if (typeof f === \"function\") {","                f.call(target, value + adjust);","            }","            else {","                target[f] = value + adjust;","            }","        }","        return tail;","    }","});","","//","// Text segment class","//","","/**"," * Text segment in the pattern."," * @class BaseFormat.TextSegment"," * @for BaseFormat"," * @namespace Intl"," * @extends Segment"," * @constructor"," * @param {Format} format The parent Format object"," * @param {String} s The pattern representing this segment"," */","Format.TextSegment = function(format, s) {","    if (!format && !s) { return; }","    Format.TextSegment.superclass.constructor.call(this, format, s);","};","","Y.extend(Format.TextSegment, Format.Segment);","","Y.mix(Format.TextSegment.prototype, {","    /**","     * String representation of the class","     * @method toString","     * @private","     * @return {String}","     */","    toString: function() {","        return \"text: \\\"\"+this._s+'\"';","    },","","    /**","     * Parse an object according to the pattern","     * @method parse","     * @param o The parse object. Not used here. This is only used in more complex segment types","     * @param s {String} The string being parsed","     * @param index {Number} The index in s to start parsing from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    parse: function(o, s, index) {","        return Format.Segment._parseLiteral(this._s, s, index);","    }","}, true);","","//Utils","/**"," * Pad string to specified length"," * @method zeroPad"," * @for Intl"," * @static"," * @private"," * @param {String|Number} s The string or number to be padded"," * @param {Number} length The maximum length s should be padded to have"," * @param {String} [zeroChar='0'] The character to be used to pad the string."," * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string"," * @return {String} The padded string"," */","Y.Intl.Utils.zeroPad  = function(s, length, zeroChar, rightSide) {","    s = typeof s === \"string\" ? s : String(s);","","    if (s.length >= length) { return s; }","","    zeroChar = zeroChar || '0';","	","    var a = [], i;","    for (i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","};","","","}, '@VERSION@', {\"requires\": [\"intl\"]});"];
_yuitest_coverage["build/gallery-i18n-utils/gallery-i18n-utils.js"].lines = {"1":0,"7":0,"12":0,"25":0,"26":0,"27":0,"30":0,"47":0,"49":0,"57":0,"59":0,"60":0,"62":0,"78":0,"81":0,"82":0,"85":0,"86":0,"88":0,"100":0,"118":0,"119":0,"120":0,"121":0,"124":0,"132":0,"150":0,"159":0,"163":0,"175":0,"176":0,"178":0,"179":0,"180":0,"183":0,"208":0,"212":0,"213":0,"214":0,"215":0,"218":0,"219":0,"220":0,"222":0,"223":0,"225":0,"226":0,"227":0,"228":0,"229":0,"232":0,"235":0,"253":0,"254":0,"255":0,"258":0,"260":0,"268":0,"280":0,"297":0,"298":0,"300":0,"302":0,"304":0,"305":0,"306":0,"308":0,"310":0};
_yuitest_coverage["build/gallery-i18n-utils/gallery-i18n-utils.js"].functions = {"BaseFormat:25":0,"format:56":0,"parse:77":0,"_createParseObject:99":0,"Segment:118":0,"format:131":0,"parse:149":0,"getFormat:158":0,"_parseLiteral:174":0,"_parseInt:207":0,"TextSegment:253":0,"toString:267":0,"parse:279":0,"zeroPad:297":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-i18n-utils/gallery-i18n-utils.js"].coveredLines = 68;
_yuitest_coverage["build/gallery-i18n-utils/gallery-i18n-utils.js"].coveredFunctions = 15;
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 1);
YUI.add('gallery-i18n-utils', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

_yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 7);
var Format;

//
// Format class
//
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 12);
Y.namespace("Intl.Utils");

/**
 * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which
 * returns the formatted string.
 * For internal use only.
 * @class BaseFormat
 * @namespace Intl
 * @constructor
 * @private
 * @param {String} pattern
 * @param {Object} formats
 */
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 25);
Y.Intl.Utils.BaseFormat = function(pattern, formats) {
    _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "BaseFormat", 25);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 26);
if ( !pattern && !formats ) {
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 27);
return;
    }

    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 30);
Y.mix(this, {
        /**
         * Pattern to format/parse
         * @property _pattern
         * @type String
         */
        _pattern: pattern,
        /**
         * Segments in the pattern
         * @property _segments
         * @type Intl.Utils.BaseFormat.Segment
         */
        _segments: [],
        Formats: formats
    });
};

_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 47);
Format = Y.Intl.Utils.BaseFormat;

_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 49);
Y.mix(Format.prototype, {
    /**
     * Format object
     * @method format
     * @param object The object to be formatted
     * @return {String} Formatted result
     */
    format: function(object) {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "format", 56);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 57);
var s = [], i = 0;
    
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 59);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 60);
s.push(this._segments[i].format(object));
        }
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 62);
return s.join("");
    },

    
    /**
     * Parses the given string according to this format's pattern and returns
     * an object.
     * Note:
     * The default implementation of this method assumes that the sub-class
     * has implemented the _createParseObject method.
     * @method parse
     * @for Intl.Utils.BaseFormat
     * @param {String} s The string to be parsed
     * @param {Number} [pp=0] Parse position. String will only be read from here
     */
    parse: function(s, pp) {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "parse", 77);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 78);
var object = this._createParseObject(),
            index = pp || 0,
            i = 0;
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 81);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 82);
index = this._segments[i].parse(object, s, index);
        }
        
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 85);
if (index < s.length) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 86);
Y.error("Parse Error: Input too long");
        }
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 88);
return object;
    },
    
    /**
     * Creates the object that is initialized by parsing. For internal use only.
     * Note:
     * This must be implemented by sub-classes.
     * @method _createParseObject
     * @private
     * //return {Object}
     */
    _createParseObject: function(/*s*/) {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "_createParseObject", 99);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 100);
Y.error("Not implemented");
    }
});

//
// Segment class
//

/**
 * Segments in the pattern to be formatted
 * @class BaseFormat.Segment
 * @for BaseFormat
 * @namespace Intl
 * @private
 * @constructor
 * @param {Format} format The format object that created this segment
 * @param {String} s String representing this segment
 */
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 118);
Format.Segment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "Segment", 118);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 119);
if( !format && !s ) { return; }
    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 120);
this._parent = format;
    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 121);
this._s = s;
};

_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 124);
Y.mix(Format.Segment.prototype, {
    /**
     * Formats the object. Will be overridden in most subclasses.
     * @method format
     * //param o The object to format
     * @return {String} Formatted result
     */
    format: function(/*o*/) {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "format", 131);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 132);
return this._s;
    },

    /**
     * Parses the string at the given index, initializes the parse object
     * (as appropriate), and returns the new index within the string for
     * the next parsing step.
     *
     * Note:
     * This method must be implemented by sub-classes.
     *
     * @method parse
     * //param o     {Object} The parse object to be initialized.
     * //param s     {String} The input string to be parsed.
     * //param index {Number} The index within the string to start parsing.
     * //return The parsed result.
     */
    parse: function(/*o, s, index*/) {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "parse", 149);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 150);
Y.error("Not implemented");
    },

    /**
     * Return the parent Format object
     * @method getFormat
     * @return {Intl.Utils.BaseFormat}
     */
    getFormat: function() {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "getFormat", 158);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 159);
return this._parent;
    }
});

_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 163);
Y.mix(Format.Segment, {
    /**
     * Parse literal string that matches the pattern
     * @method _parseLiteral
     * @static
     * @private
     * @param {String} literal The pattern that literal should match
     * @param {String} s The literal to be parsed
     * @param {Number} index The position in s where literal is expected to start from
     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.
     */
    _parseLiteral: function(literal, s, index) {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "_parseLiteral", 174);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 175);
if (s.length - index < literal.length) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 176);
Y.error("Parse Error: Input too short");
        }
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 178);
for (var i = 0; i < literal.length; i++) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 179);
if (literal.charAt(i) !== s.charAt(index + i)) {
                _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 180);
Y.error("Parse Error: Input does not match");
            }
        }
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 183);
return index + literal.length;
    },
    
    /**
     * Parses an integer at the offset of the given string and calls a
     * method on the specified object.
     *
     * @method _parseInt
     * @private
     *
     * @param o           {Object}   The target object.
     * @param f           {function|String} The method to call on the target object.
     *                               If this parameter is a string, then it is used
     *                               as the name of the property to set on the
     *                               target object.
     * @param adjust      {Number}   The numeric adjustment to make on the
     *                               value before calling the object method.
     * @param s           {String}   The string to parse.
     * @param index       {Number}   The index within the string to start parsing.
     * @param fixedlen    {Number}   If specified, specifies the required number
     *                               of digits to be parsed.
     * @param [radix=10]  {Number}   Specifies the radix of the parse string.
     * @return {Number}   The position where the parsed number was found
     */
    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "_parseInt", 207);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 208);
var len = fixedlen || s.length - index,
            head = index,
            i = 0,
            tail, value, target;
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 212);
for (; i < len; i++) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 213);
if (!s.charAt(index++).match(/\d/)) {
                _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 214);
index--;
                _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 215);
break;
            }
        }
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 218);
tail = index;
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 219);
if (head === tail) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 220);
Y.error("Error parsing number. Number not present");
        }
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 222);
if (fixedlen && tail - head !== fixedlen) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 223);
Y.error("Error parsing number. Number too short");
        }
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 225);
value = parseInt(s.substring(head, tail), radix || 10);
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 226);
if (f) {
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 227);
target = o || Y.config.win;
            _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 228);
if (typeof f === "function") {
                _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 229);
f.call(target, value + adjust);
            }
            else {
                _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 232);
target[f] = value + adjust;
            }
        }
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 235);
return tail;
    }
});

//
// Text segment class
//

/**
 * Text segment in the pattern.
 * @class BaseFormat.TextSegment
 * @for BaseFormat
 * @namespace Intl
 * @extends Segment
 * @constructor
 * @param {Format} format The parent Format object
 * @param {String} s The pattern representing this segment
 */
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 253);
Format.TextSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "TextSegment", 253);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 254);
if (!format && !s) { return; }
    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 255);
Format.TextSegment.superclass.constructor.call(this, format, s);
};

_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 258);
Y.extend(Format.TextSegment, Format.Segment);

_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 260);
Y.mix(Format.TextSegment.prototype, {
    /**
     * String representation of the class
     * @method toString
     * @private
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "toString", 267);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 268);
return "text: \""+this._s+'"';
    },

    /**
     * Parse an object according to the pattern
     * @method parse
     * @param o The parse object. Not used here. This is only used in more complex segment types
     * @param s {String} The string being parsed
     * @param index {Number} The index in s to start parsing from
     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.
     */
    parse: function(o, s, index) {
        _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "parse", 279);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 280);
return Format.Segment._parseLiteral(this._s, s, index);
    }
}, true);

//Utils
/**
 * Pad string to specified length
 * @method zeroPad
 * @for Intl
 * @static
 * @private
 * @param {String|Number} s The string or number to be padded
 * @param {Number} length The maximum length s should be padded to have
 * @param {String} [zeroChar='0'] The character to be used to pad the string.
 * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string
 * @return {String} The padded string
 */
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 297);
Y.Intl.Utils.zeroPad  = function(s, length, zeroChar, rightSide) {
    _yuitest_coverfunc("build/gallery-i18n-utils/gallery-i18n-utils.js", "zeroPad", 297);
_yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 298);
s = typeof s === "string" ? s : String(s);

    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 300);
if (s.length >= length) { return s; }

    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 302);
zeroChar = zeroChar || '0';
	
    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 304);
var a = [], i;
    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 305);
for (i = s.length; i < length; i++) {
        _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 306);
a.push(zeroChar);
    }
    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 308);
a[rightSide ? "unshift" : "push"](s);

    _yuitest_coverline("build/gallery-i18n-utils/gallery-i18n-utils.js", 310);
return a.join("");
};


}, '@VERSION@', {"requires": ["intl"]});
