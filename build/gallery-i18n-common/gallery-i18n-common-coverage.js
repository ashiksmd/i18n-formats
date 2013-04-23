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
_yuitest_coverage["build/gallery-i18n-common/gallery-i18n-common.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-i18n-common/gallery-i18n-common.js",
    code: []
};
_yuitest_coverage["build/gallery-i18n-common/gallery-i18n-common.js"].code=["YUI.add('gallery-i18n-common', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","/**"," * This module defines common classes and utility methods to be used by i18n modules for date and number formatting."," * @module gallery-i18n-common"," */","","var Format;","","//","// Format class","//","Y.namespace(\"Intl.Common\");","","/**"," * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which"," * returns the formatted string."," * For internal use only."," * @class BaseFormat"," * @namespace Intl.Common"," * @constructor"," * @private"," * @param {String} pattern"," * @param {Object} formats"," */","Y.Intl.Common.BaseFormat = function(pattern, formats) {","    if ( !pattern && !formats ) {","        return;","    }","","    Y.mix(this, {","        /**","         * Pattern to format/parse","         * @property _pattern","         * @type String","         */","        _pattern: pattern,","        /**","         * Segments in the pattern","         * @property _segments","         * @type Intl.Common.BaseFormat.Segment","         */","        _segments: [],","        Formats: formats","    });","};","","Format = Y.Intl.Common.BaseFormat;","","Y.mix(Format.prototype, {","    /**","     * Format object","     * @method format","     * @param object The object to be formatted","     * @return {String} Formatted result","     */","    format: function(object) {","        var s = [], i = 0;","    ","        for (; i < this._segments.length; i++) {","            s.push(this._segments[i].format(object));","        }","        return s.join(\"\");","    },","","    ","    /**","     * Parses the given string according to this format's pattern and returns","     * an object.","     * Note:","     * The default implementation of this method assumes that the sub-class","     * has implemented the _createParseObject method.","     * @method parse","     * @for Intl.Common.BaseFormat","     * @param {String} s The string to be parsed","     * @param {Number} [pp=0] Parse position. String will only be read from here","     */","    parse: function(s, pp) {","        var object = this._createParseObject(),","            index = pp || 0,","            i = 0;","        for (; i < this._segments.length; i++) {","            index = this._segments[i].parse(object, s, index);","        }","        ","        if (index < s.length) {","            Y.error(\"Parse Error: Input too long\");","        }","        return object;","    }","});","","//","// Segment class","//","","/**"," * Segments in the pattern to be formatted"," * @class BaseFormat.Segment"," * @for BaseFormat"," * @namespace Intl.Common"," * @private"," * @constructor"," * @param {Format} format The format object that created this segment"," * @param {String} s String representing this segment"," */","Format.Segment = function(format, s) {","    if( !format && !s ) { return; }","    this._parent = format;","    this._s = s;","};","","Y.mix(Format.Segment.prototype, {","    /**","     * Formats the object. Will be overridden in most subclasses.","     * @method format","     * //param o The object to format","     * @return {String} Formatted result","     */","    format: function(/*o*/) {","        return this._s;","    },","","    /**","     * Return the parent Format object","     * @method getFormat","     * @return {Intl.Common.BaseFormat}","     */","    getFormat: function() {","        return this._parent;","    }","});","","Y.mix(Format.Segment, {","    /**","     * Parse literal string that matches the pattern","     * @method _parseLiteral","     * @static","     * @private","     * @param {String} literal The pattern that literal should match","     * @param {String} s The literal to be parsed","     * @param {Number} index The position in s where literal is expected to start from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    _parseLiteral: function(literal, s, index) {","        if (s.length - index < literal.length) {","            Y.error(\"Parse Error: Input too short\");","        }","        for (var i = 0; i < literal.length; i++) {","            if (literal.charAt(i) !== s.charAt(index + i)) {","                Y.error(\"Parse Error: Input does not match\");","            }","        }","        return index + literal.length;","    },","    ","    /**","     * Parses an integer at the offset of the given string and calls a","     * method on the specified object.","     *","     * @method _parseInt","     * @private","     *","     * @param o           {Object}   The target object.","     * @param f           {function|String} The method to call on the target object.","     *                               If this parameter is a string, then it is used","     *                               as the name of the property to set on the","     *                               target object.","     * @param adjust      {Number}   The numeric adjustment to make on the","     *                               value before calling the object method.","     * @param s           {String}   The string to parse.","     * @param index       {Number}   The index within the string to start parsing.","     * @param fixedlen    {Number}   If specified, specifies the required number","     *                               of digits to be parsed.","     * @param [radix=10]  {Number}   Specifies the radix of the parse string.","     * @return {Number}   The position where the parsed number was found","     */","    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {","        var len = fixedlen || s.length - index,","            head = index,","            i = 0,","            tail, value, target;","        for (; i < len; i++) {","            if (!s.charAt(index++).match(/\\d/)) {","                index--;","                break;","            }","        }","        tail = index;","        if (head === tail) {","            Y.error(\"Error parsing number. Number not present\");","        }","        if (fixedlen && tail - head !== fixedlen) {","            Y.error(\"Error parsing number. Number too short\");","        }","        value = parseInt(s.substring(head, tail), radix || 10);","        if (f) {","            target = o || Y.config.win;","            if (typeof f === \"function\") {","                f.call(target, value + adjust);","            }","            else {","                target[f] = value + adjust;","            }","        }","        return tail;","    }","});","","//","// Text segment class","//","","/**"," * Text segment in the pattern."," * @class BaseFormat.TextSegment"," * @for BaseFormat"," * @namespace Intl.Common"," * @extends Segment"," * @constructor"," * @param {Format} format The parent Format object"," * @param {String} s The pattern representing this segment"," */","Format.TextSegment = function(format, s) {","    if (!format && !s) { return; }","    Format.TextSegment.superclass.constructor.call(this, format, s);","};","","Y.extend(Format.TextSegment, Format.Segment);","","Y.mix(Format.TextSegment.prototype, {","    /**","     * Parse an object according to the pattern","     * @method parse","     * @param o The parse object. Not used here. This is only used in more complex segment types","     * @param s {String} The string being parsed","     * @param index {Number} The index in s to start parsing from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    parse: function(o, s, index) {","        return Format.Segment._parseLiteral(this._s, s, index);","    }","}, true);","","//Utils","/**"," * Pad string to specified length. For internal use."," * @method zeroPad"," * @for Intl.Common"," * @static"," * @param {String|Number} s The string or number to be padded"," * @param {Number} length The maximum length s should be padded to have"," * @param {String} [zeroChar='0'] The character to be used to pad the string."," * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string"," * @return {String} The padded string"," */","Y.Intl.Common.zeroPad  = function(s, length, zeroChar, rightSide) {","    s = typeof s === \"string\" ? s : String(s);","","    if (s.length >= length) { return s; }","","    zeroChar = zeroChar || '0';","	","    var a = [], i;","    for (i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","};","","","","}, '@VERSION@', {\"requires\": [\"intl\"]});"];
_yuitest_coverage["build/gallery-i18n-common/gallery-i18n-common.js"].lines = {"1":0,"12":0,"17":0,"30":0,"31":0,"32":0,"35":0,"52":0,"54":0,"62":0,"64":0,"65":0,"67":0,"83":0,"86":0,"87":0,"90":0,"91":0,"93":0,"111":0,"112":0,"113":0,"114":0,"117":0,"125":0,"134":0,"138":0,"150":0,"151":0,"153":0,"154":0,"155":0,"158":0,"183":0,"187":0,"188":0,"189":0,"190":0,"193":0,"194":0,"195":0,"197":0,"198":0,"200":0,"201":0,"202":0,"203":0,"204":0,"207":0,"210":0,"228":0,"229":0,"230":0,"233":0,"235":0,"245":0,"261":0,"262":0,"264":0,"266":0,"268":0,"269":0,"270":0,"272":0,"274":0};
_yuitest_coverage["build/gallery-i18n-common/gallery-i18n-common.js"].functions = {"BaseFormat:30":0,"format:61":0,"parse:82":0,"Segment:111":0,"format:124":0,"getFormat:133":0,"_parseLiteral:149":0,"_parseInt:182":0,"TextSegment:228":0,"parse:244":0,"zeroPad:261":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-i18n-common/gallery-i18n-common.js"].coveredLines = 65;
_yuitest_coverage["build/gallery-i18n-common/gallery-i18n-common.js"].coveredFunctions = 12;
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 1);
YUI.add('gallery-i18n-common', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

/**
 * This module defines common classes and utility methods to be used by i18n modules for date and number formatting.
 * @module gallery-i18n-common
 */

_yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 12);
var Format;

