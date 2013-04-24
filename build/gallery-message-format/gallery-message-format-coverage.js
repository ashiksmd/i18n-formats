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
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-message-format/gallery-message-format.js",
    code: []
};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].code=["YUI.add('gallery-message-format', function (Y, NAME) {","","/**"," * This module implements Message formatting similar to the MessageFormat API in ICU"," * @module gallery-message-format"," * @requires intl"," */","var MODULE_NAME = \"gallery-message-format\",","    PluralRules, inRange,","    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter,","    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters;","","/**"," * Formatter base class"," * @class MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgBaseFormatter = function(values) {","    this.values = values;","};","","Formatter = Y.Intl.MsgBaseFormatter;","","Y.mix(Formatter.prototype, {","    /**","     * Get value of key","     * @method getValue","     * @param key {String|Number} Key/index of value in the object/array 'values'","     * @return Value from the data in 'values'","     */","    getValue: function(key) {","        if(Y.Lang.isArray(this.values)) {","            key = parseInt(key, 10);","        }","        return this.values[key];","    },","","    /**","     * Get value of params.key","     * The value found will be set to params.value","     * @method getParams","     * @param params {Object} Object containing key as in { key: \"KEY\" }","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params) {","        if(!params || !params.key) {","            return false;","        }","","        var value = this.getValue(params.key);","	","        if(value !== undefined) {","            params.value = value;","            return true;","        }","","        return false;","    }","});","","//For date and time formatters","Y.mix(Formatter, {","    /**","     * Get current timezone. Used for time format","     * @method getCurrentTimeZone","     * @return {Y.Date.Timezone}","     */","    getCurrentTimeZone: function() {","        if(Y.Date === undefined || Y.Date.Timezone === undefined) { return \"GMT\"; }","        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;","        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);","    }","});","/**"," * String formatter"," * @class StringFormatter"," * @namespace Intl"," * @extends MsgBaseFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.StringFormatter = function(values) {","    StringFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*}\";","};","","StringFormatter = Y.Intl.StringFormatter;","Y.extend(StringFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","StringFormatter.createInstance = function(values) {","    return new StringFormatter(values);","};","","Y.mix(StringFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches && matches[1]) {","            params.key = matches[1];","            if(Formatter.prototype.getParams.call(this, params)) {","                return true;","            }","        }","	","        return false;","    },","","    /**","     * Format all instances in str that can be handled by StringFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                str = str.replace(matches[0], params.value);","            }","","        }","","        return str;","    }","}, true);/**"," * Date formatter"," * @class DateFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.DateFormatter = function(values) {","    DateFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\":  [ 512 /*Y.Date.DATE_FORMATS.YMD_SHORT*/, 0, 0 ],","        \"medium\": [ 256 /*Y.Date.DATE_FORMATS.YMD_ABBREVIATED*/,0, 0 ],","        \"long\":   [ 128 /*Y.Date.DATE_FORMATS.YMD_LONG*/, 0, 0 ],","        \"full\":   [ 1 /*Y.Date.DATE_FORMATS.WYMD_LONG*/, 0, 0 ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*date\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","DateFormatter = Y.Intl.DateFormatter;","Y.extend(DateFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","DateFormatter.createInstance = function(values) {","    return new DateFormatter(values);","};","","Y.mix(DateFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"medium\";","        }			//If no style, default to medium","","        if(!this.styles[params.style]) {","            return false;","        }	//Invalid style","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by DateFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting","     * @return {String} Formatted result","     */","    format: function(str, config) {","        if(Y.Date === undefined || !Y.Date.__advancedFormat ) { return str; }","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, style, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                style = this.styles[params.style];","                result = Y.Date.format(new Date(params.value), {","                    timezone: config.timezone || Formatter.getCurrentTimeZone(),","                    dateFormat: style[0],","                    timeFormat: style[1],","                    timezoneFormat: style[2]","                });","                str = str.replace(matches[0], result);","            }","","        }","","        return str;","    }","}, true);","/**"," * Time formatter"," * @class TimeFormatter"," * @extends DateFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.TimeFormatter = function(values) {","    TimeFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\": [ 0, 2 /*Y.Date.TIME_FORMATS.HM_SHORT*/, 0 ],","        \"medium\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 0 ],","        \"long\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 2 /*Y.Date.TIMEZONE_FORMATS.Z_SHORT*/ ],","        \"full\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 1 /*Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED*/ ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*time\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","TimeFormatter = Y.Intl.TimeFormatter;","Y.extend(TimeFormatter, DateFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","TimeFormatter.createInstance = function(values) {","    return new TimeFormatter(values);","};","/**"," * Number formatter"," * @class NumberFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.NumberFormatter = function(values) {","    NumberFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"integer\": 4 /*Y.Number.STYLES.NUMBER_STYLE*/,","        \"percent\": 8 /*Y.Number.STYLES.PERCENT_STYLE*/,","        \"currency\": 1 /*Y.Number.STYLES.CURRENCY_STYLE*/","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*number\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","NumberFormatter = Y.Intl.NumberFormatter;","Y.extend(NumberFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","NumberFormatter.createInstance = function(values) {","    return new NumberFormatter(values);","};","","Y.mix(NumberFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"integer\";	//If no style, default to medium","            params.showDecimal = true;	//Show decimal parts too","        }","","        if(!this.styles[params.style]) {	//Invalid style","            return false;","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by NumberFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        if(Y.Number === undefined || !Y.Number.__advancedFormat) { return str; }","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, config;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                config = {","                    style: this.styles[params.style]","                };","                if(params.style === \"integer\" && !params.showDecimal) {","                    config.parseIntegerOnly = true;","                }","                str = str.replace(matches[0], Y.Number.format(params.value, config));","            }","        }","","        return str;","    }","}, true);","/**"," * Select formatter. Select ouput based on value of key"," * @class SelectFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.SelectFormatter = function(values) {","    SelectFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*select\\\\s*,\\\\s*\";","};","","SelectFormatter = Y.Intl.SelectFormatter;","Y.extend(SelectFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","SelectFormatter.createInstance = function(values) {","    return new SelectFormatter(values);","};","","Y.mix(SelectFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param str {String} Pattern string","     * @param start {Number} Position in str to start parsing from","     * @return {Object} Object in the form:","             {","               options: [","                     { key: KEY1, value: VALUE1 },","                     { key: KEY2, value: VALUE2 },","                     ... ],","               next: i  //Index of next character in str that can be parsed","             }","     */","    parseOptions: function(str, start) {","        var options = {},","            key = \"\", value = \"\", current = \"\",","            i, ch;","        for(i=start; i<str.length; i++) {","            ch = str.charAt(i);","            if (ch === '\\\\') {","                current += ch + str.charAt(i+1);","                i++;","            } else if (ch === '}') {","                if(current === \"\") {","                    i++;","                    break;","                }","                value = current;","                options[key.trim()] = value;","                current = key = value = \"\";","            } else if (ch === '{') {","                key = current;","                current = \"\";","            } else {","                current += ch;","            }","        }","","        if(current !== \"\") {","            return null;","        }","","        return {","            options: options,","            next: i","        };","    },","","    /**","     * Select output depending on params.value from options","     * @method select","     * @param options {Array} Array of key,value pairs","     * @param params {Object} Object containing value","     * @return {String} selected result","     */","    select: function(options, params) {","        for ( var key in options ) {","            if( key === \"other\" ) {","                continue;	//Will use this only if everything else fails","            }","","            if( key === params.value ) {","                return options[key];","            }","        }","","        return options.other;","    },","","    /**","     * Format all instances in str that can be handled by SelectFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, options, result, start;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                options = this.parseOptions(str, regex.lastIndex);","                if(!options) {","                    continue;","                }","","                regex.lastIndex = options.next;","                options = options.options;","","                result = this.select(options, params);","                if(result) {","                    start = str.indexOf(matches[0]);","                    str = str.slice(0, start) + result + str.slice(regex.lastIndex);","                }","            }","        }","","        return str;","    }","}, true);/**"," * PluralRules is used to determine the plural form in MessageFormat"," * @class PluralRules"," * @namespace Intl"," * @static"," */","Y.Intl.PluralRules = {","    /**","     * Check if n is between start and end","     * @method _inRange","     * @static","     * @private","     * @param n {Number} Number to test","     * @param start {Number} Start of range","     * @param end {Number} End of range","     * @return {Boolean} true if n is between start and end, false otherwise","     */","    _inRange: function(n, start, end) {","        return n >= start && n <= end;","    },","","    /**","     * Find matching plural form for the set of rules","     * @method _matchRule","     * @static","     * @private","     * @param rules {Object} Keys will be plural forms one,two,.. Values will be boolean","     * @return {String} Returns key that has value true","     */","    _matchRule: function(rules) {","        for(var key in rules) {","            if(rules[key]) { return key; }","        }","        return \"other\";","    },","","    /**","     * Set of rules. Each locale will have a matching rule. The corresponding functions in each set","     * will take a number as parameter and return the relevant plural form.","     */","    rules: {","        set1: function(n) {","            var mod = n % 100;","            return PluralRules._matchRule({","                few:  inRange(mod, 3, 10),","                many: inRange(mod, 11, 99),","                one:  n === 1,","                two:  n === 2,","                zero: n === 0","            });","        },","","        set2: function(n) {","            return PluralRules._matchRule({","               many: n !== 0 && n%10 === 0,","               one:  n === 1,","               two:  n === 2","            });","        },","","        set3: function(n) {","            return PluralRules._matchRule({","               one: n === 1","            });","        },","","        set4: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 1)","            });","        },","","        set5: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 2) && n !== 2","            });","        },","","        set6: function(n) {","            return PluralRules._matchRule({","                one:  n%10 === 1 && n%100 !== 11,","                zero: n === 0","            });","        },","","        set7: function(n) {","            return PluralRules._matchRule({","                one: n === 1,","                two: n === 2","            });","        },","","        set8: function(n) {","            return PluralRules._matchRule({","                few:  inRange(n, 3, 6),","                many: inRange(n, 7, 10),","                one:  n === 1,","                two:  n === 2","            });","        },","","        set9: function(n) {","            return PluralRules._matchRule({","                few: n === 0 || (n !== 1 && inRange(n%100, 1, 19)),","                one: n === 1","            });","        },","","        set10: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few: inRange(mod10, 2, 9) && !inRange(mod100, 11, 19),","                one: mod10 === 1 && !inRange(mod100, 11, 19)","            });","        },","","        set11: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),","                many: mod10 === 0 || inRange(mod10, 5, 9) || inRange(mod100, 11, 14),","                one:  mod10 === 1 && mod100 !== 11","            });","        },","","        set12: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 2, 4),","                one: n === 1","            });","        },","","        set13: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),","                many: n !== 1 && inRange(mod10, 0, 1) || inRange(mod10, 5, 9) || inRange(mod100, 12, 14),","                one:  n === 1","            });","        },","","        set14: function(n) {","            var mod = n%100;","            return PluralRules._matchRule({","                few: inRange(mod, 3, 4),","                one: mod === 1,","                two: mod === 2","            });","        },","","        set15: function(n) {","            var mod = n%100;","            return PluralRules._matchRule({","                few:  n === 0 || inRange(mod, 2, 10),","                many: inRange(mod, 11, 19),","                one:  n === 1","            });","        },","","        set16: function(n) {","            return PluralRules._matchRule({","                one: n%10 === 1 && n !== 11","            });","        },","","        set17: function(n) {","            return PluralRules._matchRule({","                few:  n === 3,","                many: n === 6,","                one:  n === 1,","                two:  n === 2,","                zero: n === 0","            });","        },","","        set18: function(n) {","            return PluralRules._matchRule({","                one:  inRange(n, 0, 2) && n !== 0 && n !== 2,","                zero: n === 0","            });","        },","","        set19: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 2, 10),","                one: inRange(n, 0, 1)","            });","        },","","        set20: function(n) {","            var mod1 = n%10, mod2 = n%100, mod6 = n%1000000;","            return PluralRules._matchRule({","                few:  (inRange(mod1, 3, 4) || mod1 === 9) && !inRange(mod2, 10, 19) && !inRange(mod2, 70, 79) && !inRange(mod2, 90, 99),","                many: n !== 0 && mod6 === 0,","                one:  mod1 === 1 && mod2 !== 11 && mod2 !== 71 && mod2 !== 91,","                two:  mod1 === 2 && mod2 !== 12 && mod2 !== 72 && mod2 !== 92","            });","        },","","        set21: function(n) {","            return PluralRules._matchRule({","                one:  n === 1,","                zero: n === 0","            });","        },","","        set22: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 1) || inRange(n, 11, 99)","            });","        },","","        set23: function(n) {","            return PluralRules._matchRule({","                one: inRange(n%10, 1, 2) || n%20 === 0","            });","        },","","        set24: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 3, 10) || inRange(n, 13, 19),","                one: n === 1 || n === 11,","                two: n === 2 || n === 12","            });","        },","","        set25: function(n) {","            return PluralRules._matchRule({","                one: n === 1 || n === 5","            });","        },","","        set26: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                one: (mod10 === 1 || mod10 === 2) && (mod100 !== 11 && mod100 !== 12)","            });","        },","","        set27: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few: mod10 === 3 && mod100 !== 13,","                one: mod10 === 1 && mod100 !== 11,","                two: mod10 === 2 && mod100 !== 12","            });","        },","","        set28: function(n) {","            return PluralRules._matchRule({","                many: n === 11 || n === 8 || n === 80 || n === 800","            });","        },","","        set29: function(n) {","            return PluralRules._matchRule({","                few: n === 4,","                one: n === 1 || n === 3,","                two: n === 2","            });","        },","","        set30: function(n) {","            return PluralRules._matchRule({","                few: n === 4,","                one: n === 1,","                two: n === 2 || n === 3","            });","        },","","        set31: function(n) {","            return PluralRules._matchRule({","                few:  n === 4,","                many: n === 6,","                one:  n === 1,","                two:  n === 2 || n === 3","            });","        },","","        set32: function(n) {","            return PluralRules._matchRule({","                few:  n === 4,","                many: n === 6,","                one:  Y.Array.indexOf([1,5,7,8,9,10], n) > -1,","                two: n === 2 || n === 3","            });","        },","","        set33: function(n) {","            return PluralRules._matchRule({","                few:  inRange(n, 2, 9),","                many: inRange(n, 10, 19) || inRange(n, 100, 199) || inRange(n, 1000, 1999),","                one:  n === 1","            });","        }","    }","};","","PluralRules = Y.Intl.PluralRules;","inRange = PluralRules._inRange;","/**"," * Plural formatter. Select ouput based on whether value of key is singular/plural"," * @class PluralFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.PluralFormatter = function(values) {","    PluralFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*plural\\\\s*,\\\\s*\";","    ","    var formats = Y.Intl.get(MODULE_NAME),","        ruleSet = formats.pluralRule;","","    if(ruleSet) {","         this.rule = PluralRules.rules[ruleSet];","    }","","    if(this.rule === undefined) {","         this.rule = function() { return \"other\"; };","    }","};","","PluralFormatter = Y.Intl.PluralFormatter;","Y.extend(PluralFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","PluralFormatter.createInstance = function(values) {","    return new PluralFormatter(values);","};","","/**"," * Select output depending on params.value from options"," * @method select"," * @param options {Object} Object containing results for singular/plural"," * @param params {Object} Object containing value"," * @return {String} selected result"," */","PluralFormatter.prototype.select = function(options, params) {","    var pluralForm = this.rule(params.value),","        result = options[pluralForm];","","    if(result === undefined || result === null) {","        result = options.other;","    }","","    result = result.replace(\"#\", new NumberFormatter({VAL: params.value}).format(\"{VAL, number, integer}\"));	//Use 'number' to format this part","","    return result;","};","/**"," * Choice formatter. Select ouput based on numerical values"," * @class ChoiceFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.ChoiceFormatter = function(values) {","    ChoiceFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*choice\\\\s*,\\\\s*(.+)}\";","};","","ChoiceFormatter = Y.Intl.ChoiceFormatter;","Y.extend(ChoiceFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","ChoiceFormatter.createInstance = function(values) {","    return new ChoiceFormatter(values);","};","","Y.mix(ChoiceFormatter.prototype, {","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param choicesStr {String} Choice string from pattern","     * @return {Array} Array of objects containing value(choice), result, and relation","     */","    parseOptions: function(choicesStr) {","        var options = [],","            choicesArray = choicesStr.split(\"|\"),","            i, j, choice, relations, rel, mapping, ch;","        for (i=0; i<choicesArray.length; i++) {","            choice = choicesArray[i];","            relations = ['#', '<', '\\u2264'];","            for (j=0; j<relations.length; j++) {","                rel = relations[j];","                if(choice.indexOf(rel) !== -1) {","                    mapping = choice.split(rel);","                    ch = {","                        value: parseInt(mapping[0], 10),","                        result: mapping[1],","                        relation: rel","                    };","                    options.push(ch);","                    break;","                }","            }","        }","","        return options;","    },","","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(SelectFormatter.prototype.getParams.call(this, params, matches)) {","            if(matches[2]) {","                params.choices = this.parseOptions(matches[2]);","                return params.choices === [] ? false: true;","            }","        }","","        return false;","    },","","    /**","     * Select output depending on params.value from options in params.choices","     * @method select","     * @param params {Object} Object containing value and choices","     * @return {String} selected result","     */","    select: function(params) {","        var choice, value, result, relation, i;","        for (i=0; i<params.choices.length; i++) {","            choice = params.choices[i];","            value = choice.value, result = choice.result, relation = choice.relation;","","            if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)","                || (relation === '\\u2264' && value <= params.value)) {","                return result;","            }","        }","","        return \"\";","    },","","    /**","     * Format all instances in str that can be handled by ChoiceFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                result = this.select(params);","                if(result) {","                    str = str.replace(matches[0], result);","                }","            }","        }","","        return str;","    }","}, true);/**"," * List formatter"," * @class MsgListFormatter"," * @namespace Intl"," * @extends StringFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgListFormatter = function(values) {","      MsgListFormatter.superclass.constructor.call(this, values);","      this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*list\\\\s*}\";","};","","MsgListFormatter = Y.Intl.MsgListFormatter;","Y.extend(MsgListFormatter, StringFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","MsgListFormatter.createInstance = function(values) {","     return new MsgListFormatter(values);","};","","Y.mix(MsgListFormatter.prototype, {","     /**","      * Format all instances in str that can be handled by MsgListFormatter","      * @method format","      * @param str {String} Input string/pattern","      * @return {String} Formatted result","      */","     format: function(str) {","          if(Y.Array === undefined || Y.Array.format === undefined) { return str; }","          var regex = new RegExp(this.regex, \"gm\"),","              matches = null,","              params;","","          while((matches = regex.exec(str))) {","              params = {};","","              if(this.getParams(params, matches)) {","                  //Got a match","                  str = str.replace(","                          matches[0],","                          Y.Array.format( params.value )","                  );","              }","          }","","          return str;","     }","}, true);","","/**"," * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime."," * @module intl-format"," * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl"," */","","/**"," * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters."," * If a formatter fails to parse, the next one in the list try to do so."," */","formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];","","Y.mix(Y.Intl, {","","    /**","     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.","     * @method formatMessage","     * @static","     * @param pattern {String} string contains static text with embedded format elements that specify","              how to process and insert strings, numbers, and dates, as well as perform conditional processing.","     * @param values {Object|Array} The data to be processed and inserted.","     * @param [config] {Object} Optional configuration parameters","     * @return {String} Formatted result","     * @example","            //String formatting. Key is replaced by value","            Y.Intl.formatMessage(\"{EMPLOYEE} reports to {MANAGER}\", {","                \"EMPLOYEE\": \"Ashik\",","                \"MANAGER\": \"Dharmesh\"","            });","","            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full","            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone","            Y.Intl.formatMessage(\"Today is {DATE, date, short}\", { DATE: new Date() });","            Y.Intl.formatMessage(\"The time is {DATE, time, medium}\", {DATE: new Date()}, {timezone: \"Asia/Kolkata\"});","            Y.Intl.formatMessage(\"There are {POPULATION_INDIA, number} million people in India.\", {POPULATION_INDIA: 1241.492});","","            //Select formatting. Selects output depending on value","            Y.Intl.formatMessage(\"{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.\", {","                \"NAME\": \"Henri\",","                \"GENDER\": \"male\",","                \"CITY\": \"Paris\"","            });","","            //Plural formatting. Selects output depending on whether numerical value is singular/plural","            Y.Intl.formatMessage(\"{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.\", {","                \"COMPANY_COUNT\": 1","            });","","            //Choice formatting. Selects output depending on numerical value","            Y.Intl.formatMessage(\"There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.\", {","                \"FILE_COUNT\": 1","            });","     */","    formatMessage: function(pattern, values, config) {","        config = config || {};","        var i, formatter;","        for(i=0; i<formatters.length; i++) {","            formatter = formatters[i].createInstance(values);","            pattern = formatter.format(pattern, config);","        }","        return pattern;","    }","});","","","}, '@VERSION@', {","    \"lang\": [","        \"am\",","        \"ar\",","        \"be\",","        \"cs\",","        \"cy\",","        \"fil\",","        \"fr\",","        \"ga\",","        \"gv\",","        \"he\",","        \"hi\",","        \"hr\",","        \"\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"mt\",","        \"pl\",","        \"ro\",","        \"ru\",","        \"sh\",","        \"sk\",","        \"sl\",","        \"sr\",","        \"ti\",","        \"tl\",","        \"uk\"","    ],","    \"requires\": [","        \"intl\"","    ]","});"];
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].lines = {"1":0,"8":0,"21":0,"22":0,"25":0,"27":0,"35":0,"36":0,"38":0,"49":0,"50":0,"53":0,"55":0,"56":0,"57":0,"60":0,"65":0,"72":0,"73":0,"74":0,"86":0,"87":0,"88":0,"91":0,"92":0,"100":0,"101":0,"104":0,"113":0,"114":0,"115":0,"116":0,"120":0,"130":0,"133":0,"134":0,"136":0,"138":0,"143":0,"154":0,"155":0,"156":0,"162":0,"165":0,"166":0,"174":0,"175":0,"178":0,"187":0,"188":0,"189":0,"191":0,"192":0,"196":0,"197":0,"200":0,"201":0,"204":0,"205":0,"208":0,"219":0,"220":0,"223":0,"224":0,"226":0,"228":0,"229":0,"235":0,"240":0,"252":0,"253":0,"254":0,"260":0,"263":0,"264":0,"272":0,"273":0,"284":0,"285":0,"286":0,"291":0,"294":0,"295":0,"303":0,"304":0,"307":0,"316":0,"317":0,"318":0,"320":0,"321":0,"325":0,"326":0,"327":0,"330":0,"331":0,"334":0,"335":0,"338":0,"348":0,"349":0,"352":0,"353":0,"355":0,"357":0,"360":0,"361":0,"363":0,"367":0,"379":0,"380":0,"381":0,"384":0,"385":0,"393":0,"394":0,"397":0,"406":0,"407":0,"408":0,"412":0,"413":0,"416":0,"434":0,"437":0,"438":0,"439":0,"440":0,"441":0,"442":0,"443":0,"444":0,"445":0,"447":0,"448":0,"449":0,"450":0,"451":0,"452":0,"454":0,"458":0,"459":0,"462":0,"476":0,"477":0,"478":0,"481":0,"482":0,"486":0,"496":0,"499":0,"500":0,"502":0,"504":0,"505":0,"506":0,"509":0,"510":0,"512":0,"513":0,"514":0,"515":0,"520":0,"528":0,"540":0,"552":0,"553":0,"555":0,"564":0,"565":0,"575":0,"583":0,"589":0,"595":0,"601":0,"608":0,"615":0,"624":0,"631":0,"632":0,"639":0,"640":0,"648":0,"655":0,"656":0,"664":0,"665":0,"673":0,"674":0,"682":0,"688":0,"698":0,"705":0,"712":0,"713":0,"722":0,"729":0,"735":0,"741":0,"749":0,"755":0,"756":0,"762":0,"763":0,"771":0,"777":0,"785":0,"793":0,"802":0,"811":0,"820":0,"821":0,"831":0,"832":0,"833":0,"835":0,"838":0,"839":0,"842":0,"843":0,"847":0,"848":0,"856":0,"857":0,"867":0,"868":0,"871":0,"872":0,"875":0,"877":0,"888":0,"889":0,"890":0,"893":0,"894":0,"902":0,"903":0,"906":0,"914":0,"917":0,"918":0,"919":0,"920":0,"921":0,"922":0,"923":0,"924":0,"929":0,"930":0,"935":0,"946":0,"947":0,"948":0,"949":0,"953":0,"963":0,"964":0,"965":0,"966":0,"968":0,"970":0,"974":0,"984":0,"987":0,"988":0,"990":0,"991":0,"992":0,"993":0,"998":0,"1009":0,"1010":0,"1011":0,"1014":0,"1015":0,"1023":0,"1024":0,"1027":0,"1035":0,"1036":0,"1040":0,"1041":0,"1043":0,"1045":0,"1052":0,"1066":0,"1068":0,"1110":0,"1111":0,"1112":0,"1113":0,"1114":0,"1116":0};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].functions = {"MsgBaseFormatter:21":0,"getValue:34":0,"getParams:48":0,"getCurrentTimeZone:71":0,"StringFormatter:86":0,"createInstance:100":0,"getParams:112":0,"format:129":0,"DateFormatter:154":0,"createInstance:174":0,"getParams:186":0,"format:218":0,"TimeFormatter:252":0,"createInstance:272":0,"NumberFormatter:284":0,"createInstance:303":0,"getParams:315":0,"format:347":0,"SelectFormatter:379":0,"createInstance:393":0,"getParams:405":0,"parseOptions:433":0,"select:475":0,"format:495":0,"_inRange:539":0,"_matchRule:551":0,"set1:563":0,"set2:574":0,"set3:582":0,"set4:588":0,"set5:594":0,"set6:600":0,"set7:607":0,"set8:614":0,"set9:623":0,"set10:630":0,"set11:638":0,"set12:647":0,"set13:654":0,"set14:663":0,"set15:672":0,"set16:681":0,"set17:687":0,"set18:697":0,"set19:704":0,"set20:711":0,"set21:721":0,"set22:728":0,"set23:734":0,"set24:740":0,"set25:748":0,"set26:754":0,"set27:761":0,"set28:770":0,"set29:776":0,"set30:784":0,"set31:792":0,"set32:801":0,"set33:810":0,"rule:843":0,"PluralFormatter:831":0,"createInstance:856":0,"select:867":0,"ChoiceFormatter:888":0,"createInstance:902":0,"parseOptions:913":0,"getParams:945":0,"select:962":0,"format:983":0,"MsgListFormatter:1009":0,"createInstance:1023":0,"format:1034":0,"formatMessage:1109":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].coveredLines = 293;
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].coveredFunctions = 74;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1);
YUI.add('gallery-message-format', function (Y, NAME) {

/**
 * This module implements Message formatting similar to the MessageFormat API in ICU
 * @module gallery-message-format
 * @requires intl
 */
_yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 8);
var MODULE_NAME = "gallery-message-format",
    PluralRules, inRange,
    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter,
    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters;

/**
 * Formatter base class
 * @class MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 21);
Y.Intl.MsgBaseFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "MsgBaseFormatter", 21);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 22);
this.values = values;
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 25);
Formatter = Y.Intl.MsgBaseFormatter;

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 27);
Y.mix(Formatter.prototype, {
    /**
     * Get value of key
     * @method getValue
     * @param key {String|Number} Key/index of value in the object/array 'values'
     * @return Value from the data in 'values'
     */
    getValue: function(key) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getValue", 34);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 35);
if(Y.Lang.isArray(this.values)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 36);
key = parseInt(key, 10);
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 38);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 48);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 49);
if(!params || !params.key) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 50);
return false;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 53);
var value = this.getValue(params.key);
	
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 55);
if(value !== undefined) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 56);
params.value = value;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 57);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 60);
return false;
    }
});

