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
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].code=["YUI.add('gallery-i18n-formats', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","var Format, NumberFormat, YNumberFormat,    //number","    TimezoneData, TimezoneLinks, Timezone, AjxTimezone,  //timezone","    ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat,   //date","    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter, PluralFormatter, ChoiceFormatter, formatters; //message","","/**"," * Pad string to specified length"," * @method _zeroPad"," * @for Number"," * @static"," * @private"," * @param {String|Number} s The string or number to be padded"," * @param {Number} length The maximum length s should be padded to have"," * @param {String} [zeroChar='0'] The character to be used to pad the string."," * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string"," * @return {String} The padded string"," */","Y.Number._zeroPad  = function(s, length, zeroChar, rightSide) {","    s = typeof s === \"string\" ? s : String(s);","","    if (s.length >= length) { return s; }","","    zeroChar = zeroChar || '0';","	","    var a = [], i;","    for (i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","};","","//","// Format class","//","","/**"," * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which"," * returns the formatted string."," * For internal use only."," * @class __BaseFormat"," * @namespace Number"," * @constructor"," * @private"," * @param {String} pattern"," * @param {Object} formats"," */","Y.Number.__BaseFormat = function(pattern, formats) {","    if ( !pattern && !formats ) {","        return;","    }","","    Y.mix(this, {","        /**","         * Pattern to format/parse","         * @property _pattern","         * @type String","         */","        _pattern: pattern,","        /**","         * Segments in the pattern","         * @property _segments","         * @type Number.__BaseFormat.Segment","         */","        _segments: [],","        Formats: formats","    });","};","","Format = Y.Number.__BaseFormat;","","Y.mix(Format.prototype, {","    /**","     * Format object","     * @method format","     * @param object The object to be formatted","     * @return {String} Formatted result","     */","    format: function(object) {","        var s = [], i = 0;","    ","        for (; i < this._segments.length; i++) {","            s.push(this._segments[i].format(object));","        }","        return s.join(\"\");","    },","","    ","    /**","     * Parses the given string according to this format's pattern and returns","     * an object.","     * Note:","     * The default implementation of this method assumes that the sub-class","     * has implemented the _createParseObject method.","     * @method parse","     * @for Number.__BaseFormat","     * @param {String} s The string to be parsed","     * @param {Number} [pp=0] Parse position. String will only be read from here","     */","    parse: function(s, pp) {","        var object = this._createParseObject(),","            index = pp || 0,","            i = 0;","        for (; i < this._segments.length; i++) {","            index = this._segments[i].parse(object, s, index);","        }","        ","        if (index < s.length) {","            Y.error(\"Parse Error: Input too long\");","        }","        return object;","    },","    ","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Note:","     * This must be implemented by sub-classes.","     * @method _createParseObject","     * @private","     * //return {Object}","     */","    _createParseObject: function(/*s*/) {","        Y.error(\"Not implemented\");","    }","});","","//","// Segment class","//","","/**"," * Segments in the pattern to be formatted"," * @class __BaseFormat.Segment"," * @for __BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param {Format} format The format object that created this segment"," * @param {String} s String representing this segment"," */","Format.Segment = function(format, s) {","    if( !format && !s ) { return; }","    this._parent = format;","    this._s = s;","};","","Y.mix(Format.Segment.prototype, {","    /**","     * Formats the object. Will be overridden in most subclasses.","     * @method format","     * //param o The object to format","     * @return {String} Formatted result","     */","    format: function(/*o*/) {","        return this._s;","    },","","    /**","     * Parses the string at the given index, initializes the parse object","     * (as appropriate), and returns the new index within the string for","     * the next parsing step.","     *","     * Note:","     * This method must be implemented by sub-classes.","     *","     * @method parse","     * //param o     {Object} The parse object to be initialized.","     * //param s     {String} The input string to be parsed.","     * //param index {Number} The index within the string to start parsing.","     * //return The parsed result.","     */","    parse: function(/*o, s, index*/) {","        Y.error(\"Not implemented\");","    },","","    /**","     * Return the parent Format object","     * @method getFormat","     * @return {Number.__BaseFormat}","     */","    getFormat: function() {","        return this._parent;","    }","});","","Y.mix(Format.Segment, {","    /**","     * Parse literal string that matches the pattern","     * @method _parseLiteral","     * @static","     * @private","     * @param {String} literal The pattern that literal should match","     * @param {String} s The literal to be parsed","     * @param {Number} index The position in s where literal is expected to start from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    _parseLiteral: function(literal, s, index) {","        if (s.length - index < literal.length) {","            Y.error(\"Parse Error: Input too short\");","        }","        for (var i = 0; i < literal.length; i++) {","            if (literal.charAt(i) !== s.charAt(index + i)) {","                Y.error(\"Parse Error: Input does not match\");","            }","        }","        return index + literal.length;","    },","    ","    /**","     * Parses an integer at the offset of the given string and calls a","     * method on the specified object.","     *","     * @method _parseInt","     * @private","     *","     * @param o           {Object}   The target object.","     * @param f           {function|String} The method to call on the target object.","     *                               If this parameter is a string, then it is used","     *                               as the name of the property to set on the","     *                               target object.","     * @param adjust      {Number}   The numeric adjustment to make on the","     *                               value before calling the object method.","     * @param s           {String}   The string to parse.","     * @param index       {Number}   The index within the string to start parsing.","     * @param fixedlen    {Number}   If specified, specifies the required number","     *                               of digits to be parsed.","     * @param [radix=10]  {Number}   Specifies the radix of the parse string.","     * @return {Number}   The position where the parsed number was found","     */","    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {","        var len = fixedlen || s.length - index,","            head = index,","            i = 0,","            tail, value, target;","        for (; i < len; i++) {","            if (!s.charAt(index++).match(/\\d/)) {","                index--;","                break;","            }","        }","        tail = index;","        if (head === tail) {","            Y.error(\"Error parsing number. Number not present\");","        }","        if (fixedlen && tail - head !== fixedlen) {","            Y.error(\"Error parsing number. Number too short\");","        }","        value = parseInt(s.substring(head, tail), radix || 10);","        if (f) {","            target = o || Y.config.win;","            if (typeof f === \"function\") {","                f.call(target, value + adjust);","            }","            else {","                target[f] = value + adjust;","            }","        }","        return tail;","    }","});","","//","// Text segment class","//","","/**"," * Text segment in the pattern."," * @class __BaseFormat.TextSegment"," * @for __BaseFormat"," * @namespace Number"," * @extends Segment"," * @constructor"," * @param {Format} format The parent Format object"," * @param {String} s The pattern representing this segment"," */","Format.TextSegment = function(format, s) {","    if (!format && !s) { return; }","    Format.TextSegment.superclass.constructor.call(this, format, s);","};","","Y.extend(Format.TextSegment, Format.Segment);","","Y.mix(Format.TextSegment.prototype, {","    /**","     * String representation of the class","     * @method toString","     * @private","     * @return {String}","     */","    toString: function() {","        return \"text: \\\"\"+this._s+'\"';","    },","","    /**","     * Parse an object according to the pattern","     * @method parse","     * @param o The parse object. Not used here. This is only used in more complex segment types","     * @param s {String} The string being parsed","     * @param index {Number} The index in s to start parsing from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    parse: function(o, s, index) {","        return Format.Segment._parseLiteral(this._s, s, index);","    }","}, true);","/**"," * NumberFormat helps you to format and parse numbers for any locale."," * Your code can be completely independent of the locale conventions for decimal points, thousands-separators,"," * or even the particular decimal digits used, or whether the number format is even decimal."," *"," * This module uses parts of zimbra NumberFormat"," *"," * @module datatype-number-advanced-format"," * @requires datatype-number-format, datatype-number-parse"," */","","/**"," * Class to handle Number formatting."," * @class __zNumberFormat"," * @extends __BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param pattern {String}       The number pattern."," * @param formats {Object}       locale data"," * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only"," */","Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {","    var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,","        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;","    if (arguments.length === 0) { return; }","","    NumberFormat.superclass.constructor.call(this, pattern, formats);","    if (!pattern) { return; }","","    if(pattern === \"{plural_style}\") {","        pattern = this.Formats.decimalFormat;","        this._isPluralCurrency = true;","        this._pattern = pattern;","    }","","    //Default currency","    this.currency = this.Formats.defaultCurrency;","    if(this.currency === undefined || !this.currency) {","        this.currency = \"USD\";","    }","        ","    patterns = pattern.split(/;/);","    pattern = patterns[0];","	","    this._useGrouping = (pattern.indexOf(\",\") !== -1);      //Will be set to true if pattern uses grouping","    this._parseIntegerOnly = (pattern.indexOf(\".\") === -1);  //Will be set to false if pattern contains fractional parts","        ","    //If grouping is used, find primary and secondary grouping","    if(this._useGrouping) {","        numberPattern = pattern.match(/[0#,]+/);","        groupingRegex = new RegExp(\"[0#]+\", \"g\");","        groups = numberPattern[0].match(groupingRegex);","            ","        i = groups.length - 2;","        this._primaryGrouping = groups[i+1].length;","        this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);","    }","        ","    // parse prefix","    i = 0;","        ","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    hasPrefix = results.text !== \"\";","    if (hasPrefix) {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // parse number descriptor","    start = i;","    while (i < pattern.length &&","        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {","        i++;","    }","    end = i;","","    numPattern = pattern.substring(start, end);","    e = numPattern.indexOf(this.Formats.exponentialSymbol);","    expon = e !== -1 ? numPattern.substring(e + 1) : null;","    if (expon) {","        numPattern = numPattern.substring(0, e);","        this._showExponent = true;","    }","	","    dot = numPattern.indexOf('.');","    whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;","    if (whole) {","        /*var comma = whole.lastIndexOf(',');","            if (comma != -1) {","                this._groupingOffset = whole.length - comma - 1;","            }*/","        whole = whole.replace(/[^#0]/g,\"\");","        zero = whole.indexOf('0');","        if (zero !== -1) {","            this._minIntDigits = whole.length - zero;","        }","        this._maxIntDigits = whole.length;","    }","	","    fract = dot !== -1 ? numPattern.substring(dot + 1) : null;","    if (fract) {","        zero = fract.lastIndexOf('0');","        if (zero !== -1) {","            this._minFracDigits = zero + 1;","        }","        this._maxFracDigits = fract.replace(/[^#0]/g,\"\").length;","    }","	","    this._segments.push(new NumberFormat.NumberSegment(this, numPattern));","	","    // parse suffix","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    if (results.text !== \"\") {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // add negative formatter","    if (skipNegFormat) { return; }","	","    if (patterns.length > 1) {","        pattern = patterns[1];","        this._negativeFormatter = new NumberFormat(pattern, formats, true);","    }","    else {","        // no negative pattern; insert minus sign before number segment","        formatter = new NumberFormat(\"\", formats);","        formatter._segments = formatter._segments.concat(this._segments);","","        index = hasPrefix ? 1 : 0;","        minus = new Format.TextSegment(formatter, this.Formats.minusSign);","        formatter._segments.splice(index, 0, minus);","		","        this._negativeFormatter = formatter;","    }","};","","NumberFormat = Y.Number.__zNumberFormat;","Y.extend(NumberFormat, Y.Number.__BaseFormat);","    ","// Constants","","Y.mix(NumberFormat, {","    _NUMBER: \"number\",","    _INTEGER: \"integer\",","    _CURRENCY: \"currency\",","    _PERCENT: \"percent\",","","    _META_CHARS: \"0#.,E\"","});","","Y.mix( NumberFormat.prototype, {","    _groupingOffset: Number.MAX_VALUE,","    _minIntDigits: 1,","    _isCurrency: false,","    _isPercent: false,","    _isPerMille: false,","    _showExponent: false,","","    /**","     * Format a number","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        if (number < 0 && this._negativeFormatter) {","            return this._negativeFormatter.format(number);","        }","        ","        var result = Format.prototype.format.call(this, number), pattern = \"\";","        ","        if(this._isPluralCurrency) {","            if(number === 1) {","                //Singular","                pattern = this.Formats.currencyPatternSingular;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencySingular\"]);","            } else {","                //Plural","                pattern = this.Formats.currencyPatternPlural;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencyPlural\"]);","            }","            ","            result = pattern.replace(\"{0}\", result);","        }","        ","        return result;","    },","","    /**","     * Parse string and return number","     * @method parse","     * @param s {String} The string to parse","     * @param pp {Number} Parse position. Will start parsing from this index in string s.","     * @return {Number} Parse result","     */","    parse: function(s, pp) {","        var singular, plural, object;","        if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {","            return this._negativeFormatter.parse(s, pp);","        }","        ","        if(this._isPluralCurrency) {","            singular = this.Formats[this.currency + \"_currencySingular\"],","                plural = this.Formats[this.currency + \"_currencyPlural\"];","            ","            s = Y.Lang.trim(s.replace(plural, \"\").replace(singular, \"\"));","        }","        ","        object = null;","        try {","            object = Format.prototype.parse.call(this, s, pp);","            object = object.value;","        } catch(e) {","            Y.error(\"Failed to parse: \" + s, e);","        }","        ","        return object;","    },","","    /**","     * Parse static. Internal use only.","     * @method __parseStatic","     * @private","     * @param {String} s Pattern","     * @param {Number} i Index","     * @return {Object}","     */","    __parseStatic: function(s, i) {","        var data = [], c, start, end;","        while (i < s.length) {","            c = s.charAt(i++);","            if (NumberFormat._META_CHARS.indexOf(c) !== -1) {","                i--;","                break;","            }","            switch (c) {","                case \"'\":","                    start = i;","                    while (i < s.length && s.charAt(i) !== \"'\") {","			i++;","                    }","                    end = i;","                    c = end - start === 0 ? \"'\" : s.substring(start, end);","                    break;","                case '%':","                    c = this.Formats.percentSign;","                    this._isPercent = true;","                    break;","                case '\\u2030':","                    c = this.Formats.perMilleSign;","                    this._isPerMille = true;","                    break;","                case '\\u00a4':","                    if(s.charAt(i) === '\\u00a4') {","                        c = this.Formats[this.currency + \"_currencyISO\"];","                        i++;","                    } else {","                        c = this.Formats[this.currency + \"_currencySymbol\"];","                    }","                    this._isCurrency = true;","                    break;","            }","            data.push(c);","        }","        return {","            text: data.join(\"\"),","            offset: i","        };","    },","","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Overrides method from __BaseFormat","     * @method _createParseObject","     * @private","     * @return {Object}","     */","    _createParseObject: function() {","        return {","            value: null","        };","    }","}, true);","    ","//","// NumberFormat.NumberSegment class","//","","/**"," * Number segment class."," * @class __zNumberFormat.NumberSegment"," * @for __zNumberFormat"," * @namespace Number"," * @extends Number.__BaseFormat.Segment"," *"," * @private"," * @constructor"," *"," * @param format {Number.__zNumberFormat} Parent Format object"," * @param s {String} Pattern representing this segment"," */","NumberFormat.NumberSegment = function(format, s) {","    if (format === null && s === null) { return; }","    NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);","};","Y.extend(NumberFormat.NumberSegment, Format.Segment);","","Y.mix(NumberFormat.NumberSegment.prototype, {","    /**","     * Format number segment","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        var expon, exponReg, s;","        // special values","        if (isNaN(number)) { return this._parent.Formats.nanSymbol; }","        if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {","            return this._parent.Formats.infinitySign;","        }","","        // adjust value","        if (typeof number !== \"number\") { number = Number(number); }","        number = Math.abs(number); // NOTE: minus sign is part of pattern","        if (this._parent._isPercent) { number *= 100; }","        else if (this._parent._isPerMille) { number *= 1000; }","        if(this._parent._parseIntegerOnly) { number = Math.floor(number); }","        ","        // format","        expon = this._parent.Formats.exponentialSymbol;","        exponReg = new RegExp(expon + \"+\");","        s = this._parent._showExponent","            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)","            : number.toFixed(this._parent._maxFracDigits || 0);","        s = this._normalize(s);","        return s;","    },","","    /**","     * Normalize pattern","     * @method _normalize","     * @protected","     * @param {String} s Pattern","     * @return {String} Normalized pattern","     */","    _normalize: function(s) {","        var exponSymbol = this._parent.Formats.exponentialSymbol,","            splitReg = new RegExp(\"[\\\\.\" + exponSymbol + \"]\"),","            match = s.split(splitReg),","            whole = match.shift(),  //Normalize the whole part","            a = [],","            offset = this._parent._primaryGrouping,","            fract = '0',","            decimal = this._parent.Formats.decimalSeparator,","            expon, i;","","	if (whole.length < this._parent._minIntDigits) {","            whole = Y.Number._zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);","        }","        if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {","            i = whole.length - offset;","            while (i > 0) {","                a.unshift(whole.substr(i, offset));","                a.unshift(this._parent.Formats.groupingSeparator);","                offset = this._parent._secondaryGrouping;","                i -= offset;","            }","            a.unshift(whole.substring(0, i + offset));","		","            whole = a.join(\"\");","        }","	","        if(s.match(/\\./)) {","            fract = match.shift();","        }","        else if(s.match(/\\e/) || s.match(/\\E/)) {","            expon = match.shift();","        }","","        fract = fract.replace(/0+$/,\"\");","        if (fract.length < this._parent._minFracDigits) {","            fract = Y.Number._zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);","        }","	","        a = [ whole ];","        if (fract.length > 0) {","            a.push(decimal, fract);","        }","        if (expon) {","            a.push(exponSymbol, expon.replace(/^\\+/,\"\"));","        }","	","        // return normalize result","        return a.join(\"\");","    },","","    /**","     * Parse Number Segment","     * @method parse","     * @param object {Object} Result will be stored in object.value","     * @param s {String} Pattern","     * @param index {Number}","     * @return {Number} Index in s where parse ended","     */","    parse: function(object, s, index) {","        var comma = this._parent.Formats.groupingSeparator,","            dot = this._parent.Formats.decimalSeparator,","            minusSign = this._parent.Formats.minusSign,","            expon = this._parent.Formats.exponentialSymbol,","            numberRegexPattern = \"[\\\\\" + minusSign + \"0-9\" + comma + \"]+\",","            numberRegex, matches, negativeNum, endIndex, scientific = null, i,","            //If more groups, use primary/secondary grouping as applicable","            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;","","        if(!this._parent._parseIntegerOnly) {","            numberRegexPattern += \"(\\\\\" + dot + \"[0-9]+)?\";","        }","        if(this._parent._showExponent) {","            numberRegexPattern += \"(\" + expon +\"\\\\+?[0-9]+)\";","        }","        ","        numberRegex = new RegExp(numberRegexPattern);","        matches = s.match(numberRegex);","        ","        if(!matches) {","            Y.error(\"Error parsing: Number does not match pattern\");","        }","        ","        negativeNum = s.indexOf(minusSign) !== -1;","        endIndex = index + matches[0].length;","        s = s.slice(index, endIndex);","        ","        //Scientific format does not use grouping","        if(this._parent.showExponent) {","            scientific = s.split(expon);","        } else if(this._parent._useGrouping) {","            //Verify grouping data exists","            if(!this._parent._primaryGrouping) {","                //Should not happen","                Y.error(\"Error parsing: Invalid pattern\");","            }","            ","            //Verify grouping is correct","            i = s.length - this._parent._primaryGrouping - 1;","            ","            if(matches[1]) {","                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part","                i = i - matches[1].length;","            }","            ","            //Use primary grouping for first group","            if(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","            }","            ","            i = i - grouping - 1;","            ","            while(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","                i = i - grouping - 1;","            }","            ","            //Verify there are no more grouping separators","            if(s.indexOf(comma) !== -1) {","                Y.error(\"Error parsing: Number does not match pattern\");","            }","        }","        ","        if(scientific) {","            object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));","        } else {","            object.value = parseFloat(s, 10);","        }","        ","        //Special types","        if(negativeNum) { object.value *= -1; }","        if (this._parent._isPercent) { object.value /= 100; }","        else if (this._parent._isPerMille) { object.value /= 1000; }","        ","        return endIndex;","    }","}, true);","","/**"," * Number Formatting"," * @class __YNumberFormat"," * @namespace Number"," * @private"," * @constructor"," * @param [style='NUMBER_STYLE'] {Number} the given style. Should be key/value from Y.Number.STYLES"," */","Y.Number.__YNumberFormat = function(style) {","    style = style || Y.Number.STYLES.NUMBER_STYLE;","    ","    if(Y.Lang.isString(style)) {","        style = Y.Number.STYLES[style];","    }","    ","    var pattern = \"\",","        formats = Y.Intl.get(\"datatype-number-advanced-format\");","    switch(style) {","        case Y.Number.STYLES.CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            break;","        case Y.Number.STYLES.ISO_CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            pattern = pattern.replace(\"\\u00a4\", \"\\u00a4\\u00a4\");","            break;","        case Y.Number.STYLES.NUMBER_STYLE:","            pattern = formats.decimalFormat;","            break;","        case Y.Number.STYLES.PERCENT_STYLE:","            pattern = formats.percentFormat;","            break;","        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:","            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting","            pattern = \"{plural_style}\";","            break;","        case Y.Number.STYLES.SCIENTIFIC_STYLE:","            pattern = formats.scientificFormat;","            break;","    }","        ","    this._numberFormatInstance = new NumberFormat(pattern, formats);","};","","YNumberFormat = Y.Number.__YNumberFormat;","","Y.mix(Y.Number, {","    /**","     * Style values to use during format/parse","     * @property STYLES","     * @type Object","     * @static","     * @final","     * @for Number","     */","    STYLES: {","        CURRENCY_STYLE: 1,","        ISO_CURRENCY_STYLE: 2,","        NUMBER_STYLE: 4,","        PERCENT_STYLE: 8,","        PLURAL_CURRENCY_STYLE: 16,","        SCIENTIFIC_STYLE: 32","    }","});","   ","Y.mix(YNumberFormat.prototype, {","    /**","     * Format a number","     * @method format","     * @param number {Number} the number to format","     * @for Number.YNumberFormat","     * @return {Number}","     */","    format: function(number) {","        return this._numberFormatInstance.format(number);","    },","    ","    /**","     * Return true if this format will parse numbers as integers only.","     * For example in the English locale, with ParseIntegerOnly true, the string \"1234.\" would be parsed as the integer value 1234","     * and parsing would stop at the \".\" character. Of course, the exact format accepted by the parse operation is locale dependant.","     * @method isParseIntegerOnly","     * @return {Boolean}","     */","    isParseIntegerOnly: function() {","        return this._numberFormatInstance._parseIntegerOnly;","    },","    ","    /**","     * Parse the string to get a number","     * @method parse","     * @param {String} txt The string to parse","     * @param {Number} [pp=0] Parse position. The position to start parsing at.","     */","    parse: function(txt, pp) {","        return this._numberFormatInstance.parse(txt, pp);","    },","    ","    /**","     * Sets whether or not numbers should be parsed as integers only.","     * @method setParseIntegerOnly","     * @param {Boolean} newValue set True, this format will parse numbers as integers only.","     */","    setParseIntegerOnly: function(newValue) {","        this._numberFormatInstance._parseIntegerOnly = newValue;","    }","});","Y.mix( Y.Number, {","     _oldFormat: Y.Number.format,","     _oldParse:  Y.Number.parse","});","","Y.mix( Y.Number, {","     /**","      * Takes a Number and formats to string for display to user","      *","      * @for Number","      * @method format","      * @param data {Number} Number","      * @param [config] {Object} Optional Configuration values.","      *   <dl>","      *      <dt>[style] {Number|String}</dt>","      *         <dd>Format/Style to use. See Y.Number.STYLES</dd>","      *      <dt>[parseIntegerOnly] {Boolean}</dt>","      *         <dd>If set to true, only the whole number part of data will be used</dd>","      *      <dt>[prefix] {String}</dd>","      *         <dd>String prepended before each number, like a currency designator \"$\"</dd>","      *      <dt>[decimalPlaces] {Number}</dd>","      *         <dd>Number of decimal places to round. Must be a number 0 to 20.</dd>","      *      <dt>[decimalSeparator] {String}</dd>","      *         <dd>Decimal separator</dd>","      *      <dt>[thousandsSeparator] {String}</dd>","      *         <dd>Thousands separator</dd>","      *      <dt>[suffix] {String}</dd>","      *         <dd>String appended after each number, like \" items\" (note the space)</dd>","      *   </dl>","      * @return {String} Formatted string representation of data","      */","     format: function(data, config) {","         config = config || {};","    ","         if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined","               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {","             return Y.Number._oldFormat(data, config);","         }","    ","         try {","             var formatter = new YNumberFormat(config.style);","             if(config.parseIntegerOnly) {","                 formatter.setParseIntegerOnly(true);","             }","             return formatter.format(data);","         } catch(e) {","             //Error. Fallback to original format","         }","         return Y.Number._oldFormat(data, config);","     },","","     /**","      * Parses data and returns a number","      *","      * @for Number","      * @method format","      * @param data {String} Data to be parsed","      * @param [config] (Object} Object containg 'style' (Pattern data is represented in.","               See Y.Number.STYLES) and 'parsePosition' (index position in data to start parsing at) Both parameters are optional.","               If omitted, style defaults to NUMBER_STYLE, and parsePosition defaults to 0","      * @return {Number} Number represented by data","      */","     parse: function(data, config) {","         try {","             var formatter = new YNumberFormat(config.style);","             return formatter.parse(data, config.parsePosition);","         } catch(e) {","             //Fallback on deprecated parse","         }","    ","         return Y.Number._oldParse(data);","     }","}, true);","","//Update Parsers shortcut","Y.namespace(\"Parsers\").number = Y.Number.parse;","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","Y.Date.Timezone = {","    __tzoneData: {","         TRANSITION_YEAR: 2011,","         TIMEZONE_RULES: [","{","    tzId: \"Asia/Riyadh88\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"Asia/Kabul\",","    standard: {","        offset: 270","    }","},","{","    tzId: \"Asia/Yerevan\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Baku\",","    standard: {","        offset: 240,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 5,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 300,","        mon: 3,","        week: -1,","        wkday: 1,","        hour: 4,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Asia/Bahrain\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Dhaka\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Thimphu\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Indian/Chagos\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Brunei\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Rangoon\",","    standard: {","        offset: 390","    }","},","{","    tzId: \"Asia/Phnom_Penh\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Harbin\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Shanghai\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Chongqing\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Urumqi\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kashgar\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Hong_Kong\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Taipei\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Macau\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Nicosia\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Tbilisi\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Dili\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Kolkata\",","    standard: {","        offset: 330","    }","},","{","    tzId: \"Asia/Jakarta\",","    standard: {","        offset: 427","    }","},","{","    tzId: \"Asia/Pontianak\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Tehran\",","    standard: {","        offset: 210","    }","},","{","    tzId: \"Asia/Baghdad\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Jerusalem\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Tokyo\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Amman\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Almaty\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Qyzylorda\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Aqtobe\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Aqtau\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Oral\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Bishkek\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Seoul\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Kuwait\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Vientiane\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Beirut\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Kuala_Lumpur\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kuching\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Indian/Maldives\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Hovd\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Ulaanbaatar\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Choibalsan\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kathmandu\",","    standard: {","        offset: 345","    }","},","{","    tzId: \"Asia/Muscat\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Karachi\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Gaza\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Hebron\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Manila\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Qatar\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Riyadh\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Singapore\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Colombo\",","    standard: {","        offset: 330","    }","},","{","    tzId: \"Asia/Damascus\",","    standard: {","        offset: 120,","        mon: 10,","        week: -1,","        wkday: 6,","        hour: 0,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 180,","        mon: 3,","        week: -1,","        wkday: 6,","        hour: 0,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Asia/Dushanbe\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Bangkok\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Ashgabat\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Dubai\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Samarkand\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Ho_Chi_Minh\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Aden\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Australia/Darwin\",","    standard: {","        offset: 570","    }","},","{","    tzId: \"Australia/Perth\",","    standard: {","        offset: 525","    }","},","{","    tzId: \"Australia/Brisbane\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Australia/Adelaide\",","    standard: {","        offset: 570,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 630,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Hobart\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Australia/Melbourne\",","    standard: {","        offset: 600,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 660,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Sydney\",","    standard: {","        offset: 570,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 630,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Lord_Howe\",","    standard: {","        offset: 630,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 660,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Indian/Christmas\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Pacific/Rarotonga\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Indian/Cocos\",","    standard: {","        offset: 390","    }","},","{","    tzId: \"Pacific/Fiji\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Gambier\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Pacific/Guam\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Tarawa\",","    standard: {","        offset: 840","    }","},","{","    tzId: \"Pacific/Saipan\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Majuro\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Chuuk\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Nauru\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Noumea\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Auckland\",","    standard: {","        offset: 765","    }","},","{","    tzId: \"Pacific/Niue\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Norfolk\",","    standard: {","        offset: 690","    }","},","{","    tzId: \"Pacific/Palau\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Pacific/Port_Moresby\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Pitcairn\",","    standard: {","        offset: -480","    }","},","{","    tzId: \"Pacific/Pago_Pago\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Apia\",","    standard: {","        offset: 780","    }","},","{","    tzId: \"Pacific/Guadalcanal\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Fakaofo\",","    standard: {","        offset: 840","    }","},","{","    tzId: \"Pacific/Tongatapu\",","    standard: {","        offset: 780","    }","},","{","    tzId: \"Pacific/Funafuti\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Johnston\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Pacific/Midway\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Wake\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Efate\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Wallis\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Etc/GMT\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Etc/GMT-14\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Asia/Riyadh87\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"America/Argentina/Buenos_Aires\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Cordoba\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Salta\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Tucuman\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/La_Rioja\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/San_Juan\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Jujuy\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Catamarca\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Mendoza\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/San_Luis\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Argentina/Rio_Gallegos\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Ushuaia\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Aruba\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/La_Paz\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Noronha\",","    standard: {","        offset: -120","    }","},","{","    tzId: \"America/Belem\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Santarem\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Fortaleza\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Recife\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Araguaina\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Maceio\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Bahia\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Sao_Paulo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Campo_Grande\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Cuiaba\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Porto_Velho\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Boa_Vista\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Manaus\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Eirunepe\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Rio_Branco\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Santiago\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Bogota\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Curacao\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guayaquil\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"Atlantic/Stanley\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Cayenne\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Guyana\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Asuncion\",","    standard: {","        offset: -240,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 0,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 0,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Lima\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"Atlantic/South_Georgia\",","    standard: {","        offset: -120","    }","},","{","    tzId: \"America/Paramaribo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Port_of_Spain\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Montevideo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Caracas\",","    standard: {","        offset: -210","    }","},","{","    tzId: \"Antarctica/Casey\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Antarctica/Davis\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Antarctica/Macquarie\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Indian/Kerguelen\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Antarctica/DumontDUrville\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Antarctica/Syowa\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Antarctica/Vostok\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Antarctica/Rothera\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"Antarctica/Palmer\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"Antarctica/McMurdo\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Riyadh89\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"Africa/Algiers\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Luanda\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Porto-Novo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Gaborone\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Ouagadougou\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Bujumbura\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Douala\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Atlantic/Cape_Verde\",","    standard: {","        offset: -60","    }","},","{","    tzId: \"Africa/Bangui\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Ndjamena\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Comoro\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Kinshasa\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Brazzaville\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Abidjan\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Djibouti\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Cairo\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Malabo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Asmara\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Addis_Ababa\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Libreville\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Banjul\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Accra\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Conakry\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Bissau\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Nairobi\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Maseru\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Monrovia\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Tripoli\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Antananarivo\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Blantyre\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Bamako\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Nouakchott\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Indian/Mauritius\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Indian/Mayotte\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Casablanca\",","    standard: {","        offset: 0,","        mon: 9,","        week: -1,","        wkday: 1,","        hour: 3,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 60,","        mon: 4,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Africa/El_Aaiun\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Maputo\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Windhoek\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Niamey\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Lagos\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Reunion\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Africa/Kigali\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Atlantic/St_Helena\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Sao_Tome\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Dakar\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Indian/Mahe\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Africa/Freetown\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Mogadishu\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Johannesburg\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Khartoum\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Juba\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Mbabane\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Dar_es_Salaam\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Lome\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Tunis\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Kampala\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Lusaka\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Harare\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/London\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"WET\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Tirane\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Andorra\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Vienna\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Minsk\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Europe/Brussels\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Sofia\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Prague\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Copenhagen\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"America/Danmarkshavn\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Europe/Tallinn\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Helsinki\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Paris\",","    standard: {","        offset: 9","    }","},","{","    tzId: \"Europe/Berlin\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Gibraltar\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Athens\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Budapest\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Atlantic/Reykjavik\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Rome\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Riga\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Vaduz\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Vilnius\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Luxembourg\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Malta\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Chisinau\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Monaco\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Amsterdam\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Oslo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Warsaw\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Lisbon\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Bucharest\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Kaliningrad\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Europe/Moscow\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Europe/Volgograd\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Europe/Samara\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Yekaterinburg\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Omsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Novosibirsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Novokuznetsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Krasnoyarsk\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Irkutsk\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Yakutsk\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Asia/Vladivostok\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Asia/Sakhalin\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Asia/Magadan\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Kamchatka\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Anadyr\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Europe/Belgrade\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Madrid\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Stockholm\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Zurich\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Istanbul\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Kiev\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Uzhgorod\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Zaporozhye\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Simferopol\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"EST\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"America/New_York\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Chicago\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/Center\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/New_Salem\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/Beulah\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Denver\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Los_Angeles\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Juneau\",","    standard: {","        offset: -600,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -540,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Pacific/Honolulu\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"America/Phoenix\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Boise\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Indianapolis\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Marengo\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Vincennes\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Tell_City\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Petersburg\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Knox\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Winamac\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Vevay\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Kentucky/Louisville\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Kentucky/Monticello\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Detroit\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Menominee\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/St_Johns\",","    standard: {","        offset: -150,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -90,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Goose_Bay\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Halifax\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Moncton\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Blanc-Sablon\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Toronto\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Winnipeg\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Regina\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Edmonton\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Vancouver\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Pangnirtung\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Iqaluit\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Resolute\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Rankin_Inlet\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cambridge_Bay\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cancun\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Merida\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Matamoros\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Monterrey\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Mexico_City\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Ojinaga\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Chihuahua\",","    standard: {","        offset: -420,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Hermosillo\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Mazatlan\",","    standard: {","        offset: -420,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Bahia_Banderas\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Tijuana\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Santa_Isabel\",","    standard: {","        offset: -480,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Anguilla\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Antigua\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Nassau\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Barbados\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Belize\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"Atlantic/Bermuda\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cayman\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Costa_Rica\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Havana\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Dominica\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Santo_Domingo\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/El_Salvador\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Grenada\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guadeloupe\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guatemala\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Port-au-Prince\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Tegucigalpa\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Jamaica\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Martinique\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Montserrat\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Managua\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Panama\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Puerto_Rico\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Kitts\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Lucia\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Miquelon\",","    standard: {","        offset: -180,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -120,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/St_Vincent\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Grand_Turk\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Tortola\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Thomas\",","    standard: {","        offset: -240","    }","}","]","}};","","TimezoneData = Y.Date.Timezone.__tzoneData;","Y.Date.Timezone.__tzoneLinks = {","    \"Mideast/Riyadh88\": \"Asia/Riyadh88\",","    \"Europe/Nicosia\": \"Asia/Nicosia\",","    \"US/Pacific-New\": \"America/Los_Angeles\",","    \"GMT\": \"Etc/GMT\",","    \"Etc/UTC\": \"Etc/GMT\",","    \"Etc/Universal\": \"Etc/UTC\",","    \"Etc/Zulu\": \"Etc/UTC\",","    \"Etc/Greenwich\": \"Etc/GMT\",","    \"Etc/GMT-0\": \"Etc/GMT\",","    \"Etc/GMT+0\": \"Etc/GMT\",","    \"Etc/GMT0\": \"Etc/GMT\",","    \"Mideast/Riyadh87\": \"Asia/Riyadh87\",","    \"America/Lower_Princes\": \"America/Curacao\",","    \"America/Kralendijk\": \"America/Curacao\",","    \"Antarctica/South_Pole\": \"Antarctica/McMurdo\",","    \"Mideast/Riyadh89\": \"Asia/Riyadh89\",","    \"Africa/Asmera\": \"Africa/Asmara\",","    \"Africa/Timbuktu\": \"Africa/Bamako\",","    \"America/Argentina/ComodRivadavia\": \"America/Argentina/Catamarca\",","    \"America/Atka\": \"America/Adak\",","    \"America/Buenos_Aires\": \"America/Argentina/Buenos_Aires\",","    \"America/Catamarca\": \"America/Argentina/Catamarca\",","    \"America/Coral_Harbour\": \"America/Atikokan\",","    \"America/Cordoba\": \"America/Argentina/Cordoba\",","    \"America/Ensenada\": \"America/Tijuana\",","    \"America/Fort_Wayne\": \"America/Indiana/Indianapolis\",","    \"America/Indianapolis\": \"America/Indiana/Indianapolis\",","    \"America/Jujuy\": \"America/Argentina/Jujuy\",","    \"America/Knox_IN\": \"America/Indiana/Knox\",","    \"America/Louisville\": \"America/Kentucky/Louisville\",","    \"America/Mendoza\": \"America/Argentina/Mendoza\",","    \"America/Porto_Acre\": \"America/Rio_Branco\",","    \"America/Rosario\": \"America/Argentina/Cordoba\",","    \"America/Virgin\": \"America/St_Thomas\",","    \"Asia/Ashkhabad\": \"Asia/Ashgabat\",","    \"Asia/Chungking\": \"Asia/Chongqing\",","    \"Asia/Dacca\": \"Asia/Dhaka\",","    \"Asia/Katmandu\": \"Asia/Kathmandu\",","    \"Asia/Calcutta\": \"Asia/Kolkata\",","    \"Asia/Macao\": \"Asia/Macau\",","    \"Asia/Tel_Aviv\": \"Asia/Jerusalem\",","    \"Asia/Saigon\": \"Asia/Ho_Chi_Minh\",","    \"Asia/Thimbu\": \"Asia/Thimphu\",","    \"Asia/Ujung_Pandang\": \"Asia/Makassar\",","    \"Asia/Ulan_Bator\": \"Asia/Ulaanbaatar\",","    \"Atlantic/Faeroe\": \"Atlantic/Faroe\",","    \"Atlantic/Jan_Mayen\": \"Europe/Oslo\",","    \"Australia/ACT\": \"Australia/Sydney\",","    \"Australia/Canberra\": \"Australia/Sydney\",","    \"Australia/LHI\": \"Australia/Lord_Howe\",","    \"Australia/NSW\": \"Australia/Sydney\",","    \"Australia/North\": \"Australia/Darwin\",","    \"Australia/Queensland\": \"Australia/Brisbane\",","    \"Australia/South\": \"Australia/Adelaide\",","    \"Australia/Tasmania\": \"Australia/Hobart\",","    \"Australia/Victoria\": \"Australia/Melbourne\",","    \"Australia/West\": \"Australia/Perth\",","    \"Australia/Yancowinna\": \"Australia/Broken_Hill\",","    \"Brazil/Acre\": \"America/Rio_Branco\",","    \"Brazil/DeNoronha\": \"America/Noronha\",","    \"Brazil/East\": \"America/Sao_Paulo\",","    \"Brazil/West\": \"America/Manaus\",","    \"Canada/Atlantic\": \"America/Halifax\",","    \"Canada/Central\": \"America/Winnipeg\",","    \"Canada/East-Saskatchewan\": \"America/Regina\",","    \"Canada/Eastern\": \"America/Toronto\",","    \"Canada/Mountain\": \"America/Edmonton\",","    \"Canada/Newfoundland\": \"America/St_Johns\",","    \"Canada/Pacific\": \"America/Vancouver\",","    \"Canada/Saskatchewan\": \"America/Regina\",","    \"Canada/Yukon\": \"America/Whitehorse\",","    \"Chile/Continental\": \"America/Santiago\",","    \"Chile/EasterIsland\": \"Pacific/Easter\",","    \"Cuba\": \"America/Havana\",","    \"Egypt\": \"Africa/Cairo\",","    \"Eire\": \"Europe/Dublin\",","    \"Europe/Belfast\": \"Europe/London\",","    \"Europe/Tiraspol\": \"Europe/Chisinau\",","    \"GB\": \"Europe/London\",","    \"GB-Eire\": \"Europe/London\",","    \"GMT+0\": \"Etc/GMT\",","    \"GMT-0\": \"Etc/GMT\",","    \"GMT0\": \"Etc/GMT\",","    \"Greenwich\": \"Etc/GMT\",","    \"Hongkong\": \"Asia/Hong_Kong\",","    \"Iceland\": \"Atlantic/Reykjavik\",","    \"Iran\": \"Asia/Tehran\",","    \"Israel\": \"Asia/Jerusalem\",","    \"Jamaica\": \"America/Jamaica\",","    \"Japan\": \"Asia/Tokyo\",","    \"Kwajalein\": \"Pacific/Kwajalein\",","    \"Libya\": \"Africa/Tripoli\",","    \"Mexico/BajaNorte\": \"America/Tijuana\",","    \"Mexico/BajaSur\": \"America/Mazatlan\",","    \"Mexico/General\": \"America/Mexico_City\",","    \"NZ\": \"Pacific/Auckland\",","    \"NZ-CHAT\": \"Pacific/Chatham\",","    \"Navajo\": \"America/Denver\",","    \"PRC\": \"Asia/Shanghai\",","    \"Pacific/Samoa\": \"Pacific/Pago_Pago\",","    \"Pacific/Yap\": \"Pacific/Chuuk\",","    \"Pacific/Truk\": \"Pacific/Chuuk\",","    \"Pacific/Ponape\": \"Pacific/Pohnpei\",","    \"Poland\": \"Europe/Warsaw\",","    \"Portugal\": \"Europe/Lisbon\",","    \"ROC\": \"Asia/Taipei\",","    \"ROK\": \"Asia/Seoul\",","    \"Singapore\": \"Asia/Singapore\",","    \"Turkey\": \"Europe/Istanbul\",","    \"UCT\": \"Etc/UCT\",","    \"US/Alaska\": \"America/Anchorage\",","    \"US/Aleutian\": \"America/Adak\",","    \"US/Arizona\": \"America/Phoenix\",","    \"US/Central\": \"America/Chicago\",","    \"US/East-Indiana\": \"America/Indiana/Indianapolis\",","    \"US/Eastern\": \"America/New_York\",","    \"US/Hawaii\": \"Pacific/Honolulu\",","    \"US/Indiana-Starke\": \"America/Indiana/Knox\",","    \"US/Michigan\": \"America/Detroit\",","    \"US/Mountain\": \"America/Denver\",","    \"US/Pacific\": \"America/Los_Angeles\",","    \"US/Samoa\": \"Pacific/Pago_Pago\",","    \"UTC\": \"Etc/UTC\",","    \"Universal\": \"Etc/UTC\",","    \"W-SU\": \"Europe/Moscow\",","    \"Zulu\": \"Etc/UTC\",","    \"Europe/Mariehamn\": \"Europe/Helsinki\",","    \"Europe/Vatican\": \"Europe/Rome\",","    \"Europe/San_Marino\": \"Europe/Rome\",","    \"Arctic/Longyearbyen\": \"Europe/Oslo\",","    \"Europe/Ljubljana\": \"Europe/Belgrade\",","    \"Europe/Podgorica\": \"Europe/Belgrade\",","    \"Europe/Sarajevo\": \"Europe/Belgrade\",","    \"Europe/Skopje\": \"Europe/Belgrade\",","    \"Europe/Zagreb\": \"Europe/Belgrade\",","    \"Europe/Bratislava\": \"Europe/Prague\",","    \"America/Shiprock\": \"America/Denver\",","    \"America/St_Barthelemy\": \"America/Guadeloupe\",","    \"America/Marigot\": \"America/Guadeloupe\"","};","","TimezoneLinks = Y.Date.Timezone.__tzoneLinks;/**"," * Timezone performs operations on a given timezone string represented in Olson tz database"," * This module uses parts of zimbra AjxTimezone to handle time-zones"," * @module datatype-date-timezone"," * @requires datatype-date-format"," */","","/**"," * Class to handle timezones"," * @class __zTimezone"," * @namespace Date"," * @private"," * @constructor"," */","Y.Date.__zTimezone = function() {","    this.localeData = Y.Intl.get(\"datatype-date-timezone\");","};","","AjxTimezone = Y.Date.__zTimezone;","","Y.mix(AjxTimezone, {","    /**","     * Get DST trasition date","     * @method getTransition","     * @static","     * @param onset {Object} DST transition information","     * @param year {Number} Year in which transition date is calculated","     * @return {Array} Transition as [year, month, day]","     */","    getTransition: function(onset, year) {","        var trans = [ year || new Date().getFullYear(), onset.mon, 1 ], date, wkday, adjust, last, count;","        if (onset.mday) {","            trans[2] = onset.mday;","        }","        else if (onset.wkday) {","            date = new Date(year, onset.mon - 1, 1, onset.hour, onset.min, onset.sec);","","            // last wkday of month","            if (onset.week === -1) {","                // NOTE: This creates a date of the *last* day of specified month by","                //       setting the month to *next* month and setting day of month","                //       to zero (i.e. the day *before* the first day).","                last = new Date(new Date(date.getTime()).setMonth(onset.mon, 0));","                count = last.getDate();","                wkday = last.getDay() + 1;","                adjust = wkday >= onset.wkday ? wkday - onset.wkday : 7 - onset.wkday - wkday;","                trans[2] = count - adjust;","            }","","            // Nth wkday of month","            else {","                wkday = date.getDay() + 1;","                adjust = onset.wkday === wkday ? 1 :0;","                trans[2] = onset.wkday + 7 * (onset.week - adjust) - wkday + 1;","            }","        }","        return trans;","    },","","    /**","     * Add dst transition rules with dst information","     * @method addRule","     * @static","     * @param rule {Object} Object containing timezone information","     */","    addRule: function(rule) {","        var tzId = rule.tzId, array;","","        AjxTimezone._SHORT_NAMES[tzId] = AjxTimezone._generateShortName(rule.standard.offset);","        AjxTimezone._CLIENT2RULE[tzId] = rule;","","        array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","        array.push(rule);","    },","","    /**","     * Get dst transition rule","     * @method getRule","     * @static","     * @param tzId {Object} Timezone Id","     * @param tz {Object} Rule object to match against","     * @return {Object} The rule","     */","    getRule: function(tzId, tz) {","        var rule = AjxTimezone._CLIENT2RULE[tzId],","            names = [ \"standard\", \"daylight\" ],","            rules, i, j, found, name, onset, breakOuter, p;","        if (!rule && tz) {","            rules = tz.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","            for (i = 0; i < rules.length; i++) {","                rule = rules[i];","","                found = true;","                for (j = 0; j < names.length; j++) {","                    name = names[j];","                    onset = rule[name];","                    if (!onset) { continue; }","			","                    breakOuter = false;","","                    for (p in tz[name]) {","                        if (tz[name][p] !== onset[p]) {","                            found = false;","                            breakOuter = true;","                            break;","                        }","                    }","","                    if(breakOuter){","                        break;","                    }","                }","                if (found) {","                    return rule;","                }","            }","            return null;","        }","","        return rule;","    },","","    /**","     * Get offset in minutes from GMT","     * @method getOffset","     * @static","     * @param tzId {String} Timezone ID","     * @param date {Date} Date on which the offset is to be found (offset may differ by date due to DST)","     * @return {Number} Offset in minutes from GMT","     */","    getOffset: function(tzId, date) {","        var rule = AjxTimezone.getRule(tzId), year, standard, stdTrans, dstTrans, month, stdMonth, dstMonth, isDST;","        if (rule && rule.daylight) {","            year = date.getFullYear();","","            standard = rule.standard, daylight  = rule.daylight;","            stdTrans = AjxTimezone.getTransition(standard, year);","            dstTrans = AjxTimezone.getTransition(daylight, year);","","            month    = date.getMonth()+1, day = date.getDate();","            stdMonth = stdTrans[1], stdDay = stdTrans[2];","            dstMonth = dstTrans[1], dstDay = dstTrans[2];","","            // northern hemisphere","            isDST = false;","            if (dstMonth < stdMonth) {","                isDST = month > dstMonth && month < stdMonth;","                isDST = isDST || (month === dstMonth && day >= dstDay);","                isDST = isDST || (month === stdMonth && day <  stdDay);","            }","","            // sorthern hemisphere","            else {","                isDST = month < dstMonth || month > stdMonth;","                isDST = isDST || (month === dstMonth && day <  dstDay);","                isDST = isDST || (month === stdMonth && day >= stdDay);","            }","","            return isDST ? daylight.offset : standard.offset;","        }","        return rule ? rule.standard.offset : -(new Date().getTimezoneOffset());","    },","","    /**","     * Compare rules to sort by offset","     * @method _BY_OFFSET","     * @static","     * @private","     * @param arule {Object} Rule to compare","     * @param brule {Object} Rule to compare","     * @return {Number} Difference in offsets between the rules.","               If offsets are equal, returns 1 if timezone id of arule comes first alphabetically, -1 otherwise","     */","    _BY_OFFSET: function(arule, brule) {","        // sort by offset and then by name","        var delta = arule.standard.offset - brule.standard.offset,","            aname = arule.tzId,","            bname = brule.tzId;","        if (delta === 0) {","            if (aname < bname) { delta = -1; }","            else if (aname > bname) { delta = 1; }","        }","        return delta;","    },","","    _SHORT_NAMES: {},","    _CLIENT2RULE: {},","    /**","     * The data is specified using the server identifiers for historical","     * reasons. Perhaps in the future we'll use the client (i.e. Java)","     * identifiers on the server as well.","     */","    STANDARD_RULES: [],","    DAYLIGHT_RULES: [],","","    /**","     * Generate short name for a timezone like +0530 for IST","     * @method _generateShortName","     * @static","     * @private","     * @param offset {Number} Offset in minutes from GMT","     * @param [period=false] {Boolean} If true, a dot is inserted between hours and minutes","     * @return {String} Short name for timezone","     */","    _generateShortName: function(offset, period) {","        if (offset === 0) { return \"\"; }","        var sign = offset < 0 ? \"-\" : \"+\",","            stdOffset = Math.abs(offset),","            hours = Math.floor(stdOffset / 60),","            minutes = stdOffset % 60;","","        hours = hours < 10 ? '0' + hours : hours;","        minutes = minutes < 10 ? '0' + minutes : minutes;","        return [sign,hours,period?\".\":\"\",minutes].join(\"\");","    },","","    /**","     * Initialized timezone rules. Only for internal use.","     * @method _initTimezoneRules","     * @static","     * @private","     */","    _initTimezoneRules: function() {","        var rule, i, j, array;","","        for (i = 0; i < TimezoneData.TIMEZONE_RULES.length; i++) {","            rule = TimezoneData.TIMEZONE_RULES[i];","            array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","            array.push(rule);","        }","","        TimezoneData.TIMEZONE_RULES.sort(AjxTimezone._BY_OFFSET);","        for (j = 0; j < TimezoneData.TIMEZONE_RULES.length; j++) {","            rule = TimezoneData.TIMEZONE_RULES[j];","            AjxTimezone.addRule(rule);","        }","    },","","    /**","     * Get timezone ids matching raw offset","     * @method getCurrentTimezoneIds","     * @static","     * @param rawOffset {Number} Offset in seconds from GMT","     * @return {Array} timezone ids having the specified offset","     */","    getCurrentTimezoneIds: function(rawOffset) {","        rawOffset = rawOffset/60;	//Need offset in minutes","","        var result = [],","            today = new Date(),","            tzId, link;","","        for(tzId in AjxTimezone._CLIENT2RULE) {","            if(rawOffset === 0 || AjxTimezone.getOffset(tzId, today) === rawOffset) {","                result.push(tzId);","            }","        }","","        for(link in TimezoneLinks) {","            if(Y.Array.indexOf(result,TimezoneLinks[link]) !== -1) {","                result.push(link);","            }","        }","        return result;","    },","","    /**","     * Get the first timezone matching rawOffset","     * @method getTimezoneIdForOffset","     * @static","     * @param rawOffset {Number} offset in seconds from GMT","     * @return {String} tzId of timezone that matches the offset. Returns empty string if no matches found","     */","    getTimezoneIdForOffset: function(rawOffset) {","        rawOffset = rawOffset/60;	//Need offset in minutes","","        var etcGMTId = \"Etc/GMT\",","            today = new Date(),","            tzId;","        ","        if(rawOffset % 60 === 0) {","            if(rawOffset !== 0) {","                etcGMTId += (rawOffset > 0? \"-\": \"+\") + rawOffset/60;","            }","","            if(AjxTimezone._CLIENT2RULE[etcGMTId] !== undefined) {","                return etcGMTId;","            }","        }","	","        for(tzId in AjxTimezone._CLIENT2RULE) {","            if(AjxTimezone.getOffset(tzId, today) === rawOffset) {","                return tzId;","            }","        }","","        return \"\";","    },","","    /**","     * Check whether DST is active at specified date","     * @method isDST","     * @static","     * @param tzId {String} Timezone ID","     * @param date {Date}","     * @return {Number} 1 if DST is active, 0 if not, and -1 if specified timezone does not observe DST","     */","    isDST: function(tzId, date) {","        var rule = AjxTimezone.getRule(tzId),","            year,","            standard, daylight,","            stdTrans, dstTrans,","            month, day,","            stdMonth, stdDay,","            dstMonth, dstDay,","            isDSTActive;","            ","        if (rule && rule.daylight) {","            year = date.getFullYear();","","            standard = rule.standard, daylight  = rule.daylight;","            stdTrans = AjxTimezone.getTransition(standard, year);","            dstTrans = AjxTimezone.getTransition(daylight, year);","","            month    = date.getMonth()+1, day = date.getDate();","            stdMonth = stdTrans[1], stdDay = stdTrans[2];","            dstMonth = dstTrans[1], dstDay = dstTrans[2];","","            // northern hemisphere","            isDSTActive = false;","            if (dstMonth < stdMonth) {","                isDSTActive = month > dstMonth && month < stdMonth;","                isDSTActive = isDSTActive || (month === dstMonth && day >= dstDay);","                isDSTActive = isDSTActive || (month === stdMonth && day <  stdDay);","            }","","            // sorthern hemisphere","            else {","                isDSTActive = month < dstMonth || month > stdMonth;","                isDSTActive = isDSTActive || (month === dstMonth && day <  dstDay);","                isDSTActive = isDSTActive || (month === stdMonth && day >= stdDay);","            }","","            return isDSTActive? 1:0;","        }","        return -1;","    },","","    /**","     * Check whether tzId is a valid timezone","     * @method isValidTimezoneId","     * @static","     * @param tzId {String} Timezone ID","     * @return {Boolean} true if tzId is valid, false otherwise","     */","    isValidTimezoneId: function(tzId) {","        return (AjxTimezone._CLIENT2RULE[tzId] !== undefined || TimezoneLinks[tzId] !== undefined);","    }","});","","Y.mix(AjxTimezone.prototype, {","","    /**","     * Get short name of timezone","     * @method getShortName","     * @param tzId {String} Timezone ID","     * @return {String}","     */","    getShortName: function(tzId) {","        var shortName = this.localeData[tzId + \"_Z_short\"] || [\"GMT\",AjxTimezone._SHORT_NAMES[tzId]].join(\"\");","        return shortName;","    },","","    /**","     * Get medium length name of timezone","     * @method getMediumName","     * @param tzId {String} Timezone ID","     * @return {String}","     */","    getMediumName: function(tzId) {","        var mediumName = this.localeData[tzId + \"_Z_abbreviated\"] || ['(',this.getShortName(tzId),') ',tzId].join(\"\");","        return mediumName;","    },","","    /**","     * Get long name of timezone","     * @method getLongName","     * @param tzId {String} Timezone Id","     * @return {String}","     */","    getLongName: AjxTimezone.prototype.getMediumName","});","","AjxTimezone._initTimezoneRules();","","/**"," * Timezone performs operations on a given timezone string represented in Olson tz database"," * @class Timezone"," * @constructor"," * @param {String} tzId TimeZone ID as in Olson tz database"," */","Y.Date.Timezone = function(tzId) {","    var normalizedId = Timezone.getNormalizedTimezoneId(tzId);","    if(normalizedId === \"\") {","	Y.error(\"Could not find timezone: \" + tzId);","    }","    this.tzId = normalizedId;","","    this._ajxTimeZoneInstance = new AjxTimezone();","};","","Y.namespace(\"Date\");","Timezone = Y.Date.Timezone;","","Y.mix(Timezone, {","    /**","     * Get Day of Year(0-365) for the date passed","     * @method _getDOY","     * @private","     * @static","     * @param {Date} date","     * @return {Number} Day of Year","     */","    _getDOY: function (date) {","        var oneJan = new Date(date.getFullYear(),0,1);","        return Math.ceil((date - oneJan) / 86400000);","    },","","    /**","     * Get integer part of floating point argument","     * @method _floatToInt","     * @static","     * @private","     * @param floatNum {Number} A real number","     * @return {Number} Integer part of floatNum","     */","    _floatToInt: function (floatNum) {","        return (floatNum < 0) ? Math.ceil(floatNum) : Math.floor(floatNum);","    },","","    /**","     * Returns list of timezone Id's that have the same rawOffSet as passed in","     * @method getCurrentTimezoneIds","     * @static","     * @param {Number} rawOffset Raw offset (in seconds) from GMT.","     * @return {Array} array of timezone Id's that match rawOffset passed in to the API.","     */","    getCurrentTimezoneIds: function(rawOffset) {","        return AjxTimezone.getCurrentTimezoneIds(rawOffset);","    },","","    /**","     * Given a raw offset in seconds, get the tz database ID that reflects the given raw offset, or empty string if there is no such ID.","     * Where available, the function will return an ID starting with \"Etc/GMT\".","     * For offsets where no such ID exists but that are used by actual time zones, the ID of one of those time zones is returned.","     * Note that the offset shown in an \"Etc/GMT\" ID is opposite to the value of rawOffset","     * @method getTimezoneIdForOffset","     * @static","     * @param {Number} rawOffset Offset from GMT in seconds","     * @return {String} timezone id","     */","    getTimezoneIdForOffset: function(rawOffset) {","        return AjxTimezone.getTimezoneIdForOffset(rawOffset);","    },","","    /**","     * Given a wall time reference, convert it to UNIX time - seconds since Epoch","     * @method getUnixTimeFromWallTime","     * @static","     * @param {Object} walltime Walltime that needs conversion. Missing properties will be treat as 0.","     * @return {Number} UNIX time - time in seconds since Epoch","     */","    getUnixTimeFromWallTime: function(walltime) {","        /*","         * Initialize any missing properties.","         */","        if(!Y.Lang.isValue( walltime.year )) {","            walltime.year = new Date().getFullYear();	//Default to current year","        }","        if(!Y.Lang.isValue( walltime.mon )) {","            walltime.mon = 0;				//Default to January","        }","        if(!Y.Lang.isValue( walltime.mday )) {","            walltime.mday = 1;				//Default to first of month","        }","        if(!Y.Lang.isValue( walltime.hour )) {			//Default to 12 midnight","            walltime.hour = 0;","        }","        if(!Y.Lang.isValue( walltime.min )) {","            walltime.min = 0;","        }","        if(!Y.Lang.isValue( walltime.sec )) {","            walltime.sec = 0;","        }","        if(!Y.Lang.isValue( walltime.gmtoff )) {			//Default to UTC","            walltime.gmtoff = 0;","        }","","        var utcTime = Date.UTC(walltime.year, walltime.mon, walltime.mday, walltime.hour, walltime.min, walltime.sec);","        utcTime -= walltime.gmtoff*1000;","","        return Timezone._floatToInt(utcTime/1000);	//Unix time: count from midnight Jan 1 1970 UTC","    },","","    /**","     * Checks if the timestamp passed in is a valid timestamp for this timezone and offset.","     * @method isValidTimestamp","     * @static","     * @param {String} timeStamp Time value in UTC RFC3339 format - yyyy-mm-ddThh:mm:ssZ or yyyy-mm-ddThh:mm:ss+/-HH:MM","     * @param {Number} rawOffset An offset from UTC in seconds.","     * @return {Boolean} true if valid timestamp, false otherwise","     */","    isValidTimestamp: function(timeStamp, rawOffset) {","        var regex = /^(\\d\\d\\d\\d)\\-([0-1][0-9])\\-([0-3][0-9])([T ])([0-2][0-9]):([0-6][0-9]):([0-6][0-9])(Z|[+\\-][0-1][0-9]:[0-3][0-9])?$/,","            matches = (new RegExp(regex)).exec(timeStamp),","            year, month, day, hours, minutes, seconds, tZone,","            m31, maxDays,","            dateTimeSeparator, offset;","","        //No match","        if(matches === null) {","            return false;","        }","","        year = parseInt(matches[1], 10),","        month = parseInt(matches[2], 10),","        day = parseInt(matches[3], 10),","        dateTimeSeparator = matches[4],","        hours = parseInt(matches[5], 10),","        minutes = parseInt(matches[6], 10),","        seconds = parseInt(matches[7], 10),","        tZone = matches[8];","        //Month should be in 1-12","        if(month < 1 || month > 12) {","            return false;","        }","","        //Months with 31 days","        m31 = [1,3,5,7,8,10,12];","        maxDays = 30;","        if(Y.Array.indexOf(m31,month) !== -1) {","            maxDays = 31;","        } else if(month === 2) {","            if(year % 400 === 0) {","                maxDays = 29;","            } else if(year % 100 === 0) {","                maxDays = 28;","            } else if(year % 4 === 0) {","                maxDays = 29;","            } else {","                maxDays = 28;","            }","        }","","        //Day should be valid day for month","        if(day < 1 || day > maxDays) {","            return false;","        }","","        //Hours should be in 0-23","        if(hours < 0 || hours > 23) {","            return false;","        }","","        //Minutes and Seconds should in 0-59","        if(minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {","            return false;","        }","","        //Now verify timezone","        if(dateTimeSeparator === \" \" && tZone === undefined) {","            //SQL Format","            return true;","        } else if(dateTimeSeparator === \"T\" && tZone !== undefined) {","            //RFC3339 Format","            offset = 0;","            if(tZone !== \"Z\") {","                //Not UTC TimeZone","                offset = parseInt(tZone.substr(1,3), 10)*60 + parseInt(tZone.substr(4), 10);","                offset = offset*60;	//To seconds","","                offset = offset * (tZone.charAt(0) === \"+\" ? 1 : -1);","            }","            //Check offset in timeStamp with passed rawOffset","            if(offset === rawOffset) {","                return true;","            }","        }","","        //If reached here, wrong format","        return false;","    },","","    /**","     * Checks if tzId passed in is a valid Timezone id in tz database.","     * @method isValidTimezoneId","     * @static","     * @param {String} tzId timezoneId to be checked for validity","     * @return {Boolean} true if tzId is a valid timezone id in tz database.","               tzId could be a \"zone\" id or a \"link\" id to be a valid tz Id. False otherwise","     */","    isValidTimezoneId: function(tzId) {","        return AjxTimezone.isValidTimezoneId(tzId);","    },","","    /**","     * Returns the normalized version of the time zone ID, or empty string if tzId is not a valid time zone ID.","     * If tzId is a link Id, the standard name will be returned.","     * @method getNormalizedTimezoneId","     * @static","     * @param {String} tzId The timezone ID whose normalized form is requested.","     * @return {String} The normalized version of the timezone Id, or empty string if tzId is not a valid time zone Id.","     */","    getNormalizedTimezoneId: function(tzId) {","        if(!Timezone.isValidTimezoneId(tzId)) {","            return \"\";","        }","        var normalizedId,","            next = tzId;","","        do {","            normalizedId = next;","            next = TimezoneLinks[normalizedId];","        } while( next !== undefined );","","        return normalizedId;","    }","});","","Y.mix(Timezone.prototype, {","    /**","     * Parse RFC3339 date format and return the Date","     * Format: yyyy-mm-ddThh:mm:ssZ","     * @method _parseRFC3339","     * @private","     * @param {String} dString The date string to be parsed","     * @return {Date} The date represented by dString","     */","    _parseRFC3339: function(dString){","        var regexp = /(\\d+)(\\-)?(\\d+)(\\-)?(\\d+)(T)?(\\d+)(:)?(\\d+)(:)?(\\d+)(\\.\\d+)?(Z|([+\\-])(\\d+)(:)?(\\d+))/,","            result = new Date(),","            d = dString.match(regexp),","            offset = 0;","","        result.setUTCDate(1);","        result.setUTCFullYear(parseInt(d[1],10));","        result.setUTCMonth(parseInt(d[3],10) - 1);","        result.setUTCDate(parseInt(d[5],10));","        result.setUTCHours(parseInt(d[7],10));","        result.setUTCMinutes(parseInt(d[9],10));","        result.setUTCSeconds(parseInt(d[11],10));","        if (d[12]) {","            result.setUTCMilliseconds(parseFloat(d[12]) * 1000);","        } else {","            result.setUTCMilliseconds(0);","        }","        if (d[13] !== 'Z') {","            offset = (d[15] * 60) + parseInt(d[17],10);","            offset *= ((d[14] === '-') ? -1 : 1);","            result.setTime(result.getTime() - offset * 60 * 1000);","        }","        return result;","    },","","    /**","     * Parse SQL date format and return the Date","     * Format: yyyy-mm-dd hh:mm:ss","     * @method _parseSQLFormat","     * @private","     * @param {String} dString The date string to be parsed","     * @return {Date} The date represented by dString","     */","    _parseSQLFormat: function(dString) {","        var dateTime = dString.split(\" \"),","            date = dateTime[0].split(\"-\"),","            time = dateTime[1].split(\":\"),","            offset = AjxTimezone.getOffset(this.tzId, new Date(date[0], date[1] - 1, date[2]));","            ","        return new Date(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) - offset*60*1000);","    },","","    /**","     * Return a short name for the timezone","     * @method getShortName","     * @return {String} Short name","     */","    getShortName: function() {","        return this._ajxTimeZoneInstance.getShortName(this.tzId);","    },","","    /**","     * Return a medium length name for the timezone","     * @method getMediumName","     * @return {String} Medium length name","     */","    getMediumName: function() {","        return this._ajxTimeZoneInstance.getMediumName(this.tzId);","    },","","    /**","     * Return a long name for the timezone","     * @method getLongName","     * @return {String} Long name","     */","    getLongName: function() {","        return this._ajxTimeZoneInstance.getLongName(this.tzId);","    },","","    /**","     * Given a timevalue representation in RFC 3339 or SQL format, convert to UNIX time - seconds since Epoch ie., since 1970-01-01T00:00:00Z","     * @method convertToIncrementalUTC","     * @param {String} timeValue TimeValue representation in RFC 3339 or SQL format.","     * @return {Number} UNIX time - time in seconds since Epoch","     */","    convertToIncrementalUTC: function(timeValue) {","        if(Y.Array.indexOf(timeValue,\"T\") !== -1) {","            //RFC3339","            return this._parseRFC3339(timeValue).getTime() / 1000;","        } else {","            //SQL","            return this._parseSQLFormat(timeValue).getTime() / 1000;","        }","    },","","    /**","     * Given UNIX time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to RFC3339 format - \"yyyy-mm-ddThh:mm:ssZ\"","     * @method convertUTCToRFC3339Format","     * @param {Number} timeValue time value in seconds since Epoch.","     * @return {String} RFC3339 format timevalue - \"yyyy-mm-ddThh:mm:ssZ\"","     */","    convertUTCToRFC3339Format: function(timeValue) {","        var uTime = new Date(timeValue * 1000),","            offset = AjxTimezone.getOffset(this.tzId, uTime),","            offsetString = \"Z\",","            rfc3339, offsetSign;","","        if(offset !== 0) {","            offsetSign = (offset > 0 ? \"+\": \"-\");","            offsetString = offsetSign + Y.Number._zeroPad(Math.abs(Timezone._floatToInt(offset/60)), 2) + \":\" + Y.Number._zeroPad(offset % 60, 2);","        }","","        uTime.setTime(timeValue*1000 + offset*60*1000);","","        rfc3339 = Y.Number._zeroPad(uTime.getUTCFullYear(), 4) + \"-\"","                      + Y.Number._zeroPad((uTime.getUTCMonth() + 1), 2) + \"-\" + Y.Number._zeroPad(uTime.getUTCDate(), 2)","                      + \"T\" + Y.Number._zeroPad(uTime.getUTCHours(), 2) + \":\" + Y.Number._zeroPad(uTime.getUTCMinutes(), 2)","                      + \":\" + Y.Number._zeroPad(uTime.getUTCSeconds(), 2) + offsetString;","","        return rfc3339;","    },","","    /**","     * Given UNIX Time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to SQL Format - \"yyyy-mm-dd hh:mm:ss\"","     * @method convertUTCToSQLFormat","     * @param {Number} timeValue time value in seconds since Epoch.","     * @return {String} SQL Format timevalue - \"yyyy-mm-dd hh:mm:ss\"","     */","    convertUTCToSQLFormat: function(timeValue) {","        var uTime = new Date(timeValue * 1000),","            offset = AjxTimezone.getOffset(this.tzId, uTime),","            sqlDate;","            ","        uTime.setTime(timeValue*1000 + offset*60*1000);","","        sqlDate = Y.Number._zeroPad(uTime.getUTCFullYear(), 4) + \"-\" + Y.Number._zeroPad((uTime.getUTCMonth() + 1), 2)","                      + \"-\" + Y.Number._zeroPad(uTime.getUTCDate(), 2) + \" \" + Y.Number._zeroPad(uTime.getUTCHours(), 2)","                      + \":\" + Y.Number._zeroPad(uTime.getUTCMinutes(), 2) + \":\" + Y.Number._zeroPad(uTime.getUTCSeconds(), 2);","","        return sqlDate;","    },","","    /**","     * Gets the offset of this timezone in seconds from UTC","     * @method getRawOffset","     * @return {Number} offset of this timezone in seconds from UTC","     */","    getRawOffset: function() {","        return AjxTimezone.getOffset(this.tzId, new Date()) * 60;","    },","","    /**","     * Given a unix time, convert it to wall time for this timezone.","     * @method getWallTimeFromUnixTime","     * @param {Number} timeValue value in seconds from Epoch.","     * @return {Object} an object with the properties: sec, min, hour, mday, mon, year, wday, yday, isdst, gmtoff, zone.","           All of these are integers except for zone, which is a string. isdst is 1 if DST is active, and 0 if DST is inactive.","     */","    getWallTimeFromUnixTime: function(timeValue) {","        var offset = AjxTimezone.getOffset(this.tzId, new Date(timeValue*1000)) * 60,","            localTimeValue = timeValue + offset,","            date = new Date(localTimeValue*1000),","            walltime = {","                sec: date.getUTCSeconds(),","                min: date.getUTCMinutes(),","                hour: date.getUTCHours(),","                mday: date.getUTCDate(),","                mon: date.getUTCMonth(),","                year: date.getUTCFullYear(),","                wday: date.getUTCDay(),","                yday: Timezone._getDOY(date),","                isdst: AjxTimezone.isDST(this.tzId, new Date(timeValue)),","                gmtoff: offset,","                zone: this.tzId","            };","","        return walltime;","    }","});","/**"," * This module provides absolute/relative date and time formatting, as well as duration formatting"," * Applications can choose date, time, and time zone components separately."," * For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported."," *"," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," *"," * Absolute formats use the default calendar specified in CLDR for each locale."," * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags;"," * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory."," *"," * Relative time formats only support times in the past. It can represent times like \"1 hour 5 minutes ago\""," *"," * @module datatype-date-advanced-format"," * @requires datatype-date-timezone, datatype-date-format, datatype-number-advanced-format"," */","","ShortNames = {","        \"weekdayMonShort\":\"M\",","        \"weekdayTueShort\":\"T\",","        \"weekdayWedShort\":\"W\",","        \"weekdayThuShort\":\"T\",","        \"weekdayFriShort\":\"F\",","        \"weekdaySatShort\":\"S\",","        \"weekdaySunShort\":\"S\",","        \"monthJanShort\":\"J\",","        \"monthFebShort\":\"F\",","        \"monthMarShort\":\"M\",","        \"monthAprShort\":\"A\",","        \"monthMayShort\":\"M\",","        \"monthJunShort\":\"J\",","        \"monthJulShort\":\"J\",","        \"monthAugShort\":\"A\",","        \"monthSepShort\":\"S\",","        \"monthOctShort\":\"O\",","        \"monthNovShort\":\"N\",","        \"monthDecShort\":\"D\"","};","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified pattern."," * The patterns are defined the same as the SimpleDateFormat class in the Java libraries."," *"," * Note:"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended"," * pattern found in the Common Locale Data Repository (CLDR) found at:"," * http://www.unicode.org/cldr/."," *"," * @class __zDateFormat"," * @extends Number.__BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern === null) {","        return;","    }","    var head, tail, segment, i, c, count, field;","    for (i = 0; i < pattern.length; i++) {","        // literal","        c = pattern.charAt(i);","        if (c === \"'\") {","            head = i + 1;","            for (i++ ; i < pattern.length; i++) {","                c = pattern.charAt(i);","                if (c === \"'\") {","                    if (i + 1 < pattern.length && pattern.charAt(i + 1) === \"'\") {","                        pattern = pattern.substr(0, i) + pattern.substr(i + 1);","                    }","                    else {","                        break;","                    }","                }","            }","            if (i === pattern.length) {","		Y.error(\"unterminated string literal\");","            }","            tail = i;","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            continue;","        }","","        // non-meta chars","        head = i;","        while(i < pattern.length) {","            c = pattern.charAt(i);","            if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === \"'\") {","                break;","            }","            i++;","        }","        tail = i;","        if (head !== tail) {","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            i--;","            continue;","        }","		","        // meta char","        head = i;","        while(++i < pattern.length) {","            if (pattern.charAt(i) !== c) {","                break;","            }","        }","        tail = i--;","        count = tail - head;","        field = pattern.substr(head, count);","        segment = null;","        switch (c) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        if (segment !== null) {","            segment._index = this._segments.length;","            this._segments.push(segment);","        }","    }","};","","DateFormat = Y.Date.__zDateFormat;","Y.extend(DateFormat, Format);","","// Constants","","Y.mix(DateFormat, {","	SHORT: 0,","	MEDIUM: 1,","	LONG: 2,","	DEFAULT: 1,","	_META_CHARS: \"GyMwWDdFEaHkKhmsSzZ\"","});","","/**"," * Format the date"," * @method format"," * @param object {Date} The date to be formatted"," * @param [relative=false] {Boolean} Whether relative dates should be used."," * @return {String} Formatted result"," */","DateFormat.prototype.format = function(object, relative) {","    var useRelative = false,","        s = [],","        datePattern = false,","        i;","","    if(relative !== null && relative !== \"\") {","        useRelative = true;","    }","","    for (i = 0; i < this._segments.length; i++) {","        //Mark datePattern sections in case of relative dates","        if(this._segments[i].toString().indexOf(\"text: \\\"<datePattern>\\\"\") === 0) {","            if(useRelative) {","                s.push(relative);","            }","            datePattern = true;","            continue;","        }","        if(this._segments[i].toString().indexOf(\"text: \\\"</datePattern>\\\"\") === 0) {","            datePattern = false;","            continue;","        }","        if(!datePattern || !useRelative) {","            s.push(this._segments[i].format(object));","        }","    }","    return s.join(\"\");","};","","//","// Date segment class","//","","/**"," * Date Segment in the pattern"," * @class DateSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.DateSegment = function(format, s) {","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","/**"," * Era Segment in the pattern"," * @class EraSegment"," * @for Date.__DateFormat"," * @namespace Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.EraSegment = function(format, s) {","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","/**"," * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD"," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.EraSegment.prototype.format = function(/*date*/) {","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","/**"," * Year Segment in the pattern"," * @class YearSegment"," * @namespace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.YearSegment = function(format, s) {","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.YearSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateYear: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the year segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var year = String(date.getFullYear());","        return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);","    }","}, true);","","//","// Date month segment class","//","","/**"," * Month Segment in the pattern"," * @class MonthSegment"," * @namepspace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.MonthSegment = function(format, s) {","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.MonthSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateMonth: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.MonthSegment.MONTHS = {};","        DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,","            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,","            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,","            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium","        ];","        DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,","            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,","            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,","            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong","        ];","    },","","    /**","     * Format date and get the month segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var month = date.getMonth();","        switch (this._s.length) {","            case 1:","                return String(month + 1);","            case 2:","                return Y.Number._zeroPad(month + 1, 2);","            case 3:","                return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","            case 5:","                return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","        }","        return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","    }","}, true);","","//","// Date week segment class","//","","/**"," * Week Segment in the pattern"," * @class WeekSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekSegment = function(format, s) {","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","/**"," * Format date and get the week segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear(),","        month = date.getMonth(),","        day = date.getDate(),","	ofYear = /w/.test(this._s),","        date2 = new Date(year, ofYear ? 0 : month, 1),","        week = 0;","    while (true) {","        week++;","        if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {","            break;","        }","        date2.setDate(date2.getDate() + 7);","    }","","    return Y.Number._zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","/**"," * Day Segment in the pattern"," * @class DaySegment"," * @namespace Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.DaySegment = function(format, s) {","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","/**"," * Format date and get the day segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth(),","        day = date.getDate(),","        year = date.getYear(),","        date2;","","    if (/D/.test(this._s) && month > 0) {","        do {","            // set date to first day of month and then go back one day","            date2 = new Date(year, month, 1);","            date2.setDate(0);","			","            day += date2.getDate();","            month--;","        } while (month > 0);","    }","    return Y.Number._zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","/**"," * Weekday Segment in the pattern"," * @class WeekdaySegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekdaySegment = function(format, s) {","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","Y.mix(DateFormat.WeekdaySegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateDay: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.WeekdaySegment.WEEKDAYS = {};","        // NOTE: The short names aren't available in Java so we have to define them.","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","            ShortNames.weekdaySatShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,","            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,","            Formats.weekdaySatMedium","        ];","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,","            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,","            Formats.weekdaySatLong","        ];","    },","","    /**","     * Format date and get the weekday segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var weekday = date.getDay(),","            style;","        if (/E/.test(this._s)) {","            switch (this._s.length) {","                case 4:","                    style = DateFormat.LONG;","                    break;","                case 5:","                    style = DateFormat.SHORT;","                    break;","                default:","                    style = DateFormat.MEDIUM;","            }","            return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","        }","        return Y.Number._zeroPad(weekday, this._s.length);","    }","}, true);","","//","// Time segment class","//","","/**"," * Time Segment in the pattern"," * @class TimeSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimeSegment = function(format, s) {","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Y.Number.__BaseFormat.Segment);","","//","// Time hour segment class","//","","/**"," * Hour Segment in the pattern"," * @class HourSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.HourSegment = function(format, s) {","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.HourSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeHour: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the hour segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        if (hours > 12 && /[hK]/.test(this._s)) {","            hours -= 12;","        }","        else if (hours === 0 && /[h]/.test(this._s)) {","            hours = 12;","        }","        /***","            // NOTE: This is commented out to match the Java formatter output","            //       but from the comments for these meta-chars, it doesn't","            //       seem right.","            if (/[Hk]/.test(this._s)) {","                hours--;","            }","        /***/","        return Y.Number._zeroPad(hours, this._s.length);","    }","}, true);","","//","// Time minute segment class","//","","/**"," * Minute Segment in the pattern"," * @class MinuteSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.MinuteSegment = function(format, s) {","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.MinuteSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeMinute: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the minute segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var minutes = date.getMinutes();","        return Y.Number._zeroPad(minutes, this._s.length);","    }","}, true);","","//","// Time second segment class","//","","/**"," * Second Segment in the pattern"," * @class SecondSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.SecondSegment = function(format, s) {","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","/**"," * Format date and get the second segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return Y.Number._zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","/**"," * AM/PM Segment in the pattern"," * @class AmPmSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.AmPmSegment = function(format, s) {","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.AmPmSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeAmPm: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the AM/PM segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","    }","}, true);","","//","// Time timezone segment class","//","","/**"," * TimeZone Segment in the pattern"," * @class TimezoneSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimezoneSegment = function(format, s) {","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.TimezoneSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeTimezone: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the timezone segment.","     * @method format","     * //param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(/*date*/) {","        var timeZone = this.getFormat().timeZone;","        if (/Z/.test(this._s)) {","            return timeZone.getShortName();","        }","        return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();","    }","}, true);","    ","//","// Non-Gregorian Calendars","//","","/*"," * Buddhist Calendar. This is normally used only for Thai locales (th)."," * @class __BuddhistDateFormat"," * @namespace Date"," * @extends __zDateFormat"," * @constructor"," * @private"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments, i;","    for(i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","};","","BuddhistDateFormat = Y.Date.__BuddhistDateFormat;","Y.extend(BuddhistDateFormat, DateFormat);","    ","/**"," * YearSegment class for Buddhist Calender"," * @class YearSegment"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.YearSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.YearSegment}"," */","BuddhistDateFormat.YearSegment = function(segment) {","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","/**"," * Format date and get the year segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.YearSegment.prototype.format = function(date) {","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);","};","    ","/**"," * EraSegment class for Buddhist Calender"," * @class EraSegment"," * @for Date.__BuddhistDateFormat"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.EraSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.EraSegment}"," */","BuddhistDateFormat.EraSegment = function(segment) {","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","/**"," * Format date and get the era segment."," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {","    return \"BE\";    //Only Buddhist Era supported for now","};","","/**"," * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU"," * @class __YDateFormat"," * namespace Date"," * @private"," * @constructor"," * @param {String} [timeZone='Etc/GMT'] TZ database ID for the time zone that should be used."," * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS."," * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS."," * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS."," */","Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone === null) {","        timeZone = \"Etc/GMT\";","    }","","    this._Formats = Y.Intl.get(\"datatype-date-advanced-format\");","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","	Y.error(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat || 0;","    this._timeFormat = timeFormat || 0;","    this._timeZoneFormat = timeZoneFormat || 0;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(\"datatype-date-advanced-format\");","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }","};","","YDateFormat = Y.Date.__YDateFormat;","","Y.mix(Y.Date, {","    /**","     * Date Format Style values to use during format/parse","     * @property DATE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","","    /**","     * Time Format Style values to use during format/parse","     * @property TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","","    /**","     * Timezone Format Style values to use during format/parse","     * @property TIMEZONE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    }","});","","Y.mix(YDateFormat.prototype, {","    /**","     * Generate date pattern for selected format. For internal use only.","     * @method _generateDatePattern","     * @for Date.__YDateFormat","     * @private","     * @return {String} Date pattern","     */","    _generateDatePattern: function() {","        var format = this._dateFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.DATE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        /*jshint bitwise: false*/","        if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","            this._relative = true;","            format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","        }","        /*jshint bitwise: true*/","        switch(format) {","            //Use relative only for formats with day component","            case Y.Date.DATE_FORMATS.NONE:","                this._relative = false;","                return \"\";","            case Y.Date.DATE_FORMATS.WYMD_LONG:","                return this._Formats.WYMD_long;","            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","                return this._Formats.WYMD_abbreviated;","            case Y.Date.DATE_FORMATS.WYMD_SHORT:","                return this._Formats.WYMD_short;","            case Y.Date.DATE_FORMATS.WMD_LONG:","                return this._Formats.WMD_long;","            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","                return this._Formats.WMD_abbreviated;","            case Y.Date.DATE_FORMATS.WMD_SHORT:","                return this._Formats.WMD_short;","            case Y.Date.DATE_FORMATS.YMD_LONG:","                return this._Formats.YMD_long;","            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","                return this._Formats.YMD_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_SHORT:","                return this._Formats.YMD_short;","            case Y.Date.DATE_FORMATS.YM_LONG:","                this._relative = false;","                return this._Formats.YM_long;","            case Y.Date.DATE_FORMATS.MD_LONG:","                return this._Formats.MD_long;","            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","                return this._Formats.MD_abbreviated;","            case Y.Date.DATE_FORMATS.MD_SHORT:","                return this._Formats.MD_short;","            case Y.Date.DATE_FORMATS.W_LONG:","                this._relative = false;","                return this._Formats.W_long;","            case Y.Date.DATE_FORMATS.W_ABBREVIATED:","                this._relative = false;","                return this._Formats.W_abbreviated;","            case Y.Date.DATE_FORMATS.M_LONG:","                this._relative = false;","                return this._Formats.M_long;","            case Y.Date.DATE_FORMATS.M_ABBREVIATED:","                this._relative = false;","                return this._Formats.M_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_FULL:","                return this._Formats.YMD_full;","            default:","                Y.error(\"Date format given does not exist\");	//Error no such pattern.","        }","    },","        ","    /**","     * Generate time pattern for selected format. For internal use only","     * @method _generateTimePattern","     * @private","     * @return {String} Time pattern","     */","    _generateTimePattern: function() {","        var format = this._timeFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIME_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIME_FORMATS.NONE:","                return \"\";","            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","                return this._Formats.HM_abbreviated;","            case Y.Date.TIME_FORMATS.HM_SHORT:","                return this._Formats.HM_short;","            case Y.Date.TIME_FORMATS.H_ABBREVIATED:","                return this._Formats.H_abbreviated;","            default:","                Y.error(\"Time format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate time-zone pattern for selected format. For internal use only.","     * @method _generateTimeZonePattern","     * @private","     * @return {String} Time-Zone pattern","     */","    _generateTimeZonePattern: function() {","        var format = this._timeZoneFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIMEZONE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIMEZONE_FORMATS.NONE:","                return \"\";","            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","                return \"z\";","            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","                return \"Z\";","            default:","                Y.error(\"Time Zone format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate pattern for selected date, time and time-zone formats. For internal use only","     * @method _generatePattern","     * @private","     * @return {String} Combined pattern for date, time and time-zone","     */","    _generatePattern: function() {","        var datePattern = this._generateDatePattern(),","            timePattern = this._generateTimePattern(),","            timeZonePattern = this._generateTimeZonePattern(),","            pattern = \"\";","","        //Combine patterns. Mark date pattern part, to use with relative dates.","        if(datePattern !== \"\") {","            datePattern = \"'<datePattern>'\" + datePattern + \"'</datePattern>'\";","        }","        ","        if(timePattern !== \"\" && timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimeTimezoneCombination;","        } else if (timePattern !== \"\") {","            pattern = this._Formats.DateTimeCombination;","        } else if(timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimezoneCombination;","        } else if(datePattern !== \"\"){","            //Just date","            pattern = \"{1}\";","        }","        ","        pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","        //Remove unnecessary whitespaces","        pattern = Y.Lang.trim(pattern.replace(/\\s\\s+/g, \" \"));","","        return pattern;","    },","","    /**","     * Formats a date","     * @method format","     * @param {Date} date The date to be formatted.","     * @return {String} The formatted string","     */","    format: function(date) {","        if(date === null || !Y.Lang.isDate(date)) {","            Y.error(\"format called without a date.\");","        }","        ","        var offset = this._timeZoneInstance.getRawOffset() * 1000,","            relativeDate = null,","            today = new Date(),","            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),","            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","","        date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","        ","        if(this._relative) {","            if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {","                relativeDate = this._Formats.today;","            }","","            if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {","                relativeDate = this._Formats.tomorrow;","            }","","            if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {","                relativeDate = this._Formats.yesterday;","            }","        }","        return this._dateFormatInstance.format(date, relativeDate);","    }","}, true);","/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," */","","/**"," * Class to handle relative time formatting"," * @class __YRelativeTimeFormat"," * @namespace Date"," * @private"," * @constructor"," * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS"," */","Y.Date.__YRelativeTimeFormat = function(style) {","    if(style === null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    } else if(Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","        ","    this.patterns = Y.Intl.get(\"datatype-date-advanced-format\");","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            Y.error(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","};","","YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;","","Y.mix(Y.Date, {","    /**","     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.","     * @property","     * @type Number|function","     * @static","     */","    currentDate: function() { return new Date(); },","","    /**","     * Format Style values to use during format/parse","     * @property RELATIVE_TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","	","/**"," * Formats a time value."," * @method format"," * @for Date.__YRelativeTimeFormat"," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.","          It must be greater than or equal to timeValue"," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo === null) {","        relativeTo = (new Date()).getTime()/1000;","        if(timeValue > relativeTo) {","            Y.error(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        Y.error(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000),","        result = [],","        numUnits = this.numUnits,","        value = date.getUTCFullYear() - 1970,	//Need zero-based index","        text, pattern, i;","        ","    if(value > 0) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.years : this.patterns.year);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMonth();","    if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.months : this.patterns.month);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCDate()-1;			//Need zero-based index","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.days : this.patterns.day);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCHours();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.hours : this.patterns.hour);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMinutes();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes : this.patterns.minute);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCSeconds();","    if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds : this.patterns.second);","            result.push(text);","        }","        numUnits--;","    }","","    pattern = (result.length === 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(i=0; i<result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", result[i]);","    }","    for(i=result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = Y.Lang.trim(pattern.replace(/\\s+/g, \" \"));","        ","    return pattern;","};","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages."," */","","Y.mix(Y.Number, {","    /**","     * Strip decimal part of argument and return the integer part","     * @method _stripDecimals","     * @static","     * @private","     * @for Number","     * @param floatNum A real number","     * @return Integer part of floatNum","     */","    _stripDecimals: function (floatNum) {","        return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","    }","});","","/**"," * YDurationFormat class formats time in a language independent manner."," * @class __YDurationFormat"," * @namespace Date"," * @private"," * @constructor"," * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS"," */","Y.Date.__YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(\"datatype-date-advanced-format\");","};","","YDurationFormat = Y.Date.__YDurationFormat;","","Y.mix(Y.Date, {","    /**","     * Format Style values to use during format/parse of Duration values","     * @property DURATION_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","","Y.mix(YDurationFormat, {","    /**","     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds","     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short","     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used","     * @method _getDuration_XML","     * @static","     * @private","     * @for Date.__YDurationFormat","     * @param {String} xmlDuration XML Duration String.","     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,","     *      where nY represents the number of years, nM the number of months, nD the number of days,","     *      'T' is the date/time separator,","     *      nH the number of hours, nM the number of minutes and nS the number of seconds.","     *      The number of seconds can include decimal digits to arbitrary precision.","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_XML: function (xmlDuration) {","        var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/),","            matches = xmlDuration.match(regex);","        ","        if(matches === null) {","            Y.error(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","        }","        ","        return {","            hours: parseInt(matches[4] || -1, 10),","            minutes: parseInt(matches[5] || -1, 10),","            seconds: parseFloat(matches[6] || -1, 10)","        };","    },","    ","    /**","     * Get duration from time in seconds.","     * The value should be integer value in seconds, and should not be negative.","     * @method _getDuration_Seconds","     * @static","     * @private","     * @param {Number} timeValueInSeconds Duration in seconds","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_Seconds: function (timeValueInSeconds) {","        var duration = {};","        if(timeValueInSeconds < 0) {","            Y.error(\"TimeValue cannot be negative\");","        }","                ","        duration.hours = Y.Number._stripDecimals(timeValueInSeconds / 3600);","                ","        timeValueInSeconds %= 3600;","        duration.minutes = Y.Number._stripDecimals(timeValueInSeconds / 60);","                ","        timeValueInSeconds %= 60;","        duration.seconds = timeValueInSeconds;","        ","        return duration;","    }","});","    ","/**"," * Formats the given value into a duration format string."," * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS."," * Please note that year, month and day fields are ignored in this version."," * For future compatibility, please do not pass Year/Month/Day in the parameter."," *"," * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,"," * but are treated as 0 in HMS_short format style."," *"," * @method"," * @private"," * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),","          XML duration format (String), or an object with hours, minutes and seconds"," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function(oDuration) {","    if(Y.Lang.isNumber(oDuration)) {","        oDuration = YDurationFormat._getDuration_Seconds(oDuration);","    } else if(Y.Lang.isString(oDuration)) {","        oDuration = YDurationFormat._getDuration_XML(oDuration);","    }","    ","    var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,","        result = {","            hours: \"\",","            minutes: \"\",","            seconds: \"\"","        },","        resultPattern = \"\";","","    if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }","    if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }","    if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }","   ","    //Test minutes and seconds for invalid values","    if(oDuration.minutes > 59 || oDuration.seconds > 59) {","        Y.error(\"Minutes and Seconds should be less than 60\");","    }","    ","    if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {","        resultPattern = this.patterns.HMS_long;","        if(oDuration.hours >= 0) {","            result.hours = Y.Number.format(oDuration.hours) + \" \" + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);","        }","","        if(oDuration.minutes >= 0) {","            result.minutes = oDuration.minutes + \" \" + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);","        }","","        if(oDuration.seconds >= 0) {","            result.seconds = oDuration.seconds + \" \" + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        resultPattern = this.patterns.HMS_short;","        result = {","             hours: Y.Number.format(oDuration.hours),","             minutes: Y.Number._zeroPad(oDuration.minutes, 2),","             seconds: Y.Number._zeroPad(oDuration.seconds, 2)","        };","    }","        ","    resultPattern = resultPattern.replace(\"{0}\", result.hours);","    resultPattern = resultPattern.replace(\"{1}\", result.minutes);","    resultPattern = resultPattern.replace(\"{2}\", result.seconds);","       ","    //Remove unnecessary whitespaces","    resultPattern = Y.Lang.trim(resultPattern.replace(/\\s\\s+/g, \" \"));","       ","    return resultPattern;","};","","Y.Date.oldFormat = Y.Date.format;","","Y.mix(Y.Date, {","    /**","     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.","     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate","     * Configuration object can have 4 optional parameters:","     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.","     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.","     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.","     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.","     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.","                           If this parameter is used, the other three will be ignored.","     * @for Date","     * @method format","     * @param oDate {Date} Date","     * @param [oConfig] {Object} Object literal of configuration values.","     * @return {String} string representation of the date","     * @example","            var date = new Date();","            Y.Date.format(date, { timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\", timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\" });","            Y.Date.format(date, { relativeTimeFormat: \"ONE_OR_TWO_UNITS_LONG\" });","            Y.Date.format(date, { format: \"%Y-%m-%d\"});","     */","    format: function(oDate, oConfig) {","        oConfig = oConfig || {};","        if(oConfig.format && Y.Lang.isString(oConfig.format)) {","            return Y.Date.oldFormat(oDate, oConfig);","        }","    ","        if(!Y.Lang.isDate(oDate)) {","            return Y.Lang.isValue(oDate) ? oDate : \"\";","        }","                ","        var formatter, relativeTo;","        if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {","            formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","            return formatter.format(oDate);","        }","    ","        relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","        if(oConfig.relativeTimeFormat) {","            formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","            return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","        }","","        Y.error(\"Unrecognized format options.\");","    },","","    /**","     * Returns a string representation of the duration","     * @method format","     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds","     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.","                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS","     * @return {String} string representation of the duration","     * @example","                Y.Date.formatDuration(3601, { style: \"HMS_LONG\" });","                Y.Date.formatDuration(\"PT11H22M33S\", { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: \"HMS_LONG\" });","     */","    formatDuration: function(oDuration, oConfig) {","        oConfig = oConfig || {};","        return new YDurationFormat(oConfig.style).format(oDuration);","    }","}, true);","/**"," * Formatter base class"," * @class MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgBaseFormatter = function(values) {","    this.values = values;","};","","Formatter = Y.Intl.MsgBaseFormatter;","","Y.mix(Formatter.prototype, {","    /**","     * Get value of key","     * @method getValue","     * @param key {String|Number} Key/index of value in the object/array 'values'","     * @return Value from the data in 'values'","     */","    getValue: function(key) {","        if(Y.Lang.isArray(this.values)) {","            key = parseInt(key, 10);","        }","        return this.values[key];","    },","","    /**","     * Get value of params.key","     * The value found will be set to params.value","     * @method getParams","     * @param params {Object} Object containing key as in { key: \"KEY\" }","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params) {","        if(!params || !params.key) {","            return false;","        }","","        var value = this.getValue(params.key);","	","        if(value !== undefined) {","            params.value = value;","            return true;","        }","","        return false;","    },","","    /**","     * Format string. Will be overridden in descendants","     * @method format","     */","    format: function(/*str, config*/) {","        Y.error('Not implemented');	//Must override in descendants","    }","});","","//For date and time formatters","Y.mix(Formatter, {","    /**","     * Create an instance of the formatter","     * @method createInstance","     * @static","     * //param values {Array|Object} The data to be processed and inserted.","     */","    createInstance: function(/*values*/) {","        //return new Formatter(values);","        Y.error('Not implemented');	//Must override in descendants","    },","","    /**","     * Get current timezone. Used for time format","     * @method getCurrentTimeZone","     * @return {Y.Date.Timezone}","     */","    getCurrentTimeZone: function() {","        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;","        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);","    }","});","/**"," * String formatter"," * @class StringFormatter"," * @namespace Intl"," * @extends MsgBaseFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.StringFormatter = function(values) {","    StringFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*}\";","};","","StringFormatter = Y.Intl.StringFormatter;","Y.extend(StringFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","StringFormatter.createInstance = function(values) {","    return new StringFormatter(values);","};","","Y.mix(StringFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches && matches[1]) {","            params.key = matches[1];","            if(Formatter.prototype.getParams.call(this, params)) {","                return true;","            }","        }","	","        return false;","    },","","    /**","     * Format all instances in str that can be handled by StringFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                str = str.replace(matches[0], params.value);","            }","","        }","","        return str;","    }","}, true);/**"," * Date formatter"," * @class DateFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.DateFormatter = function(values) {","    DateFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],","        \"medium\": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],","        \"long\":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],","        \"full\":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*date\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","DateFormatter = Y.Intl.DateFormatter;","Y.extend(DateFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","DateFormatter.createInstance = function(values) {","    return new DateFormatter(values);","};","","Y.mix(DateFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"medium\";","        }			//If no style, default to medium","","        if(!this.styles[params.style]) {","            return false;","        }	//Invalid style","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by DateFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting","     * @return {String} Formatted result","     */","    format: function(str, config) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, style, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                style = this.styles[params.style];","                result = Y.Date.format(new Date(params.value), {","                    timezone: config.timezone || Formatter.getCurrentTimeZone(),","                    dateFormat: style[0],","                    timeFormat: style[1],","                    timezoneFormat: style[2]","                });","                str = str.replace(matches[0], result);","            }","","        }","","        return str;","    }","}, true);/**"," * Time formatter"," * @class TimeFormatter"," * @extends DateFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.TimeFormatter = function(values) {","    TimeFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\": [ 0, Y.Date.TIME_FORMATS.HM_SHORT, Y.Date.TIMEZONE_FORMATS.NONE ],","        \"medium\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.NONE ],","        \"long\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_SHORT ],","        \"full\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*time\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","TimeFormatter = Y.Intl.TimeFormatter;","Y.extend(TimeFormatter, DateFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","TimeFormatter.createInstance = function(values) {","    return new TimeFormatter(values);","};","/**"," * Number formatter"," * @class NumberFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.NumberFormatter = function(values) {","    NumberFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"integer\": Y.Number.STYLES.NUMBER_STYLE,","        \"percent\": Y.Number.STYLES.PERCENT_STYLE,","        \"currency\": Y.Number.STYLES.CURRENCY_STYLE","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*number\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","NumberFormatter = Y.Intl.NumberFormatter;","Y.extend(NumberFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","NumberFormatter.createInstance = function(values) {","    return new NumberFormatter(values);","};","","Y.mix(NumberFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"integer\";	//If no style, default to medium","            params.showDecimal = true;	//Show decimal parts too","        }","","        if(!this.styles[params.style]) {	//Invalid style","            return false;","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by NumberFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, config;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                config = {","                    style: this.styles[params.style]","                };","                if(params.style === \"integer\" && !params.showDecimal) {","                    config.parseIntegerOnly = true;","                }","                str = str.replace(matches[0], Y.Number.format(params.value, config));","            }","        }","","        return str;","    }","}, true);/**"," * Select formatter. Select ouput based on value of key"," * @class SelectFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.SelectFormatter = function(values) {","    SelectFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*select\\\\s*,\\\\s*\";","};","","SelectFormatter = Y.Intl.SelectFormatter;","Y.extend(SelectFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","SelectFormatter.createInstance = function(values) {","    return new SelectFormatter(values);","};","","Y.mix(SelectFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param str {String} Pattern string","     * @param start {Number} Position in str to start parsing from","     * @return {Object} Object in the form:","             {","               options: [","                     { key: KEY1, value: VALUE1 },","                     { key: KEY2, value: VALUE2 },","                     ... ],","               next: i  //Index of next character in str that can be parsed","             }","     */","    parseOptions: function(str, start) {","        var options = {},","            key = \"\", value = \"\", current = \"\",","            i, ch;","        for(i=start; i<str.length; i++) {","            ch = str.charAt(i);","            if (ch === '\\\\') {","                current += ch + str.charAt(i+1);","                i++;","            } else if (ch === '}') {","                if(current === \"\") {","                    i++;","                    break;","                }","                value = current;","                options[key.trim()] = value;","                current = key = value = \"\";","            } else if (ch === '{') {","                key = current;","                current = \"\";","            } else {","                current += ch;","            }","        }","","        if(current !== \"\") {","            return null;","        }","","        return {","            options: options,","            next: i","        };","    },","","    /**","     * Select output depending on params.value from options","     * @method select","     * @param options {Array} Array of key,value pairs","     * @param params {Object} Object containing value","     * @return {String} selected result","     */","    select: function(options, params) {","        for ( var key in options ) {","            if( key === \"other\" ) {","                continue;	//Will use this only if everything else fails","            }","","            if( key === params.value ) {","                return options[key];","            }","        }","","        return options.other;","    },","","    /**","     * Format all instances in str that can be handled by SelectFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, options, result, start;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                options = this.parseOptions(str, regex.lastIndex);","                if(!options) {","                    continue;","                }","","                regex.lastIndex = options.next;","                options = options.options;","","                result = this.select(options, params);","                if(result) {","                    start = str.indexOf(matches[0]);","                    str = str.slice(0, start) + result + str.slice(regex.lastIndex);","                }","            }","        }","","        return str;","    }","}, true);/**"," * Plural formatter. Select ouput based on whether value of key is singular/plural"," * @class PluralFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.PluralFormatter = function(values) {","    PluralFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*plural\\\\s*,\\\\s*\";","};","","PluralFormatter = Y.Intl.PluralFormatter;","Y.extend(PluralFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","PluralFormatter.createInstance = function(values) {","    return new PluralFormatter(values);","};","","/**"," * Select output depending on params.value from options"," * @method select"," * @param options {Object} Object containing results for singular/plural"," * @param params {Object} Object containing value"," * @return {String} selected result"," */","PluralFormatter.prototype.select = function(options, params) {","    var result = options.other;","    if(params.value === 0 && options.zero) {","        result = options.zero;","    }","    if(params.value === 1 && options.one) {","        result = options.one;","    }","    if(params.value === 2 && options.two) {","        result = options.two;","    }","","    result = result.replace(\"#\", new NumberFormatter({VAL: params.value}).format(\"{VAL, number, integer}\"));	//Use 'number' to format this part","","    return result;","};","/**"," * Choice formatter. Select ouput based on numerical values"," * @class ChoiceFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.ChoiceFormatter = function(values) {","    ChoiceFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*choice\\\\s*,\\\\s*(.+)}\";","};","","ChoiceFormatter = Y.Intl.ChoiceFormatter;","Y.extend(ChoiceFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","ChoiceFormatter.createInstance = function(values) {","    return new ChoiceFormatter(values);","};","","Y.mix(ChoiceFormatter.prototype, {","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param choicesStr {String} Choice string from pattern","     * @return {Array} Array of objects containing value(choice), result, and relation","     */","    parseOptions: function(choicesStr) {","        var options = [],","            choicesArray = choicesStr.split(\"|\"),","            i, j, choice, relations, rel, mapping, ch;","        for (i=0; i<choicesArray.length; i++) {","            choice = choicesArray[i];","            relations = ['#', '<', '\\u2264'];","            for (j=0; j<relations.length; j++) {","                rel = relations[j];","                if(choice.indexOf(rel) !== -1) {","                    mapping = choice.split(rel);","                    ch = {","                        value: parseInt(mapping[0], 10),","                        result: mapping[1],","                        relation: rel","                    };","                    options.push(ch);","                    break;","                }","            }","        }","","        return options;","    },","","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(SelectFormatter.prototype.getParams.call(this, params, matches)) {","            if(matches[2]) {","                params.choices = this.parseOptions(matches[2]);","                return params.choices === [] ? false: true;","            }","        }","","        return false;","    },","","    /**","     * Select output depending on params.value from options in params.choices","     * @method select","     * @param params {Object} Object containing value and choices","     * @return {String} selected result","     */","    select: function(params) {","        var choice, value, result, relation, i;","        for (i=0; i<params.choices.length; i++) {","            choice = params.choices[i];","            value = choice.value, result = choice.result, relation = choice.relation;","","            if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)","                || (relation === '\\u2264' && value <= params.value)) {","                return result;","            }","        }","","        return \"\";","    },","","    /**","     * Format all instances in str that can be handled by ChoiceFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                result = this.select(params);","                if(result) {","                    str = str.replace(matches[0], result);","                }","            }","        }","","        return str;","    }","}, true);/**"," * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime."," * @module intl-format"," * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl"," */","","/**"," * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters."," * If a formatter fails to parse, the next one in the list try to do so."," */","formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter ];","","Y.mix(Y.Intl, {","","    /**","     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.","     * @method formatMessage","     * @static","     * @param pattern {String} string contains static text with embedded format elements that specify","              how to process and insert strings, numbers, and dates, as well as perform conditional processing.","     * @param values {Object|Array} The data to be processed and inserted.","     * @param [config] {Object} Optional configuration parameters","     * @return {String} Formatted result","     * @example","            //String formatting. Key is replaced by value","            Y.Intl.formatMessage(\"{EMPLOYEE} reports to {MANAGER}\", {","                \"EMPLOYEE\": \"Ashik\",","                \"MANAGER\": \"Dharmesh\"","            });","","            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full","            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone","            Y.Intl.formatMessage(\"Today is {DATE, date, short}\", { DATE: new Date() });","            Y.Intl.formatMessage(\"The time is {DATE, time, medium}\", {DATE: new Date()}, {timezone: \"Asia/Kolkata\"});","            Y.Intl.formatMessage(\"There are {POPULATION_INDIA, number} million people in India.\", {POPULATION_INDIA: 1241.492});","","            //Select formatting. Selects output depending on value","            Y.Intl.formatMessage(\"{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.\", {","                \"NAME\": \"Henri\",","                \"GENDER\": \"male\",","                \"CITY\": \"Paris\"","            });","","            //Plural formatting. Selects output depending on whether numerical value is singular/plural","            Y.Intl.formatMessage(\"{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.\", {","                \"COMPANY_COUNT\": 1","            });","","            //Choice formatting. Selects output depending on numerical value","            Y.Intl.formatMessage(\"There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.\", {","                \"FILE_COUNT\": 1","            });","     */","    formatMessage: function(pattern, values, config) {","        config = config || {};","        var i, formatter;","        for(i=0; i<formatters.length; i++) {","            formatter = formatters[i].createInstance(values);","            pattern = formatter.format(pattern, config);","        }","        return pattern;","    }","});","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"af-NA\",","        \"af-ZA\",","        \"am\",","        \"am-ET\",","        \"ar\",","        \"ar-AE\",","        \"ar-BH\",","        \"ar-DZ\",","        \"ar-EG\",","        \"ar-IQ\",","        \"ar-JO\",","        \"ar-KW\",","        \"ar-LB\",","        \"ar-LY\",","        \"ar-MA\",","        \"ar-OM\",","        \"ar-QA\",","        \"ar-SA\",","        \"ar-SD\",","        \"ar-SY\",","        \"ar-TN\",","        \"ar-YE\",","        \"as\",","        \"as-IN\",","        \"az\",","        \"az-AZ\",","        \"az-Cyrl\",","        \"az-Cyrl-AZ\",","        \"az-Latn-AZ\",","        \"be\",","        \"be-BY\",","        \"bg\",","        \"bg-BG\",","        \"bn\",","        \"bn-BD\",","        \"bn-IN\",","        \"bo\",","        \"bo-CN\",","        \"bo-IN\",","        \"ca\",","        \"ca-ES\",","        \"cs\",","        \"cs-CZ\",","        \"cy\",","        \"cy-GB\",","        \"da\",","        \"da-DK\",","        \"de\",","        \"de-AT\",","        \"de-BE\",","        \"de-CH\",","        \"de-DE\",","        \"de-LI\",","        \"de-LU\",","        \"el\",","        \"el-CY\",","        \"el-GR\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-BZ\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JM\",","        \"en-JO\",","        \"en-MH\",","        \"en-MT\",","        \"en-MY\",","        \"en-NA\",","        \"en-NZ\",","        \"en-PH\",","        \"en-PK\",","        \"en-RH\",","        \"en-SG\",","        \"en-TT\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-VI\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es\",","        \"es-AR\",","        \"es-BO\",","        \"es-CL\",","        \"es-CO\",","        \"es-CR\",","        \"es-DO\",","        \"es-EC\",","        \"es-ES\",","        \"es-GT\",","        \"es-HN\",","        \"es-MX\",","        \"es-NI\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-PY\",","        \"es-SV\",","        \"es-US\",","        \"es-UY\",","        \"es-VE\",","        \"et\",","        \"et-EE\",","        \"eu\",","        \"eu-ES\",","        \"fa\",","        \"fa-AF\",","        \"fa-IR\",","        \"fi\",","        \"fi-FI\",","        \"fil\",","        \"fil-PH\",","        \"fo\",","        \"fo-FO\",","        \"fr\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr-FR\",","        \"fr-LU\",","        \"fr-MC\",","        \"fr-SN\",","        \"ga\",","        \"ga-IE\",","        \"gl\",","        \"gl-ES\",","        \"gsw\",","        \"gsw-CH\",","        \"gu\",","        \"gu-IN\",","        \"gv\",","        \"gv-GB\",","        \"ha\",","        \"ha-GH\",","        \"ha-Latn-GH\",","        \"ha-Latn-NE\",","        \"ha-Latn-NG\",","        \"ha-NE\",","        \"ha-NG\",","        \"haw\",","        \"haw-US\",","        \"he\",","        \"he-IL\",","        \"hi\",","        \"hi-IN\",","        \"hr\",","        \"hr-HR\",","        \"hu\",","        \"hu-HU\",","        \"hy\",","        \"hy-AM\",","        \"id\",","        \"id-ID\",","        \"ii\",","        \"ii-CN\",","        \"in\",","        \"in-ID\",","        \"is\",","        \"is-IS\",","        \"it\",","        \"it-CH\",","        \"it-IT\",","        \"iw\",","        \"iw-IL\",","        \"ja\",","        \"ja-JP\",","        \"ja-JP-TRADITIONAL\",","        \"ka\",","        \"ka-GE\",","        \"kk\",","        \"kk-Cyrl-KZ\",","        \"kk-KZ\",","        \"kl\",","        \"kl-GL\",","        \"km\",","        \"km-KH\",","        \"kn\",","        \"kn-IN\",","        \"ko\",","        \"kok\",","        \"kok-IN\",","        \"ko-KR\",","        \"kw\",","        \"kw-GB\",","        \"lt\",","        \"lt-LT\",","        \"lv\",","        \"lv-LV\",","        \"mk\",","        \"mk-MK\",","        \"ml\",","        \"ml-IN\",","        \"mr\",","        \"mr-IN\",","        \"ms\",","        \"ms-BN\",","        \"ms-MY\",","        \"mt\",","        \"mt-MT\",","        \"nb\",","        \"nb-NO\",","        \"ne\",","        \"ne-IN\",","        \"ne-NP\",","        \"nl\",","        \"nl-BE\",","        \"nl-NL\",","        \"nn\",","        \"nn-NO\",","        \"no\",","        \"no-NO\",","        \"no-NO-NY\",","        \"om\",","        \"om-ET\",","        \"om-KE\",","        \"or\",","        \"or-IN\",","        \"pa\",","        \"pa-Arab\",","        \"pa-Arab-PK\",","        \"pa-Guru-IN\",","        \"pa-IN\",","        \"pa-PK\",","        \"pl\",","        \"pl-PL\",","        \"ps\",","        \"ps-AF\",","        \"pt\",","        \"pt-BR\",","        \"pt-PT\",","        \"ro\",","        \"ro-MD\",","        \"ro-RO\",","        \"ru\",","        \"ru-RU\",","        \"ru-UA\",","        \"sh\",","        \"sh-BA\",","        \"sh-CS\",","        \"sh-YU\",","        \"si\",","        \"si-LK\",","        \"sk\",","        \"sk-SK\",","        \"sl\",","        \"sl-SI\",","        \"so\",","        \"so-DJ\",","        \"so-ET\",","        \"so-KE\",","        \"so-SO\",","        \"sq\",","        \"sq-AL\",","        \"sr\",","        \"sr-BA\",","        \"sr-CS\",","        \"sr-Cyrl-BA\",","        \"sr-Cyrl-CS\",","        \"sr-Cyrl-ME\",","        \"sr-Cyrl-RS\",","        \"sr-Cyrl-YU\",","        \"sr-Latn\",","        \"sr-Latn-BA\",","        \"sr-Latn-CS\",","        \"sr-Latn-ME\",","        \"sr-Latn-RS\",","        \"sr-Latn-YU\",","        \"sr-ME\",","        \"sr-RS\",","        \"sr-YU\",","        \"sv\",","        \"sv-FI\",","        \"sv-SE\",","        \"sw\",","        \"sw-KE\",","        \"sw-TZ\",","        \"ta\",","        \"ta-IN\",","        \"te\",","        \"te-IN\",","        \"th\",","        \"th-TH\",","        \"ti\",","        \"ti-ER\",","        \"ti-ET\",","        \"tl\",","        \"tl-PH\",","        \"tr\",","        \"tr-TR\",","        \"uk\",","        \"uk-UA\",","        \"ur\",","        \"ur-IN\",","        \"ur-PK\",","        \"uz\",","        \"uz-AF\",","        \"uz-Arab\",","        \"uz-Arab-AF\",","        \"uz-Cyrl-UZ\",","        \"uz-Latn\",","        \"uz-Latn-UZ\",","        \"uz-UZ\",","        \"vi\",","        \"vi-VN\",","        \"zh\",","        \"zh-CN\",","        \"zh-Hans-CN\",","        \"zh-Hans-HK\",","        \"zh-Hans-MO\",","        \"zh-Hans-SG\",","        \"zh-Hant\",","        \"zh-Hant-HK\",","        \"zh-Hant-MO\",","        \"zh-Hant-TW\",","        \"zh-HK\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\",","        \"zu-ZA\"","    ],","    \"requires\": [","        \"datatype-number-format\",","        \"datatype-number-parse\",","        \"datatype-date-format\",","        \"intl\"","    ]","});"];
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].lines = {"1":0,"7":0,"24":0,"25":0,"27":0,"29":0,"31":0,"32":0,"33":0,"35":0,"37":0,"55":0,"56":0,"57":0,"60":0,"77":0,"79":0,"87":0,"89":0,"90":0,"92":0,"108":0,"111":0,"112":0,"115":0,"116":0,"118":0,"130":0,"148":0,"149":0,"150":0,"151":0,"154":0,"162":0,"180":0,"189":0,"193":0,"205":0,"206":0,"208":0,"209":0,"210":0,"213":0,"238":0,"242":0,"243":0,"244":0,"245":0,"248":0,"249":0,"250":0,"252":0,"253":0,"255":0,"256":0,"257":0,"258":0,"259":0,"262":0,"265":0,"283":0,"284":0,"285":0,"288":0,"290":0,"298":0,"310":0,"335":0,"336":0,"338":0,"340":0,"341":0,"343":0,"344":0,"345":0,"346":0,"350":0,"351":0,"352":0,"355":0,"356":0,"358":0,"359":0,"362":0,"363":0,"364":0,"365":0,"367":0,"368":0,"369":0,"373":0,"375":0,"376":0,"377":0,"378":0,"379":0,"383":0,"384":0,"386":0,"388":0,"390":0,"391":0,"392":0,"393":0,"394":0,"395":0,"398":0,"399":0,"400":0,"405":0,"406":0,"407":0,"408":0,"410":0,"413":0,"414":0,"415":0,"416":0,"417":0,"419":0,"422":0,"425":0,"426":0,"427":0,"428":0,"432":0,"434":0,"435":0,"436":0,"440":0,"441":0,"443":0,"444":0,"445":0,"447":0,"451":0,"452":0,"456":0,"465":0,"480":0,"481":0,"484":0,"486":0,"487":0,"489":0,"490":0,"493":0,"494":0,"497":0,"500":0,"511":0,"512":0,"513":0,"516":0,"517":0,"520":0,"523":0,"524":0,"525":0,"526":0,"528":0,"531":0,"543":0,"544":0,"545":0,"546":0,"547":0,"548":0,"550":0,"552":0,"553":0,"554":0,"556":0,"557":0,"558":0,"560":0,"561":0,"562":0,"564":0,"565":0,"566":0,"568":0,"569":0,"570":0,"572":0,"574":0,"575":0,"577":0,"579":0,"593":0,"616":0,"617":0,"618":0,"620":0,"622":0,"630":0,"632":0,"633":0,"634":0,"638":0,"639":0,"640":0,"641":0,"642":0,"645":0,"646":0,"647":0,"650":0,"651":0,"662":0,"672":0,"673":0,"675":0,"676":0,"677":0,"678":0,"679":0,"680":0,"681":0,"683":0,"685":0,"688":0,"689":0,"691":0,"692":0,"695":0,"696":0,"697":0,"700":0,"701":0,"702":0,"704":0,"705":0,"709":0,"721":0,"730":0,"731":0,"733":0,"734":0,"737":0,"738":0,"740":0,"741":0,"744":0,"745":0,"746":0,"749":0,"750":0,"751":0,"753":0,"755":0,"759":0,"761":0,"763":0,"767":0,"769":0,"770":0,"774":0,"777":0,"779":0,"781":0,"782":0,"786":0,"787":0,"791":0,"792":0,"796":0,"797":0,"799":0,"803":0,"804":0,"805":0,"807":0,"819":0,"820":0,"822":0,"823":0,"826":0,"828":0,"830":0,"831":0,"833":0,"834":0,"835":0,"837":0,"838":0,"840":0,"841":0,"844":0,"845":0,"847":0,"848":0,"851":0,"854":0,"856":0,"875":0,"884":0,"895":0,"905":0,"914":0,"917":0,"922":0,"949":0,"951":0,"953":0,"956":0,"957":0,"958":0,"959":0,"961":0,"965":0,"980":0,"981":0,"982":0,"987":0,"992":0,"996":0,"3988":0,"3989":0,"4131":0,"4145":0,"4146":0,"4149":0,"4151":0,"4161":0,"4162":0,"4163":0,"4165":0,"4166":0,"4169":0,"4173":0,"4174":0,"4175":0,"4176":0,"4177":0,"4182":0,"4183":0,"4184":0,"4187":0,"4197":0,"4199":0,"4200":0,"4202":0,"4203":0,"4215":0,"4218":0,"4219":0,"4220":0,"4221":0,"4223":0,"4224":0,"4225":0,"4226":0,"4227":0,"4229":0,"4231":0,"4232":0,"4233":0,"4234":0,"4235":0,"4239":0,"4240":0,"4243":0,"4244":0,"4247":0,"4250":0,"4262":0,"4263":0,"4264":0,"4266":0,"4267":0,"4268":0,"4270":0,"4271":0,"4272":0,"4275":0,"4276":0,"4277":0,"4278":0,"4279":0,"4284":0,"4285":0,"4286":0,"4289":0,"4291":0,"4306":0,"4309":0,"4310":0,"4311":0,"4313":0,"4336":0,"4337":0,"4342":0,"4343":0,"4344":0,"4354":0,"4356":0,"4357":0,"4358":0,"4359":0,"4362":0,"4363":0,"4364":0,"4365":0,"4377":0,"4379":0,"4383":0,"4384":0,"4385":0,"4389":0,"4390":0,"4391":0,"4394":0,"4405":0,"4407":0,"4411":0,"4412":0,"4413":0,"4416":0,"4417":0,"4421":0,"4422":0,"4423":0,"4427":0,"4439":0,"4448":0,"4449":0,"4451":0,"4452":0,"4453":0,"4455":0,"4456":0,"4457":0,"4460":0,"4461":0,"4462":0,"4463":0,"4464":0,"4469":0,"4470":0,"4471":0,"4474":0,"4476":0,"4487":0,"4491":0,"4500":0,"4501":0,"4511":0,"4512":0,"4524":0,"4532":0,"4533":0,"4534":0,"4535":0,"4537":0,"4539":0,"4542":0,"4543":0,"4545":0,"4555":0,"4556":0,"4568":0,"4579":0,"4593":0,"4607":0,"4608":0,"4610":0,"4611":0,"4613":0,"4614":0,"4616":0,"4617":0,"4619":0,"4620":0,"4622":0,"4623":0,"4625":0,"4626":0,"4629":0,"4630":0,"4632":0,"4644":0,"4651":0,"4652":0,"4655":0,"4664":0,"4665":0,"4669":0,"4670":0,"4671":0,"4672":0,"4673":0,"4674":0,"4675":0,"4676":0,"4677":0,"4678":0,"4679":0,"4681":0,"4686":0,"4687":0,"4691":0,"4692":0,"4696":0,"4697":0,"4701":0,"4703":0,"4704":0,"4706":0,"4707":0,"4709":0,"4710":0,"4712":0,"4715":0,"4716":0,"4721":0,"4733":0,"4745":0,"4746":0,"4748":0,"4751":0,"4752":0,"4753":0,"4756":0,"4760":0,"4770":0,"4775":0,"4776":0,"4777":0,"4778":0,"4779":0,"4780":0,"4781":0,"4782":0,"4783":0,"4785":0,"4787":0,"4788":0,"4789":0,"4790":0,"4792":0,"4804":0,"4809":0,"4818":0,"4827":0,"4836":0,"4846":0,"4848":0,"4851":0,"4862":0,"4867":0,"4868":0,"4869":0,"4872":0,"4874":0,"4879":0,"4889":0,"4893":0,"4895":0,"4899":0,"4908":0,"4919":0,"4936":0,"4957":0,"5003":0,"5004":0,"5005":0,"5007":0,"5008":0,"5010":0,"5011":0,"5013":0,"5014":0,"5015":0,"5016":0,"5017":0,"5018":0,"5019":0,"5020":0,"5023":0,"5027":0,"5028":0,"5030":0,"5031":0,"5032":0,"5033":0,"5037":0,"5038":0,"5039":0,"5040":0,"5041":0,"5043":0,"5045":0,"5046":0,"5047":0,"5048":0,"5049":0,"5050":0,"5054":0,"5055":0,"5056":0,"5057":0,"5060":0,"5061":0,"5062":0,"5063":0,"5064":0,"5066":0,"5067":0,"5069":0,"5070":0,"5072":0,"5073":0,"5076":0,"5077":0,"5080":0,"5081":0,"5084":0,"5085":0,"5087":0,"5088":0,"5093":0,"5094":0,"5096":0,"5097":0,"5100":0,"5101":0,"5104":0,"5105":0,"5107":0,"5108":0,"5109":0,"5114":0,"5115":0,"5119":0,"5134":0,"5135":0,"5140":0,"5141":0,"5144":0,"5146":0,"5147":0,"5148":0,"5150":0,"5151":0,"5153":0,"5154":0,"5155":0,"5157":0,"5158":0,"5161":0,"5179":0,"5180":0,"5182":0,"5199":0,"5200":0,"5202":0,"5210":0,"5212":0,"5230":0,"5231":0,"5233":0,"5235":0,"5242":0,"5252":0,"5253":0,"5272":0,"5273":0,"5274":0,"5276":0,"5278":0,"5285":0,"5293":0,"5294":0,"5301":0,"5302":0,"5308":0,"5323":0,"5324":0,"5326":0,"5328":0,"5330":0,"5332":0,"5334":0,"5353":0,"5354":0,"5356":0,"5364":0,"5365":0,"5371":0,"5372":0,"5373":0,"5374":0,"5376":0,"5379":0,"5396":0,"5397":0,"5399":0,"5407":0,"5408":0,"5413":0,"5414":0,"5416":0,"5417":0,"5419":0,"5420":0,"5423":0,"5441":0,"5442":0,"5443":0,"5445":0,"5447":0,"5454":0,"5462":0,"5464":0,"5470":0,"5471":0,"5476":0,"5490":0,"5492":0,"5493":0,"5495":0,"5496":0,"5498":0,"5499":0,"5501":0,"5503":0,"5505":0,"5524":0,"5525":0,"5527":0,"5544":0,"5545":0,"5547":0,"5549":0,"5556":0,"5566":0,"5567":0,"5568":0,"5570":0,"5571":0,"5581":0,"5600":0,"5601":0,"5603":0,"5605":0,"5612":0,"5622":0,"5623":0,"5642":0,"5643":0,"5645":0,"5653":0,"5654":0,"5655":0,"5673":0,"5674":0,"5676":0,"5678":0,"5685":0,"5695":0,"5696":0,"5715":0,"5716":0,"5718":0,"5720":0,"5727":0,"5737":0,"5738":0,"5739":0,"5741":0,"5760":0,"5761":0,"5764":0,"5765":0,"5766":0,"5767":0,"5768":0,"5769":0,"5774":0,"5775":0,"5786":0,"5787":0,"5790":0,"5798":0,"5799":0,"5800":0,"5801":0,"5814":0,"5815":0,"5818":0,"5826":0,"5827":0,"5841":0,"5843":0,"5844":0,"5847":0,"5850":0,"5851":0,"5854":0,"5855":0,"5857":0,"5858":0,"5859":0,"5861":0,"5862":0,"5864":0,"5866":0,"5868":0,"5871":0,"5875":0,"5877":0,"5939":0,"5948":0,"5949":0,"5950":0,"5953":0,"5955":0,"5956":0,"5957":0,"5960":0,"5963":0,"5964":0,"5966":0,"5968":0,"5970":0,"5972":0,"5974":0,"5976":0,"5978":0,"5980":0,"5982":0,"5984":0,"5985":0,"5987":0,"5989":0,"5991":0,"5993":0,"5994":0,"5996":0,"5997":0,"5999":0,"6000":0,"6002":0,"6003":0,"6005":0,"6007":0,"6018":0,"6019":0,"6020":0,"6023":0,"6024":0,"6026":0,"6028":0,"6030":0,"6032":0,"6034":0,"6045":0,"6046":0,"6047":0,"6050":0,"6051":0,"6053":0,"6055":0,"6057":0,"6059":0,"6070":0,"6076":0,"6077":0,"6080":0,"6081":0,"6082":0,"6083":0,"6084":0,"6085":0,"6086":0,"6088":0,"6091":0,"6094":0,"6096":0,"6106":0,"6107":0,"6110":0,"6116":0,"6118":0,"6119":0,"6120":0,"6123":0,"6124":0,"6127":0,"6128":0,"6131":0,"6149":0,"6150":0,"6151":0,"6152":0,"6153":0,"6156":0,"6157":0,"6159":0,"6161":0,"6162":0,"6163":0,"6165":0,"6166":0,"6167":0,"6169":0,"6170":0,"6171":0,"6173":0,"6174":0,"6175":0,"6177":0,"6181":0,"6183":0,"6190":0,"6217":0,"6218":0,"6219":0,"6220":0,"6221":0,"6223":0,"6224":0,"6227":0,"6233":0,"6234":0,"6235":0,"6236":0,"6238":0,"6239":0,"6241":0,"6244":0,"6245":0,"6246":0,"6247":0,"6248":0,"6250":0,"6251":0,"6253":0,"6256":0,"6257":0,"6258":0,"6259":0,"6260":0,"6262":0,"6263":0,"6265":0,"6268":0,"6269":0,"6270":0,"6271":0,"6272":0,"6274":0,"6275":0,"6277":0,"6280":0,"6281":0,"6282":0,"6283":0,"6284":0,"6286":0,"6287":0,"6289":0,"6292":0,"6293":0,"6294":0,"6295":0,"6296":0,"6298":0,"6299":0,"6301":0,"6304":0,"6306":0,"6307":0,"6309":0,"6310":0,"6313":0,"6315":0,"6322":0,"6333":0,"6345":0,"6346":0,"6347":0,"6349":0,"6350":0,"6353":0,"6355":0,"6370":0,"6388":0,"6391":0,"6392":0,"6395":0,"6412":0,"6413":0,"6414":0,"6417":0,"6419":0,"6420":0,"6422":0,"6423":0,"6425":0,"6444":0,"6445":0,"6446":0,"6447":0,"6448":0,"6451":0,"6459":0,"6460":0,"6461":0,"6464":0,"6465":0,"6468":0,"6469":0,"6470":0,"6471":0,"6474":0,"6475":0,"6478":0,"6479":0,"6482":0,"6483":0,"6490":0,"6491":0,"6492":0,"6495":0,"6497":0,"6500":0,"6502":0,"6527":0,"6528":0,"6529":0,"6532":0,"6533":0,"6536":0,"6537":0,"6538":0,"6539":0,"6542":0,"6543":0,"6544":0,"6545":0,"6548":0,"6565":0,"6566":0,"6577":0,"6578":0,"6581":0,"6583":0,"6591":0,"6592":0,"6594":0,"6605":0,"6606":0,"6609":0,"6611":0,"6612":0,"6613":0,"6616":0,"6624":0,"6629":0,"6638":0,"6647":0,"6648":0,"6660":0,"6661":0,"6662":0,"6665":0,"6666":0,"6674":0,"6675":0,"6678":0,"6687":0,"6688":0,"6689":0,"6690":0,"6694":0,"6704":0,"6707":0,"6708":0,"6710":0,"6712":0,"6717":0,"6728":0,"6729":0,"6730":0,"6736":0,"6739":0,"6740":0,"6748":0,"6749":0,"6752":0,"6761":0,"6762":0,"6763":0,"6765":0,"6766":0,"6770":0,"6771":0,"6774":0,"6775":0,"6778":0,"6779":0,"6782":0,"6793":0,"6796":0,"6797":0,"6799":0,"6801":0,"6802":0,"6808":0,"6813":0,"6824":0,"6825":0,"6826":0,"6832":0,"6835":0,"6836":0,"6844":0,"6845":0,"6856":0,"6857":0,"6858":0,"6863":0,"6866":0,"6867":0,"6875":0,"6876":0,"6879":0,"6888":0,"6889":0,"6890":0,"6892":0,"6893":0,"6897":0,"6898":0,"6899":0,"6902":0,"6903":0,"6906":0,"6907":0,"6910":0,"6920":0,"6923":0,"6924":0,"6926":0,"6928":0,"6931":0,"6932":0,"6934":0,"6938":0,"6949":0,"6950":0,"6951":0,"6954":0,"6955":0,"6963":0,"6964":0,"6967":0,"6976":0,"6977":0,"6978":0,"6982":0,"6983":0,"6986":0,"7004":0,"7007":0,"7008":0,"7009":0,"7010":0,"7011":0,"7012":0,"7013":0,"7014":0,"7015":0,"7017":0,"7018":0,"7019":0,"7020":0,"7021":0,"7022":0,"7024":0,"7028":0,"7029":0,"7032":0,"7046":0,"7047":0,"7048":0,"7051":0,"7052":0,"7056":0,"7066":0,"7069":0,"7070":0,"7072":0,"7074":0,"7075":0,"7076":0,"7079":0,"7080":0,"7082":0,"7083":0,"7084":0,"7085":0,"7090":0,"7101":0,"7102":0,"7103":0,"7106":0,"7107":0,"7115":0,"7116":0,"7126":0,"7127":0,"7128":0,"7129":0,"7131":0,"7132":0,"7134":0,"7135":0,"7138":0,"7140":0,"7151":0,"7152":0,"7153":0,"7156":0,"7157":0,"7165":0,"7166":0,"7169":0,"7177":0,"7180":0,"7181":0,"7182":0,"7183":0,"7184":0,"7185":0,"7186":0,"7187":0,"7192":0,"7193":0,"7198":0,"7209":0,"7210":0,"7211":0,"7212":0,"7216":0,"7226":0,"7227":0,"7228":0,"7229":0,"7231":0,"7233":0,"7237":0,"7247":0,"7250":0,"7251":0,"7253":0,"7254":0,"7255":0,"7256":0,"7261":0,"7273":0,"7275":0,"7317":0,"7318":0,"7319":0,"7320":0,"7321":0,"7323":0};
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].functions = {"_zeroPad:24":0,"__BaseFormat:55":0,"format:86":0,"parse:107":0,"_createParseObject:129":0,"Segment:148":0,"format:161":0,"parse:179":0,"getFormat:188":0,"_parseLiteral:204":0,"_parseInt:237":0,"TextSegment:283":0,"toString:297":0,"parse:309":0,"__zNumberFormat:335":0,"format:479":0,"parse:510":0,"__parseStatic:542":0,"_createParseObject:592":0,"NumberSegment:616":0,"format:629":0,"_normalize:661":0,"parse:720":0,"__YNumberFormat:819":0,"format:883":0,"isParseIntegerOnly:894":0,"parse:904":0,"setParseIntegerOnly:913":0,"format:948":0,"parse:979":0,"__zTimezone:4145":0,"getTransition:4160":0,"addRule:4196":0,"getRule:4214":0,"getOffset:4261":0,"_BY_OFFSET:4304":0,"_generateShortName:4335":0,"_initTimezoneRules:4353":0,"getCurrentTimezoneIds:4376":0,"getTimezoneIdForOffset:4404":0,"isDST:4438":0,"isValidTimezoneId:4486":0,"getShortName:4499":0,"getMediumName:4510":0,"Timezone:4532":0,"_getDOY:4554":0,"_floatToInt:4567":0,"getCurrentTimezoneIds:4578":0,"getTimezoneIdForOffset:4592":0,"getUnixTimeFromWallTime:4603":0,"isValidTimestamp:4643":0,"isValidTimezoneId:4732":0,"getNormalizedTimezoneId:4744":0,"_parseRFC3339:4769":0,"_parseSQLFormat:4803":0,"getShortName:4817":0,"getMediumName:4826":0,"getLongName:4835":0,"convertToIncrementalUTC:4845":0,"convertUTCToRFC3339Format:4861":0,"convertUTCToSQLFormat:4888":0,"getRawOffset:4907":0,"getWallTimeFromUnixTime:4918":0,"__zDateFormat:5003":0,"format:5134":0,"DateSegment:5179":0,"EraSegment:5199":0,"format:5210":0,"YearSegment:5230":0,"toString:5241":0,"format:5251":0,"MonthSegment:5272":0,"toString:5284":0,"initialize:5292":0,"format:5322":0,"WeekSegment:5353":0,"format:5364":0,"DaySegment:5396":0,"format:5407":0,"WeekdaySegment:5441":0,"toString:5453":0,"initialize:5461":0,"format:5489":0,"TimeSegment:5524":0,"HourSegment:5544":0,"toString:5555":0,"format:5565":0,"MinuteSegment:5600":0,"toString:5611":0,"format:5621":0,"SecondSegment:5642":0,"format:5653":0,"AmPmSegment:5673":0,"toString:5684":0,"format:5694":0,"TimezoneSegment:5715":0,"toString:5726":0,"format:5736":0,"__BuddhistDateFormat:5760":0,"YearSegment:5786":0,"format:5798":0,"EraSegment:5814":0,"format:5826":0,"__YDateFormat:5841":0,"_generateDatePattern:5947":0,"_generateTimePattern:6017":0,"_generateTimeZonePattern:6044":0,"_generatePattern:6069":0,"format:6105":0,"__YRelativeTimeFormat:6149":0,"currentDate:6190":0,"format:6217":0,"_stripDecimals:6332":0,"__YDurationFormat:6345":0,"_getDuration_XML:6387":0,"_getDuration_Seconds:6411":0,"format:6444":0,"format:6526":0,"formatDuration:6564":0,"MsgBaseFormatter:6577":0,"getValue:6590":0,"getParams:6604":0,"format:6623":0,"createInstance:6636":0,"getCurrentTimeZone:6646":0,"StringFormatter:6660":0,"createInstance:6674":0,"getParams:6686":0,"format:6703":0,"DateFormatter:6728":0,"createInstance:6748":0,"getParams:6760":0,"format:6792":0,"TimeFormatter:6824":0,"createInstance:6844":0,"NumberFormatter:6856":0,"createInstance:6875":0,"getParams:6887":0,"format:6919":0,"SelectFormatter:6949":0,"createInstance:6963":0,"getParams:6975":0,"parseOptions:7003":0,"select:7045":0,"format:7065":0,"PluralFormatter:7101":0,"createInstance:7115":0,"select:7126":0,"ChoiceFormatter:7151":0,"createInstance:7165":0,"parseOptions:7176":0,"getParams:7208":0,"select:7225":0,"format:7246":0,"formatMessage:7316":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].coveredLines = 1270;
_yuitest_coverage["build/gallery-i18n-formats/gallery-i18n-formats.js"].coveredFunctions = 156;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 1);
YUI.add('gallery-i18n-formats', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

_yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7);
var Format, NumberFormat, YNumberFormat,    //number
    TimezoneData, TimezoneLinks, Timezone, AjxTimezone,  //timezone
    ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat,   //date
    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter, PluralFormatter, ChoiceFormatter, formatters; //message

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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 24);
Y.Number._zeroPad  = function(s, length, zeroChar, rightSide) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_zeroPad", 24);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 25);
s = typeof s === "string" ? s : String(s);

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 27);
if (s.length >= length) { return s; }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 29);
zeroChar = zeroChar || '0';
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 31);
var a = [], i;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 32);
for (i = s.length; i < length; i++) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 33);
a.push(zeroChar);
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 35);
a[rightSide ? "unshift" : "push"](s);

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 37);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 55);
Y.Number.__BaseFormat = function(pattern, formats) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__BaseFormat", 55);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 56);
if ( !pattern && !formats ) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 57);
return;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 60);
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

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 77);
Format = Y.Number.__BaseFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 79);
Y.mix(Format.prototype, {
    /**
     * Format object
     * @method format
     * @param object The object to be formatted
     * @return {String} Formatted result
     */
    format: function(object) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 86);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 87);
