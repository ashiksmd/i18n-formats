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
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-advanced-number-format/gallery-advanced-number-format.js",
    code: []
};
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].code=["YUI.add('gallery-advanced-number-format', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","var MODULE_NAME = \"gallery-advanced-number-format\",","    Format, NumberFormat, YNumberFormat;","","Y.Number.__advancedFormat = true;","","/**"," * Pad string to specified length"," * @method _zeroPad"," * @for Number"," * @static"," * @private"," * @param {String|Number} s The string or number to be padded"," * @param {Number} length The maximum length s should be padded to have"," * @param {String} [zeroChar='0'] The character to be used to pad the string."," * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string"," * @return {String} The padded string"," */","Y.Number._zeroPad  = function(s, length, zeroChar, rightSide) {","    s = typeof s === \"string\" ? s : String(s);","","    if (s.length >= length) { return s; }","","    zeroChar = zeroChar || '0';","	","    var a = [], i;","    for (i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","};","","//","// Format class","//","","/**"," * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which"," * returns the formatted string."," * For internal use only."," * @class __BaseFormat"," * @namespace Number"," * @constructor"," * @private"," * @param {String} pattern"," * @param {Object} formats"," */","Y.Number.__BaseFormat = function(pattern, formats) {","    if ( !pattern && !formats ) {","        return;","    }","","    Y.mix(this, {","        /**","         * Pattern to format/parse","         * @property _pattern","         * @type String","         */","        _pattern: pattern,","        /**","         * Segments in the pattern","         * @property _segments","         * @type Number.__BaseFormat.Segment","         */","        _segments: [],","        Formats: formats","    });","};","","Format = Y.Number.__BaseFormat;","","Y.mix(Format.prototype, {","    /**","     * Format object","     * @method format","     * @param object The object to be formatted","     * @return {String} Formatted result","     */","    format: function(object) {","        var s = [], i = 0;","    ","        for (; i < this._segments.length; i++) {","            s.push(this._segments[i].format(object));","        }","        return s.join(\"\");","    },","","    ","    /**","     * Parses the given string according to this format's pattern and returns","     * an object.","     * Note:","     * The default implementation of this method assumes that the sub-class","     * has implemented the _createParseObject method.","     * @method parse","     * @for Number.__BaseFormat","     * @param {String} s The string to be parsed","     * @param {Number} [pp=0] Parse position. String will only be read from here","     */","    parse: function(s, pp) {","        var object = this._createParseObject(),","            index = pp || 0,","            i = 0;","        for (; i < this._segments.length; i++) {","            index = this._segments[i].parse(object, s, index);","        }","        ","        if (index < s.length) {","            Y.error(\"Parse Error: Input too long\");","        }","        return object;","    },","    ","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Note:","     * This must be implemented by sub-classes.","     * @method _createParseObject","     * @private","     * //return {Object}","     */","    _createParseObject: function(/*s*/) {","        Y.error(\"Not implemented\");","    }","});","","//","// Segment class","//","","/**"," * Segments in the pattern to be formatted"," * @class __BaseFormat.Segment"," * @for __BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param {Format} format The format object that created this segment"," * @param {String} s String representing this segment"," */","Format.Segment = function(format, s) {","    if( !format && !s ) { return; }","    this._parent = format;","    this._s = s;","};","","Y.mix(Format.Segment.prototype, {","    /**","     * Formats the object. Will be overridden in most subclasses.","     * @method format","     * //param o The object to format","     * @return {String} Formatted result","     */","    format: function(/*o*/) {","        return this._s;","    },","","    /**","     * Parses the string at the given index, initializes the parse object","     * (as appropriate), and returns the new index within the string for","     * the next parsing step.","     *","     * Note:","     * This method must be implemented by sub-classes.","     *","     * @method parse","     * //param o     {Object} The parse object to be initialized.","     * //param s     {String} The input string to be parsed.","     * //param index {Number} The index within the string to start parsing.","     * //return The parsed result.","     */","    parse: function(/*o, s, index*/) {","        Y.error(\"Not implemented\");","    },","","    /**","     * Return the parent Format object","     * @method getFormat","     * @return {Number.__BaseFormat}","     */","    getFormat: function() {","        return this._parent;","    }","});","","Y.mix(Format.Segment, {","    /**","     * Parse literal string that matches the pattern","     * @method _parseLiteral","     * @static","     * @private","     * @param {String} literal The pattern that literal should match","     * @param {String} s The literal to be parsed","     * @param {Number} index The position in s where literal is expected to start from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    _parseLiteral: function(literal, s, index) {","        if (s.length - index < literal.length) {","            Y.error(\"Parse Error: Input too short\");","        }","        for (var i = 0; i < literal.length; i++) {","            if (literal.charAt(i) !== s.charAt(index + i)) {","                Y.error(\"Parse Error: Input does not match\");","            }","        }","        return index + literal.length;","    },","    ","    /**","     * Parses an integer at the offset of the given string and calls a","     * method on the specified object.","     *","     * @method _parseInt","     * @private","     *","     * @param o           {Object}   The target object.","     * @param f           {function|String} The method to call on the target object.","     *                               If this parameter is a string, then it is used","     *                               as the name of the property to set on the","     *                               target object.","     * @param adjust      {Number}   The numeric adjustment to make on the","     *                               value before calling the object method.","     * @param s           {String}   The string to parse.","     * @param index       {Number}   The index within the string to start parsing.","     * @param fixedlen    {Number}   If specified, specifies the required number","     *                               of digits to be parsed.","     * @param [radix=10]  {Number}   Specifies the radix of the parse string.","     * @return {Number}   The position where the parsed number was found","     */","    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {","        var len = fixedlen || s.length - index,","            head = index,","            i = 0,","            tail, value, target;","        for (; i < len; i++) {","            if (!s.charAt(index++).match(/\\d/)) {","                index--;","                break;","            }","        }","        tail = index;","        if (head === tail) {","            Y.error(\"Error parsing number. Number not present\");","        }","        if (fixedlen && tail - head !== fixedlen) {","            Y.error(\"Error parsing number. Number too short\");","        }","        value = parseInt(s.substring(head, tail), radix || 10);","        if (f) {","            target = o || Y.config.win;","            if (typeof f === \"function\") {","                f.call(target, value + adjust);","            }","            else {","                target[f] = value + adjust;","            }","        }","        return tail;","    }","});","","//","// Text segment class","//","","/**"," * Text segment in the pattern."," * @class __BaseFormat.TextSegment"," * @for __BaseFormat"," * @namespace Number"," * @extends Segment"," * @constructor"," * @param {Format} format The parent Format object"," * @param {String} s The pattern representing this segment"," */","Format.TextSegment = function(format, s) {","    if (!format && !s) { return; }","    Format.TextSegment.superclass.constructor.call(this, format, s);","};","","Y.extend(Format.TextSegment, Format.Segment);","","Y.mix(Format.TextSegment.prototype, {","    /**","     * String representation of the class","     * @method toString","     * @private","     * @return {String}","     */","    toString: function() {","        return \"text: \\\"\"+this._s+'\"';","    },","","    /**","     * Parse an object according to the pattern","     * @method parse","     * @param o The parse object. Not used here. This is only used in more complex segment types","     * @param s {String} The string being parsed","     * @param index {Number} The index in s to start parsing from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    parse: function(o, s, index) {","        return Format.Segment._parseLiteral(this._s, s, index);","    }","}, true);","/**"," * NumberFormat helps you to format and parse numbers for any locale."," * Your code can be completely independent of the locale conventions for decimal points, thousands-separators,"," * or even the particular decimal digits used, or whether the number format is even decimal."," *"," * This module uses parts of zimbra NumberFormat"," *"," * @module datatype-number-advanced-format"," * @requires datatype-number-format, datatype-number-parse"," */","","/**"," * Class to handle Number formatting."," * @class __zNumberFormat"," * @extends __BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param pattern {String}       The number pattern."," * @param formats {Object}       locale data"," * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only"," */","Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {","    var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,","        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;","    if (arguments.length === 0) { return; }","","    NumberFormat.superclass.constructor.call(this, pattern, formats);","    if (!pattern) { return; }","","    if(pattern === \"{plural_style}\") {","        pattern = this.Formats.decimalFormat;","        this._isPluralCurrency = true;","        this._pattern = pattern;","    }","","    //Default currency","    this.currency = this.Formats.defaultCurrency;","    if(this.currency === undefined || !this.currency) {","        this.currency = \"USD\";","    }","        ","    patterns = pattern.split(/;/);","    pattern = patterns[0];","	","    this._useGrouping = (pattern.indexOf(\",\") !== -1);      //Will be set to true if pattern uses grouping","    this._parseIntegerOnly = (pattern.indexOf(\".\") === -1);  //Will be set to false if pattern contains fractional parts","        ","    //If grouping is used, find primary and secondary grouping","    if(this._useGrouping) {","        numberPattern = pattern.match(/[0#,]+/);","        groupingRegex = new RegExp(\"[0#]+\", \"g\");","        groups = numberPattern[0].match(groupingRegex);","            ","        i = groups.length - 2;","        this._primaryGrouping = groups[i+1].length;","        this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);","    }","        ","    // parse prefix","    i = 0;","        ","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    hasPrefix = results.text !== \"\";","    if (hasPrefix) {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // parse number descriptor","    start = i;","    while (i < pattern.length &&","        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {","        i++;","    }","    end = i;","","    numPattern = pattern.substring(start, end);","    e = numPattern.indexOf(this.Formats.exponentialSymbol);","    expon = e !== -1 ? numPattern.substring(e + 1) : null;","    if (expon) {","        numPattern = numPattern.substring(0, e);","        this._showExponent = true;","    }","	","    dot = numPattern.indexOf('.');","    whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;","    if (whole) {","        /*var comma = whole.lastIndexOf(',');","            if (comma != -1) {","                this._groupingOffset = whole.length - comma - 1;","            }*/","        whole = whole.replace(/[^#0]/g,\"\");","        zero = whole.indexOf('0');","        if (zero !== -1) {","            this._minIntDigits = whole.length - zero;","        }","        this._maxIntDigits = whole.length;","    }","	","    fract = dot !== -1 ? numPattern.substring(dot + 1) : null;","    if (fract) {","        zero = fract.lastIndexOf('0');","        if (zero !== -1) {","            this._minFracDigits = zero + 1;","        }","        this._maxFracDigits = fract.replace(/[^#0]/g,\"\").length;","    }","	","    this._segments.push(new NumberFormat.NumberSegment(this, numPattern));","	","    // parse suffix","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    if (results.text !== \"\") {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // add negative formatter","    if (skipNegFormat) { return; }","	","    if (patterns.length > 1) {","        pattern = patterns[1];","        this._negativeFormatter = new NumberFormat(pattern, formats, true);","    }","    else {","        // no negative pattern; insert minus sign before number segment","        formatter = new NumberFormat(\"\", formats);","        formatter._segments = formatter._segments.concat(this._segments);","","        index = hasPrefix ? 1 : 0;","        minus = new Format.TextSegment(formatter, this.Formats.minusSign);","        formatter._segments.splice(index, 0, minus);","		","        this._negativeFormatter = formatter;","    }","};","","NumberFormat = Y.Number.__zNumberFormat;","Y.extend(NumberFormat, Y.Number.__BaseFormat);","    ","// Constants","","Y.mix(NumberFormat, {","    _NUMBER: \"number\",","    _INTEGER: \"integer\",","    _CURRENCY: \"currency\",","    _PERCENT: \"percent\",","","    _META_CHARS: \"0#.,E\"","});","","Y.mix( NumberFormat.prototype, {","    _groupingOffset: Number.MAX_VALUE,","    _minIntDigits: 1,","    _isCurrency: false,","    _isPercent: false,","    _isPerMille: false,","    _showExponent: false,","","    /**","     * Format a number","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        if (number < 0 && this._negativeFormatter) {","            return this._negativeFormatter.format(number);","        }","        ","        var result = Format.prototype.format.call(this, number), pattern = \"\";","        ","        if(this._isPluralCurrency) {","            if(number === 1) {","                //Singular","                pattern = this.Formats.currencyPatternSingular;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencySingular\"]);","            } else {","                //Plural","                pattern = this.Formats.currencyPatternPlural;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencyPlural\"]);","            }","            ","            result = pattern.replace(\"{0}\", result);","        }","        ","        return result;","    },","","    /**","     * Parse string and return number","     * @method parse","     * @param s {String} The string to parse","     * @param pp {Number} Parse position. Will start parsing from this index in string s.","     * @return {Number} Parse result","     */","    parse: function(s, pp) {","        var singular, plural, object;","        if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {","            return this._negativeFormatter.parse(s, pp);","        }","        ","        if(this._isPluralCurrency) {","            singular = this.Formats[this.currency + \"_currencySingular\"],","                plural = this.Formats[this.currency + \"_currencyPlural\"];","            ","            s = Y.Lang.trim(s.replace(plural, \"\").replace(singular, \"\"));","        }","        ","        object = null;","        try {","            object = Format.prototype.parse.call(this, s, pp);","            object = object.value;","        } catch(e) {","            Y.error(\"Failed to parse: \" + s, e);","        }","        ","        return object;","    },","","    /**","     * Parse static. Internal use only.","     * @method __parseStatic","     * @private","     * @param {String} s Pattern","     * @param {Number} i Index","     * @return {Object}","     */","    __parseStatic: function(s, i) {","        var data = [], c, start, end;","        while (i < s.length) {","            c = s.charAt(i++);","            if (NumberFormat._META_CHARS.indexOf(c) !== -1) {","                i--;","                break;","            }","            switch (c) {","                case \"'\":","                    start = i;","                    while (i < s.length && s.charAt(i) !== \"'\") {","			i++;","                    }","                    end = i;","                    c = end - start === 0 ? \"'\" : s.substring(start, end);","                    break;","                case '%':","                    c = this.Formats.percentSign;","                    this._isPercent = true;","                    break;","                case '\\u2030':","                    c = this.Formats.perMilleSign;","                    this._isPerMille = true;","                    break;","                case '\\u00a4':","                    if(s.charAt(i) === '\\u00a4') {","                        c = this.Formats[this.currency + \"_currencyISO\"];","                        i++;","                    } else {","                        c = this.Formats[this.currency + \"_currencySymbol\"];","                    }","                    this._isCurrency = true;","                    break;","            }","            data.push(c);","        }","        return {","            text: data.join(\"\"),","            offset: i","        };","    },","","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Overrides method from __BaseFormat","     * @method _createParseObject","     * @private","     * @return {Object}","     */","    _createParseObject: function() {","        return {","            value: null","        };","    }","}, true);","    ","//","// NumberFormat.NumberSegment class","//","","/**"," * Number segment class."," * @class __zNumberFormat.NumberSegment"," * @for __zNumberFormat"," * @namespace Number"," * @extends Number.__BaseFormat.Segment"," *"," * @private"," * @constructor"," *"," * @param format {Number.__zNumberFormat} Parent Format object"," * @param s {String} Pattern representing this segment"," */","NumberFormat.NumberSegment = function(format, s) {","    if (format === null && s === null) { return; }","    NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);","};","Y.extend(NumberFormat.NumberSegment, Format.Segment);","","Y.mix(NumberFormat.NumberSegment.prototype, {","    /**","     * Format number segment","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        var expon, exponReg, s;","        // special values","        if (isNaN(number)) { return this._parent.Formats.nanSymbol; }","        if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {","            return this._parent.Formats.infinitySign;","        }","","        // adjust value","        if (typeof number !== \"number\") { number = Number(number); }","        number = Math.abs(number); // NOTE: minus sign is part of pattern","        if (this._parent._isPercent) { number *= 100; }","        else if (this._parent._isPerMille) { number *= 1000; }","        if(this._parent._parseIntegerOnly) { number = Math.floor(number); }","        ","        // format","        expon = this._parent.Formats.exponentialSymbol;","        exponReg = new RegExp(expon + \"+\");","        s = this._parent._showExponent","            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)","            : number.toFixed(this._parent._maxFracDigits || 0);","        s = this._normalize(s);","        return s;","    },","","    /**","     * Normalize pattern","     * @method _normalize","     * @protected","     * @param {String} s Pattern","     * @return {String} Normalized pattern","     */","    _normalize: function(s) {","        var exponSymbol = this._parent.Formats.exponentialSymbol,","            splitReg = new RegExp(\"[\\\\.\" + exponSymbol + \"]\"),","            match = s.split(splitReg),","            whole = match.shift(),  //Normalize the whole part","            a = [],","            offset = this._parent._primaryGrouping,","            fract = '0',","            decimal = this._parent.Formats.decimalSeparator,","            expon, i;","","	if (whole.length < this._parent._minIntDigits) {","            whole = Y.Number._zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);","        }","        if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {","            i = whole.length - offset;","            while (i > 0) {","                a.unshift(whole.substr(i, offset));","                a.unshift(this._parent.Formats.groupingSeparator);","                offset = this._parent._secondaryGrouping;","                i -= offset;","            }","            a.unshift(whole.substring(0, i + offset));","		","            whole = a.join(\"\");","        }","	","        if(s.match(/\\./)) {","            fract = match.shift();","        }","        else if(s.match(/\\e/) || s.match(/\\E/)) {","            expon = match.shift();","        }","","        fract = fract.replace(/0+$/,\"\");","        if (fract.length < this._parent._minFracDigits) {","            fract = Y.Number._zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);","        }","	","        a = [ whole ];","        if (fract.length > 0) {","            a.push(decimal, fract);","        }","        if (expon) {","            a.push(exponSymbol, expon.replace(/^\\+/,\"\"));","        }","	","        // return normalize result","        return a.join(\"\");","    },","","    /**","     * Parse Number Segment","     * @method parse","     * @param object {Object} Result will be stored in object.value","     * @param s {String} Pattern","     * @param index {Number}","     * @return {Number} Index in s where parse ended","     */","    parse: function(object, s, index) {","        var comma = this._parent.Formats.groupingSeparator,","            dot = this._parent.Formats.decimalSeparator,","            minusSign = this._parent.Formats.minusSign,","            expon = this._parent.Formats.exponentialSymbol,","            numberRegexPattern = \"[\\\\\" + minusSign + \"0-9\" + comma + \"]+\",","            numberRegex, matches, negativeNum, endIndex, scientific = null, i,","            //If more groups, use primary/secondary grouping as applicable","            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;","","        if(!this._parent._parseIntegerOnly) {","            numberRegexPattern += \"(\\\\\" + dot + \"[0-9]+)?\";","        }","        if(this._parent._showExponent) {","            numberRegexPattern += \"(\" + expon +\"\\\\+?[0-9]+)\";","        }","        ","        numberRegex = new RegExp(numberRegexPattern);","        matches = s.match(numberRegex);","        ","        if(!matches) {","            Y.error(\"Error parsing: Number does not match pattern\");","        }","        ","        negativeNum = s.indexOf(minusSign) !== -1;","        endIndex = index + matches[0].length;","        s = s.slice(index, endIndex);","        ","        //Scientific format does not use grouping","        if(this._parent.showExponent) {","            scientific = s.split(expon);","        } else if(this._parent._useGrouping) {","            //Verify grouping data exists","            if(!this._parent._primaryGrouping) {","                //Should not happen","                Y.error(\"Error parsing: Invalid pattern\");","            }","            ","            //Verify grouping is correct","            i = s.length - this._parent._primaryGrouping - 1;","            ","            if(matches[1]) {","                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part","                i = i - matches[1].length;","            }","            ","            //Use primary grouping for first group","            if(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","            }","            ","            i = i - grouping - 1;","            ","            while(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","                i = i - grouping - 1;","            }","            ","            //Verify there are no more grouping separators","            if(s.indexOf(comma) !== -1) {","                Y.error(\"Error parsing: Number does not match pattern\");","            }","        }","        ","        if(scientific) {","            object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));","        } else {","            object.value = parseFloat(s, 10);","        }","        ","        //Special types","        if(negativeNum) { object.value *= -1; }","        if (this._parent._isPercent) { object.value /= 100; }","        else if (this._parent._isPerMille) { object.value /= 1000; }","        ","        return endIndex;","    }","}, true);","","/**"," * Number Formatting"," * @class __YNumberFormat"," * @namespace Number"," * @private"," * @constructor"," * @param [style='NUMBER_STYLE'] {Number} the given style. Should be key/value from Y.Number.STYLES"," */","Y.Number.__YNumberFormat = function(style) {","    style = style || Y.Number.STYLES.NUMBER_STYLE;","    ","    if(Y.Lang.isString(style)) {","        style = Y.Number.STYLES[style];","    }","    ","    var pattern = \"\",","        formats = Y.Intl.get(MODULE_NAME);","    switch(style) {","        case Y.Number.STYLES.CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            break;","        case Y.Number.STYLES.ISO_CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            pattern = pattern.replace(\"\\u00a4\", \"\\u00a4\\u00a4\");","            break;","        case Y.Number.STYLES.NUMBER_STYLE:","            pattern = formats.decimalFormat;","            break;","        case Y.Number.STYLES.PERCENT_STYLE:","            pattern = formats.percentFormat;","            break;","        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:","            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting","            pattern = \"{plural_style}\";","            break;","        case Y.Number.STYLES.SCIENTIFIC_STYLE:","            pattern = formats.scientificFormat;","            break;","    }","        ","    this._numberFormatInstance = new NumberFormat(pattern, formats);","};","","YNumberFormat = Y.Number.__YNumberFormat;","","Y.mix(Y.Number, {","    /**","     * Style values to use during format/parse","     * @property STYLES","     * @type Object","     * @static","     * @final","     * @for Number","     */","    STYLES: {","        CURRENCY_STYLE: 1,","        ISO_CURRENCY_STYLE: 2,","        NUMBER_STYLE: 4,","        PERCENT_STYLE: 8,","        PLURAL_CURRENCY_STYLE: 16,","        SCIENTIFIC_STYLE: 32","    }","});","   ","Y.mix(YNumberFormat.prototype, {","    /**","     * Format a number","     * @method format","     * @param number {Number} the number to format","     * @for Number.YNumberFormat","     * @return {Number}","     */","    format: function(number) {","        return this._numberFormatInstance.format(number);","    },","    ","    /**","     * Return true if this format will parse numbers as integers only.","     * For example in the English locale, with ParseIntegerOnly true, the string \"1234.\" would be parsed as the integer value 1234","     * and parsing would stop at the \".\" character. Of course, the exact format accepted by the parse operation is locale dependant.","     * @method isParseIntegerOnly","     * @return {Boolean}","     */","    isParseIntegerOnly: function() {","        return this._numberFormatInstance._parseIntegerOnly;","    },","    ","    /**","     * Parse the string to get a number","     * @method parse","     * @param {String} txt The string to parse","     * @param {Number} [pp=0] Parse position. The position to start parsing at.","     */","    parse: function(txt, pp) {","        return this._numberFormatInstance.parse(txt, pp);","    },","    ","    /**","     * Sets whether or not numbers should be parsed as integers only.","     * @method setParseIntegerOnly","     * @param {Boolean} newValue set True, this format will parse numbers as integers only.","     */","    setParseIntegerOnly: function(newValue) {","        this._numberFormatInstance._parseIntegerOnly = newValue;","    }","});","Y.mix( Y.Number, {","     _oldFormat: Y.Number.format,","     _oldParse:  Y.Number.parse","});","","Y.mix( Y.Number, {","     /**","      * Takes a Number and formats to string for display to user","      *","      * @for Number","      * @method format","      * @param data {Number} Number","      * @param [config] {Object} Optional Configuration values.","      *   <dl>","      *      <dt>[style] {Number|String}</dt>","      *         <dd>Format/Style to use. See Y.Number.STYLES</dd>","      *      <dt>[parseIntegerOnly] {Boolean}</dt>","      *         <dd>If set to true, only the whole number part of data will be used</dd>","      *      <dt>[prefix] {String}</dd>","      *         <dd>String prepended before each number, like a currency designator \"$\"</dd>","      *      <dt>[decimalPlaces] {Number}</dd>","      *         <dd>Number of decimal places to round. Must be a number 0 to 20.</dd>","      *      <dt>[decimalSeparator] {String}</dd>","      *         <dd>Decimal separator</dd>","      *      <dt>[thousandsSeparator] {String}</dd>","      *         <dd>Thousands separator</dd>","      *      <dt>[suffix] {String}</dd>","      *         <dd>String appended after each number, like \" items\" (note the space)</dd>","      *   </dl>","      * @return {String} Formatted string representation of data","      */","     format: function(data, config) {","         config = config || {};","    ","         if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined","               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {","             return Y.Number._oldFormat(data, config);","         }","    ","         try {","             var formatter = new YNumberFormat(config.style);","             if(config.parseIntegerOnly) {","                 formatter.setParseIntegerOnly(true);","             }","             return formatter.format(data);","         } catch(e) {","             //Error. Fallback to original format","         }","         return Y.Number._oldFormat(data, config);","     },","","     /**","      * Parses data and returns a number","      *","      * @for Number","      * @method format","      * @param data {String} Data to be parsed","      * @param [config] (Object} Object containg 'style' (Pattern data is represented in.","               See Y.Number.STYLES) and 'parsePosition' (index position in data to start parsing at) Both parameters are optional.","               If omitted, style defaults to NUMBER_STYLE, and parsePosition defaults to 0","      * @return {Number} Number represented by data","      */","     parse: function(data, config) {","         try {","             var formatter = new YNumberFormat(config.style);","             return formatter.parse(data, config.parsePosition);","         } catch(e) {","             //Fallback on deprecated parse","         }","    ","         return Y.Number._oldParse(data);","     }","}, true);","","//Update Parsers shortcut","Y.namespace(\"Parsers\").number = Y.Number.parse;","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"af-NA\",","        \"af-ZA\",","        \"am-ET\",","        \"am\",","        \"ar-AE\",","        \"ar-BH\",","        \"ar-DZ\",","        \"ar-EG\",","        \"ar-IQ\",","        \"ar-JO\",","        \"ar\",","        \"ar-KW\",","        \"ar-LB\",","        \"ar-LY\",","        \"ar-MA\",","        \"ar-OM\",","        \"ar-QA\",","        \"ar-SA\",","        \"ar-SD\",","        \"ar-SY\",","        \"ar-TN\",","        \"ar-YE\",","        \"as-IN\",","        \"as\",","        \"az-AZ\",","        \"az-Cyrl-AZ\",","        \"az-Cyrl\",","        \"az\",","        \"az-Latn-AZ\",","        \"be-BY\",","        \"be\",","        \"bg-BG\",","        \"bg\",","        \"bn-BD\",","        \"bn-IN\",","        \"bn\",","        \"bo-CN\",","        \"bo-IN\",","        \"bo\",","        \"ca-ES\",","        \"ca\",","        \"cs-CZ\",","        \"cs\",","        \"cy-GB\",","        \"cy\",","        \"da-DK\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de-CH\",","        \"de-DE\",","        \"de\",","        \"de-LI\",","        \"de-LU\",","        \"el-CY\",","        \"el-GR\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-BZ\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JM\",","        \"en-JO\",","        \"en-MH\",","        \"en-MT\",","        \"en-MY\",","        \"en-NA\",","        \"en-NZ\",","        \"en-PH\",","        \"en-PK\",","        \"en-RH\",","        \"en-SG\",","        \"en-TT\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-VI\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-BO\",","        \"es-CL\",","        \"es-CO\",","        \"es-CR\",","        \"es-DO\",","        \"es-EC\",","        \"es-ES\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-MX\",","        \"es-NI\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-PY\",","        \"es-SV\",","        \"es-US\",","        \"es-UY\",","        \"es-VE\",","        \"et-EE\",","        \"et\",","        \"eu-ES\",","        \"eu\",","        \"fa-AF\",","        \"fa-IR\",","        \"fa\",","        \"fi-FI\",","        \"fi\",","        \"fil\",","        \"fil-PH\",","        \"fo-FO\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr-FR\",","        \"fr\",","        \"fr-LU\",","        \"fr-MC\",","        \"fr-SN\",","        \"ga-IE\",","        \"ga\",","        \"gl-ES\",","        \"gl\",","        \"gsw-CH\",","        \"gsw\",","        \"gu-IN\",","        \"gu\",","        \"gv-GB\",","        \"gv\",","        \"ha-GH\",","        \"ha\",","        \"ha-Latn-GH\",","        \"ha-Latn-NE\",","        \"ha-Latn-NG\",","        \"ha-NE\",","        \"ha-NG\",","        \"haw\",","        \"haw-US\",","        \"he-IL\",","        \"he\",","        \"hi-IN\",","        \"hi\",","        \"hr-HR\",","        \"hr\",","        \"hu-HU\",","        \"hu\",","        \"hy-AM\",","        \"hy\",","        \"id-ID\",","        \"id\",","        \"ii-CN\",","        \"ii\",","        \"in-ID\",","        \"in\",","        \"is-IS\",","        \"is\",","        \"it-CH\",","        \"it-IT\",","        \"it\",","        \"iw-IL\",","        \"iw\",","        \"ja-JP\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka-GE\",","        \"ka\",","        \"kk-Cyrl-KZ\",","        \"kk\",","        \"kk-KZ\",","        \"kl-GL\",","        \"kl\",","        \"km\",","        \"km-KH\",","        \"kn-IN\",","        \"kn\",","        \"ko\",","        \"kok-IN\",","        \"kok\",","        \"ko-KR\",","        \"kw-GB\",","        \"kw\",","        \"lt\",","        \"lt-LT\",","        \"lv\",","        \"lv-LV\",","        \"mk\",","        \"mk-MK\",","        \"ml-IN\",","        \"ml\",","        \"mr-IN\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"ms-MY\",","        \"mt\",","        \"mt-MT\",","        \"nb\",","        \"nb-NO\",","        \"ne-IN\",","        \"ne\",","        \"ne-NP\",","        \"nl-BE\",","        \"nl\",","        \"nl-NL\",","        \"nn\",","        \"nn-NO\",","        \"no\",","        \"no-NO\",","        \"om-ET\",","        \"om\",","        \"om-KE\",","        \"or-IN\",","        \"or\",","        \"pa-Arab\",","        \"pa-Arab-PK\",","        \"pa-Guru-IN\",","        \"pa-IN\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"pl-PL\",","        \"ps-AF\",","        \"ps\",","        \"pt-BR\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ro-MD\",","        \"ro-RO\",","        \"ru\",","        \"ru-RU\",","        \"ru-UA\",","        \"sh-BA\",","        \"sh-CS\",","        \"sh\",","        \"sh-YU\",","        \"si\",","        \"si-LK\",","        \"sk\",","        \"sk-SK\",","        \"sl\",","        \"sl-SI\",","        \"so-DJ\",","        \"so-ET\",","        \"so\",","        \"so-KE\",","        \"so-SO\",","        \"sq-AL\",","        \"sq\",","        \"sr-BA\",","        \"sr-CS\",","        \"sr-Cyrl-BA\",","        \"sr-Cyrl-CS\",","        \"sr-Cyrl-ME\",","        \"sr-Cyrl-RS\",","        \"sr-Cyrl-YU\",","        \"sr\",","        \"sr-Latn-BA\",","        \"sr-Latn-CS\",","        \"sr-Latn-ME\",","        \"sr-Latn-RS\",","        \"sr-Latn-YU\",","        \"sr-ME\",","        \"sr-RS\",","        \"sr-YU\",","        \"sv-FI\",","        \"sv\",","        \"sv-SE\",","        \"sw\",","        \"sw-KE\",","        \"sw-TZ\",","        \"ta-IN\",","        \"ta\",","        \"te-IN\",","        \"te\",","        \"th\",","        \"th-TH\",","        \"ti-ER\",","        \"ti-ET\",","        \"ti\",","        \"tl\",","        \"tl-PH\",","        \"tr\",","        \"tr-TR\",","        \"uk\",","        \"uk-UA\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz-AF\",","        \"uz-Arab-AF\",","        \"uz-Arab\",","        \"uz-Cyrl-UZ\",","        \"uz\",","        \"uz-Latn\",","        \"uz-Latn-UZ\",","        \"uz-UZ\",","        \"vi\",","        \"vi-VN\",","        \"zh-CN\",","        \"zh-Hans-CN\",","        \"zh-Hans-HK\",","        \"zh-Hans-MO\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-Hant-TW\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\",","        \"zu-ZA\"","    ],","    \"requires\": [","        \"datatype-number-format\",","        \"datatype-number-parse\"","    ]","});"];
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].lines = {"1":0,"7":0,"10":0,"24":0,"25":0,"27":0,"29":0,"31":0,"32":0,"33":0,"35":0,"37":0,"55":0,"56":0,"57":0,"60":0,"77":0,"79":0,"87":0,"89":0,"90":0,"92":0,"108":0,"111":0,"112":0,"115":0,"116":0,"118":0,"130":0,"148":0,"149":0,"150":0,"151":0,"154":0,"162":0,"180":0,"189":0,"193":0,"205":0,"206":0,"208":0,"209":0,"210":0,"213":0,"238":0,"242":0,"243":0,"244":0,"245":0,"248":0,"249":0,"250":0,"252":0,"253":0,"255":0,"256":0,"257":0,"258":0,"259":0,"262":0,"265":0,"283":0,"284":0,"285":0,"288":0,"290":0,"298":0,"310":0,"335":0,"336":0,"338":0,"340":0,"341":0,"343":0,"344":0,"345":0,"346":0,"350":0,"351":0,"352":0,"355":0,"356":0,"358":0,"359":0,"362":0,"363":0,"364":0,"365":0,"367":0,"368":0,"369":0,"373":0,"375":0,"376":0,"377":0,"378":0,"379":0,"383":0,"384":0,"386":0,"388":0,"390":0,"391":0,"392":0,"393":0,"394":0,"395":0,"398":0,"399":0,"400":0,"405":0,"406":0,"407":0,"408":0,"410":0,"413":0,"414":0,"415":0,"416":0,"417":0,"419":0,"422":0,"425":0,"426":0,"427":0,"428":0,"432":0,"434":0,"435":0,"436":0,"440":0,"441":0,"443":0,"444":0,"445":0,"447":0,"451":0,"452":0,"456":0,"465":0,"480":0,"481":0,"484":0,"486":0,"487":0,"489":0,"490":0,"493":0,"494":0,"497":0,"500":0,"511":0,"512":0,"513":0,"516":0,"517":0,"520":0,"523":0,"524":0,"525":0,"526":0,"528":0,"531":0,"543":0,"544":0,"545":0,"546":0,"547":0,"548":0,"550":0,"552":0,"553":0,"554":0,"556":0,"557":0,"558":0,"560":0,"561":0,"562":0,"564":0,"565":0,"566":0,"568":0,"569":0,"570":0,"572":0,"574":0,"575":0,"577":0,"579":0,"593":0,"616":0,"617":0,"618":0,"620":0,"622":0,"630":0,"632":0,"633":0,"634":0,"638":0,"639":0,"640":0,"641":0,"642":0,"645":0,"646":0,"647":0,"650":0,"651":0,"662":0,"672":0,"673":0,"675":0,"676":0,"677":0,"678":0,"679":0,"680":0,"681":0,"683":0,"685":0,"688":0,"689":0,"691":0,"692":0,"695":0,"696":0,"697":0,"700":0,"701":0,"702":0,"704":0,"705":0,"709":0,"721":0,"730":0,"731":0,"733":0,"734":0,"737":0,"738":0,"740":0,"741":0,"744":0,"745":0,"746":0,"749":0,"750":0,"751":0,"753":0,"755":0,"759":0,"761":0,"763":0,"767":0,"769":0,"770":0,"774":0,"777":0,"779":0,"781":0,"782":0,"786":0,"787":0,"791":0,"792":0,"796":0,"797":0,"799":0,"803":0,"804":0,"805":0,"807":0,"819":0,"820":0,"822":0,"823":0,"826":0,"828":0,"830":0,"831":0,"833":0,"834":0,"835":0,"837":0,"838":0,"840":0,"841":0,"844":0,"845":0,"847":0,"848":0,"851":0,"854":0,"856":0,"875":0,"884":0,"895":0,"905":0,"914":0,"917":0,"922":0,"949":0,"951":0,"953":0,"956":0,"957":0,"958":0,"959":0,"961":0,"965":0,"980":0,"981":0,"982":0,"987":0,"992":0};
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].functions = {"_zeroPad:24":0,"__BaseFormat:55":0,"format:86":0,"parse:107":0,"_createParseObject:129":0,"Segment:148":0,"format:161":0,"parse:179":0,"getFormat:188":0,"_parseLiteral:204":0,"_parseInt:237":0,"TextSegment:283":0,"toString:297":0,"parse:309":0,"__zNumberFormat:335":0,"format:479":0,"parse:510":0,"__parseStatic:542":0,"_createParseObject:592":0,"NumberSegment:616":0,"format:629":0,"_normalize:661":0,"parse:720":0,"__YNumberFormat:819":0,"format:883":0,"isParseIntegerOnly:894":0,"parse:904":0,"setParseIntegerOnly:913":0,"format:948":0,"parse:979":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].coveredLines = 317;
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].coveredFunctions = 31;
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 1);
YUI.add('gallery-advanced-number-format', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

_yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 7);
var MODULE_NAME = "gallery-advanced-number-format",
    Format, NumberFormat, YNumberFormat;

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 10);
Y.Number.__advancedFormat = true;