//For date and time formatters
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 65);
Y.mix(Formatter, {
    /**
     * Get current timezone. Used for time format
     * @method getCurrentTimeZone
     * @return {Y.Date.Timezone}
     */
    getCurrentTimeZone: function() {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getCurrentTimeZone", 71);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 72);
if(Y.Date === undefined || Y.Date.Timezone === undefined) { return "GMT"; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 73);
var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 74);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 86);
Y.Intl.StringFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "StringFormatter", 86);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 87);
StringFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 88);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 91);
StringFormatter = Y.Intl.StringFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 92);
Y.extend(StringFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 100);
StringFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 100);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 101);
return new StringFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 104);
Y.mix(StringFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 112);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 113);
if(matches && matches[1]) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 114);
params.key = matches[1];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 115);
if(Formatter.prototype.getParams.call(this, params)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 116);
return true;
            }
        }
	
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 120);
return false;
    },

    /**
     * Format all instances in str that can be handled by StringFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 129);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 130);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 133);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 134);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 136);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 138);
str = str.replace(matches[0], params.value);
            }

        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 143);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 154);
Y.Intl.DateFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "DateFormatter", 154);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 155);
DateFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 156);
this.styles = {
        "short":  [ 512 /*Y.Date.DATE_FORMATS.YMD_SHORT*/, 0, 0 ],
        "medium": [ 256 /*Y.Date.DATE_FORMATS.YMD_ABBREVIATED*/,0, 0 ],
        "long":   [ 128 /*Y.Date.DATE_FORMATS.YMD_LONG*/, 0, 0 ],
        "full":   [ 1 /*Y.Date.DATE_FORMATS.WYMD_LONG*/, 0, 0 ]
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 162);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 165);
DateFormatter = Y.Intl.DateFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 166);
Y.extend(DateFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 174);
DateFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 174);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 175);
return new DateFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 178);
Y.mix(DateFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 186);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 187);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 188);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 189);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 191);
if(matches[3]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 192);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 196);
if(!params.style) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 197);
params.style = "medium";
        }			//If no style, default to medium

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 200);
if(!this.styles[params.style]) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 201);
return false;
        }	//Invalid style

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 204);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 205);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 208);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 218);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 219);
if(Y.Date === undefined || !Y.Date.__advancedFormat ) { return str; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 220);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, style, result;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 223);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 224);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 226);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 228);
style = this.styles[params.style];
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 229);
result = Y.Date.format(new Date(params.value), {
                    timezone: config.timezone || Formatter.getCurrentTimeZone(),
                    dateFormat: style[0],
                    timeFormat: style[1],
                    timezoneFormat: style[2]
                });
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 235);
str = str.replace(matches[0], result);
            }

        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 240);