var s = [], i = 0;
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 89);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 90);
s.push(this._segments[i].format(object));
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 92);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 107);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 108);
var object = this._createParseObject(),
            index = pp || 0,
            i = 0;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 111);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 112);
index = this._segments[i].parse(object, s, index);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 115);
if (index < s.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 116);
Y.error("Parse Error: Input too long");
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 118);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_createParseObject", 129);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 130);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 148);
Format.Segment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "Segment", 148);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 149);
if( !format && !s ) { return; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 150);
this._parent = format;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 151);
this._s = s;
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 154);
Y.mix(Format.Segment.prototype, {
    /**
     * Formats the object. Will be overridden in most subclasses.
     * @method format
     * //param o The object to format
     * @return {String} Formatted result
     */
    format: function(/*o*/) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 161);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 162);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 179);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 180);
Y.error("Not implemented");
    },

    /**
     * Return the parent Format object
     * @method getFormat
     * @return {Number.__BaseFormat}
     */
    getFormat: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getFormat", 188);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 189);
return this._parent;
    }
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 193);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_parseLiteral", 204);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 205);
if (s.length - index < literal.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 206);
Y.error("Parse Error: Input too short");
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 208);
for (var i = 0; i < literal.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 209);
if (literal.charAt(i) !== s.charAt(index + i)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 210);
Y.error("Parse Error: Input does not match");
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 213);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_parseInt", 237);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 238);
var len = fixedlen || s.length - index,
            head = index,
            i = 0,
            tail, value, target;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 242);