/**
 * Pad string to specified length
 * @method _zeroPad
 * @for Number
 * @static
 * @private
 * @param {String|Number} s The string or number to be padded
 * @param {Number} length The maximum length s should be padded to have
 * @param {String} [zeroChar='0'] The character to be used to pad the string.
 * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string
 * @return {String} The padded string
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 24);
Y.Number._zeroPad  = function(s, length, zeroChar, rightSide) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "_zeroPad", 24);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 25);
s = typeof s === "string" ? s : String(s);

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 27);
if (s.length >= length) { return s; }

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 29);
zeroChar = zeroChar || '0';
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 31);
var a = [], i;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 32);
for (i = s.length; i < length; i++) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 33);
a.push(zeroChar);
    }
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 35);
a[rightSide ? "unshift" : "push"](s);

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 37);
return a.join("");
};

//
// Format class
//

/**
 * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which
 * returns the formatted string.
 * For internal use only.
 * @class __BaseFormat
 * @namespace Number
 * @constructor
 * @private
 * @param {String} pattern
 * @param {Object} formats
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 55);
Y.Number.__BaseFormat = function(pattern, formats) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "__BaseFormat", 55);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 56);
if ( !pattern && !formats ) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 57);
return;
    }

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 60);
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
         * @type Number.__BaseFormat.Segment
         */
        _segments: [],
        Formats: formats
    });
};

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 77);
Format = Y.Number.__BaseFormat;

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 79);
Y.mix(Format.prototype, {
    /**
     * Format object
     * @method format
     * @param object The object to be formatted
     * @return {String} Formatted result
     */
    format: function(object) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 86);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 87);