return str;
    }
}, true);
/**
 * Time formatter
 * @class TimeFormatter
 * @extends DateFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 252);
Y.Intl.TimeFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "TimeFormatter", 252);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 253);
TimeFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 254);
this.styles = {
        "short": [ 0, 2 /*Y.Date.TIME_FORMATS.HM_SHORT*/, 0 ],
        "medium": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 0 ],
        "long": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 2 /*Y.Date.TIMEZONE_FORMATS.Z_SHORT*/ ],
        "full": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 1 /*Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED*/ ]
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 260);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 263);
TimeFormatter = Y.Intl.TimeFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 264);
Y.extend(TimeFormatter, DateFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 272);
TimeFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 272);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 273);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 284);
Y.Intl.NumberFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "NumberFormatter", 284);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 285);
NumberFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 286);
this.styles = {
        "integer": 4 /*Y.Number.STYLES.NUMBER_STYLE*/,
        "percent": 8 /*Y.Number.STYLES.PERCENT_STYLE*/,
        "currency": 1 /*Y.Number.STYLES.CURRENCY_STYLE*/
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 291);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 294);
NumberFormatter = Y.Intl.NumberFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 295);
Y.extend(NumberFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 303);
NumberFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 303);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 304);
return new NumberFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 307);
Y.mix(NumberFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 315);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 316);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 317);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 318);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 320);
if(matches[3]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 321);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 325);
if(!params.style) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 326);
params.style = "integer";	//If no style, default to medium
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 327);
params.showDecimal = true;	//Show decimal parts too
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 330);
if(!this.styles[params.style]) {	//Invalid style
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 331);
return false;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 334);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 335);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 338);
return false;
    },

    /**
     * Format all instances in str that can be handled by NumberFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 347);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 348);
if(Y.Number === undefined || !Y.Number.__advancedFormat) { return str; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 349);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, config;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 352);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 353);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 355);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 357);
config = {
                    style: this.styles[params.style]
                };
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 360);
if(params.style === "integer" && !params.showDecimal) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 361);
config.parseIntegerOnly = true;
                }
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 363);
str = str.replace(matches[0], Y.Number.format(params.value, config));
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 367);
return str;
    }
}, true);
/**
 * Select formatter. Select ouput based on value of key
 * @class SelectFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 379);
Y.Intl.SelectFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "SelectFormatter", 379);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 380);
SelectFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 381);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 384);
SelectFormatter = Y.Intl.SelectFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 385);
Y.extend(SelectFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 393);
SelectFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 393);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 394);
return new SelectFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 397);
Y.mix(SelectFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 405);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 406);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 407);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 408);
params.key = matches[1];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 412);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 413);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 416);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "parseOptions", 433);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 434);
var options = {},
            key = "", value = "", current = "",
            i, ch;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 437);
for(i=start; i<str.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 438);
ch = str.charAt(i);
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 439);
if (ch === '\\') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 440);
current += ch + str.charAt(i+1);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 441);
i++;
            } else {_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 442);
if (ch === '}') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 443);
if(current === "") {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 444);
i++;
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 445);
break;
                }
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 447);
value = current;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 448);
options[key.trim()] = value;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 449);
current = key = value = "";
            } else {_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 450);
if (ch === '{') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 451);
key = current;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 452);
current = "";
            } else {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 454);
current += ch;
            }}}
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 458);
if(current !== "") {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 459);
return null;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 462);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 475);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 476);
for ( var key in options ) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 477);
if( key === "other" ) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 478);
continue;	//Will use this only if everything else fails
            }

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 481);
if( key === params.value ) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 482);
return options[key];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 486);
return options.other;
    },

    /**
     * Format all instances in str that can be handled by SelectFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 495);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 496);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, options, result, start;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 499);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 500);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 502);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 504);
options = this.parseOptions(str, regex.lastIndex);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 505);
if(!options) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 506);
continue;
                }

                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 509);
regex.lastIndex = options.next;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 510);
options = options.options;

                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 512);
result = this.select(options, params);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 513);
if(result) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 514);
start = str.indexOf(matches[0]);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 515);
str = str.slice(0, start) + result + str.slice(regex.lastIndex);
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 520);
return str;
    }
}, true);/**
 * PluralRules is used to determine the plural form in MessageFormat
 * @class PluralRules
 * @namespace Intl
 * @static
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 528);
Y.Intl.PluralRules = {
    /**
     * Check if n is between start and end
     * @method _inRange
     * @static
     * @private
     * @param n {Number} Number to test
     * @param start {Number} Start of range
     * @param end {Number} End of range
     * @return {Boolean} true if n is between start and end, false otherwise
     */
    _inRange: function(n, start, end) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "_inRange", 539);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 540);
