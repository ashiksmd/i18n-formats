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
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-i18n-formats/gallery-i18n-formats.js",
    code: []
};
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].code=["YUI.add('gallery-i18n-formats', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","var MODULE_NAME = \"gallery-i18n-formats\",","    Format, NumberFormat, YNumberFormat,    //number","    TimezoneData, TimezoneLinks, Timezone, AjxTimezone,  //timezone","    ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat,   //date","    ListFormatter, //list","    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter, //message","    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters; //message","","/**"," * Pad string to specified length"," * @method _zeroPad"," * @for Number"," * @static"," * @private"," * @param {String|Number} s The string or number to be padded"," * @param {Number} length The maximum length s should be padded to have"," * @param {String} [zeroChar='0'] The character to be used to pad the string."," * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string"," * @return {String} The padded string"," */","Y.Number._zeroPad  = function(s, length, zeroChar, rightSide) {","    s = typeof s === \"string\" ? s : String(s);","","    if (s.length >= length) { return s; }","","    zeroChar = zeroChar || '0';","	","    var a = [], i;","    for (i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","};","","//","// Format class","//","","/**"," * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which"," * returns the formatted string."," * For internal use only."," * @class __BaseFormat"," * @namespace Number"," * @constructor"," * @private"," * @param {String} pattern"," * @param {Object} formats"," */","Y.Number.__BaseFormat = function(pattern, formats) {","    if ( !pattern && !formats ) {","        return;","    }","","    Y.mix(this, {","        /**","         * Pattern to format/parse","         * @property _pattern","         * @type String","         */","        _pattern: pattern,","        /**","         * Segments in the pattern","         * @property _segments","         * @type Number.__BaseFormat.Segment","         */","        _segments: [],","        Formats: formats","    });","};","","Format = Y.Number.__BaseFormat;","","Y.mix(Format.prototype, {","    /**","     * Format object","     * @method format","     * @param object The object to be formatted","     * @return {String} Formatted result","     */","    format: function(object) {","        var s = [], i = 0;","    ","        for (; i < this._segments.length; i++) {","            s.push(this._segments[i].format(object));","        }","        return s.join(\"\");","    },","","    ","    /**","     * Parses the given string according to this format's pattern and returns","     * an object.","     * Note:","     * The default implementation of this method assumes that the sub-class","     * has implemented the _createParseObject method.","     * @method parse","     * @for Number.__BaseFormat","     * @param {String} s The string to be parsed","     * @param {Number} [pp=0] Parse position. String will only be read from here","     */","    parse: function(s, pp) {","        var object = this._createParseObject(),","            index = pp || 0,","            i = 0;","        for (; i < this._segments.length; i++) {","            index = this._segments[i].parse(object, s, index);","        }","        ","        if (index < s.length) {","            Y.error(\"Parse Error: Input too long\");","        }","        return object;","    },","    ","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Note:","     * This must be implemented by sub-classes.","     * @method _createParseObject","     * @private","     * //return {Object}","     */","    _createParseObject: function(/*s*/) {","        Y.error(\"Not implemented\");","    }","});","","//","// Segment class","//","","/**"," * Segments in the pattern to be formatted"," * @class __BaseFormat.Segment"," * @for __BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param {Format} format The format object that created this segment"," * @param {String} s String representing this segment"," */","Format.Segment = function(format, s) {","    if( !format && !s ) { return; }","    this._parent = format;","    this._s = s;","};","","Y.mix(Format.Segment.prototype, {","    /**","     * Formats the object. Will be overridden in most subclasses.","     * @method format","     * //param o The object to format","     * @return {String} Formatted result","     */","    format: function(/*o*/) {","        return this._s;","    },","","    /**","     * Parses the string at the given index, initializes the parse object","     * (as appropriate), and returns the new index within the string for","     * the next parsing step.","     *","     * Note:","     * This method must be implemented by sub-classes.","     *","     * @method parse","     * //param o     {Object} The parse object to be initialized.","     * //param s     {String} The input string to be parsed.","     * //param index {Number} The index within the string to start parsing.","     * //return The parsed result.","     */","    parse: function(/*o, s, index*/) {","        Y.error(\"Not implemented\");","    },","","    /**","     * Return the parent Format object","     * @method getFormat","     * @return {Number.__BaseFormat}","     */","    getFormat: function() {","        return this._parent;","    }","});","","Y.mix(Format.Segment, {","    /**","     * Parse literal string that matches the pattern","     * @method _parseLiteral","     * @static","     * @private","     * @param {String} literal The pattern that literal should match","     * @param {String} s The literal to be parsed","     * @param {Number} index The position in s where literal is expected to start from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    _parseLiteral: function(literal, s, index) {","        if (s.length - index < literal.length) {","            Y.error(\"Parse Error: Input too short\");","        }","        for (var i = 0; i < literal.length; i++) {","            if (literal.charAt(i) !== s.charAt(index + i)) {","                Y.error(\"Parse Error: Input does not match\");","            }","        }","        return index + literal.length;","    },","    ","    /**","     * Parses an integer at the offset of the given string and calls a","     * method on the specified object.","     *","     * @method _parseInt","     * @private","     *","     * @param o           {Object}   The target object.","     * @param f           {function|String} The method to call on the target object.","     *                               If this parameter is a string, then it is used","     *                               as the name of the property to set on the","     *                               target object.","     * @param adjust      {Number}   The numeric adjustment to make on the","     *                               value before calling the object method.","     * @param s           {String}   The string to parse.","     * @param index       {Number}   The index within the string to start parsing.","     * @param fixedlen    {Number}   If specified, specifies the required number","     *                               of digits to be parsed.","     * @param [radix=10]  {Number}   Specifies the radix of the parse string.","     * @return {Number}   The position where the parsed number was found","     */","    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {","        var len = fixedlen || s.length - index,","            head = index,","            i = 0,","            tail, value, target;","        for (; i < len; i++) {","            if (!s.charAt(index++).match(/\\d/)) {","                index--;","                break;","            }","        }","        tail = index;","        if (head === tail) {","            Y.error(\"Error parsing number. Number not present\");","        }","        if (fixedlen && tail - head !== fixedlen) {","            Y.error(\"Error parsing number. Number too short\");","        }","        value = parseInt(s.substring(head, tail), radix || 10);","        if (f) {","            target = o || Y.config.win;","            if (typeof f === \"function\") {","                f.call(target, value + adjust);","            }","            else {","                target[f] = value + adjust;","            }","        }","        return tail;","    }","});","","//","// Text segment class","//","","/**"," * Text segment in the pattern."," * @class __BaseFormat.TextSegment"," * @for __BaseFormat"," * @namespace Number"," * @extends Segment"," * @constructor"," * @param {Format} format The parent Format object"," * @param {String} s The pattern representing this segment"," */","Format.TextSegment = function(format, s) {","    if (!format && !s) { return; }","    Format.TextSegment.superclass.constructor.call(this, format, s);","};","","Y.extend(Format.TextSegment, Format.Segment);","","Y.mix(Format.TextSegment.prototype, {","    /**","     * String representation of the class","     * @method toString","     * @private","     * @return {String}","     */","    toString: function() {","        return \"text: \\\"\"+this._s+'\"';","    },","","    /**","     * Parse an object according to the pattern","     * @method parse","     * @param o The parse object. Not used here. This is only used in more complex segment types","     * @param s {String} The string being parsed","     * @param index {Number} The index in s to start parsing from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    parse: function(o, s, index) {","        return Format.Segment._parseLiteral(this._s, s, index);","    }","}, true);","/**"," * NumberFormat helps you to format and parse numbers for any locale."," * Your code can be completely independent of the locale conventions for decimal points, thousands-separators,"," * or even the particular decimal digits used, or whether the number format is even decimal."," *"," * This module uses parts of zimbra NumberFormat"," *"," * @module datatype-number-advanced-format"," * @requires datatype-number-format, datatype-number-parse"," */","","/**"," * Class to handle Number formatting."," * @class __zNumberFormat"," * @extends __BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param pattern {String}       The number pattern."," * @param formats {Object}       locale data"," * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only"," */","Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {","    var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,","        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;","    if (arguments.length === 0) { return; }","","    NumberFormat.superclass.constructor.call(this, pattern, formats);","    if (!pattern) { return; }","","    if(pattern === \"{plural_style}\") {","        pattern = this.Formats.decimalFormat;","        this._isPluralCurrency = true;","        this._pattern = pattern;","    }","","    //Default currency","    this.currency = this.Formats.defaultCurrency;","    if(this.currency === undefined || !this.currency) {","        this.currency = \"USD\";","    }","        ","    patterns = pattern.split(/;/);","    pattern = patterns[0];","	","    this._useGrouping = (pattern.indexOf(\",\") !== -1);      //Will be set to true if pattern uses grouping","    this._parseIntegerOnly = (pattern.indexOf(\".\") === -1);  //Will be set to false if pattern contains fractional parts","        ","    //If grouping is used, find primary and secondary grouping","    if(this._useGrouping) {","        numberPattern = pattern.match(/[0#,]+/);","        groupingRegex = new RegExp(\"[0#]+\", \"g\");","        groups = numberPattern[0].match(groupingRegex);","            ","        i = groups.length - 2;","        this._primaryGrouping = groups[i+1].length;","        this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);","    }","        ","    // parse prefix","    i = 0;","        ","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    hasPrefix = results.text !== \"\";","    if (hasPrefix) {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // parse number descriptor","    start = i;","    while (i < pattern.length &&","        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {","        i++;","    }","    end = i;","","    numPattern = pattern.substring(start, end);","    e = numPattern.indexOf(this.Formats.exponentialSymbol);","    expon = e !== -1 ? numPattern.substring(e + 1) : null;","    if (expon) {","        numPattern = numPattern.substring(0, e);","        this._showExponent = true;","    }","	","    dot = numPattern.indexOf('.');","    whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;","    if (whole) {","        /*var comma = whole.lastIndexOf(',');","            if (comma != -1) {","                this._groupingOffset = whole.length - comma - 1;","            }*/","        whole = whole.replace(/[^#0]/g,\"\");","        zero = whole.indexOf('0');","        if (zero !== -1) {","            this._minIntDigits = whole.length - zero;","        }","        this._maxIntDigits = whole.length;","    }","	","    fract = dot !== -1 ? numPattern.substring(dot + 1) : null;","    if (fract) {","        zero = fract.lastIndexOf('0');","        if (zero !== -1) {","            this._minFracDigits = zero + 1;","        }","        this._maxFracDigits = fract.replace(/[^#0]/g,\"\").length;","    }","	","    this._segments.push(new NumberFormat.NumberSegment(this, numPattern));","	","    // parse suffix","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    if (results.text !== \"\") {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // add negative formatter","    if (skipNegFormat) { return; }","	","    if (patterns.length > 1) {","        pattern = patterns[1];","        this._negativeFormatter = new NumberFormat(pattern, formats, true);","    }","    else {","        // no negative pattern; insert minus sign before number segment","        formatter = new NumberFormat(\"\", formats);","        formatter._segments = formatter._segments.concat(this._segments);","","        index = hasPrefix ? 1 : 0;","        minus = new Format.TextSegment(formatter, this.Formats.minusSign);","        formatter._segments.splice(index, 0, minus);","		","        this._negativeFormatter = formatter;","    }","};","","NumberFormat = Y.Number.__zNumberFormat;","Y.extend(NumberFormat, Y.Number.__BaseFormat);","    ","// Constants","","Y.mix(NumberFormat, {","    _NUMBER: \"number\",","    _INTEGER: \"integer\",","    _CURRENCY: \"currency\",","    _PERCENT: \"percent\",","","    _META_CHARS: \"0#.,E\"","});","","Y.mix( NumberFormat.prototype, {","    _groupingOffset: Number.MAX_VALUE,","    _minIntDigits: 1,","    _isCurrency: false,","    _isPercent: false,","    _isPerMille: false,","    _showExponent: false,","","    /**","     * Format a number","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        if (number < 0 && this._negativeFormatter) {","            return this._negativeFormatter.format(number);","        }","        ","        var result = Format.prototype.format.call(this, number), pattern = \"\";","        ","        if(this._isPluralCurrency) {","            if(number === 1) {","                //Singular","                pattern = this.Formats.currencyPatternSingular;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencySingular\"]);","            } else {","                //Plural","                pattern = this.Formats.currencyPatternPlural;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencyPlural\"]);","            }","            ","            result = pattern.replace(\"{0}\", result);","        }","        ","        return result;","    },","","    /**","     * Parse string and return number","     * @method parse","     * @param s {String} The string to parse","     * @param pp {Number} Parse position. Will start parsing from this index in string s.","     * @return {Number} Parse result","     */","    parse: function(s, pp) {","        var singular, plural, object;","        if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {","            return this._negativeFormatter.parse(s, pp);","        }","        ","        if(this._isPluralCurrency) {","            singular = this.Formats[this.currency + \"_currencySingular\"],","                plural = this.Formats[this.currency + \"_currencyPlural\"];","            ","            s = Y.Lang.trim(s.replace(plural, \"\").replace(singular, \"\"));","        }","        ","        object = null;","        try {","            object = Format.prototype.parse.call(this, s, pp);","            object = object.value;","        } catch(e) {","            Y.error(\"Failed to parse: \" + s, e);","        }","        ","        return object;","    },","","    /**","     * Parse static. Internal use only.","     * @method __parseStatic","     * @private","     * @param {String} s Pattern","     * @param {Number} i Index","     * @return {Object}","     */","    __parseStatic: function(s, i) {","        var data = [], c, start, end;","        while (i < s.length) {","            c = s.charAt(i++);","            if (NumberFormat._META_CHARS.indexOf(c) !== -1) {","                i--;","                break;","            }","            switch (c) {","                case \"'\":","                    start = i;","                    while (i < s.length && s.charAt(i) !== \"'\") {","			i++;","                    }","                    end = i;","                    c = end - start === 0 ? \"'\" : s.substring(start, end);","                    break;","                case '%':","                    c = this.Formats.percentSign;","                    this._isPercent = true;","                    break;","                case '\\u2030':","                    c = this.Formats.perMilleSign;","                    this._isPerMille = true;","                    break;","                case '\\u00a4':","                    if(s.charAt(i) === '\\u00a4') {","                        c = this.Formats[this.currency + \"_currencyISO\"];","                        i++;","                    } else {","                        c = this.Formats[this.currency + \"_currencySymbol\"];","                    }","                    this._isCurrency = true;","                    break;","            }","            data.push(c);","        }","        return {","            text: data.join(\"\"),","            offset: i","        };","    },","","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Overrides method from __BaseFormat","     * @method _createParseObject","     * @private","     * @return {Object}","     */","    _createParseObject: function() {","        return {","            value: null","        };","    }","}, true);","    ","//","// NumberFormat.NumberSegment class","//","","/**"," * Number segment class."," * @class __zNumberFormat.NumberSegment"," * @for __zNumberFormat"," * @namespace Number"," * @extends Number.__BaseFormat.Segment"," *"," * @private"," * @constructor"," *"," * @param format {Number.__zNumberFormat} Parent Format object"," * @param s {String} Pattern representing this segment"," */","NumberFormat.NumberSegment = function(format, s) {","    if (format === null && s === null) { return; }","    NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);","};","Y.extend(NumberFormat.NumberSegment, Format.Segment);","","Y.mix(NumberFormat.NumberSegment.prototype, {","    /**","     * Format number segment","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        var expon, exponReg, s;","        // special values","        if (isNaN(number)) { return this._parent.Formats.nanSymbol; }","        if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {","            return this._parent.Formats.infinitySign;","        }","","        // adjust value","        if (typeof number !== \"number\") { number = Number(number); }","        number = Math.abs(number); // NOTE: minus sign is part of pattern","        if (this._parent._isPercent) { number *= 100; }","        else if (this._parent._isPerMille) { number *= 1000; }","        if(this._parent._parseIntegerOnly) { number = Math.floor(number); }","        ","        // format","        expon = this._parent.Formats.exponentialSymbol;","        exponReg = new RegExp(expon + \"+\");","        s = this._parent._showExponent","            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)","            : number.toFixed(this._parent._maxFracDigits || 0);","        s = this._normalize(s);","        return s;","    },","","    /**","     * Normalize pattern","     * @method _normalize","     * @protected","     * @param {String} s Pattern","     * @return {String} Normalized pattern","     */","    _normalize: function(s) {","        var exponSymbol = this._parent.Formats.exponentialSymbol,","            splitReg = new RegExp(\"[\\\\.\" + exponSymbol + \"]\"),","            match = s.split(splitReg),","            whole = match.shift(),  //Normalize the whole part","            a = [],","            offset = this._parent._primaryGrouping,","            fract = '0',","            decimal = this._parent.Formats.decimalSeparator,","            expon, i;","","	if (whole.length < this._parent._minIntDigits) {","            whole = Y.Number._zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);","        }","        if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {","            i = whole.length - offset;","            while (i > 0) {","                a.unshift(whole.substr(i, offset));","                a.unshift(this._parent.Formats.groupingSeparator);","                offset = this._parent._secondaryGrouping;","                i -= offset;","            }","            a.unshift(whole.substring(0, i + offset));","		","            whole = a.join(\"\");","        }","	","        if(s.match(/\\./)) {","            fract = match.shift();","        }","        else if(s.match(/\\e/) || s.match(/\\E/)) {","            expon = match.shift();","        }","","        fract = fract.replace(/0+$/,\"\");","        if (fract.length < this._parent._minFracDigits) {","            fract = Y.Number._zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);","        }","	","        a = [ whole ];","        if (fract.length > 0) {","            a.push(decimal, fract);","        }","        if (expon) {","            a.push(exponSymbol, expon.replace(/^\\+/,\"\"));","        }","	","        // return normalize result","        return a.join(\"\");","    },","","    /**","     * Parse Number Segment","     * @method parse","     * @param object {Object} Result will be stored in object.value","     * @param s {String} Pattern","     * @param index {Number}","     * @return {Number} Index in s where parse ended","     */","    parse: function(object, s, index) {","        var comma = this._parent.Formats.groupingSeparator,","            dot = this._parent.Formats.decimalSeparator,","            minusSign = this._parent.Formats.minusSign,","            expon = this._parent.Formats.exponentialSymbol,","            numberRegexPattern = \"[\\\\\" + minusSign + \"0-9\" + comma + \"]+\",","            numberRegex, matches, negativeNum, endIndex, scientific = null, i,","            //If more groups, use primary/secondary grouping as applicable","            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;","","        if(!this._parent._parseIntegerOnly) {","            numberRegexPattern += \"(\\\\\" + dot + \"[0-9]+)?\";","        }","        if(this._parent._showExponent) {","            numberRegexPattern += \"(\" + expon +\"\\\\+?[0-9]+)\";","        }","        ","        numberRegex = new RegExp(numberRegexPattern);","        matches = s.match(numberRegex);","        ","        if(!matches) {","            Y.error(\"Error parsing: Number does not match pattern\");","        }","        ","        negativeNum = s.indexOf(minusSign) !== -1;","        endIndex = index + matches[0].length;","        s = s.slice(index, endIndex);","        ","        //Scientific format does not use grouping","        if(this._parent.showExponent) {","            scientific = s.split(expon);","        } else if(this._parent._useGrouping) {","            //Verify grouping data exists","            if(!this._parent._primaryGrouping) {","                //Should not happen","                Y.error(\"Error parsing: Invalid pattern\");","            }","            ","            //Verify grouping is correct","            i = s.length - this._parent._primaryGrouping - 1;","            ","            if(matches[1]) {","                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part","                i = i - matches[1].length;","            }","            ","            //Use primary grouping for first group","            if(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","            }","            ","            i = i - grouping - 1;","            ","            while(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","                i = i - grouping - 1;","            }","            ","            //Verify there are no more grouping separators","            if(s.indexOf(comma) !== -1) {","                Y.error(\"Error parsing: Number does not match pattern\");","            }","        }","        ","        if(scientific) {","            object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));","        } else {","            object.value = parseFloat(s, 10);","        }","        ","        //Special types","        if(negativeNum) { object.value *= -1; }","        if (this._parent._isPercent) { object.value /= 100; }","        else if (this._parent._isPerMille) { object.value /= 1000; }","        ","        return endIndex;","    }","}, true);","","/**"," * Number Formatting"," * @class __YNumberFormat"," * @namespace Number"," * @private"," * @constructor"," * @param [style='NUMBER_STYLE'] {Number} the given style. Should be key/value from Y.Number.STYLES"," */","Y.Number.__YNumberFormat = function(style) {","    style = style || Y.Number.STYLES.NUMBER_STYLE;","    ","    if(Y.Lang.isString(style)) {","        style = Y.Number.STYLES[style];","    }","    ","    var pattern = \"\",","        formats = Y.Intl.get(MODULE_NAME);","    switch(style) {","        case Y.Number.STYLES.CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            break;","        case Y.Number.STYLES.ISO_CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            pattern = pattern.replace(\"\\u00a4\", \"\\u00a4\\u00a4\");","            break;","        case Y.Number.STYLES.NUMBER_STYLE:","            pattern = formats.decimalFormat;","            break;","        case Y.Number.STYLES.PERCENT_STYLE:","            pattern = formats.percentFormat;","            break;","        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:","            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting","            pattern = \"{plural_style}\";","            break;","        case Y.Number.STYLES.SCIENTIFIC_STYLE:","            pattern = formats.scientificFormat;","            break;","    }","        ","    this._numberFormatInstance = new NumberFormat(pattern, formats);","};","","YNumberFormat = Y.Number.__YNumberFormat;","","Y.mix(Y.Number, {","    /**","     * Style values to use during format/parse","     * @property STYLES","     * @type Object","     * @static","     * @final","     * @for Number","     */","    STYLES: {","        CURRENCY_STYLE: 1,","        ISO_CURRENCY_STYLE: 2,","        NUMBER_STYLE: 4,","        PERCENT_STYLE: 8,","        PLURAL_CURRENCY_STYLE: 16,","        SCIENTIFIC_STYLE: 32","    }","});","   ","Y.mix(YNumberFormat.prototype, {","    /**","     * Format a number","     * @method format","     * @param number {Number} the number to format","     * @for Number.YNumberFormat","     * @return {Number}","     */","    format: function(number) {","        return this._numberFormatInstance.format(number);","    },","    ","    /**","     * Return true if this format will parse numbers as integers only.","     * For example in the English locale, with ParseIntegerOnly true, the string \"1234.\" would be parsed as the integer value 1234","     * and parsing would stop at the \".\" character. Of course, the exact format accepted by the parse operation is locale dependant.","     * @method isParseIntegerOnly","     * @return {Boolean}","     */","    isParseIntegerOnly: function() {","        return this._numberFormatInstance._parseIntegerOnly;","    },","    ","    /**","     * Parse the string to get a number","     * @method parse","     * @param {String} txt The string to parse","     * @param {Number} [pp=0] Parse position. The position to start parsing at.","     */","    parse: function(txt, pp) {","        return this._numberFormatInstance.parse(txt, pp);","    },","    ","    /**","     * Sets whether or not numbers should be parsed as integers only.","     * @method setParseIntegerOnly","     * @param {Boolean} newValue set True, this format will parse numbers as integers only.","     */","    setParseIntegerOnly: function(newValue) {","        this._numberFormatInstance._parseIntegerOnly = newValue;","    }","});","Y.mix( Y.Number, {","     _oldFormat: Y.Number.format,","     _oldParse:  Y.Number.parse","});","","Y.mix( Y.Number, {","     /**","      * Takes a Number and formats to string for display to user","      *","      * @for Number","      * @method format","      * @param data {Number} Number","      * @param [config] {Object} Optional Configuration values.","      *   <dl>","      *      <dt>[style] {Number|String}</dt>","      *         <dd>Format/Style to use. See Y.Number.STYLES</dd>","      *      <dt>[parseIntegerOnly] {Boolean}</dt>","      *         <dd>If set to true, only the whole number part of data will be used</dd>","      *      <dt>[prefix] {String}</dd>","      *         <dd>String prepended before each number, like a currency designator \"$\"</dd>","      *      <dt>[decimalPlaces] {Number}</dd>","      *         <dd>Number of decimal places to round. Must be a number 0 to 20.</dd>","      *      <dt>[decimalSeparator] {String}</dd>","      *         <dd>Decimal separator</dd>","      *      <dt>[thousandsSeparator] {String}</dd>","      *         <dd>Thousands separator</dd>","      *      <dt>[suffix] {String}</dd>","      *         <dd>String appended after each number, like \" items\" (note the space)</dd>","      *   </dl>","      * @return {String} Formatted string representation of data","      */","     format: function(data, config) {","         config = config || {};","    ","         if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined","               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {","             return Y.Number._oldFormat(data, config);","         }","    ","         try {","             var formatter = new YNumberFormat(config.style);","             if(config.parseIntegerOnly) {","                 formatter.setParseIntegerOnly(true);","             }","             return formatter.format(data);","         } catch(e) {","             //Error. Fallback to original format","         }","         return Y.Number._oldFormat(data, config);","     },","","     /**","      * Parses data and returns a number","      *","      * @for Number","      * @method format","      * @param data {String} Data to be parsed","      * @param [config] (Object} Object containg 'style' (Pattern data is represented in.","               See Y.Number.STYLES) and 'parsePosition' (index position in data to start parsing at) Both parameters are optional.","               If omitted, style defaults to NUMBER_STYLE, and parsePosition defaults to 0","      * @return {Number} Number represented by data","      */","     parse: function(data, config) {","         try {","             var formatter = new YNumberFormat(config.style);","             return formatter.parse(data, config.parsePosition);","         } catch(e) {","             //Fallback on deprecated parse","         }","    ","         return Y.Number._oldParse(data);","     }","}, true);","","//Update Parsers shortcut","Y.namespace(\"Parsers\").number = Y.Number.parse;","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","Y.Date.Timezone = {","    __tzoneData: {","         TRANSITION_YEAR: 2011,","         TIMEZONE_RULES: [","{","    tzId: \"Asia/Riyadh88\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"Asia/Kabul\",","    standard: {","        offset: 270","    }","},","{","    tzId: \"Asia/Yerevan\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Baku\",","    standard: {","        offset: 240,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 5,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 300,","        mon: 3,","        week: -1,","        wkday: 1,","        hour: 4,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Asia/Bahrain\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Dhaka\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Thimphu\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Indian/Chagos\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Brunei\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Rangoon\",","    standard: {","        offset: 390","    }","},","{","    tzId: \"Asia/Phnom_Penh\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Harbin\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Shanghai\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Chongqing\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Urumqi\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kashgar\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Hong_Kong\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Taipei\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Macau\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Nicosia\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Tbilisi\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Dili\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Kolkata\",","    standard: {","        offset: 330","    }","},","{","    tzId: \"Asia/Jakarta\",","    standard: {","        offset: 427","    }","},","{","    tzId: \"Asia/Pontianak\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Tehran\",","    standard: {","        offset: 210","    }","},","{","    tzId: \"Asia/Baghdad\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Jerusalem\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Tokyo\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Amman\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Almaty\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Qyzylorda\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Aqtobe\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Aqtau\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Oral\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Bishkek\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Seoul\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Kuwait\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Vientiane\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Beirut\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Kuala_Lumpur\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kuching\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Indian/Maldives\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Hovd\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Ulaanbaatar\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Choibalsan\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kathmandu\",","    standard: {","        offset: 345","    }","},","{","    tzId: \"Asia/Muscat\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Karachi\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Gaza\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Hebron\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Manila\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Qatar\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Riyadh\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Singapore\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Colombo\",","    standard: {","        offset: 330","    }","},","{","    tzId: \"Asia/Damascus\",","    standard: {","        offset: 120,","        mon: 10,","        week: -1,","        wkday: 6,","        hour: 0,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 180,","        mon: 3,","        week: -1,","        wkday: 6,","        hour: 0,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Asia/Dushanbe\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Bangkok\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Ashgabat\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Dubai\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Samarkand\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Ho_Chi_Minh\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Aden\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Australia/Darwin\",","    standard: {","        offset: 570","    }","},","{","    tzId: \"Australia/Perth\",","    standard: {","        offset: 525","    }","},","{","    tzId: \"Australia/Brisbane\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Australia/Adelaide\",","    standard: {","        offset: 570,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 630,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Hobart\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Australia/Melbourne\",","    standard: {","        offset: 600,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 660,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Sydney\",","    standard: {","        offset: 570,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 630,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Lord_Howe\",","    standard: {","        offset: 630,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 660,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Indian/Christmas\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Pacific/Rarotonga\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Indian/Cocos\",","    standard: {","        offset: 390","    }","},","{","    tzId: \"Pacific/Fiji\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Gambier\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Pacific/Guam\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Tarawa\",","    standard: {","        offset: 840","    }","},","{","    tzId: \"Pacific/Saipan\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Majuro\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Chuuk\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Nauru\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Noumea\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Auckland\",","    standard: {","        offset: 765","    }","},","{","    tzId: \"Pacific/Niue\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Norfolk\",","    standard: {","        offset: 690","    }","},","{","    tzId: \"Pacific/Palau\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Pacific/Port_Moresby\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Pitcairn\",","    standard: {","        offset: -480","    }","},","{","    tzId: \"Pacific/Pago_Pago\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Apia\",","    standard: {","        offset: 780","    }","},","{","    tzId: \"Pacific/Guadalcanal\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Fakaofo\",","    standard: {","        offset: 840","    }","},","{","    tzId: \"Pacific/Tongatapu\",","    standard: {","        offset: 780","    }","},","{","    tzId: \"Pacific/Funafuti\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Johnston\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Pacific/Midway\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Wake\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Efate\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Wallis\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Etc/GMT\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Etc/GMT-14\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Asia/Riyadh87\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"America/Argentina/Buenos_Aires\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Cordoba\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Salta\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Tucuman\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/La_Rioja\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/San_Juan\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Jujuy\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Catamarca\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Mendoza\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/San_Luis\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Argentina/Rio_Gallegos\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Ushuaia\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Aruba\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/La_Paz\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Noronha\",","    standard: {","        offset: -120","    }","},","{","    tzId: \"America/Belem\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Santarem\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Fortaleza\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Recife\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Araguaina\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Maceio\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Bahia\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Sao_Paulo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Campo_Grande\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Cuiaba\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Porto_Velho\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Boa_Vista\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Manaus\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Eirunepe\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Rio_Branco\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Santiago\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Bogota\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Curacao\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guayaquil\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"Atlantic/Stanley\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Cayenne\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Guyana\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Asuncion\",","    standard: {","        offset: -240,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 0,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 0,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Lima\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"Atlantic/South_Georgia\",","    standard: {","        offset: -120","    }","},","{","    tzId: \"America/Paramaribo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Port_of_Spain\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Montevideo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Caracas\",","    standard: {","        offset: -210","    }","},","{","    tzId: \"Antarctica/Casey\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Antarctica/Davis\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Antarctica/Macquarie\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Indian/Kerguelen\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Antarctica/DumontDUrville\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Antarctica/Syowa\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Antarctica/Vostok\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Antarctica/Rothera\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"Antarctica/Palmer\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"Antarctica/McMurdo\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Riyadh89\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"Africa/Algiers\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Luanda\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Porto-Novo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Gaborone\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Ouagadougou\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Bujumbura\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Douala\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Atlantic/Cape_Verde\",","    standard: {","        offset: -60","    }","},","{","    tzId: \"Africa/Bangui\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Ndjamena\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Comoro\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Kinshasa\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Brazzaville\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Abidjan\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Djibouti\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Cairo\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Malabo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Asmara\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Addis_Ababa\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Libreville\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Banjul\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Accra\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Conakry\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Bissau\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Nairobi\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Maseru\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Monrovia\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Tripoli\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Antananarivo\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Blantyre\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Bamako\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Nouakchott\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Indian/Mauritius\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Indian/Mayotte\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Casablanca\",","    standard: {","        offset: 0,","        mon: 9,","        week: -1,","        wkday: 1,","        hour: 3,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 60,","        mon: 4,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Africa/El_Aaiun\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Maputo\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Windhoek\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Niamey\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Lagos\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Reunion\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Africa/Kigali\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Atlantic/St_Helena\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Sao_Tome\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Dakar\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Indian/Mahe\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Africa/Freetown\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Mogadishu\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Johannesburg\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Khartoum\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Juba\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Mbabane\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Dar_es_Salaam\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Lome\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Tunis\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Kampala\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Lusaka\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Harare\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/London\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"WET\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Tirane\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Andorra\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Vienna\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Minsk\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Europe/Brussels\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Sofia\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Prague\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Copenhagen\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"America/Danmarkshavn\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Europe/Tallinn\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Helsinki\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Paris\",","    standard: {","        offset: 9","    }","},","{","    tzId: \"Europe/Berlin\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Gibraltar\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Athens\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Budapest\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Atlantic/Reykjavik\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Rome\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Riga\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Vaduz\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Vilnius\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Luxembourg\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Malta\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Chisinau\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Monaco\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Amsterdam\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Oslo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Warsaw\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Lisbon\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Bucharest\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Kaliningrad\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Europe/Moscow\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Europe/Volgograd\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Europe/Samara\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Yekaterinburg\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Omsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Novosibirsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Novokuznetsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Krasnoyarsk\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Irkutsk\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Yakutsk\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Asia/Vladivostok\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Asia/Sakhalin\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Asia/Magadan\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Kamchatka\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Anadyr\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Europe/Belgrade\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Madrid\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Stockholm\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Zurich\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Istanbul\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Kiev\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Uzhgorod\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Zaporozhye\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Simferopol\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"EST\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"America/New_York\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Chicago\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/Center\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/New_Salem\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/Beulah\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Denver\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Los_Angeles\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Juneau\",","    standard: {","        offset: -600,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -540,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Pacific/Honolulu\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"America/Phoenix\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Boise\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Indianapolis\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Marengo\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Vincennes\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Tell_City\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Petersburg\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Knox\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Winamac\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Vevay\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Kentucky/Louisville\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Kentucky/Monticello\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Detroit\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Menominee\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/St_Johns\",","    standard: {","        offset: -150,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -90,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Goose_Bay\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Halifax\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Moncton\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Blanc-Sablon\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Toronto\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Winnipeg\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Regina\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Edmonton\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Vancouver\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Pangnirtung\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Iqaluit\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Resolute\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Rankin_Inlet\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cambridge_Bay\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cancun\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Merida\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Matamoros\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Monterrey\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Mexico_City\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Ojinaga\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Chihuahua\",","    standard: {","        offset: -420,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Hermosillo\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Mazatlan\",","    standard: {","        offset: -420,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Bahia_Banderas\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Tijuana\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Santa_Isabel\",","    standard: {","        offset: -480,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Anguilla\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Antigua\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Nassau\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Barbados\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Belize\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"Atlantic/Bermuda\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cayman\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Costa_Rica\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Havana\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Dominica\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Santo_Domingo\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/El_Salvador\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Grenada\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guadeloupe\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guatemala\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Port-au-Prince\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Tegucigalpa\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Jamaica\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Martinique\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Montserrat\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Managua\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Panama\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Puerto_Rico\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Kitts\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Lucia\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Miquelon\",","    standard: {","        offset: -180,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -120,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/St_Vincent\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Grand_Turk\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Tortola\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Thomas\",","    standard: {","        offset: -240","    }","}","]","}};","","TimezoneData = Y.Date.Timezone.__tzoneData;","Y.Date.Timezone.__tzoneLinks = {","    \"Mideast/Riyadh88\": \"Asia/Riyadh88\",","    \"Europe/Nicosia\": \"Asia/Nicosia\",","    \"US/Pacific-New\": \"America/Los_Angeles\",","    \"GMT\": \"Etc/GMT\",","    \"Etc/UTC\": \"Etc/GMT\",","    \"Etc/Universal\": \"Etc/UTC\",","    \"Etc/Zulu\": \"Etc/UTC\",","    \"Etc/Greenwich\": \"Etc/GMT\",","    \"Etc/GMT-0\": \"Etc/GMT\",","    \"Etc/GMT+0\": \"Etc/GMT\",","    \"Etc/GMT0\": \"Etc/GMT\",","    \"Mideast/Riyadh87\": \"Asia/Riyadh87\",","    \"America/Lower_Princes\": \"America/Curacao\",","    \"America/Kralendijk\": \"America/Curacao\",","    \"Antarctica/South_Pole\": \"Antarctica/McMurdo\",","    \"Mideast/Riyadh89\": \"Asia/Riyadh89\",","    \"Africa/Asmera\": \"Africa/Asmara\",","    \"Africa/Timbuktu\": \"Africa/Bamako\",","    \"America/Argentina/ComodRivadavia\": \"America/Argentina/Catamarca\",","    \"America/Atka\": \"America/Adak\",","    \"America/Buenos_Aires\": \"America/Argentina/Buenos_Aires\",","    \"America/Catamarca\": \"America/Argentina/Catamarca\",","    \"America/Coral_Harbour\": \"America/Atikokan\",","    \"America/Cordoba\": \"America/Argentina/Cordoba\",","    \"America/Ensenada\": \"America/Tijuana\",","    \"America/Fort_Wayne\": \"America/Indiana/Indianapolis\",","    \"America/Indianapolis\": \"America/Indiana/Indianapolis\",","    \"America/Jujuy\": \"America/Argentina/Jujuy\",","    \"America/Knox_IN\": \"America/Indiana/Knox\",","    \"America/Louisville\": \"America/Kentucky/Louisville\",","    \"America/Mendoza\": \"America/Argentina/Mendoza\",","    \"America/Porto_Acre\": \"America/Rio_Branco\",","    \"America/Rosario\": \"America/Argentina/Cordoba\",","    \"America/Virgin\": \"America/St_Thomas\",","    \"Asia/Ashkhabad\": \"Asia/Ashgabat\",","    \"Asia/Chungking\": \"Asia/Chongqing\",","    \"Asia/Dacca\": \"Asia/Dhaka\",","    \"Asia/Katmandu\": \"Asia/Kathmandu\",","    \"Asia/Calcutta\": \"Asia/Kolkata\",","    \"Asia/Macao\": \"Asia/Macau\",","    \"Asia/Tel_Aviv\": \"Asia/Jerusalem\",","    \"Asia/Saigon\": \"Asia/Ho_Chi_Minh\",","    \"Asia/Thimbu\": \"Asia/Thimphu\",","    \"Asia/Ujung_Pandang\": \"Asia/Makassar\",","    \"Asia/Ulan_Bator\": \"Asia/Ulaanbaatar\",","    \"Atlantic/Faeroe\": \"Atlantic/Faroe\",","    \"Atlantic/Jan_Mayen\": \"Europe/Oslo\",","    \"Australia/ACT\": \"Australia/Sydney\",","    \"Australia/Canberra\": \"Australia/Sydney\",","    \"Australia/LHI\": \"Australia/Lord_Howe\",","    \"Australia/NSW\": \"Australia/Sydney\",","    \"Australia/North\": \"Australia/Darwin\",","    \"Australia/Queensland\": \"Australia/Brisbane\",","    \"Australia/South\": \"Australia/Adelaide\",","    \"Australia/Tasmania\": \"Australia/Hobart\",","    \"Australia/Victoria\": \"Australia/Melbourne\",","    \"Australia/West\": \"Australia/Perth\",","    \"Australia/Yancowinna\": \"Australia/Broken_Hill\",","    \"Brazil/Acre\": \"America/Rio_Branco\",","    \"Brazil/DeNoronha\": \"America/Noronha\",","    \"Brazil/East\": \"America/Sao_Paulo\",","    \"Brazil/West\": \"America/Manaus\",","    \"Canada/Atlantic\": \"America/Halifax\",","    \"Canada/Central\": \"America/Winnipeg\",","    \"Canada/East-Saskatchewan\": \"America/Regina\",","    \"Canada/Eastern\": \"America/Toronto\",","    \"Canada/Mountain\": \"America/Edmonton\",","    \"Canada/Newfoundland\": \"America/St_Johns\",","    \"Canada/Pacific\": \"America/Vancouver\",","    \"Canada/Saskatchewan\": \"America/Regina\",","    \"Canada/Yukon\": \"America/Whitehorse\",","    \"Chile/Continental\": \"America/Santiago\",","    \"Chile/EasterIsland\": \"Pacific/Easter\",","    \"Cuba\": \"America/Havana\",","    \"Egypt\": \"Africa/Cairo\",","    \"Eire\": \"Europe/Dublin\",","    \"Europe/Belfast\": \"Europe/London\",","    \"Europe/Tiraspol\": \"Europe/Chisinau\",","    \"GB\": \"Europe/London\",","    \"GB-Eire\": \"Europe/London\",","    \"GMT+0\": \"Etc/GMT\",","    \"GMT-0\": \"Etc/GMT\",","    \"GMT0\": \"Etc/GMT\",","    \"Greenwich\": \"Etc/GMT\",","    \"Hongkong\": \"Asia/Hong_Kong\",","    \"Iceland\": \"Atlantic/Reykjavik\",","    \"Iran\": \"Asia/Tehran\",","    \"Israel\": \"Asia/Jerusalem\",","    \"Jamaica\": \"America/Jamaica\",","    \"Japan\": \"Asia/Tokyo\",","    \"Kwajalein\": \"Pacific/Kwajalein\",","    \"Libya\": \"Africa/Tripoli\",","    \"Mexico/BajaNorte\": \"America/Tijuana\",","    \"Mexico/BajaSur\": \"America/Mazatlan\",","    \"Mexico/General\": \"America/Mexico_City\",","    \"NZ\": \"Pacific/Auckland\",","    \"NZ-CHAT\": \"Pacific/Chatham\",","    \"Navajo\": \"America/Denver\",","    \"PRC\": \"Asia/Shanghai\",","    \"Pacific/Samoa\": \"Pacific/Pago_Pago\",","    \"Pacific/Yap\": \"Pacific/Chuuk\",","    \"Pacific/Truk\": \"Pacific/Chuuk\",","    \"Pacific/Ponape\": \"Pacific/Pohnpei\",","    \"Poland\": \"Europe/Warsaw\",","    \"Portugal\": \"Europe/Lisbon\",","    \"ROC\": \"Asia/Taipei\",","    \"ROK\": \"Asia/Seoul\",","    \"Singapore\": \"Asia/Singapore\",","    \"Turkey\": \"Europe/Istanbul\",","    \"UCT\": \"Etc/UCT\",","    \"US/Alaska\": \"America/Anchorage\",","    \"US/Aleutian\": \"America/Adak\",","    \"US/Arizona\": \"America/Phoenix\",","    \"US/Central\": \"America/Chicago\",","    \"US/East-Indiana\": \"America/Indiana/Indianapolis\",","    \"US/Eastern\": \"America/New_York\",","    \"US/Hawaii\": \"Pacific/Honolulu\",","    \"US/Indiana-Starke\": \"America/Indiana/Knox\",","    \"US/Michigan\": \"America/Detroit\",","    \"US/Mountain\": \"America/Denver\",","    \"US/Pacific\": \"America/Los_Angeles\",","    \"US/Samoa\": \"Pacific/Pago_Pago\",","    \"UTC\": \"Etc/UTC\",","    \"Universal\": \"Etc/UTC\",","    \"W-SU\": \"Europe/Moscow\",","    \"Zulu\": \"Etc/UTC\",","    \"Europe/Mariehamn\": \"Europe/Helsinki\",","    \"Europe/Vatican\": \"Europe/Rome\",","    \"Europe/San_Marino\": \"Europe/Rome\",","    \"Arctic/Longyearbyen\": \"Europe/Oslo\",","    \"Europe/Ljubljana\": \"Europe/Belgrade\",","    \"Europe/Podgorica\": \"Europe/Belgrade\",","    \"Europe/Sarajevo\": \"Europe/Belgrade\",","    \"Europe/Skopje\": \"Europe/Belgrade\",","    \"Europe/Zagreb\": \"Europe/Belgrade\",","    \"Europe/Bratislava\": \"Europe/Prague\",","    \"America/Shiprock\": \"America/Denver\",","    \"America/St_Barthelemy\": \"America/Guadeloupe\",","    \"America/Marigot\": \"America/Guadeloupe\"","};","","TimezoneLinks = Y.Date.Timezone.__tzoneLinks;/**"," * Timezone performs operations on a given timezone string represented in Olson tz database"," * This module uses parts of zimbra AjxTimezone to handle time-zones"," * @module datatype-date-timezone"," * @requires datatype-date-format"," */","","/**"," * Class to handle timezones"," * @class __zTimezone"," * @namespace Date"," * @private"," * @constructor"," */","Y.Date.__zTimezone = function() {","    this.localeData = Y.Intl.get(MODULE_NAME);","};","","AjxTimezone = Y.Date.__zTimezone;","","Y.mix(AjxTimezone, {","    /**","     * Get DST trasition date","     * @method getTransition","     * @static","     * @param onset {Object} DST transition information","     * @param year {Number} Year in which transition date is calculated","     * @return {Array} Transition as [year, month, day]","     */","    getTransition: function(onset, year) {","        var trans = [ year || new Date().getFullYear(), onset.mon, 1 ], date, wkday, adjust, last, count;","        if (onset.mday) {","            trans[2] = onset.mday;","        }","        else if (onset.wkday) {","            date = new Date(year, onset.mon - 1, 1, onset.hour, onset.min, onset.sec);","","            // last wkday of month","            if (onset.week === -1) {","                // NOTE: This creates a date of the *last* day of specified month by","                //       setting the month to *next* month and setting day of month","                //       to zero (i.e. the day *before* the first day).","                last = new Date(new Date(date.getTime()).setMonth(onset.mon, 0));","                count = last.getDate();","                wkday = last.getDay() + 1;","                adjust = wkday >= onset.wkday ? wkday - onset.wkday : 7 - onset.wkday - wkday;","                trans[2] = count - adjust;","            }","","            // Nth wkday of month","            else {","                wkday = date.getDay() + 1;","                adjust = onset.wkday === wkday ? 1 :0;","                trans[2] = onset.wkday + 7 * (onset.week - adjust) - wkday + 1;","            }","        }","        return trans;","    },","","    /**","     * Add dst transition rules with dst information","     * @method addRule","     * @static","     * @param rule {Object} Object containing timezone information","     */","    addRule: function(rule) {","        var tzId = rule.tzId, array;","","        AjxTimezone._SHORT_NAMES[tzId] = AjxTimezone._generateShortName(rule.standard.offset);","        AjxTimezone._CLIENT2RULE[tzId] = rule;","","        array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","        array.push(rule);","    },","","    /**","     * Get dst transition rule","     * @method getRule","     * @static","     * @param tzId {Object} Timezone Id","     * @param tz {Object} Rule object to match against","     * @return {Object} The rule","     */","    getRule: function(tzId, tz) {","        var rule = AjxTimezone._CLIENT2RULE[tzId],","            names = [ \"standard\", \"daylight\" ],","            rules, i, j, found, name, onset, breakOuter, p;","        if (!rule && tz) {","            rules = tz.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","            for (i = 0; i < rules.length; i++) {","                rule = rules[i];","","                found = true;","                for (j = 0; j < names.length; j++) {","                    name = names[j];","                    onset = rule[name];","                    if (!onset) { continue; }","			","                    breakOuter = false;","","                    for (p in tz[name]) {","                        if (tz[name][p] !== onset[p]) {","                            found = false;","                            breakOuter = true;","                            break;","                        }","                    }","","                    if(breakOuter){","                        break;","                    }","                }","                if (found) {","                    return rule;","                }","            }","            return null;","        }","","        return rule;","    },","","    /**","     * Get offset in minutes from GMT","     * @method getOffset","     * @static","     * @param tzId {String} Timezone ID","     * @param date {Date} Date on which the offset is to be found (offset may differ by date due to DST)","     * @return {Number} Offset in minutes from GMT","     */","    getOffset: function(tzId, date) {","        var rule = AjxTimezone.getRule(tzId), year, standard, stdTrans, dstTrans, month, stdMonth, dstMonth, isDST;","        if (rule && rule.daylight) {","            year = date.getFullYear();","","            standard = rule.standard, daylight  = rule.daylight;","            stdTrans = AjxTimezone.getTransition(standard, year);","            dstTrans = AjxTimezone.getTransition(daylight, year);","","            month    = date.getMonth()+1, day = date.getDate();","            stdMonth = stdTrans[1], stdDay = stdTrans[2];","            dstMonth = dstTrans[1], dstDay = dstTrans[2];","","            // northern hemisphere","            isDST = false;","            if (dstMonth < stdMonth) {","                isDST = month > dstMonth && month < stdMonth;","                isDST = isDST || (month === dstMonth && day >= dstDay);","                isDST = isDST || (month === stdMonth && day <  stdDay);","            }","","            // sorthern hemisphere","            else {","                isDST = month < dstMonth || month > stdMonth;","                isDST = isDST || (month === dstMonth && day <  dstDay);","                isDST = isDST || (month === stdMonth && day >= stdDay);","            }","","            return isDST ? daylight.offset : standard.offset;","        }","        return rule ? rule.standard.offset : -(new Date().getTimezoneOffset());","    },","","    /**","     * Compare rules to sort by offset","     * @method _BY_OFFSET","     * @static","     * @private","     * @param arule {Object} Rule to compare","     * @param brule {Object} Rule to compare","     * @return {Number} Difference in offsets between the rules.","               If offsets are equal, returns 1 if timezone id of arule comes first alphabetically, -1 otherwise","     */","    _BY_OFFSET: function(arule, brule) {","        // sort by offset and then by name","        var delta = arule.standard.offset - brule.standard.offset,","            aname = arule.tzId,","            bname = brule.tzId;","        if (delta === 0) {","            if (aname < bname) { delta = -1; }","            else if (aname > bname) { delta = 1; }","        }","        return delta;","    },","","    _SHORT_NAMES: {},","    _CLIENT2RULE: {},","    /**","     * The data is specified using the server identifiers for historical","     * reasons. Perhaps in the future we'll use the client (i.e. Java)","     * identifiers on the server as well.","     */","    STANDARD_RULES: [],","    DAYLIGHT_RULES: [],","","    /**","     * Generate short name for a timezone like +0530 for IST","     * @method _generateShortName","     * @static","     * @private","     * @param offset {Number} Offset in minutes from GMT","     * @param [period=false] {Boolean} If true, a dot is inserted between hours and minutes","     * @return {String} Short name for timezone","     */","    _generateShortName: function(offset, period) {","        if (offset === 0) { return \"\"; }","        var sign = offset < 0 ? \"-\" : \"+\",","            stdOffset = Math.abs(offset),","            hours = Math.floor(stdOffset / 60),","            minutes = stdOffset % 60;","","        hours = hours < 10 ? '0' + hours : hours;","        minutes = minutes < 10 ? '0' + minutes : minutes;","        return [sign,hours,period?\".\":\"\",minutes].join(\"\");","    },","","    /**","     * Initialized timezone rules. Only for internal use.","     * @method _initTimezoneRules","     * @static","     * @private","     */","    _initTimezoneRules: function() {","        var rule, i, j, array;","","        for (i = 0; i < TimezoneData.TIMEZONE_RULES.length; i++) {","            rule = TimezoneData.TIMEZONE_RULES[i];","            array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","            array.push(rule);","        }","","        TimezoneData.TIMEZONE_RULES.sort(AjxTimezone._BY_OFFSET);","        for (j = 0; j < TimezoneData.TIMEZONE_RULES.length; j++) {","            rule = TimezoneData.TIMEZONE_RULES[j];","            AjxTimezone.addRule(rule);","        }","    },","","    /**","     * Get timezone ids matching raw offset","     * @method getCurrentTimezoneIds","     * @static","     * @param rawOffset {Number} Offset in seconds from GMT","     * @return {Array} timezone ids having the specified offset","     */","    getCurrentTimezoneIds: function(rawOffset) {","        rawOffset = rawOffset/60;	//Need offset in minutes","","        var result = [],","            today = new Date(),","            tzId, link;","","        for(tzId in AjxTimezone._CLIENT2RULE) {","            if(rawOffset === 0 || AjxTimezone.getOffset(tzId, today) === rawOffset) {","                result.push(tzId);","            }","        }","","        for(link in TimezoneLinks) {","            if(Y.Array.indexOf(result,TimezoneLinks[link]) !== -1) {","                result.push(link);","            }","        }","        return result;","    },","","    /**","     * Get the first timezone matching rawOffset","     * @method getTimezoneIdForOffset","     * @static","     * @param rawOffset {Number} offset in seconds from GMT","     * @return {String} tzId of timezone that matches the offset. Returns empty string if no matches found","     */","    getTimezoneIdForOffset: function(rawOffset) {","        rawOffset = rawOffset/60;	//Need offset in minutes","","        var etcGMTId = \"Etc/GMT\",","            today = new Date(),","            tzId;","        ","        if(rawOffset % 60 === 0) {","            if(rawOffset !== 0) {","                etcGMTId += (rawOffset > 0? \"-\": \"+\") + rawOffset/60;","            }","","            if(AjxTimezone._CLIENT2RULE[etcGMTId] !== undefined) {","                return etcGMTId;","            }","        }","	","        for(tzId in AjxTimezone._CLIENT2RULE) {","            if(AjxTimezone.getOffset(tzId, today) === rawOffset) {","                return tzId;","            }","        }","","        return \"\";","    },","","    /**","     * Check whether DST is active at specified date","     * @method isDST","     * @static","     * @param tzId {String} Timezone ID","     * @param date {Date}","     * @return {Number} 1 if DST is active, 0 if not, and -1 if specified timezone does not observe DST","     */","    isDST: function(tzId, date) {","        var rule = AjxTimezone.getRule(tzId),","            year,","            standard, daylight,","            stdTrans, dstTrans,","            month, day,","            stdMonth, stdDay,","            dstMonth, dstDay,","            isDSTActive;","            ","        if (rule && rule.daylight) {","            year = date.getFullYear();","","            standard = rule.standard, daylight  = rule.daylight;","            stdTrans = AjxTimezone.getTransition(standard, year);","            dstTrans = AjxTimezone.getTransition(daylight, year);","","            month    = date.getMonth()+1, day = date.getDate();","            stdMonth = stdTrans[1], stdDay = stdTrans[2];","            dstMonth = dstTrans[1], dstDay = dstTrans[2];","","            // northern hemisphere","            isDSTActive = false;","            if (dstMonth < stdMonth) {","                isDSTActive = month > dstMonth && month < stdMonth;","                isDSTActive = isDSTActive || (month === dstMonth && day >= dstDay);","                isDSTActive = isDSTActive || (month === stdMonth && day <  stdDay);","            }","","            // sorthern hemisphere","            else {","                isDSTActive = month < dstMonth || month > stdMonth;","                isDSTActive = isDSTActive || (month === dstMonth && day <  dstDay);","                isDSTActive = isDSTActive || (month === stdMonth && day >= stdDay);","            }","","            return isDSTActive? 1:0;","        }","        return -1;","    },","","    /**","     * Check whether tzId is a valid timezone","     * @method isValidTimezoneId","     * @static","     * @param tzId {String} Timezone ID","     * @return {Boolean} true if tzId is valid, false otherwise","     */","    isValidTimezoneId: function(tzId) {","        return (AjxTimezone._CLIENT2RULE[tzId] !== undefined || TimezoneLinks[tzId] !== undefined);","    }","});","","Y.mix(AjxTimezone.prototype, {","","    /**","     * Get short name of timezone","     * @method getShortName","     * @param tzId {String} Timezone ID","     * @return {String}","     */","    getShortName: function(tzId) {","        var shortName = this.localeData[tzId + \"_Z_short\"] || [\"GMT\",AjxTimezone._SHORT_NAMES[tzId]].join(\"\");","        return shortName;","    },","","    /**","     * Get medium length name of timezone","     * @method getMediumName","     * @param tzId {String} Timezone ID","     * @return {String}","     */","    getMediumName: function(tzId) {","        var mediumName = this.localeData[tzId + \"_Z_abbreviated\"] || ['(',this.getShortName(tzId),') ',tzId].join(\"\");","        return mediumName;","    },","","    /**","     * Get long name of timezone","     * @method getLongName","     * @param tzId {String} Timezone Id","     * @return {String}","     */","    getLongName: AjxTimezone.prototype.getMediumName","});","","AjxTimezone._initTimezoneRules();","","/**"," * Timezone performs operations on a given timezone string represented in Olson tz database"," * @class Timezone"," * @constructor"," * @param {String} tzId TimeZone ID as in Olson tz database"," */","Y.Date.Timezone = function(tzId) {","    var normalizedId = Timezone.getNormalizedTimezoneId(tzId);","    if(normalizedId === \"\") {","	Y.error(\"Could not find timezone: \" + tzId);","    }","    this.tzId = normalizedId;","","    this._ajxTimeZoneInstance = new AjxTimezone();","};","","Y.namespace(\"Date\");","Timezone = Y.Date.Timezone;","","Y.mix(Timezone, {","    /**","     * Get Day of Year(0-365) for the date passed","     * @method _getDOY","     * @private","     * @static","     * @param {Date} date","     * @return {Number} Day of Year","     */","    _getDOY: function (date) {","        var oneJan = new Date(date.getFullYear(),0,1);","        return Math.ceil((date - oneJan) / 86400000);","    },","","    /**","     * Get integer part of floating point argument","     * @method _floatToInt","     * @static","     * @private","     * @param floatNum {Number} A real number","     * @return {Number} Integer part of floatNum","     */","    _floatToInt: function (floatNum) {","        return (floatNum < 0) ? Math.ceil(floatNum) : Math.floor(floatNum);","    },","","    /**","     * Returns list of timezone Id's that have the same rawOffSet as passed in","     * @method getCurrentTimezoneIds","     * @static","     * @param {Number} rawOffset Raw offset (in seconds) from GMT.","     * @return {Array} array of timezone Id's that match rawOffset passed in to the API.","     */","    getCurrentTimezoneIds: function(rawOffset) {","        return AjxTimezone.getCurrentTimezoneIds(rawOffset);","    },","","    /**","     * Given a raw offset in seconds, get the tz database ID that reflects the given raw offset, or empty string if there is no such ID.","     * Where available, the function will return an ID starting with \"Etc/GMT\".","     * For offsets where no such ID exists but that are used by actual time zones, the ID of one of those time zones is returned.","     * Note that the offset shown in an \"Etc/GMT\" ID is opposite to the value of rawOffset","     * @method getTimezoneIdForOffset","     * @static","     * @param {Number} rawOffset Offset from GMT in seconds","     * @return {String} timezone id","     */","    getTimezoneIdForOffset: function(rawOffset) {","        return AjxTimezone.getTimezoneIdForOffset(rawOffset);","    },","","    /**","     * Given a wall time reference, convert it to UNIX time - seconds since Epoch","     * @method getUnixTimeFromWallTime","     * @static","     * @param {Object} walltime Walltime that needs conversion. Missing properties will be treat as 0.","     * @return {Number} UNIX time - time in seconds since Epoch","     */","    getUnixTimeFromWallTime: function(walltime) {","        /*","         * Initialize any missing properties.","         */","        if(!Y.Lang.isValue( walltime.year )) {","            walltime.year = new Date().getFullYear();	//Default to current year","        }","        if(!Y.Lang.isValue( walltime.mon )) {","            walltime.mon = 0;				//Default to January","        }","        if(!Y.Lang.isValue( walltime.mday )) {","            walltime.mday = 1;				//Default to first of month","        }","        if(!Y.Lang.isValue( walltime.hour )) {			//Default to 12 midnight","            walltime.hour = 0;","        }","        if(!Y.Lang.isValue( walltime.min )) {","            walltime.min = 0;","        }","        if(!Y.Lang.isValue( walltime.sec )) {","            walltime.sec = 0;","        }","        if(!Y.Lang.isValue( walltime.gmtoff )) {			//Default to UTC","            walltime.gmtoff = 0;","        }","","        var utcTime = Date.UTC(walltime.year, walltime.mon, walltime.mday, walltime.hour, walltime.min, walltime.sec);","        utcTime -= walltime.gmtoff*1000;","","        return Timezone._floatToInt(utcTime/1000);	//Unix time: count from midnight Jan 1 1970 UTC","    },","","    /**","     * Checks if the timestamp passed in is a valid timestamp for this timezone and offset.","     * @method isValidTimestamp","     * @static","     * @param {String} timeStamp Time value in UTC RFC3339 format - yyyy-mm-ddThh:mm:ssZ or yyyy-mm-ddThh:mm:ss+/-HH:MM","     * @param {Number} rawOffset An offset from UTC in seconds.","     * @return {Boolean} true if valid timestamp, false otherwise","     */","    isValidTimestamp: function(timeStamp, rawOffset) {","        var regex = /^(\\d\\d\\d\\d)\\-([0-1][0-9])\\-([0-3][0-9])([T ])([0-2][0-9]):([0-6][0-9]):([0-6][0-9])(Z|[+\\-][0-1][0-9]:[0-3][0-9])?$/,","            matches = (new RegExp(regex)).exec(timeStamp),","            year, month, day, hours, minutes, seconds, tZone,","            m31, maxDays,","            dateTimeSeparator, offset;","","        //No match","        if(matches === null) {","            return false;","        }","","        year = parseInt(matches[1], 10),","        month = parseInt(matches[2], 10),","        day = parseInt(matches[3], 10),","        dateTimeSeparator = matches[4],","        hours = parseInt(matches[5], 10),","        minutes = parseInt(matches[6], 10),","        seconds = parseInt(matches[7], 10),","        tZone = matches[8];","        //Month should be in 1-12","        if(month < 1 || month > 12) {","            return false;","        }","","        //Months with 31 days","        m31 = [1,3,5,7,8,10,12];","        maxDays = 30;","        if(Y.Array.indexOf(m31,month) !== -1) {","            maxDays = 31;","        } else if(month === 2) {","            if(year % 400 === 0) {","                maxDays = 29;","            } else if(year % 100 === 0) {","                maxDays = 28;","            } else if(year % 4 === 0) {","                maxDays = 29;","            } else {","                maxDays = 28;","            }","        }","","        //Day should be valid day for month","        if(day < 1 || day > maxDays) {","            return false;","        }","","        //Hours should be in 0-23","        if(hours < 0 || hours > 23) {","            return false;","        }","","        //Minutes and Seconds should in 0-59","        if(minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {","            return false;","        }","","        //Now verify timezone","        if(dateTimeSeparator === \" \" && tZone === undefined) {","            //SQL Format","            return true;","        } else if(dateTimeSeparator === \"T\" && tZone !== undefined) {","            //RFC3339 Format","            offset = 0;","            if(tZone !== \"Z\") {","                //Not UTC TimeZone","                offset = parseInt(tZone.substr(1,3), 10)*60 + parseInt(tZone.substr(4), 10);","                offset = offset*60;	//To seconds","","                offset = offset * (tZone.charAt(0) === \"+\" ? 1 : -1);","            }","            //Check offset in timeStamp with passed rawOffset","            if(offset === rawOffset) {","                return true;","            }","        }","","        //If reached here, wrong format","        return false;","    },","","    /**","     * Checks if tzId passed in is a valid Timezone id in tz database.","     * @method isValidTimezoneId","     * @static","     * @param {String} tzId timezoneId to be checked for validity","     * @return {Boolean} true if tzId is a valid timezone id in tz database.","               tzId could be a \"zone\" id or a \"link\" id to be a valid tz Id. False otherwise","     */","    isValidTimezoneId: function(tzId) {","        return AjxTimezone.isValidTimezoneId(tzId);","    },","","    /**","     * Returns the normalized version of the time zone ID, or empty string if tzId is not a valid time zone ID.","     * If tzId is a link Id, the standard name will be returned.","     * @method getNormalizedTimezoneId","     * @static","     * @param {String} tzId The timezone ID whose normalized form is requested.","     * @return {String} The normalized version of the timezone Id, or empty string if tzId is not a valid time zone Id.","     */","    getNormalizedTimezoneId: function(tzId) {","        if(!Timezone.isValidTimezoneId(tzId)) {","            return \"\";","        }","        var normalizedId,","            next = tzId;","","        do {","            normalizedId = next;","            next = TimezoneLinks[normalizedId];","        } while( next !== undefined );","","        return normalizedId;","    }","});","","Y.mix(Timezone.prototype, {","    /**","     * Parse RFC3339 date format and return the Date","     * Format: yyyy-mm-ddThh:mm:ssZ","     * @method _parseRFC3339","     * @private","     * @param {String} dString The date string to be parsed","     * @return {Date} The date represented by dString","     */","    _parseRFC3339: function(dString){","        var regexp = /(\\d+)(\\-)?(\\d+)(\\-)?(\\d+)(T)?(\\d+)(:)?(\\d+)(:)?(\\d+)(\\.\\d+)?(Z|([+\\-])(\\d+)(:)?(\\d+))/,","            result = new Date(),","            d = dString.match(regexp),","            offset = 0;","","        result.setUTCDate(1);","        result.setUTCFullYear(parseInt(d[1],10));","        result.setUTCMonth(parseInt(d[3],10) - 1);","        result.setUTCDate(parseInt(d[5],10));","        result.setUTCHours(parseInt(d[7],10));","        result.setUTCMinutes(parseInt(d[9],10));","        result.setUTCSeconds(parseInt(d[11],10));","        if (d[12]) {","            result.setUTCMilliseconds(parseFloat(d[12]) * 1000);","        } else {","            result.setUTCMilliseconds(0);","        }","        if (d[13] !== 'Z') {","            offset = (d[15] * 60) + parseInt(d[17],10);","            offset *= ((d[14] === '-') ? -1 : 1);","            result.setTime(result.getTime() - offset * 60 * 1000);","        }","        return result;","    },","","    /**","     * Parse SQL date format and return the Date","     * Format: yyyy-mm-dd hh:mm:ss","     * @method _parseSQLFormat","     * @private","     * @param {String} dString The date string to be parsed","     * @return {Date} The date represented by dString","     */","    _parseSQLFormat: function(dString) {","        var dateTime = dString.split(\" \"),","            date = dateTime[0].split(\"-\"),","            time = dateTime[1].split(\":\"),","            offset = AjxTimezone.getOffset(this.tzId, new Date(date[0], date[1] - 1, date[2]));","            ","        return new Date(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) - offset*60*1000);","    },","","    /**","     * Return a short name for the timezone","     * @method getShortName","     * @return {String} Short name","     */","    getShortName: function() {","        return this._ajxTimeZoneInstance.getShortName(this.tzId);","    },","","    /**","     * Return a medium length name for the timezone","     * @method getMediumName","     * @return {String} Medium length name","     */","    getMediumName: function() {","        return this._ajxTimeZoneInstance.getMediumName(this.tzId);","    },","","    /**","     * Return a long name for the timezone","     * @method getLongName","     * @return {String} Long name","     */","    getLongName: function() {","        return this._ajxTimeZoneInstance.getLongName(this.tzId);","    },","","    /**","     * Given a timevalue representation in RFC 3339 or SQL format, convert to UNIX time - seconds since Epoch ie., since 1970-01-01T00:00:00Z","     * @method convertToIncrementalUTC","     * @param {String} timeValue TimeValue representation in RFC 3339 or SQL format.","     * @return {Number} UNIX time - time in seconds since Epoch","     */","    convertToIncrementalUTC: function(timeValue) {","        if(Y.Array.indexOf(timeValue,\"T\") !== -1) {","            //RFC3339","            return this._parseRFC3339(timeValue).getTime() / 1000;","        } else {","            //SQL","            return this._parseSQLFormat(timeValue).getTime() / 1000;","        }","    },","","    /**","     * Given UNIX time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to RFC3339 format - \"yyyy-mm-ddThh:mm:ssZ\"","     * @method convertUTCToRFC3339Format","     * @param {Number} timeValue time value in seconds since Epoch.","     * @return {String} RFC3339 format timevalue - \"yyyy-mm-ddThh:mm:ssZ\"","     */","    convertUTCToRFC3339Format: function(timeValue) {","        var uTime = new Date(timeValue * 1000),","            offset = AjxTimezone.getOffset(this.tzId, uTime),","            offsetString = \"Z\",","            rfc3339, offsetSign;","","        if(offset !== 0) {","            offsetSign = (offset > 0 ? \"+\": \"-\");","            offsetString = offsetSign + Y.Number._zeroPad(Math.abs(Timezone._floatToInt(offset/60)), 2) + \":\" + Y.Number._zeroPad(offset % 60, 2);","        }","","        uTime.setTime(timeValue*1000 + offset*60*1000);","","        rfc3339 = Y.Number._zeroPad(uTime.getUTCFullYear(), 4) + \"-\"","                      + Y.Number._zeroPad((uTime.getUTCMonth() + 1), 2) + \"-\" + Y.Number._zeroPad(uTime.getUTCDate(), 2)","                      + \"T\" + Y.Number._zeroPad(uTime.getUTCHours(), 2) + \":\" + Y.Number._zeroPad(uTime.getUTCMinutes(), 2)","                      + \":\" + Y.Number._zeroPad(uTime.getUTCSeconds(), 2) + offsetString;","","        return rfc3339;","    },","","    /**","     * Given UNIX Time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to SQL Format - \"yyyy-mm-dd hh:mm:ss\"","     * @method convertUTCToSQLFormat","     * @param {Number} timeValue time value in seconds since Epoch.","     * @return {String} SQL Format timevalue - \"yyyy-mm-dd hh:mm:ss\"","     */","    convertUTCToSQLFormat: function(timeValue) {","        var uTime = new Date(timeValue * 1000),","            offset = AjxTimezone.getOffset(this.tzId, uTime),","            sqlDate;","            ","        uTime.setTime(timeValue*1000 + offset*60*1000);","","        sqlDate = Y.Number._zeroPad(uTime.getUTCFullYear(), 4) + \"-\" + Y.Number._zeroPad((uTime.getUTCMonth() + 1), 2)","                      + \"-\" + Y.Number._zeroPad(uTime.getUTCDate(), 2) + \" \" + Y.Number._zeroPad(uTime.getUTCHours(), 2)","                      + \":\" + Y.Number._zeroPad(uTime.getUTCMinutes(), 2) + \":\" + Y.Number._zeroPad(uTime.getUTCSeconds(), 2);","","        return sqlDate;","    },","","    /**","     * Gets the offset of this timezone in seconds from UTC","     * @method getRawOffset","     * @return {Number} offset of this timezone in seconds from UTC","     */","    getRawOffset: function() {","        return AjxTimezone.getOffset(this.tzId, new Date()) * 60;","    },","","    /**","     * Given a unix time, convert it to wall time for this timezone.","     * @method getWallTimeFromUnixTime","     * @param {Number} timeValue value in seconds from Epoch.","     * @return {Object} an object with the properties: sec, min, hour, mday, mon, year, wday, yday, isdst, gmtoff, zone.","           All of these are integers except for zone, which is a string. isdst is 1 if DST is active, and 0 if DST is inactive.","     */","    getWallTimeFromUnixTime: function(timeValue) {","        var offset = AjxTimezone.getOffset(this.tzId, new Date(timeValue*1000)) * 60,","            localTimeValue = timeValue + offset,","            date = new Date(localTimeValue*1000),","            walltime = {","                sec: date.getUTCSeconds(),","                min: date.getUTCMinutes(),","                hour: date.getUTCHours(),","                mday: date.getUTCDate(),","                mon: date.getUTCMonth(),","                year: date.getUTCFullYear(),","                wday: date.getUTCDay(),","                yday: Timezone._getDOY(date),","                isdst: AjxTimezone.isDST(this.tzId, new Date(timeValue)),","                gmtoff: offset,","                zone: this.tzId","            };","","        return walltime;","    }","});","/**"," * This module provides absolute/relative date and time formatting, as well as duration formatting"," * Applications can choose date, time, and time zone components separately."," * For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported."," *"," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," *"," * Absolute formats use the default calendar specified in CLDR for each locale."," * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags;"," * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory."," *"," * Relative time formats only support times in the past. It can represent times like \"1 hour 5 minutes ago\""," *"," * @module datatype-date-advanced-format"," * @requires datatype-date-timezone, datatype-date-format, datatype-number-advanced-format"," */","","ShortNames = {","        \"weekdayMonShort\":\"M\",","        \"weekdayTueShort\":\"T\",","        \"weekdayWedShort\":\"W\",","        \"weekdayThuShort\":\"T\",","        \"weekdayFriShort\":\"F\",","        \"weekdaySatShort\":\"S\",","        \"weekdaySunShort\":\"S\",","        \"monthJanShort\":\"J\",","        \"monthFebShort\":\"F\",","        \"monthMarShort\":\"M\",","        \"monthAprShort\":\"A\",","        \"monthMayShort\":\"M\",","        \"monthJunShort\":\"J\",","        \"monthJulShort\":\"J\",","        \"monthAugShort\":\"A\",","        \"monthSepShort\":\"S\",","        \"monthOctShort\":\"O\",","        \"monthNovShort\":\"N\",","        \"monthDecShort\":\"D\"","};","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified pattern."," * The patterns are defined the same as the SimpleDateFormat class in the Java libraries."," *"," * Note:"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended"," * pattern found in the Common Locale Data Repository (CLDR) found at:"," * http://www.unicode.org/cldr/."," *"," * @class __zDateFormat"," * @extends Number.__BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern === null) {","        return;","    }","    var head, tail, segment, i, c, count, field;","    for (i = 0; i < pattern.length; i++) {","        // literal","        c = pattern.charAt(i);","        if (c === \"'\") {","            head = i + 1;","            for (i++ ; i < pattern.length; i++) {","                c = pattern.charAt(i);","                if (c === \"'\") {","                    if (i + 1 < pattern.length && pattern.charAt(i + 1) === \"'\") {","                        pattern = pattern.substr(0, i) + pattern.substr(i + 1);","                    }","                    else {","                        break;","                    }","                }","            }","            if (i === pattern.length) {","		Y.error(\"unterminated string literal\");","            }","            tail = i;","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            continue;","        }","","        // non-meta chars","        head = i;","        while(i < pattern.length) {","            c = pattern.charAt(i);","            if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === \"'\") {","                break;","            }","            i++;","        }","        tail = i;","        if (head !== tail) {","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            i--;","            continue;","        }","		","        // meta char","        head = i;","        while(++i < pattern.length) {","            if (pattern.charAt(i) !== c) {","                break;","            }","        }","        tail = i--;","        count = tail - head;","        field = pattern.substr(head, count);","        segment = null;","        switch (c) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        if (segment !== null) {","            segment._index = this._segments.length;","            this._segments.push(segment);","        }","    }","};","","DateFormat = Y.Date.__zDateFormat;","Y.extend(DateFormat, Format);","","// Constants","","Y.mix(DateFormat, {","	SHORT: 0,","	MEDIUM: 1,","	LONG: 2,","	DEFAULT: 1,","	_META_CHARS: \"GyMwWDdFEaHkKhmsSzZ\"","});","","/**"," * Format the date"," * @method format"," * @param object {Date} The date to be formatted"," * @param [relative=false] {Boolean} Whether relative dates should be used."," * @return {String} Formatted result"," */","DateFormat.prototype.format = function(object, relative) {","    var useRelative = false,","        s = [],","        datePattern = false,","        i;","","    if(relative !== null && relative !== \"\") {","        useRelative = true;","    }","","    for (i = 0; i < this._segments.length; i++) {","        //Mark datePattern sections in case of relative dates","        if(this._segments[i].toString().indexOf(\"text: \\\"<datePattern>\\\"\") === 0) {","            if(useRelative) {","                s.push(relative);","            }","            datePattern = true;","            continue;","        }","        if(this._segments[i].toString().indexOf(\"text: \\\"</datePattern>\\\"\") === 0) {","            datePattern = false;","            continue;","        }","        if(!datePattern || !useRelative) {","            s.push(this._segments[i].format(object));","        }","    }","    return s.join(\"\");","};","","//","// Date segment class","//","","/**"," * Date Segment in the pattern"," * @class DateSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.DateSegment = function(format, s) {","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","/**"," * Era Segment in the pattern"," * @class EraSegment"," * @for Date.__DateFormat"," * @namespace Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.EraSegment = function(format, s) {","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","/**"," * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD"," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.EraSegment.prototype.format = function(/*date*/) {","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","/**"," * Year Segment in the pattern"," * @class YearSegment"," * @namespace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.YearSegment = function(format, s) {","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.YearSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateYear: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the year segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var year = String(date.getFullYear());","        return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);","    }","}, true);","","//","// Date month segment class","//","","/**"," * Month Segment in the pattern"," * @class MonthSegment"," * @namepspace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.MonthSegment = function(format, s) {","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.MonthSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateMonth: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.MonthSegment.MONTHS = {};","        DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,","            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,","            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,","            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium","        ];","        DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,","            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,","            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,","            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong","        ];","    },","","    /**","     * Format date and get the month segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var month = date.getMonth();","        switch (this._s.length) {","            case 1:","                return String(month + 1);","            case 2:","                return Y.Number._zeroPad(month + 1, 2);","            case 3:","                return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","            case 5:","                return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","        }","        return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","    }","}, true);","","//","// Date week segment class","//","","/**"," * Week Segment in the pattern"," * @class WeekSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekSegment = function(format, s) {","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","/**"," * Format date and get the week segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear(),","        month = date.getMonth(),","        day = date.getDate(),","	ofYear = /w/.test(this._s),","        date2 = new Date(year, ofYear ? 0 : month, 1),","        week = 0;","    while (true) {","        week++;","        if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {","            break;","        }","        date2.setDate(date2.getDate() + 7);","    }","","    return Y.Number._zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","/**"," * Day Segment in the pattern"," * @class DaySegment"," * @namespace Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.DaySegment = function(format, s) {","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","/**"," * Format date and get the day segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth(),","        day = date.getDate(),","        year = date.getYear(),","        date2;","","    if (/D/.test(this._s) && month > 0) {","        do {","            // set date to first day of month and then go back one day","            date2 = new Date(year, month, 1);","            date2.setDate(0);","			","            day += date2.getDate();","            month--;","        } while (month > 0);","    }","    return Y.Number._zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","/**"," * Weekday Segment in the pattern"," * @class WeekdaySegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekdaySegment = function(format, s) {","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","Y.mix(DateFormat.WeekdaySegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateDay: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.WeekdaySegment.WEEKDAYS = {};","        // NOTE: The short names aren't available in Java so we have to define them.","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","            ShortNames.weekdaySatShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,","            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,","            Formats.weekdaySatMedium","        ];","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,","            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,","            Formats.weekdaySatLong","        ];","    },","","    /**","     * Format date and get the weekday segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var weekday = date.getDay(),","            style;","        if (/E/.test(this._s)) {","            switch (this._s.length) {","                case 4:","                    style = DateFormat.LONG;","                    break;","                case 5:","                    style = DateFormat.SHORT;","                    break;","                default:","                    style = DateFormat.MEDIUM;","            }","            return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","        }","        return Y.Number._zeroPad(weekday, this._s.length);","    }","}, true);","","//","// Time segment class","//","","/**"," * Time Segment in the pattern"," * @class TimeSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimeSegment = function(format, s) {","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Y.Number.__BaseFormat.Segment);","","//","// Time hour segment class","//","","/**"," * Hour Segment in the pattern"," * @class HourSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.HourSegment = function(format, s) {","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.HourSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeHour: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the hour segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        if (hours > 12 && /[hK]/.test(this._s)) {","            hours -= 12;","        }","        else if (hours === 0 && /[h]/.test(this._s)) {","            hours = 12;","        }","        /***","            // NOTE: This is commented out to match the Java formatter output","            //       but from the comments for these meta-chars, it doesn't","            //       seem right.","            if (/[Hk]/.test(this._s)) {","                hours--;","            }","        /***/","        return Y.Number._zeroPad(hours, this._s.length);","    }","}, true);","","//","// Time minute segment class","//","","/**"," * Minute Segment in the pattern"," * @class MinuteSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.MinuteSegment = function(format, s) {","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.MinuteSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeMinute: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the minute segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var minutes = date.getMinutes();","        return Y.Number._zeroPad(minutes, this._s.length);","    }","}, true);","","//","// Time second segment class","//","","/**"," * Second Segment in the pattern"," * @class SecondSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.SecondSegment = function(format, s) {","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","/**"," * Format date and get the second segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return Y.Number._zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","/**"," * AM/PM Segment in the pattern"," * @class AmPmSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.AmPmSegment = function(format, s) {","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.AmPmSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeAmPm: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the AM/PM segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","    }","}, true);","","//","// Time timezone segment class","//","","/**"," * TimeZone Segment in the pattern"," * @class TimezoneSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimezoneSegment = function(format, s) {","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.TimezoneSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeTimezone: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the timezone segment.","     * @method format","     * //param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(/*date*/) {","        var timeZone = this.getFormat().timeZone;","        if (/Z/.test(this._s)) {","            return timeZone.getShortName();","        }","        return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();","    }","}, true);","    ","//","// Non-Gregorian Calendars","//","","/*"," * Buddhist Calendar. This is normally used only for Thai locales (th)."," * @class __BuddhistDateFormat"," * @namespace Date"," * @extends __zDateFormat"," * @constructor"," * @private"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments, i;","    for(i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","};","","BuddhistDateFormat = Y.Date.__BuddhistDateFormat;","Y.extend(BuddhistDateFormat, DateFormat);","    ","/**"," * YearSegment class for Buddhist Calender"," * @class YearSegment"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.YearSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.YearSegment}"," */","BuddhistDateFormat.YearSegment = function(segment) {","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","/**"," * Format date and get the year segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.YearSegment.prototype.format = function(date) {","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);","};","    ","/**"," * EraSegment class for Buddhist Calender"," * @class EraSegment"," * @for Date.__BuddhistDateFormat"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.EraSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.EraSegment}"," */","BuddhistDateFormat.EraSegment = function(segment) {","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","/**"," * Format date and get the era segment."," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {","    return \"BE\";    //Only Buddhist Era supported for now","};","","/**"," * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU"," * @class __YDateFormat"," * namespace Date"," * @private"," * @constructor"," * @param {String} [timeZone='Etc/GMT'] TZ database ID for the time zone that should be used."," * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS."," * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS."," * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS."," */","Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone === undefined || timeZone === null) {","        timeZone = \"Etc/GMT\";","    }","","    this._Formats = Y.Intl.get(MODULE_NAME);","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","	Y.error(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat || 0;","    this._timeFormat = timeFormat || 0;","    this._timeZoneFormat = timeZoneFormat || 0;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(MODULE_NAME);","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }","};","","YDateFormat = Y.Date.__YDateFormat;","","Y.mix(Y.Date, {","    /**","     * Date Format Style values to use during format/parse","     * @property DATE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","","    /**","     * Time Format Style values to use during format/parse","     * @property TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","","    /**","     * Timezone Format Style values to use during format/parse","     * @property TIMEZONE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    }","});","","Y.mix(YDateFormat.prototype, {","    /**","     * Generate date pattern for selected format. For internal use only.","     * @method _generateDatePattern","     * @for Date.__YDateFormat","     * @private","     * @return {String} Date pattern","     */","    _generateDatePattern: function() {","        var format = this._dateFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.DATE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        /*jshint bitwise: false*/","        if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","            this._relative = true;","            format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","        }","        /*jshint bitwise: true*/","        switch(format) {","            //Use relative only for formats with day component","            case Y.Date.DATE_FORMATS.NONE:","                this._relative = false;","                return \"\";","            case Y.Date.DATE_FORMATS.WYMD_LONG:","                return this._Formats.WYMD_long;","            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","                return this._Formats.WYMD_abbreviated;","            case Y.Date.DATE_FORMATS.WYMD_SHORT:","                return this._Formats.WYMD_short;","            case Y.Date.DATE_FORMATS.WMD_LONG:","                return this._Formats.WMD_long;","            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","                return this._Formats.WMD_abbreviated;","            case Y.Date.DATE_FORMATS.WMD_SHORT:","                return this._Formats.WMD_short;","            case Y.Date.DATE_FORMATS.YMD_LONG:","                return this._Formats.YMD_long;","            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","                return this._Formats.YMD_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_SHORT:","                return this._Formats.YMD_short;","            case Y.Date.DATE_FORMATS.YM_LONG:","                this._relative = false;","                return this._Formats.YM_long;","            case Y.Date.DATE_FORMATS.MD_LONG:","                return this._Formats.MD_long;","            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","                return this._Formats.MD_abbreviated;","            case Y.Date.DATE_FORMATS.MD_SHORT:","                return this._Formats.MD_short;","            case Y.Date.DATE_FORMATS.W_LONG:","                this._relative = false;","                return this._Formats.W_long;","            case Y.Date.DATE_FORMATS.W_ABBREVIATED:","                this._relative = false;","                return this._Formats.W_abbreviated;","            case Y.Date.DATE_FORMATS.M_LONG:","                this._relative = false;","                return this._Formats.M_long;","            case Y.Date.DATE_FORMATS.M_ABBREVIATED:","                this._relative = false;","                return this._Formats.M_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_FULL:","                return this._Formats.YMD_full;","            default:","                Y.error(\"Date format given does not exist\");	//Error no such pattern.","        }","    },","        ","    /**","     * Generate time pattern for selected format. For internal use only","     * @method _generateTimePattern","     * @private","     * @return {String} Time pattern","     */","    _generateTimePattern: function() {","        var format = this._timeFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIME_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIME_FORMATS.NONE:","                return \"\";","            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","                return this._Formats.HM_abbreviated;","            case Y.Date.TIME_FORMATS.HM_SHORT:","                return this._Formats.HM_short;","            case Y.Date.TIME_FORMATS.H_ABBREVIATED:","                return this._Formats.H_abbreviated;","            default:","                Y.error(\"Time format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate time-zone pattern for selected format. For internal use only.","     * @method _generateTimeZonePattern","     * @private","     * @return {String} Time-Zone pattern","     */","    _generateTimeZonePattern: function() {","        var format = this._timeZoneFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIMEZONE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIMEZONE_FORMATS.NONE:","                return \"\";","            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","                return \"z\";","            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","                return \"Z\";","            default:","                Y.error(\"Time Zone format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate pattern for selected date, time and time-zone formats. For internal use only","     * @method _generatePattern","     * @private","     * @return {String} Combined pattern for date, time and time-zone","     */","    _generatePattern: function() {","        var datePattern = this._generateDatePattern(),","            timePattern = this._generateTimePattern(),","            timeZonePattern = this._generateTimeZonePattern(),","            pattern = \"\";","","        //Combine patterns. Mark date pattern part, to use with relative dates.","        if(datePattern !== \"\") {","            datePattern = \"'<datePattern>'\" + datePattern + \"'</datePattern>'\";","        }","        ","        if(timePattern !== \"\" && timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimeTimezoneCombination;","        } else if (timePattern !== \"\") {","            pattern = this._Formats.DateTimeCombination;","        } else if(timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimezoneCombination;","        } else if(datePattern !== \"\"){","            //Just date","            pattern = \"{1}\";","        }","        ","        pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","        //Remove unnecessary whitespaces","        pattern = Y.Lang.trim(pattern.replace(/\\s\\s+/g, \" \"));","","        return pattern;","    },","","    /**","     * Formats a date","     * @method format","     * @param {Date} date The date to be formatted.","     * @return {String} The formatted string","     */","    format: function(date) {","        if(date === null || !Y.Lang.isDate(date)) {","            Y.error(\"format called without a date.\");","        }","        ","        var offset = this._timeZoneInstance.getRawOffset() * 1000,","            relativeDate = null,","            today = new Date(),","            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),","            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","","        date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","        ","        if(this._relative) {","            if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {","                relativeDate = this._Formats.today;","            }","","            if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {","                relativeDate = this._Formats.tomorrow;","            }","","            if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {","                relativeDate = this._Formats.yesterday;","            }","        }","        return this._dateFormatInstance.format(date, relativeDate);","    }","}, true);","/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," */","","/**"," * Class to handle relative time formatting"," * @class __YRelativeTimeFormat"," * @namespace Date"," * @private"," * @constructor"," * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS"," */","Y.Date.__YRelativeTimeFormat = function(style) {","    if(style === null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    } else if(Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","        ","    this.patterns = Y.Intl.get(MODULE_NAME);","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            Y.error(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","};","","YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;","","Y.mix(Y.Date, {","    /**","     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.","     * @property","     * @type Number|function","     * @static","     */","    currentDate: function() { return new Date(); },","","    /**","     * Format Style values to use during format/parse","     * @property RELATIVE_TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","	","/**"," * Formats a time value."," * @method format"," * @for Date.__YRelativeTimeFormat"," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.","          It must be greater than or equal to timeValue"," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo === null) {","        relativeTo = (new Date()).getTime()/1000;","        if(timeValue > relativeTo) {","            Y.error(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        Y.error(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000),","        result = [],","        numUnits = this.numUnits,","        value = date.getUTCFullYear() - 1970,	//Need zero-based index","        text, pattern, i;","        ","    if(value > 0) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.years : this.patterns.year);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMonth();","    if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.months : this.patterns.month);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCDate()-1;			//Need zero-based index","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.days : this.patterns.day);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCHours();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.hours : this.patterns.hour);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMinutes();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes : this.patterns.minute);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCSeconds();","    if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds : this.patterns.second);","            result.push(text);","        }","        numUnits--;","    }","","    pattern = (result.length === 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(i=0; i<result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", result[i]);","    }","    for(i=result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = Y.Lang.trim(pattern.replace(/\\s+/g, \" \"));","        ","    return pattern;","};","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages."," */","","Y.mix(Y.Number, {","    /**","     * Strip decimal part of argument and return the integer part","     * @method _stripDecimals","     * @static","     * @private","     * @for Number","     * @param floatNum A real number","     * @return Integer part of floatNum","     */","    _stripDecimals: function (floatNum) {","        return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","    }","});","","/**"," * YDurationFormat class formats time in a language independent manner."," * @class __YDurationFormat"," * @namespace Date"," * @private"," * @constructor"," * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS"," */","Y.Date.__YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(MODULE_NAME);","};","","YDurationFormat = Y.Date.__YDurationFormat;","","Y.mix(Y.Date, {","    /**","     * Format Style values to use during format/parse of Duration values","     * @property DURATION_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","","Y.mix(YDurationFormat, {","    /**","     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds","     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short","     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used","     * @method _getDuration_XML","     * @static","     * @private","     * @for Date.__YDurationFormat","     * @param {String} xmlDuration XML Duration String.","     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,","     *      where nY represents the number of years, nM the number of months, nD the number of days,","     *      'T' is the date/time separator,","     *      nH the number of hours, nM the number of minutes and nS the number of seconds.","     *      The number of seconds can include decimal digits to arbitrary precision.","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_XML: function (xmlDuration) {","        var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/),","            matches = xmlDuration.match(regex);","        ","        if(matches === null) {","            Y.error(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","        }","        ","        return {","            hours: parseInt(matches[4] || -1, 10),","            minutes: parseInt(matches[5] || -1, 10),","            seconds: parseFloat(matches[6] || -1, 10)","        };","    },","    ","    /**","     * Get duration from time in seconds.","     * The value should be integer value in seconds, and should not be negative.","     * @method _getDuration_Seconds","     * @static","     * @private","     * @param {Number} timeValueInSeconds Duration in seconds","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_Seconds: function (timeValueInSeconds) {","        var duration = {};","        if(timeValueInSeconds < 0) {","            Y.error(\"TimeValue cannot be negative\");","        }","                ","        duration.hours = Y.Number._stripDecimals(timeValueInSeconds / 3600);","                ","        timeValueInSeconds %= 3600;","        duration.minutes = Y.Number._stripDecimals(timeValueInSeconds / 60);","                ","        timeValueInSeconds %= 60;","        duration.seconds = timeValueInSeconds;","        ","        return duration;","    }","});","    ","/**"," * Formats the given value into a duration format string."," * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS."," * Please note that year, month and day fields are ignored in this version."," * For future compatibility, please do not pass Year/Month/Day in the parameter."," *"," * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,"," * but are treated as 0 in HMS_short format style."," *"," * @method"," * @private"," * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),","          XML duration format (String), or an object with hours, minutes and seconds"," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function(oDuration) {","    if(Y.Lang.isNumber(oDuration)) {","        oDuration = YDurationFormat._getDuration_Seconds(oDuration);","    } else if(Y.Lang.isString(oDuration)) {","        oDuration = YDurationFormat._getDuration_XML(oDuration);","    }","    ","    var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,","        result = {","            hours: \"\",","            minutes: \"\",","            seconds: \"\"","        },","        resultPattern = \"\";","","    if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }","    if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }","    if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }","   ","    //Test minutes and seconds for invalid values","    if(oDuration.minutes > 59 || oDuration.seconds > 59) {","        Y.error(\"Minutes and Seconds should be less than 60\");","    }","    ","    if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {","        resultPattern = this.patterns.HMS_long;","        if(oDuration.hours >= 0) {","            result.hours = Y.Number.format(oDuration.hours) + \" \" + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);","        }","","        if(oDuration.minutes >= 0) {","            result.minutes = oDuration.minutes + \" \" + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);","        }","","        if(oDuration.seconds >= 0) {","            result.seconds = oDuration.seconds + \" \" + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        resultPattern = this.patterns.HMS_short;","        result = {","             hours: Y.Number.format(oDuration.hours),","             minutes: Y.Number._zeroPad(oDuration.minutes, 2),","             seconds: Y.Number._zeroPad(oDuration.seconds, 2)","        };","    }","        ","    resultPattern = resultPattern.replace(\"{0}\", result.hours);","    resultPattern = resultPattern.replace(\"{1}\", result.minutes);","    resultPattern = resultPattern.replace(\"{2}\", result.seconds);","       ","    //Remove unnecessary whitespaces","    resultPattern = Y.Lang.trim(resultPattern.replace(/\\s\\s+/g, \" \"));","       ","    return resultPattern;","};","","Y.Date.oldFormat = Y.Date.format;","","Y.mix(Y.Date, {","    /**","     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.","     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate","     * Configuration object can have 4 optional parameters:","     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.","     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.","     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.","     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.","     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.","                           If this parameter is used, the other three will be ignored.","     * @for Date","     * @method format","     * @param oDate {Date} Date","     * @param [oConfig] {Object} Object literal of configuration values.","     * @return {String} string representation of the date","     * @example","            var date = new Date();","            Y.Date.format(date, { timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\", timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\" });","            Y.Date.format(date, { relativeTimeFormat: \"ONE_OR_TWO_UNITS_LONG\" });","            Y.Date.format(date, { format: \"%Y-%m-%d\"});","     */","    format: function(oDate, oConfig) {","        oConfig = oConfig || {};","        if(oConfig.format && Y.Lang.isString(oConfig.format)) {","            return Y.Date.oldFormat(oDate, oConfig);","        }","    ","        if(!Y.Lang.isDate(oDate)) {","            return Y.Lang.isValue(oDate) ? oDate : \"\";","        }","                ","        var formatter, relativeTo;","        if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {","            formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","            return formatter.format(oDate);","        }","    ","        relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","        if(oConfig.relativeTimeFormat) {","            formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","            return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","        }","","        Y.error(\"Unrecognized format options.\");","    },","","    /**","     * Returns a string representation of the duration","     * @method format","     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds","     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.","                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS","     * @return {String} string representation of the duration","     * @example","                Y.Date.formatDuration(3601, { style: \"HMS_LONG\" });","                Y.Date.formatDuration(\"PT11H22M33S\", { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: \"HMS_LONG\" });","     */","    formatDuration: function(oDuration, oConfig) {","        oConfig = oConfig || {};","        return new YDurationFormat(oConfig.style).format(oDuration);","    }","}, true);","/**"," * ListFormatter formats lists with locale dependent rules."," * For example, in locale en, lists are formatted into a"," * string of comma-separated values"," * @class ListFormatter"," * @namespace Intl"," * @static"," */","ListFormatter = {","    /**","     * Substitute items into corrrect positions in pattern","     * For internal use only","     * @method __sub","     * @private","     * @static","     * @param pattern {String} The pattern","     * @param item0 {String} item to replace {0} in pattern","     * @param item1 {String} item to replace {1} in pattern","     * @return {String} Result string after substitutions","     */","    __sub: function(pattern, item0, item1) {","         return pattern.replace(\"{0}\", item0).replace(\"{1}\", item1);","    },","","    /**","     * Format list into string","     * @method format","     * @static","     * @param list {Array} The list to be formatted","     * @return {String} formatted result","     */","    format: function(list) {","         if(!Y.Lang.isArray(list)) { return \"\"; }","        ","         var localeData = Y.Intl.get(MODULE_NAME),","             middle = localeData.listPatternMiddle || \"{0}, {1}\",","             start = localeData.listPatternStart || middle,","             end = localeData.listPatternEnd,","             two = localeData.listPatternTwo || end,","             len = list.length,","             result, i;","","         if(len === 0) { return \"\"; }","         if(len === 1) { return list[0]; }","         if(len === 2) {","             return ListFormatter.__sub(two, list[0], list[1]);","         }","","         result = ListFormatter.__sub(start, list[0], list[1]);","         for(i=2; i<len-1; i++) {","              result = ListFormatter.__sub(middle, result, list[i]);","         }","         result = ListFormatter.__sub(end, result, list[i]);","","         return result;","    }","};","","Y.Intl.ListFormatter = ListFormatter;","/**"," * Formatter base class"," * @class MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgBaseFormatter = function(values) {","    this.values = values;","};","","Formatter = Y.Intl.MsgBaseFormatter;","","Y.mix(Formatter.prototype, {","    /**","     * Get value of key","     * @method getValue","     * @param key {String|Number} Key/index of value in the object/array 'values'","     * @return Value from the data in 'values'","     */","    getValue: function(key) {","        if(Y.Lang.isArray(this.values)) {","            key = parseInt(key, 10);","        }","        return this.values[key];","    },","","    /**","     * Get value of params.key","     * The value found will be set to params.value","     * @method getParams","     * @param params {Object} Object containing key as in { key: \"KEY\" }","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params) {","        if(!params || !params.key) {","            return false;","        }","","        var value = this.getValue(params.key);","	","        if(value !== undefined) {","            params.value = value;","            return true;","        }","","        return false;","    },","","    /**","     * Format string. Will be overridden in descendants","     * @method format","     */","    format: function(/*str, config*/) {","        Y.error('Not implemented');	//Must override in descendants","    }","});","","//For date and time formatters","Y.mix(Formatter, {","    /**","     * Create an instance of the formatter","     * @method createInstance","     * @static","     * //param values {Array|Object} The data to be processed and inserted.","     */","    createInstance: function(/*values*/) {","        //return new Formatter(values);","        Y.error('Not implemented');	//Must override in descendants","    },","","    /**","     * Get current timezone. Used for time format","     * @method getCurrentTimeZone","     * @return {Y.Date.Timezone}","     */","    getCurrentTimeZone: function() {","        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;","        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);","    }","});","/**"," * String formatter"," * @class StringFormatter"," * @namespace Intl"," * @extends MsgBaseFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.StringFormatter = function(values) {","    StringFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*}\";","};","","StringFormatter = Y.Intl.StringFormatter;","Y.extend(StringFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","StringFormatter.createInstance = function(values) {","    return new StringFormatter(values);","};","","Y.mix(StringFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches && matches[1]) {","            params.key = matches[1];","            if(Formatter.prototype.getParams.call(this, params)) {","                return true;","            }","        }","	","        return false;","    },","","    /**","     * Format all instances in str that can be handled by StringFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                str = str.replace(matches[0], params.value);","            }","","        }","","        return str;","    }","}, true);/**"," * Date formatter"," * @class DateFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.DateFormatter = function(values) {","    DateFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],","        \"medium\": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],","        \"long\":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],","        \"full\":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*date\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","DateFormatter = Y.Intl.DateFormatter;","Y.extend(DateFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","DateFormatter.createInstance = function(values) {","    return new DateFormatter(values);","};","","Y.mix(DateFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"medium\";","        }			//If no style, default to medium","","        if(!this.styles[params.style]) {","            return false;","        }	//Invalid style","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by DateFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting","     * @return {String} Formatted result","     */","    format: function(str, config) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, style, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                style = this.styles[params.style];","                result = Y.Date.format(new Date(params.value), {","                    timezone: config.timezone || Formatter.getCurrentTimeZone(),","                    dateFormat: style[0],","                    timeFormat: style[1],","                    timezoneFormat: style[2]","                });","                str = str.replace(matches[0], result);","            }","","        }","","        return str;","    }","}, true);/**"," * Time formatter"," * @class TimeFormatter"," * @extends DateFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.TimeFormatter = function(values) {","    TimeFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\": [ 0, Y.Date.TIME_FORMATS.HM_SHORT, Y.Date.TIMEZONE_FORMATS.NONE ],","        \"medium\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.NONE ],","        \"long\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_SHORT ],","        \"full\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*time\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","TimeFormatter = Y.Intl.TimeFormatter;","Y.extend(TimeFormatter, DateFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","TimeFormatter.createInstance = function(values) {","    return new TimeFormatter(values);","};","/**"," * Number formatter"," * @class NumberFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.NumberFormatter = function(values) {","    NumberFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"integer\": Y.Number.STYLES.NUMBER_STYLE,","        \"percent\": Y.Number.STYLES.PERCENT_STYLE,","        \"currency\": Y.Number.STYLES.CURRENCY_STYLE","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*number\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","NumberFormatter = Y.Intl.NumberFormatter;","Y.extend(NumberFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","NumberFormatter.createInstance = function(values) {","    return new NumberFormatter(values);","};","","Y.mix(NumberFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"integer\";	//If no style, default to medium","            params.showDecimal = true;	//Show decimal parts too","        }","","        if(!this.styles[params.style]) {	//Invalid style","            return false;","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by NumberFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, config;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                config = {","                    style: this.styles[params.style]","                };","                if(params.style === \"integer\" && !params.showDecimal) {","                    config.parseIntegerOnly = true;","                }","                str = str.replace(matches[0], Y.Number.format(params.value, config));","            }","        }","","        return str;","    }","}, true);/**"," * Select formatter. Select ouput based on value of key"," * @class SelectFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.SelectFormatter = function(values) {","    SelectFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*select\\\\s*,\\\\s*\";","};","","SelectFormatter = Y.Intl.SelectFormatter;","Y.extend(SelectFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","SelectFormatter.createInstance = function(values) {","    return new SelectFormatter(values);","};","","Y.mix(SelectFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param str {String} Pattern string","     * @param start {Number} Position in str to start parsing from","     * @return {Object} Object in the form:","             {","               options: [","                     { key: KEY1, value: VALUE1 },","                     { key: KEY2, value: VALUE2 },","                     ... ],","               next: i  //Index of next character in str that can be parsed","             }","     */","    parseOptions: function(str, start) {","        var options = {},","            key = \"\", value = \"\", current = \"\",","            i, ch;","        for(i=start; i<str.length; i++) {","            ch = str.charAt(i);","            if (ch === '\\\\') {","                current += ch + str.charAt(i+1);","                i++;","            } else if (ch === '}') {","                if(current === \"\") {","                    i++;","                    break;","                }","                value = current;","                options[key.trim()] = value;","                current = key = value = \"\";","            } else if (ch === '{') {","                key = current;","                current = \"\";","            } else {","                current += ch;","            }","        }","","        if(current !== \"\") {","            return null;","        }","","        return {","            options: options,","            next: i","        };","    },","","    /**","     * Select output depending on params.value from options","     * @method select","     * @param options {Array} Array of key,value pairs","     * @param params {Object} Object containing value","     * @return {String} selected result","     */","    select: function(options, params) {","        for ( var key in options ) {","            if( key === \"other\" ) {","                continue;	//Will use this only if everything else fails","            }","","            if( key === params.value ) {","                return options[key];","            }","        }","","        return options.other;","    },","","    /**","     * Format all instances in str that can be handled by SelectFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, options, result, start;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                options = this.parseOptions(str, regex.lastIndex);","                if(!options) {","                    continue;","                }","","                regex.lastIndex = options.next;","                options = options.options;","","                result = this.select(options, params);","                if(result) {","                    start = str.indexOf(matches[0]);","                    str = str.slice(0, start) + result + str.slice(regex.lastIndex);","                }","            }","        }","","        return str;","    }","}, true);/**"," * Plural formatter. Select ouput based on whether value of key is singular/plural"," * @class PluralFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.PluralFormatter = function(values) {","    PluralFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*plural\\\\s*,\\\\s*\";","};","","PluralFormatter = Y.Intl.PluralFormatter;","Y.extend(PluralFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","PluralFormatter.createInstance = function(values) {","    return new PluralFormatter(values);","};","","/**"," * Select output depending on params.value from options"," * @method select"," * @param options {Object} Object containing results for singular/plural"," * @param params {Object} Object containing value"," * @return {String} selected result"," */","PluralFormatter.prototype.select = function(options, params) {","    var result = options.other;","    if(params.value === 0 && options.zero) {","        result = options.zero;","    }","    if(params.value === 1 && options.one) {","        result = options.one;","    }","    if(params.value === 2 && options.two) {","        result = options.two;","    }","","    result = result.replace(\"#\", new NumberFormatter({VAL: params.value}).format(\"{VAL, number, integer}\"));	//Use 'number' to format this part","","    return result;","};","/**"," * Choice formatter. Select ouput based on numerical values"," * @class ChoiceFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.ChoiceFormatter = function(values) {","    ChoiceFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*choice\\\\s*,\\\\s*(.+)}\";","};","","ChoiceFormatter = Y.Intl.ChoiceFormatter;","Y.extend(ChoiceFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","ChoiceFormatter.createInstance = function(values) {","    return new ChoiceFormatter(values);","};","","Y.mix(ChoiceFormatter.prototype, {","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param choicesStr {String} Choice string from pattern","     * @return {Array} Array of objects containing value(choice), result, and relation","     */","    parseOptions: function(choicesStr) {","        var options = [],","            choicesArray = choicesStr.split(\"|\"),","            i, j, choice, relations, rel, mapping, ch;","        for (i=0; i<choicesArray.length; i++) {","            choice = choicesArray[i];","            relations = ['#', '<', '\\u2264'];","            for (j=0; j<relations.length; j++) {","                rel = relations[j];","                if(choice.indexOf(rel) !== -1) {","                    mapping = choice.split(rel);","                    ch = {","                        value: parseInt(mapping[0], 10),","                        result: mapping[1],","                        relation: rel","                    };","                    options.push(ch);","                    break;","                }","            }","        }","","        return options;","    },","","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(SelectFormatter.prototype.getParams.call(this, params, matches)) {","            if(matches[2]) {","                params.choices = this.parseOptions(matches[2]);","                return params.choices === [] ? false: true;","            }","        }","","        return false;","    },","","    /**","     * Select output depending on params.value from options in params.choices","     * @method select","     * @param params {Object} Object containing value and choices","     * @return {String} selected result","     */","    select: function(params) {","        var choice, value, result, relation, i;","        for (i=0; i<params.choices.length; i++) {","            choice = params.choices[i];","            value = choice.value, result = choice.result, relation = choice.relation;","","            if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)","                || (relation === '\\u2264' && value <= params.value)) {","                return result;","            }","        }","","        return \"\";","    },","","    /**","     * Format all instances in str that can be handled by ChoiceFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                result = this.select(params);","                if(result) {","                    str = str.replace(matches[0], result);","                }","            }","        }","","        return str;","    }","}, true);/**"," * List formatter"," * @class MsgListFormatter"," * @namespace Intl"," * @extends StringFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgListFormatter = function(values) {","      MsgListFormatter.superclass.constructor.call(this, values);","      this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*list\\\\s*}\";","};","","MsgListFormatter = Y.Intl.MsgListFormatter;","Y.extend(MsgListFormatter, StringFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","MsgListFormatter.createInstance = function(values) {","     return new MsgListFormatter(values);","};","","Y.mix(MsgListFormatter.prototype, {","     /**","      * Format all instances in str that can be handled by MsgListFormatter","      * @method format","      * @param str {String} Input string/pattern","      * @return {String} Formatted result","      */","     format: function(str) {","          var regex = new RegExp(this.regex, \"gm\"),","              matches = null,","              params;","","          while((matches = regex.exec(str))) {","              params = {};","","              if(this.getParams(params, matches)) {","                  //Got a match","                  str = str.replace(","                             matches[0],","                             Y.Intl.ListFormatter.format( params.value )","                  );","              }","          }","","          return str;","     }","}, true);","","/**"," * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime."," * @module intl-format"," * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl"," */","","/**"," * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters."," * If a formatter fails to parse, the next one in the list try to do so."," */","formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];","","Y.mix(Y.Intl, {","","    /**","     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.","     * @method formatMessage","     * @static","     * @param pattern {String} string contains static text with embedded format elements that specify","              how to process and insert strings, numbers, and dates, as well as perform conditional processing.","     * @param values {Object|Array} The data to be processed and inserted.","     * @param [config] {Object} Optional configuration parameters","     * @return {String} Formatted result","     * @example","            //String formatting. Key is replaced by value","            Y.Intl.formatMessage(\"{EMPLOYEE} reports to {MANAGER}\", {","                \"EMPLOYEE\": \"Ashik\",","                \"MANAGER\": \"Dharmesh\"","            });","","            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full","            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone","            Y.Intl.formatMessage(\"Today is {DATE, date, short}\", { DATE: new Date() });","            Y.Intl.formatMessage(\"The time is {DATE, time, medium}\", {DATE: new Date()}, {timezone: \"Asia/Kolkata\"});","            Y.Intl.formatMessage(\"There are {POPULATION_INDIA, number} million people in India.\", {POPULATION_INDIA: 1241.492});","","            //Select formatting. Selects output depending on value","            Y.Intl.formatMessage(\"{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.\", {","                \"NAME\": \"Henri\",","                \"GENDER\": \"male\",","                \"CITY\": \"Paris\"","            });","","            //Plural formatting. Selects output depending on whether numerical value is singular/plural","            Y.Intl.formatMessage(\"{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.\", {","                \"COMPANY_COUNT\": 1","            });","","            //Choice formatting. Selects output depending on numerical value","            Y.Intl.formatMessage(\"There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.\", {","                \"FILE_COUNT\": 1","            });","     */","    formatMessage: function(pattern, values, config) {","        config = config || {};","        var i, formatter;","        for(i=0; i<formatters.length; i++) {","            formatter = formatters[i].createInstance(values);","            pattern = formatter.format(pattern, config);","        }","        return pattern;","    }","});","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"af-NA\",","        \"af-ZA\",","        \"am\",","        \"am-ET\",","        \"ar\",","        \"ar-AE\",","        \"ar-BH\",","        \"ar-DZ\",","        \"ar-EG\",","        \"ar-IQ\",","        \"ar-JO\",","        \"ar-KW\",","        \"ar-LB\",","        \"ar-LY\",","        \"ar-MA\",","        \"ar-OM\",","        \"ar-QA\",","        \"ar-SA\",","        \"ar-SD\",","        \"ar-SY\",","        \"ar-TN\",","        \"ar-YE\",","        \"as\",","        \"as-IN\",","        \"az\",","        \"az-AZ\",","        \"az-Cyrl\",","        \"az-Cyrl-AZ\",","        \"az-Latn-AZ\",","        \"be\",","        \"be-BY\",","        \"bg\",","        \"bg-BG\",","        \"bn\",","        \"bn-BD\",","        \"bn-IN\",","        \"bo\",","        \"bo-CN\",","        \"bo-IN\",","        \"ca\",","        \"ca-ES\",","        \"cs\",","        \"cs-CZ\",","        \"cy\",","        \"cy-GB\",","        \"da\",","        \"da-DK\",","        \"de\",","        \"de-AT\",","        \"de-BE\",","        \"de-CH\",","        \"de-DE\",","        \"de-LI\",","        \"de-LU\",","        \"el\",","        \"el-CY\",","        \"el-GR\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-BZ\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JM\",","        \"en-JO\",","        \"en-MH\",","        \"en-MT\",","        \"en-MY\",","        \"en-NA\",","        \"en-NZ\",","        \"en-PH\",","        \"en-PK\",","        \"en-RH\",","        \"en-SG\",","        \"en-TT\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-VI\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es\",","        \"es-AR\",","        \"es-BO\",","        \"es-CL\",","        \"es-CO\",","        \"es-CR\",","        \"es-DO\",","        \"es-EC\",","        \"es-ES\",","        \"es-GT\",","        \"es-HN\",","        \"es-MX\",","        \"es-NI\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-PY\",","        \"es-SV\",","        \"es-US\",","        \"es-UY\",","        \"es-VE\",","        \"et\",","        \"et-EE\",","        \"eu\",","        \"eu-ES\",","        \"fa\",","        \"fa-AF\",","        \"fa-IR\",","        \"fi\",","        \"fi-FI\",","        \"fil\",","        \"fil-PH\",","        \"fo\",","        \"fo-FO\",","        \"fr\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr-FR\",","        \"fr-LU\",","        \"fr-MC\",","        \"fr-SN\",","        \"ga\",","        \"ga-IE\",","        \"gl\",","        \"gl-ES\",","        \"gsw\",","        \"gsw-CH\",","        \"gu\",","        \"gu-IN\",","        \"gv\",","        \"gv-GB\",","        \"ha\",","        \"ha-GH\",","        \"ha-Latn-GH\",","        \"ha-Latn-NE\",","        \"ha-Latn-NG\",","        \"ha-NE\",","        \"ha-NG\",","        \"haw\",","        \"haw-US\",","        \"he\",","        \"he-IL\",","        \"hi\",","        \"hi-IN\",","        \"hr\",","        \"hr-HR\",","        \"hu\",","        \"hu-HU\",","        \"hy\",","        \"hy-AM\",","        \"id\",","        \"id-ID\",","        \"ii\",","        \"ii-CN\",","        \"in\",","        \"in-ID\",","        \"is\",","        \"is-IS\",","        \"it\",","        \"it-CH\",","        \"it-IT\",","        \"iw\",","        \"iw-IL\",","        \"ja\",","        \"ja-JP\",","        \"ja-JP-TRADITIONAL\",","        \"ka\",","        \"ka-GE\",","        \"kk\",","        \"kk-Cyrl-KZ\",","        \"kk-KZ\",","        \"kl\",","        \"kl-GL\",","        \"km\",","        \"km-KH\",","        \"kn\",","        \"kn-IN\",","        \"ko\",","        \"kok\",","        \"kok-IN\",","        \"ko-KR\",","        \"kw\",","        \"kw-GB\",","        \"lt\",","        \"lt-LT\",","        \"lv\",","        \"lv-LV\",","        \"mk\",","        \"mk-MK\",","        \"ml\",","        \"ml-IN\",","        \"mr\",","        \"mr-IN\",","        \"ms\",","        \"ms-BN\",","        \"ms-MY\",","        \"mt\",","        \"mt-MT\",","        \"nb\",","        \"nb-NO\",","        \"ne\",","        \"ne-IN\",","        \"ne-NP\",","        \"nl\",","        \"nl-BE\",","        \"nl-NL\",","        \"nn\",","        \"nn-NO\",","        \"no\",","        \"no-NO\",","        \"no-NO-NY\",","        \"om\",","        \"om-ET\",","        \"om-KE\",","        \"or\",","        \"or-IN\",","        \"pa\",","        \"pa-Arab\",","        \"pa-Arab-PK\",","        \"pa-Guru-IN\",","        \"pa-IN\",","        \"pa-PK\",","        \"pl\",","        \"pl-PL\",","        \"ps\",","        \"ps-AF\",","        \"pt\",","        \"pt-BR\",","        \"pt-PT\",","        \"ro\",","        \"ro-MD\",","        \"ro-RO\",","        \"ru\",","        \"ru-RU\",","        \"ru-UA\",","        \"sh\",","        \"sh-BA\",","        \"sh-CS\",","        \"sh-YU\",","        \"si\",","        \"si-LK\",","        \"sk\",","        \"sk-SK\",","        \"sl\",","        \"sl-SI\",","        \"so\",","        \"so-DJ\",","        \"so-ET\",","        \"so-KE\",","        \"so-SO\",","        \"sq\",","        \"sq-AL\",","        \"sr\",","        \"sr-BA\",","        \"sr-CS\",","        \"sr-Cyrl-BA\",","        \"sr-Cyrl-CS\",","        \"sr-Cyrl-ME\",","        \"sr-Cyrl-RS\",","        \"sr-Cyrl-YU\",","        \"sr-Latn\",","        \"sr-Latn-BA\",","        \"sr-Latn-CS\",","        \"sr-Latn-ME\",","        \"sr-Latn-RS\",","        \"sr-Latn-YU\",","        \"sr-ME\",","        \"sr-RS\",","        \"sr-YU\",","        \"sv\",","        \"sv-FI\",","        \"sv-SE\",","        \"sw\",","        \"sw-KE\",","        \"sw-TZ\",","        \"ta\",","        \"ta-IN\",","        \"te\",","        \"te-IN\",","        \"th\",","        \"th-TH\",","        \"ti\",","        \"ti-ER\",","        \"ti-ET\",","        \"tl\",","        \"tl-PH\",","        \"tr\",","        \"tr-TR\",","        \"uk\",","        \"uk-UA\",","        \"ur\",","        \"ur-IN\",","        \"ur-PK\",","        \"uz\",","        \"uz-AF\",","        \"uz-Arab\",","        \"uz-Arab-AF\",","        \"uz-Cyrl-UZ\",","        \"uz-Latn\",","        \"uz-Latn-UZ\",","        \"uz-UZ\",","        \"vi\",","        \"vi-VN\",","        \"zh\",","        \"zh-CN\",","        \"zh-Hans-CN\",","        \"zh-Hans-HK\",","        \"zh-Hans-MO\",","        \"zh-Hans-SG\",","        \"zh-Hant\",","        \"zh-Hant-HK\",","        \"zh-Hant-MO\",","        \"zh-Hant-TW\",","        \"zh-HK\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\",","        \"zu-ZA\"","    ],","    \"requires\": [","        \"datatype-number-format\",","        \"datatype-number-parse\",","        \"datatype-date-format\",","        \"intl\"","    ]","});"];
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].lines = {"1":0,"7":0,"27":0,"28":0,"30":0,"32":0,"34":0,"35":0,"36":0,"38":0,"40":0,"58":0,"59":0,"60":0,"63":0,"80":0,"82":0,"90":0,"92":0,"93":0,"95":0,"111":0,"114":0,"115":0,"118":0,"119":0,"121":0,"133":0,"151":0,"152":0,"153":0,"154":0,"157":0,"165":0,"183":0,"192":0,"196":0,"208":0,"209":0,"211":0,"212":0,"213":0,"216":0,"241":0,"245":0,"246":0,"247":0,"248":0,"251":0,"252":0,"253":0,"255":0,"256":0,"258":0,"259":0,"260":0,"261":0,"262":0,"265":0,"268":0,"286":0,"287":0,"288":0,"291":0,"293":0,"301":0,"313":0,"338":0,"339":0,"341":0,"343":0,"344":0,"346":0,"347":0,"348":0,"349":0,"353":0,"354":0,"355":0,"358":0,"359":0,"361":0,"362":0,"365":0,"366":0,"367":0,"368":0,"370":0,"371":0,"372":0,"376":0,"378":0,"379":0,"380":0,"381":0,"382":0,"386":0,"387":0,"389":0,"391":0,"393":0,"394":0,"395":0,"396":0,"397":0,"398":0,"401":0,"402":0,"403":0,"408":0,"409":0,"410":0,"411":0,"413":0,"416":0,"417":0,"418":0,"419":0,"420":0,"422":0,"425":0,"428":0,"429":0,"430":0,"431":0,"435":0,"437":0,"438":0,"439":0,"443":0,"444":0,"446":0,"447":0,"448":0,"450":0,"454":0,"455":0,"459":0,"468":0,"483":0,"484":0,"487":0,"489":0,"490":0,"492":0,"493":0,"496":0,"497":0,"500":0,"503":0,"514":0,"515":0,"516":0,"519":0,"520":0,"523":0,"526":0,"527":0,"528":0,"529":0,"531":0,"534":0,"546":0,"547":0,"548":0,"549":0,"550":0,"551":0,"553":0,"555":0,"556":0,"557":0,"559":0,"560":0,"561":0,"563":0,"564":0,"565":0,"567":0,"568":0,"569":0,"571":0,"572":0,"573":0,"575":0,"577":0,"578":0,"580":0,"582":0,"596":0,"619":0,"620":0,"621":0,"623":0,"625":0,"633":0,"635":0,"636":0,"637":0,"641":0,"642":0,"643":0,"644":0,"645":0,"648":0,"649":0,"650":0,"653":0,"654":0,"665":0,"675":0,"676":0,"678":0,"679":0,"680":0,"681":0,"682":0,"683":0,"684":0,"686":0,"688":0,"691":0,"692":0,"694":0,"695":0,"698":0,"699":0,"700":0,"703":0,"704":0,"705":0,"707":0,"708":0,"712":0,"724":0,"733":0,"734":0,"736":0,"737":0,"740":0,"741":0,"743":0,"744":0,"747":0,"748":0,"749":0,"752":0,"753":0,"754":0,"756":0,"758":0,"762":0,"764":0,"766":0,"770":0,"772":0,"773":0,"777":0,"780":0,"782":0,"784":0,"785":0,"789":0,"790":0,"794":0,"795":0,"799":0,"800":0,"802":0,"806":0,"807":0,"808":0,"810":0,"822":0,"823":0,"825":0,"826":0,"829":0,"831":0,"833":0,"834":0,"836":0,"837":0,"838":0,"840":0,"841":0,"843":0,"844":0,"847":0,"848":0,"850":0,"851":0,"854":0,"857":0,"859":0,"878":0,"887":0,"898":0,"908":0,"917":0,"920":0,"925":0,"952":0,"954":0,"956":0,"959":0,"960":0,"961":0,"962":0,"964":0,"968":0,"983":0,"984":0,"985":0,"990":0,"995":0,"999":0,"3991":0,"3992":0,"4134":0,"4148":0,"4149":0,"4152":0,"4154":0,"4164":0,"4165":0,"4166":0,"4168":0,"4169":0,"4172":0,"4176":0,"4177":0,"4178":0,"4179":0,"4180":0,"4185":0,"4186":0,"4187":0,"4190":0,"4200":0,"4202":0,"4203":0,"4205":0,"4206":0,"4218":0,"4221":0,"4222":0,"4223":0,"4224":0,"4226":0,"4227":0,"4228":0,"4229":0,"4230":0,"4232":0,"4234":0,"4235":0,"4236":0,"4237":0,"4238":0,"4242":0,"4243":0,"4246":0,"4247":0,"4250":0,"4253":0,"4265":0,"4266":0,"4267":0,"4269":0,"4270":0,"4271":0,"4273":0,"4274":0,"4275":0,"4278":0,"4279":0,"4280":0,"4281":0,"4282":0,"4287":0,"4288":0,"4289":0,"4292":0,"4294":0,"4309":0,"4312":0,"4313":0,"4314":0,"4316":0,"4339":0,"4340":0,"4345":0,"4346":0,"4347":0,"4357":0,"4359":0,"4360":0,"4361":0,"4362":0,"4365":0,"4366":0,"4367":0,"4368":0,"4380":0,"4382":0,"4386":0,"4387":0,"4388":0,"4392":0,"4393":0,"4394":0,"4397":0,"4408":0,"4410":0,"4414":0,"4415":0,"4416":0,"4419":0,"4420":0,"4424":0,"4425":0,"4426":0,"4430":0,"4442":0,"4451":0,"4452":0,"4454":0,"4455":0,"4456":0,"4458":0,"4459":0,"4460":0,"4463":0,"4464":0,"4465":0,"4466":0,"4467":0,"4472":0,"4473":0,"4474":0,"4477":0,"4479":0,"4490":0,"4494":0,"4503":0,"4504":0,"4514":0,"4515":0,"4527":0,"4535":0,"4536":0,"4537":0,"4538":0,"4540":0,"4542":0,"4545":0,"4546":0,"4548":0,"4558":0,"4559":0,"4571":0,"4582":0,"4596":0,"4610":0,"4611":0,"4613":0,"4614":0,"4616":0,"4617":0,"4619":0,"4620":0,"4622":0,"4623":0,"4625":0,"4626":0,"4628":0,"4629":0,"4632":0,"4633":0,"4635":0,"4647":0,"4654":0,"4655":0,"4658":0,"4667":0,"4668":0,"4672":0,"4673":0,"4674":0,"4675":0,"4676":0,"4677":0,"4678":0,"4679":0,"4680":0,"4681":0,"4682":0,"4684":0,"4689":0,"4690":0,"4694":0,"4695":0,"4699":0,"4700":0,"4704":0,"4706":0,"4707":0,"4709":0,"4710":0,"4712":0,"4713":0,"4715":0,"4718":0,"4719":0,"4724":0,"4736":0,"4748":0,"4749":0,"4751":0,"4754":0,"4755":0,"4756":0,"4759":0,"4763":0,"4773":0,"4778":0,"4779":0,"4780":0,"4781":0,"4782":0,"4783":0,"4784":0,"4785":0,"4786":0,"4788":0,"4790":0,"4791":0,"4792":0,"4793":0,"4795":0,"4807":0,"4812":0,"4821":0,"4830":0,"4839":0,"4849":0,"4851":0,"4854":0,"4865":0,"4870":0,"4871":0,"4872":0,"4875":0,"4877":0,"4882":0,"4892":0,"4896":0,"4898":0,"4902":0,"4911":0,"4922":0,"4939":0,"4960":0,"5006":0,"5007":0,"5008":0,"5010":0,"5011":0,"5013":0,"5014":0,"5016":0,"5017":0,"5018":0,"5019":0,"5020":0,"5021":0,"5022":0,"5023":0,"5026":0,"5030":0,"5031":0,"5033":0,"5034":0,"5035":0,"5036":0,"5040":0,"5041":0,"5042":0,"5043":0,"5044":0,"5046":0,"5048":0,"5049":0,"5050":0,"5051":0,"5052":0,"5053":0,"5057":0,"5058":0,"5059":0,"5060":0,"5063":0,"5064":0,"5065":0,"5066":0,"5067":0,"5069":0,"5070":0,"5072":0,"5073":0,"5075":0,"5076":0,"5079":0,"5080":0,"5083":0,"5084":0,"5087":0,"5088":0,"5090":0,"5091":0,"5096":0,"5097":0,"5099":0,"5100":0,"5103":0,"5104":0,"5107":0,"5108":0,"5110":0,"5111":0,"5112":0,"5117":0,"5118":0,"5122":0,"5137":0,"5138":0,"5143":0,"5144":0,"5147":0,"5149":0,"5150":0,"5151":0,"5153":0,"5154":0,"5156":0,"5157":0,"5158":0,"5160":0,"5161":0,"5164":0,"5182":0,"5183":0,"5185":0,"5202":0,"5203":0,"5205":0,"5213":0,"5215":0,"5233":0,"5234":0,"5236":0,"5238":0,"5245":0,"5255":0,"5256":0,"5275":0,"5276":0,"5277":0,"5279":0,"5281":0,"5288":0,"5296":0,"5297":0,"5304":0,"5305":0,"5311":0,"5326":0,"5327":0,"5329":0,"5331":0,"5333":0,"5335":0,"5337":0,"5356":0,"5357":0,"5359":0,"5367":0,"5368":0,"5374":0,"5375":0,"5376":0,"5377":0,"5379":0,"5382":0,"5399":0,"5400":0,"5402":0,"5410":0,"5411":0,"5416":0,"5417":0,"5419":0,"5420":0,"5422":0,"5423":0,"5426":0,"5444":0,"5445":0,"5446":0,"5448":0,"5450":0,"5457":0,"5465":0,"5467":0,"5473":0,"5474":0,"5479":0,"5493":0,"5495":0,"5496":0,"5498":0,"5499":0,"5501":0,"5502":0,"5504":0,"5506":0,"5508":0,"5527":0,"5528":0,"5530":0,"5547":0,"5548":0,"5550":0,"5552":0,"5559":0,"5569":0,"5570":0,"5571":0,"5573":0,"5574":0,"5584":0,"5603":0,"5604":0,"5606":0,"5608":0,"5615":0,"5625":0,"5626":0,"5645":0,"5646":0,"5648":0,"5656":0,"5657":0,"5658":0,"5676":0,"5677":0,"5679":0,"5681":0,"5688":0,"5698":0,"5699":0,"5718":0,"5719":0,"5721":0,"5723":0,"5730":0,"5740":0,"5741":0,"5742":0,"5744":0,"5763":0,"5764":0,"5767":0,"5768":0,"5769":0,"5770":0,"5771":0,"5772":0,"5777":0,"5778":0,"5789":0,"5790":0,"5793":0,"5801":0,"5802":0,"5803":0,"5804":0,"5817":0,"5818":0,"5821":0,"5829":0,"5830":0,"5844":0,"5846":0,"5847":0,"5850":0,"5853":0,"5854":0,"5857":0,"5858":0,"5860":0,"5861":0,"5862":0,"5864":0,"5865":0,"5867":0,"5869":0,"5871":0,"5874":0,"5878":0,"5880":0,"5942":0,"5951":0,"5952":0,"5953":0,"5956":0,"5958":0,"5959":0,"5960":0,"5963":0,"5966":0,"5967":0,"5969":0,"5971":0,"5973":0,"5975":0,"5977":0,"5979":0,"5981":0,"5983":0,"5985":0,"5987":0,"5988":0,"5990":0,"5992":0,"5994":0,"5996":0,"5997":0,"5999":0,"6000":0,"6002":0,"6003":0,"6005":0,"6006":0,"6008":0,"6010":0,"6021":0,"6022":0,"6023":0,"6026":0,"6027":0,"6029":0,"6031":0,"6033":0,"6035":0,"6037":0,"6048":0,"6049":0,"6050":0,"6053":0,"6054":0,"6056":0,"6058":0,"6060":0,"6062":0,"6073":0,"6079":0,"6080":0,"6083":0,"6084":0,"6085":0,"6086":0,"6087":0,"6088":0,"6089":0,"6091":0,"6094":0,"6097":0,"6099":0,"6109":0,"6110":0,"6113":0,"6119":0,"6121":0,"6122":0,"6123":0,"6126":0,"6127":0,"6130":0,"6131":0,"6134":0,"6152":0,"6153":0,"6154":0,"6155":0,"6156":0,"6159":0,"6160":0,"6162":0,"6164":0,"6165":0,"6166":0,"6168":0,"6169":0,"6170":0,"6172":0,"6173":0,"6174":0,"6176":0,"6177":0,"6178":0,"6180":0,"6184":0,"6186":0,"6193":0,"6220":0,"6221":0,"6222":0,"6223":0,"6224":0,"6226":0,"6227":0,"6230":0,"6236":0,"6237":0,"6238":0,"6239":0,"6241":0,"6242":0,"6244":0,"6247":0,"6248":0,"6249":0,"6250":0,"6251":0,"6253":0,"6254":0,"6256":0,"6259":0,"6260":0,"6261":0,"6262":0,"6263":0,"6265":0,"6266":0,"6268":0,"6271":0,"6272":0,"6273":0,"6274":0,"6275":0,"6277":0,"6278":0,"6280":0,"6283":0,"6284":0,"6285":0,"6286":0,"6287":0,"6289":0,"6290":0,"6292":0,"6295":0,"6296":0,"6297":0,"6298":0,"6299":0,"6301":0,"6302":0,"6304":0,"6307":0,"6309":0,"6310":0,"6312":0,"6313":0,"6316":0,"6318":0,"6325":0,"6336":0,"6348":0,"6349":0,"6350":0,"6352":0,"6353":0,"6356":0,"6358":0,"6373":0,"6391":0,"6394":0,"6395":0,"6398":0,"6415":0,"6416":0,"6417":0,"6420":0,"6422":0,"6423":0,"6425":0,"6426":0,"6428":0,"6447":0,"6448":0,"6449":0,"6450":0,"6451":0,"6454":0,"6462":0,"6463":0,"6464":0,"6467":0,"6468":0,"6471":0,"6472":0,"6473":0,"6474":0,"6477":0,"6478":0,"6481":0,"6482":0,"6485":0,"6486":0,"6493":0,"6494":0,"6495":0,"6498":0,"6500":0,"6503":0,"6505":0,"6530":0,"6531":0,"6532":0,"6535":0,"6536":0,"6539":0,"6540":0,"6541":0,"6542":0,"6545":0,"6546":0,"6547":0,"6548":0,"6551":0,"6568":0,"6569":0,"6580":0,"6593":0,"6604":0,"6606":0,"6614":0,"6615":0,"6616":0,"6617":0,"6620":0,"6621":0,"6622":0,"6624":0,"6626":0,"6630":0,"6639":0,"6640":0,"6643":0,"6645":0,"6653":0,"6654":0,"6656":0,"6667":0,"6668":0,"6671":0,"6673":0,"6674":0,"6675":0,"6678":0,"6686":0,"6691":0,"6700":0,"6709":0,"6710":0,"6722":0,"6723":0,"6724":0,"6727":0,"6728":0,"6736":0,"6737":0,"6740":0,"6749":0,"6750":0,"6751":0,"6752":0,"6756":0,"6766":0,"6769":0,"6770":0,"6772":0,"6774":0,"6779":0,"6790":0,"6791":0,"6792":0,"6798":0,"6801":0,"6802":0,"6810":0,"6811":0,"6814":0,"6823":0,"6824":0,"6825":0,"6827":0,"6828":0,"6832":0,"6833":0,"6836":0,"6837":0,"6840":0,"6841":0,"6844":0,"6855":0,"6858":0,"6859":0,"6861":0,"6863":0,"6864":0,"6870":0,"6875":0,"6886":0,"6887":0,"6888":0,"6894":0,"6897":0,"6898":0,"6906":0,"6907":0,"6918":0,"6919":0,"6920":0,"6925":0,"6928":0,"6929":0,"6937":0,"6938":0,"6941":0,"6950":0,"6951":0,"6952":0,"6954":0,"6955":0,"6959":0,"6960":0,"6961":0,"6964":0,"6965":0,"6968":0,"6969":0,"6972":0,"6982":0,"6985":0,"6986":0,"6988":0,"6990":0,"6993":0,"6994":0,"6996":0,"7000":0,"7011":0,"7012":0,"7013":0,"7016":0,"7017":0,"7025":0,"7026":0,"7029":0,"7038":0,"7039":0,"7040":0,"7044":0,"7045":0,"7048":0,"7066":0,"7069":0,"7070":0,"7071":0,"7072":0,"7073":0,"7074":0,"7075":0,"7076":0,"7077":0,"7079":0,"7080":0,"7081":0,"7082":0,"7083":0,"7084":0,"7086":0,"7090":0,"7091":0,"7094":0,"7108":0,"7109":0,"7110":0,"7113":0,"7114":0,"7118":0,"7128":0,"7131":0,"7132":0,"7134":0,"7136":0,"7137":0,"7138":0,"7141":0,"7142":0,"7144":0,"7145":0,"7146":0,"7147":0,"7152":0,"7163":0,"7164":0,"7165":0,"7168":0,"7169":0,"7177":0,"7178":0,"7188":0,"7189":0,"7190":0,"7191":0,"7193":0,"7194":0,"7196":0,"7197":0,"7200":0,"7202":0,"7213":0,"7214":0,"7215":0,"7218":0,"7219":0,"7227":0,"7228":0,"7231":0,"7239":0,"7242":0,"7243":0,"7244":0,"7245":0,"7246":0,"7247":0,"7248":0,"7249":0,"7254":0,"7255":0,"7260":0,"7271":0,"7272":0,"7273":0,"7274":0,"7278":0,"7288":0,"7289":0,"7290":0,"7291":0,"7293":0,"7295":0,"7299":0,"7309":0,"7312":0,"7313":0,"7315":0,"7316":0,"7317":0,"7318":0,"7323":0,"7334":0,"7335":0,"7336":0,"7339":0,"7340":0,"7348":0,"7349":0,"7352":0,"7360":0,"7364":0,"7365":0,"7367":0,"7369":0,"7376":0,"7390":0,"7392":0,"7434":0,"7435":0,"7436":0,"7437":0,"7438":0,"7440":0};
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].functions = {"_zeroPad:27":0,"__BaseFormat:58":0,"format:89":0,"parse:110":0,"_createParseObject:132":0,"Segment:151":0,"format:164":0,"parse:182":0,"getFormat:191":0,"_parseLiteral:207":0,"_parseInt:240":0,"TextSegment:286":0,"toString:300":0,"parse:312":0,"__zNumberFormat:338":0,"format:482":0,"parse:513":0,"__parseStatic:545":0,"_createParseObject:595":0,"NumberSegment:619":0,"format:632":0,"_normalize:664":0,"parse:723":0,"__YNumberFormat:822":0,"format:886":0,"isParseIntegerOnly:897":0,"parse:907":0,"setParseIntegerOnly:916":0,"format:951":0,"parse:982":0,"__zTimezone:4148":0,"getTransition:4163":0,"addRule:4199":0,"getRule:4217":0,"getOffset:4264":0,"_BY_OFFSET:4307":0,"_generateShortName:4338":0,"_initTimezoneRules:4356":0,"getCurrentTimezoneIds:4379":0,"getTimezoneIdForOffset:4407":0,"isDST:4441":0,"isValidTimezoneId:4489":0,"getShortName:4502":0,"getMediumName:4513":0,"Timezone:4535":0,"_getDOY:4557":0,"_floatToInt:4570":0,"getCurrentTimezoneIds:4581":0,"getTimezoneIdForOffset:4595":0,"getUnixTimeFromWallTime:4606":0,"isValidTimestamp:4646":0,"isValidTimezoneId:4735":0,"getNormalizedTimezoneId:4747":0,"_parseRFC3339:4772":0,"_parseSQLFormat:4806":0,"getShortName:4820":0,"getMediumName:4829":0,"getLongName:4838":0,"convertToIncrementalUTC:4848":0,"convertUTCToRFC3339Format:4864":0,"convertUTCToSQLFormat:4891":0,"getRawOffset:4910":0,"getWallTimeFromUnixTime:4921":0,"__zDateFormat:5006":0,"format:5137":0,"DateSegment:5182":0,"EraSegment:5202":0,"format:5213":0,"YearSegment:5233":0,"toString:5244":0,"format:5254":0,"MonthSegment:5275":0,"toString:5287":0,"initialize:5295":0,"format:5325":0,"WeekSegment:5356":0,"format:5367":0,"DaySegment:5399":0,"format:5410":0,"WeekdaySegment:5444":0,"toString:5456":0,"initialize:5464":0,"format:5492":0,"TimeSegment:5527":0,"HourSegment:5547":0,"toString:5558":0,"format:5568":0,"MinuteSegment:5603":0,"toString:5614":0,"format:5624":0,"SecondSegment:5645":0,"format:5656":0,"AmPmSegment:5676":0,"toString:5687":0,"format:5697":0,"TimezoneSegment:5718":0,"toString:5729":0,"format:5739":0,"__BuddhistDateFormat:5763":0,"YearSegment:5789":0,"format:5801":0,"EraSegment:5817":0,"format:5829":0,"__YDateFormat:5844":0,"_generateDatePattern:5950":0,"_generateTimePattern:6020":0,"_generateTimeZonePattern:6047":0,"_generatePattern:6072":0,"format:6108":0,"__YRelativeTimeFormat:6152":0,"currentDate:6193":0,"format:6220":0,"_stripDecimals:6335":0,"__YDurationFormat:6348":0,"_getDuration_XML:6390":0,"_getDuration_Seconds:6414":0,"format:6447":0,"format:6529":0,"formatDuration:6567":0,"__sub:6592":0,"format:6603":0,"MsgBaseFormatter:6639":0,"getValue:6652":0,"getParams:6666":0,"format:6685":0,"createInstance:6698":0,"getCurrentTimeZone:6708":0,"StringFormatter:6722":0,"createInstance:6736":0,"getParams:6748":0,"format:6765":0,"DateFormatter:6790":0,"createInstance:6810":0,"getParams:6822":0,"format:6854":0,"TimeFormatter:6886":0,"createInstance:6906":0,"NumberFormatter:6918":0,"createInstance:6937":0,"getParams:6949":0,"format:6981":0,"SelectFormatter:7011":0,"createInstance:7025":0,"getParams:7037":0,"parseOptions:7065":0,"select:7107":0,"format:7127":0,"PluralFormatter:7163":0,"createInstance:7177":0,"select:7188":0,"ChoiceFormatter:7213":0,"createInstance:7227":0,"parseOptions:7238":0,"getParams:7270":0,"select:7287":0,"format:7308":0,"MsgListFormatter:7334":0,"createInstance:7348":0,"format:7359":0,"formatMessage:7433":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].coveredLines = 1298;
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].coveredFunctions = 161;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 1);
YUI.add('gallery-i18n-formats', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

_yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7);
var MODULE_NAME = "gallery-i18n-formats",
    Format, NumberFormat, YNumberFormat,    //number
    TimezoneData, TimezoneLinks, Timezone, AjxTimezone,  //timezone
    ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat,   //date
    ListFormatter, //list
    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter, //message
    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters; //message

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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 27);
Y.Number._zeroPad  = function(s, length, zeroChar, rightSide) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_zeroPad", 27);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 28);
s = typeof s === "string" ? s : String(s);

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 30);
if (s.length >= length) { return s; }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 32);
zeroChar = zeroChar || '0';
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 34);
var a = [], i;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 35);
for (i = s.length; i < length; i++) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 36);
a.push(zeroChar);
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 38);
a[rightSide ? "unshift" : "push"](s);

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 40);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 58);
Y.Number.__BaseFormat = function(pattern, formats) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__BaseFormat", 58);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 59);
if ( !pattern && !formats ) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 60);
return;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 63);
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

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 80);
Format = Y.Number.__BaseFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 82);
Y.mix(Format.prototype, {
    /**
     * Format object
     * @method format
     * @param object The object to be formatted
     * @return {String} Formatted result
     */
    format: function(object) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 89);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 90);
