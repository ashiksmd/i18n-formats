YUI.add('gallery-advanced-number-format', function (Y, NAME) {

/**
 * NumberFormat helps you to format and parse numbers for any locale.
 * Your code can be completely independent of the locale conventions for decimal points, thousands-separators,
 * or even the particular decimal digits used, or whether the number format is even decimal.
 *
 * This module uses parts of zimbra NumberFormat
 *
 * @module gallery-advanced-number-format
 * @requires gallery-i18n-common, datatype-number-format, datatype-number-parse
 */

var MODULE_NAME = "gallery-advanced-number-format",
    Format = Y.Intl.Common.BaseFormat,
    NumberFormat, YNumberFormat;

Y.Number.__advancedFormat = true;

/**
 * Class to handle Number formatting.
 * @class __zNumberFormat
 * @extends Intl.Common.BaseFormat
 * @namespace Number
 * @private
 * @constructor
 * @param pattern {String}       The number pattern.
 * @param formats {Object}       locale data
 * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only
 */
Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {
    var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,
        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;
    if (arguments.length === 0) { return; }

    NumberFormat.superclass.constructor.call(this, pattern, formats);
    if (!pattern) { return; }

    if(pattern === "{plural_style}") {
        pattern = this.Formats.currencyFormat.replace("\u00a4", "");
        this._isPluralCurrency = true;
        this._pattern = pattern;
    }

    //Default currency
    this.currency = this.Formats.defaultCurrency;
    if(this.currency === undefined || !this.currency) {
        this.currency = "USD";
    }
        
    patterns = pattern.split(/;/);
    pattern = patterns[0];
	
    this._useGrouping = (pattern.indexOf(",") !== -1);      //Will be set to true if pattern uses grouping
    this._parseIntegerOnly = (pattern.indexOf(".") === -1);  //Will be set to false if pattern contains fractional parts
        
    //If grouping is used, find primary and secondary grouping
    if(this._useGrouping) {
        numberPattern = pattern.match(/[0#,]+/);
        groupingRegex = new RegExp("[0#]+", "g");
        groups = numberPattern[0].match(groupingRegex);
            
        i = groups.length - 2;
        this._primaryGrouping = groups[i+1].length;
        this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);
    }
        
    // parse prefix
    i = 0;
        
    results = this.__parseStatic(pattern, i);
    i = results.offset;
    hasPrefix = results.text !== "";
    if (hasPrefix) {
        this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // parse number descriptor
    start = i;
    while (i < pattern.length &&
        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {
        i++;
    }
    end = i;

    numPattern = pattern.substring(start, end);
    e = numPattern.indexOf(this.Formats.exponentialSymbol);
    expon = e !== -1 ? numPattern.substring(e + 1) : null;
    if (expon) {
        numPattern = numPattern.substring(0, e);
        this._showExponent = true;
    }
	
    dot = numPattern.indexOf('.');
    whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;
    if (whole) {
        /*var comma = whole.lastIndexOf(',');
            if (comma != -1) {
                this._groupingOffset = whole.length - comma - 1;
            }*/
        whole = whole.replace(/[^#0]/g,"");
        zero = whole.indexOf('0');
        if (zero !== -1) {
            this._minIntDigits = whole.length - zero;
        }
        this._maxIntDigits = whole.length;
    }
	
    fract = dot !== -1 ? numPattern.substring(dot + 1) : null;
    if (fract) {
        zero = fract.lastIndexOf('0');
        if (zero !== -1) {
            this._minFracDigits = zero + 1;
        }
        this._maxFracDigits = fract.replace(/[^#0]/g,"").length;
    }
	
    this._segments.push(new NumberFormat.NumberSegment(this, numPattern));
	
    // parse suffix
    results = this.__parseStatic(pattern, i);
    i = results.offset;
    if (results.text !== "") {
        this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // add negative formatter
    if (skipNegFormat) { return; }
	
    if (patterns.length > 1) {
        pattern = patterns[1];
        this._negativeFormatter = new NumberFormat(pattern, formats, true);
    }
    else {
        // no negative pattern; insert minus sign before number segment
        formatter = new NumberFormat("", formats);
        formatter._segments = formatter._segments.concat(this._segments);

        index = hasPrefix ? 1 : 0;
        minus = new Format.TextSegment(formatter, this.Formats.minusSign);
        formatter._segments.splice(index, 0, minus);
		
        this._negativeFormatter = formatter;
    }
};

NumberFormat = Y.Number.__zNumberFormat;
Y.extend(NumberFormat, Format);
    
// Constants

Y.mix(NumberFormat, {
    _NUMBER: "number",
    _INTEGER: "integer",
    _CURRENCY: "currency",
    _PERCENT: "percent",

    _META_CHARS: "0#.,E"
});

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
        if (number < 0 && this._negativeFormatter) {
            return this._negativeFormatter.format(number);
        }
        
        var result = Format.prototype.format.call(this, number), pattern = "";
        
        if(this._isPluralCurrency) {
            if(number === 1) {
                //Singular
                pattern = this.Formats.currencyPatternSingular;
                pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencySingular"]);
            } else {
                //Plural
                pattern = this.Formats.currencyPatternPlural;
                pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencyPlural"]);
            }
            
            result = pattern.replace("{0}", result);
        }
        
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
        var singular, plural, object;
        if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {
            return this._negativeFormatter.parse(s, pp);
        }
        
        if(this._isPluralCurrency) {
            singular = this.Formats[this.currency + "_currencySingular"],
                plural = this.Formats[this.currency + "_currencyPlural"];
            
            s = Y.Lang.trim(s.replace(plural, "").replace(singular, ""));
        }
        
        object = null;
        try {
            object = Format.prototype.parse.call(this, s, pp);
            object = object.value;
        } catch(e) {
            Y.error("Failed to parse: " + s, e);
        }
        
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
        var data = [], c, start, end;
        while (i < s.length) {
            c = s.charAt(i++);
            if (NumberFormat._META_CHARS.indexOf(c) !== -1) {
                i--;
                break;
            }
            switch (c) {
                case "'":
                    start = i;
                    while (i < s.length && s.charAt(i) !== "'") {
			i++;
                    }
                    end = i;
                    c = end - start === 0 ? "'" : s.substring(start, end);
                    break;
                case '%':
                    c = this.Formats.percentSign;
                    this._isPercent = true;
                    break;
                case '\u2030':
                    c = this.Formats.perMilleSign;
                    this._isPerMille = true;
                    break;
                case '\u00a4':
                    if(s.charAt(i) === '\u00a4') {
                        c = this.currency;
                        i++;
                    } else {
                        c = this.Formats[this.currency + "_currencySymbol"];
                    }
                    this._isCurrency = true;
                    break;
            }
            data.push(c);
        }
        return {
            text: data.join(""),
            offset: i
        };
    },

    /**
     * Creates the object that is initialized by parsing. For internal use only.
     * Overrides method from Intl.Common.BaseFormat
     * @method _createParseObject
     * @private
     * @return {Object}
     */
    _createParseObject: function() {
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
 * @extends Intl.Common.BaseFormat.Segment
 *
 * @private
 * @constructor
 *
 * @param format {Number.__zNumberFormat} Parent Format object
 * @param s {String} Pattern representing this segment
 */
NumberFormat.NumberSegment = function(format, s) {
    if (format === null && s === null) { return; }
    NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);
};
Y.extend(NumberFormat.NumberSegment, Format.Segment);

Y.mix(NumberFormat.NumberSegment.prototype, {
    /**
     * Format number segment
     * @method format
     * @param number {Number}
     * @return {String} Formatted result
     */
    format: function(number) {
        var expon, exponReg, s;
        // special values
        if (isNaN(number)) { return this._parent.Formats.nanSymbol; }
        if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {
            return this._parent.Formats.infinitySign;
        }

        // adjust value
        if (typeof number !== "number") { number = Number(number); }
        number = Math.abs(number); // NOTE: minus sign is part of pattern
        if (this._parent._isPercent) { number *= 100; }
        else if (this._parent._isPerMille) { number *= 1000; }
        if(this._parent._parseIntegerOnly) { number = Math.floor(number); }
        
        // format
        expon = this._parent.Formats.exponentialSymbol;
        exponReg = new RegExp(expon + "+");
        s = this._parent._showExponent
            ? number.toExponential(this._parent._maxFracDigits || null).toUpperCase().replace(exponReg,expon)
            : number.toFixed(this._parent._maxFracDigits || 0);
        s = this._normalize(s);
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
        var exponSymbol = this._parent.Formats.exponentialSymbol,
            splitReg = new RegExp("[\\." + exponSymbol + "]"),
            match = s.split(splitReg),
            whole = match.shift(),  //Normalize the whole part
            a = [],
            offset = this._parent._primaryGrouping,
            fract = '0',
            decimal = this._parent.Formats.decimalSeparator,
            expon, i;

        if (whole.length < this._parent._minIntDigits) {
            whole = Y.Intl.Common.zeroPad(whole, this._parent._minIntDigits, 0);
        }
        if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {
            i = whole.length - offset;
            while (i > 0) {
                a.unshift(whole.substr(i, offset));
                a.unshift(this._parent.Formats.groupingSeparator);
                offset = this._parent._secondaryGrouping;
                i -= offset;
            }
            a.unshift(whole.substring(0, i + offset));
		
            whole = a.join("");
        }
	
        if(s.match(/\./)) {
            fract = match.shift();
        }
        else if(s.match(/\e/) || s.match(/\E/)) {
            expon = match.shift();
        }

        a = [ whole ];

        if(!this._parent._parseIntegerOnly) {
           fract = fract.replace(/0+$/,"");
           /*if (fract.length < this._parent._minFracDigits) {
               fract = Y.Intl.Common.zeroPad(fract, this._parent._minFracDigits, 0, true);
           }*/
           if (fract.length > 0) {
               a.push(decimal, fract);
           }
        }
        
        if (expon) {
            a.push(exponSymbol, expon.replace(/^\+/,""));
        }
	
        // return normalize result
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
        var comma = this._parent.Formats.groupingSeparator,
            dot = this._parent.Formats.decimalSeparator,
            minusSign = this._parent.Formats.minusSign,
            expon = this._parent.Formats.exponentialSymbol,
            numberRegexPattern = "[\\" + minusSign + "0-9" + comma + "]+",
            numberRegex, matches, negativeNum, endIndex, scientific = null, i,
            //If more groups, use primary/secondary grouping as applicable
            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;

        if(!this._parent._parseIntegerOnly) {
            numberRegexPattern += "(\\" + dot + "[0-9]+)?";
        }
        if(this._parent._showExponent) {
            numberRegexPattern += "(" + expon +"\\+?[0-9]+)";
        }
        
        numberRegex = new RegExp(numberRegexPattern);
        matches = s.match(numberRegex);
        
        if(!matches) {
            Y.error("Error parsing: Number does not match pattern");
        }
        
        negativeNum = s.indexOf(minusSign) !== -1;
        endIndex = index + matches[0].length;
        s = s.slice(index, endIndex);
        
        //Scientific format does not use grouping
        if(this._parent.showExponent) {
            scientific = s.split(expon);
        } else if(this._parent._useGrouping) {
            //Verify grouping data exists
            if(!this._parent._primaryGrouping) {
                //Should not happen
                Y.error("Error parsing: Invalid pattern");
            }
            
            //Verify grouping is correct
            i = s.length - this._parent._primaryGrouping - 1;
            
            if(matches[1]) {
                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part
                i = i - matches[1].length;
            }
            
            //Use primary grouping for first group
            if(i > 0) {
                //There should be a comma at i
                if(s.charAt(i) !== ',') {
                    Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                s = s.slice(0, i) + s.slice(i+1);
            }
            
            i = i - grouping - 1;
            
            while(i > 0) {
                //There should be a comma at i
                if(s.charAt(i) !== ',') {
                    Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                s = s.slice(0, i) + s.slice(i+1);
                i = i - grouping - 1;
            }
            
            //Verify there are no more grouping separators
            if(s.indexOf(comma) !== -1) {
                Y.error("Error parsing: Number does not match pattern");
            }
        }
        
        if(scientific) {
            object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));
        } else {
            object.value = parseFloat(s, 10);
        }
        
        //Special types
        if(negativeNum) { object.value *= -1; }
        if (this._parent._isPercent) { object.value /= 100; }
        else if (this._parent._isPerMille) { object.value /= 1000; }
        
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
Y.Number.__YNumberFormat = function(style) {
    style = style || Y.Number.STYLES.NUMBER_STYLE;
    
    this.style = style;

    var pattern = "",
        formats = Y.Intl.get(MODULE_NAME);
    switch(style) {
        case Y.Number.STYLES.CURRENCY_STYLE:
            pattern = formats.currencyFormat;
            break;
        case Y.Number.STYLES.ISO_CURRENCY_STYLE:
            pattern = formats.currencyFormat;
            pattern = pattern.replace("\u00a4", "\u00a4\u00a4");
            break;
        case Y.Number.STYLES.NUMBER_STYLE:
            pattern = formats.decimalFormat;
            break;
        case Y.Number.STYLES.PERCENT_STYLE:
            pattern = formats.percentFormat;
            break;
        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:
            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting
            pattern = "{plural_style}";
            break;
        case Y.Number.STYLES.SCIENTIFIC_STYLE:
            pattern = formats.scientificFormat;
            break;
    }
        
    this._numberFormatInstance = new NumberFormat(pattern, formats);
};

YNumberFormat = Y.Number.__YNumberFormat;

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
   
Y.mix(YNumberFormat.prototype, {
    /**
     * Format a number
     * @method format
     * @param number {Number} the number to format
     * @for Number.YNumberFormat
     * @return {String}
     */
    format: function(number) {
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
        return this._numberFormatInstance._parseIntegerOnly;
    },
    
    /**
     * Parse the string to get a number
     * @method parse
     * @param {String} txt The string to parse
     * @param {Number} [pp=0] Parse position. The position to start parsing at.
     */
    parse: function(txt, pp) {
        return this._numberFormatInstance.parse(txt, pp);
    },
    
    /**
     * Sets whether or not numbers should be parsed as integers only.
     * @method setParseIntegerOnly
     * @param {Boolean} newValue set True, this format will parse numbers as integers only.
     */
    setParseIntegerOnly: function(newValue) {
        this._numberFormatInstance._parseIntegerOnly = newValue;
    },

    /**
     * Return currency code associated with object. Valid only if one of currency styles
     * @method getCurrency
     * @return {String}
     */
    getCurrency: function() {
        return this._numberFormatInstance.currency;
    },

    /**
     * Set currency code associated with object. Valid only if one of currency styles
     * @method setCurrency
     * @param currency {String}
     */
    setCurrency: function(currency) {
        this._numberFormatInstance.currency = currency;
    },

    /**
     * Returns true if object is of one of the currency styles
     * @return {Boolean}
     */
    isCurrencyStyle: function() {
        var styles = Y.Number.STYLES;
        return (this.style === styles.CURRENCY_STYLE || this.style === styles.ISO_CURRENCY_STYLE || this.style === styles.PLURAL_CURRENCY_STYLE);
    }
});
Y.mix( Y.Number, {
     _oldFormat: Y.Number.format,
     _oldParse:  Y.Number.parse
});

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
      *      <dt>[currency] {String}</dd>
      *         <dd>Currency code. Used only if style is a currency type</dd>
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
         config = config || {};
    
         if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined
               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {
             return Y.Number._oldFormat(data, config);
         }

         if(Y.Lang.isString(config.style)) {
             config.style = Y.Number.STYLES[config.style];
         }
	
         //If ecmascript i18n api available, use that.
         //Ecmascript i18n api does not support scientific style
         if(Y.Number.formatEcma && config.style !== Y.Number.STYLES.SCIENTIFIC_STYLE) {
             return Y.Number.formatEcma(data, config);
         }

         var formatter = new YNumberFormat(config.style);
         if(config.parseIntegerOnly) {
             formatter.setParseIntegerOnly(true);
         }
         if(formatter.isCurrencyStyle()) {
             if(config.currency !== undefined) {
                 formatter.setCurrency(config.currency);
             }
         }
         return formatter.format(data);
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
         var formatter = new YNumberFormat(config.style);
         return formatter.parse(data, config.parsePosition);
     }
}, true);

//Update Parsers shortcut
Y.namespace("Parsers").number = Y.Number.parse;


}, '@VERSION@', {
    "lang": [
        "af-NA",
        "af-ZA",
        "af",
        "am-ET",
        "am",
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
        "ar",
        "as-IN",
        "as",
        "az-AZ",
        "az-Cyrl-AZ",
        "az-Cyrl",
        "az-Latn-AZ",
        "az",
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
        "de-LI",
        "de-LU",
        "de",
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
        "en-US-POSIX",
        "en-US",
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
        "es",
        "et-EE",
        "et",
        "eu-ES",
        "eu",
        "fa-AF",
        "fa-IR",
        "fa",
        "fi-FI",
        "fi",
        "fil-PH",
        "fil",
        "fo-FO",
        "fo",
        "fr-BE",
        "fr-CA",
        "fr-CH",
        "fr-FR",
        "fr-LU",
        "fr-MC",
        "fr-SN",
        "fr",
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
        "ha-Latn-GH",
        "ha-Latn-NE",
        "ha-Latn-NG",
        "ha-NE",
        "ha-NG",
        "ha",
        "haw-US",
        "haw",
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
        "ja-JP-TRADITIONAL",
        "ja-JP",
        "ja",
        "ka-GE",
        "ka",
        "kk-Cyrl-KZ",
        "kk-KZ",
        "kk",
        "kl-GL",
        "kl",
        "km-KH",
        "km",
        "kn-IN",
        "kn",
        "ko-KR",
        "ko",
        "kok-IN",
        "kok",
        "kw-GB",
        "kw",
        "lt-LT",
        "lt",
        "lv-LV",
        "lv",
        "mk-MK",
        "mk",
        "ml-IN",
        "ml",
        "mr-IN",
        "mr",
        "ms-BN",
        "ms-MY",
        "ms",
        "mt-MT",
        "mt",
        "nb-NO",
        "nb",
        "ne-IN",
        "ne-NP",
        "ne",
        "nl-BE",
        "nl-NL",
        "nl",
        "nn-NO",
        "nn",
        "no-NO",
        "no",
        "om-ET",
        "om-KE",
        "om",
        "or-IN",
        "or",
        "pa-Arab-PK",
        "pa-Arab",
        "pa-Guru-IN",
        "pa-IN",
        "pa-PK",
        "pa",
        "pl-PL",
        "pl",
        "ps-AF",
        "ps",
        "pt-BR",
        "pt-PT",
        "pt",
        "ro-MD",
        "ro-RO",
        "ro",
        "ru-RU",
        "ru-UA",
        "ru",
        "sh-BA",
        "sh-CS",
        "sh-YU",
        "sh",
        "si-LK",
        "si",
        "sk-SK",
        "sk",
        "sl-SI",
        "sl",
        "so-DJ",
        "so-ET",
        "so-KE",
        "so-SO",
        "so",
        "sq-AL",
        "sq",
        "sr-BA",
        "sr-CS",
        "sr-Cyrl-BA",
        "sr-Cyrl-CS",
        "sr-Cyrl-ME",
        "sr-Cyrl-RS",
        "sr-Cyrl-YU",
        "sr-Latn-BA",
        "sr-Latn-CS",
        "sr-Latn-ME",
        "sr-Latn-RS",
        "sr-Latn-YU",
        "sr-ME",
        "sr-RS",
        "sr-YU",
        "sr",
        "sv-FI",
        "sv-SE",
        "sv",
        "sw-KE",
        "sw-TZ",
        "sw",
        "ta-IN",
        "ta",
        "te-IN",
        "te",
        "th-TH",
        "th",
        "ti-ER",
        "ti-ET",
        "ti",
        "tl-PH",
        "tl",
        "tr-TR",
        "tr",
        "uk-UA",
        "uk",
        "ur-IN",
        "ur-PK",
        "ur",
        "uz-AF",
        "uz-Arab-AF",
        "uz-Arab",
        "uz-Cyrl-UZ",
        "uz-Latn-UZ",
        "uz-UZ",
        "uz",
        "vi-VN",
        "vi",
        "zh-CN",
        "zh-HK",
        "zh-Hans-CN",
        "zh-Hans-HK",
        "zh-Hans-MO",
        "zh-Hans-SG",
        "zh-Hant-HK",
        "zh-Hant-MO",
        "zh-Hant-TW",
        "zh-Hant",
        "zh-MO",
        "zh-SG",
        "zh-TW",
        "zh",
        "zu-ZA",
        "zu"
    ],
    "requires": [
        "gallery-i18n-common",
        "datatype-number-format",
        "datatype-number-parse"
    ]
});