return n >= start && n <= end;
    },

    /**
     * Find matching plural form for the set of rules
     * @method _matchRule
     * @static
     * @private
     * @param rules {Object} Keys will be plural forms one,two,.. Values will be boolean
     * @return {String} Returns key that has value true
     */
    _matchRule: function(rules) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "_matchRule", 551);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 552);
for(var key in rules) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 553);
if(rules[key]) { return key; }
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 555);
return "other";
    },

    /**
     * Set of rules. Each locale will have a matching rule. The corresponding functions in each set
     * will take a number as parameter and return the relevant plural form.
     */
    rules: {
        set1: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set1", 563);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 564);
var mod = n % 100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 565);
return PluralRules._matchRule({
                few:  inRange(mod, 3, 10),
                many: inRange(mod, 11, 99),
                one:  n === 1,
                two:  n === 2,
                zero: n === 0
            });
        },

        set2: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set2", 574);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 575);
return PluralRules._matchRule({
               many: n !== 0 && n%10 === 0,
               one:  n === 1,
               two:  n === 2
            });
        },

        set3: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set3", 582);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 583);
return PluralRules._matchRule({
               one: n === 1
            });
        },

        set4: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set4", 588);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 589);
return PluralRules._matchRule({
                one: inRange(n, 0, 1)
            });
        },

        set5: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set5", 594);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 595);