var s = [], i = 0;
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 92);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 93);
s.push(this._segments[i].format(object));
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 95);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 110);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 111);
var object = this._createParseObject(),
            index = pp || 0,
            i = 0;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 114);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 115);
index = this._segments[i].parse(object, s, index);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 118);
if (index < s.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 119);
Y.error("Parse Error: Input too long");
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 121);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_createParseObject", 132);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 133);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 151);
Format.Segment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "Segment", 151);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 152);
if( !format && !s ) { return; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 153);
this._parent = format;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 154);
this._s = s;
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 157);
Y.mix(Format.Segment.prototype, {
    /**
     * Formats the object. Will be overridden in most subclasses.
     * @method format
     * //param o The object to format
     * @return {String} Formatted result
     */
    format: function(/*o*/) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 164);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 165);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 182);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 183);
Y.error("Not implemented");
    },

    /**
     * Return the parent Format object
     * @method getFormat
     * @return {Number.__BaseFormat}
     */
    getFormat: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getFormat", 191);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 192);
return this._parent;
    }
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 196);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_parseLiteral", 207);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 208);
if (s.length - index < literal.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 209);
Y.error("Parse Error: Input too short");
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 211);
for (var i = 0; i < literal.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 212);
if (literal.charAt(i) !== s.charAt(index + i)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 213);
Y.error("Parse Error: Input does not match");
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 216);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_parseInt", 240);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 241);
var len = fixedlen || s.length - index,
            head = index,
            i = 0,
            tail, value, target;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 245);
