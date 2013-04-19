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
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].code=["YUI.add('gallery-advanced-number-format', function (Y, NAME) {","","var MODULE_NAME = \"gallery-advanced-number-format\",","    Format = Y.Intl.Utils.BaseFormat,","    NumberFormat, YNumberFormat;","","Y.Number.__advancedFormat = true;","","/**"," * NumberFormat helps you to format and parse numbers for any locale."," * Your code can be completely independent of the locale conventions for decimal points, thousands-separators,"," * or even the particular decimal digits used, or whether the number format is even decimal."," *"," * This module uses parts of zimbra NumberFormat"," *"," * @module datatype-number-advanced-format"," * @requires datatype-number-format, datatype-number-parse"," */","","/**"," * Class to handle Number formatting."," * @class __zNumberFormat"," * @extends Intl.Utils.BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param pattern {String}       The number pattern."," * @param formats {Object}       locale data"," * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only"," */","Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {","    var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,","        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;","    if (arguments.length === 0) { return; }","","    NumberFormat.superclass.constructor.call(this, pattern, formats);","    if (!pattern) { return; }","","    if(pattern === \"{plural_style}\") {","        pattern = this.Formats.decimalFormat;","        this._isPluralCurrency = true;","        this._pattern = pattern;","    }","","    //Default currency","    this.currency = this.Formats.defaultCurrency;","    if(this.currency === undefined || !this.currency) {","        this.currency = \"USD\";","    }","        ","    patterns = pattern.split(/;/);","    pattern = patterns[0];","	","    this._useGrouping = (pattern.indexOf(\",\") !== -1);      //Will be set to true if pattern uses grouping","    this._parseIntegerOnly = (pattern.indexOf(\".\") === -1);  //Will be set to false if pattern contains fractional parts","        ","    //If grouping is used, find primary and secondary grouping","    if(this._useGrouping) {","        numberPattern = pattern.match(/[0#,]+/);","        groupingRegex = new RegExp(\"[0#]+\", \"g\");","        groups = numberPattern[0].match(groupingRegex);","            ","        i = groups.length - 2;","        this._primaryGrouping = groups[i+1].length;","        this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);","    }","        ","    // parse prefix","    i = 0;","        ","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    hasPrefix = results.text !== \"\";","    if (hasPrefix) {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // parse number descriptor","    start = i;","    while (i < pattern.length &&","        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {","        i++;","    }","    end = i;","","    numPattern = pattern.substring(start, end);","    e = numPattern.indexOf(this.Formats.exponentialSymbol);","    expon = e !== -1 ? numPattern.substring(e + 1) : null;","    if (expon) {","        numPattern = numPattern.substring(0, e);","        this._showExponent = true;","    }","	","    dot = numPattern.indexOf('.');","    whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;","    if (whole) {","        /*var comma = whole.lastIndexOf(',');","            if (comma != -1) {","                this._groupingOffset = whole.length - comma - 1;","            }*/","        whole = whole.replace(/[^#0]/g,\"\");","        zero = whole.indexOf('0');","        if (zero !== -1) {","            this._minIntDigits = whole.length - zero;","        }","        this._maxIntDigits = whole.length;","    }","	","    fract = dot !== -1 ? numPattern.substring(dot + 1) : null;","    if (fract) {","        zero = fract.lastIndexOf('0');","        if (zero !== -1) {","            this._minFracDigits = zero + 1;","        }","        this._maxFracDigits = fract.replace(/[^#0]/g,\"\").length;","    }","	","    this._segments.push(new NumberFormat.NumberSegment(this, numPattern));","	","    // parse suffix","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    if (results.text !== \"\") {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // add negative formatter","    if (skipNegFormat) { return; }","	","    if (patterns.length > 1) {","        pattern = patterns[1];","        this._negativeFormatter = new NumberFormat(pattern, formats, true);","    }","    else {","        // no negative pattern; insert minus sign before number segment","        formatter = new NumberFormat(\"\", formats);","        formatter._segments = formatter._segments.concat(this._segments);","","        index = hasPrefix ? 1 : 0;","        minus = new Format.TextSegment(formatter, this.Formats.minusSign);","        formatter._segments.splice(index, 0, minus);","		","        this._negativeFormatter = formatter;","    }","};","","NumberFormat = Y.Number.__zNumberFormat;","Y.extend(NumberFormat, Format);","    ","// Constants","","Y.mix(NumberFormat, {","    _NUMBER: \"number\",","    _INTEGER: \"integer\",","    _CURRENCY: \"currency\",","    _PERCENT: \"percent\",","","    _META_CHARS: \"0#.,E\"","});","","Y.mix( NumberFormat.prototype, {","    _groupingOffset: Number.MAX_VALUE,","    _minIntDigits: 1,","    _isCurrency: false,","    _isPercent: false,","    _isPerMille: false,","    _showExponent: false,","","    /**","     * Format a number","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        if (number < 0 && this._negativeFormatter) {","            return this._negativeFormatter.format(number);","        }","        ","        var result = Format.prototype.format.call(this, number), pattern = \"\";","        ","        if(this._isPluralCurrency) {","            if(number === 1) {","                //Singular","                pattern = this.Formats.currencyPatternSingular;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencySingular\"]);","            } else {","                //Plural","                pattern = this.Formats.currencyPatternPlural;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencyPlural\"]);","            }","            ","            result = pattern.replace(\"{0}\", result);","        }","        ","        return result;","    },","","    /**","     * Parse string and return number","     * @method parse","     * @param s {String} The string to parse","     * @param pp {Number} Parse position. Will start parsing from this index in string s.","     * @return {Number} Parse result","     */","    parse: function(s, pp) {","        var singular, plural, object;","        if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {","            return this._negativeFormatter.parse(s, pp);","        }","        ","        if(this._isPluralCurrency) {","            singular = this.Formats[this.currency + \"_currencySingular\"],","                plural = this.Formats[this.currency + \"_currencyPlural\"];","            ","            s = Y.Lang.trim(s.replace(plural, \"\").replace(singular, \"\"));","        }","        ","        object = null;","        try {","            object = Format.prototype.parse.call(this, s, pp);","            object = object.value;","        } catch(e) {","            Y.error(\"Failed to parse: \" + s, e);","        }","        ","        return object;","    },","","    /**","     * Parse static. Internal use only.","     * @method __parseStatic","     * @private","     * @param {String} s Pattern","     * @param {Number} i Index","     * @return {Object}","     */","    __parseStatic: function(s, i) {","        var data = [], c, start, end;","        while (i < s.length) {","            c = s.charAt(i++);","            if (NumberFormat._META_CHARS.indexOf(c) !== -1) {","                i--;","                break;","            }","            switch (c) {","                case \"'\":","                    start = i;","                    while (i < s.length && s.charAt(i) !== \"'\") {","			i++;","                    }","                    end = i;","                    c = end - start === 0 ? \"'\" : s.substring(start, end);","                    break;","                case '%':","                    c = this.Formats.percentSign;","                    this._isPercent = true;","                    break;","                case '\\u2030':","                    c = this.Formats.perMilleSign;","                    this._isPerMille = true;","                    break;","                case '\\u00a4':","                    if(s.charAt(i) === '\\u00a4') {","                        c = this.Formats[this.currency + \"_currencyISO\"];","                        i++;","                    } else {","                        c = this.Formats[this.currency + \"_currencySymbol\"];","                    }","                    this._isCurrency = true;","                    break;","            }","            data.push(c);","        }","        return {","            text: data.join(\"\"),","            offset: i","        };","    },","","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Overrides method from Intl.Utils.BaseFormat","     * @method _createParseObject","     * @private","     * @return {Object}","     */","    _createParseObject: function() {","        return {","            value: null","        };","    }","}, true);","    ","//","// NumberFormat.NumberSegment class","//","","/**"," * Number segment class."," * @class __zNumberFormat.NumberSegment"," * @for __zNumberFormat"," * @namespace Number"," * @extends Intl.Utils.BaseFormat.Segment"," *"," * @private"," * @constructor"," *"," * @param format {Number.__zNumberFormat} Parent Format object"," * @param s {String} Pattern representing this segment"," */","NumberFormat.NumberSegment = function(format, s) {","    if (format === null && s === null) { return; }","    NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);","};","Y.extend(NumberFormat.NumberSegment, Format.Segment);","","Y.mix(NumberFormat.NumberSegment.prototype, {","    /**","     * Format number segment","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        var expon, exponReg, s;","        // special values","        if (isNaN(number)) { return this._parent.Formats.nanSymbol; }","        if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {","            return this._parent.Formats.infinitySign;","        }","","        // adjust value","        if (typeof number !== \"number\") { number = Number(number); }","        number = Math.abs(number); // NOTE: minus sign is part of pattern","        if (this._parent._isPercent) { number *= 100; }","        else if (this._parent._isPerMille) { number *= 1000; }","        if(this._parent._parseIntegerOnly) { number = Math.floor(number); }","        ","        // format","        expon = this._parent.Formats.exponentialSymbol;","        exponReg = new RegExp(expon + \"+\");","        s = this._parent._showExponent","            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)","            : number.toFixed(this._parent._maxFracDigits || 0);","        s = this._normalize(s);","        return s;","    },","","    /**","     * Normalize pattern","     * @method _normalize","     * @protected","     * @param {String} s Pattern","     * @return {String} Normalized pattern","     */","    _normalize: function(s) {","        var exponSymbol = this._parent.Formats.exponentialSymbol,","            splitReg = new RegExp(\"[\\\\.\" + exponSymbol + \"]\"),","            match = s.split(splitReg),","            whole = match.shift(),  //Normalize the whole part","            a = [],","            offset = this._parent._primaryGrouping,","            fract = '0',","            decimal = this._parent.Formats.decimalSeparator,","            expon, i;","","	if (whole.length < this._parent._minIntDigits) {","            whole = Y.Intl.Utils.zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);","        }","        if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {","            i = whole.length - offset;","            while (i > 0) {","                a.unshift(whole.substr(i, offset));","                a.unshift(this._parent.Formats.groupingSeparator);","                offset = this._parent._secondaryGrouping;","                i -= offset;","            }","            a.unshift(whole.substring(0, i + offset));","		","            whole = a.join(\"\");","        }","	","        if(s.match(/\\./)) {","            fract = match.shift();","        }","        else if(s.match(/\\e/) || s.match(/\\E/)) {","            expon = match.shift();","        }","","        fract = fract.replace(/0+$/,\"\");","        if (fract.length < this._parent._minFracDigits) {","            fract = Y.Intl.Utils.zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);","        }","	","        a = [ whole ];","        if (fract.length > 0) {","            a.push(decimal, fract);","        }","        if (expon) {","            a.push(exponSymbol, expon.replace(/^\\+/,\"\"));","        }","	","        // return normalize result","        return a.join(\"\");","    },","","    /**","     * Parse Number Segment","     * @method parse","     * @param object {Object} Result will be stored in object.value","     * @param s {String} Pattern","     * @param index {Number}","     * @return {Number} Index in s where parse ended","     */","    parse: function(object, s, index) {","        var comma = this._parent.Formats.groupingSeparator,","            dot = this._parent.Formats.decimalSeparator,","            minusSign = this._parent.Formats.minusSign,","            expon = this._parent.Formats.exponentialSymbol,","            numberRegexPattern = \"[\\\\\" + minusSign + \"0-9\" + comma + \"]+\",","            numberRegex, matches, negativeNum, endIndex, scientific = null, i,","            //If more groups, use primary/secondary grouping as applicable","            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;","","        if(!this._parent._parseIntegerOnly) {","            numberRegexPattern += \"(\\\\\" + dot + \"[0-9]+)?\";","        }","        if(this._parent._showExponent) {","            numberRegexPattern += \"(\" + expon +\"\\\\+?[0-9]+)\";","        }","        ","        numberRegex = new RegExp(numberRegexPattern);","        matches = s.match(numberRegex);","        ","        if(!matches) {","            Y.error(\"Error parsing: Number does not match pattern\");","        }","        ","        negativeNum = s.indexOf(minusSign) !== -1;","        endIndex = index + matches[0].length;","        s = s.slice(index, endIndex);","        ","        //Scientific format does not use grouping","        if(this._parent.showExponent) {","            scientific = s.split(expon);","        } else if(this._parent._useGrouping) {","            //Verify grouping data exists","            if(!this._parent._primaryGrouping) {","                //Should not happen","                Y.error(\"Error parsing: Invalid pattern\");","            }","            ","            //Verify grouping is correct","            i = s.length - this._parent._primaryGrouping - 1;","            ","            if(matches[1]) {","                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part","                i = i - matches[1].length;","            }","            ","            //Use primary grouping for first group","            if(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","            }","            ","            i = i - grouping - 1;","            ","            while(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","                i = i - grouping - 1;","            }","            ","            //Verify there are no more grouping separators","            if(s.indexOf(comma) !== -1) {","                Y.error(\"Error parsing: Number does not match pattern\");","            }","        }","        ","        if(scientific) {","            object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));","        } else {","            object.value = parseFloat(s, 10);","        }","        ","        //Special types","        if(negativeNum) { object.value *= -1; }","        if (this._parent._isPercent) { object.value /= 100; }","        else if (this._parent._isPerMille) { object.value /= 1000; }","        ","        return endIndex;","    }","}, true);","","/**"," * Number Formatting"," * @class __YNumberFormat"," * @namespace Number"," * @private"," * @constructor"," * @param [style='NUMBER_STYLE'] {Number} the given style. Should be key/value from Y.Number.STYLES"," */","Y.Number.__YNumberFormat = function(style) {","    style = style || Y.Number.STYLES.NUMBER_STYLE;","    ","    if(Y.Lang.isString(style)) {","        style = Y.Number.STYLES[style];","    }","    ","    var pattern = \"\",","        formats = Y.Intl.get(MODULE_NAME);","    switch(style) {","        case Y.Number.STYLES.CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            break;","        case Y.Number.STYLES.ISO_CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            pattern = pattern.replace(\"\\u00a4\", \"\\u00a4\\u00a4\");","            break;","        case Y.Number.STYLES.NUMBER_STYLE:","            pattern = formats.decimalFormat;","            break;","        case Y.Number.STYLES.PERCENT_STYLE:","            pattern = formats.percentFormat;","            break;","        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:","            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting","            pattern = \"{plural_style}\";","            break;","        case Y.Number.STYLES.SCIENTIFIC_STYLE:","            pattern = formats.scientificFormat;","            break;","    }","        ","    this._numberFormatInstance = new NumberFormat(pattern, formats);","};","","YNumberFormat = Y.Number.__YNumberFormat;","","Y.mix(Y.Number, {","    /**","     * Style values to use during format/parse","     * @property STYLES","     * @type Object","     * @static","     * @final","     * @for Number","     */","    STYLES: {","        CURRENCY_STYLE: 1,","        ISO_CURRENCY_STYLE: 2,","        NUMBER_STYLE: 4,","        PERCENT_STYLE: 8,","        PLURAL_CURRENCY_STYLE: 16,","        SCIENTIFIC_STYLE: 32","    }","});","   ","Y.mix(YNumberFormat.prototype, {","    /**","     * Format a number","     * @method format","     * @param number {Number} the number to format","     * @for Number.YNumberFormat","     * @return {Number}","     */","    format: function(number) {","        return this._numberFormatInstance.format(number);","    },","    ","    /**","     * Return true if this format will parse numbers as integers only.","     * For example in the English locale, with ParseIntegerOnly true, the string \"1234.\" would be parsed as the integer value 1234","     * and parsing would stop at the \".\" character. Of course, the exact format accepted by the parse operation is locale dependant.","     * @method isParseIntegerOnly","     * @return {Boolean}","     */","    isParseIntegerOnly: function() {","        return this._numberFormatInstance._parseIntegerOnly;","    },","    ","    /**","     * Parse the string to get a number","     * @method parse","     * @param {String} txt The string to parse","     * @param {Number} [pp=0] Parse position. The position to start parsing at.","     */","    parse: function(txt, pp) {","        return this._numberFormatInstance.parse(txt, pp);","    },","    ","    /**","     * Sets whether or not numbers should be parsed as integers only.","     * @method setParseIntegerOnly","     * @param {Boolean} newValue set True, this format will parse numbers as integers only.","     */","    setParseIntegerOnly: function(newValue) {","        this._numberFormatInstance._parseIntegerOnly = newValue;","    }","});","Y.mix( Y.Number, {","     _oldFormat: Y.Number.format,","     _oldParse:  Y.Number.parse","});","","Y.mix( Y.Number, {","     /**","      * Takes a Number and formats to string for display to user","      *","      * @for Number","      * @method format","      * @param data {Number} Number","      * @param [config] {Object} Optional Configuration values.","      *   <dl>","      *      <dt>[style] {Number|String}</dt>","      *         <dd>Format/Style to use. See Y.Number.STYLES</dd>","      *      <dt>[parseIntegerOnly] {Boolean}</dt>","      *         <dd>If set to true, only the whole number part of data will be used</dd>","      *      <dt>[prefix] {String}</dd>","      *         <dd>String prepended before each number, like a currency designator \"$\"</dd>","      *      <dt>[decimalPlaces] {Number}</dd>","      *         <dd>Number of decimal places to round. Must be a number 0 to 20.</dd>","      *      <dt>[decimalSeparator] {String}</dd>","      *         <dd>Decimal separator</dd>","      *      <dt>[thousandsSeparator] {String}</dd>","      *         <dd>Thousands separator</dd>","      *      <dt>[suffix] {String}</dd>","      *         <dd>String appended after each number, like \" items\" (note the space)</dd>","      *   </dl>","      * @return {String} Formatted string representation of data","      */","     format: function(data, config) {","         config = config || {};","    ","         if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined","               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {","             return Y.Number._oldFormat(data, config);","         }","    ","         try {","             var formatter = new YNumberFormat(config.style);","             if(config.parseIntegerOnly) {","                 formatter.setParseIntegerOnly(true);","             }","             return formatter.format(data);","         } catch(e) {","             //Error. Fallback to original format","         }","         return Y.Number._oldFormat(data, config);","     },","","     /**","      * Parses data and returns a number","      *","      * @for Number","      * @method format","      * @param data {String} Data to be parsed","      * @param [config] (Object} Object containg 'style' (Pattern data is represented in.","               See Y.Number.STYLES) and 'parsePosition' (index position in data to start parsing at) Both parameters are optional.","               If omitted, style defaults to NUMBER_STYLE, and parsePosition defaults to 0","      * @return {Number} Number represented by data","      */","     parse: function(data, config) {","         try {","             var formatter = new YNumberFormat(config.style);","             return formatter.parse(data, config.parsePosition);","         } catch(e) {","             //Fallback on deprecated parse","         }","    ","         return Y.Number._oldParse(data);","     }","}, true);","","//Update Parsers shortcut","Y.namespace(\"Parsers\").number = Y.Number.parse;","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"af-NA\",","        \"af-ZA\",","        \"am-ET\",","        \"am\",","        \"ar-AE\",","        \"ar-BH\",","        \"ar-DZ\",","        \"ar-EG\",","        \"ar-IQ\",","        \"ar-JO\",","        \"ar\",","        \"ar-KW\",","        \"ar-LB\",","        \"ar-LY\",","        \"ar-MA\",","        \"ar-OM\",","        \"ar-QA\",","        \"ar-SA\",","        \"ar-SD\",","        \"ar-SY\",","        \"ar-TN\",","        \"ar-YE\",","        \"as-IN\",","        \"as\",","        \"az-AZ\",","        \"az-Cyrl-AZ\",","        \"az-Cyrl\",","        \"az\",","        \"az-Latn-AZ\",","        \"be-BY\",","        \"be\",","        \"bg-BG\",","        \"bg\",","        \"bn-BD\",","        \"bn-IN\",","        \"bn\",","        \"bo-CN\",","        \"bo-IN\",","        \"bo\",","        \"ca-ES\",","        \"ca\",","        \"cs-CZ\",","        \"cs\",","        \"cy-GB\",","        \"cy\",","        \"da-DK\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de-CH\",","        \"de-DE\",","        \"de\",","        \"de-LI\",","        \"de-LU\",","        \"el-CY\",","        \"el-GR\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-BZ\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JM\",","        \"en-JO\",","        \"en-MH\",","        \"en-MT\",","        \"en-MY\",","        \"en-NA\",","        \"en-NZ\",","        \"en-PH\",","        \"en-PK\",","        \"en-RH\",","        \"en-SG\",","        \"en-TT\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-VI\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-BO\",","        \"es-CL\",","        \"es-CO\",","        \"es-CR\",","        \"es-DO\",","        \"es-EC\",","        \"es-ES\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-MX\",","        \"es-NI\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-PY\",","        \"es-SV\",","        \"es-US\",","        \"es-UY\",","        \"es-VE\",","        \"et-EE\",","        \"et\",","        \"eu-ES\",","        \"eu\",","        \"fa-AF\",","        \"fa-IR\",","        \"fa\",","        \"fi-FI\",","        \"fi\",","        \"fil\",","        \"fil-PH\",","        \"fo-FO\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr-FR\",","        \"fr\",","        \"fr-LU\",","        \"fr-MC\",","        \"fr-SN\",","        \"ga-IE\",","        \"ga\",","        \"gl-ES\",","        \"gl\",","        \"gsw-CH\",","        \"gsw\",","        \"gu-IN\",","        \"gu\",","        \"gv-GB\",","        \"gv\",","        \"ha-GH\",","        \"ha\",","        \"ha-Latn-GH\",","        \"ha-Latn-NE\",","        \"ha-Latn-NG\",","        \"ha-NE\",","        \"ha-NG\",","        \"haw\",","        \"haw-US\",","        \"he-IL\",","        \"he\",","        \"hi-IN\",","        \"hi\",","        \"hr-HR\",","        \"hr\",","        \"hu-HU\",","        \"hu\",","        \"hy-AM\",","        \"hy\",","        \"id-ID\",","        \"id\",","        \"ii-CN\",","        \"ii\",","        \"in-ID\",","        \"in\",","        \"is-IS\",","        \"is\",","        \"it-CH\",","        \"it-IT\",","        \"it\",","        \"iw-IL\",","        \"iw\",","        \"ja-JP\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka-GE\",","        \"ka\",","        \"kk-Cyrl-KZ\",","        \"kk\",","        \"kk-KZ\",","        \"kl-GL\",","        \"kl\",","        \"km\",","        \"km-KH\",","        \"kn-IN\",","        \"kn\",","        \"ko\",","        \"kok-IN\",","        \"kok\",","        \"ko-KR\",","        \"kw-GB\",","        \"kw\",","        \"lt\",","        \"lt-LT\",","        \"lv\",","        \"lv-LV\",","        \"mk\",","        \"mk-MK\",","        \"ml-IN\",","        \"ml\",","        \"mr-IN\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"ms-MY\",","        \"mt\",","        \"mt-MT\",","        \"nb\",","        \"nb-NO\",","        \"ne-IN\",","        \"ne\",","        \"ne-NP\",","        \"nl-BE\",","        \"nl\",","        \"nl-NL\",","        \"nn\",","        \"nn-NO\",","        \"no\",","        \"no-NO\",","        \"om-ET\",","        \"om\",","        \"om-KE\",","        \"or-IN\",","        \"or\",","        \"pa-Arab\",","        \"pa-Arab-PK\",","        \"pa-Guru-IN\",","        \"pa-IN\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"pl-PL\",","        \"ps-AF\",","        \"ps\",","        \"pt-BR\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ro-MD\",","        \"ro-RO\",","        \"ru\",","        \"ru-RU\",","        \"ru-UA\",","        \"sh-BA\",","        \"sh-CS\",","        \"sh\",","        \"sh-YU\",","        \"si\",","        \"si-LK\",","        \"sk\",","        \"sk-SK\",","        \"sl\",","        \"sl-SI\",","        \"so-DJ\",","        \"so-ET\",","        \"so\",","        \"so-KE\",","        \"so-SO\",","        \"sq-AL\",","        \"sq\",","        \"sr-BA\",","        \"sr-CS\",","        \"sr-Cyrl-BA\",","        \"sr-Cyrl-CS\",","        \"sr-Cyrl-ME\",","        \"sr-Cyrl-RS\",","        \"sr-Cyrl-YU\",","        \"sr\",","        \"sr-Latn-BA\",","        \"sr-Latn-CS\",","        \"sr-Latn-ME\",","        \"sr-Latn-RS\",","        \"sr-Latn-YU\",","        \"sr-ME\",","        \"sr-RS\",","        \"sr-YU\",","        \"sv-FI\",","        \"sv\",","        \"sv-SE\",","        \"sw\",","        \"sw-KE\",","        \"sw-TZ\",","        \"ta-IN\",","        \"ta\",","        \"te-IN\",","        \"te\",","        \"th\",","        \"th-TH\",","        \"ti-ER\",","        \"ti-ET\",","        \"ti\",","        \"tl\",","        \"tl-PH\",","        \"tr\",","        \"tr-TR\",","        \"uk\",","        \"uk-UA\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz-AF\",","        \"uz-Arab-AF\",","        \"uz-Arab\",","        \"uz-Cyrl-UZ\",","        \"uz\",","        \"uz-Latn\",","        \"uz-Latn-UZ\",","        \"uz-UZ\",","        \"vi\",","        \"vi-VN\",","        \"zh-CN\",","        \"zh-Hans-CN\",","        \"zh-Hans-HK\",","        \"zh-Hans-MO\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-Hant-TW\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\",","        \"zu-ZA\"","    ],","    \"requires\": [","        \"gallery-i18n-utils\",","        \"datatype-number-format\",","        \"datatype-number-parse\"","    ]","});"];
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].lines = {"1":0,"3":0,"7":0,"31":0,"32":0,"34":0,"36":0,"37":0,"39":0,"40":0,"41":0,"42":0,"46":0,"47":0,"48":0,"51":0,"52":0,"54":0,"55":0,"58":0,"59":0,"60":0,"61":0,"63":0,"64":0,"65":0,"69":0,"71":0,"72":0,"73":0,"74":0,"75":0,"79":0,"80":0,"82":0,"84":0,"86":0,"87":0,"88":0,"89":0,"90":0,"91":0,"94":0,"95":0,"96":0,"101":0,"102":0,"103":0,"104":0,"106":0,"109":0,"110":0,"111":0,"112":0,"113":0,"115":0,"118":0,"121":0,"122":0,"123":0,"124":0,"128":0,"130":0,"131":0,"132":0,"136":0,"137":0,"139":0,"140":0,"141":0,"143":0,"147":0,"148":0,"152":0,"161":0,"176":0,"177":0,"180":0,"182":0,"183":0,"185":0,"186":0,"189":0,"190":0,"193":0,"196":0,"207":0,"208":0,"209":0,"212":0,"213":0,"216":0,"219":0,"220":0,"221":0,"222":0,"224":0,"227":0,"239":0,"240":0,"241":0,"242":0,"243":0,"244":0,"246":0,"248":0,"249":0,"250":0,"252":0,"253":0,"254":0,"256":0,"257":0,"258":0,"260":0,"261":0,"262":0,"264":0,"265":0,"266":0,"268":0,"270":0,"271":0,"273":0,"275":0,"289":0,"312":0,"313":0,"314":0,"316":0,"318":0,"326":0,"328":0,"329":0,"330":0,"334":0,"335":0,"336":0,"337":0,"338":0,"341":0,"342":0,"343":0,"346":0,"347":0,"358":0,"368":0,"369":0,"371":0,"372":0,"373":0,"374":0,"375":0,"376":0,"377":0,"379":0,"381":0,"384":0,"385":0,"387":0,"388":0,"391":0,"392":0,"393":0,"396":0,"397":0,"398":0,"400":0,"401":0,"405":0,"417":0,"426":0,"427":0,"429":0,"430":0,"433":0,"434":0,"436":0,"437":0,"440":0,"441":0,"442":0,"445":0,"446":0,"447":0,"449":0,"451":0,"455":0,"457":0,"459":0,"463":0,"465":0,"466":0,"470":0,"473":0,"475":0,"477":0,"478":0,"482":0,"483":0,"487":0,"488":0,"492":0,"493":0,"495":0,"499":0,"500":0,"501":0,"503":0,"515":0,"516":0,"518":0,"519":0,"522":0,"524":0,"526":0,"527":0,"529":0,"530":0,"531":0,"533":0,"534":0,"536":0,"537":0,"540":0,"541":0,"543":0,"544":0,"547":0,"550":0,"552":0,"571":0,"580":0,"591":0,"601":0,"610":0,"613":0,"618":0,"645":0,"647":0,"649":0,"652":0,"653":0,"654":0,"655":0,"657":0,"661":0,"676":0,"677":0,"678":0,"683":0,"688":0};
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].functions = {"__zNumberFormat:31":0,"format:175":0,"parse:206":0,"__parseStatic:238":0,"_createParseObject:288":0,"NumberSegment:312":0,"format:325":0,"_normalize:357":0,"parse:416":0,"__YNumberFormat:515":0,"format:579":0,"isParseIntegerOnly:590":0,"parse:600":0,"setParseIntegerOnly:609":0,"format:644":0,"parse:675":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].coveredLines = 252;
_yuitest_coverage["build/gallery-advanced-number-format/gallery-advanced-number-format.js"].coveredFunctions = 17;
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 1);
YUI.add('gallery-advanced-number-format', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 3);
var MODULE_NAME = "gallery-advanced-number-format",
    Format = Y.Intl.Utils.BaseFormat,
    NumberFormat, YNumberFormat;

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 7);
Y.Number.__advancedFormat = true;

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
 * @extends Intl.Utils.BaseFormat
 * @namespace Number
 * @private
 * @constructor
 * @param pattern {String}       The number pattern.
 * @param formats {Object}       locale data
 * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 31);
Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "__zNumberFormat", 31);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 32);
var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,
        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 34);