//
// Format class
//
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 17);
Y.namespace("Intl.Common");

/**
 * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which
 * returns the formatted string.
 * For internal use only.
 * @class BaseFormat
 * @namespace Intl.Common
 * @constructor
 * @private
 * @param {String} pattern
 * @param {Object} formats
 */
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 30);
Y.Intl.Common.BaseFormat = function(pattern, formats) {
    _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "BaseFormat", 30);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 31);
if ( !pattern && !formats ) {
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 32);
return;
    }

    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 35);
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
         * @type Intl.Common.BaseFormat.Segment
         */
        _segments: [],
        Formats: formats
    });
};

_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 52);
Format = Y.Intl.Common.BaseFormat;

_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 54);
Y.mix(Format.prototype, {
    /**
     * Format object
     * @method format
     * @param object The object to be formatted
     * @return {String} Formatted result
     */
    format: function(object) {
        _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "format", 61);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 62);
var s = [], i = 0;
    
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 64);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 65);
s.push(this._segments[i].format(object));
        }
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 67);
return s.join("");
    },

    
    /**
     * Parses the given string according to this format's pattern and returns
     * an object.
     * Note:
     * The default implementation of this method assumes that the sub-class
     * has implemented the _createParseObject method.
     * @method parse
     * @for Intl.Common.BaseFormat
     * @param {String} s The string to be parsed
     * @param {Number} [pp=0] Parse position. String will only be read from here
     */
    parse: function(s, pp) {
        _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "parse", 82);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 83);