for (; i < len; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 246);
if (!s.charAt(index++).match(/\d/)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 247);
index--;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 248);
break;
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 251);
tail = index;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 252);
if (head === tail) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 253);
Y.error("Error parsing number. Number not present");
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 255);
if (fixedlen && tail - head !== fixedlen) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 256);
Y.error("Error parsing number. Number too short");
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 258);
value = parseInt(s.substring(head, tail), radix || 10);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 259);
if (f) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 260);
target = o || Y.config.win;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 261);
if (typeof f === "function") {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 262);
f.call(target, value + adjust);
            }
            else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 265);
target[f] = value + adjust;
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 268);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 286);
Format.TextSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "TextSegment", 286);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 287);
if (!format && !s) { return; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 288);
Format.TextSegment.superclass.constructor.call(this, format, s);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 291);
Y.extend(Format.TextSegment, Format.Segment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 293);
Y.mix(Format.TextSegment.prototype, {
    /**
     * String representation of the class
     * @method toString
     * @private
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 300);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 301);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 312);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 313);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 338);
Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__zNumberFormat", 338);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 339);
var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,
        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 341);
if (arguments.length === 0) { return; }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 343);
NumberFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 344);
if (!pattern) { return; }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 346);
if(pattern === "{plural_style}") {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 347);
pattern = this.Formats.decimalFormat;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 348);
this._isPluralCurrency = true;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 349);
this._pattern = pattern;
    }

    //Default currency
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 353);
this.currency = this.Formats.defaultCurrency;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 354);
if(this.currency === undefined || !this.currency) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 355);
this.currency = "USD";
    }
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 358);
patterns = pattern.split(/;/);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 359);
pattern = patterns[0];
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 361);
this._useGrouping = (pattern.indexOf(",") !== -1);      //Will be set to true if pattern uses grouping
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 362);
this._parseIntegerOnly = (pattern.indexOf(".") === -1);  //Will be set to false if pattern contains fractional parts
        
    //If grouping is used, find primary and secondary grouping
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 365);
if(this._useGrouping) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 366);
numberPattern = pattern.match(/[0#,]+/);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 367);
groupingRegex = new RegExp("[0#]+", "g");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 368);
groups = numberPattern[0].match(groupingRegex);
            
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 370);
i = groups.length - 2;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 371);
this._primaryGrouping = groups[i+1].length;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 372);
this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);
    }
        
    // parse prefix
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 376);
i = 0;
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 378);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 379);
i = results.offset;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 380);
hasPrefix = results.text !== "";
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 381);
if (hasPrefix) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 382);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // parse number descriptor
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 386);
start = i;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 387);
while (i < pattern.length &&
        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 389);
i++;
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 391);
end = i;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 393);
numPattern = pattern.substring(start, end);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 394);
e = numPattern.indexOf(this.Formats.exponentialSymbol);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 395);
expon = e !== -1 ? numPattern.substring(e + 1) : null;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 396);
if (expon) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 397);
numPattern = numPattern.substring(0, e);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 398);
this._showExponent = true;
    }
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 401);
dot = numPattern.indexOf('.');
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 402);
whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 403);
if (whole) {
        /*var comma = whole.lastIndexOf(',');
            if (comma != -1) {
                this._groupingOffset = whole.length - comma - 1;
            }*/
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 408);
whole = whole.replace(/[^#0]/g,"");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 409);
zero = whole.indexOf('0');
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 410);
if (zero !== -1) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 411);
this._minIntDigits = whole.length - zero;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 413);
this._maxIntDigits = whole.length;
    }
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 416);
fract = dot !== -1 ? numPattern.substring(dot + 1) : null;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 417);
if (fract) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 418);
zero = fract.lastIndexOf('0');
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 419);
if (zero !== -1) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 420);
this._minFracDigits = zero + 1;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 422);
this._maxFracDigits = fract.replace(/[^#0]/g,"").length;
    }
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 425);
this._segments.push(new NumberFormat.NumberSegment(this, numPattern));
	
    // parse suffix
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 428);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 429);
i = results.offset;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 430);
if (results.text !== "") {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 431);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // add negative formatter
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 435);
if (skipNegFormat) { return; }
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 437);
if (patterns.length > 1) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 438);
pattern = patterns[1];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 439);
this._negativeFormatter = new NumberFormat(pattern, formats, true);
    }
    else {
        // no negative pattern; insert minus sign before number segment
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 443);
formatter = new NumberFormat("", formats);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 444);
formatter._segments = formatter._segments.concat(this._segments);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 446);
index = hasPrefix ? 1 : 0;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 447);
minus = new Format.TextSegment(formatter, this.Formats.minusSign);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 448);
formatter._segments.splice(index, 0, minus);
		
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 450);
this._negativeFormatter = formatter;
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 454);
NumberFormat = Y.Number.__zNumberFormat;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 455);
Y.extend(NumberFormat, Y.Number.__BaseFormat);
    