if (arguments.length === 0) { return; }

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 36);
NumberFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 37);
if (!pattern) { return; }

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 39);
if(pattern === "{plural_style}") {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 40);
pattern = this.Formats.decimalFormat;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 41);
this._isPluralCurrency = true;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 42);
this._pattern = pattern;
    }

    //Default currency
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 46);
this.currency = this.Formats.defaultCurrency;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 47);
if(this.currency === undefined || !this.currency) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 48);
this.currency = "USD";
    }
        
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 51);
patterns = pattern.split(/;/);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 52);
pattern = patterns[0];
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 54);
this._useGrouping = (pattern.indexOf(",") !== -1);      //Will be set to true if pattern uses grouping
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 55);
this._parseIntegerOnly = (pattern.indexOf(".") === -1);  //Will be set to false if pattern contains fractional parts
        
    //If grouping is used, find primary and secondary grouping
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 58);
if(this._useGrouping) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 59);
numberPattern = pattern.match(/[0#,]+/);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 60);
groupingRegex = new RegExp("[0#]+", "g");
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 61);
groups = numberPattern[0].match(groupingRegex);
            
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 63);
i = groups.length - 2;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 64);
this._primaryGrouping = groups[i+1].length;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 65);
this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);
    }
        
    // parse prefix
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 69);
i = 0;
        
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 71);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 72);
i = results.offset;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 73);
hasPrefix = results.text !== "";
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 74);
if (hasPrefix) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 75);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // parse number descriptor
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 79);
start = i;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 80);
while (i < pattern.length &&
        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 82);