for (; i < len; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 243);
if (!s.charAt(index++).match(/\d/)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 244);
index--;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 245);
break;
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 248);
tail = index;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 249);
if (head === tail) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 250);
Y.error("Error parsing number. Number not present");
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 252);
if (fixedlen && tail - head !== fixedlen) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 253);
Y.error("Error parsing number. Number too short");
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 255);
value = parseInt(s.substring(head, tail), radix || 10);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 256);
if (f) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 257);
target = o || Y.config.win;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 258);
if (typeof f === "function") {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 259);
f.call(target, value + adjust);
            }
            else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 262);
target[f] = value + adjust;
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 265);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 283);
Format.TextSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "TextSegment", 283);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 284);
if (!format && !s) { return; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 285);
Format.TextSegment.superclass.constructor.call(this, format, s);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 288);
Y.extend(Format.TextSegment, Format.Segment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 290);
Y.mix(Format.TextSegment.prototype, {
    /**
     * String representation of the class
     * @method toString
     * @private
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 297);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 298);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 309);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 310);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 335);
Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__zNumberFormat", 335);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 336);
var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,
        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 338);
if (arguments.length === 0) { return; }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 340);
NumberFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 341);
if (!pattern) { return; }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 343);
if(pattern === "{plural_style}") {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 344);
pattern = this.Formats.decimalFormat;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 345);
this._isPluralCurrency = true;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 346);
this._pattern = pattern;
    }

    //Default currency
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 350);
this.currency = this.Formats.defaultCurrency;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 351);
if(this.currency === undefined || !this.currency) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 352);
this.currency = "USD";
    }
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 355);
patterns = pattern.split(/;/);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 356);
pattern = patterns[0];
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 358);
this._useGrouping = (pattern.indexOf(",") !== -1);      //Will be set to true if pattern uses grouping
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 359);
this._parseIntegerOnly = (pattern.indexOf(".") === -1);  //Will be set to false if pattern contains fractional parts
        
    //If grouping is used, find primary and secondary grouping
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 362);
if(this._useGrouping) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 363);
numberPattern = pattern.match(/[0#,]+/);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 364);
groupingRegex = new RegExp("[0#]+", "g");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 365);
groups = numberPattern[0].match(groupingRegex);
            
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 367);
i = groups.length - 2;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 368);
this._primaryGrouping = groups[i+1].length;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 369);
this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);
    }
        
    // parse prefix
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 373);
i = 0;
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 375);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 376);
i = results.offset;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 377);
hasPrefix = results.text !== "";
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 378);
if (hasPrefix) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 379);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // parse number descriptor
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 383);
start = i;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 384);
while (i < pattern.length &&
        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 386);
i++;
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 388);
end = i;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 390);
numPattern = pattern.substring(start, end);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 391);
e = numPattern.indexOf(this.Formats.exponentialSymbol);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 392);
expon = e !== -1 ? numPattern.substring(e + 1) : null;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 393);
if (expon) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 394);
numPattern = numPattern.substring(0, e);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 395);
this._showExponent = true;
    }
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 398);
dot = numPattern.indexOf('.');
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 399);
whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 400);
if (whole) {
        /*var comma = whole.lastIndexOf(',');
            if (comma != -1) {
                this._groupingOffset = whole.length - comma - 1;
            }*/
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 405);
whole = whole.replace(/[^#0]/g,"");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 406);
zero = whole.indexOf('0');
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 407);
if (zero !== -1) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 408);
this._minIntDigits = whole.length - zero;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 410);
this._maxIntDigits = whole.length;
    }
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 413);
fract = dot !== -1 ? numPattern.substring(dot + 1) : null;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 414);
if (fract) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 415);
zero = fract.lastIndexOf('0');
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 416);
if (zero !== -1) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 417);
this._minFracDigits = zero + 1;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 419);
this._maxFracDigits = fract.replace(/[^#0]/g,"").length;
    }
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 422);
this._segments.push(new NumberFormat.NumberSegment(this, numPattern));
	
    // parse suffix
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 425);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 426);
i = results.offset;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 427);
if (results.text !== "") {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 428);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // add negative formatter
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 432);
if (skipNegFormat) { return; }
	
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 434);
if (patterns.length > 1) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 435);
pattern = patterns[1];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 436);
this._negativeFormatter = new NumberFormat(pattern, formats, true);
    }
    else {
        // no negative pattern; insert minus sign before number segment
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 440);
formatter = new NumberFormat("", formats);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 441);
formatter._segments = formatter._segments.concat(this._segments);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 443);
index = hasPrefix ? 1 : 0;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 444);
minus = new Format.TextSegment(formatter, this.Formats.minusSign);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 445);
formatter._segments.splice(index, 0, minus);
		
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 447);
this._negativeFormatter = formatter;
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 451);
NumberFormat = Y.Number.__zNumberFormat;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 452);
Y.extend(NumberFormat, Y.Number.__BaseFormat);
    