return PluralRules._matchRule({
                one: inRange(n, 0, 2) && n !== 2
            });
        },

        set6: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set6", 600);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 601);
return PluralRules._matchRule({
                one:  n%10 === 1 && n%100 !== 11,
                zero: n === 0
            });
        },

        set7: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set7", 607);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 608);
return PluralRules._matchRule({
                one: n === 1,
                two: n === 2
            });
        },

        set8: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set8", 614);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 615);
return PluralRules._matchRule({
                few:  inRange(n, 3, 6),
                many: inRange(n, 7, 10),
                one:  n === 1,
                two:  n === 2
            });
        },

        set9: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set9", 623);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 624);
return PluralRules._matchRule({
                few: n === 0 || (n !== 1 && inRange(n%100, 1, 19)),
                one: n === 1
            });
        },

        set10: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set10", 630);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 631);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 632);
return PluralRules._matchRule({
                few: inRange(mod10, 2, 9) && !inRange(mod100, 11, 19),
                one: mod10 === 1 && !inRange(mod100, 11, 19)
            });
        },

        set11: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set11", 638);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 639);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 640);
return PluralRules._matchRule({
                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),
                many: mod10 === 0 || inRange(mod10, 5, 9) || inRange(mod100, 11, 14),
                one:  mod10 === 1 && mod100 !== 11
            });
        },

        set12: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set12", 647);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 648);