i++;
    }
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 84);
end = i;

    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 86);
numPattern = pattern.substring(start, end);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 87);
e = numPattern.indexOf(this.Formats.exponentialSymbol);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 88);
expon = e !== -1 ? numPattern.substring(e + 1) : null;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 89);
if (expon) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 90);
numPattern = numPattern.substring(0, e);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 91);
this._showExponent = true;
    }
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 94);
dot = numPattern.indexOf('.');
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 95);
whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 96);
if (whole) {
        /*var comma = whole.lastIndexOf(',');
            if (comma != -1) {
                this._groupingOffset = whole.length - comma - 1;
            }*/
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 101);
whole = whole.replace(/[^#0]/g,"");
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 102);
zero = whole.indexOf('0');
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 103);
if (zero !== -1) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 104);
this._minIntDigits = whole.length - zero;
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 106);
this._maxIntDigits = whole.length;
    }
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 109);
fract = dot !== -1 ? numPattern.substring(dot + 1) : null;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 110);
if (fract) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 111);
zero = fract.lastIndexOf('0');
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 112);
if (zero !== -1) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 113);
this._minFracDigits = zero + 1;
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 115);
this._maxFracDigits = fract.replace(/[^#0]/g,"").length;
    }
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 118);
this._segments.push(new NumberFormat.NumberSegment(this, numPattern));
	
    // parse suffix
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 121);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 122);
i = results.offset;
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 123);
if (results.text !== "") {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 124);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // add negative formatter
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 128);
if (skipNegFormat) { return; }
	
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 130);
if (patterns.length > 1) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 131);
pattern = patterns[1];
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 132);
this._negativeFormatter = new NumberFormat(pattern, formats, true);
    }
    else {
        // no negative pattern; insert minus sign before number segment
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 136);
formatter = new NumberFormat("", formats);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 137);
formatter._segments = formatter._segments.concat(this._segments);

        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 139);