// Constants

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 459);
Y.mix(NumberFormat, {
    _NUMBER: "number",
    _INTEGER: "integer",
    _CURRENCY: "currency",
    _PERCENT: "percent",

    _META_CHARS: "0#.,E"
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 468);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 482);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 483);
if (number < 0 && this._negativeFormatter) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 484);
return this._negativeFormatter.format(number);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 487);
var result = Format.prototype.format.call(this, number), pattern = "";
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 489);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 490);
if(number === 1) {
                //Singular
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 492);
pattern = this.Formats.currencyPatternSingular;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 493);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencySingular"]);
            } else {
                //Plural
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 496);
pattern = this.Formats.currencyPatternPlural;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 497);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencyPlural"]);
            }
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 500);
result = pattern.replace("{0}", result);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 503);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 513);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 514);
var singular, plural, object;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 515);
if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 516);
return this._negativeFormatter.parse(s, pp);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 519);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 520);
singular = this.Formats[this.currency + "_currencySingular"],
                plural = this.Formats[this.currency + "_currencyPlural"];
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 523);
s = Y.Lang.trim(s.replace(plural, "").replace(singular, ""));
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 526);
object = null;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 527);
try {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 528);
object = Format.prototype.parse.call(this, s, pp);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 529);
object = object.value;
        } catch(e) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 531);