// Constants

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 456);
Y.mix(NumberFormat, {
    _NUMBER: "number",
    _INTEGER: "integer",
    _CURRENCY: "currency",
    _PERCENT: "percent",

    _META_CHARS: "0#.,E"
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 465);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 479);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 480);
if (number < 0 && this._negativeFormatter) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 481);
return this._negativeFormatter.format(number);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 484);
var result = Format.prototype.format.call(this, number), pattern = "";
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 486);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 487);
if(number === 1) {
                //Singular
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 489);
pattern = this.Formats.currencyPatternSingular;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 490);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencySingular"]);
            } else {
                //Plural
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 493);
pattern = this.Formats.currencyPatternPlural;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 494);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencyPlural"]);
            }
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 497);
result = pattern.replace("{0}", result);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 500);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 510);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 511);
var singular, plural, object;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 512);
if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 513);
return this._negativeFormatter.parse(s, pp);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 516);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 517);
singular = this.Formats[this.currency + "_currencySingular"],
                plural = this.Formats[this.currency + "_currencyPlural"];
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 520);
s = Y.Lang.trim(s.replace(plural, "").replace(singular, ""));
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 523);
object = null;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 524);
try {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 525);
object = Format.prototype.parse.call(this, s, pp);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 526);
object = object.value;
        } catch(e) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 528);