index = hasPrefix ? 1 : 0;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 140);
minus = new Format.TextSegment(formatter, this.Formats.minusSign);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 141);
formatter._segments.splice(index, 0, minus);
		
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 143);
this._negativeFormatter = formatter;
    }
};

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 147);
NumberFormat = Y.Number.__zNumberFormat;
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 148);
Y.extend(NumberFormat, Format);
    
// Constants

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 152);
Y.mix(NumberFormat, {
    _NUMBER: "number",
    _INTEGER: "integer",
    _CURRENCY: "currency",
    _PERCENT: "percent",

    _META_CHARS: "0#.,E"
});

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 161);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 175);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 176);
if (number < 0 && this._negativeFormatter) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 177);
return this._negativeFormatter.format(number);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 180);
var result = Format.prototype.format.call(this, number), pattern = "";
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 182);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 183);
if(number === 1) {
                //Singular
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 185);
pattern = this.Formats.currencyPatternSingular;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 186);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencySingular"]);
            } else {
                //Plural
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 189);
pattern = this.Formats.currencyPatternPlural;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 190);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencyPlural"]);
            }
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 193);
result = pattern.replace("{0}", result);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 196);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 206);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 207);
var singular, plural, object;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 208);
if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 209);
return this._negativeFormatter.parse(s, pp);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 212);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 213);
singular = this.Formats[this.currency + "_currencySingular"],
                plural = this.Formats[this.currency + "_currencyPlural"];
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 216);
s = Y.Lang.trim(s.replace(plural, "").replace(singular, ""));
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 219);
object = null;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 220);
try {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 221);
object = Format.prototype.parse.call(this, s, pp);
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 222);
object = object.value;
        } catch(e) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 224);