Y.error("Failed to parse: " + s, e);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 534);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__parseStatic", 545);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 546);
var data = [], c, start, end;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 547);
while (i < s.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 548);
c = s.charAt(i++);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 549);
if (NumberFormat._META_CHARS.indexOf(c) !== -1) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 550);
i--;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 551);
break;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 553);
switch (c) {
                case "'":
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 555);
start = i;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 556);
while (i < s.length && s.charAt(i) !== "'") {
			_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 557);
i++;
                    }
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 559);
end = i;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 560);
c = end - start === 0 ? "'" : s.substring(start, end);
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 561);
break;
                case '%':
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 563);
c = this.Formats.percentSign;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 564);
this._isPercent = true;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 565);
break;
                case '\u2030':
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 567);
c = this.Formats.perMilleSign;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 568);
this._isPerMille = true;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 569);
break;
                case '\u00a4':
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 571);
if(s.charAt(i) === '\u00a4') {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 572);
c = this.Formats[this.currency + "_currencyISO"];
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 573);
i++;
                    } else {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 575);
c = this.Formats[this.currency + "_currencySymbol"];
                    }
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 577);
this._isCurrency = true;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 578);
break;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 580);
data.push(c);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 582);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_createParseObject", 595);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 596);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 619);
NumberFormat.NumberSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "NumberSegment", 619);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 620);
if (format === null && s === null) { return; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 621);
NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 623);
Y.extend(NumberFormat.NumberSegment, Format.Segment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 625);
Y.mix(NumberFormat.NumberSegment.prototype, {
    /**
     * Format number segment
     * @method format
     * @param number {Number}
     * @return {String} Formatted result
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 632);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 633);
var expon, exponReg, s;
        // special values
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 635);
if (isNaN(number)) { return this._parent.Formats.nanSymbol; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 636);
if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 637);
return this._parent.Formats.infinitySign;
        }

        // adjust value
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 641);
if (typeof number !== "number") { number = Number(number); }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 642);
number = Math.abs(number); // NOTE: minus sign is part of pattern
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 643);
if (this._parent._isPercent) { number *= 100; }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 644);
if (this._parent._isPerMille) { number *= 1000; }}
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 645);
if(this._parent._parseIntegerOnly) { number = Math.floor(number); }
        
        // format
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 648);
expon = this._parent.Formats.exponentialSymbol;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 649);
exponReg = new RegExp(expon + "+");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 650);
s = this._parent._showExponent
            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)
            : number.toFixed(this._parent._maxFracDigits || 0);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 653);
s = this._normalize(s);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 654);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_normalize", 664);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 665);
var exponSymbol = this._parent.Formats.exponentialSymbol,
            splitReg = new RegExp("[\\." + exponSymbol + "]"),
            match = s.split(splitReg),
            whole = match.shift(),  //Normalize the whole part
            a = [],
            offset = this._parent._primaryGrouping,
            fract = '0',
            decimal = this._parent.Formats.decimalSeparator,
            expon, i;

	_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 675);
if (whole.length < this._parent._minIntDigits) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 676);
whole = Y.Number._zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 678);
if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 679);
i = whole.length - offset;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 680);
while (i > 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 681);
a.unshift(whole.substr(i, offset));
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 682);
a.unshift(this._parent.Formats.groupingSeparator);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 683);
offset = this._parent._secondaryGrouping;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 684);
i -= offset;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 686);
a.unshift(whole.substring(0, i + offset));
		
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 688);
whole = a.join("");
        }
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 691);
if(s.match(/\./)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 692);
fract = match.shift();
        }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 694);
if(s.match(/\e/) || s.match(/\E/)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 695);
expon = match.shift();
        }}

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 698);
fract = fract.replace(/0+$/,"");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 699);
if (fract.length < this._parent._minFracDigits) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 700);
fract = Y.Number._zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);
        }
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 703);
a = [ whole ];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 704);
if (fract.length > 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 705);
a.push(decimal, fract);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 707);
if (expon) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 708);
a.push(exponSymbol, expon.replace(/^\+/,""));
        }
	
        // return normalize result
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 712);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 723);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 724);
var comma = this._parent.Formats.groupingSeparator,
            dot = this._parent.Formats.decimalSeparator,
            minusSign = this._parent.Formats.minusSign,
            expon = this._parent.Formats.exponentialSymbol,
            numberRegexPattern = "[\\" + minusSign + "0-9" + comma + "]+",
            numberRegex, matches, negativeNum, endIndex, scientific = null, i,
            //If more groups, use primary/secondary grouping as applicable
            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 733);
if(!this._parent._parseIntegerOnly) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 734);
numberRegexPattern += "(\\" + dot + "[0-9]+)?";
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 736);
if(this._parent._showExponent) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 737);
numberRegexPattern += "(" + expon +"\\+?[0-9]+)";
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 740);
numberRegex = new RegExp(numberRegexPattern);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 741);
matches = s.match(numberRegex);
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 743);
if(!matches) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 744);
Y.error("Error parsing: Number does not match pattern");
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 747);
negativeNum = s.indexOf(minusSign) !== -1;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 748);
endIndex = index + matches[0].length;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 749);
s = s.slice(index, endIndex);
        
        //Scientific format does not use grouping
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 752);
if(this._parent.showExponent) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 753);
scientific = s.split(expon);
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 754);
if(this._parent._useGrouping) {
            //Verify grouping data exists
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 756);
if(!this._parent._primaryGrouping) {
                //Should not happen
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 758);
Y.error("Error parsing: Invalid pattern");
            }
            
            //Verify grouping is correct
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 762);
i = s.length - this._parent._primaryGrouping - 1;
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 764);
if(matches[1]) {
                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 766);
i = i - matches[1].length;
            }
            
            //Use primary grouping for first group
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 770);
if(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 772);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 773);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 777);
s = s.slice(0, i) + s.slice(i+1);
            }
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 780);
i = i - grouping - 1;
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 782);
while(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 784);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 785);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 789);
s = s.slice(0, i) + s.slice(i+1);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 790);
i = i - grouping - 1;
            }
            
            //Verify there are no more grouping separators
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 794);
if(s.indexOf(comma) !== -1) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 795);
Y.error("Error parsing: Number does not match pattern");
            }
        }}
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 799);
if(scientific) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 800);
object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 802);
object.value = parseFloat(s, 10);
        }
        
        //Special types
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 806);
if(negativeNum) { object.value *= -1; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 807);
if (this._parent._isPercent) { object.value /= 100; }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 808);
if (this._parent._isPerMille) { object.value /= 1000; }}
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 810);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 822);
Y.Number.__YNumberFormat = function(style) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__YNumberFormat", 822);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 823);
style = style || Y.Number.STYLES.NUMBER_STYLE;
    
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 825);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 826);
style = Y.Number.STYLES[style];
    }
    
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 829);
var pattern = "",
        formats = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 831);
switch(style) {
        case Y.Number.STYLES.CURRENCY_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 833);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 834);
break;
        case Y.Number.STYLES.ISO_CURRENCY_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 836);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 837);
pattern = pattern.replace("\u00a4", "\u00a4\u00a4");
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 838);
break;
        case Y.Number.STYLES.NUMBER_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 840);
pattern = formats.decimalFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 841);
break;
        case Y.Number.STYLES.PERCENT_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 843);
pattern = formats.percentFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 844);
break;
        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:
            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 847);
pattern = "{plural_style}";
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 848);
break;
        case Y.Number.STYLES.SCIENTIFIC_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 850);
pattern = formats.scientificFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 851);
break;
    }
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 854);
this._numberFormatInstance = new NumberFormat(pattern, formats);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 857);
YNumberFormat = Y.Number.__YNumberFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 859);
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
   
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 878);
Y.mix(YNumberFormat.prototype, {
    /**
     * Format a number
     * @method format
     * @param number {Number} the number to format
     * @for Number.YNumberFormat
     * @return {Number}
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 886);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 887);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isParseIntegerOnly", 897);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 898);
return this._numberFormatInstance._parseIntegerOnly;
    },
    
    /**
     * Parse the string to get a number
     * @method parse
     * @param {String} txt The string to parse
     * @param {Number} [pp=0] Parse position. The position to start parsing at.
     */
    parse: function(txt, pp) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 907);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 908);
return this._numberFormatInstance.parse(txt, pp);
    },
    
    /**
     * Sets whether or not numbers should be parsed as integers only.
     * @method setParseIntegerOnly
     * @param {Boolean} newValue set True, this format will parse numbers as integers only.
     */
    setParseIntegerOnly: function(newValue) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "setParseIntegerOnly", 916);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 917);
this._numberFormatInstance._parseIntegerOnly = newValue;
    }
});
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 920);
Y.mix( Y.Number, {
     _oldFormat: Y.Number.format,
     _oldParse:  Y.Number.parse
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 925);
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
         _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 951);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 952);
config = config || {};
    
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 954);
if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined
               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 956);
return Y.Number._oldFormat(data, config);
         }
    
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 959);
try {
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 960);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 961);
if(config.parseIntegerOnly) {
                 _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 962);
formatter.setParseIntegerOnly(true);
             }
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 964);
return formatter.format(data);
         } catch(e) {
             //Error. Fallback to original format
         }
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 968);
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
         _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 982);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 983);
try {
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 984);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 985);
return formatter.parse(data, config.parsePosition);
         } catch(e) {
             //Fallback on deprecated parse
         }
    
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 990);
return Y.Number._oldParse(data);
     }
}, true);