Y.error("Failed to parse: " + s, e);
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 531);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__parseStatic", 542);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 543);
var data = [], c, start, end;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 544);
while (i < s.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 545);
c = s.charAt(i++);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 546);
if (NumberFormat._META_CHARS.indexOf(c) !== -1) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 547);
i--;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 548);
break;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 550);
switch (c) {
                case "'":
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 552);
start = i;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 553);
while (i < s.length && s.charAt(i) !== "'") {
			_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 554);
i++;
                    }
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 556);
end = i;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 557);
c = end - start === 0 ? "'" : s.substring(start, end);
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 558);
break;
                case '%':
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 560);
c = this.Formats.percentSign;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 561);
this._isPercent = true;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 562);
break;
                case '\u2030':
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 564);
c = this.Formats.perMilleSign;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 565);
this._isPerMille = true;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 566);
break;
                case '\u00a4':
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 568);
if(s.charAt(i) === '\u00a4') {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 569);
c = this.Formats[this.currency + "_currencyISO"];
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 570);
i++;
                    } else {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 572);
c = this.Formats[this.currency + "_currencySymbol"];
                    }
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 574);
this._isCurrency = true;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 575);
break;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 577);
data.push(c);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 579);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_createParseObject", 592);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 593);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 616);
NumberFormat.NumberSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "NumberSegment", 616);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 617);
if (format === null && s === null) { return; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 618);
NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 620);
Y.extend(NumberFormat.NumberSegment, Format.Segment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 622);
Y.mix(NumberFormat.NumberSegment.prototype, {
    /**
     * Format number segment
     * @method format
     * @param number {Number}
     * @return {String} Formatted result
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 629);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 630);
var expon, exponReg, s;
        // special values
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 632);
if (isNaN(number)) { return this._parent.Formats.nanSymbol; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 633);
if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 634);
return this._parent.Formats.infinitySign;
        }

        // adjust value
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 638);
if (typeof number !== "number") { number = Number(number); }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 639);
number = Math.abs(number); // NOTE: minus sign is part of pattern
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 640);
if (this._parent._isPercent) { number *= 100; }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 641);
if (this._parent._isPerMille) { number *= 1000; }}
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 642);
if(this._parent._parseIntegerOnly) { number = Math.floor(number); }
        
        // format
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 645);
expon = this._parent.Formats.exponentialSymbol;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 646);
exponReg = new RegExp(expon + "+");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 647);
s = this._parent._showExponent
            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)
            : number.toFixed(this._parent._maxFracDigits || 0);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 650);
s = this._normalize(s);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 651);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_normalize", 661);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 662);
var exponSymbol = this._parent.Formats.exponentialSymbol,
            splitReg = new RegExp("[\\." + exponSymbol + "]"),
            match = s.split(splitReg),
            whole = match.shift(),  //Normalize the whole part
            a = [],
            offset = this._parent._primaryGrouping,
            fract = '0',
            decimal = this._parent.Formats.decimalSeparator,
            expon, i;

	_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 672);
if (whole.length < this._parent._minIntDigits) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 673);
whole = Y.Number._zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 675);
if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 676);
i = whole.length - offset;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 677);
while (i > 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 678);
a.unshift(whole.substr(i, offset));
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 679);
a.unshift(this._parent.Formats.groupingSeparator);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 680);
offset = this._parent._secondaryGrouping;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 681);
i -= offset;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 683);
a.unshift(whole.substring(0, i + offset));
		
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 685);
whole = a.join("");
        }
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 688);
if(s.match(/\./)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 689);
fract = match.shift();
        }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 691);
if(s.match(/\e/) || s.match(/\E/)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 692);
expon = match.shift();
        }}

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 695);
fract = fract.replace(/0+$/,"");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 696);
if (fract.length < this._parent._minFracDigits) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 697);
fract = Y.Number._zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);
        }
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 700);
a = [ whole ];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 701);
if (fract.length > 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 702);
a.push(decimal, fract);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 704);
if (expon) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 705);
a.push(exponSymbol, expon.replace(/^\+/,""));
        }
	
        // return normalize result
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 709);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 720);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 721);
var comma = this._parent.Formats.groupingSeparator,
            dot = this._parent.Formats.decimalSeparator,
            minusSign = this._parent.Formats.minusSign,
            expon = this._parent.Formats.exponentialSymbol,
            numberRegexPattern = "[\\" + minusSign + "0-9" + comma + "]+",
            numberRegex, matches, negativeNum, endIndex, scientific = null, i,
            //If more groups, use primary/secondary grouping as applicable
            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 730);
if(!this._parent._parseIntegerOnly) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 731);
numberRegexPattern += "(\\" + dot + "[0-9]+)?";
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 733);
if(this._parent._showExponent) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 734);
numberRegexPattern += "(" + expon +"\\+?[0-9]+)";
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 737);
numberRegex = new RegExp(numberRegexPattern);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 738);
matches = s.match(numberRegex);
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 740);
if(!matches) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 741);
Y.error("Error parsing: Number does not match pattern");
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 744);
negativeNum = s.indexOf(minusSign) !== -1;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 745);
endIndex = index + matches[0].length;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 746);
s = s.slice(index, endIndex);
        
        //Scientific format does not use grouping
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 749);
if(this._parent.showExponent) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 750);
scientific = s.split(expon);
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 751);
if(this._parent._useGrouping) {
            //Verify grouping data exists
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 753);
if(!this._parent._primaryGrouping) {
                //Should not happen
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 755);
Y.error("Error parsing: Invalid pattern");
            }
            
            //Verify grouping is correct
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 759);
i = s.length - this._parent._primaryGrouping - 1;
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 761);
if(matches[1]) {
                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 763);
i = i - matches[1].length;
            }
            
            //Use primary grouping for first group
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 767);
if(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 769);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 770);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 774);
s = s.slice(0, i) + s.slice(i+1);
            }
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 777);
i = i - grouping - 1;
            
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 779);
while(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 781);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 782);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 786);
s = s.slice(0, i) + s.slice(i+1);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 787);
i = i - grouping - 1;
            }
            
            //Verify there are no more grouping separators
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 791);
if(s.indexOf(comma) !== -1) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 792);
Y.error("Error parsing: Number does not match pattern");
            }
        }}
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 796);
if(scientific) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 797);
object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 799);
object.value = parseFloat(s, 10);
        }
        
        //Special types
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 803);
if(negativeNum) { object.value *= -1; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 804);
if (this._parent._isPercent) { object.value /= 100; }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 805);
if (this._parent._isPerMille) { object.value /= 1000; }}
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 807);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 819);
Y.Number.__YNumberFormat = function(style) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__YNumberFormat", 819);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 820);
style = style || Y.Number.STYLES.NUMBER_STYLE;
    
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 822);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 823);
style = Y.Number.STYLES[style];
    }
    
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 826);
var pattern = "",
        formats = Y.Intl.get("datatype-number-advanced-format");
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 828);
switch(style) {
        case Y.Number.STYLES.CURRENCY_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 830);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 831);
break;
        case Y.Number.STYLES.ISO_CURRENCY_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 833);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 834);
pattern = pattern.replace("\u00a4", "\u00a4\u00a4");
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 835);
break;
        case Y.Number.STYLES.NUMBER_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 837);
pattern = formats.decimalFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 838);
break;
        case Y.Number.STYLES.PERCENT_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 840);
pattern = formats.percentFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 841);
break;
        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:
            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 844);
pattern = "{plural_style}";
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 845);
break;
        case Y.Number.STYLES.SCIENTIFIC_STYLE:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 847);
pattern = formats.scientificFormat;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 848);
break;
    }
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 851);
this._numberFormatInstance = new NumberFormat(pattern, formats);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 854);
YNumberFormat = Y.Number.__YNumberFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 856);
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
   
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 875);
Y.mix(YNumberFormat.prototype, {
    /**
     * Format a number
     * @method format
     * @param number {Number} the number to format
     * @for Number.YNumberFormat
     * @return {Number}
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 883);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 884);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isParseIntegerOnly", 894);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 895);
return this._numberFormatInstance._parseIntegerOnly;
    },
    
    /**
     * Parse the string to get a number
     * @method parse
     * @param {String} txt The string to parse
     * @param {Number} [pp=0] Parse position. The position to start parsing at.
     */
    parse: function(txt, pp) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 904);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 905);