var s = [], i = 0;
    
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 89);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 90);
s.push(this._segments[i].format(object));
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 92);
return s.join("");
    },

    
    /**
     * Parses the given string according to this format's pattern and returns
     * an object.
     * Note:
     * The default implementation of this method assumes that the sub-class
     * has implemented the _createParseObject method.
     * @method parse
     * @for Number.__BaseFormat
     * @param {String} s The string to be parsed
     * @param {Number} [pp=0] Parse position. String will only be read from here
     */
    parse: function(s, pp) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 107);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 108);
var object = this._createParseObject(),
            index = pp || 0,
            i = 0;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 111);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 112);
index = this._segments[i].parse(object, s, index);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 115);
if (index < s.length) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 116);
Y.error("Parse Error: Input too long");
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 118);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "_createParseObject", 129);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 130);
Y.error("Not implemented");
    }
});

//
// Segment class
//

/**
 * Segments in the pattern to be formatted
 * @class __BaseFormat.Segment
 * @for __BaseFormat
 * @namespace Number
 * @private
 * @constructor
 * @param {Format} format The format object that created this segment
 * @param {String} s String representing this segment
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 148);
Format.Segment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "Segment", 148);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 149);
if( !format && !s ) { return; }
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 150);
this._parent = format;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 151);
this._s = s;
};

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 154);
Y.mix(Format.Segment.prototype, {
    /**
     * Formats the object. Will be overridden in most subclasses.
     * @method format
     * //param o The object to format
     * @return {String} Formatted result
     */
    format: function(/*o*/) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 161);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 162);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 179);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 180);