Y.error("Failed to parse: " + s, e);
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 227);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "__parseStatic", 238);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 239);
var data = [], c, start, end;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 240);
while (i < s.length) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 241);
c = s.charAt(i++);
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 242);
if (NumberFormat._META_CHARS.indexOf(c) !== -1) {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 243);
i--;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 244);
break;
            }
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 246);
switch (c) {
                case "'":
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 248);
start = i;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 249);
while (i < s.length && s.charAt(i) !== "'") {
			_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 250);
i++;
                    }
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 252);
end = i;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 253);
c = end - start === 0 ? "'" : s.substring(start, end);
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 254);
break;
                case '%':
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 256);
c = this.Formats.percentSign;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 257);
this._isPercent = true;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 258);
break;
                case '\u2030':
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 260);
c = this.Formats.perMilleSign;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 261);
this._isPerMille = true;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 262);
break;
                case '\u00a4':
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 264);
if(s.charAt(i) === '\u00a4') {
                        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 265);
c = this.Formats[this.currency + "_currencyISO"];
                        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 266);
i++;
                    } else {
                        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 268);
c = this.Formats[this.currency + "_currencySymbol"];
                    }
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 270);
this._isCurrency = true;
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 271);
break;
            }
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 273);
data.push(c);
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 275);
return {
            text: data.join(""),
            offset: i
        };
    },

    /**
     * Creates the object that is initialized by parsing. For internal use only.
     * Overrides method from Intl.Utils.BaseFormat
     * @method _createParseObject
     * @private
     * @return {Object}
     */
    _createParseObject: function() {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "_createParseObject", 288);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 289);
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
 * @extends Intl.Utils.BaseFormat.Segment
 *
 * @private
 * @constructor
 *
 * @param format {Number.__zNumberFormat} Parent Format object
 * @param s {String} Pattern representing this segment
 */
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 312);
NumberFormat.NumberSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "NumberSegment", 312);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 313);
if (format === null && s === null) { return; }
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 314);
NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 316);
Y.extend(NumberFormat.NumberSegment, Format.Segment);

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 318);
Y.mix(NumberFormat.NumberSegment.prototype, {
    /**
     * Format number segment
     * @method format
     * @param number {Number}
     * @return {String} Formatted result
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 325);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 326);
var expon, exponReg, s;
        // special values
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 328);
if (isNaN(number)) { return this._parent.Formats.nanSymbol; }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 329);
if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 330);
return this._parent.Formats.infinitySign;
        }

        // adjust value
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 334);
if (typeof number !== "number") { number = Number(number); }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 335);
number = Math.abs(number); // NOTE: minus sign is part of pattern
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 336);
if (this._parent._isPercent) { number *= 100; }
        else {_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 337);
if (this._parent._isPerMille) { number *= 1000; }}
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 338);
if(this._parent._parseIntegerOnly) { number = Math.floor(number); }
        
        // format
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 341);
expon = this._parent.Formats.exponentialSymbol;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 342);
exponReg = new RegExp(expon + "+");
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 343);
s = this._parent._showExponent
            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)
            : number.toFixed(this._parent._maxFracDigits || 0);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 346);
s = this._normalize(s);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 347);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "_normalize", 357);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 358);
var exponSymbol = this._parent.Formats.exponentialSymbol,
            splitReg = new RegExp("[\\." + exponSymbol + "]"),
            match = s.split(splitReg),
            whole = match.shift(),  //Normalize the whole part
            a = [],
            offset = this._parent._primaryGrouping,
            fract = '0',
            decimal = this._parent.Formats.decimalSeparator,
            expon, i;

	_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 368);
if (whole.length < this._parent._minIntDigits) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 369);
whole = Y.Intl.Utils.zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 371);
if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 372);
i = whole.length - offset;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 373);
while (i > 0) {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 374);
a.unshift(whole.substr(i, offset));
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 375);
a.unshift(this._parent.Formats.groupingSeparator);
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 376);
offset = this._parent._secondaryGrouping;
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 377);
i -= offset;
            }
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 379);
a.unshift(whole.substring(0, i + offset));
		
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 381);
whole = a.join("");
        }
	
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 384);
if(s.match(/\./)) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 385);
fract = match.shift();
        }
        else {_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 387);
if(s.match(/\e/) || s.match(/\E/)) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 388);
expon = match.shift();
        }}

        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 391);
fract = fract.replace(/0+$/,"");
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 392);
if (fract.length < this._parent._minFracDigits) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 393);
fract = Y.Intl.Utils.zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);
        }
	
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 396);
a = [ whole ];
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 397);
if (fract.length > 0) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 398);
a.push(decimal, fract);
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 400);
if (expon) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 401);
a.push(exponSymbol, expon.replace(/^\+/,""));
        }
	
        // return normalize result
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 405);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 416);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 417);
var comma = this._parent.Formats.groupingSeparator,
            dot = this._parent.Formats.decimalSeparator,
            minusSign = this._parent.Formats.minusSign,
            expon = this._parent.Formats.exponentialSymbol,
            numberRegexPattern = "[\\" + minusSign + "0-9" + comma + "]+",
            numberRegex, matches, negativeNum, endIndex, scientific = null, i,
            //If more groups, use primary/secondary grouping as applicable
            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;

        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 426);
if(!this._parent._parseIntegerOnly) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 427);
numberRegexPattern += "(\\" + dot + "[0-9]+)?";
        }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 429);
if(this._parent._showExponent) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 430);
numberRegexPattern += "(" + expon +"\\+?[0-9]+)";
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 433);
numberRegex = new RegExp(numberRegexPattern);
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 434);
matches = s.match(numberRegex);
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 436);
if(!matches) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 437);
Y.error("Error parsing: Number does not match pattern");
        }
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 440);
negativeNum = s.indexOf(minusSign) !== -1;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 441);
endIndex = index + matches[0].length;
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 442);
s = s.slice(index, endIndex);
        
        //Scientific format does not use grouping
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 445);
if(this._parent.showExponent) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 446);
scientific = s.split(expon);
        } else {_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 447);
if(this._parent._useGrouping) {
            //Verify grouping data exists
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 449);
if(!this._parent._primaryGrouping) {
                //Should not happen
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 451);
Y.error("Error parsing: Invalid pattern");
            }
            
            //Verify grouping is correct
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 455);
i = s.length - this._parent._primaryGrouping - 1;
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 457);
if(matches[1]) {
                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 459);
i = i - matches[1].length;
            }
            
            //Use primary grouping for first group
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 463);
if(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 465);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 466);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 470);
s = s.slice(0, i) + s.slice(i+1);
            }
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 473);
i = i - grouping - 1;
            
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 475);
while(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 477);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 478);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 482);
s = s.slice(0, i) + s.slice(i+1);
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 483);
i = i - grouping - 1;
            }
            
            //Verify there are no more grouping separators
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 487);
if(s.indexOf(comma) !== -1) {
                _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 488);
Y.error("Error parsing: Number does not match pattern");
            }
        }}
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 492);
if(scientific) {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 493);
object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));
        } else {
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 495);
object.value = parseFloat(s, 10);
        }
        
        //Special types
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 499);
if(negativeNum) { object.value *= -1; }
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 500);
if (this._parent._isPercent) { object.value /= 100; }
        else {_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 501);
if (this._parent._isPerMille) { object.value /= 1000; }}
        
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 503);
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
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 515);
Y.Number.__YNumberFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "__YNumberFormat", 515);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 516);
style = style || Y.Number.STYLES.NUMBER_STYLE;
    
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 518);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 519);
style = Y.Number.STYLES[style];
    }
    
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 522);
var pattern = "",
        formats = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 524);
switch(style) {
        case Y.Number.STYLES.CURRENCY_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 526);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 527);
break;
        case Y.Number.STYLES.ISO_CURRENCY_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 529);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 530);
pattern = pattern.replace("\u00a4", "\u00a4\u00a4");
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 531);
break;
        case Y.Number.STYLES.NUMBER_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 533);
pattern = formats.decimalFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 534);
break;
        case Y.Number.STYLES.PERCENT_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 536);
pattern = formats.percentFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 537);
break;
        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:
            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 540);
pattern = "{plural_style}";
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 541);
break;
        case Y.Number.STYLES.SCIENTIFIC_STYLE:
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 543);
pattern = formats.scientificFormat;
            _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 544);
break;
    }
        
    _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 547);
this._numberFormatInstance = new NumberFormat(pattern, formats);
};

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 550);
YNumberFormat = Y.Number.__YNumberFormat;

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 552);
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
   
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 571);
Y.mix(YNumberFormat.prototype, {
    /**
     * Format a number
     * @method format
     * @param number {Number} the number to format
     * @for Number.YNumberFormat
     * @return {Number}
     */
    format: function(number) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 579);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 580);
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
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "isParseIntegerOnly", 590);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 591);
return this._numberFormatInstance._parseIntegerOnly;
    },
    
    /**
     * Parse the string to get a number
     * @method parse
     * @param {String} txt The string to parse
     * @param {Number} [pp=0] Parse position. The position to start parsing at.
     */
    parse: function(txt, pp) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 600);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 601);