return this._numberFormatInstance.parse(txt, pp);
    },
    
    /**
     * Sets whether or not numbers should be parsed as integers only.
     * @method setParseIntegerOnly
     * @param {Boolean} newValue set True, this format will parse numbers as integers only.
     */
    setParseIntegerOnly: function(newValue) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "setParseIntegerOnly", 913);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 914);
this._numberFormatInstance._parseIntegerOnly = newValue;
    }
});
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 917);
Y.mix( Y.Number, {
     _oldFormat: Y.Number.format,
     _oldParse:  Y.Number.parse
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 922);
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
         _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 948);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 949);
config = config || {};
    
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 951);
if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined
               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 953);
return Y.Number._oldFormat(data, config);
         }
    
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 956);
try {
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 957);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 958);
if(config.parseIntegerOnly) {
                 _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 959);
formatter.setParseIntegerOnly(true);
             }
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 961);
return formatter.format(data);
         } catch(e) {
             //Error. Fallback to original format
         }
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 965);
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
         _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parse", 979);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 980);
try {
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 981);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 982);
return formatter.parse(data, config.parsePosition);
         } catch(e) {
             //Fallback on deprecated parse
         }
    
         _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 987);
return Y.Number._oldParse(data);
     }
}, true);

//Update Parsers shortcut
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 992);
Y.namespace("Parsers").number = Y.Number.parse;
/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 996);
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

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 3988);
TimezoneData = Y.Date.Timezone.__tzoneData;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 3989);
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

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4131);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4145);
Y.Date.__zTimezone = function() {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__zTimezone", 4145);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4146);
this.localeData = Y.Intl.get("datatype-date-timezone");
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4149);
AjxTimezone = Y.Date.__zTimezone;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4151);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getTransition", 4160);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4161);
var trans = [ year || new Date().getFullYear(), onset.mon, 1 ], date, wkday, adjust, last, count;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4162);
if (onset.mday) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4163);
trans[2] = onset.mday;
        }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4165);
if (onset.wkday) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4166);
date = new Date(year, onset.mon - 1, 1, onset.hour, onset.min, onset.sec);

            // last wkday of month
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4169);
if (onset.week === -1) {
                // NOTE: This creates a date of the *last* day of specified month by
                //       setting the month to *next* month and setting day of month
                //       to zero (i.e. the day *before* the first day).
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4173);
last = new Date(new Date(date.getTime()).setMonth(onset.mon, 0));
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4174);
count = last.getDate();
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4175);
wkday = last.getDay() + 1;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4176);
adjust = wkday >= onset.wkday ? wkday - onset.wkday : 7 - onset.wkday - wkday;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4177);
trans[2] = count - adjust;
            }

            // Nth wkday of month
            else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4182);