Y.error("Not implemented");
    },

    /**
     * Return the parent Format object
     * @method getFormat
     * @return {Number.__BaseFormat}
     */
    getFormat: function() {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "getFormat", 188);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 189);
return this._parent;
    }
});

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 193);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "_parseLiteral", 204);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 205);
if (s.length - index < literal.length) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 206);
Y.error("Parse Error: Input too short");
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 208);
for (var i = 0; i < literal.length; i++) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 209);
if (literal.charAt(i) !== s.charAt(index + i)) {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 210);
Y.error("Parse Error: Input does not match");
            }
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 213);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "_parseInt", 237);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 238);
var len = fixedlen || s.length - index,
            head = index,
            i = 0,
            tail, value, target;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 242);
for (; i < len; i++) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 243);
if (!s.charAt(index++).match(/\d/)) {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 244);
index--;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 245);
break;
            }
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 248);
tail = index;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 249);
if (head === tail) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 250);
Y.error("Error parsing number. Number not present");
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 252);
if (fixedlen && tail - head !== fixedlen) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 253);
Y.error("Error parsing number. Number too short");
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 255);
value = parseInt(s.substring(head, tail), radix || 10);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 256);
if (f) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 257);
target = o || Y.config.win;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 258);
if (typeof f === "function") {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 259);
f.call(target, value + adjust);
            }
            else {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 262);