return PluralRules._matchRule({
                few: inRange(n, 2, 4),
                one: n === 1
            });
        },

        set13: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set13", 654);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 655);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 656);
return PluralRules._matchRule({
                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),
                many: n !== 1 && inRange(mod10, 0, 1) || inRange(mod10, 5, 9) || inRange(mod100, 12, 14),
                one:  n === 1
            });
        },

        set14: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set14", 663);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 664);
var mod = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 665);
return PluralRules._matchRule({
                few: inRange(mod, 3, 4),
                one: mod === 1,
                two: mod === 2
            });
        },

        set15: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set15", 672);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 673);
var mod = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 674);
return PluralRules._matchRule({
                few:  n === 0 || inRange(mod, 2, 10),
                many: inRange(mod, 11, 19),
                one:  n === 1
            });
        },

        set16: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set16", 681);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 682);
return PluralRules._matchRule({
                one: n%10 === 1 && n !== 11
            });
        },

        set17: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set17", 687);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 688);
return PluralRules._matchRule({
                few:  n === 3,
                many: n === 6,
                one:  n === 1,
                two:  n === 2,
                zero: n === 0
            });
        },

        set18: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set18", 697);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 698);
return PluralRules._matchRule({
                one:  inRange(n, 0, 2) && n !== 0 && n !== 2,
                zero: n === 0
            });
        },

        set19: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set19", 704);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 705);