return this._numberFormatInstance.parse(txt, pp);
    },
    
    /**
     * Sets whether or not numbers should be parsed as integers only.
     * @method setParseIntegerOnly
     * @param {Boolean} newValue set True, this format will parse numbers as integers only.
     */
    setParseIntegerOnly: function(newValue) {
        _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "setParseIntegerOnly", 609);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 610);
this._numberFormatInstance._parseIntegerOnly = newValue;
    }
});
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 613);
Y.mix( Y.Number, {
     _oldFormat: Y.Number.format,
     _oldParse:  Y.Number.parse
});

_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 618);
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
         _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "format", 644);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 645);
config = config || {};
    
         _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 647);
if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined
               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 649);
return Y.Number._oldFormat(data, config);
         }
    
         _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 652);
try {
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 653);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 654);
if(config.parseIntegerOnly) {
                 _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 655);
formatter.setParseIntegerOnly(true);
             }
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 657);
return formatter.format(data);
         } catch(e) {
             //Error. Fallback to original format
         }
         _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 661);
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
         _yuitest_coverfunc("build/gallery-advanced-number-format/gallery-advanced-number-format.js", "parse", 675);
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 676);
try {
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 677);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 678);
return formatter.parse(data, config.parsePosition);
         } catch(e) {
             //Fallback on deprecated parse
         }
    
         _yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 683);
return Y.Number._oldParse(data);
     }
}, true);

//Update Parsers shortcut
_yuitest_coverline("build/gallery-advanced-number-format/gallery-advanced-number-format.js", 688);
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
        "gallery-i18n-utils",
        "datatype-number-format",
        "datatype-number-parse"
    ]
});