target[f] = value + adjust;
            }
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 265);
return tail;
    }
});

//
// Text segment class
//

/**
 * Text segment in the pattern.
 * @class __BaseFormat.TextSegment
 * @for __BaseFormat
 * @namespace Number
 * @extends Segment
 * @constructor
 * @param {Format} format The parent Format object
 * @param {String} s The pattern representing this segment
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 283);
Format.TextSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "TextSegment", 283);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 284);
if (!format && !s) { return; }
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 285);
Format.TextSegment.superclass.constructor.call(this, format, s);
};

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 288);
Y.extend(Format.TextSegment, Format.Segment);

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 290);
Y.mix(Format.TextSegment.prototype, {
    /**
     * String representation of the class
     * @method toString
     * @private
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "toString", 297);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 298);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 309);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 310);
return Format.Segment._parseLiteral(this._s, s, index);
    }
}, true);
/**
 * NumberFormat helps you to format and parse numbers for any locale.
 * Your code can be completely independent of the locale conventions for decimal points, thousands-separators,
 * or even the particular decimal digits used, or whether the number format is even decimal.
 *
 * This module uses parts of zimbra NumberFormat
 *
 * @module datatype-number-advanced-format
 * @requires datatype-number-format, datatype-number-parse
 */

/**
 * Class to handle Number formatting.
 * @class __zNumberFormat
 * @extends __BaseFormat
 * @namespace Number
 * @private
 * @constructor
 * @param pattern {String}       The number pattern.
 * @param formats {Object}       locale data
 * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 335);
Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "__zNumberFormat", 335);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 336);
var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,
        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 338);
if (arguments.length === 0) { return; }

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 340);
NumberFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 341);
if (!pattern) { return; }

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 343);
if(pattern === "{plural_style}") {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 344);
pattern = this.Formats.decimalFormat;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 345);
this._isPluralCurrency = true;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 346);
this._pattern = pattern;
    }

    //Default currency
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 350);
this.currency = this.Formats.defaultCurrency;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 351);
if(this.currency === undefined || !this.currency) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 352);
this.currency = "USD";
    }
        
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 355);
patterns = pattern.split(/;/);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 356);
pattern = patterns[0];
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 358);
this._useGrouping = (pattern.indexOf(",") !== -1);      //Will be set to true if pattern uses grouping
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 359);
this._parseIntegerOnly = (pattern.indexOf(".") === -1);  //Will be set to false if pattern contains fractional parts
        
    //If grouping is used, find primary and secondary grouping
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 362);
if(this._useGrouping) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 363);
numberPattern = pattern.match(/[0#,]+/);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 364);
groupingRegex = new RegExp("[0#]+", "g");
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 365);
groups = numberPattern[0].match(groupingRegex);
            
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 367);
i = groups.length - 2;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 368);
this._primaryGrouping = groups[i+1].length;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 369);
this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);
    }
        
    // parse prefix
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 373);
i = 0;
        
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 375);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 376);
i = results.offset;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 377);
hasPrefix = results.text !== "";
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 378);
if (hasPrefix) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 379);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // parse number descriptor
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 383);
start = i;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 384);
while (i < pattern.length &&
        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 386);
i++;
    }
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 388);
end = i;

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 390);
numPattern = pattern.substring(start, end);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 391);
e = numPattern.indexOf(this.Formats.exponentialSymbol);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 392);
expon = e !== -1 ? numPattern.substring(e + 1) : null;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 393);
if (expon) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 394);
numPattern = numPattern.substring(0, e);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 395);
this._showExponent = true;
    }
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 398);
dot = numPattern.indexOf('.');
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 399);
whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 400);
if (whole) {
        /*var comma = whole.lastIndexOf(',');
            if (comma != -1) {
                this._groupingOffset = whole.length - comma - 1;
            }*/
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 405);
whole = whole.replace(/[^#0]/g,"");
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 406);
zero = whole.indexOf('0');
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 407);
if (zero !== -1) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 408);
this._minIntDigits = whole.length - zero;
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 410);
this._maxIntDigits = whole.length;
    }
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 413);
fract = dot !== -1 ? numPattern.substring(dot + 1) : null;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 414);
if (fract) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 415);
zero = fract.lastIndexOf('0');
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 416);
if (zero !== -1) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 417);
this._minFracDigits = zero + 1;
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 419);
this._maxFracDigits = fract.replace(/[^#0]/g,"").length;
    }
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 422);
this._segments.push(new NumberFormat.NumberSegment(this, numPattern));
	
    // parse suffix
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 425);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 426);
i = results.offset;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 427);
if (results.text !== "") {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 428);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // add negative formatter
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 432);
if (skipNegFormat) { return; }
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 434);
if (patterns.length > 1) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 435);
pattern = patterns[1];
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 436);
this._negativeFormatter = new NumberFormat(pattern, formats, true);
    }
    else {
        // no negative pattern; insert minus sign before number segment
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 440);
formatter = new NumberFormat("", formats);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 441);
formatter._segments = formatter._segments.concat(this._segments);

        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 443);