//Update Parsers shortcut
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 995);
Y.namespace("Parsers").number = Y.Number.parse;
/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 999);
Y.Date.Timezone = {
    __tzoneData: {
         TRANSITION_YEAR: 2011,
         TIMEZONE_RULES: [
{
    tzId: "Asia/Riyadh88",
    standard: {
        offset: 187
    }
},
{
    tzId: "Asia/Kabul",
    standard: {
        offset: 270
    }
},
{
    tzId: "Asia/Yerevan",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Baku",
    standard: {
        offset: 240,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 5,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 300,
        mon: 3,
        week: -1,
        wkday: 1,
        hour: 4,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Asia/Bahrain",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Dhaka",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Thimphu",
    standard: {
        offset: 360
    }
},
{
    tzId: "Indian/Chagos",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Brunei",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Rangoon",
    standard: {
        offset: 390
    }
},
{
    tzId: "Asia/Phnom_Penh",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Harbin",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Shanghai",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Chongqing",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Urumqi",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Kashgar",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Hong_Kong",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Taipei",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Macau",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Nicosia",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Tbilisi",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Dili",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Kolkata",
    standard: {
        offset: 330
    }
},
{
    tzId: "Asia/Jakarta",
    standard: {
        offset: 427
    }
},
{
    tzId: "Asia/Pontianak",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Tehran",
    standard: {
        offset: 210
    }
},
{
    tzId: "Asia/Baghdad",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Jerusalem",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Tokyo",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Amman",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Almaty",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Qyzylorda",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Aqtobe",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Aqtau",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Oral",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Bishkek",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Seoul",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Kuwait",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Vientiane",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Beirut",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Kuala_Lumpur",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Kuching",
    standard: {
        offset: 480
    }
},
{
    tzId: "Indian/Maldives",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Hovd",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Ulaanbaatar",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Choibalsan",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Kathmandu",
    standard: {
        offset: 345
    }
},
{
    tzId: "Asia/Muscat",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Karachi",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Gaza",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Hebron",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Manila",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Qatar",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Riyadh",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Singapore",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Colombo",
    standard: {
        offset: 330
    }
},
{
    tzId: "Asia/Damascus",
    standard: {
        offset: 120,
        mon: 10,
        week: -1,
        wkday: 6,
        hour: 0,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 180,
        mon: 3,
        week: -1,
        wkday: 6,
        hour: 0,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Asia/Dushanbe",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Bangkok",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Ashgabat",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Dubai",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Samarkand",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Ho_Chi_Minh",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Aden",
    standard: {
        offset: 180
    }
},
{
    tzId: "Australia/Darwin",
    standard: {
        offset: 570
    }
},
{
    tzId: "Australia/Perth",
    standard: {
        offset: 525
    }
},
{
    tzId: "Australia/Brisbane",
    standard: {
        offset: 600
    }
},
{
    tzId: "Australia/Adelaide",
    standard: {
        offset: 570,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 630,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Australia/Hobart",
    standard: {
        offset: 600
    }
},
{
    tzId: "Australia/Melbourne",
    standard: {
        offset: 600,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 660,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Australia/Sydney",
    standard: {
        offset: 570,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 630,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Australia/Lord_Howe",
    standard: {
        offset: 630,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 660,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Indian/Christmas",
    standard: {
        offset: 420
    }
},
{
    tzId: "Pacific/Rarotonga",
    standard: {
        offset: -600
    }
},
{
    tzId: "Indian/Cocos",
    standard: {
        offset: 390
    }
},
{
    tzId: "Pacific/Fiji",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Gambier",
    standard: {
        offset: -600
    }
},
{
    tzId: "Pacific/Guam",
    standard: {
        offset: 600
    }
},
{
    tzId: "Pacific/Tarawa",
    standard: {
        offset: 840
    }
},
{
    tzId: "Pacific/Saipan",
    standard: {
        offset: 600
    }
},
{
    tzId: "Pacific/Majuro",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Chuuk",
    standard: {
        offset: 660
    }
},
{
    tzId: "Pacific/Nauru",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Noumea",
    standard: {
        offset: 660
    }
},
{
    tzId: "Pacific/Auckland",
    standard: {
        offset: 765
    }
},
{
    tzId: "Pacific/Niue",
    standard: {
        offset: -660
    }
},
{
    tzId: "Pacific/Norfolk",
    standard: {
        offset: 690
    }
},
{
    tzId: "Pacific/Palau",
    standard: {
        offset: 540
    }
},
{
    tzId: "Pacific/Port_Moresby",
    standard: {
        offset: 600
    }
},
{
    tzId: "Pacific/Pitcairn",
    standard: {
        offset: -480
    }
},
{
    tzId: "Pacific/Pago_Pago",
    standard: {
        offset: -660
    }
},
{
    tzId: "Pacific/Apia",
    standard: {
        offset: 780
    }
},
{
    tzId: "Pacific/Guadalcanal",
    standard: {
        offset: 660
    }
},
{
    tzId: "Pacific/Fakaofo",
    standard: {
        offset: 840
    }
},
{
    tzId: "Pacific/Tongatapu",
    standard: {
        offset: 780
    }
},
{
    tzId: "Pacific/Funafuti",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Johnston",
    standard: {
        offset: -600
    }
},
{
    tzId: "Pacific/Midway",
    standard: {
        offset: -660
    }
},
{
    tzId: "Pacific/Wake",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Efate",
    standard: {
        offset: 660
    }
},
{
    tzId: "Pacific/Wallis",
    standard: {
        offset: 720
    }
},
{
    tzId: "Etc/GMT",
    standard: {
        offset: 0
    }
},
{
    tzId: "Etc/GMT-14",
    standard: {
        offset: 0
    }
},
{
    tzId: "Asia/Riyadh87",
    standard: {
        offset: 187
    }
},
{
    tzId: "America/Argentina/Buenos_Aires",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Cordoba",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Salta",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Tucuman",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/La_Rioja",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/San_Juan",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Jujuy",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Catamarca",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Mendoza",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/San_Luis",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Argentina/Rio_Gallegos",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Ushuaia",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Aruba",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/La_Paz",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Noronha",
    standard: {
        offset: -120
    }
},
{
    tzId: "America/Belem",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Santarem",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Fortaleza",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Recife",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Araguaina",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Maceio",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Bahia",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Sao_Paulo",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Campo_Grande",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Cuiaba",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Porto_Velho",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Boa_Vista",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Manaus",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Eirunepe",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Rio_Branco",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Santiago",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Bogota",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Curacao",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Guayaquil",
    standard: {
        offset: -360
    }
},
{
    tzId: "Atlantic/Stanley",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Cayenne",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Guyana",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Asuncion",
    standard: {
        offset: -240,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 0,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 0,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Lima",
    standard: {
        offset: -300
    }
},
{
    tzId: "Atlantic/South_Georgia",
    standard: {
        offset: -120
    }
},
{
    tzId: "America/Paramaribo",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Port_of_Spain",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Montevideo",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Caracas",
    standard: {
        offset: -210
    }
},
{
    tzId: "Antarctica/Casey",
    standard: {
        offset: 480
    }
},
{
    tzId: "Antarctica/Davis",
    standard: {
        offset: 360
    }
},
{
    tzId: "Antarctica/Macquarie",
    standard: {
        offset: 660
    }
},
{
    tzId: "Indian/Kerguelen",
    standard: {
        offset: 300
    }
},
{
    tzId: "Antarctica/DumontDUrville",
    standard: {
        offset: 600
    }
},
{
    tzId: "Antarctica/Syowa",
    standard: {
        offset: 180
    }
},
{
    tzId: "Antarctica/Vostok",
    standard: {
        offset: 360
    }
},
{
    tzId: "Antarctica/Rothera",
    standard: {
        offset: -180
    }
},
{
    tzId: "Antarctica/Palmer",
    standard: {
        offset: -240
    }
},
{
    tzId: "Antarctica/McMurdo",
    standard: {
        offset: 720
    }
},
{
    tzId: "Asia/Riyadh89",
    standard: {
        offset: 187
    }
},
{
    tzId: "Africa/Algiers",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Luanda",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Porto-Novo",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Gaborone",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Ouagadougou",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Bujumbura",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Douala",
    standard: {
        offset: 60
    }
},
{
    tzId: "Atlantic/Cape_Verde",
    standard: {
        offset: -60
    }
},
{
    tzId: "Africa/Bangui",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Ndjamena",
    standard: {
        offset: 60
    }
},
{
    tzId: "Indian/Comoro",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Kinshasa",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Brazzaville",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Abidjan",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Djibouti",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Cairo",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Malabo",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Asmara",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Addis_Ababa",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Libreville",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Banjul",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Accra",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Conakry",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Bissau",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Nairobi",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Maseru",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Monrovia",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Tripoli",
    standard: {
        offset: 60
    }
},
{
    tzId: "Indian/Antananarivo",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Blantyre",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Bamako",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Nouakchott",
    standard: {
        offset: 0
    }
},
{
    tzId: "Indian/Mauritius",
    standard: {
        offset: 240
    }
},
{
    tzId: "Indian/Mayotte",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Casablanca",
    standard: {
        offset: 0,
        mon: 9,
        week: -1,
        wkday: 1,
        hour: 3,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 60,
        mon: 4,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Africa/El_Aaiun",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Maputo",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Windhoek",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Niamey",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Lagos",
    standard: {
        offset: 60
    }
},
{
    tzId: "Indian/Reunion",
    standard: {
        offset: 240
    }
},
{
    tzId: "Africa/Kigali",
    standard: {
        offset: 120
    }
},
{
    tzId: "Atlantic/St_Helena",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Sao_Tome",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Dakar",
    standard: {
        offset: 0
    }
},
{
    tzId: "Indian/Mahe",
    standard: {
        offset: 240
    }
},
{
    tzId: "Africa/Freetown",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Mogadishu",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Johannesburg",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Khartoum",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Juba",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Mbabane",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Dar_es_Salaam",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Lome",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Tunis",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Kampala",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Lusaka",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Harare",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/London",
    standard: {
        offset: 0
    }
},
{
    tzId: "WET",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Tirane",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Andorra",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Vienna",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Minsk",
    standard: {
        offset: 180
    }
},
{
    tzId: "Europe/Brussels",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Sofia",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Prague",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Copenhagen",
    standard: {
        offset: 0
    }
},
{
    tzId: "America/Danmarkshavn",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Europe/Tallinn",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Helsinki",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Paris",
    standard: {
        offset: 9
    }
},
{
    tzId: "Europe/Berlin",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Gibraltar",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Athens",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Budapest",
    standard: {
        offset: 60
    }
},
{
    tzId: "Atlantic/Reykjavik",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Rome",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Riga",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Vaduz",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Vilnius",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Luxembourg",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Malta",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Chisinau",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Monaco",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Amsterdam",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Oslo",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Warsaw",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Lisbon",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Bucharest",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Kaliningrad",
    standard: {
        offset: 180
    }
},
{
    tzId: "Europe/Moscow",
    standard: {
        offset: 240
    }
},
{
    tzId: "Europe/Volgograd",
    standard: {
        offset: 240
    }
},
{
    tzId: "Europe/Samara",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Yekaterinburg",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Omsk",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Novosibirsk",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Novokuznetsk",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Krasnoyarsk",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Irkutsk",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Yakutsk",
    standard: {
        offset: 600
    }
},
{
    tzId: "Asia/Vladivostok",
    standard: {
        offset: 660
    }
},
{
    tzId: "Asia/Sakhalin",
    standard: {
        offset: 660
    }
},
{
    tzId: "Asia/Magadan",
    standard: {
        offset: 720
    }
},
{
    tzId: "Asia/Kamchatka",
    standard: {
        offset: 720
    }
},
{
    tzId: "Asia/Anadyr",
    standard: {
        offset: 720
    }
},
{
    tzId: "Europe/Belgrade",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Madrid",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Stockholm",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Zurich",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Istanbul",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Kiev",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Uzhgorod",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Zaporozhye",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Simferopol",
    standard: {
        offset: 120
    }
},
{
    tzId: "EST",
    standard: {
        offset: 0
    }
},
{
    tzId: "America/New_York",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Chicago",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/North_Dakota/Center",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/North_Dakota/New_Salem",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/North_Dakota/Beulah",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Denver",
    standard: {
        offset: -420,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Los_Angeles",
    standard: {
        offset: -480,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -420,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Juneau",
    standard: {
        offset: -600,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -540,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Pacific/Honolulu",
    standard: {
        offset: -600
    }
},
{
    tzId: "America/Phoenix",
    standard: {
        offset: -420
    }
},
{
    tzId: "America/Boise",
    standard: {
        offset: -420,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Indianapolis",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Marengo",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Vincennes",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Tell_City",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Petersburg",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Knox",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Winamac",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Vevay",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Kentucky/Louisville",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Kentucky/Monticello",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Detroit",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Menominee",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/St_Johns",
    standard: {
        offset: -150,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -90,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Goose_Bay",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Halifax",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Moncton",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Blanc-Sablon",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Toronto",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Winnipeg",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Regina",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Edmonton",
    standard: {
        offset: -420,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Vancouver",
    standard: {
        offset: -420
    }
},
{
    tzId: "America/Pangnirtung",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Iqaluit",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Resolute",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Rankin_Inlet",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Cambridge_Bay",
    standard: {
        offset: -480,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -420,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Cancun",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Merida",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Matamoros",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Monterrey",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Mexico_City",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Ojinaga",
    standard: {
        offset: -420,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Chihuahua",
    standard: {
        offset: -420,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Hermosillo",
    standard: {
        offset: -420
    }
},
{
    tzId: "America/Mazatlan",
    standard: {
        offset: -420,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Bahia_Banderas",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Tijuana",
    standard: {
        offset: -480,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -420,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Santa_Isabel",
    standard: {
        offset: -480,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -420,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Anguilla",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Antigua",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Nassau",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Barbados",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Belize",
    standard: {
        offset: -360
    }
},
{
    tzId: "Atlantic/Bermuda",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Cayman",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Costa_Rica",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Havana",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Dominica",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Santo_Domingo",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/El_Salvador",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Grenada",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Guadeloupe",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Guatemala",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Port-au-Prince",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Tegucigalpa",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Jamaica",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Martinique",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Montserrat",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Managua",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Panama",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Puerto_Rico",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/St_Kitts",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/St_Lucia",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Miquelon",
    standard: {
        offset: -180,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -120,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/St_Vincent",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Grand_Turk",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Tortola",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/St_Thomas",
    standard: {
        offset: -240
    }
}
]
}};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 3991);
TimezoneData = Y.Date.Timezone.__tzoneData;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 3992);
Y.Date.Timezone.__tzoneLinks = {
    "Mideast/Riyadh88": "Asia/Riyadh88",
    "Europe/Nicosia": "Asia/Nicosia",
    "US/Pacific-New": "America/Los_Angeles",
    "GMT": "Etc/GMT",
    "Etc/UTC": "Etc/GMT",
    "Etc/Universal": "Etc/UTC",
    "Etc/Zulu": "Etc/UTC",
    "Etc/Greenwich": "Etc/GMT",
    "Etc/GMT-0": "Etc/GMT",
    "Etc/GMT+0": "Etc/GMT",
    "Etc/GMT0": "Etc/GMT",
    "Mideast/Riyadh87": "Asia/Riyadh87",
    "America/Lower_Princes": "America/Curacao",
    "America/Kralendijk": "America/Curacao",
    "Antarctica/South_Pole": "Antarctica/McMurdo",
    "Mideast/Riyadh89": "Asia/Riyadh89",
    "Africa/Asmera": "Africa/Asmara",
    "Africa/Timbuktu": "Africa/Bamako",
    "America/Argentina/ComodRivadavia": "America/Argentina/Catamarca",
    "America/Atka": "America/Adak",
    "America/Buenos_Aires": "America/Argentina/Buenos_Aires",
    "America/Catamarca": "America/Argentina/Catamarca",
    "America/Coral_Harbour": "America/Atikokan",
    "America/Cordoba": "America/Argentina/Cordoba",
    "America/Ensenada": "America/Tijuana",
    "America/Fort_Wayne": "America/Indiana/Indianapolis",
    "America/Indianapolis": "America/Indiana/Indianapolis",
    "America/Jujuy": "America/Argentina/Jujuy",
    "America/Knox_IN": "America/Indiana/Knox",
    "America/Louisville": "America/Kentucky/Louisville",
    "America/Mendoza": "America/Argentina/Mendoza",
    "America/Porto_Acre": "America/Rio_Branco",
    "America/Rosario": "America/Argentina/Cordoba",
    "America/Virgin": "America/St_Thomas",
    "Asia/Ashkhabad": "Asia/Ashgabat",
    "Asia/Chungking": "Asia/Chongqing",
    "Asia/Dacca": "Asia/Dhaka",
    "Asia/Katmandu": "Asia/Kathmandu",
    "Asia/Calcutta": "Asia/Kolkata",
    "Asia/Macao": "Asia/Macau",
    "Asia/Tel_Aviv": "Asia/Jerusalem",
    "Asia/Saigon": "Asia/Ho_Chi_Minh",
    "Asia/Thimbu": "Asia/Thimphu",
    "Asia/Ujung_Pandang": "Asia/Makassar",
    "Asia/Ulan_Bator": "Asia/Ulaanbaatar",
    "Atlantic/Faeroe": "Atlantic/Faroe",
    "Atlantic/Jan_Mayen": "Europe/Oslo",
    "Australia/ACT": "Australia/Sydney",
    "Australia/Canberra": "Australia/Sydney",
    "Australia/LHI": "Australia/Lord_Howe",
    "Australia/NSW": "Australia/Sydney",
    "Australia/North": "Australia/Darwin",
    "Australia/Queensland": "Australia/Brisbane",
    "Australia/South": "Australia/Adelaide",
    "Australia/Tasmania": "Australia/Hobart",
    "Australia/Victoria": "Australia/Melbourne",
    "Australia/West": "Australia/Perth",
    "Australia/Yancowinna": "Australia/Broken_Hill",
    "Brazil/Acre": "America/Rio_Branco",
    "Brazil/DeNoronha": "America/Noronha",
    "Brazil/East": "America/Sao_Paulo",
    "Brazil/West": "America/Manaus",
    "Canada/Atlantic": "America/Halifax",
    "Canada/Central": "America/Winnipeg",
    "Canada/East-Saskatchewan": "America/Regina",
    "Canada/Eastern": "America/Toronto",
    "Canada/Mountain": "America/Edmonton",
    "Canada/Newfoundland": "America/St_Johns",
    "Canada/Pacific": "America/Vancouver",
    "Canada/Saskatchewan": "America/Regina",
    "Canada/Yukon": "America/Whitehorse",
    "Chile/Continental": "America/Santiago",
    "Chile/EasterIsland": "Pacific/Easter",
    "Cuba": "America/Havana",
    "Egypt": "Africa/Cairo",
    "Eire": "Europe/Dublin",
    "Europe/Belfast": "Europe/London",
    "Europe/Tiraspol": "Europe/Chisinau",
    "GB": "Europe/London",
    "GB-Eire": "Europe/London",
    "GMT+0": "Etc/GMT",
    "GMT-0": "Etc/GMT",
    "GMT0": "Etc/GMT",
    "Greenwich": "Etc/GMT",
    "Hongkong": "Asia/Hong_Kong",
    "Iceland": "Atlantic/Reykjavik",
    "Iran": "Asia/Tehran",
    "Israel": "Asia/Jerusalem",
    "Jamaica": "America/Jamaica",
    "Japan": "Asia/Tokyo",
    "Kwajalein": "Pacific/Kwajalein",
    "Libya": "Africa/Tripoli",
    "Mexico/BajaNorte": "America/Tijuana",
    "Mexico/BajaSur": "America/Mazatlan",
    "Mexico/General": "America/Mexico_City",
    "NZ": "Pacific/Auckland",
    "NZ-CHAT": "Pacific/Chatham",
    "Navajo": "America/Denver",
    "PRC": "Asia/Shanghai",
    "Pacific/Samoa": "Pacific/Pago_Pago",
    "Pacific/Yap": "Pacific/Chuuk",
    "Pacific/Truk": "Pacific/Chuuk",
    "Pacific/Ponape": "Pacific/Pohnpei",
    "Poland": "Europe/Warsaw",
    "Portugal": "Europe/Lisbon",
    "ROC": "Asia/Taipei",
    "ROK": "Asia/Seoul",
    "Singapore": "Asia/Singapore",
    "Turkey": "Europe/Istanbul",
    "UCT": "Etc/UCT",
    "US/Alaska": "America/Anchorage",
    "US/Aleutian": "America/Adak",
    "US/Arizona": "America/Phoenix",
    "US/Central": "America/Chicago",
    "US/East-Indiana": "America/Indiana/Indianapolis",
    "US/Eastern": "America/New_York",
    "US/Hawaii": "Pacific/Honolulu",
    "US/Indiana-Starke": "America/Indiana/Knox",
    "US/Michigan": "America/Detroit",
    "US/Mountain": "America/Denver",
    "US/Pacific": "America/Los_Angeles",
    "US/Samoa": "Pacific/Pago_Pago",
    "UTC": "Etc/UTC",
    "Universal": "Etc/UTC",
    "W-SU": "Europe/Moscow",
    "Zulu": "Etc/UTC",
    "Europe/Mariehamn": "Europe/Helsinki",
    "Europe/Vatican": "Europe/Rome",
    "Europe/San_Marino": "Europe/Rome",
    "Arctic/Longyearbyen": "Europe/Oslo",
    "Europe/Ljubljana": "Europe/Belgrade",
    "Europe/Podgorica": "Europe/Belgrade",
    "Europe/Sarajevo": "Europe/Belgrade",
    "Europe/Skopje": "Europe/Belgrade",
    "Europe/Zagreb": "Europe/Belgrade",
    "Europe/Bratislava": "Europe/Prague",
    "America/Shiprock": "America/Denver",
    "America/St_Barthelemy": "America/Guadeloupe",
    "America/Marigot": "America/Guadeloupe"
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4134);
TimezoneLinks = Y.Date.Timezone.__tzoneLinks;/**
 * Timezone performs operations on a given timezone string represented in Olson tz database
 * This module uses parts of zimbra AjxTimezone to handle time-zones
 * @module datatype-date-timezone
 * @requires datatype-date-format
 */

/**
 * Class to handle timezones
 * @class __zTimezone
 * @namespace Date
 * @private
 * @constructor
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4148);
Y.Date.__zTimezone = function() {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__zTimezone", 4148);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4149);
this.localeData = Y.Intl.get(MODULE_NAME);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4152);
AjxTimezone = Y.Date.__zTimezone;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4154);
Y.mix(AjxTimezone, {
    /**
     * Get DST trasition date
     * @method getTransition
     * @static
     * @param onset {Object} DST transition information
     * @param year {Number} Year in which transition date is calculated
     * @return {Array} Transition as [year, month, day]
     */
    getTransition: function(onset, year) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getTransition", 4163);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4164);
var trans = [ year || new Date().getFullYear(), onset.mon, 1 ], date, wkday, adjust, last, count;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4165);
if (onset.mday) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4166);
trans[2] = onset.mday;
        }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4168);
if (onset.wkday) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4169);
date = new Date(year, onset.mon - 1, 1, onset.hour, onset.min, onset.sec);

            // last wkday of month
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4172);
if (onset.week === -1) {
                // NOTE: This creates a date of the *last* day of specified month by
                //       setting the month to *next* month and setting day of month
                //       to zero (i.e. the day *before* the first day).
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4176);
last = new Date(new Date(date.getTime()).setMonth(onset.mon, 0));
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4177);
count = last.getDate();
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4178);
wkday = last.getDay() + 1;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4179);
adjust = wkday >= onset.wkday ? wkday - onset.wkday : 7 - onset.wkday - wkday;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4180);
trans[2] = count - adjust;
            }

            // Nth wkday of month
            else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4185);
wkday = date.getDay() + 1;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4186);
adjust = onset.wkday === wkday ? 1 :0;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4187);
trans[2] = onset.wkday + 7 * (onset.week - adjust) - wkday + 1;
            }
        }}
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4190);
return trans;
    },

    /**
     * Add dst transition rules with dst information
     * @method addRule
     * @static
     * @param rule {Object} Object containing timezone information
     */
    addRule: function(rule) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "addRule", 4199);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4200);
var tzId = rule.tzId, array;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4202);
AjxTimezone._SHORT_NAMES[tzId] = AjxTimezone._generateShortName(rule.standard.offset);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4203);
AjxTimezone._CLIENT2RULE[tzId] = rule;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4205);
array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4206);
array.push(rule);
    },

    /**
     * Get dst transition rule
     * @method getRule
     * @static
     * @param tzId {Object} Timezone Id
     * @param tz {Object} Rule object to match against
     * @return {Object} The rule
     */
    getRule: function(tzId, tz) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getRule", 4217);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4218);
var rule = AjxTimezone._CLIENT2RULE[tzId],
            names = [ "standard", "daylight" ],
            rules, i, j, found, name, onset, breakOuter, p;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4221);
if (!rule && tz) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4222);
rules = tz.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4223);
for (i = 0; i < rules.length; i++) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4224);
rule = rules[i];

                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4226);
found = true;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4227);
for (j = 0; j < names.length; j++) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4228);
name = names[j];
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4229);
onset = rule[name];
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4230);
if (!onset) { continue; }
			
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4232);
breakOuter = false;

                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4234);
for (p in tz[name]) {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4235);
if (tz[name][p] !== onset[p]) {
                            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4236);
found = false;
                            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4237);
breakOuter = true;
                            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4238);
break;
                        }
                    }

                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4242);
if(breakOuter){
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4243);
break;
                    }
                }
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4246);
if (found) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4247);
return rule;
                }
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4250);
return null;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4253);
return rule;
    },

    /**
     * Get offset in minutes from GMT
     * @method getOffset
     * @static
     * @param tzId {String} Timezone ID
     * @param date {Date} Date on which the offset is to be found (offset may differ by date due to DST)
     * @return {Number} Offset in minutes from GMT
     */
    getOffset: function(tzId, date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getOffset", 4264);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4265);
var rule = AjxTimezone.getRule(tzId), year, standard, stdTrans, dstTrans, month, stdMonth, dstMonth, isDST;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4266);
if (rule && rule.daylight) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4267);
year = date.getFullYear();

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4269);
standard = rule.standard, daylight  = rule.daylight;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4270);
stdTrans = AjxTimezone.getTransition(standard, year);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4271);
dstTrans = AjxTimezone.getTransition(daylight, year);

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4273);
month    = date.getMonth()+1, day = date.getDate();
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4274);
stdMonth = stdTrans[1], stdDay = stdTrans[2];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4275);
dstMonth = dstTrans[1], dstDay = dstTrans[2];

            // northern hemisphere
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4278);
isDST = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4279);
if (dstMonth < stdMonth) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4280);
isDST = month > dstMonth && month < stdMonth;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4281);
isDST = isDST || (month === dstMonth && day >= dstDay);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4282);
isDST = isDST || (month === stdMonth && day <  stdDay);
            }

            // sorthern hemisphere
            else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4287);
isDST = month < dstMonth || month > stdMonth;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4288);
isDST = isDST || (month === dstMonth && day <  dstDay);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4289);
isDST = isDST || (month === stdMonth && day >= stdDay);
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4292);
return isDST ? daylight.offset : standard.offset;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4294);
return rule ? rule.standard.offset : -(new Date().getTimezoneOffset());
    },

    /**
     * Compare rules to sort by offset
     * @method _BY_OFFSET
     * @static
     * @private
     * @param arule {Object} Rule to compare
     * @param brule {Object} Rule to compare
     * @return {Number} Difference in offsets between the rules.
               If offsets are equal, returns 1 if timezone id of arule comes first alphabetically, -1 otherwise
     */
    _BY_OFFSET: function(arule, brule) {
        // sort by offset and then by name
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_BY_OFFSET", 4307);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4309);
var delta = arule.standard.offset - brule.standard.offset,
            aname = arule.tzId,
            bname = brule.tzId;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4312);
if (delta === 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4313);
if (aname < bname) { delta = -1; }
            else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4314);
if (aname > bname) { delta = 1; }}
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4316);
return delta;
    },

    _SHORT_NAMES: {},
    _CLIENT2RULE: {},
    /**
     * The data is specified using the server identifiers for historical
     * reasons. Perhaps in the future we'll use the client (i.e. Java)
     * identifiers on the server as well.
     */
    STANDARD_RULES: [],
    DAYLIGHT_RULES: [],

    /**
     * Generate short name for a timezone like +0530 for IST
     * @method _generateShortName
     * @static
     * @private
     * @param offset {Number} Offset in minutes from GMT
     * @param [period=false] {Boolean} If true, a dot is inserted between hours and minutes
     * @return {String} Short name for timezone
     */
    _generateShortName: function(offset, period) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generateShortName", 4338);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4339);
if (offset === 0) { return ""; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4340);
var sign = offset < 0 ? "-" : "+",
            stdOffset = Math.abs(offset),
            hours = Math.floor(stdOffset / 60),
            minutes = stdOffset % 60;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4345);
hours = hours < 10 ? '0' + hours : hours;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4346);
minutes = minutes < 10 ? '0' + minutes : minutes;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4347);
return [sign,hours,period?".":"",minutes].join("");
    },

    /**
     * Initialized timezone rules. Only for internal use.
     * @method _initTimezoneRules
     * @static
     * @private
     */
    _initTimezoneRules: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_initTimezoneRules", 4356);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4357);
var rule, i, j, array;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4359);
for (i = 0; i < TimezoneData.TIMEZONE_RULES.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4360);
rule = TimezoneData.TIMEZONE_RULES[i];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4361);
array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4362);
array.push(rule);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4365);
TimezoneData.TIMEZONE_RULES.sort(AjxTimezone._BY_OFFSET);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4366);
for (j = 0; j < TimezoneData.TIMEZONE_RULES.length; j++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4367);
rule = TimezoneData.TIMEZONE_RULES[j];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4368);
AjxTimezone.addRule(rule);
        }
    },

    /**
     * Get timezone ids matching raw offset
     * @method getCurrentTimezoneIds
     * @static
     * @param rawOffset {Number} Offset in seconds from GMT
     * @return {Array} timezone ids having the specified offset
     */
    getCurrentTimezoneIds: function(rawOffset) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getCurrentTimezoneIds", 4379);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4380);
rawOffset = rawOffset/60;	//Need offset in minutes

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4382);
var result = [],
            today = new Date(),
            tzId, link;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4386);
for(tzId in AjxTimezone._CLIENT2RULE) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4387);
if(rawOffset === 0 || AjxTimezone.getOffset(tzId, today) === rawOffset) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4388);
result.push(tzId);
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4392);
for(link in TimezoneLinks) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4393);
if(Y.Array.indexOf(result,TimezoneLinks[link]) !== -1) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4394);
result.push(link);
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4397);
return result;
    },

    /**
     * Get the first timezone matching rawOffset
     * @method getTimezoneIdForOffset
     * @static
     * @param rawOffset {Number} offset in seconds from GMT
     * @return {String} tzId of timezone that matches the offset. Returns empty string if no matches found
     */
    getTimezoneIdForOffset: function(rawOffset) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getTimezoneIdForOffset", 4407);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4408);
rawOffset = rawOffset/60;	//Need offset in minutes

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4410);
var etcGMTId = "Etc/GMT",
            today = new Date(),
            tzId;
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4414);
if(rawOffset % 60 === 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4415);
if(rawOffset !== 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4416);
etcGMTId += (rawOffset > 0? "-": "+") + rawOffset/60;
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4419);
if(AjxTimezone._CLIENT2RULE[etcGMTId] !== undefined) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4420);
return etcGMTId;
            }
        }
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4424);
for(tzId in AjxTimezone._CLIENT2RULE) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4425);
if(AjxTimezone.getOffset(tzId, today) === rawOffset) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4426);
return tzId;
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4430);
return "";
    },

    /**
     * Check whether DST is active at specified date
     * @method isDST
     * @static
     * @param tzId {String} Timezone ID
     * @param date {Date}
     * @return {Number} 1 if DST is active, 0 if not, and -1 if specified timezone does not observe DST
     */
    isDST: function(tzId, date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isDST", 4441);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4442);
var rule = AjxTimezone.getRule(tzId),
            year,
            standard, daylight,
            stdTrans, dstTrans,
            month, day,
            stdMonth, stdDay,
            dstMonth, dstDay,
            isDSTActive;
            
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4451);
if (rule && rule.daylight) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4452);
year = date.getFullYear();

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4454);
standard = rule.standard, daylight  = rule.daylight;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4455);
stdTrans = AjxTimezone.getTransition(standard, year);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4456);
dstTrans = AjxTimezone.getTransition(daylight, year);

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4458);
month    = date.getMonth()+1, day = date.getDate();
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4459);
stdMonth = stdTrans[1], stdDay = stdTrans[2];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4460);
dstMonth = dstTrans[1], dstDay = dstTrans[2];

            // northern hemisphere
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4463);
isDSTActive = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4464);
if (dstMonth < stdMonth) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4465);
isDSTActive = month > dstMonth && month < stdMonth;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4466);
isDSTActive = isDSTActive || (month === dstMonth && day >= dstDay);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4467);
isDSTActive = isDSTActive || (month === stdMonth && day <  stdDay);
            }

            // sorthern hemisphere
            else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4472);
isDSTActive = month < dstMonth || month > stdMonth;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4473);
isDSTActive = isDSTActive || (month === dstMonth && day <  dstDay);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4474);
isDSTActive = isDSTActive || (month === stdMonth && day >= stdDay);
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4477);
return isDSTActive? 1:0;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4479);
return -1;
    },

    /**
     * Check whether tzId is a valid timezone
     * @method isValidTimezoneId
     * @static
     * @param tzId {String} Timezone ID
     * @return {Boolean} true if tzId is valid, false otherwise
     */
    isValidTimezoneId: function(tzId) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isValidTimezoneId", 4489);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4490);
return (AjxTimezone._CLIENT2RULE[tzId] !== undefined || TimezoneLinks[tzId] !== undefined);
    }
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4494);
Y.mix(AjxTimezone.prototype, {

    /**
     * Get short name of timezone
     * @method getShortName
     * @param tzId {String} Timezone ID
     * @return {String}
     */
    getShortName: function(tzId) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getShortName", 4502);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4503);
var shortName = this.localeData[tzId + "_Z_short"] || ["GMT",AjxTimezone._SHORT_NAMES[tzId]].join("");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4504);
return shortName;
    },

    /**
     * Get medium length name of timezone
     * @method getMediumName
     * @param tzId {String} Timezone ID
     * @return {String}
     */
    getMediumName: function(tzId) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getMediumName", 4513);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4514);
var mediumName = this.localeData[tzId + "_Z_abbreviated"] || ['(',this.getShortName(tzId),') ',tzId].join("");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4515);
return mediumName;
    },

    /**
     * Get long name of timezone
     * @method getLongName
     * @param tzId {String} Timezone Id
     * @return {String}
     */
    getLongName: AjxTimezone.prototype.getMediumName
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4527);
AjxTimezone._initTimezoneRules();

/**
 * Timezone performs operations on a given timezone string represented in Olson tz database
 * @class Timezone
 * @constructor
 * @param {String} tzId TimeZone ID as in Olson tz database
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4535);
Y.Date.Timezone = function(tzId) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "Timezone", 4535);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4536);
var normalizedId = Timezone.getNormalizedTimezoneId(tzId);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4537);
if(normalizedId === "") {
	_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4538);
Y.error("Could not find timezone: " + tzId);
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4540);
this.tzId = normalizedId;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4542);
this._ajxTimeZoneInstance = new AjxTimezone();
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4545);
Y.namespace("Date");
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4546);
Timezone = Y.Date.Timezone;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4548);
Y.mix(Timezone, {
    /**
     * Get Day of Year(0-365) for the date passed
     * @method _getDOY
     * @private
     * @static
     * @param {Date} date
     * @return {Number} Day of Year
     */
    _getDOY: function (date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_getDOY", 4557);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4558);
var oneJan = new Date(date.getFullYear(),0,1);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4559);
return Math.ceil((date - oneJan) / 86400000);
    },

    /**
     * Get integer part of floating point argument
     * @method _floatToInt
     * @static
     * @private
     * @param floatNum {Number} A real number
     * @return {Number} Integer part of floatNum
     */
    _floatToInt: function (floatNum) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_floatToInt", 4570);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4571);
return (floatNum < 0) ? Math.ceil(floatNum) : Math.floor(floatNum);
    },

    /**
     * Returns list of timezone Id's that have the same rawOffSet as passed in
     * @method getCurrentTimezoneIds
     * @static
     * @param {Number} rawOffset Raw offset (in seconds) from GMT.
     * @return {Array} array of timezone Id's that match rawOffset passed in to the API.
     */
    getCurrentTimezoneIds: function(rawOffset) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getCurrentTimezoneIds", 4581);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4582);
return AjxTimezone.getCurrentTimezoneIds(rawOffset);
    },

    /**
     * Given a raw offset in seconds, get the tz database ID that reflects the given raw offset, or empty string if there is no such ID.
     * Where available, the function will return an ID starting with "Etc/GMT".
     * For offsets where no such ID exists but that are used by actual time zones, the ID of one of those time zones is returned.
     * Note that the offset shown in an "Etc/GMT" ID is opposite to the value of rawOffset
     * @method getTimezoneIdForOffset
     * @static
     * @param {Number} rawOffset Offset from GMT in seconds
     * @return {String} timezone id
     */
    getTimezoneIdForOffset: function(rawOffset) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getTimezoneIdForOffset", 4595);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4596);
return AjxTimezone.getTimezoneIdForOffset(rawOffset);
    },

    /**
     * Given a wall time reference, convert it to UNIX time - seconds since Epoch
     * @method getUnixTimeFromWallTime
     * @static
     * @param {Object} walltime Walltime that needs conversion. Missing properties will be treat as 0.
     * @return {Number} UNIX time - time in seconds since Epoch
     */
    getUnixTimeFromWallTime: function(walltime) {
        /*
         * Initialize any missing properties.
         */
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getUnixTimeFromWallTime", 4606);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4610);
if(!Y.Lang.isValue( walltime.year )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4611);
walltime.year = new Date().getFullYear();	//Default to current year
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4613);
if(!Y.Lang.isValue( walltime.mon )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4614);
walltime.mon = 0;				//Default to January
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4616);
if(!Y.Lang.isValue( walltime.mday )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4617);
walltime.mday = 1;				//Default to first of month
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4619);
if(!Y.Lang.isValue( walltime.hour )) {			//Default to 12 midnight
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4620);
walltime.hour = 0;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4622);
if(!Y.Lang.isValue( walltime.min )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4623);
walltime.min = 0;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4625);
if(!Y.Lang.isValue( walltime.sec )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4626);
walltime.sec = 0;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4628);
if(!Y.Lang.isValue( walltime.gmtoff )) {			//Default to UTC
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4629);
walltime.gmtoff = 0;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4632);
var utcTime = Date.UTC(walltime.year, walltime.mon, walltime.mday, walltime.hour, walltime.min, walltime.sec);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4633);
utcTime -= walltime.gmtoff*1000;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4635);
return Timezone._floatToInt(utcTime/1000);	//Unix time: count from midnight Jan 1 1970 UTC
    },

    /**
     * Checks if the timestamp passed in is a valid timestamp for this timezone and offset.
     * @method isValidTimestamp
     * @static
     * @param {String} timeStamp Time value in UTC RFC3339 format - yyyy-mm-ddThh:mm:ssZ or yyyy-mm-ddThh:mm:ss+/-HH:MM
     * @param {Number} rawOffset An offset from UTC in seconds.
     * @return {Boolean} true if valid timestamp, false otherwise
     */
    isValidTimestamp: function(timeStamp, rawOffset) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isValidTimestamp", 4646);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4647);
var regex = /^(\d\d\d\d)\-([0-1][0-9])\-([0-3][0-9])([T ])([0-2][0-9]):([0-6][0-9]):([0-6][0-9])(Z|[+\-][0-1][0-9]:[0-3][0-9])?$/,
            matches = (new RegExp(regex)).exec(timeStamp),
            year, month, day, hours, minutes, seconds, tZone,
            m31, maxDays,
            dateTimeSeparator, offset;

        //No match
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4654);
if(matches === null) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4655);
return false;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4658);
year = parseInt(matches[1], 10),
        month = parseInt(matches[2], 10),
        day = parseInt(matches[3], 10),
        dateTimeSeparator = matches[4],
        hours = parseInt(matches[5], 10),
        minutes = parseInt(matches[6], 10),
        seconds = parseInt(matches[7], 10),
        tZone = matches[8];
        //Month should be in 1-12
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4667);
if(month < 1 || month > 12) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4668);
return false;
        }

        //Months with 31 days
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4672);
m31 = [1,3,5,7,8,10,12];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4673);
maxDays = 30;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4674);
if(Y.Array.indexOf(m31,month) !== -1) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4675);
maxDays = 31;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4676);
if(month === 2) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4677);
if(year % 400 === 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4678);
maxDays = 29;
            } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4679);
if(year % 100 === 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4680);
maxDays = 28;
            } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4681);
if(year % 4 === 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4682);
maxDays = 29;
            } else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4684);
maxDays = 28;
            }}}
        }}

        //Day should be valid day for month
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4689);
if(day < 1 || day > maxDays) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4690);
return false;
        }

        //Hours should be in 0-23
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4694);
if(hours < 0 || hours > 23) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4695);
return false;
        }

        //Minutes and Seconds should in 0-59
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4699);
if(minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4700);
return false;
        }

        //Now verify timezone
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4704);
if(dateTimeSeparator === " " && tZone === undefined) {
            //SQL Format
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4706);
return true;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4707);
if(dateTimeSeparator === "T" && tZone !== undefined) {
            //RFC3339 Format
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4709);
offset = 0;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4710);
if(tZone !== "Z") {
                //Not UTC TimeZone
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4712);
offset = parseInt(tZone.substr(1,3), 10)*60 + parseInt(tZone.substr(4), 10);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4713);
offset = offset*60;	//To seconds

                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4715);