var object = this._createParseObject(),
            index = pp || 0,
            i = 0;
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 86);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 87);
index = this._segments[i].parse(object, s, index);
        }
        
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 90);
if (index < s.length) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 91);
Y.error("Parse Error: Input too long");
        }
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 93);
return object;
    }
});

//
// Segment class
//

/**
 * Segments in the pattern to be formatted
 * @class BaseFormat.Segment
 * @for BaseFormat
 * @namespace Intl.Common
 * @private
 * @constructor
 * @param {Format} format The format object that created this segment
 * @param {String} s String representing this segment
 */
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 111);
Format.Segment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "Segment", 111);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 112);
if( !format && !s ) { return; }
    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 113);
this._parent = format;
    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 114);
this._s = s;
};

_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 117);
Y.mix(Format.Segment.prototype, {
    /**
     * Formats the object. Will be overridden in most subclasses.
     * @method format
     * //param o The object to format
     * @return {String} Formatted result
     */
    format: function(/*o*/) {
        _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "format", 124);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 125);
return this._s;
    },

    /**
     * Return the parent Format object
     * @method getFormat
     * @return {Intl.Common.BaseFormat}
     */
    getFormat: function() {
        _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "getFormat", 133);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 134);
return this._parent;
    }
});

_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 138);
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
        _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "_parseLiteral", 149);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 150);
if (s.length - index < literal.length) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 151);
Y.error("Parse Error: Input too short");
        }
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 153);
for (var i = 0; i < literal.length; i++) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 154);
if (literal.charAt(i) !== s.charAt(index + i)) {
                _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 155);
Y.error("Parse Error: Input does not match");
            }
        }
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 158);
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
        _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "_parseInt", 182);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 183);
var len = fixedlen || s.length - index,
            head = index,
            i = 0,
            tail, value, target;
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 187);
for (; i < len; i++) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 188);
if (!s.charAt(index++).match(/\d/)) {
                _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 189);
index--;
                _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 190);
break;
            }
        }
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 193);
tail = index;
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 194);
if (head === tail) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 195);
Y.error("Error parsing number. Number not present");
        }
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 197);
if (fixedlen && tail - head !== fixedlen) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 198);
Y.error("Error parsing number. Number too short");
        }
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 200);
value = parseInt(s.substring(head, tail), radix || 10);
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 201);
if (f) {
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 202);
target = o || Y.config.win;
            _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 203);
if (typeof f === "function") {
                _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 204);
f.call(target, value + adjust);
            }
            else {
                _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 207);
target[f] = value + adjust;
            }
        }
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 210);
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
 * @namespace Intl.Common
 * @extends Segment
 * @constructor
 * @param {Format} format The parent Format object
 * @param {String} s The pattern representing this segment
 */
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 228);
Format.TextSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "TextSegment", 228);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 229);
if (!format && !s) { return; }
    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 230);
Format.TextSegment.superclass.constructor.call(this, format, s);
};

_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 233);
Y.extend(Format.TextSegment, Format.Segment);

_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 235);
Y.mix(Format.TextSegment.prototype, {
    /**
     * Parse an object according to the pattern
     * @method parse
     * @param o The parse object. Not used here. This is only used in more complex segment types
     * @param s {String} The string being parsed
     * @param index {Number} The index in s to start parsing from
     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.
     */
    parse: function(o, s, index) {
        _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "parse", 244);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 245);
return Format.Segment._parseLiteral(this._s, s, index);
    }
}, true);

//Utils
/**
 * Pad string to specified length. For internal use.
 * @method zeroPad
 * @for Intl.Common
 * @static
 * @param {String|Number} s The string or number to be padded
 * @param {Number} length The maximum length s should be padded to have
 * @param {String} [zeroChar='0'] The character to be used to pad the string.
 * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string
 * @return {String} The padded string
 */
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 261);
Y.Intl.Common.zeroPad  = function(s, length, zeroChar, rightSide) {
    _yuitest_coverfunc("build/gallery-i18n-common/gallery-i18n-common.js", "zeroPad", 261);
_yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 262);
s = typeof s === "string" ? s : String(s);

    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 264);
if (s.length >= length) { return s; }

    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 266);
zeroChar = zeroChar || '0';
	
    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 268);
var a = [], i;
    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 269);
for (i = s.length; i < length; i++) {
        _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 270);
a.push(zeroChar);
    }
    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 272);
a[rightSide ? "unshift" : "push"](s);

    _yuitest_coverline("build/gallery-i18n-common/gallery-i18n-common.js", 274);
return a.join("");
};



}, '@VERSION@', {"requires": ["intl"]});