index = hasPrefix ? 1 : 0;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 444);
minus = new Format.TextSegment(formatter, this.Formats.minusSign);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 445);
formatter._segments.splice(index, 0, minus);
		
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 447);
this._negativeFormatter = formatter;
    }
};

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 451);
NumberFormat = Y.Number.__zNumberFormat;
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 452);
Y.extend(NumberFormat, Y.Number.__BaseFormat);
    
// Constants

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 456);
Y.mix(NumberFormat, {
    _NUMBER: "number",
    _INTEGER: "integer",
    _CURRENCY: "currency",
    _PERCENT: "percent",

    _META_CHARS: "0#.,E"
});

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 465);
Y.mix( NumberFormat.prototype, {
    _groupingOffset: Number.MAX_VALUE,
    _minIntDigits: 1,
    _isCurrency: false,
    _isPercent: false,
    _isPerMille: false,
    _showExponent: false,

    /**
     * Format a number
     * @method format
     * @param number {Number}
     * @return {String} Formatted result
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 479);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 480);
if (number < 0 && this._negativeFormatter) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 481);
return this._negativeFormatter.format(number);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 484);
var result = Format.prototype.format.call(this, number), pattern = "";
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 486);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 487);
if(number === 1) {
                //Singular
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 489);
pattern = this.Formats.currencyPatternSingular;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 490);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencySingular"]);
            } else {
                //Plural
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 493);
pattern = this.Formats.currencyPatternPlural;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 494);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencyPlural"]);
            }
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 497);
result = pattern.replace("{0}", result);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 500);
return result;
    },

    /**
     * Parse string and return number
     * @method parse
     * @param s {String} The string to parse
     * @param pp {Number} Parse position. Will start parsing from this index in string s.
     * @return {Number} Parse result
     */
    parse: function(s, pp) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 510);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 511);
var singular, plural, object;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 512);
if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 513);
return this._negativeFormatter.parse(s, pp);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 516);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 517);
singular = this.Formats[this.currency + "_currencySingular"],
                plural = this.Formats[this.currency + "_currencyPlural"];
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 520);
s = Y.Lang.trim(s.replace(plural, "").replace(singular, ""));
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 523);
object = null;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 524);
try {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 525);
object = Format.prototype.parse.call(this, s, pp);
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 526);
object = object.value;
        } catch(e) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 528);
Y.error("Failed to parse: " + s, e);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 531);
return object;
    },

    /**
     * Parse static. Internal use only.
     * @method __parseStatic
     * @private
     * @param {String} s Pattern
     * @param {Number} i Index
     * @return {Object}
     */
    __parseStatic: function(s, i) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "__parseStatic", 542);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 543);
var data = [], c, start, end;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 544);
while (i < s.length) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 545);
c = s.charAt(i++);
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 546);
if (NumberFormat._META_CHARS.indexOf(c) !== -1) {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 547);
i--;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 548);
break;
            }
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 550);
switch (c) {
                case "'":
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 552);
start = i;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 553);
while (i < s.length && s.charAt(i) !== "'") {
			_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 554);
i++;
                    }
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 556);
end = i;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 557);
c = end - start === 0 ? "'" : s.substring(start, end);
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 558);
break;
                case '%':
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 560);
c = this.Formats.percentSign;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 561);
this._isPercent = true;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 562);
break;
                case '\u2030':
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 564);
c = this.Formats.perMilleSign;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 565);
this._isPerMille = true;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 566);
break;
                case '\u00a4':
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 568);
if(s.charAt(i) === '\u00a4') {
                        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 569);
c = this.Formats[this.currency + "_currencyISO"];
                        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 570);
i++;
                    } else {
                        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 572);
c = this.Formats[this.currency + "_currencySymbol"];
                    }
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 574);
this._isCurrency = true;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 575);
break;
            }
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 577);
data.push(c);
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 579);
return {
            text: data.join(""),
            offset: i
        };
    },

    /**
     * Creates the object that is initialized by parsing. For internal use only.
     * Overrides method from __BaseFormat
     * @method _createParseObject
     * @private
     * @return {Object}
     */
    _createParseObject: function() {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "_createParseObject", 592);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 593);
return {
            value: null
        };
    }
}, true);
    
//
// NumberFormat.NumberSegment class
//

/**
 * Number segment class.
 * @class __zNumberFormat.NumberSegment
 * @for __zNumberFormat
 * @namespace Number
 * @extends Number.__BaseFormat.Segment
 *
 * @private
 * @constructor
 *
 * @param format {Number.__zNumberFormat} Parent Format object
 * @param s {String} Pattern representing this segment
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 616);
NumberFormat.NumberSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "NumberSegment", 616);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 617);
if (format === null && s === null) { return; }
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 618);
NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 620);
Y.extend(NumberFormat.NumberSegment, Format.Segment);

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 622);
Y.mix(NumberFormat.NumberSegment.prototype, {
    /**
     * Format number segment
     * @method format
     * @param number {Number}
     * @return {String} Formatted result
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 629);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 630);
var expon, exponReg, s;
        // special values
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 632);
if (isNaN(number)) { return this._parent.Formats.nanSymbol; }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 633);
if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 634);
return this._parent.Formats.infinitySign;
        }

        // adjust value
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 638);
if (typeof number !== "number") { number = Number(number); }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 639);
number = Math.abs(number); // NOTE: minus sign is part of pattern
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 640);
if (this._parent._isPercent) { number *= 100; }
        else {_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 641);
if (this._parent._isPerMille) { number *= 1000; }}
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 642);
if(this._parent._parseIntegerOnly) { number = Math.floor(number); }
        
        // format
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 645);
expon = this._parent.Formats.exponentialSymbol;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 646);
exponReg = new RegExp(expon + "+");
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 647);
s = this._parent._showExponent
            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)
            : number.toFixed(this._parent._maxFracDigits || 0);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 650);
s = this._normalize(s);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 651);
return s;
    },

    /**
     * Normalize pattern
     * @method _normalize
     * @protected
     * @param {String} s Pattern
     * @return {String} Normalized pattern
     */
    _normalize: function(s) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "_normalize", 661);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 662);