offset = offset * (tZone.charAt(0) === "+" ? 1 : -1);
            }
            //Check offset in timeStamp with passed rawOffset
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4718);
if(offset === rawOffset) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4719);
return true;
            }
        }}

        //If reached here, wrong format
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4724);
return false;
    },

    /**
     * Checks if tzId passed in is a valid Timezone id in tz database.
     * @method isValidTimezoneId
     * @static
     * @param {String} tzId timezoneId to be checked for validity
     * @return {Boolean} true if tzId is a valid timezone id in tz database.
               tzId could be a "zone" id or a "link" id to be a valid tz Id. False otherwise
     */
    isValidTimezoneId: function(tzId) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isValidTimezoneId", 4735);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4736);
return AjxTimezone.isValidTimezoneId(tzId);
    },

    /**
     * Returns the normalized version of the time zone ID, or empty string if tzId is not a valid time zone ID.
     * If tzId is a link Id, the standard name will be returned.
     * @method getNormalizedTimezoneId
     * @static
     * @param {String} tzId The timezone ID whose normalized form is requested.
     * @return {String} The normalized version of the timezone Id, or empty string if tzId is not a valid time zone Id.
     */
    getNormalizedTimezoneId: function(tzId) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getNormalizedTimezoneId", 4747);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4748);
if(!Timezone.isValidTimezoneId(tzId)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4749);
return "";
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4751);
var normalizedId,
            next = tzId;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4754);
do {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4755);
normalizedId = next;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4756);
next = TimezoneLinks[normalizedId];
        }while( next !== undefined );

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4759);
return normalizedId;
    }
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4763);
Y.mix(Timezone.prototype, {
    /**
     * Parse RFC3339 date format and return the Date
     * Format: yyyy-mm-ddThh:mm:ssZ
     * @method _parseRFC3339
     * @private
     * @param {String} dString The date string to be parsed
     * @return {Date} The date represented by dString
     */
    _parseRFC3339: function(dString){
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_parseRFC3339", 4772);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4773);
var regexp = /(\d+)(\-)?(\d+)(\-)?(\d+)(T)?(\d+)(:)?(\d+)(:)?(\d+)(\.\d+)?(Z|([+\-])(\d+)(:)?(\d+))/,
            result = new Date(),
            d = dString.match(regexp),
            offset = 0;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4778);
result.setUTCDate(1);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4779);
result.setUTCFullYear(parseInt(d[1],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4780);
result.setUTCMonth(parseInt(d[3],10) - 1);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4781);
result.setUTCDate(parseInt(d[5],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4782);
result.setUTCHours(parseInt(d[7],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4783);
result.setUTCMinutes(parseInt(d[9],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4784);
result.setUTCSeconds(parseInt(d[11],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4785);
if (d[12]) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4786);
result.setUTCMilliseconds(parseFloat(d[12]) * 1000);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4788);
result.setUTCMilliseconds(0);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4790);
if (d[13] !== 'Z') {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4791);
offset = (d[15] * 60) + parseInt(d[17],10);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4792);
offset *= ((d[14] === '-') ? -1 : 1);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4793);
result.setTime(result.getTime() - offset * 60 * 1000);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4795);
return result;
    },

    /**
     * Parse SQL date format and return the Date
     * Format: yyyy-mm-dd hh:mm:ss
     * @method _parseSQLFormat
     * @private
     * @param {String} dString The date string to be parsed
     * @return {Date} The date represented by dString
     */
    _parseSQLFormat: function(dString) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_parseSQLFormat", 4806);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4807);
var dateTime = dString.split(" "),
            date = dateTime[0].split("-"),
            time = dateTime[1].split(":"),
            offset = AjxTimezone.getOffset(this.tzId, new Date(date[0], date[1] - 1, date[2]));
            
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4812);
return new Date(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) - offset*60*1000);
    },

    /**
     * Return a short name for the timezone
     * @method getShortName
     * @return {String} Short name
     */
    getShortName: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getShortName", 4820);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4821);
return this._ajxTimeZoneInstance.getShortName(this.tzId);
    },

    /**
     * Return a medium length name for the timezone
     * @method getMediumName
     * @return {String} Medium length name
     */
    getMediumName: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getMediumName", 4829);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4830);
return this._ajxTimeZoneInstance.getMediumName(this.tzId);
    },

    /**
     * Return a long name for the timezone
     * @method getLongName
     * @return {String} Long name
     */
    getLongName: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getLongName", 4838);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4839);
return this._ajxTimeZoneInstance.getLongName(this.tzId);
    },

    /**
     * Given a timevalue representation in RFC 3339 or SQL format, convert to UNIX time - seconds since Epoch ie., since 1970-01-01T00:00:00Z
     * @method convertToIncrementalUTC
     * @param {String} timeValue TimeValue representation in RFC 3339 or SQL format.
     * @return {Number} UNIX time - time in seconds since Epoch
     */
    convertToIncrementalUTC: function(timeValue) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "convertToIncrementalUTC", 4848);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4849);
if(Y.Array.indexOf(timeValue,"T") !== -1) {
            //RFC3339
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4851);
return this._parseRFC3339(timeValue).getTime() / 1000;
        } else {
            //SQL
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4854);
return this._parseSQLFormat(timeValue).getTime() / 1000;
        }
    },

    /**
     * Given UNIX time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to RFC3339 format - "yyyy-mm-ddThh:mm:ssZ"
     * @method convertUTCToRFC3339Format
     * @param {Number} timeValue time value in seconds since Epoch.
     * @return {String} RFC3339 format timevalue - "yyyy-mm-ddThh:mm:ssZ"
     */
    convertUTCToRFC3339Format: function(timeValue) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "convertUTCToRFC3339Format", 4864);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4865);
var uTime = new Date(timeValue * 1000),
            offset = AjxTimezone.getOffset(this.tzId, uTime),
            offsetString = "Z",
            rfc3339, offsetSign;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4870);
if(offset !== 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4871);
offsetSign = (offset > 0 ? "+": "-");
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4872);
offsetString = offsetSign + Y.Number._zeroPad(Math.abs(Timezone._floatToInt(offset/60)), 2) + ":" + Y.Number._zeroPad(offset % 60, 2);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4875);
uTime.setTime(timeValue*1000 + offset*60*1000);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4877);
rfc3339 = Y.Number._zeroPad(uTime.getUTCFullYear(), 4) + "-"
                      + Y.Number._zeroPad((uTime.getUTCMonth() + 1), 2) + "-" + Y.Number._zeroPad(uTime.getUTCDate(), 2)
                      + "T" + Y.Number._zeroPad(uTime.getUTCHours(), 2) + ":" + Y.Number._zeroPad(uTime.getUTCMinutes(), 2)
                      + ":" + Y.Number._zeroPad(uTime.getUTCSeconds(), 2) + offsetString;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4882);
return rfc3339;
    },

    /**
     * Given UNIX Time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to SQL Format - "yyyy-mm-dd hh:mm:ss"
     * @method convertUTCToSQLFormat
     * @param {Number} timeValue time value in seconds since Epoch.
     * @return {String} SQL Format timevalue - "yyyy-mm-dd hh:mm:ss"
     */
    convertUTCToSQLFormat: function(timeValue) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "convertUTCToSQLFormat", 4891);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4892);
var uTime = new Date(timeValue * 1000),
            offset = AjxTimezone.getOffset(this.tzId, uTime),
            sqlDate;
            
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4896);
uTime.setTime(timeValue*1000 + offset*60*1000);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4898);
sqlDate = Y.Number._zeroPad(uTime.getUTCFullYear(), 4) + "-" + Y.Number._zeroPad((uTime.getUTCMonth() + 1), 2)
                      + "-" + Y.Number._zeroPad(uTime.getUTCDate(), 2) + " " + Y.Number._zeroPad(uTime.getUTCHours(), 2)
                      + ":" + Y.Number._zeroPad(uTime.getUTCMinutes(), 2) + ":" + Y.Number._zeroPad(uTime.getUTCSeconds(), 2);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4902);
return sqlDate;
    },

    /**
     * Gets the offset of this timezone in seconds from UTC
     * @method getRawOffset
     * @return {Number} offset of this timezone in seconds from UTC
     */
    getRawOffset: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getRawOffset", 4910);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4911);
return AjxTimezone.getOffset(this.tzId, new Date()) * 60;
    },

    /**
     * Given a unix time, convert it to wall time for this timezone.
     * @method getWallTimeFromUnixTime
     * @param {Number} timeValue value in seconds from Epoch.
     * @return {Object} an object with the properties: sec, min, hour, mday, mon, year, wday, yday, isdst, gmtoff, zone.
           All of these are integers except for zone, which is a string. isdst is 1 if DST is active, and 0 if DST is inactive.
     */
    getWallTimeFromUnixTime: function(timeValue) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getWallTimeFromUnixTime", 4921);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4922);
var offset = AjxTimezone.getOffset(this.tzId, new Date(timeValue*1000)) * 60,
            localTimeValue = timeValue + offset,
            date = new Date(localTimeValue*1000),
            walltime = {
                sec: date.getUTCSeconds(),
                min: date.getUTCMinutes(),
                hour: date.getUTCHours(),
                mday: date.getUTCDate(),
                mon: date.getUTCMonth(),
                year: date.getUTCFullYear(),
                wday: date.getUTCDay(),
                yday: Timezone._getDOY(date),
                isdst: AjxTimezone.isDST(this.tzId, new Date(timeValue)),
                gmtoff: offset,
                zone: this.tzId
            };

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4939);
return walltime;
    }
});
/**
 * This module provides absolute/relative date and time formatting, as well as duration formatting
 * Applications can choose date, time, and time zone components separately.
 * For dates, relative descriptions (English "yesterday", German "vorgestern", Japanese "後天") are also supported.
 *
 * This module uses a few modified parts of zimbra AjxFormat to handle dates and time.
 *
 * Absolute formats use the default calendar specified in CLDR for each locale.
 * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries.
 * However, you can specify other calendars using language subtags;
 * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory.
 *
 * Relative time formats only support times in the past. It can represent times like "1 hour 5 minutes ago"
 *
 * @module datatype-date-advanced-format
 * @requires datatype-date-timezone, datatype-date-format, datatype-number-advanced-format
 */

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4960);
ShortNames = {
        "weekdayMonShort":"M",
        "weekdayTueShort":"T",
        "weekdayWedShort":"W",
        "weekdayThuShort":"T",
        "weekdayFriShort":"F",
        "weekdaySatShort":"S",
        "weekdaySunShort":"S",
        "monthJanShort":"J",
        "monthFebShort":"F",
        "monthMarShort":"M",
        "monthAprShort":"A",
        "monthMayShort":"M",
        "monthJunShort":"J",
        "monthJulShort":"J",
        "monthAugShort":"A",
        "monthSepShort":"S",
        "monthOctShort":"O",
        "monthNovShort":"N",
        "monthDecShort":"D"
};
    
//
// Date format class
//

/**
 * The DateFormat class formats Date objects according to a specified pattern.
 * The patterns are defined the same as the SimpleDateFormat class in the Java libraries.
 *
 * Note:
 * The date format differs from the Java patterns a few ways: the pattern
 * "EEEEE" (5 'E's) denotes a <em>short</em> weekday and the pattern "MMMMM"
 * (5 'M's) denotes a <em>short</em> month name. This matches the extended
 * pattern found in the Common Locale Data Repository (CLDR) found at:
 * http://www.unicode.org/cldr/.
 *
 * @class __zDateFormat
 * @extends Number.__BaseFormat
 * @namespace Date
 * @private
 * @constructor
 * @param pattern {String} The pattern to format date in
 * @param formats {Object} Locale specific data
 * @param timeZoneId {String} Timezone Id according to Olson tz database
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5006);
Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__zDateFormat", 5006);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5007);
DateFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5008);
this.timeZone = new Y.Date.Timezone(timeZoneId);
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5010);
if (pattern === null) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5011);
return;
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5013);
var head, tail, segment, i, c, count, field;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5014);
for (i = 0; i < pattern.length; i++) {
        // literal
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5016);
c = pattern.charAt(i);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5017);
if (c === "'") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5018);
head = i + 1;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5019);
for (i++ ; i < pattern.length; i++) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5020);
c = pattern.charAt(i);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5021);
if (c === "'") {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5022);
if (i + 1 < pattern.length && pattern.charAt(i + 1) === "'") {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5023);
pattern = pattern.substr(0, i) + pattern.substr(i + 1);
                    }
                    else {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5026);
break;
                    }
                }
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5030);
if (i === pattern.length) {
		_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5031);
Y.error("unterminated string literal");
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5033);
tail = i;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5034);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5035);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5036);
continue;
        }

        // non-meta chars
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5040);
head = i;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5041);
while(i < pattern.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5042);
c = pattern.charAt(i);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5043);
if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === "'") {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5044);
break;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5046);
i++;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5048);
tail = i;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5049);
if (head !== tail) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5050);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5051);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5052);
i--;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5053);
continue;
        }
		
        // meta char
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5057);
head = i;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5058);
while(++i < pattern.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5059);
if (pattern.charAt(i) !== c) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5060);
break;
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5063);
tail = i--;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5064);
count = tail - head;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5065);
field = pattern.substr(head, count);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5066);
segment = null;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5067);
switch (c) {
            case 'G':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5069);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5070);
break;
            case 'y':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5072);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5073);
break;
            case 'M':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5075);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5076);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5079);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5080);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5083);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5084);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5087);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5088);
break;
            case 'a':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5090);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5091);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5096);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5097);
break;
            case 'm':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5099);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5100);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5103);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5104);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5107);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5108);
break;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5110);
if (segment !== null) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5111);
segment._index = this._segments.length;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5112);
this._segments.push(segment);
        }
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5117);
DateFormat = Y.Date.__zDateFormat;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5118);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5122);
Y.mix(DateFormat, {
	SHORT: 0,
	MEDIUM: 1,
	LONG: 2,
	DEFAULT: 1,
	_META_CHARS: "GyMwWDdFEaHkKhmsSzZ"
});

/**
 * Format the date
 * @method format
 * @param object {Date} The date to be formatted
 * @param [relative=false] {Boolean} Whether relative dates should be used.
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5137);
DateFormat.prototype.format = function(object, relative) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5137);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5138);
var useRelative = false,
        s = [],
        datePattern = false,
        i;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5143);
if(relative !== null && relative !== "") {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5144);
useRelative = true;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5147);
for (i = 0; i < this._segments.length; i++) {
        //Mark datePattern sections in case of relative dates
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5149);
if(this._segments[i].toString().indexOf("text: \"<datePattern>\"") === 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5150);
if(useRelative) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5151);
s.push(relative);
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5153);
datePattern = true;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5154);
continue;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5156);
if(this._segments[i].toString().indexOf("text: \"</datePattern>\"") === 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5157);
datePattern = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5158);
continue;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5160);
if(!datePattern || !useRelative) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5161);
s.push(this._segments[i].format(object));
        }
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5164);
return s.join("");
};

//
// Date segment class
//

/**
 * Date Segment in the pattern
 * @class DateSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends Number.__BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5182);
DateFormat.DateSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "DateSegment", 5182);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5183);
DateFormat.DateSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5185);
Y.extend(DateFormat.DateSegment, Format.Segment);

//
// Date era segment class
//

/**
 * Era Segment in the pattern
 * @class EraSegment
 * @for Date.__DateFormat
 * @namespace Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5202);
DateFormat.EraSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "EraSegment", 5202);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5203);
DateFormat.EraSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5205);
Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);

/**
 * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5213);
DateFormat.EraSegment.prototype.format = function(/*date*/) {
    // NOTE: Only support current era at the moment...
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5213);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5215);
return this.getFormat().AD;
};

//
// Date year segment class
//

/**
 * Year Segment in the pattern
 * @class YearSegment
 * @namespace Date.__DateFormat
 * @for Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5233);
DateFormat.YearSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "YearSegment", 5233);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5234);
DateFormat.YearSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5236);
Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5238);
Y.mix(DateFormat.YearSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5244);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5245);
return "dateYear: \""+this._s+'"';
    },

    /**
     * Format date and get the year segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5254);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5255);
var year = String(date.getFullYear());
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5256);
return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);
    }
}, true);

//
// Date month segment class
//

/**
 * Month Segment in the pattern
 * @class MonthSegment
 * @namepspace Date.__DateFormat
 * @for Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5275);
DateFormat.MonthSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "MonthSegment", 5275);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5276);
DateFormat.MonthSegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5277);
this.initialize();
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5279);
Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5281);
Y.mix(DateFormat.MonthSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5287);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5288);
return "dateMonth: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "initialize", 5295);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5296);
DateFormat.MonthSegment.MONTHS = {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5297);
DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [
            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,
            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,
            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,
            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort
        ];

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5304);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5305);
DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [
            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,
            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,
            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,
            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium
        ];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5311);
DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [
            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,
            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,
            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,
            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong
        ];
    },

    /**
     * Format date and get the month segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5325);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5326);
var month = date.getMonth();
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5327);
switch (this._s.length) {
            case 1:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5329);
return String(month + 1);
            case 2:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5331);
return Y.Number._zeroPad(month + 1, 2);
            case 3:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5333);
return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];
            case 5:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5335);
return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5337);
return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];
    }
}, true);

//
// Date week segment class
//

/**
 * Week Segment in the pattern
 * @class WeekSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5356);
DateFormat.WeekSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "WeekSegment", 5356);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5357);
DateFormat.WeekSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5359);
Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);

/**
 * Format date and get the week segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5367);
DateFormat.WeekSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5367);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5368);
var year = date.getYear(),
        month = date.getMonth(),
        day = date.getDate(),
	ofYear = /w/.test(this._s),
        date2 = new Date(year, ofYear ? 0 : month, 1),
        week = 0;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5374);
while (true) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5375);
week++;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5376);
if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5377);
break;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5379);
date2.setDate(date2.getDate() + 7);
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5382);
return Y.Number._zeroPad(week, this._s.length);
};

//
// Date day segment class
//

/**
 * Day Segment in the pattern
 * @class DaySegment
 * @namespace Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5399);
DateFormat.DaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "DaySegment", 5399);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5400);
DateFormat.DaySegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5402);
Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);

/**
 * Format date and get the day segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5410);
DateFormat.DaySegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5410);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5411);
var month = date.getMonth(),
        day = date.getDate(),
        year = date.getYear(),
        date2;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5416);
if (/D/.test(this._s) && month > 0) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5417);
do {
            // set date to first day of month and then go back one day
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5419);
date2 = new Date(year, month, 1);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5420);
date2.setDate(0);
			
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5422);
day += date2.getDate();
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5423);
month--;
        }while (month > 0);
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5426);
return Y.Number._zeroPad(day, this._s.length);
};

//
// Date weekday segment class
//

/**
 * Weekday Segment in the pattern
 * @class WeekdaySegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5444);
DateFormat.WeekdaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "WeekdaySegment", 5444);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5445);
DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5446);
this.initialize();
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5448);
Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5450);
Y.mix(DateFormat.WeekdaySegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5456);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5457);
return "dateDay: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "initialize", 5464);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5465);
DateFormat.WeekdaySegment.WEEKDAYS = {};
        // NOTE: The short names aren't available in Java so we have to define them.
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5467);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [
            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,
            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,
            ShortNames.weekdaySatShort
        ];

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5473);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5474);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [
            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,
            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,
            Formats.weekdaySatMedium
        ];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5479);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [
            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,
            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,
            Formats.weekdaySatLong
        ];
    },

    /**
     * Format date and get the weekday segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5492);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5493);
var weekday = date.getDay(),
            style;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5495);
if (/E/.test(this._s)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5496);
switch (this._s.length) {
                case 4:
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5498);
style = DateFormat.LONG;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5499);
break;
                case 5:
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5501);
style = DateFormat.SHORT;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5502);
break;
                default:
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5504);
style = DateFormat.MEDIUM;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5506);
return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5508);
return Y.Number._zeroPad(weekday, this._s.length);
    }
}, true);

//
// Time segment class
//

/**
 * Time Segment in the pattern
 * @class TimeSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends Number.__BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5527);
DateFormat.TimeSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "TimeSegment", 5527);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5528);
DateFormat.TimeSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5530);
Y.extend(DateFormat.TimeSegment, Y.Number.__BaseFormat.Segment);

//
// Time hour segment class
//

/**
 * Hour Segment in the pattern
 * @class HourSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5547);
DateFormat.HourSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "HourSegment", 5547);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5548);
DateFormat.HourSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5550);
Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5552);
Y.mix(DateFormat.HourSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5558);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5559);
return "timeHour: \""+this._s+'"';
    },

    /**
     * Format date and get the hour segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5568);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5569);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5570);
if (hours > 12 && /[hK]/.test(this._s)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5571);
hours -= 12;
        }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5573);
if (hours === 0 && /[h]/.test(this._s)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5574);
hours = 12;
        }}
        /***
            // NOTE: This is commented out to match the Java formatter output
            //       but from the comments for these meta-chars, it doesn't
            //       seem right.
            if (/[Hk]/.test(this._s)) {
                hours--;
            }
        /***/
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5584);
return Y.Number._zeroPad(hours, this._s.length);
    }
}, true);

//
// Time minute segment class
//

/**
 * Minute Segment in the pattern
 * @class MinuteSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5603);
DateFormat.MinuteSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "MinuteSegment", 5603);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5604);
DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5606);
Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5608);
Y.mix(DateFormat.MinuteSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5614);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5615);
return "timeMinute: \""+this._s+'"';
    },

    /**
     * Format date and get the minute segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5624);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5625);
var minutes = date.getMinutes();
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5626);
return Y.Number._zeroPad(minutes, this._s.length);
    }
}, true);

//
// Time second segment class
//

/**
 * Second Segment in the pattern
 * @class SecondSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5645);
DateFormat.SecondSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "SecondSegment", 5645);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5646);
DateFormat.SecondSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5648);
Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);

/**
 * Format date and get the second segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5656);
DateFormat.SecondSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5656);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5657);
var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5658);
return Y.Number._zeroPad(minutes, this._s.length);
};

//
// Time am/pm segment class
//

/**
 * AM/PM Segment in the pattern
 * @class AmPmSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5676);
DateFormat.AmPmSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "AmPmSegment", 5676);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5677);
DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5679);
Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5681);
Y.mix(DateFormat.AmPmSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5687);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5688);
return "timeAmPm: \""+this._s+'"';
    },

    /**
     * Format date and get the AM/PM segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5697);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5698);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5699);
return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;
    }
}, true);

//
// Time timezone segment class
//

/**
 * TimeZone Segment in the pattern
 * @class TimezoneSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5718);
DateFormat.TimezoneSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "TimezoneSegment", 5718);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5719);
DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5721);
Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5723);
Y.mix(DateFormat.TimezoneSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5729);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5730);
return "timeTimezone: \""+this._s+'"';
    },

    /**
     * Format date and get the timezone segment.
     * @method format
     * //param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(/*date*/) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5739);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5740);
var timeZone = this.getFormat().timeZone;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5741);
if (/Z/.test(this._s)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5742);
return timeZone.getShortName();
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5744);
return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();
    }
}, true);
    
//
// Non-Gregorian Calendars
//

/*
 * Buddhist Calendar. This is normally used only for Thai locales (th).
 * @class __BuddhistDateFormat
 * @namespace Date
 * @extends __zDateFormat
 * @constructor
 * @private
 * @param pattern {String} The pattern to format date in
 * @param formats {Object} Locale specific data
 * @param timeZoneId {String} Timezone Id according to Olson tz database
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5763);
Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__BuddhistDateFormat", 5763);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5764);
BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);
        
    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5767);
var segments = this._segments, i;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5768);
for(i=0; i<segments.length; i++) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5769);
if(segments[i] instanceof DateFormat.YearSegment) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5770);
segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5771);
if (segments[i] instanceof DateFormat.EraSegment) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5772);
segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);
        }}
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5777);
BuddhistDateFormat = Y.Date.__BuddhistDateFormat;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5778);
Y.extend(BuddhistDateFormat, DateFormat);
    
/**
 * YearSegment class for Buddhist Calender
 * @class YearSegment
 * @namespace Date.__BuddhistDateFormat
 * @extends Date.__zDateFormat.YearSegment
 * @private
 * @constructor
 * @param segment {Date.__zDateFormat.YearSegment}
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5789);
BuddhistDateFormat.YearSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "YearSegment", 5789);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5790);
BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5793);
Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);

/**
 * Format date and get the year segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5801);
BuddhistDateFormat.YearSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5801);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5802);
var year = date.getFullYear();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5803);
year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5804);
return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);
};
    
/**
 * EraSegment class for Buddhist Calender
 * @class EraSegment
 * @for Date.__BuddhistDateFormat
 * @namespace Date.__BuddhistDateFormat
 * @extends Date.__zDateFormat.EraSegment
 * @private
 * @constructor
 * @param segment {Date.__zDateFormat.EraSegment}
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5817);
BuddhistDateFormat.EraSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "EraSegment", 5817);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5818);
BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5821);
Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);

/**
 * Format date and get the era segment.
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5829);
BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5829);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5830);
return "BE";    //Only Buddhist Era supported for now
};

/**
 * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU
 * @class __YDateFormat
 * namespace Date
 * @private
 * @constructor
 * @param {String} [timeZone='Etc/GMT'] TZ database ID for the time zone that should be used.
 * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS.
 * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS.
 * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5844);
Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {
        
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__YDateFormat", 5844);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5846);
if(timeZone === undefined || timeZone === null) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5847);
timeZone = "Etc/GMT";
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5850);
this._Formats = Y.Intl.get(MODULE_NAME);
        
    //If not valid time zone
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5853);
if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {
	_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5854);
Y.error("Could not find timezone: " + timeZone);
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5857);
this._timeZone = timeZone;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5858);
this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5860);
this._dateFormat = dateFormat || 0;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5861);
this._timeFormat = timeFormat || 0;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5862);
this._timeZoneFormat = timeZoneFormat || 0;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5864);
this._relative = false;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5865);
this._pattern = this._generatePattern();

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5867);
var locale = Y.Intl.getLang(MODULE_NAME);
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5869);
if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {
        //Use buddhist calendar
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5871);
this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);
    } else {
        //Use gregorian calendar
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5874);
this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5878);
YDateFormat = Y.Date.__YDateFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5880);
Y.mix(Y.Date, {
    /**
     * Date Format Style values to use during format/parse
     * @property DATE_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    DATE_FORMATS: {
        NONE: 0,
        WYMD_LONG: 1,
        WYMD_ABBREVIATED: 4,
        WYMD_SHORT: 8,
        WMD_LONG: 16,
        WMD_ABBREVIATED: 32,
        WMD_SHORT: 64,
        YMD_LONG: 128,
        YMD_ABBREVIATED: 256,
        YMD_SHORT: 512,
        YM_LONG: 1024,
        MD_LONG: 2048,
        MD_ABBREVIATED: 4096,
        MD_SHORT: 8192,
        W_LONG: 16384,
        W_ABBREVIATED: 32768,
        M_LONG: 65536,
        M_ABBREVIATED: 131072,
        YMD_FULL: 262144,
        RELATIVE_DATE: 524288
    },

    /**
     * Time Format Style values to use during format/parse
     * @property TIME_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    TIME_FORMATS: {
        NONE: 0,
        HM_ABBREVIATED: 1,
        HM_SHORT: 2,
        H_ABBREVIATED: 4
    },

    /**
     * Timezone Format Style values to use during format/parse
     * @property TIMEZONE_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    TIMEZONE_FORMATS: {
        NONE: 0,
        Z_ABBREVIATED: 1,
        Z_SHORT: 2
    }
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5942);
Y.mix(YDateFormat.prototype, {
    /**
     * Generate date pattern for selected format. For internal use only.
     * @method _generateDatePattern
     * @for Date.__YDateFormat
     * @private
     * @return {String} Date pattern
     */
    _generateDatePattern: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generateDatePattern", 5950);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5951);
var format = this._dateFormat;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5952);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5953);
format = Y.Date.DATE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5956);
if(format === null) { return ""; }
        /*jshint bitwise: false*/
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5958);
if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5959);
this._relative = true;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5960);
format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;
        }
        /*jshint bitwise: true*/
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5963);
switch(format) {
            //Use relative only for formats with day component
            case Y.Date.DATE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5966);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5967);
return "";
            case Y.Date.DATE_FORMATS.WYMD_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5969);
return this._Formats.WYMD_long;
            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5971);
return this._Formats.WYMD_abbreviated;
            case Y.Date.DATE_FORMATS.WYMD_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5973);
return this._Formats.WYMD_short;
            case Y.Date.DATE_FORMATS.WMD_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5975);
return this._Formats.WMD_long;
            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5977);
return this._Formats.WMD_abbreviated;
            case Y.Date.DATE_FORMATS.WMD_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5979);
return this._Formats.WMD_short;
            case Y.Date.DATE_FORMATS.YMD_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5981);
return this._Formats.YMD_long;
            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5983);
return this._Formats.YMD_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5985);
return this._Formats.YMD_short;
            case Y.Date.DATE_FORMATS.YM_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5987);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5988);
return this._Formats.YM_long;
            case Y.Date.DATE_FORMATS.MD_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5990);
return this._Formats.MD_long;
            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5992);
return this._Formats.MD_abbreviated;
            case Y.Date.DATE_FORMATS.MD_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5994);
return this._Formats.MD_short;
            case Y.Date.DATE_FORMATS.W_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5996);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5997);
return this._Formats.W_long;
            case Y.Date.DATE_FORMATS.W_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5999);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6000);
return this._Formats.W_abbreviated;
            case Y.Date.DATE_FORMATS.M_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6002);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6003);
return this._Formats.M_long;
            case Y.Date.DATE_FORMATS.M_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6005);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6006);
return this._Formats.M_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_FULL:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6008);
return this._Formats.YMD_full;
            default:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6010);
Y.error("Date format given does not exist");	//Error no such pattern.
        }
    },
        
    /**
     * Generate time pattern for selected format. For internal use only
     * @method _generateTimePattern
     * @private
     * @return {String} Time pattern
     */
    _generateTimePattern: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generateTimePattern", 6020);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6021);
var format = this._timeFormat;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6022);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6023);
format = Y.Date.TIME_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6026);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6027);
switch(format) {
            case Y.Date.TIME_FORMATS.NONE:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6029);
return "";
            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6031);
return this._Formats.HM_abbreviated;
            case Y.Date.TIME_FORMATS.HM_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6033);
return this._Formats.HM_short;
            case Y.Date.TIME_FORMATS.H_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6035);
return this._Formats.H_abbreviated;
            default:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6037);
Y.error("Time format given does not exist");	//Error no such pattern.
        }
    },
    
    /**
     * Generate time-zone pattern for selected format. For internal use only.
     * @method _generateTimeZonePattern
     * @private
     * @return {String} Time-Zone pattern
     */
    _generateTimeZonePattern: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generateTimeZonePattern", 6047);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6048);
var format = this._timeZoneFormat;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6049);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6050);
format = Y.Date.TIMEZONE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6053);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6054);
switch(format) {
            case Y.Date.TIMEZONE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6056);
return "";
            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6058);
return "z";
            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6060);
return "Z";
            default:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6062);
Y.error("Time Zone format given does not exist");	//Error no such pattern.
        }
    },
    
    /**
     * Generate pattern for selected date, time and time-zone formats. For internal use only
     * @method _generatePattern
     * @private
     * @return {String} Combined pattern for date, time and time-zone
     */
    _generatePattern: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generatePattern", 6072);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6073);
var datePattern = this._generateDatePattern(),
            timePattern = this._generateTimePattern(),
            timeZonePattern = this._generateTimeZonePattern(),
            pattern = "";

        //Combine patterns. Mark date pattern part, to use with relative dates.
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6079);
if(datePattern !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6080);
datePattern = "'<datePattern>'" + datePattern + "'</datePattern>'";
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6083);
if(timePattern !== "" && timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6084);
pattern = this._Formats.DateTimeTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6085);
if (timePattern !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6086);
pattern = this._Formats.DateTimeCombination;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6087);
if(timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6088);
pattern = this._Formats.DateTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6089);
if(datePattern !== ""){
            //Just date
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6091);
pattern = "{1}";
        }}}}
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6094);
pattern = pattern.replace("{0}", timePattern).replace("{1}", datePattern).replace("{2}", timeZonePattern);
        
        //Remove unnecessary whitespaces
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6097);
pattern = Y.Lang.trim(pattern.replace(/\s\s+/g, " "));

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6099);
return pattern;
    },

    /**
     * Formats a date
     * @method format
     * @param {Date} date The date to be formatted.
     * @return {String} The formatted string
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6108);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6109);
if(date === null || !Y.Lang.isDate(date)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6110);
Y.error("format called without a date.");
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6113);
var offset = this._timeZoneInstance.getRawOffset() * 1000,
            relativeDate = null,
            today = new Date(),
            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6119);
date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6121);
if(this._relative) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6122);
if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6123);
relativeDate = this._Formats.today;
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6126);
if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6127);
relativeDate = this._Formats.tomorrow;
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6130);
if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6131);
relativeDate = this._Formats.yesterday;
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6134);
return this._dateFormatInstance.format(date, relativeDate);
    }
}, true);
/**
 * YRelativeTimeFormat class provides localized formatting of relative time values such as "3 minutes ago".
 * Relative time formats supported are defined by how many units they may include.
 * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages.
 * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used.
 */