wkday = date.getDay() + 1;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4183);
adjust = onset.wkday === wkday ? 1 :0;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4184);
trans[2] = onset.wkday + 7 * (onset.week - adjust) - wkday + 1;
            }
        }}
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4187);
return trans;
    },

    /**
     * Add dst transition rules with dst information
     * @method addRule
     * @static
     * @param rule {Object} Object containing timezone information
     */
    addRule: function(rule) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "addRule", 4196);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4197);
var tzId = rule.tzId, array;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4199);
AjxTimezone._SHORT_NAMES[tzId] = AjxTimezone._generateShortName(rule.standard.offset);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4200);
AjxTimezone._CLIENT2RULE[tzId] = rule;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4202);
array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4203);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getRule", 4214);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4215);
var rule = AjxTimezone._CLIENT2RULE[tzId],
            names = [ "standard", "daylight" ],
            rules, i, j, found, name, onset, breakOuter, p;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4218);
if (!rule && tz) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4219);
rules = tz.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4220);
for (i = 0; i < rules.length; i++) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4221);
rule = rules[i];

                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4223);
found = true;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4224);
for (j = 0; j < names.length; j++) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4225);
name = names[j];
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4226);
onset = rule[name];
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4227);
if (!onset) { continue; }
			
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4229);
breakOuter = false;

                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4231);
for (p in tz[name]) {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4232);
if (tz[name][p] !== onset[p]) {
                            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4233);
found = false;
                            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4234);
breakOuter = true;
                            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4235);
break;
                        }
                    }

                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4239);
if(breakOuter){
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4240);
break;
                    }
                }
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4243);
if (found) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4244);
return rule;
                }
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4247);
return null;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4250);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getOffset", 4261);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4262);
var rule = AjxTimezone.getRule(tzId), year, standard, stdTrans, dstTrans, month, stdMonth, dstMonth, isDST;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4263);
if (rule && rule.daylight) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4264);
year = date.getFullYear();

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4266);
standard = rule.standard, daylight  = rule.daylight;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4267);
stdTrans = AjxTimezone.getTransition(standard, year);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4268);
dstTrans = AjxTimezone.getTransition(daylight, year);

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4270);
month    = date.getMonth()+1, day = date.getDate();
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4271);
stdMonth = stdTrans[1], stdDay = stdTrans[2];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4272);
dstMonth = dstTrans[1], dstDay = dstTrans[2];

            // northern hemisphere
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4275);
isDST = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4276);
if (dstMonth < stdMonth) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4277);
isDST = month > dstMonth && month < stdMonth;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4278);
isDST = isDST || (month === dstMonth && day >= dstDay);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4279);
isDST = isDST || (month === stdMonth && day <  stdDay);
            }

            // sorthern hemisphere
            else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4284);
isDST = month < dstMonth || month > stdMonth;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4285);
isDST = isDST || (month === dstMonth && day <  dstDay);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4286);
isDST = isDST || (month === stdMonth && day >= stdDay);
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4289);
return isDST ? daylight.offset : standard.offset;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4291);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_BY_OFFSET", 4304);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4306);
var delta = arule.standard.offset - brule.standard.offset,
            aname = arule.tzId,
            bname = brule.tzId;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4309);
if (delta === 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4310);
if (aname < bname) { delta = -1; }
            else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4311);
if (aname > bname) { delta = 1; }}
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4313);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generateShortName", 4335);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4336);
if (offset === 0) { return ""; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4337);
var sign = offset < 0 ? "-" : "+",
            stdOffset = Math.abs(offset),
            hours = Math.floor(stdOffset / 60),
            minutes = stdOffset % 60;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4342);
hours = hours < 10 ? '0' + hours : hours;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4343);
minutes = minutes < 10 ? '0' + minutes : minutes;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4344);
return [sign,hours,period?".":"",minutes].join("");
    },

    /**
     * Initialized timezone rules. Only for internal use.
     * @method _initTimezoneRules
     * @static
     * @private
     */
    _initTimezoneRules: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_initTimezoneRules", 4353);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4354);
var rule, i, j, array;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4356);
for (i = 0; i < TimezoneData.TIMEZONE_RULES.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4357);
rule = TimezoneData.TIMEZONE_RULES[i];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4358);
array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4359);
array.push(rule);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4362);
TimezoneData.TIMEZONE_RULES.sort(AjxTimezone._BY_OFFSET);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4363);
for (j = 0; j < TimezoneData.TIMEZONE_RULES.length; j++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4364);
rule = TimezoneData.TIMEZONE_RULES[j];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4365);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getCurrentTimezoneIds", 4376);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4377);
rawOffset = rawOffset/60;	//Need offset in minutes

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4379);
var result = [],
            today = new Date(),
            tzId, link;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4383);
for(tzId in AjxTimezone._CLIENT2RULE) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4384);
if(rawOffset === 0 || AjxTimezone.getOffset(tzId, today) === rawOffset) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4385);
result.push(tzId);
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4389);
for(link in TimezoneLinks) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4390);
if(Y.Array.indexOf(result,TimezoneLinks[link]) !== -1) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4391);
result.push(link);
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4394);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getTimezoneIdForOffset", 4404);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4405);
rawOffset = rawOffset/60;	//Need offset in minutes

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4407);
var etcGMTId = "Etc/GMT",
            today = new Date(),
            tzId;
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4411);
if(rawOffset % 60 === 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4412);
if(rawOffset !== 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4413);
etcGMTId += (rawOffset > 0? "-": "+") + rawOffset/60;
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4416);
if(AjxTimezone._CLIENT2RULE[etcGMTId] !== undefined) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4417);
return etcGMTId;
            }
        }
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4421);
for(tzId in AjxTimezone._CLIENT2RULE) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4422);
if(AjxTimezone.getOffset(tzId, today) === rawOffset) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4423);
return tzId;
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4427);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isDST", 4438);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4439);
var rule = AjxTimezone.getRule(tzId),
            year,
            standard, daylight,
            stdTrans, dstTrans,
            month, day,
            stdMonth, stdDay,
            dstMonth, dstDay,
            isDSTActive;
            
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4448);
if (rule && rule.daylight) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4449);
year = date.getFullYear();

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4451);
standard = rule.standard, daylight  = rule.daylight;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4452);
stdTrans = AjxTimezone.getTransition(standard, year);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4453);
dstTrans = AjxTimezone.getTransition(daylight, year);

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4455);
month    = date.getMonth()+1, day = date.getDate();
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4456);
stdMonth = stdTrans[1], stdDay = stdTrans[2];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4457);
dstMonth = dstTrans[1], dstDay = dstTrans[2];

            // northern hemisphere
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4460);
isDSTActive = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4461);
if (dstMonth < stdMonth) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4462);
isDSTActive = month > dstMonth && month < stdMonth;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4463);
isDSTActive = isDSTActive || (month === dstMonth && day >= dstDay);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4464);
isDSTActive = isDSTActive || (month === stdMonth && day <  stdDay);
            }

            // sorthern hemisphere
            else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4469);
isDSTActive = month < dstMonth || month > stdMonth;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4470);
isDSTActive = isDSTActive || (month === dstMonth && day <  dstDay);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4471);
isDSTActive = isDSTActive || (month === stdMonth && day >= stdDay);
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4474);
return isDSTActive? 1:0;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4476);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isValidTimezoneId", 4486);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4487);
return (AjxTimezone._CLIENT2RULE[tzId] !== undefined || TimezoneLinks[tzId] !== undefined);
    }
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4491);
Y.mix(AjxTimezone.prototype, {

    /**
     * Get short name of timezone
     * @method getShortName
     * @param tzId {String} Timezone ID
     * @return {String}
     */
    getShortName: function(tzId) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getShortName", 4499);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4500);
var shortName = this.localeData[tzId + "_Z_short"] || ["GMT",AjxTimezone._SHORT_NAMES[tzId]].join("");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4501);
return shortName;
    },

    /**
     * Get medium length name of timezone
     * @method getMediumName
     * @param tzId {String} Timezone ID
     * @return {String}
     */
    getMediumName: function(tzId) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getMediumName", 4510);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4511);
var mediumName = this.localeData[tzId + "_Z_abbreviated"] || ['(',this.getShortName(tzId),') ',tzId].join("");
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4512);
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

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4524);
AjxTimezone._initTimezoneRules();

/**
 * Timezone performs operations on a given timezone string represented in Olson tz database
 * @class Timezone
 * @constructor
 * @param {String} tzId TimeZone ID as in Olson tz database
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4532);
Y.Date.Timezone = function(tzId) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "Timezone", 4532);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4533);
var normalizedId = Timezone.getNormalizedTimezoneId(tzId);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4534);
if(normalizedId === "") {
	_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4535);
Y.error("Could not find timezone: " + tzId);
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4537);
this.tzId = normalizedId;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4539);
this._ajxTimeZoneInstance = new AjxTimezone();
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4542);
Y.namespace("Date");
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4543);
Timezone = Y.Date.Timezone;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4545);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_getDOY", 4554);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4555);
var oneJan = new Date(date.getFullYear(),0,1);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4556);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_floatToInt", 4567);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4568);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getCurrentTimezoneIds", 4578);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4579);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getTimezoneIdForOffset", 4592);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4593);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getUnixTimeFromWallTime", 4603);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4607);
if(!Y.Lang.isValue( walltime.year )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4608);
walltime.year = new Date().getFullYear();	//Default to current year
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4610);
if(!Y.Lang.isValue( walltime.mon )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4611);
walltime.mon = 0;				//Default to January
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4613);
if(!Y.Lang.isValue( walltime.mday )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4614);
walltime.mday = 1;				//Default to first of month
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4616);
if(!Y.Lang.isValue( walltime.hour )) {			//Default to 12 midnight
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4617);
walltime.hour = 0;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4619);
if(!Y.Lang.isValue( walltime.min )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4620);
walltime.min = 0;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4622);
if(!Y.Lang.isValue( walltime.sec )) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4623);
walltime.sec = 0;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4625);
if(!Y.Lang.isValue( walltime.gmtoff )) {			//Default to UTC
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4626);
walltime.gmtoff = 0;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4629);
var utcTime = Date.UTC(walltime.year, walltime.mon, walltime.mday, walltime.hour, walltime.min, walltime.sec);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4630);
utcTime -= walltime.gmtoff*1000;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4632);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isValidTimestamp", 4643);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4644);
var regex = /^(\d\d\d\d)\-([0-1][0-9])\-([0-3][0-9])([T ])([0-2][0-9]):([0-6][0-9]):([0-6][0-9])(Z|[+\-][0-1][0-9]:[0-3][0-9])?$/,
            matches = (new RegExp(regex)).exec(timeStamp),
            year, month, day, hours, minutes, seconds, tZone,
            m31, maxDays,
            dateTimeSeparator, offset;

        //No match
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4651);
if(matches === null) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4652);
return false;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4655);
year = parseInt(matches[1], 10),
        month = parseInt(matches[2], 10),
        day = parseInt(matches[3], 10),
        dateTimeSeparator = matches[4],
        hours = parseInt(matches[5], 10),
        minutes = parseInt(matches[6], 10),
        seconds = parseInt(matches[7], 10),
        tZone = matches[8];
        //Month should be in 1-12
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4664);
if(month < 1 || month > 12) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4665);
return false;
        }

        //Months with 31 days
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4669);
m31 = [1,3,5,7,8,10,12];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4670);
maxDays = 30;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4671);
if(Y.Array.indexOf(m31,month) !== -1) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4672);
maxDays = 31;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4673);
if(month === 2) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4674);
if(year % 400 === 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4675);
maxDays = 29;
            } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4676);
if(year % 100 === 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4677);
maxDays = 28;
            } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4678);
if(year % 4 === 0) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4679);
maxDays = 29;
            } else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4681);
maxDays = 28;
            }}}
        }}

        //Day should be valid day for month
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4686);
if(day < 1 || day > maxDays) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4687);
return false;
        }

        //Hours should be in 0-23
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4691);
if(hours < 0 || hours > 23) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4692);
return false;
        }

        //Minutes and Seconds should in 0-59
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4696);
if(minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4697);
return false;
        }

        //Now verify timezone
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4701);
if(dateTimeSeparator === " " && tZone === undefined) {
            //SQL Format
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4703);
return true;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4704);
if(dateTimeSeparator === "T" && tZone !== undefined) {
            //RFC3339 Format
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4706);
offset = 0;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4707);
if(tZone !== "Z") {
                //Not UTC TimeZone
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4709);
offset = parseInt(tZone.substr(1,3), 10)*60 + parseInt(tZone.substr(4), 10);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4710);
offset = offset*60;	//To seconds

                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4712);
offset = offset * (tZone.charAt(0) === "+" ? 1 : -1);
            }
            //Check offset in timeStamp with passed rawOffset
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4715);
if(offset === rawOffset) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4716);
return true;
            }
        }}

        //If reached here, wrong format
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4721);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "isValidTimezoneId", 4732);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4733);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getNormalizedTimezoneId", 4744);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4745);
if(!Timezone.isValidTimezoneId(tzId)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4746);
return "";
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4748);
var normalizedId,
            next = tzId;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4751);
do {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4752);
normalizedId = next;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4753);
next = TimezoneLinks[normalizedId];
        }while( next !== undefined );

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4756);
return normalizedId;
    }
});

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4760);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_parseRFC3339", 4769);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4770);
var regexp = /(\d+)(\-)?(\d+)(\-)?(\d+)(T)?(\d+)(:)?(\d+)(:)?(\d+)(\.\d+)?(Z|([+\-])(\d+)(:)?(\d+))/,
            result = new Date(),
            d = dString.match(regexp),
            offset = 0;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4775);
result.setUTCDate(1);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4776);
result.setUTCFullYear(parseInt(d[1],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4777);
result.setUTCMonth(parseInt(d[3],10) - 1);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4778);
result.setUTCDate(parseInt(d[5],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4779);
result.setUTCHours(parseInt(d[7],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4780);
result.setUTCMinutes(parseInt(d[9],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4781);
result.setUTCSeconds(parseInt(d[11],10));
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4782);
if (d[12]) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4783);
result.setUTCMilliseconds(parseFloat(d[12]) * 1000);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4785);
result.setUTCMilliseconds(0);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4787);
if (d[13] !== 'Z') {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4788);
offset = (d[15] * 60) + parseInt(d[17],10);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4789);
offset *= ((d[14] === '-') ? -1 : 1);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4790);
result.setTime(result.getTime() - offset * 60 * 1000);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4792);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_parseSQLFormat", 4803);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4804);
var dateTime = dString.split(" "),
            date = dateTime[0].split("-"),
            time = dateTime[1].split(":"),
            offset = AjxTimezone.getOffset(this.tzId, new Date(date[0], date[1] - 1, date[2]));
            
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4809);
return new Date(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) - offset*60*1000);
    },

    /**
     * Return a short name for the timezone
     * @method getShortName
     * @return {String} Short name
     */
    getShortName: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getShortName", 4817);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4818);
return this._ajxTimeZoneInstance.getShortName(this.tzId);
    },

    /**
     * Return a medium length name for the timezone
     * @method getMediumName
     * @return {String} Medium length name
     */
    getMediumName: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getMediumName", 4826);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4827);
return this._ajxTimeZoneInstance.getMediumName(this.tzId);
    },

    /**
     * Return a long name for the timezone
     * @method getLongName
     * @return {String} Long name
     */
    getLongName: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getLongName", 4835);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4836);
return this._ajxTimeZoneInstance.getLongName(this.tzId);
    },

    /**
     * Given a timevalue representation in RFC 3339 or SQL format, convert to UNIX time - seconds since Epoch ie., since 1970-01-01T00:00:00Z
     * @method convertToIncrementalUTC
     * @param {String} timeValue TimeValue representation in RFC 3339 or SQL format.
     * @return {Number} UNIX time - time in seconds since Epoch
     */
    convertToIncrementalUTC: function(timeValue) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "convertToIncrementalUTC", 4845);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4846);
if(Y.Array.indexOf(timeValue,"T") !== -1) {
            //RFC3339
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4848);
return this._parseRFC3339(timeValue).getTime() / 1000;
        } else {
            //SQL
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4851);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "convertUTCToRFC3339Format", 4861);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4862);
var uTime = new Date(timeValue * 1000),
            offset = AjxTimezone.getOffset(this.tzId, uTime),
            offsetString = "Z",
            rfc3339, offsetSign;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4867);
if(offset !== 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4868);
offsetSign = (offset > 0 ? "+": "-");
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4869);
offsetString = offsetSign + Y.Number._zeroPad(Math.abs(Timezone._floatToInt(offset/60)), 2) + ":" + Y.Number._zeroPad(offset % 60, 2);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4872);
uTime.setTime(timeValue*1000 + offset*60*1000);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4874);
rfc3339 = Y.Number._zeroPad(uTime.getUTCFullYear(), 4) + "-"
                      + Y.Number._zeroPad((uTime.getUTCMonth() + 1), 2) + "-" + Y.Number._zeroPad(uTime.getUTCDate(), 2)
                      + "T" + Y.Number._zeroPad(uTime.getUTCHours(), 2) + ":" + Y.Number._zeroPad(uTime.getUTCMinutes(), 2)
                      + ":" + Y.Number._zeroPad(uTime.getUTCSeconds(), 2) + offsetString;

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4879);
return rfc3339;
    },

    /**
     * Given UNIX Time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to SQL Format - "yyyy-mm-dd hh:mm:ss"
     * @method convertUTCToSQLFormat
     * @param {Number} timeValue time value in seconds since Epoch.
     * @return {String} SQL Format timevalue - "yyyy-mm-dd hh:mm:ss"
     */
    convertUTCToSQLFormat: function(timeValue) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "convertUTCToSQLFormat", 4888);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4889);
var uTime = new Date(timeValue * 1000),
            offset = AjxTimezone.getOffset(this.tzId, uTime),
            sqlDate;
            
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4893);
uTime.setTime(timeValue*1000 + offset*60*1000);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4895);
sqlDate = Y.Number._zeroPad(uTime.getUTCFullYear(), 4) + "-" + Y.Number._zeroPad((uTime.getUTCMonth() + 1), 2)
                      + "-" + Y.Number._zeroPad(uTime.getUTCDate(), 2) + " " + Y.Number._zeroPad(uTime.getUTCHours(), 2)
                      + ":" + Y.Number._zeroPad(uTime.getUTCMinutes(), 2) + ":" + Y.Number._zeroPad(uTime.getUTCSeconds(), 2);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4899);
return sqlDate;
    },

    /**
     * Gets the offset of this timezone in seconds from UTC
     * @method getRawOffset
     * @return {Number} offset of this timezone in seconds from UTC
     */
    getRawOffset: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getRawOffset", 4907);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4908);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getWallTimeFromUnixTime", 4918);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4919);
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

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4936);
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

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 4957);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5003);
Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__zDateFormat", 5003);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5004);
DateFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5005);
this.timeZone = new Y.Date.Timezone(timeZoneId);
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5007);
if (pattern === null) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5008);
return;
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5010);
var head, tail, segment, i, c, count, field;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5011);
for (i = 0; i < pattern.length; i++) {
        // literal
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5013);
c = pattern.charAt(i);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5014);
if (c === "'") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5015);
head = i + 1;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5016);
for (i++ ; i < pattern.length; i++) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5017);
c = pattern.charAt(i);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5018);
if (c === "'") {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5019);
if (i + 1 < pattern.length && pattern.charAt(i + 1) === "'") {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5020);
pattern = pattern.substr(0, i) + pattern.substr(i + 1);
                    }
                    else {
                        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5023);
break;
                    }
                }
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5027);
if (i === pattern.length) {
		_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5028);
Y.error("unterminated string literal");
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5030);
tail = i;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5031);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5032);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5033);
continue;
        }

        // non-meta chars
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5037);
head = i;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5038);
while(i < pattern.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5039);
c = pattern.charAt(i);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5040);
if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === "'") {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5041);
break;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5043);
i++;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5045);
tail = i;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5046);
if (head !== tail) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5047);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5048);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5049);
i--;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5050);
continue;
        }
		
        // meta char
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5054);
head = i;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5055);
while(++i < pattern.length) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5056);
if (pattern.charAt(i) !== c) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5057);
break;
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5060);
tail = i--;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5061);
count = tail - head;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5062);
field = pattern.substr(head, count);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5063);
segment = null;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5064);
switch (c) {
            case 'G':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5066);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5067);
break;
            case 'y':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5069);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5070);
break;
            case 'M':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5072);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5073);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5076);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5077);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5080);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5081);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5084);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5085);
break;
            case 'a':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5087);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5088);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5093);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5094);
break;
            case 'm':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5096);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5097);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5100);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5101);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5104);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5105);
break;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5107);
if (segment !== null) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5108);
segment._index = this._segments.length;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5109);
this._segments.push(segment);
        }
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5114);
DateFormat = Y.Date.__zDateFormat;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5115);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5119);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5134);
DateFormat.prototype.format = function(object, relative) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5134);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5135);
var useRelative = false,
        s = [],
        datePattern = false,
        i;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5140);
if(relative !== null && relative !== "") {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5141);
useRelative = true;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5144);
for (i = 0; i < this._segments.length; i++) {
        //Mark datePattern sections in case of relative dates
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5146);
if(this._segments[i].toString().indexOf("text: \"<datePattern>\"") === 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5147);
if(useRelative) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5148);
s.push(relative);
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5150);
datePattern = true;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5151);
continue;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5153);
if(this._segments[i].toString().indexOf("text: \"</datePattern>\"") === 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5154);
datePattern = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5155);
continue;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5157);
if(!datePattern || !useRelative) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5158);
s.push(this._segments[i].format(object));
        }
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5161);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5179);
DateFormat.DateSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "DateSegment", 5179);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5180);
DateFormat.DateSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5182);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5199);
DateFormat.EraSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "EraSegment", 5199);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5200);
DateFormat.EraSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5202);
Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);

/**
 * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5210);
DateFormat.EraSegment.prototype.format = function(/*date*/) {
    // NOTE: Only support current era at the moment...
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5210);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5212);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5230);
DateFormat.YearSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "YearSegment", 5230);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5231);
DateFormat.YearSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5233);
Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5235);
Y.mix(DateFormat.YearSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5241);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5242);
return "dateYear: \""+this._s+'"';
    },

    /**
     * Format date and get the year segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5251);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5252);
var year = String(date.getFullYear());
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5253);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5272);
DateFormat.MonthSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "MonthSegment", 5272);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5273);
DateFormat.MonthSegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5274);
this.initialize();
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5276);
Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5278);
Y.mix(DateFormat.MonthSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5284);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5285);
return "dateMonth: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "initialize", 5292);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5293);
DateFormat.MonthSegment.MONTHS = {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5294);
DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [
            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,
            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,
            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,
            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort
        ];

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5301);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5302);
DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [
            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,
            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,
            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,
            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium
        ];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5308);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5322);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5323);
var month = date.getMonth();
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5324);
switch (this._s.length) {
            case 1:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5326);
return String(month + 1);
            case 2:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5328);
return Y.Number._zeroPad(month + 1, 2);
            case 3:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5330);
return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];
            case 5:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5332);
return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5334);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5353);
DateFormat.WeekSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "WeekSegment", 5353);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5354);
DateFormat.WeekSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5356);
Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);

/**
 * Format date and get the week segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5364);
DateFormat.WeekSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5364);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5365);
var year = date.getYear(),
        month = date.getMonth(),
        day = date.getDate(),
	ofYear = /w/.test(this._s),
        date2 = new Date(year, ofYear ? 0 : month, 1),
        week = 0;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5371);
while (true) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5372);
week++;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5373);
if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5374);
break;
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5376);
date2.setDate(date2.getDate() + 7);
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5379);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5396);
DateFormat.DaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "DaySegment", 5396);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5397);
DateFormat.DaySegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5399);
Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);

/**
 * Format date and get the day segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5407);
DateFormat.DaySegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5407);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5408);
var month = date.getMonth(),
        day = date.getDate(),
        year = date.getYear(),
        date2;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5413);
if (/D/.test(this._s) && month > 0) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5414);
do {
            // set date to first day of month and then go back one day
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5416);
date2 = new Date(year, month, 1);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5417);
date2.setDate(0);
			
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5419);
day += date2.getDate();
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5420);
month--;
        }while (month > 0);
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5423);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5441);
DateFormat.WeekdaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "WeekdaySegment", 5441);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5442);
DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5443);
this.initialize();
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5445);
Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5447);
Y.mix(DateFormat.WeekdaySegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5453);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5454);
return "dateDay: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "initialize", 5461);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5462);
DateFormat.WeekdaySegment.WEEKDAYS = {};
        // NOTE: The short names aren't available in Java so we have to define them.
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5464);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [
            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,
            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,
            ShortNames.weekdaySatShort
        ];

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5470);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5471);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [
            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,
            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,
            Formats.weekdaySatMedium
        ];
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5476);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5489);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5490);
var weekday = date.getDay(),
            style;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5492);
if (/E/.test(this._s)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5493);
switch (this._s.length) {
                case 4:
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5495);
style = DateFormat.LONG;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5496);
break;
                case 5:
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5498);
style = DateFormat.SHORT;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5499);
break;
                default:
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5501);
style = DateFormat.MEDIUM;
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5503);
return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5505);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5524);
DateFormat.TimeSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "TimeSegment", 5524);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5525);
DateFormat.TimeSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5527);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5544);
DateFormat.HourSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "HourSegment", 5544);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5545);
DateFormat.HourSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5547);
Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5549);
Y.mix(DateFormat.HourSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5555);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5556);
return "timeHour: \""+this._s+'"';
    },

    /**
     * Format date and get the hour segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5565);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5566);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5567);
if (hours > 12 && /[hK]/.test(this._s)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5568);
hours -= 12;
        }
        else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5570);
if (hours === 0 && /[h]/.test(this._s)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5571);
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
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5581);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5600);
DateFormat.MinuteSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "MinuteSegment", 5600);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5601);
DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5603);
Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5605);
Y.mix(DateFormat.MinuteSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5611);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5612);
return "timeMinute: \""+this._s+'"';
    },

    /**
     * Format date and get the minute segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5621);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5622);
var minutes = date.getMinutes();
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5623);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5642);
DateFormat.SecondSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "SecondSegment", 5642);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5643);
DateFormat.SecondSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5645);
Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);

/**
 * Format date and get the second segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5653);
DateFormat.SecondSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5653);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5654);
var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5655);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5673);
DateFormat.AmPmSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "AmPmSegment", 5673);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5674);
DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5676);
Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5678);
Y.mix(DateFormat.AmPmSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5684);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5685);
return "timeAmPm: \""+this._s+'"';
    },

    /**
     * Format date and get the AM/PM segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5694);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5695);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5696);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5715);
DateFormat.TimezoneSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "TimezoneSegment", 5715);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5716);
DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5718);
Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5720);
Y.mix(DateFormat.TimezoneSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "toString", 5726);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5727);
return "timeTimezone: \""+this._s+'"';
    },

    /**
     * Format date and get the timezone segment.
     * @method format
     * //param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(/*date*/) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5736);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5737);