var exponSymbol = this._parent.Formats.exponentialSymbol,
            splitReg = new RegExp("[\\." + exponSymbol + "]"),
            match = s.split(splitReg),
            whole = match.shift(),  //Normalize the whole part
            a = [],
            offset = this._parent._primaryGrouping,
            fract = '0',
            decimal = this._parent.Formats.decimalSeparator,
            expon, i;

	_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 672);
if (whole.length < this._parent._minIntDigits) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 673);
whole = Y.Number._zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 675);
if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 676);
i = whole.length - offset;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 677);
while (i > 0) {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 678);
a.unshift(whole.substr(i, offset));
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 679);
a.unshift(this._parent.Formats.groupingSeparator);
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 680);
offset = this._parent._secondaryGrouping;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 681);
i -= offset;
            }
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 683);
a.unshift(whole.substring(0, i + offset));
		
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 685);
whole = a.join("");
        }
	
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 688);
if(s.match(/\./)) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 689);
fract = match.shift();
        }
        else {_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 691);
if(s.match(/\e/) || s.match(/\E/)) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 692);
expon = match.shift();
        }}

        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 695);
fract = fract.replace(/0+$/,"");
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 696);
if (fract.length < this._parent._minFracDigits) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 697);
fract = Y.Number._zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);
        }
	
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 700);
a = [ whole ];
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 701);
if (fract.length > 0) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 702);
a.push(decimal, fract);
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 704);
if (expon) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 705);
a.push(exponSymbol, expon.replace(/^\+/,""));
        }
	
        // return normalize result
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 709);
return a.join("");
    },

    /**
     * Parse Number Segment
     * @method parse
     * @param object {Object} Result will be stored in object.value
     * @param s {String} Pattern
     * @param index {Number}
     * @return {Number} Index in s where parse ended
     */
    parse: function(object, s, index) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 720);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 721);
var comma = this._parent.Formats.groupingSeparator,
            dot = this._parent.Formats.decimalSeparator,
            minusSign = this._parent.Formats.minusSign,
            expon = this._parent.Formats.exponentialSymbol,
            numberRegexPattern = "[\\" + minusSign + "0-9" + comma + "]+",
            numberRegex, matches, negativeNum, endIndex, scientific = null, i,
            //If more groups, use primary/secondary grouping as applicable
            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;

        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 730);
if(!this._parent._parseIntegerOnly) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 731);
numberRegexPattern += "(\\" + dot + "[0-9]+)?";
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 733);
if(this._parent._showExponent) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 734);
numberRegexPattern += "(" + expon +"\\+?[0-9]+)";
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 737);
numberRegex = new RegExp(numberRegexPattern);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 738);
matches = s.match(numberRegex);
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 740);
if(!matches) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 741);
Y.error("Error parsing: Number does not match pattern");
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 744);
negativeNum = s.indexOf(minusSign) !== -1;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 745);
endIndex = index + matches[0].length;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 746);
s = s.slice(index, endIndex);
        
        //Scientific format does not use grouping
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 749);
if(this._parent.showExponent) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 750);
scientific = s.split(expon);
        } else {_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 751);
if(this._parent._useGrouping) {
            //Verify grouping data exists
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 753);
if(!this._parent._primaryGrouping) {
                //Should not happen
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 755);
Y.error("Error parsing: Invalid pattern");
            }
            
            //Verify grouping is correct
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 759);
i = s.length - this._parent._primaryGrouping - 1;
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 761);
if(matches[1]) {
                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 763);
i = i - matches[1].length;
            }
            
            //Use primary grouping for first group
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 767);
if(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 769);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 770);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 774);
s = s.slice(0, i) + s.slice(i+1);
            }
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 777);
i = i - grouping - 1;
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 779);
while(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 781);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 782);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 786);
s = s.slice(0, i) + s.slice(i+1);
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 787);
i = i - grouping - 1;
            }
            
            //Verify there are no more grouping separators
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 791);
if(s.indexOf(comma) !== -1) {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 792);
Y.error("Error parsing: Number does not match pattern");
            }
        }}
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 796);
if(scientific) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 797);
object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));
        } else {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 799);
object.value = parseFloat(s, 10);
        }
        
        //Special types
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 803);
if(negativeNum) { object.value *= -1; }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 804);
if (this._parent._isPercent) { object.value /= 100; }
        else {_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 805);
if (this._parent._isPerMille) { object.value /= 1000; }}
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 807);
return endIndex;
    }
}, true);

/**
 * Number Formatting
 * @class __YNumberFormat
 * @namespace Number
 * @private
 * @constructor
 * @param [style='NUMBER_STYLE'] {Number} the given style. Should be key/value from Y.Number.STYLES
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 819);
Y.Number.__YNumberFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "__YNumberFormat", 819);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 820);
style = style || Y.Number.STYLES.NUMBER_STYLE;
    
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 822);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 823);
style = Y.Number.STYLES[style];
    }
    
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 826);
var pattern = "",
        formats = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 828);
switch(style) {
        case Y.Number.STYLES.CURRENCY_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 830);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 831);
break;
        case Y.Number.STYLES.ISO_CURRENCY_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 833);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 834);
pattern = pattern.replace("\u00a4", "\u00a4\u00a4");
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 835);
break;
        case Y.Number.STYLES.NUMBER_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 837);
pattern = formats.decimalFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 838);
break;
        case Y.Number.STYLES.PERCENT_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 840);
pattern = formats.percentFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 841);
break;
        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:
            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 844);
pattern = "{plural_style}";
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 845);
break;
        case Y.Number.STYLES.SCIENTIFIC_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 847);
pattern = formats.scientificFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 848);
break;
    }
        
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 851);
this._numberFormatInstance = new NumberFormat(pattern, formats);
};

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 854);
YNumberFormat = Y.Number.__YNumberFormat;

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 856);
Y.mix(Y.Number, {
    /**
     * Style values to use during format/parse
     * @property STYLES
     * @type Object
     * @static
     * @final
     * @for Number
     */
    STYLES: {
        CURRENCY_STYLE: 1,
        ISO_CURRENCY_STYLE: 2,
        NUMBER_STYLE: 4,
        PERCENT_STYLE: 8,
        PLURAL_CURRENCY_STYLE: 16,
        SCIENTIFIC_STYLE: 32
    }
});
   
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 875);
Y.mix(YNumberFormat.prototype, {
    /**
     * Format a number
     * @method format
     * @param number {Number} the number to format
     * @for Number.YNumberFormat
     * @return {Number}
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 883);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 884);
return this._numberFormatInstance.format(number);
    },
    
    /**
     * Return true if this format will parse numbers as integers only.
     * For example in the English locale, with ParseIntegerOnly true, the string "1234." would be parsed as the integer value 1234
     * and parsing would stop at the "." character. Of course, the exact format accepted by the parse operation is locale dependant.
     * @method isParseIntegerOnly
     * @return {Boolean}
     */
    isParseIntegerOnly: function() {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "isParseIntegerOnly", 894);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 895);
return this._numberFormatInstance._parseIntegerOnly;
    },
    
    /**
     * Parse the string to get a number
     * @method parse
     * @param {String} txt The string to parse
     * @param {Number} [pp=0] Parse position. The position to start parsing at.
     */
    parse: function(txt, pp) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 904);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 905);
return this._numberFormatInstance.parse(txt, pp);
    },
    
    /**
     * Sets whether or not numbers should be parsed as integers only.
     * @method setParseIntegerOnly
     * @param {Boolean} newValue set True, this format will parse numbers as integers only.
     */
    setParseIntegerOnly: function(newValue) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "setParseIntegerOnly", 913);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 914);