/**
 * Class to handle relative time formatting
 * @class __YRelativeTimeFormat
 * @namespace Date
 * @private
 * @constructor
 * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6152);
Y.Date.__YRelativeTimeFormat = function(style) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__YRelativeTimeFormat", 6152);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6153);
if(style === null) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6154);
style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;
    } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6155);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6156);
style = Y.Date.RELATIVE_TIME_FORMATS[style];
    }}
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6159);
this.patterns = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6160);
this.style = style;
		
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6162);
switch(style) {
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6164);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6165);
this.abbr = true;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6166);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6168);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6169);
this.abbr = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6170);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6172);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6173);
this.abbr = true;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6174);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6176);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6177);
this.abbr = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6178);
break;
        default:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6180);
Y.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS");
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6184);
YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6186);
Y.mix(Y.Date, {
    /**
     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.
     * @property
     * @type Number|function
     * @static
     */
    currentDate: function() { _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "currentDate", 6193);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6193);
return new Date(); },

    /**
     * Format Style values to use during format/parse
     * @property RELATIVE_TIME_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    RELATIVE_TIME_FORMATS: {
        ONE_OR_TWO_UNITS_ABBREVIATED: 0,
        ONE_OR_TWO_UNITS_LONG: 1,
        ONE_UNIT_ABBREVIATED: 2,
        ONE_UNIT_LONG: 4
    }
});
	
/**
 * Formats a time value.
 * @method format
 * @for Date.__YRelativeTimeFormat
 * @param {Number} timeValue The time value (seconds since Epoch) to be formatted.
 * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.
          It must be greater than or equal to timeValue
 * @return {String} The formatted string
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6220);
YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6220);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6221);
if(relativeTo === null) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6222);
relativeTo = (new Date()).getTime()/1000;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6223);
if(timeValue > relativeTo) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6224);
Y.error("timeValue must be in the past");
        }
    } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6226);
if(timeValue > relativeTo) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6227);
Y.error("relativeTo must be greater than or equal to timeValue");
    }}

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6230);
var date = new Date((relativeTo - timeValue)*1000),
        result = [],
        numUnits = this.numUnits,
        value = date.getUTCFullYear() - 1970,	//Need zero-based index
        text, pattern, i;
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6236);
if(value > 0) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6237);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6238);
text = value + " " + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6239);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6241);
text = value + " " + (value !== 1 ? this.patterns.years : this.patterns.year);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6242);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6244);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6247);
value = date.getUTCMonth();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6248);
if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6249);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6250);
text = value + " " + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6251);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6253);
text = value + " " + (value !== 1 ? this.patterns.months : this.patterns.month);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6254);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6256);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6259);
value = date.getUTCDate()-1;			//Need zero-based index
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6260);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6261);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6262);
text = value + " " + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6263);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6265);
text = value + " " + (value !== 1 ? this.patterns.days : this.patterns.day);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6266);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6268);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6271);
value = date.getUTCHours();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6272);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6273);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6274);
text = value + " " + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6275);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6277);
text = value + " " + (value !== 1 ? this.patterns.hours : this.patterns.hour);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6278);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6280);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6283);
value = date.getUTCMinutes();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6284);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6285);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6286);
text = value + " " + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6287);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6289);
text = value + " " + (value !== 1 ? this.patterns.minutes : this.patterns.minute);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6290);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6292);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6295);
value = date.getUTCSeconds();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6296);
if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6297);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6298);
text = value + " " + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6299);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6301);
text = value + " " + (value !== 1 ? this.patterns.seconds : this.patterns.second);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6302);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6304);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6307);
pattern = (result.length === 1) ? this.patterns["RelativeTime/oneUnit"] : this.patterns["RelativeTime/twoUnits"];
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6309);
for(i=0; i<result.length; i++) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6310);
pattern = pattern.replace("{" + i + "}", result[i]);
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6312);
for(i=result.length; i<this.numUnits; i++) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6313);
pattern = pattern.replace("{" + i + "}", "");
    }
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6316);
pattern = Y.Lang.trim(pattern.replace(/\s+/g, " "));
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6318);
return pattern;
};
/**
 * YDurationFormat class formats time in a language independent manner.
 * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages.
 */

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6325);
Y.mix(Y.Number, {
    /**
     * Strip decimal part of argument and return the integer part
     * @method _stripDecimals
     * @static
     * @private
     * @for Number
     * @param floatNum A real number
     * @return Integer part of floatNum
     */
    _stripDecimals: function (floatNum) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_stripDecimals", 6335);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6336);
return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);
    }
});

/**
 * YDurationFormat class formats time in a language independent manner.
 * @class __YDurationFormat
 * @namespace Date
 * @private
 * @constructor
 * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6348);
Y.Date.__YDurationFormat = function(style) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__YDurationFormat", 6348);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6349);
if(style && Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6350);
style = Y.Date.DURATION_FORMATS[style];
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6352);
this.style = style;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6353);
this.patterns = Y.Intl.get(MODULE_NAME);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6356);
YDurationFormat = Y.Date.__YDurationFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6358);
Y.mix(Y.Date, {
    /**
     * Format Style values to use during format/parse of Duration values
     * @property DURATION_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    DURATION_FORMATS: {
        HMS_LONG: 0,
        HMS_SHORT: 1
    }
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6373);
Y.mix(YDurationFormat, {
    /**
     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds
     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short
     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used
     * @method _getDuration_XML
     * @static
     * @private
     * @for Date.__YDurationFormat
     * @param {String} xmlDuration XML Duration String.
     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,
     *      where nY represents the number of years, nM the number of months, nD the number of days,
     *      'T' is the date/time separator,
     *      nH the number of hours, nM the number of minutes and nS the number of seconds.
     *      The number of seconds can include decimal digits to arbitrary precision.
     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.
     */
    _getDuration_XML: function (xmlDuration) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_getDuration_XML", 6390);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6391);
var regex = new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),
            matches = xmlDuration.match(regex);
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6394);
if(matches === null) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6395);
Y.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'");
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6398);
return {
            hours: parseInt(matches[4] || -1, 10),
            minutes: parseInt(matches[5] || -1, 10),
            seconds: parseFloat(matches[6] || -1, 10)
        };
    },
    
    /**
     * Get duration from time in seconds.
     * The value should be integer value in seconds, and should not be negative.
     * @method _getDuration_Seconds
     * @static
     * @private
     * @param {Number} timeValueInSeconds Duration in seconds
     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.
     */
    _getDuration_Seconds: function (timeValueInSeconds) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_getDuration_Seconds", 6414);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6415);
var duration = {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6416);
if(timeValueInSeconds < 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6417);
Y.error("TimeValue cannot be negative");
        }
                
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6420);
duration.hours = Y.Number._stripDecimals(timeValueInSeconds / 3600);
                
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6422);
timeValueInSeconds %= 3600;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6423);
duration.minutes = Y.Number._stripDecimals(timeValueInSeconds / 60);
                
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6425);
timeValueInSeconds %= 60;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6426);
duration.seconds = timeValueInSeconds;
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6428);
return duration;
    }
});
    
/**
 * Formats the given value into a duration format string.
 * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS.
 * Please note that year, month and day fields are ignored in this version.
 * For future compatibility, please do not pass Year/Month/Day in the parameter.
 *
 * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,
 * but are treated as 0 in HMS_short format style.
 *
 * @method
 * @private
 * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),
          XML duration format (String), or an object with hours, minutes and seconds
 * @return {String} The formatted string
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6447);
YDurationFormat.prototype.format = function(oDuration) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6447);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6448);
if(Y.Lang.isNumber(oDuration)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6449);
oDuration = YDurationFormat._getDuration_Seconds(oDuration);
    } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6450);
if(Y.Lang.isString(oDuration)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6451);
oDuration = YDurationFormat._getDuration_XML(oDuration);
    }}
    
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6454);
var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,
        result = {
            hours: "",
            minutes: "",
            seconds: ""
        },
        resultPattern = "";

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6462);
if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6463);
if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6464);
if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }
   
    //Test minutes and seconds for invalid values
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6467);
if(oDuration.minutes > 59 || oDuration.seconds > 59) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6468);
Y.error("Minutes and Seconds should be less than 60");
    }
    
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6471);
if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6472);
resultPattern = this.patterns.HMS_long;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6473);
if(oDuration.hours >= 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6474);
result.hours = Y.Number.format(oDuration.hours) + " " + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6477);
if(oDuration.minutes >= 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6478);
result.minutes = oDuration.minutes + " " + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6481);
if(oDuration.seconds >= 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6482);
result.seconds = oDuration.seconds + " " + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);
        }
    } else {                                            //HMS_SHORT
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6485);
resultPattern = this.patterns.HMS_short;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6486);
result = {
             hours: Y.Number.format(oDuration.hours),
             minutes: Y.Number._zeroPad(oDuration.minutes, 2),
             seconds: Y.Number._zeroPad(oDuration.seconds, 2)
        };
    }
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6493);
resultPattern = resultPattern.replace("{0}", result.hours);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6494);
resultPattern = resultPattern.replace("{1}", result.minutes);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6495);
resultPattern = resultPattern.replace("{2}", result.seconds);
       
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6498);
resultPattern = Y.Lang.trim(resultPattern.replace(/\s\s+/g, " "));
       
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6500);
return resultPattern;
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6503);
Y.Date.oldFormat = Y.Date.format;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6505);
Y.mix(Y.Date, {
    /**
     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.
     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate
     * Configuration object can have 4 optional parameters:
     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.
     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.
     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.
     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.
     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.
                           If this parameter is used, the other three will be ignored.
     * @for Date
     * @method format
     * @param oDate {Date} Date
     * @param [oConfig] {Object} Object literal of configuration values.
     * @return {String} string representation of the date
     * @example
            var date = new Date();
            Y.Date.format(date, { timeFormat: "HM_SHORT", timezoneFormat: "Z_SHORT" });
            Y.Date.format(date, { dateFormat: "YMD_FULL", timeFormat: "HM_SHORT", timezoneFormat: "Z_SHORT" });
            Y.Date.format(date, { dateFormat: "YMD_FULL" });
            Y.Date.format(date, { relativeTimeFormat: "ONE_OR_TWO_UNITS_LONG" });
            Y.Date.format(date, { format: "%Y-%m-%d"});
     */
    format: function(oDate, oConfig) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6529);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6530);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6531);
if(oConfig.format && Y.Lang.isString(oConfig.format)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6532);
return Y.Date.oldFormat(oDate, oConfig);
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6535);
if(!Y.Lang.isDate(oDate)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6536);
return Y.Lang.isValue(oDate) ? oDate : "";
        }
                
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6539);
var formatter, relativeTo;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6540);
if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6541);
formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6542);
return formatter.format(oDate);
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6545);
relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6546);
if(oConfig.relativeTimeFormat) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6547);
formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6548);
return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6551);
Y.error("Unrecognized format options.");
    },

    /**
     * Returns a string representation of the duration
     * @method format
     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds
     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.
                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS
     * @return {String} string representation of the duration
     * @example
                Y.Date.formatDuration(3601, { style: "HMS_LONG" });
                Y.Date.formatDuration("PT11H22M33S", { style: "HMS_SHORT" });
                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: "HMS_SHORT" });
                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: "HMS_LONG" });
     */
    formatDuration: function(oDuration, oConfig) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "formatDuration", 6567);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6568);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6569);
return new YDurationFormat(oConfig.style).format(oDuration);
    }
}, true);
/**
 * ListFormatter formats lists with locale dependent rules.
 * For example, in locale en, lists are formatted into a
 * string of comma-separated values
 * @class ListFormatter
 * @namespace Intl
 * @static
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6580);
ListFormatter = {
    /**
     * Substitute items into corrrect positions in pattern
     * For internal use only
     * @method __sub
     * @private
     * @static
     * @param pattern {String} The pattern
     * @param item0 {String} item to replace {0} in pattern
     * @param item1 {String} item to replace {1} in pattern
     * @return {String} Result string after substitutions
     */
    __sub: function(pattern, item0, item1) {
         _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__sub", 6592);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6593);
return pattern.replace("{0}", item0).replace("{1}", item1);
    },

    /**
     * Format list into string
     * @method format
     * @static
     * @param list {Array} The list to be formatted
     * @return {String} formatted result
     */
    format: function(list) {
         _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6603);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6604);
if(!Y.Lang.isArray(list)) { return ""; }
        
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6606);
var localeData = Y.Intl.get(MODULE_NAME),
             middle = localeData.listPatternMiddle || "{0}, {1}",
             start = localeData.listPatternStart || middle,
             end = localeData.listPatternEnd,
             two = localeData.listPatternTwo || end,
             len = list.length,
             result, i;

         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6614);
if(len === 0) { return ""; }
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6615);
if(len === 1) { return list[0]; }
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6616);
if(len === 2) {
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6617);
return ListFormatter.__sub(two, list[0], list[1]);
         }

         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6620);
result = ListFormatter.__sub(start, list[0], list[1]);
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6621);
for(i=2; i<len-1; i++) {
              _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6622);
result = ListFormatter.__sub(middle, result, list[i]);
         }
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6624);
result = ListFormatter.__sub(end, result, list[i]);

         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6626);
return result;
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6630);
Y.Intl.ListFormatter = ListFormatter;
/**
 * Formatter base class
 * @class MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6639);
Y.Intl.MsgBaseFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "MsgBaseFormatter", 6639);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6640);
this.values = values;
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6643);
Formatter = Y.Intl.MsgBaseFormatter;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6645);
Y.mix(Formatter.prototype, {
    /**
     * Get value of key
     * @method getValue
     * @param key {String|Number} Key/index of value in the object/array 'values'
     * @return Value from the data in 'values'
     */
    getValue: function(key) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getValue", 6652);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6653);
if(Y.Lang.isArray(this.values)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6654);
key = parseInt(key, 10);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6656);
return this.values[key];
    },

    /**
     * Get value of params.key
     * The value found will be set to params.value
     * @method getParams
     * @param params {Object} Object containing key as in { key: "KEY" }
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6666);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6667);
if(!params || !params.key) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6668);
return false;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6671);
var value = this.getValue(params.key);
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6673);
if(value !== undefined) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6674);
params.value = value;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6675);
return true;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6678);
return false;
    },

    /**
     * Format string. Will be overridden in descendants
     * @method format
     */
    format: function(/*str, config*/) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6685);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6686);
Y.error('Not implemented');	//Must override in descendants
    }
});

//For date and time formatters
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6691);
Y.mix(Formatter, {
    /**
     * Create an instance of the formatter
     * @method createInstance
     * @static
     * //param values {Array|Object} The data to be processed and inserted.
     */
    createInstance: function(/*values*/) {
        //return new Formatter(values);
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6698);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6700);
Y.error('Not implemented');	//Must override in descendants
    },

    /**
     * Get current timezone. Used for time format
     * @method getCurrentTimeZone
     * @return {Y.Date.Timezone}
     */
    getCurrentTimeZone: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getCurrentTimeZone", 6708);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6709);
var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6710);
return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);
    }
});
/**
 * String formatter
 * @class StringFormatter
 * @namespace Intl
 * @extends MsgBaseFormatter
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6722);
Y.Intl.StringFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "StringFormatter", 6722);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6723);
StringFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6724);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6727);
StringFormatter = Y.Intl.StringFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6728);
Y.extend(StringFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6736);
StringFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6736);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6737);
return new StringFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6740);
Y.mix(StringFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6748);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6749);
if(matches && matches[1]) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6750);
params.key = matches[1];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6751);
if(Formatter.prototype.getParams.call(this, params)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6752);
return true;
            }
        }
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6756);
return false;
    },

    /**
     * Format all instances in str that can be handled by StringFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6765);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6766);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6769);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6770);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6772);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6774);
str = str.replace(matches[0], params.value);
            }

        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6779);
return str;
    }
}, true);/**
 * Date formatter
 * @class DateFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6790);
Y.Intl.DateFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "DateFormatter", 6790);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6791);
DateFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6792);
this.styles = {
        "short":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],
        "medium": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],
        "long":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],
        "full":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]
    };
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6798);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6801);
DateFormatter = Y.Intl.DateFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6802);
Y.extend(DateFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6810);
DateFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6810);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6811);
return new DateFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6814);
Y.mix(DateFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6822);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6823);
if(matches) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6824);
if(matches[1]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6825);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6827);
if(matches[3]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6828);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6832);
if(!params.style) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6833);
params.style = "medium";
        }			//If no style, default to medium

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6836);
if(!this.styles[params.style]) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6837);
return false;
        }	//Invalid style

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6840);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6841);
return true;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6844);
return false;
    },

    /**
     * Format all instances in str that can be handled by DateFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting
     * @return {String} Formatted result
     */
    format: function(str, config) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6854);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6855);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, style, result;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6858);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6859);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6861);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6863);
style = this.styles[params.style];
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6864);
result = Y.Date.format(new Date(params.value), {
                    timezone: config.timezone || Formatter.getCurrentTimeZone(),
                    dateFormat: style[0],
                    timeFormat: style[1],
                    timezoneFormat: style[2]
                });
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6870);
str = str.replace(matches[0], result);
            }

        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6875);
return str;
    }
}, true);/**
 * Time formatter
 * @class TimeFormatter
 * @extends DateFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6886);
Y.Intl.TimeFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "TimeFormatter", 6886);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6887);
TimeFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6888);
this.styles = {
        "short": [ 0, Y.Date.TIME_FORMATS.HM_SHORT, Y.Date.TIMEZONE_FORMATS.NONE ],
        "medium": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.NONE ],
        "long": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_SHORT ],
        "full": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED ]
    };
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6894);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6897);
TimeFormatter = Y.Intl.TimeFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6898);
Y.extend(TimeFormatter, DateFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6906);
TimeFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6906);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6907);
return new TimeFormatter(values);
};
/**
 * Number formatter
 * @class NumberFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6918);
Y.Intl.NumberFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "NumberFormatter", 6918);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6919);
NumberFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6920);
this.styles = {
        "integer": Y.Number.STYLES.NUMBER_STYLE,
        "percent": Y.Number.STYLES.PERCENT_STYLE,
        "currency": Y.Number.STYLES.CURRENCY_STYLE
    };
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6925);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6928);
NumberFormatter = Y.Intl.NumberFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6929);
Y.extend(NumberFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6937);
NumberFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6937);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6938);
return new NumberFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6941);
Y.mix(NumberFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6949);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6950);
if(matches) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6951);
if(matches[1]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6952);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6954);
if(matches[3]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6955);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6959);
if(!params.style) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6960);
params.style = "integer";	//If no style, default to medium
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6961);
params.showDecimal = true;	//Show decimal parts too
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6964);
if(!this.styles[params.style]) {	//Invalid style
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6965);
return false;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6968);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6969);
return true;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6972);
return false;
    },

    /**
     * Format all instances in str that can be handled by NumberFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6981);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6982);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, config;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6985);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6986);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6988);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6990);
config = {
                    style: this.styles[params.style]
                };
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6993);
if(params.style === "integer" && !params.showDecimal) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6994);
config.parseIntegerOnly = true;
                }
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6996);
str = str.replace(matches[0], Y.Number.format(params.value, config));
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7000);
return str;
    }
}, true);/**
 * Select formatter. Select ouput based on value of key
 * @class SelectFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7011);
Y.Intl.SelectFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "SelectFormatter", 7011);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7012);
SelectFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7013);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7016);
SelectFormatter = Y.Intl.SelectFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7017);
Y.extend(SelectFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7025);
SelectFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 7025);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7026);
return new SelectFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7029);
Y.mix(SelectFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 7037);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7038);
if(matches) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7039);
if(matches[1]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7040);
params.key = matches[1];
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7044);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7045);
return true;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7048);
return false;
    },

    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param str {String} Pattern string
     * @param start {Number} Position in str to start parsing from
     * @return {Object} Object in the form:
             {
               options: [
                     { key: KEY1, value: VALUE1 },
                     { key: KEY2, value: VALUE2 },
                     ... ],
               next: i  //Index of next character in str that can be parsed
             }
     */
    parseOptions: function(str, start) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parseOptions", 7065);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7066);
var options = {},
            key = "", value = "", current = "",
            i, ch;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7069);
for(i=start; i<str.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7070);
ch = str.charAt(i);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7071);
if (ch === '\\') {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7072);
current += ch + str.charAt(i+1);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7073);
i++;
            } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7074);
if (ch === '}') {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7075);
if(current === "") {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7076);
i++;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7077);
break;
                }
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7079);
value = current;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7080);
options[key.trim()] = value;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7081);
current = key = value = "";
            } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7082);
if (ch === '{') {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7083);
key = current;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7084);
current = "";
            } else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7086);
current += ch;
            }}}
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7090);
if(current !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7091);
return null;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7094);
return {
            options: options,
            next: i
        };
    },

    /**
     * Select output depending on params.value from options
     * @method select
     * @param options {Array} Array of key,value pairs
     * @param params {Object} Object containing value
     * @return {String} selected result
     */
    select: function(options, params) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "select", 7107);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7108);
for ( var key in options ) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7109);
if( key === "other" ) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7110);
continue;	//Will use this only if everything else fails
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7113);
if( key === params.value ) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7114);
return options[key];
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7118);
return options.other;
    },

    /**
     * Format all instances in str that can be handled by SelectFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 7127);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7128);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, options, result, start;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7131);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7132);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7134);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7136);
options = this.parseOptions(str, regex.lastIndex);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7137);
if(!options) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7138);
continue;
                }

                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7141);
regex.lastIndex = options.next;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7142);
options = options.options;

                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7144);
result = this.select(options, params);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7145);
if(result) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7146);
start = str.indexOf(matches[0]);
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7147);
str = str.slice(0, start) + result + str.slice(regex.lastIndex);
                }
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7152);
return str;
    }
}, true);/**
 * Plural formatter. Select ouput based on whether value of key is singular/plural
 * @class PluralFormatter
 * @extends SelectFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7163);
Y.Intl.PluralFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "PluralFormatter", 7163);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7164);
PluralFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7165);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7168);
PluralFormatter = Y.Intl.PluralFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7169);
Y.extend(PluralFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7177);
PluralFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 7177);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7178);
return new PluralFormatter(values);
};

/**
 * Select output depending on params.value from options
 * @method select
 * @param options {Object} Object containing results for singular/plural
 * @param params {Object} Object containing value
 * @return {String} selected result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7188);
PluralFormatter.prototype.select = function(options, params) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "select", 7188);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7189);
var result = options.other;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7190);
if(params.value === 0 && options.zero) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7191);
result = options.zero;
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7193);
if(params.value === 1 && options.one) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7194);
result = options.one;
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7196);
if(params.value === 2 && options.two) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7197);
result = options.two;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7200);
result = result.replace("#", new NumberFormatter({VAL: params.value}).format("{VAL, number, integer}"));	//Use 'number' to format this part

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7202);
return result;
};
/**
 * Choice formatter. Select ouput based on numerical values
 * @class ChoiceFormatter
 * @extends SelectFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7213);
Y.Intl.ChoiceFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "ChoiceFormatter", 7213);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7214);
ChoiceFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7215);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7218);
ChoiceFormatter = Y.Intl.ChoiceFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7219);
Y.extend(ChoiceFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7227);
ChoiceFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 7227);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7228);
return new ChoiceFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7231);
Y.mix(ChoiceFormatter.prototype, {
    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param choicesStr {String} Choice string from pattern
     * @return {Array} Array of objects containing value(choice), result, and relation
     */
    parseOptions: function(choicesStr) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parseOptions", 7238);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7239);
var options = [],
            choicesArray = choicesStr.split("|"),
            i, j, choice, relations, rel, mapping, ch;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7242);
for (i=0; i<choicesArray.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7243);
choice = choicesArray[i];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7244);
relations = ['#', '<', '\u2264'];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7245);
for (j=0; j<relations.length; j++) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7246);
rel = relations[j];
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7247);
if(choice.indexOf(rel) !== -1) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7248);
mapping = choice.split(rel);
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7249);
ch = {
                        value: parseInt(mapping[0], 10),
                        result: mapping[1],
                        relation: rel
                    };
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7254);
options.push(ch);
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7255);
break;
                }
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7260);
return options;
    },

    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 7270);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7271);
if(SelectFormatter.prototype.getParams.call(this, params, matches)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7272);
if(matches[2]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7273);
params.choices = this.parseOptions(matches[2]);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7274);
return params.choices === [] ? false: true;
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7278);
return false;
    },

    /**
     * Select output depending on params.value from options in params.choices
     * @method select
     * @param params {Object} Object containing value and choices
     * @return {String} selected result
     */
    select: function(params) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "select", 7287);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7288);
var choice, value, result, relation, i;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7289);
for (i=0; i<params.choices.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7290);
choice = params.choices[i];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7291);
value = choice.value, result = choice.result, relation = choice.relation;

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7293);
if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)
                || (relation === '\u2264' && value <= params.value)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7295);
return result;
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7299);
return "";
    },

    /**
     * Format all instances in str that can be handled by ChoiceFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 7308);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7309);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, result;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7312);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7313);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7315);
if(this.getParams(params, matches)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7316);
result = this.select(params);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7317);
if(result) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7318);
str = str.replace(matches[0], result);
                }
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7323);
return str;
    }
}, true);/**
 * List formatter
 * @class MsgListFormatter
 * @namespace Intl
 * @extends StringFormatter
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7334);
Y.Intl.MsgListFormatter = function(values) {
      _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "MsgListFormatter", 7334);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7335);
MsgListFormatter.superclass.constructor.call(this, values);
      _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7336);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*list\\s*}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7339);
MsgListFormatter = Y.Intl.MsgListFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7340);
Y.extend(MsgListFormatter, StringFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7348);
MsgListFormatter.createInstance = function(values) {
     _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 7348);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7349);
return new MsgListFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7352);
Y.mix(MsgListFormatter.prototype, {
     /**
      * Format all instances in str that can be handled by MsgListFormatter
      * @method format
      * @param str {String} Input string/pattern
      * @return {String} Formatted result
      */
     format: function(str) {
          _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 7359);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7360);
var regex = new RegExp(this.regex, "gm"),
              matches = null,
              params;

          _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7364);
while((matches = regex.exec(str))) {
              _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7365);
params = {};

              _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7367);
if(this.getParams(params, matches)) {
                  //Got a match
                  _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7369);
str = str.replace(
                             matches[0],
                             Y.Intl.ListFormatter.format( params.value )
                  );
              }
          }

          _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7376);
return str;
     }
}, true);

/**
 * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime.
 * @module intl-format
 * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl
 */

/**
 * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters.
 * If a formatter fails to parse, the next one in the list try to do so.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7390);
formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7392);
Y.mix(Y.Intl, {

    /**
     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.
     * @method formatMessage
     * @static
     * @param pattern {String} string contains static text with embedded format elements that specify
              how to process and insert strings, numbers, and dates, as well as perform conditional processing.
     * @param values {Object|Array} The data to be processed and inserted.
     * @param [config] {Object} Optional configuration parameters
     * @return {String} Formatted result
     * @example
            //String formatting. Key is replaced by value
            Y.Intl.formatMessage("{EMPLOYEE} reports to {MANAGER}", {
                "EMPLOYEE": "Ashik",
                "MANAGER": "Dharmesh"
            });

            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full
            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone
            Y.Intl.formatMessage("Today is {DATE, date, short}", { DATE: new Date() });
            Y.Intl.formatMessage("The time is {DATE, time, medium}", {DATE: new Date()}, {timezone: "Asia/Kolkata"});
            Y.Intl.formatMessage("There are {POPULATION_INDIA, number} million people in India.", {POPULATION_INDIA: 1241.492});

            //Select formatting. Selects output depending on value
            Y.Intl.formatMessage("{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.", {
                "NAME": "Henri",
                "GENDER": "male",
                "CITY": "Paris"
            });

            //Plural formatting. Selects output depending on whether numerical value is singular/plural
            Y.Intl.formatMessage("{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.", {
                "COMPANY_COUNT": 1
            });

            //Choice formatting. Selects output depending on numerical value
            Y.Intl.formatMessage("There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.", {
                "FILE_COUNT": 1
            });
     */
    formatMessage: function(pattern, values, config) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "formatMessage", 7433);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7434);
config = config || {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7435);
var i, formatter;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7436);
for(i=0; i<formatters.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7437);
formatter = formatters[i].createInstance(values);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7438);
pattern = formatter.format(pattern, config);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7440);
return pattern;
    }
});


}, '@VERSION@', {
    "lang": [
        "af",
        "af-NA",
        "af-ZA",
        "am",
        "am-ET",
        "ar",
        "ar-AE",
        "ar-BH",
        "ar-DZ",
        "ar-EG",
        "ar-IQ",
        "ar-JO",
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
        "as",
        "as-IN",
        "az",
        "az-AZ",
        "az-Cyrl",
        "az-Cyrl-AZ",
        "az-Latn-AZ",
        "be",
        "be-BY",
        "bg",
        "bg-BG",
        "bn",
        "bn-BD",
        "bn-IN",
        "bo",
        "bo-CN",
        "bo-IN",
        "ca",
        "ca-ES",
        "cs",
        "cs-CZ",
        "cy",
        "cy-GB",
        "da",
        "da-DK",
        "de",
        "de-AT",
        "de-BE",
        "de-CH",
        "de-DE",
        "de-LI",
        "de-LU",
        "el",
        "el-CY",
        "el-GR",
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
        "es",
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
        "et",
        "et-EE",
        "eu",
        "eu-ES",
        "fa",
        "fa-AF",
        "fa-IR",
        "fi",
        "fi-FI",
        "fil",
        "fil-PH",
        "fo",
        "fo-FO",
        "fr",
        "fr-BE",
        "fr-CA",
        "fr-CH",
        "fr-FR",
        "fr-LU",
        "fr-MC",
        "fr-SN",
        "ga",
        "ga-IE",
        "gl",
        "gl-ES",
        "gsw",
        "gsw-CH",
        "gu",
        "gu-IN",
        "gv",
        "gv-GB",
        "ha",
        "ha-GH",
        "ha-Latn-GH",
        "ha-Latn-NE",
        "ha-Latn-NG",
        "ha-NE",
        "ha-NG",
        "haw",
        "haw-US",
        "he",
        "he-IL",
        "hi",
        "hi-IN",
        "hr",
        "hr-HR",
        "hu",
        "hu-HU",
        "hy",
        "hy-AM",
        "id",
        "id-ID",
        "ii",
        "ii-CN",
        "in",
        "in-ID",
        "is",
        "is-IS",
        "it",
        "it-CH",
        "it-IT",
        "iw",
        "iw-IL",
        "ja",
        "ja-JP",
        "ja-JP-TRADITIONAL",
        "ka",
        "ka-GE",
        "kk",
        "kk-Cyrl-KZ",
        "kk-KZ",
        "kl",
        "kl-GL",
        "km",
        "km-KH",
        "kn",
        "kn-IN",
        "ko",
        "kok",
        "kok-IN",
        "ko-KR",
        "kw",
        "kw-GB",
        "lt",
        "lt-LT",
        "lv",
        "lv-LV",
        "mk",
        "mk-MK",
        "ml",
        "ml-IN",
        "mr",
        "mr-IN",
        "ms",
        "ms-BN",
        "ms-MY",
        "mt",
        "mt-MT",
        "nb",
        "nb-NO",
        "ne",
        "ne-IN",
        "ne-NP",
        "nl",
        "nl-BE",
        "nl-NL",
        "nn",
        "nn-NO",
        "no",
        "no-NO",
        "no-NO-NY",
        "om",
        "om-ET",
        "om-KE",
        "or",
        "or-IN",
        "pa",
        "pa-Arab",
        "pa-Arab-PK",
        "pa-Guru-IN",
        "pa-IN",
        "pa-PK",
        "pl",
        "pl-PL",
        "ps",
        "ps-AF",
        "pt",
        "pt-BR",
        "pt-PT",
        "ro",
        "ro-MD",
        "ro-RO",
        "ru",
        "ru-RU",
        "ru-UA",
        "sh",
        "sh-BA",
        "sh-CS",
        "sh-YU",
        "si",
        "si-LK",
        "sk",
        "sk-SK",
        "sl",
        "sl-SI",
        "so",
        "so-DJ",
        "so-ET",
        "so-KE",
        "so-SO",
        "sq",
        "sq-AL",
        "sr",
        "sr-BA",
        "sr-CS",
        "sr-Cyrl-BA",
        "sr-Cyrl-CS",
        "sr-Cyrl-ME",
        "sr-Cyrl-RS",
        "sr-Cyrl-YU",
        "sr-Latn",
        "sr-Latn-BA",
        "sr-Latn-CS",
        "sr-Latn-ME",
        "sr-Latn-RS",
        "sr-Latn-YU",
        "sr-ME",
        "sr-RS",
        "sr-YU",
        "sv",
        "sv-FI",
        "sv-SE",
        "sw",
        "sw-KE",
        "sw-TZ",
        "ta",
        "ta-IN",
        "te",
        "te-IN",
        "th",
        "th-TH",
        "ti",
        "ti-ER",
        "ti-ET",
        "tl",
        "tl-PH",
        "tr",
        "tr-TR",
        "uk",
        "uk-UA",
        "ur",
        "ur-IN",
        "ur-PK",
        "uz",
        "uz-AF",
        "uz-Arab",
        "uz-Arab-AF",
        "uz-Cyrl-UZ",
        "uz-Latn",
        "uz-Latn-UZ",
        "uz-UZ",
        "vi",
        "vi-VN",
        "zh",
        "zh-CN",
        "zh-Hans-CN",
        "zh-Hans-HK",
        "zh-Hans-MO",
        "zh-Hans-SG",
        "zh-Hant",
        "zh-Hant-HK",
        "zh-Hant-MO",
        "zh-Hant-TW",
        "zh-HK",
        "zh-MO",
        "zh-SG",
        "zh-TW",
        "zu",
        "zu-ZA"
    ],
    "requires": [
        "datatype-number-format",
        "datatype-number-parse",
        "datatype-date-format",
        "intl"
    ]
});