return PluralRules._matchRule({
                few: inRange(n, 2, 10),
                one: inRange(n, 0, 1)
            });
        },

        set20: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set20", 711);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 712);
var mod1 = n%10, mod2 = n%100, mod6 = n%1000000;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 713);
return PluralRules._matchRule({
                few:  (inRange(mod1, 3, 4) || mod1 === 9) && !inRange(mod2, 10, 19) && !inRange(mod2, 70, 79) && !inRange(mod2, 90, 99),
                many: n !== 0 && mod6 === 0,
                one:  mod1 === 1 && mod2 !== 11 && mod2 !== 71 && mod2 !== 91,
                two:  mod1 === 2 && mod2 !== 12 && mod2 !== 72 && mod2 !== 92
            });
        },

        set21: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set21", 721);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 722);
return PluralRules._matchRule({
                one:  n === 1,
                zero: n === 0
            });
        },

        set22: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set22", 728);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 729);
return PluralRules._matchRule({
                one: inRange(n, 0, 1) || inRange(n, 11, 99)
            });
        },

        set23: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set23", 734);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 735);
return PluralRules._matchRule({
                one: inRange(n%10, 1, 2) || n%20 === 0
            });
        },

        set24: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set24", 740);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 741);
return PluralRules._matchRule({
                few: inRange(n, 3, 10) || inRange(n, 13, 19),
                one: n === 1 || n === 11,
                two: n === 2 || n === 12
            });
        },

        set25: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set25", 748);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 749);
return PluralRules._matchRule({
                one: n === 1 || n === 5
            });
        },

        set26: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set26", 754);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 755);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 756);
return PluralRules._matchRule({
                one: (mod10 === 1 || mod10 === 2) && (mod100 !== 11 && mod100 !== 12)
            });
        },

        set27: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set27", 761);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 762);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 763);
return PluralRules._matchRule({
                few: mod10 === 3 && mod100 !== 13,
                one: mod10 === 1 && mod100 !== 11,
                two: mod10 === 2 && mod100 !== 12
            });
        },

        set28: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set28", 770);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 771);
return PluralRules._matchRule({
                many: n === 11 || n === 8 || n === 80 || n === 800
            });
        },

        set29: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set29", 776);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 777);
return PluralRules._matchRule({
                few: n === 4,
                one: n === 1 || n === 3,
                two: n === 2
            });
        },

        set30: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set30", 784);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 785);
return PluralRules._matchRule({
                few: n === 4,
                one: n === 1,
                two: n === 2 || n === 3
            });
        },

        set31: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set31", 792);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 793);
return PluralRules._matchRule({
                few:  n === 4,
                many: n === 6,
                one:  n === 1,
                two:  n === 2 || n === 3
            });
        },

        set32: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set32", 801);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 802);