var timeZone = this.getFormat().timeZone;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5738);
if (/Z/.test(this._s)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5739);
return timeZone.getShortName();
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5741);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5760);
Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__BuddhistDateFormat", 5760);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5761);
BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);
        
    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5764);
var segments = this._segments, i;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5765);
for(i=0; i<segments.length; i++) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5766);
if(segments[i] instanceof DateFormat.YearSegment) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5767);
segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5768);
if (segments[i] instanceof DateFormat.EraSegment) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5769);
segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);
        }}
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5774);
BuddhistDateFormat = Y.Date.__BuddhistDateFormat;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5775);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5786);
BuddhistDateFormat.YearSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "YearSegment", 5786);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5787);
BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5790);
Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);

/**
 * Format date and get the year segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5798);
BuddhistDateFormat.YearSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5798);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5799);
var year = date.getFullYear();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5800);
year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5801);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5814);
BuddhistDateFormat.EraSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "EraSegment", 5814);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5815);
BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5818);
Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);

/**
 * Format date and get the era segment.
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5826);
BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 5826);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5827);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5841);
Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {
        
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__YDateFormat", 5841);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5843);
if(timeZone === null) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5844);
timeZone = "Etc/GMT";
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5847);
this._Formats = Y.Intl.get("datatype-date-advanced-format");
        
    //If not valid time zone
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5850);
if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {
	_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5851);
Y.error("Could not find timezone: " + timeZone);
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5854);
this._timeZone = timeZone;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5855);
this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5857);
this._dateFormat = dateFormat || 0;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5858);
this._timeFormat = timeFormat || 0;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5859);
this._timeZoneFormat = timeZoneFormat || 0;

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5861);
this._relative = false;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5862);
this._pattern = this._generatePattern();

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5864);
var locale = Y.Intl.getLang("datatype-date-advanced-format");
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5866);
if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {
        //Use buddhist calendar
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5868);
this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);
    } else {
        //Use gregorian calendar
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5871);
this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5875);
YDateFormat = Y.Date.__YDateFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5877);
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

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5939);
Y.mix(YDateFormat.prototype, {
    /**
     * Generate date pattern for selected format. For internal use only.
     * @method _generateDatePattern
     * @for Date.__YDateFormat
     * @private
     * @return {String} Date pattern
     */
    _generateDatePattern: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generateDatePattern", 5947);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5948);
var format = this._dateFormat;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5949);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5950);
format = Y.Date.DATE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5953);
if(format === null) { return ""; }
        /*jshint bitwise: false*/
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5955);
if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5956);
this._relative = true;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5957);
format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;
        }
        /*jshint bitwise: true*/
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5960);
switch(format) {
            //Use relative only for formats with day component
            case Y.Date.DATE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5963);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5964);
return "";
            case Y.Date.DATE_FORMATS.WYMD_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5966);
return this._Formats.WYMD_long;
            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5968);
return this._Formats.WYMD_abbreviated;
            case Y.Date.DATE_FORMATS.WYMD_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5970);
return this._Formats.WYMD_short;
            case Y.Date.DATE_FORMATS.WMD_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5972);
return this._Formats.WMD_long;
            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5974);
return this._Formats.WMD_abbreviated;
            case Y.Date.DATE_FORMATS.WMD_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5976);
return this._Formats.WMD_short;
            case Y.Date.DATE_FORMATS.YMD_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5978);
return this._Formats.YMD_long;
            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5980);
return this._Formats.YMD_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5982);
return this._Formats.YMD_short;
            case Y.Date.DATE_FORMATS.YM_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5984);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5985);
return this._Formats.YM_long;
            case Y.Date.DATE_FORMATS.MD_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5987);
return this._Formats.MD_long;
            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5989);
return this._Formats.MD_abbreviated;
            case Y.Date.DATE_FORMATS.MD_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5991);
return this._Formats.MD_short;
            case Y.Date.DATE_FORMATS.W_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5993);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5994);
return this._Formats.W_long;
            case Y.Date.DATE_FORMATS.W_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5996);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5997);
return this._Formats.W_abbreviated;
            case Y.Date.DATE_FORMATS.M_LONG:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 5999);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6000);
return this._Formats.M_long;
            case Y.Date.DATE_FORMATS.M_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6002);
this._relative = false;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6003);
return this._Formats.M_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_FULL:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6005);
return this._Formats.YMD_full;
            default:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6007);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generateTimePattern", 6017);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6018);
var format = this._timeFormat;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6019);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6020);
format = Y.Date.TIME_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6023);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6024);
switch(format) {
            case Y.Date.TIME_FORMATS.NONE:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6026);
return "";
            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6028);
return this._Formats.HM_abbreviated;
            case Y.Date.TIME_FORMATS.HM_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6030);
return this._Formats.HM_short;
            case Y.Date.TIME_FORMATS.H_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6032);
return this._Formats.H_abbreviated;
            default:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6034);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generateTimeZonePattern", 6044);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6045);
var format = this._timeZoneFormat;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6046);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6047);
format = Y.Date.TIMEZONE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6050);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6051);
switch(format) {
            case Y.Date.TIMEZONE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6053);
return "";
            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6055);
return "z";
            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6057);
return "Z";
            default:
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6059);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_generatePattern", 6069);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6070);
var datePattern = this._generateDatePattern(),
            timePattern = this._generateTimePattern(),
            timeZonePattern = this._generateTimeZonePattern(),
            pattern = "";

        //Combine patterns. Mark date pattern part, to use with relative dates.
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6076);
if(datePattern !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6077);
datePattern = "'<datePattern>'" + datePattern + "'</datePattern>'";
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6080);
if(timePattern !== "" && timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6081);
pattern = this._Formats.DateTimeTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6082);
if (timePattern !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6083);
pattern = this._Formats.DateTimeCombination;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6084);
if(timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6085);
pattern = this._Formats.DateTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6086);
if(datePattern !== ""){
            //Just date
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6088);
pattern = "{1}";
        }}}}
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6091);
pattern = pattern.replace("{0}", timePattern).replace("{1}", datePattern).replace("{2}", timeZonePattern);
        
        //Remove unnecessary whitespaces
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6094);
pattern = Y.Lang.trim(pattern.replace(/\s\s+/g, " "));

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6096);
return pattern;
    },

    /**
     * Formats a date
     * @method format
     * @param {Date} date The date to be formatted.
     * @return {String} The formatted string
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6105);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6106);
if(date === null || !Y.Lang.isDate(date)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6107);
Y.error("format called without a date.");
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6110);
var offset = this._timeZoneInstance.getRawOffset() * 1000,
            relativeDate = null,
            today = new Date(),
            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6116);
date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6118);
if(this._relative) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6119);
if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6120);
relativeDate = this._Formats.today;
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6123);
if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6124);
relativeDate = this._Formats.tomorrow;
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6127);
if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6128);
relativeDate = this._Formats.yesterday;
            }
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6131);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6149);
Y.Date.__YRelativeTimeFormat = function(style) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__YRelativeTimeFormat", 6149);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6150);
if(style === null) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6151);
style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;
    } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6152);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6153);
style = Y.Date.RELATIVE_TIME_FORMATS[style];
    }}
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6156);
this.patterns = Y.Intl.get("datatype-date-advanced-format");
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6157);
this.style = style;
		
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6159);
switch(style) {
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6161);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6162);
this.abbr = true;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6163);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6165);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6166);
this.abbr = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6167);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6169);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6170);
this.abbr = true;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6171);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6173);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6174);
this.abbr = false;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6175);
break;
        default:
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6177);
Y.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS");
    }
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6181);
YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6183);
Y.mix(Y.Date, {
    /**
     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.
     * @property
     * @type Number|function
     * @static
     */
    currentDate: function() { _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "currentDate", 6190);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6190);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6217);
YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6217);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6218);
if(relativeTo === null) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6219);
relativeTo = (new Date()).getTime()/1000;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6220);
if(timeValue > relativeTo) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6221);
Y.error("timeValue must be in the past");
        }
    } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6223);
if(timeValue > relativeTo) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6224);
Y.error("relativeTo must be greater than or equal to timeValue");
    }}

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6227);
var date = new Date((relativeTo - timeValue)*1000),
        result = [],
        numUnits = this.numUnits,
        value = date.getUTCFullYear() - 1970,	//Need zero-based index
        text, pattern, i;
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6233);
if(value > 0) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6234);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6235);
text = value + " " + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6236);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6238);
text = value + " " + (value !== 1 ? this.patterns.years : this.patterns.year);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6239);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6241);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6244);
value = date.getUTCMonth();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6245);
if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6246);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6247);
text = value + " " + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6248);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6250);
text = value + " " + (value !== 1 ? this.patterns.months : this.patterns.month);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6251);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6253);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6256);
value = date.getUTCDate()-1;			//Need zero-based index
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6257);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6258);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6259);
text = value + " " + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6260);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6262);
text = value + " " + (value !== 1 ? this.patterns.days : this.patterns.day);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6263);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6265);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6268);
value = date.getUTCHours();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6269);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6270);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6271);
text = value + " " + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6272);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6274);
text = value + " " + (value !== 1 ? this.patterns.hours : this.patterns.hour);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6275);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6277);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6280);
value = date.getUTCMinutes();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6281);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6282);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6283);
text = value + " " + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6284);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6286);
text = value + " " + (value !== 1 ? this.patterns.minutes : this.patterns.minute);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6287);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6289);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6292);
value = date.getUTCSeconds();
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6293);
if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6294);
if(this.abbr) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6295);
text = value + " " + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6296);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6298);
text = value + " " + (value !== 1 ? this.patterns.seconds : this.patterns.second);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6299);
result.push(text);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6301);
numUnits--;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6304);
pattern = (result.length === 1) ? this.patterns["RelativeTime/oneUnit"] : this.patterns["RelativeTime/twoUnits"];
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6306);
for(i=0; i<result.length; i++) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6307);
pattern = pattern.replace("{" + i + "}", result[i]);
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6309);
for(i=result.length; i<this.numUnits; i++) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6310);
pattern = pattern.replace("{" + i + "}", "");
    }
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6313);
pattern = Y.Lang.trim(pattern.replace(/\s+/g, " "));
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6315);
return pattern;
};
/**
 * YDurationFormat class formats time in a language independent manner.
 * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages.
 */

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6322);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_stripDecimals", 6332);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6333);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6345);
Y.Date.__YDurationFormat = function(style) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "__YDurationFormat", 6345);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6346);
if(style && Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6347);
style = Y.Date.DURATION_FORMATS[style];
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6349);
this.style = style;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6350);
this.patterns = Y.Intl.get("datatype-date-advanced-format");
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6353);
YDurationFormat = Y.Date.__YDurationFormat;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6355);
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

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6370);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_getDuration_XML", 6387);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6388);
var regex = new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),
            matches = xmlDuration.match(regex);
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6391);
if(matches === null) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6392);
Y.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'");
        }
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6395);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "_getDuration_Seconds", 6411);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6412);
var duration = {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6413);
if(timeValueInSeconds < 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6414);
Y.error("TimeValue cannot be negative");
        }
                
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6417);
duration.hours = Y.Number._stripDecimals(timeValueInSeconds / 3600);
                
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6419);
timeValueInSeconds %= 3600;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6420);
duration.minutes = Y.Number._stripDecimals(timeValueInSeconds / 60);
                
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6422);
timeValueInSeconds %= 60;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6423);
duration.seconds = timeValueInSeconds;
        
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6425);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6444);
YDurationFormat.prototype.format = function(oDuration) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6444);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6445);
if(Y.Lang.isNumber(oDuration)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6446);
oDuration = YDurationFormat._getDuration_Seconds(oDuration);
    } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6447);
if(Y.Lang.isString(oDuration)) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6448);
oDuration = YDurationFormat._getDuration_XML(oDuration);
    }}
    
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6451);
var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,
        result = {
            hours: "",
            minutes: "",
            seconds: ""
        },
        resultPattern = "";

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6459);
if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6460);
if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6461);
if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }
   
    //Test minutes and seconds for invalid values
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6464);
if(oDuration.minutes > 59 || oDuration.seconds > 59) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6465);
Y.error("Minutes and Seconds should be less than 60");
    }
    
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6468);
if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6469);
resultPattern = this.patterns.HMS_long;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6470);
if(oDuration.hours >= 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6471);
result.hours = Y.Number.format(oDuration.hours) + " " + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6474);
if(oDuration.minutes >= 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6475);
result.minutes = oDuration.minutes + " " + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6478);
if(oDuration.seconds >= 0) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6479);
result.seconds = oDuration.seconds + " " + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);
        }
    } else {                                            //HMS_SHORT
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6482);
resultPattern = this.patterns.HMS_short;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6483);
result = {
             hours: Y.Number.format(oDuration.hours),
             minutes: Y.Number._zeroPad(oDuration.minutes, 2),
             seconds: Y.Number._zeroPad(oDuration.seconds, 2)
        };
    }
        
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6490);
resultPattern = resultPattern.replace("{0}", result.hours);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6491);
resultPattern = resultPattern.replace("{1}", result.minutes);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6492);
resultPattern = resultPattern.replace("{2}", result.seconds);
       
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6495);
resultPattern = Y.Lang.trim(resultPattern.replace(/\s\s+/g, " "));
       
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6497);
return resultPattern;
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6500);
Y.Date.oldFormat = Y.Date.format;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6502);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6526);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6527);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6528);
if(oConfig.format && Y.Lang.isString(oConfig.format)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6529);
return Y.Date.oldFormat(oDate, oConfig);
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6532);
if(!Y.Lang.isDate(oDate)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6533);
return Y.Lang.isValue(oDate) ? oDate : "";
        }
                
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6536);
var formatter, relativeTo;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6537);
if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6538);
formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6539);
return formatter.format(oDate);
        }
    
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6542);
relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6543);
if(oConfig.relativeTimeFormat) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6544);
formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6545);
return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6548);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "formatDuration", 6564);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6565);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6566);
return new YDurationFormat(oConfig.style).format(oDuration);
    }
}, true);
/**
 * Formatter base class
 * @class MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6577);
Y.Intl.MsgBaseFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "MsgBaseFormatter", 6577);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6578);
this.values = values;
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6581);
Formatter = Y.Intl.MsgBaseFormatter;

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6583);
Y.mix(Formatter.prototype, {
    /**
     * Get value of key
     * @method getValue
     * @param key {String|Number} Key/index of value in the object/array 'values'
     * @return Value from the data in 'values'
     */
    getValue: function(key) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getValue", 6590);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6591);
if(Y.Lang.isArray(this.values)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6592);
key = parseInt(key, 10);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6594);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6604);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6605);
if(!params || !params.key) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6606);
return false;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6609);
var value = this.getValue(params.key);
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6611);
if(value !== undefined) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6612);
params.value = value;
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6613);
return true;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6616);
return false;
    },

    /**
     * Format string. Will be overridden in descendants
     * @method format
     */
    format: function(/*str, config*/) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6623);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6624);
Y.error('Not implemented');	//Must override in descendants
    }
});

//For date and time formatters
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6629);
Y.mix(Formatter, {
    /**
     * Create an instance of the formatter
     * @method createInstance
     * @static
     * //param values {Array|Object} The data to be processed and inserted.
     */
    createInstance: function(/*values*/) {
        //return new Formatter(values);
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6636);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6638);
Y.error('Not implemented');	//Must override in descendants
    },

    /**
     * Get current timezone. Used for time format
     * @method getCurrentTimeZone
     * @return {Y.Date.Timezone}
     */
    getCurrentTimeZone: function() {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getCurrentTimeZone", 6646);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6647);
var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6648);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6660);
Y.Intl.StringFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "StringFormatter", 6660);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6661);
StringFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6662);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6665);
StringFormatter = Y.Intl.StringFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6666);
Y.extend(StringFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6674);
StringFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6674);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6675);
return new StringFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6678);
Y.mix(StringFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6686);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6687);
if(matches && matches[1]) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6688);
params.key = matches[1];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6689);
if(Formatter.prototype.getParams.call(this, params)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6690);
return true;
            }
        }
	
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6694);
return false;
    },

    /**
     * Format all instances in str that can be handled by StringFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6703);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6704);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6707);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6708);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6710);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6712);
str = str.replace(matches[0], params.value);
            }

        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6717);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6728);
Y.Intl.DateFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "DateFormatter", 6728);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6729);
DateFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6730);
this.styles = {
        "short":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],
        "medium": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],
        "long":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],
        "full":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]
    };
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6736);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6739);
DateFormatter = Y.Intl.DateFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6740);
Y.extend(DateFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6748);
DateFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6748);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6749);
return new DateFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6752);
Y.mix(DateFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6760);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6761);
if(matches) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6762);
if(matches[1]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6763);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6765);
if(matches[3]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6766);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6770);
if(!params.style) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6771);
params.style = "medium";
        }			//If no style, default to medium

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6774);
if(!this.styles[params.style]) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6775);
return false;
        }	//Invalid style

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6778);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6779);
return true;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6782);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6792);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6793);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, style, result;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6796);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6797);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6799);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6801);
style = this.styles[params.style];
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6802);
result = Y.Date.format(new Date(params.value), {
                    timezone: config.timezone || Formatter.getCurrentTimeZone(),
                    dateFormat: style[0],
                    timeFormat: style[1],
                    timezoneFormat: style[2]
                });
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6808);
str = str.replace(matches[0], result);
            }

        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6813);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6824);
Y.Intl.TimeFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "TimeFormatter", 6824);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6825);
TimeFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6826);
this.styles = {
        "short": [ 0, Y.Date.TIME_FORMATS.HM_SHORT, Y.Date.TIMEZONE_FORMATS.NONE ],
        "medium": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.NONE ],
        "long": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_SHORT ],
        "full": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED ]
    };
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6832);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6835);
TimeFormatter = Y.Intl.TimeFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6836);
Y.extend(TimeFormatter, DateFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6844);
TimeFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6844);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6845);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6856);
Y.Intl.NumberFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "NumberFormatter", 6856);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6857);
NumberFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6858);
this.styles = {
        "integer": Y.Number.STYLES.NUMBER_STYLE,
        "percent": Y.Number.STYLES.PERCENT_STYLE,
        "currency": Y.Number.STYLES.CURRENCY_STYLE
    };
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6863);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6866);
NumberFormatter = Y.Intl.NumberFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6867);
Y.extend(NumberFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6875);
NumberFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6875);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6876);
return new NumberFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6879);
Y.mix(NumberFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6887);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6888);
if(matches) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6889);
if(matches[1]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6890);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6892);
if(matches[3]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6893);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6897);
if(!params.style) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6898);
params.style = "integer";	//If no style, default to medium
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6899);
params.showDecimal = true;	//Show decimal parts too
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6902);
if(!this.styles[params.style]) {	//Invalid style
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6903);
return false;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6906);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6907);
return true;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6910);
return false;
    },

    /**
     * Format all instances in str that can be handled by NumberFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 6919);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6920);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, config;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6923);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6924);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6926);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6928);
config = {
                    style: this.styles[params.style]
                };
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6931);
if(params.style === "integer" && !params.showDecimal) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6932);
config.parseIntegerOnly = true;
                }
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6934);
str = str.replace(matches[0], Y.Number.format(params.value, config));
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6938);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6949);
Y.Intl.SelectFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "SelectFormatter", 6949);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6950);
SelectFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6951);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6954);
SelectFormatter = Y.Intl.SelectFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6955);
Y.extend(SelectFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6963);
SelectFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 6963);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6964);
return new SelectFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6967);
Y.mix(SelectFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 6975);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6976);
if(matches) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6977);
if(matches[1]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6978);
params.key = matches[1];
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6982);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6983);
return true;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 6986);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parseOptions", 7003);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7004);
var options = {},
            key = "", value = "", current = "",
            i, ch;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7007);
for(i=start; i<str.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7008);
ch = str.charAt(i);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7009);
if (ch === '\\') {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7010);
current += ch + str.charAt(i+1);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7011);
i++;
            } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7012);
if (ch === '}') {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7013);
if(current === "") {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7014);
i++;
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7015);
break;
                }
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7017);
value = current;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7018);
options[key.trim()] = value;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7019);
current = key = value = "";
            } else {_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7020);
if (ch === '{') {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7021);
key = current;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7022);
current = "";
            } else {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7024);
current += ch;
            }}}
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7028);
if(current !== "") {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7029);
return null;
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7032);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "select", 7045);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7046);
for ( var key in options ) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7047);
if( key === "other" ) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7048);
continue;	//Will use this only if everything else fails
            }

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7051);
if( key === params.value ) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7052);
return options[key];
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7056);
return options.other;
    },

    /**
     * Format all instances in str that can be handled by SelectFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 7065);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7066);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, options, result, start;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7069);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7070);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7072);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7074);
options = this.parseOptions(str, regex.lastIndex);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7075);
if(!options) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7076);
continue;
                }

                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7079);
regex.lastIndex = options.next;
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7080);
options = options.options;

                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7082);
result = this.select(options, params);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7083);
if(result) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7084);
start = str.indexOf(matches[0]);
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7085);
str = str.slice(0, start) + result + str.slice(regex.lastIndex);
                }
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7090);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7101);
Y.Intl.PluralFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "PluralFormatter", 7101);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7102);
PluralFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7103);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7106);
PluralFormatter = Y.Intl.PluralFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7107);
Y.extend(PluralFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7115);
PluralFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 7115);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7116);
return new PluralFormatter(values);
};

/**
 * Select output depending on params.value from options
 * @method select
 * @param options {Object} Object containing results for singular/plural
 * @param params {Object} Object containing value
 * @return {String} selected result
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7126);
PluralFormatter.prototype.select = function(options, params) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "select", 7126);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7127);
var result = options.other;
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7128);
if(params.value === 0 && options.zero) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7129);
result = options.zero;
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7131);
if(params.value === 1 && options.one) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7132);
result = options.one;
    }
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7134);
if(params.value === 2 && options.two) {
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7135);
result = options.two;
    }

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7138);
result = result.replace("#", new NumberFormatter({VAL: params.value}).format("{VAL, number, integer}"));	//Use 'number' to format this part

    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7140);
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
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7151);
Y.Intl.ChoiceFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "ChoiceFormatter", 7151);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7152);
ChoiceFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7153);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}";
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7156);
ChoiceFormatter = Y.Intl.ChoiceFormatter;
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7157);
Y.extend(ChoiceFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7165);
ChoiceFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "createInstance", 7165);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7166);
return new ChoiceFormatter(values);
};

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7169);
Y.mix(ChoiceFormatter.prototype, {
    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param choicesStr {String} Choice string from pattern
     * @return {Array} Array of objects containing value(choice), result, and relation
     */
    parseOptions: function(choicesStr) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "parseOptions", 7176);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7177);
var options = [],
            choicesArray = choicesStr.split("|"),
            i, j, choice, relations, rel, mapping, ch;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7180);
for (i=0; i<choicesArray.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7181);
choice = choicesArray[i];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7182);
relations = ['#', '<', '\u2264'];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7183);
for (j=0; j<relations.length; j++) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7184);
rel = relations[j];
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7185);
if(choice.indexOf(rel) !== -1) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7186);
mapping = choice.split(rel);
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7187);
ch = {
                        value: parseInt(mapping[0], 10),
                        result: mapping[1],
                        relation: rel
                    };
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7192);
options.push(ch);
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7193);
break;
                }
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7198);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "getParams", 7208);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7209);
if(SelectFormatter.prototype.getParams.call(this, params, matches)) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7210);
if(matches[2]) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7211);
params.choices = this.parseOptions(matches[2]);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7212);
return params.choices === [] ? false: true;
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7216);
return false;
    },

    /**
     * Select output depending on params.value from options in params.choices
     * @method select
     * @param params {Object} Object containing value and choices
     * @return {String} selected result
     */
    select: function(params) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "select", 7225);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7226);
var choice, value, result, relation, i;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7227);
for (i=0; i<params.choices.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7228);
choice = params.choices[i];
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7229);
value = choice.value, result = choice.result, relation = choice.relation;

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7231);
if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)
                || (relation === '\u2264' && value <= params.value)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7233);
return result;
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7237);
return "";
    },

    /**
     * Format all instances in str that can be handled by ChoiceFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "format", 7246);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7247);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, result;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7250);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7251);
params = {};

            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7253);
if(this.getParams(params, matches)) {
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7254);
result = this.select(params);
                _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7255);
if(result) {
                    _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7256);
str = str.replace(matches[0], result);
                }
            }
        }

        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7261);
return str;
    }
}, true);/**
 * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime.
 * @module intl-format
 * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl
 */

/**
 * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters.
 * If a formatter fails to parse, the next one in the list try to do so.
 */
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7273);
formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter ];

_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7275);
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
        _yuitest_coverfunc("build/gallery-i18n-formats/gallery-i18n-formats.js", "formatMessage", 7316);
_yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7317);
config = config || {};
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7318);
var i, formatter;
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7319);
for(i=0; i<formatters.length; i++) {
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7320);
formatter = formatters[i].createInstance(values);
            _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7321);
pattern = formatter.format(pattern, config);
        }
        _yuitest_coverline("build/gallery-i18n-formats/gallery-i18n-formats.js", 7323);
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