this._numberFormatInstance._parseIntegerOnly = newValue;
    }
});
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 917);
Y.mix( Y.Number, {
     _oldFormat: Y.Number.format,
     _oldParse:  Y.Number.parse
});

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 922);
Y.mix( Y.Number, {
     /**
      * Takes a Number and formats to string for display to user
      *
      * @for Number
      * @method format
      * @param data {Number} Number
      * @param [config] {Object} Optional Configuration values.
      *   <dl>
      *      <dt>[style] {Number|String}</dt>
      *         <dd>Format/Style to use. See Y.Number.STYLES</dd>
      *      <dt>[parseIntegerOnly] {Boolean}</dt>
      *         <dd>If set to true, only the whole number part of data will be used</dd>
      *      <dt>[prefix] {String}</dd>
      *         <dd>String prepended before each number, like a currency designator "$"</dd>
      *      <dt>[decimalPlaces] {Number}</dd>
      *         <dd>Number of decimal places to round. Must be a number 0 to 20.</dd>
      *      <dt>[decimalSeparator] {String}</dd>
      *         <dd>Decimal separator</dd>
      *      <dt>[thousandsSeparator] {String}</dd>
      *         <dd>Thousands separator</dd>
      *      <dt>[suffix] {String}</dd>
      *         <dd>String appended after each number, like " items" (note the space)</dd>
      *   </dl>
      * @return {String} Formatted string representation of data
      */
     format: function(data, config) {
         _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 948);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 949);
config = config || {};
    
         _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 951);
if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined
               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 953);
return Y.Number._oldFormat(data, config);
         }
    
         _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 956);
try {
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 957);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 958);
if(config.parseIntegerOnly) {
                 _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 959);
formatter.setParseIntegerOnly(true);
             }
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 961);
return formatter.format(data);
         } catch(e) {
             //Error. Fallback to original format
         }
         _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 965);
return Y.Number._oldFormat(data, config);
     },

     /**
      * Parses data and returns a number
      *
      * @for Number
      * @method format
      * @param data {String} Data to be parsed
      * @param [config] (Object} Object containg 'style' (Pattern data is represented in.
               See Y.Number.STYLES) and 'parsePosition' (index position in data to start parsing at) Both parameters are optional.
               If omitted, style defaults to NUMBER_STYLE, and parsePosition defaults to 0
      * @return {Number} Number represented by data
      */
     parse: function(data, config) {
         _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 979);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 980);
try {
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 981);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 982);
return formatter.parse(data, config.parsePosition);
         } catch(e) {
             //Fallback on deprecated parse
         }
    
         _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 987);
return Y.Number._oldParse(data);
     }
}, true);

//Update Parsers shortcut
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 992);
Y.namespace("Parsers").number = Y.Number.parse;


}, '@VERSION@', {
    "lang": [
        "af",
        "af-NA",
        "af-ZA",
        "am-ET",
        "am",
        "ar-AE",
        "ar-BH",
        "ar-DZ",
        "ar-EG",
        "ar-IQ",
        "ar-JO",
        "ar",
        "ar-KW",
        "ar-LB",
        "ar-LY",
        "ar-MA",
        "ar-OM",
        "ar-QA",
        "ar-SA",
        "ar-SD",
        "ar-SY",
        "ar-TN",
        "ar-YE",
        "as-IN",
        "as",
        "az-AZ",
        "az-Cyrl-AZ",
        "az-Cyrl",
        "az",
        "az-Latn-AZ",
        "be-BY",
        "be",
        "bg-BG",
        "bg",
        "bn-BD",
        "bn-IN",
        "bn",
        "bo-CN",
        "bo-IN",
        "bo",
        "ca-ES",
        "ca",
        "cs-CZ",
        "cs",
        "cy-GB",
        "cy",
        "da-DK",
        "da",
        "de-AT",
        "de-BE",
        "de-CH",
        "de-DE",
        "de",
        "de-LI",
        "de-LU",
        "el-CY",
        "el-GR",
        "el",
        "en-AU",
        "en-BE",
        "en-BW",
        "en-BZ",
        "en-CA",
        "en-GB",
        "en-HK",
        "en-IE",
        "en-IN",
        "en-JM",
        "en-JO",
        "en-MH",
        "en-MT",
        "en-MY",
        "en-NA",
        "en-NZ",
        "en-PH",
        "en-PK",
        "en-RH",
        "en-SG",
        "en-TT",
        "en-US",
        "en-US-POSIX",
        "en-VI",
        "en-ZA",
        "en-ZW",
        "eo",
        "es-AR",
        "es-BO",
        "es-CL",
        "es-CO",
        "es-CR",
        "es-DO",
        "es-EC",
        "es-ES",
        "es-GT",
        "es-HN",
        "es",
        "es-MX",
        "es-NI",
        "es-PA",
        "es-PE",
        "es-PR",
        "es-PY",
        "es-SV",
        "es-US",
        "es-UY",
        "es-VE",
        "et-EE",
        "et",
        "eu-ES",
        "eu",
        "fa-AF",
        "fa-IR",
        "fa",
        "fi-FI",
        "fi",
        "fil",
        "fil-PH",
        "fo-FO",
        "fo",
        "fr-BE",
        "fr-CA",
        "fr-CH",
        "fr-FR",
        "fr",
        "fr-LU",
        "fr-MC",
        "fr-SN",
        "ga-IE",
        "ga",
        "gl-ES",
        "gl",
        "gsw-CH",
        "gsw",
        "gu-IN",
        "gu",
        "gv-GB",
        "gv",
        "ha-GH",
        "ha",
        "ha-Latn-GH",
        "ha-Latn-NE",
        "ha-Latn-NG",
        "ha-NE",
        "ha-NG",
        "haw",
        "haw-US",
        "he-IL",
        "he",
        "hi-IN",
        "hi",
        "hr-HR",
        "hr",
        "hu-HU",
        "hu",
        "hy-AM",
        "hy",
        "id-ID",
        "id",
        "ii-CN",
        "ii",
        "in-ID",
        "in",
        "is-IS",
        "is",
        "it-CH",
        "it-IT",
        "it",
        "iw-IL",
        "iw",
        "ja-JP",
        "ja-JP-TRADITIONAL",
        "ja",
        "",
        "ka-GE",
        "ka",
        "kk-Cyrl-KZ",
        "kk",
        "kk-KZ",
        "kl-GL",
        "kl",
        "km",
        "km-KH",
        "kn-IN",
        "kn",
        "ko",
        "kok-IN",
        "kok",
        "ko-KR",
        "kw-GB",
        "kw",
        "lt",
        "lt-LT",
        "lv",
        "lv-LV",
        "mk",
        "mk-MK",
        "ml-IN",
        "ml",
        "mr-IN",
        "mr",
        "ms-BN",
        "ms",
        "ms-MY",
        "mt",
        "mt-MT",
        "nb",
        "nb-NO",
        "ne-IN",
        "ne",
        "ne-NP",
        "nl-BE",
        "nl",
        "nl-NL",
        "nn",
        "nn-NO",
        "no",
        "no-NO",
        "om-ET",
        "om",
        "om-KE",
        "or-IN",
        "or",
        "pa-Arab",
        "pa-Arab-PK",
        "pa-Guru-IN",
        "pa-IN",
        "pa",
        "pa-PK",
        "pl",
        "pl-PL",
        "ps-AF",
        "ps",
        "pt-BR",
        "pt",
        "pt-PT",
        "ro",
        "ro-MD",
        "ro-RO",
        "ru",
        "ru-RU",
        "ru-UA",
        "sh-BA",
        "sh-CS",
        "sh",
        "sh-YU",
        "si",
        "si-LK",
        "sk",
        "sk-SK",
        "sl",
        "sl-SI",
        "so-DJ",
        "so-ET",
        "so",
        "so-KE",
        "so-SO",
        "sq-AL",
        "sq",
        "sr-BA",
        "sr-CS",
        "sr-Cyrl-BA",
        "sr-Cyrl-CS",
        "sr-Cyrl-ME",
        "sr-Cyrl-RS",
        "sr-Cyrl-YU",
        "sr",
        "sr-Latn-BA",
        "sr-Latn-CS",
        "sr-Latn-ME",
        "sr-Latn-RS",
        "sr-Latn-YU",
        "sr-ME",
        "sr-RS",
        "sr-YU",
        "sv-FI",
        "sv",
        "sv-SE",
        "sw",
        "sw-KE",
        "sw-TZ",
        "ta-IN",
        "ta",
        "te-IN",
        "te",
        "th",
        "th-TH",
        "ti-ER",
        "ti-ET",
        "ti",
        "tl",
        "tl-PH",
        "tr",
        "tr-TR",
        "uk",
        "uk-UA",
        "ur-IN",
        "ur",
        "ur-PK",
        "uz-AF",
        "uz-Arab-AF",
        "uz-Arab",
        "uz-Cyrl-UZ",
        "uz",
        "uz-Latn",
        "uz-Latn-UZ",
        "uz-UZ",
        "vi",
        "vi-VN",
        "zh-CN",
        "zh-Hans-CN",
        "zh-Hans-HK",
        "zh-Hans-MO",
        "zh-Hans-SG",
        "zh-Hant-HK",
        "zh-Hant",
        "zh-Hant-MO",
        "zh-Hant-TW",
        "zh-HK",
        "zh",
        "zh-MO",
        "zh-SG",
        "zh-TW",
        "zu",
        "zu-ZA"
    ],
    "requires": [
        "datatype-number-format",
        "datatype-number-parse"
    ]
});