return PluralRules._matchRule({
                few:  n === 4,
                many: n === 6,
                one:  Y.Array.indexOf([1,5,7,8,9,10], n) > -1,
                two: n === 2 || n === 3
            });
        },

        set33: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set33", 810);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 811);
return PluralRules._matchRule({
                few:  inRange(n, 2, 9),
                many: inRange(n, 10, 19) || inRange(n, 100, 199) || inRange(n, 1000, 1999),
                one:  n === 1
            });
        }
    }
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 820);
PluralRules = Y.Intl.PluralRules;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 821);
inRange = PluralRules._inRange;
/**
 * Plural formatter. Select ouput based on whether value of key is singular/plural
 * @class PluralFormatter
 * @extends SelectFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 831);
Y.Intl.PluralFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "PluralFormatter", 831);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 832);
PluralFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 833);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*";
    
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 835);
var formats = Y.Intl.get(MODULE_NAME),
        ruleSet = formats.pluralRule;

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 838);
if(ruleSet) {
         _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 839);
this.rule = PluralRules.rules[ruleSet];
    }

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 842);
if(this.rule === undefined) {
         _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 843);
this.rule = function() { _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "rule", 843);
return "other"; };
    }
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 847);
PluralFormatter = Y.Intl.PluralFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 848);
Y.extend(PluralFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 856);
PluralFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 856);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 857);
return new PluralFormatter(values);
};

/**
 * Select output depending on params.value from options
 * @method select
 * @param options {Object} Object containing results for singular/plural
 * @param params {Object} Object containing value
 * @return {String} selected result
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 867);
PluralFormatter.prototype.select = function(options, params) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 867);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 868);
var pluralForm = this.rule(params.value),
        result = options[pluralForm];

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 871);
if(result === undefined || result === null) {
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 872);
result = options.other;
    }

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 875);
result = result.replace("#", new NumberFormatter({VAL: params.value}).format("{VAL, number, integer}"));	//Use 'number' to format this part

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 877);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 888);
Y.Intl.ChoiceFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "ChoiceFormatter", 888);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 889);
ChoiceFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 890);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 893);
ChoiceFormatter = Y.Intl.ChoiceFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 894);
Y.extend(ChoiceFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 902);
ChoiceFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 902);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 903);
return new ChoiceFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 906);
Y.mix(ChoiceFormatter.prototype, {
    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param choicesStr {String} Choice string from pattern
     * @return {Array} Array of objects containing value(choice), result, and relation
     */
    parseOptions: function(choicesStr) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "parseOptions", 913);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 914);
var options = [],
            choicesArray = choicesStr.split("|"),
            i, j, choice, relations, rel, mapping, ch;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 917);
for (i=0; i<choicesArray.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 918);
choice = choicesArray[i];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 919);
relations = ['#', '<', '\u2264'];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 920);
for (j=0; j<relations.length; j++) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 921);
rel = relations[j];
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 922);
if(choice.indexOf(rel) !== -1) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 923);
mapping = choice.split(rel);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 924);
ch = {
                        value: parseInt(mapping[0], 10),
                        result: mapping[1],
                        relation: rel
                    };
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 929);
options.push(ch);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 930);
break;
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 935);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 945);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 946);
if(SelectFormatter.prototype.getParams.call(this, params, matches)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 947);
if(matches[2]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 948);
params.choices = this.parseOptions(matches[2]);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 949);
return params.choices === [] ? false: true;
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 953);
return false;
    },

    /**
     * Select output depending on params.value from options in params.choices
     * @method select
     * @param params {Object} Object containing value and choices
     * @return {String} selected result
     */
    select: function(params) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 962);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 963);
var choice, value, result, relation, i;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 964);
for (i=0; i<params.choices.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 965);
choice = params.choices[i];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 966);
value = choice.value, result = choice.result, relation = choice.relation;

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 968);
if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)
                || (relation === '\u2264' && value <= params.value)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 970);
return result;
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 974);
return "";
    },

    /**
     * Format all instances in str that can be handled by ChoiceFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 983);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 984);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, result;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 987);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 988);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 990);
if(this.getParams(params, matches)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 991);
result = this.select(params);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 992);
if(result) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 993);
str = str.replace(matches[0], result);
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 998);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1009);
Y.Intl.MsgListFormatter = function(values) {
      _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "MsgListFormatter", 1009);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1010);
MsgListFormatter.superclass.constructor.call(this, values);
      _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1011);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*list\\s*}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1014);
MsgListFormatter = Y.Intl.MsgListFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1015);
Y.extend(MsgListFormatter, StringFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1023);
MsgListFormatter.createInstance = function(values) {
     _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 1023);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1024);
return new MsgListFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1027);
Y.mix(MsgListFormatter.prototype, {
     /**
      * Format all instances in str that can be handled by MsgListFormatter
      * @method format
      * @param str {String} Input string/pattern
      * @return {String} Formatted result
      */
     format: function(str) {
          _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 1034);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1035);
if(Y.Array === undefined || Y.Array.format === undefined) { return str; }
          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1036);
var regex = new RegExp(this.regex, "gm"),
              matches = null,
              params;

          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1040);
while((matches = regex.exec(str))) {
              _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1041);
params = {};

              _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1043);
if(this.getParams(params, matches)) {
                  //Got a match
                  _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1045);
str = str.replace(
                          matches[0],
                          Y.Array.format( params.value )
                  );
              }
          }

          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1052);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1066);
formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1068);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "formatMessage", 1109);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1110);
config = config || {};
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1111);
var i, formatter;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1112);
for(i=0; i<formatters.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1113);
formatter = formatters[i].createInstance(values);
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1114);
pattern = formatter.format(pattern, config);
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1116);
return pattern;
    }
});


}, '@VERSION@', {
    "lang": [
        "am",
        "ar",
        "be",
        "cs",
        "cy",
        "fil",
        "fr",
        "ga",
        "gv",
        "he",
        "hi",
        "hr",
        "",
        "kw",
        "lt",
        "lv",
        "mk",
        "mt",
        "pl",
        "ro",
        "ru",
        "sh",
        "sk",
        "sl",
        "sr",
        "ti",
        "tl",
        "uk"
    ],
    "requires": [
        "intl"
    ]
});
