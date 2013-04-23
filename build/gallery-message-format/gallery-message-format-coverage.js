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
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].code=["YUI.add('gallery-message-format', function (Y, NAME) {","","/**"," * This module implements Message formatting similar to the MessageFormat API in ICU"," * @module gallery-message-format"," * @requires intl"," */","var MODULE_NAME = \"gallery-message-format\",","    PluralRules, inRange,","    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter,","    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters;","","/**"," * Formatter base class"," * @class MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgBaseFormatter = function(values) {","    this.values = values;","};","","Formatter = Y.Intl.MsgBaseFormatter;","","Y.mix(Formatter.prototype, {","    /**","     * Get value of key","     * @method getValue","     * @param key {String|Number} Key/index of value in the object/array 'values'","     * @return Value from the data in 'values'","     */","    getValue: function(key) {","        if(Y.Lang.isArray(this.values)) {","            key = parseInt(key, 10);","        }","        return this.values[key];","    },","","    /**","     * Get value of params.key","     * The value found will be set to params.value","     * @method getParams","     * @param params {Object} Object containing key as in { key: \"KEY\" }","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params) {","        if(!params || !params.key) {","            return false;","        }","","        var value = this.getValue(params.key);","	","        if(value !== undefined) {","            params.value = value;","            return true;","        }","","        return false;","    },","","    /**","     * Format string. Will be overridden in descendants","     * @method format","     */","    format: function(/*str, config*/) {","        Y.error('Not implemented');	//Must override in descendants","    }","});","","//For date and time formatters","Y.mix(Formatter, {","    /**","     * Create an instance of the formatter","     * @method createInstance","     * @static","     * //param values {Array|Object} The data to be processed and inserted.","     */","    createInstance: function(/*values*/) {","        //return new Formatter(values);","        Y.error('Not implemented');	//Must override in descendants","    },","","    /**","     * Get current timezone. Used for time format","     * @method getCurrentTimeZone","     * @return {Y.Date.Timezone}","     */","    getCurrentTimeZone: function() {","        if(Y.Date === undefined || Y.Date.Timezone === undefined) { return \"GMT\"; }","        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;","        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);","    }","});","/**"," * String formatter"," * @class StringFormatter"," * @namespace Intl"," * @extends MsgBaseFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.StringFormatter = function(values) {","    StringFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*}\";","};","","StringFormatter = Y.Intl.StringFormatter;","Y.extend(StringFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","StringFormatter.createInstance = function(values) {","    return new StringFormatter(values);","};","","Y.mix(StringFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches && matches[1]) {","            params.key = matches[1];","            if(Formatter.prototype.getParams.call(this, params)) {","                return true;","            }","        }","	","        return false;","    },","","    /**","     * Format all instances in str that can be handled by StringFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                str = str.replace(matches[0], params.value);","            }","","        }","","        return str;","    }","}, true);/**"," * Date formatter"," * @class DateFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.DateFormatter = function(values) {","    DateFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\":  [ 512 /*Y.Date.DATE_FORMATS.YMD_SHORT*/, 0, 0 ],","        \"medium\": [ 256 /*Y.Date.DATE_FORMATS.YMD_ABBREVIATED*/,0, 0 ],","        \"long\":   [ 128 /*Y.Date.DATE_FORMATS.YMD_LONG*/, 0, 0 ],","        \"full\":   [ 1 /*Y.Date.DATE_FORMATS.WYMD_LONG*/, 0, 0 ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*date\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","DateFormatter = Y.Intl.DateFormatter;","Y.extend(DateFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","DateFormatter.createInstance = function(values) {","    return new DateFormatter(values);","};","","Y.mix(DateFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"medium\";","        }			//If no style, default to medium","","        if(!this.styles[params.style]) {","            return false;","        }	//Invalid style","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by DateFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting","     * @return {String} Formatted result","     */","    format: function(str, config) {","        if(Y.Date === undefined || !Y.Date.__advancedFormat ) { return str; }","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, style, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                style = this.styles[params.style];","                result = Y.Date.format(new Date(params.value), {","                    timezone: config.timezone || Formatter.getCurrentTimeZone(),","                    dateFormat: style[0],","                    timeFormat: style[1],","                    timezoneFormat: style[2]","                });","                str = str.replace(matches[0], result);","            }","","        }","","        return str;","    }","}, true);","/**"," * Time formatter"," * @class TimeFormatter"," * @extends DateFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.TimeFormatter = function(values) {","    TimeFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\": [ 0, 2 /*Y.Date.TIME_FORMATS.HM_SHORT*/, 0 ],","        \"medium\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 0 ],","        \"long\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 2 /*Y.Date.TIMEZONE_FORMATS.Z_SHORT*/ ],","        \"full\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 1 /*Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED*/ ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*time\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","TimeFormatter = Y.Intl.TimeFormatter;","Y.extend(TimeFormatter, DateFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","TimeFormatter.createInstance = function(values) {","    return new TimeFormatter(values);","};","/**"," * Number formatter"," * @class NumberFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.NumberFormatter = function(values) {","    NumberFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"integer\": 4 /*Y.Number.STYLES.NUMBER_STYLE*/,","        \"percent\": 8 /*Y.Number.STYLES.PERCENT_STYLE*/,","        \"currency\": 1 /*Y.Number.STYLES.CURRENCY_STYLE*/","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*number\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","NumberFormatter = Y.Intl.NumberFormatter;","Y.extend(NumberFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","NumberFormatter.createInstance = function(values) {","    return new NumberFormatter(values);","};","","Y.mix(NumberFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"integer\";	//If no style, default to medium","            params.showDecimal = true;	//Show decimal parts too","        }","","        if(!this.styles[params.style]) {	//Invalid style","            return false;","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by NumberFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        if(Y.Number === undefined || !Y.Number.__advancedFormat) { return str; }","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, config;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                config = {","                    style: this.styles[params.style]","                };","                if(params.style === \"integer\" && !params.showDecimal) {","                    config.parseIntegerOnly = true;","                }","                str = str.replace(matches[0], Y.Number.format(params.value, config));","            }","        }","","        return str;","    }","}, true);","/**"," * Select formatter. Select ouput based on value of key"," * @class SelectFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.SelectFormatter = function(values) {","    SelectFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*select\\\\s*,\\\\s*\";","};","","SelectFormatter = Y.Intl.SelectFormatter;","Y.extend(SelectFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","SelectFormatter.createInstance = function(values) {","    return new SelectFormatter(values);","};","","Y.mix(SelectFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param str {String} Pattern string","     * @param start {Number} Position in str to start parsing from","     * @return {Object} Object in the form:","             {","               options: [","                     { key: KEY1, value: VALUE1 },","                     { key: KEY2, value: VALUE2 },","                     ... ],","               next: i  //Index of next character in str that can be parsed","             }","     */","    parseOptions: function(str, start) {","        var options = {},","            key = \"\", value = \"\", current = \"\",","            i, ch;","        for(i=start; i<str.length; i++) {","            ch = str.charAt(i);","            if (ch === '\\\\') {","                current += ch + str.charAt(i+1);","                i++;","            } else if (ch === '}') {","                if(current === \"\") {","                    i++;","                    break;","                }","                value = current;","                options[key.trim()] = value;","                current = key = value = \"\";","            } else if (ch === '{') {","                key = current;","                current = \"\";","            } else {","                current += ch;","            }","        }","","        if(current !== \"\") {","            return null;","        }","","        return {","            options: options,","            next: i","        };","    },","","    /**","     * Select output depending on params.value from options","     * @method select","     * @param options {Array} Array of key,value pairs","     * @param params {Object} Object containing value","     * @return {String} selected result","     */","    select: function(options, params) {","        for ( var key in options ) {","            if( key === \"other\" ) {","                continue;	//Will use this only if everything else fails","            }","","            if( key === params.value ) {","                return options[key];","            }","        }","","        return options.other;","    },","","    /**","     * Format all instances in str that can be handled by SelectFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, options, result, start;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                options = this.parseOptions(str, regex.lastIndex);","                if(!options) {","                    continue;","                }","","                regex.lastIndex = options.next;","                options = options.options;","","                result = this.select(options, params);","                if(result) {","                    start = str.indexOf(matches[0]);","                    str = str.slice(0, start) + result + str.slice(regex.lastIndex);","                }","            }","        }","","        return str;","    }","}, true);/**"," * PluralRules is used to determine the plural form in MessageFormat"," * @class PluralRules"," * @namespace Intl"," * @static"," */","Y.Intl.PluralRules = {","    /**","     * Check if n is between start and end","     * @method _inRange","     * @static","     * @private","     * @param n {Number} Number to test","     * @param start {Number} Start of range","     * @param end {Number} End of range","     * @return {Boolean} true if n is between start and end, false otherwise","     */","    _inRange: function(n, start, end) {","        return n >= start && n <= end;","    },","","    /**","     * Find matching plural form for the set of rules","     * @method _matchRule","     * @static","     * @private","     * @param rules {Object} Keys will be plural forms one,two,.. Values will be boolean","     * @return {String} Returns key that has value true","     */","    _matchRule: function(rules) {","        for(var key in rules) {","            if(rules[key]) { return key; }","        }","        return \"other\";","    },","","    /**","     * Set of rules. Each locale will have a matching rule. The corresponding functions in each set","     * will take a number as parameter and return the relevant plural form.","     */","    rules: {","        set1: function(n) {","            var mod = n % 100;","            return PluralRules._matchRule({","                few:  inRange(mod, 3, 10),","                many: inRange(mod, 11, 99),","                one:  n === 1,","                two:  n === 2,","                zero: n === 0","            });","        },","","        set2: function(n) {","            return PluralRules._matchRule({","               many: n !== 0 && n%10 === 0,","               one:  n === 1,","               two:  n === 2","            });","        },","","        set3: function(n) {","            return PluralRules._matchRule({","               one: n === 1","            });","        },","","        set4: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 1)","            });","        },","","        set5: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 2) && n !== 2","            });","        },","","        set6: function(n) {","            return PluralRules._matchRule({","                one:  n%10 === 1 && n%100 !== 11,","                zero: n === 0","            });","        },","","        set7: function(n) {","            return PluralRules._matchRule({","                one: n === 1,","                two: n === 2","            });","        },","","        set8: function(n) {","            return PluralRules._matchRule({","                few:  inRange(n, 3, 6),","                many: inRange(n, 7, 10),","                one:  n === 1,","                two:  n === 2","            });","        },","","        set9: function(n) {","            return PluralRules._matchRule({","                few: n === 0 || (n !== 1 && inRange(n%100, 1, 19)),","                one: n === 1","            });","        },","","        set10: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few: inRange(mod10, 2, 9) && !inRange(mod100, 11, 19),","                one: mod10 === 1 && !inRange(mod100, 11, 19)","            });","        },","","        set11: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),","                many: mod10 === 0 || inRange(mod10, 5, 9) || inRange(mod100, 11, 14),","                one:  mod10 === 1 && mod100 !== 11","            });","        },","","        set12: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 2, 4),","                one: n === 1","            });","        },","","        set13: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),","                many: n !== 1 && inRange(mod10, 0, 1) || inRange(mod10, 5, 9) || inRange(mod100, 12, 14),","                one:  n === 1","            });","        },","","        set14: function(n) {","            var mod = n%100;","            return PluralRules._matchRule({","                few: inRange(mod, 3, 4),","                one: mod === 1,","                two: mod === 2","            });","        },","","        set15: function(n) {","            var mod = n%100;","            return PluralRules._matchRule({","                few:  n === 0 || inRange(mod, 2, 10),","                many: inRange(mod, 11, 19),","                one:  n === 1","            });","        },","","        set16: function(n) {","            return PluralRules._matchRule({","                one: n%10 === 1 && n !== 11","            });","        },","","        set17: function(n) {","            return PluralRules._matchRule({","                few:  n === 3,","                many: n === 6,","                one:  n === 1,","                two:  n === 2,","                zero: n === 0","            });","        },","","        set18: function(n) {","            return PluralRules._matchRule({","                one:  inRange(n, 0, 2) && n !== 0 && n !== 2,","                zero: n === 0","            });","        },","","        set19: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 2, 10),","                one: inRange(n, 0, 1)","            });","        },","","        set20: function(n) {","            var mod1 = n%10, mod2 = n%100, mod6 = n%1000000;","            return PluralRules._matchRule({","                few:  (inRange(mod1, 3, 4) || mod1 === 9) && !inRange(mod2, 10, 19) && !inRange(mod2, 70, 79) && !inRange(mod2, 90, 99),","                many: n !== 0 && mod6 === 0,","                one:  mod1 === 1 && mod2 !== 11 && mod2 !== 71 && mod2 !== 91,","                two:  mod1 === 2 && mod2 !== 12 && mod2 !== 72 && mod2 !== 92","            });","        },","","        set21: function(n) {","            return PluralRules._matchRule({","                one:  n === 1,","                zero: n === 0","            });","        },","","        set22: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 1) || inRange(n, 11, 99)","            });","        },","","        set23: function(n) {","            return PluralRules._matchRule({","                one: inRange(n%10, 1, 2) || n%20 === 0","            });","        },","","        set24: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 3, 10) || inRange(n, 13, 19),","                one: n === 1 || n === 11,","                two: n === 2 || n === 12","            });","        },","","        set25: function(n) {","            return PluralRules._matchRule({","                one: n === 1 || n === 5","            });","        },","","        set26: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                one: (mod10 === 1 || mod10 === 2) && (mod100 !== 11 && mod100 !== 12)","            });","        },","","        set27: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few: mod10 === 3 && mod100 !== 13,","                one: mod10 === 1 && mod100 !== 11,","                two: mod10 === 2 && mod100 !== 12","            });","        },","","        set28: function(n) {","            return PluralRules._matchRule({","                many: n === 11 || n === 8 || n === 80 || n === 800","            });","        },","","        set29: function(n) {","            return PluralRules._matchRule({","                few: n === 4,","                one: n === 1 || n === 3,","                two: n === 2","            });","        },","","        set30: function(n) {","            return PluralRules._matchRule({","                few: n === 4,","                one: n === 1,","                two: n === 2 || n === 3","            });","        },","","        set31: function(n) {","            return PluralRules._matchRule({","                few:  n === 4,","                many: n === 6,","                one:  n === 1,","                two:  n === 2 || n === 3","            });","        },","","        set32: function(n) {","            return PluralRules._matchRule({","                few:  n === 4,","                many: n === 6,","                one:  Y.Array.indexOf([1,5,7,8,9,10], n) > -1,","                two: n === 2 || n === 3","            });","        },","","        set33: function(n) {","            return PluralRules._matchRule({","                few:  inRange(n, 2, 9),","                many: inRange(n, 10, 19) || inRange(n, 100, 199) || inRange(n, 1000, 1999),","                one:  n === 1","            });","        }","    }","};","","PluralRules = Y.Intl.PluralRules;","inRange = PluralRules._inRange;","/**"," * Plural formatter. Select ouput based on whether value of key is singular/plural"," * @class PluralFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.PluralFormatter = function(values) {","    PluralFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*plural\\\\s*,\\\\s*\";","    ","    var formats = Y.Intl.get(MODULE_NAME),","        ruleSet = formats.pluralRule;","","    if(ruleSet) {","         this.rule = PluralRules.rules[ruleSet];","    }","","    if(this.rule === undefined) {","         this.rule = function() { return \"other\"; };","    }","};","","PluralFormatter = Y.Intl.PluralFormatter;","Y.extend(PluralFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","PluralFormatter.createInstance = function(values) {","    return new PluralFormatter(values);","};","","/**"," * Select output depending on params.value from options"," * @method select"," * @param options {Object} Object containing results for singular/plural"," * @param params {Object} Object containing value"," * @return {String} selected result"," */","PluralFormatter.prototype.select = function(options, params) {","    var pluralForm = this.rule(params.value),","        result = options[pluralForm];","","    if(result === undefined || result === null) {","        result = options.other;","    }","","    result = result.replace(\"#\", new NumberFormatter({VAL: params.value}).format(\"{VAL, number, integer}\"));	//Use 'number' to format this part","","    return result;","};","/**"," * Choice formatter. Select ouput based on numerical values"," * @class ChoiceFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.ChoiceFormatter = function(values) {","    ChoiceFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*choice\\\\s*,\\\\s*(.+)}\";","};","","ChoiceFormatter = Y.Intl.ChoiceFormatter;","Y.extend(ChoiceFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","ChoiceFormatter.createInstance = function(values) {","    return new ChoiceFormatter(values);","};","","Y.mix(ChoiceFormatter.prototype, {","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param choicesStr {String} Choice string from pattern","     * @return {Array} Array of objects containing value(choice), result, and relation","     */","    parseOptions: function(choicesStr) {","        var options = [],","            choicesArray = choicesStr.split(\"|\"),","            i, j, choice, relations, rel, mapping, ch;","        for (i=0; i<choicesArray.length; i++) {","            choice = choicesArray[i];","            relations = ['#', '<', '\\u2264'];","            for (j=0; j<relations.length; j++) {","                rel = relations[j];","                if(choice.indexOf(rel) !== -1) {","                    mapping = choice.split(rel);","                    ch = {","                        value: parseInt(mapping[0], 10),","                        result: mapping[1],","                        relation: rel","                    };","                    options.push(ch);","                    break;","                }","            }","        }","","        return options;","    },","","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(SelectFormatter.prototype.getParams.call(this, params, matches)) {","            if(matches[2]) {","                params.choices = this.parseOptions(matches[2]);","                return params.choices === [] ? false: true;","            }","        }","","        return false;","    },","","    /**","     * Select output depending on params.value from options in params.choices","     * @method select","     * @param params {Object} Object containing value and choices","     * @return {String} selected result","     */","    select: function(params) {","        var choice, value, result, relation, i;","        for (i=0; i<params.choices.length; i++) {","            choice = params.choices[i];","            value = choice.value, result = choice.result, relation = choice.relation;","","            if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)","                || (relation === '\\u2264' && value <= params.value)) {","                return result;","            }","        }","","        return \"\";","    },","","    /**","     * Format all instances in str that can be handled by ChoiceFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                result = this.select(params);","                if(result) {","                    str = str.replace(matches[0], result);","                }","            }","        }","","        return str;","    }","}, true);/**"," * List formatter"," * @class MsgListFormatter"," * @namespace Intl"," * @extends StringFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgListFormatter = function(values) {","      MsgListFormatter.superclass.constructor.call(this, values);","      this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*list\\\\s*}\";","};","","MsgListFormatter = Y.Intl.MsgListFormatter;","Y.extend(MsgListFormatter, StringFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","MsgListFormatter.createInstance = function(values) {","     return new MsgListFormatter(values);","};","","Y.mix(MsgListFormatter.prototype, {","     /**","      * Format all instances in str that can be handled by MsgListFormatter","      * @method format","      * @param str {String} Input string/pattern","      * @return {String} Formatted result","      */","     format: function(str) {","          if(Y.Intl === undefined || Y.Intl.ListFormatter === undefined || Y.Intl.ListFormatter.format === undefined) { return str; }","          var regex = new RegExp(this.regex, \"gm\"),","              matches = null,","              params;","","          while((matches = regex.exec(str))) {","              params = {};","","              if(this.getParams(params, matches)) {","                  //Got a match","                  str = str.replace(","                             matches[0],","                             Y.Intl.ListFormatter.format( params.value )","                  );","              }","          }","","          return str;","     }","}, true);","","/**"," * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime."," * @module intl-format"," * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl"," */","","/**"," * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters."," * If a formatter fails to parse, the next one in the list try to do so."," */","formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];","","Y.mix(Y.Intl, {","","    /**","     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.","     * @method formatMessage","     * @static","     * @param pattern {String} string contains static text with embedded format elements that specify","              how to process and insert strings, numbers, and dates, as well as perform conditional processing.","     * @param values {Object|Array} The data to be processed and inserted.","     * @param [config] {Object} Optional configuration parameters","     * @return {String} Formatted result","     * @example","            //String formatting. Key is replaced by value","            Y.Intl.formatMessage(\"{EMPLOYEE} reports to {MANAGER}\", {","                \"EMPLOYEE\": \"Ashik\",","                \"MANAGER\": \"Dharmesh\"","            });","","            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full","            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone","            Y.Intl.formatMessage(\"Today is {DATE, date, short}\", { DATE: new Date() });","            Y.Intl.formatMessage(\"The time is {DATE, time, medium}\", {DATE: new Date()}, {timezone: \"Asia/Kolkata\"});","            Y.Intl.formatMessage(\"There are {POPULATION_INDIA, number} million people in India.\", {POPULATION_INDIA: 1241.492});","","            //Select formatting. Selects output depending on value","            Y.Intl.formatMessage(\"{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.\", {","                \"NAME\": \"Henri\",","                \"GENDER\": \"male\",","                \"CITY\": \"Paris\"","            });","","            //Plural formatting. Selects output depending on whether numerical value is singular/plural","            Y.Intl.formatMessage(\"{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.\", {","                \"COMPANY_COUNT\": 1","            });","","            //Choice formatting. Selects output depending on numerical value","            Y.Intl.formatMessage(\"There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.\", {","                \"FILE_COUNT\": 1","            });","     */","    formatMessage: function(pattern, values, config) {","        config = config || {};","        var i, formatter;","        for(i=0; i<formatters.length; i++) {","            formatter = formatters[i].createInstance(values);","            pattern = formatter.format(pattern, config);","        }","        return pattern;","    }","});","","","}, '@VERSION@', {","    \"lang\": [","        \"am\",","        \"ar\",","        \"be\",","        \"cs\",","        \"cy\",","        \"fil\",","        \"fr\",","        \"ga\",","        \"gv\",","        \"he\",","        \"hi\",","        \"hr\",","        \"\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"mt\",","        \"pl\",","        \"ro\",","        \"ru\",","        \"sh\",","        \"sk\",","        \"sl\",","        \"sr\",","        \"ti\",","        \"tl\",","        \"uk\"","    ],","    \"requires\": [","        \"intl\"","    ]","});"];
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].lines = {"1":0,"8":0,"21":0,"22":0,"25":0,"27":0,"35":0,"36":0,"38":0,"49":0,"50":0,"53":0,"55":0,"56":0,"57":0,"60":0,"68":0,"73":0,"82":0,"91":0,"92":0,"93":0,"105":0,"106":0,"107":0,"110":0,"111":0,"119":0,"120":0,"123":0,"132":0,"133":0,"134":0,"135":0,"139":0,"149":0,"152":0,"153":0,"155":0,"157":0,"162":0,"173":0,"174":0,"175":0,"181":0,"184":0,"185":0,"193":0,"194":0,"197":0,"206":0,"207":0,"208":0,"210":0,"211":0,"215":0,"216":0,"219":0,"220":0,"223":0,"224":0,"227":0,"238":0,"239":0,"242":0,"243":0,"245":0,"247":0,"248":0,"254":0,"259":0,"271":0,"272":0,"273":0,"279":0,"282":0,"283":0,"291":0,"292":0,"303":0,"304":0,"305":0,"310":0,"313":0,"314":0,"322":0,"323":0,"326":0,"335":0,"336":0,"337":0,"339":0,"340":0,"344":0,"345":0,"346":0,"349":0,"350":0,"353":0,"354":0,"357":0,"367":0,"368":0,"371":0,"372":0,"374":0,"376":0,"379":0,"380":0,"382":0,"386":0,"398":0,"399":0,"400":0,"403":0,"404":0,"412":0,"413":0,"416":0,"425":0,"426":0,"427":0,"431":0,"432":0,"435":0,"453":0,"456":0,"457":0,"458":0,"459":0,"460":0,"461":0,"462":0,"463":0,"464":0,"466":0,"467":0,"468":0,"469":0,"470":0,"471":0,"473":0,"477":0,"478":0,"481":0,"495":0,"496":0,"497":0,"500":0,"501":0,"505":0,"515":0,"518":0,"519":0,"521":0,"523":0,"524":0,"525":0,"528":0,"529":0,"531":0,"532":0,"533":0,"534":0,"539":0,"547":0,"559":0,"571":0,"572":0,"574":0,"583":0,"584":0,"594":0,"602":0,"608":0,"614":0,"620":0,"627":0,"634":0,"643":0,"650":0,"651":0,"658":0,"659":0,"667":0,"674":0,"675":0,"683":0,"684":0,"692":0,"693":0,"701":0,"707":0,"717":0,"724":0,"731":0,"732":0,"741":0,"748":0,"754":0,"760":0,"768":0,"774":0,"775":0,"781":0,"782":0,"790":0,"796":0,"804":0,"812":0,"821":0,"830":0,"839":0,"840":0,"850":0,"851":0,"852":0,"854":0,"857":0,"858":0,"861":0,"862":0,"866":0,"867":0,"875":0,"876":0,"886":0,"887":0,"890":0,"891":0,"894":0,"896":0,"907":0,"908":0,"909":0,"912":0,"913":0,"921":0,"922":0,"925":0,"933":0,"936":0,"937":0,"938":0,"939":0,"940":0,"941":0,"942":0,"943":0,"948":0,"949":0,"954":0,"965":0,"966":0,"967":0,"968":0,"972":0,"982":0,"983":0,"984":0,"985":0,"987":0,"989":0,"993":0,"1003":0,"1006":0,"1007":0,"1009":0,"1010":0,"1011":0,"1012":0,"1017":0,"1028":0,"1029":0,"1030":0,"1033":0,"1034":0,"1042":0,"1043":0,"1046":0,"1054":0,"1055":0,"1059":0,"1060":0,"1062":0,"1064":0,"1071":0,"1085":0,"1087":0,"1129":0,"1130":0,"1131":0,"1132":0,"1133":0,"1135":0};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].functions = {"MsgBaseFormatter:21":0,"getValue:34":0,"getParams:48":0,"format:67":0,"createInstance:80":0,"getCurrentTimeZone:90":0,"StringFormatter:105":0,"createInstance:119":0,"getParams:131":0,"format:148":0,"DateFormatter:173":0,"createInstance:193":0,"getParams:205":0,"format:237":0,"TimeFormatter:271":0,"createInstance:291":0,"NumberFormatter:303":0,"createInstance:322":0,"getParams:334":0,"format:366":0,"SelectFormatter:398":0,"createInstance:412":0,"getParams:424":0,"parseOptions:452":0,"select:494":0,"format:514":0,"_inRange:558":0,"_matchRule:570":0,"set1:582":0,"set2:593":0,"set3:601":0,"set4:607":0,"set5:613":0,"set6:619":0,"set7:626":0,"set8:633":0,"set9:642":0,"set10:649":0,"set11:657":0,"set12:666":0,"set13:673":0,"set14:682":0,"set15:691":0,"set16:700":0,"set17:706":0,"set18:716":0,"set19:723":0,"set20:730":0,"set21:740":0,"set22:747":0,"set23:753":0,"set24:759":0,"set25:767":0,"set26:773":0,"set27:780":0,"set28:789":0,"set29:795":0,"set30:803":0,"set31:811":0,"set32:820":0,"set33:829":0,"rule:862":0,"PluralFormatter:850":0,"createInstance:875":0,"select:886":0,"ChoiceFormatter:907":0,"createInstance:921":0,"parseOptions:932":0,"getParams:964":0,"select:981":0,"format:1002":0,"MsgListFormatter:1028":0,"createInstance:1042":0,"format:1053":0,"formatMessage:1128":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].coveredLines = 295;
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].coveredFunctions = 76;
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
    },

    /**
     * Format string. Will be overridden in descendants
     * @method format
     */
    format: function(/*str, config*/) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 67);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 68);
Y.error('Not implemented');	//Must override in descendants
    }
});

//For date and time formatters
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 73);
Y.mix(Formatter, {
    /**
     * Create an instance of the formatter
     * @method createInstance
     * @static
     * //param values {Array|Object} The data to be processed and inserted.
     */
    createInstance: function(/*values*/) {
        //return new Formatter(values);
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 80);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 82);
Y.error('Not implemented');	//Must override in descendants
    },

    /**
     * Get current timezone. Used for time format
     * @method getCurrentTimeZone
     * @return {Y.Date.Timezone}
     */
    getCurrentTimeZone: function() {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getCurrentTimeZone", 90);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 91);
if(Y.Date === undefined || Y.Date.Timezone === undefined) { return "GMT"; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 92);
var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 93);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 105);
Y.Intl.StringFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "StringFormatter", 105);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 106);
StringFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 107);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 110);
StringFormatter = Y.Intl.StringFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 111);
Y.extend(StringFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 119);
StringFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 119);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 120);
return new StringFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 123);
Y.mix(StringFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 131);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 132);
if(matches && matches[1]) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 133);
params.key = matches[1];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 134);
if(Formatter.prototype.getParams.call(this, params)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 135);
return true;
            }
        }
	
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 139);
return false;
    },

    /**
     * Format all instances in str that can be handled by StringFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 148);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 149);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 152);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 153);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 155);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 157);
str = str.replace(matches[0], params.value);
            }

        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 162);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 173);
Y.Intl.DateFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "DateFormatter", 173);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 174);
DateFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 175);
this.styles = {
        "short":  [ 512 /*Y.Date.DATE_FORMATS.YMD_SHORT*/, 0, 0 ],
        "medium": [ 256 /*Y.Date.DATE_FORMATS.YMD_ABBREVIATED*/,0, 0 ],
        "long":   [ 128 /*Y.Date.DATE_FORMATS.YMD_LONG*/, 0, 0 ],
        "full":   [ 1 /*Y.Date.DATE_FORMATS.WYMD_LONG*/, 0, 0 ]
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 181);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 184);
DateFormatter = Y.Intl.DateFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 185);
Y.extend(DateFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 193);
DateFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 193);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 194);
return new DateFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 197);
Y.mix(DateFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 205);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 206);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 207);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 208);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 210);
if(matches[3]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 211);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 215);
if(!params.style) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 216);
params.style = "medium";
        }			//If no style, default to medium

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 219);
if(!this.styles[params.style]) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 220);
return false;
        }	//Invalid style

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 223);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 224);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 227);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 237);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 238);
if(Y.Date === undefined || !Y.Date.__advancedFormat ) { return str; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 239);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, style, result;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 242);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 243);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 245);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 247);
style = this.styles[params.style];
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 248);
result = Y.Date.format(new Date(params.value), {
                    timezone: config.timezone || Formatter.getCurrentTimeZone(),
                    dateFormat: style[0],
                    timeFormat: style[1],
                    timezoneFormat: style[2]
                });
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 254);
str = str.replace(matches[0], result);
            }

        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 259);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 271);
Y.Intl.TimeFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "TimeFormatter", 271);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 272);
TimeFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 273);
this.styles = {
        "short": [ 0, 2 /*Y.Date.TIME_FORMATS.HM_SHORT*/, 0 ],
        "medium": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 0 ],
        "long": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 2 /*Y.Date.TIMEZONE_FORMATS.Z_SHORT*/ ],
        "full": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 1 /*Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED*/ ]
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 279);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 282);
TimeFormatter = Y.Intl.TimeFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 283);
Y.extend(TimeFormatter, DateFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 291);
TimeFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 291);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 292);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 303);
Y.Intl.NumberFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "NumberFormatter", 303);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 304);
NumberFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 305);
this.styles = {
        "integer": 4 /*Y.Number.STYLES.NUMBER_STYLE*/,
        "percent": 8 /*Y.Number.STYLES.PERCENT_STYLE*/,
        "currency": 1 /*Y.Number.STYLES.CURRENCY_STYLE*/
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 310);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 313);
NumberFormatter = Y.Intl.NumberFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 314);
Y.extend(NumberFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 322);
NumberFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 322);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 323);
return new NumberFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 326);
Y.mix(NumberFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 334);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 335);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 336);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 337);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 339);
if(matches[3]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 340);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 344);
if(!params.style) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 345);
params.style = "integer";	//If no style, default to medium
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 346);
params.showDecimal = true;	//Show decimal parts too
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 349);
if(!this.styles[params.style]) {	//Invalid style
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 350);
return false;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 353);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 354);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 357);
return false;
    },

    /**
     * Format all instances in str that can be handled by NumberFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 366);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 367);
if(Y.Number === undefined || !Y.Number.__advancedFormat) { return str; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 368);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, config;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 371);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 372);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 374);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 376);
config = {
                    style: this.styles[params.style]
                };
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 379);
if(params.style === "integer" && !params.showDecimal) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 380);
config.parseIntegerOnly = true;
                }
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 382);
str = str.replace(matches[0], Y.Number.format(params.value, config));
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 386);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 398);
Y.Intl.SelectFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "SelectFormatter", 398);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 399);
SelectFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 400);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 403);
SelectFormatter = Y.Intl.SelectFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 404);
Y.extend(SelectFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 412);
SelectFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 412);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 413);
return new SelectFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 416);
Y.mix(SelectFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 424);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 425);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 426);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 427);
params.key = matches[1];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 431);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 432);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 435);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "parseOptions", 452);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 453);
var options = {},
            key = "", value = "", current = "",
            i, ch;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 456);
for(i=start; i<str.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 457);
ch = str.charAt(i);
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 458);
if (ch === '\\') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 459);
current += ch + str.charAt(i+1);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 460);
i++;
            } else {_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 461);
if (ch === '}') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 462);
if(current === "") {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 463);
i++;
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 464);
break;
                }
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 466);
value = current;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 467);
options[key.trim()] = value;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 468);
current = key = value = "";
            } else {_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 469);
if (ch === '{') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 470);
key = current;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 471);
current = "";
            } else {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 473);
current += ch;
            }}}
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 477);
if(current !== "") {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 478);
return null;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 481);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 494);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 495);
for ( var key in options ) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 496);
if( key === "other" ) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 497);
continue;	//Will use this only if everything else fails
            }

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 500);
if( key === params.value ) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 501);
return options[key];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 505);
return options.other;
    },

    /**
     * Format all instances in str that can be handled by SelectFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 514);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 515);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, options, result, start;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 518);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 519);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 521);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 523);
options = this.parseOptions(str, regex.lastIndex);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 524);
if(!options) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 525);
continue;
                }

                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 528);
regex.lastIndex = options.next;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 529);
options = options.options;

                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 531);
result = this.select(options, params);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 532);
if(result) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 533);
start = str.indexOf(matches[0]);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 534);
str = str.slice(0, start) + result + str.slice(regex.lastIndex);
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 539);
return str;
    }
}, true);/**
 * PluralRules is used to determine the plural form in MessageFormat
 * @class PluralRules
 * @namespace Intl
 * @static
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 547);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "_inRange", 558);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 559);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "_matchRule", 570);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 571);
for(var key in rules) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 572);
if(rules[key]) { return key; }
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 574);
return "other";
    },

    /**
     * Set of rules. Each locale will have a matching rule. The corresponding functions in each set
     * will take a number as parameter and return the relevant plural form.
     */
    rules: {
        set1: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set1", 582);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 583);
var mod = n % 100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 584);
return PluralRules._matchRule({
                few:  inRange(mod, 3, 10),
                many: inRange(mod, 11, 99),
                one:  n === 1,
                two:  n === 2,
                zero: n === 0
            });
        },

        set2: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set2", 593);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 594);
return PluralRules._matchRule({
               many: n !== 0 && n%10 === 0,
               one:  n === 1,
               two:  n === 2
            });
        },

        set3: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set3", 601);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 602);
return PluralRules._matchRule({
               one: n === 1
            });
        },

        set4: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set4", 607);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 608);
return PluralRules._matchRule({
                one: inRange(n, 0, 1)
            });
        },

        set5: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set5", 613);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 614);
return PluralRules._matchRule({
                one: inRange(n, 0, 2) && n !== 2
            });
        },

        set6: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set6", 619);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 620);
return PluralRules._matchRule({
                one:  n%10 === 1 && n%100 !== 11,
                zero: n === 0
            });
        },

        set7: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set7", 626);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 627);
return PluralRules._matchRule({
                one: n === 1,
                two: n === 2
            });
        },

        set8: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set8", 633);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 634);
return PluralRules._matchRule({
                few:  inRange(n, 3, 6),
                many: inRange(n, 7, 10),
                one:  n === 1,
                two:  n === 2
            });
        },

        set9: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set9", 642);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 643);
return PluralRules._matchRule({
                few: n === 0 || (n !== 1 && inRange(n%100, 1, 19)),
                one: n === 1
            });
        },

        set10: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set10", 649);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 650);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 651);
return PluralRules._matchRule({
                few: inRange(mod10, 2, 9) && !inRange(mod100, 11, 19),
                one: mod10 === 1 && !inRange(mod100, 11, 19)
            });
        },

        set11: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set11", 657);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 658);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 659);
return PluralRules._matchRule({
                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),
                many: mod10 === 0 || inRange(mod10, 5, 9) || inRange(mod100, 11, 14),
                one:  mod10 === 1 && mod100 !== 11
            });
        },

        set12: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set12", 666);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 667);
return PluralRules._matchRule({
                few: inRange(n, 2, 4),
                one: n === 1
            });
        },

        set13: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set13", 673);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 674);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 675);
return PluralRules._matchRule({
                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),
                many: n !== 1 && inRange(mod10, 0, 1) || inRange(mod10, 5, 9) || inRange(mod100, 12, 14),
                one:  n === 1
            });
        },

        set14: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set14", 682);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 683);
var mod = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 684);
return PluralRules._matchRule({
                few: inRange(mod, 3, 4),
                one: mod === 1,
                two: mod === 2
            });
        },

        set15: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set15", 691);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 692);
var mod = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 693);
return PluralRules._matchRule({
                few:  n === 0 || inRange(mod, 2, 10),
                many: inRange(mod, 11, 19),
                one:  n === 1
            });
        },

        set16: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set16", 700);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 701);
return PluralRules._matchRule({
                one: n%10 === 1 && n !== 11
            });
        },

        set17: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set17", 706);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 707);
return PluralRules._matchRule({
                few:  n === 3,
                many: n === 6,
                one:  n === 1,
                two:  n === 2,
                zero: n === 0
            });
        },

        set18: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set18", 716);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 717);
return PluralRules._matchRule({
                one:  inRange(n, 0, 2) && n !== 0 && n !== 2,
                zero: n === 0
            });
        },

        set19: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set19", 723);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 724);
return PluralRules._matchRule({
                few: inRange(n, 2, 10),
                one: inRange(n, 0, 1)
            });
        },

        set20: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set20", 730);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 731);
var mod1 = n%10, mod2 = n%100, mod6 = n%1000000;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 732);
return PluralRules._matchRule({
                few:  (inRange(mod1, 3, 4) || mod1 === 9) && !inRange(mod2, 10, 19) && !inRange(mod2, 70, 79) && !inRange(mod2, 90, 99),
                many: n !== 0 && mod6 === 0,
                one:  mod1 === 1 && mod2 !== 11 && mod2 !== 71 && mod2 !== 91,
                two:  mod1 === 2 && mod2 !== 12 && mod2 !== 72 && mod2 !== 92
            });
        },

        set21: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set21", 740);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 741);
return PluralRules._matchRule({
                one:  n === 1,
                zero: n === 0
            });
        },

        set22: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set22", 747);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 748);
return PluralRules._matchRule({
                one: inRange(n, 0, 1) || inRange(n, 11, 99)
            });
        },

        set23: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set23", 753);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 754);
return PluralRules._matchRule({
                one: inRange(n%10, 1, 2) || n%20 === 0
            });
        },

        set24: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set24", 759);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 760);
return PluralRules._matchRule({
                few: inRange(n, 3, 10) || inRange(n, 13, 19),
                one: n === 1 || n === 11,
                two: n === 2 || n === 12
            });
        },

        set25: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set25", 767);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 768);
return PluralRules._matchRule({
                one: n === 1 || n === 5
            });
        },

        set26: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set26", 773);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 774);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 775);
return PluralRules._matchRule({
                one: (mod10 === 1 || mod10 === 2) && (mod100 !== 11 && mod100 !== 12)
            });
        },

        set27: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set27", 780);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 781);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 782);
return PluralRules._matchRule({
                few: mod10 === 3 && mod100 !== 13,
                one: mod10 === 1 && mod100 !== 11,
                two: mod10 === 2 && mod100 !== 12
            });
        },

        set28: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set28", 789);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 790);
return PluralRules._matchRule({
                many: n === 11 || n === 8 || n === 80 || n === 800
            });
        },

        set29: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set29", 795);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 796);
return PluralRules._matchRule({
                few: n === 4,
                one: n === 1 || n === 3,
                two: n === 2
            });
        },

        set30: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set30", 803);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 804);
return PluralRules._matchRule({
                few: n === 4,
                one: n === 1,
                two: n === 2 || n === 3
            });
        },

        set31: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set31", 811);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 812);
return PluralRules._matchRule({
                few:  n === 4,
                many: n === 6,
                one:  n === 1,
                two:  n === 2 || n === 3
            });
        },

        set32: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set32", 820);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 821);
return PluralRules._matchRule({
                few:  n === 4,
                many: n === 6,
                one:  Y.Array.indexOf([1,5,7,8,9,10], n) > -1,
                two: n === 2 || n === 3
            });
        },

        set33: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set33", 829);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 830);
return PluralRules._matchRule({
                few:  inRange(n, 2, 9),
                many: inRange(n, 10, 19) || inRange(n, 100, 199) || inRange(n, 1000, 1999),
                one:  n === 1
            });
        }
    }
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 839);
PluralRules = Y.Intl.PluralRules;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 840);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 850);
Y.Intl.PluralFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "PluralFormatter", 850);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 851);
PluralFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 852);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*";
    
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 854);
var formats = Y.Intl.get(MODULE_NAME),
        ruleSet = formats.pluralRule;

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 857);
if(ruleSet) {
         _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 858);
this.rule = PluralRules.rules[ruleSet];
    }

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 861);
if(this.rule === undefined) {
         _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 862);
this.rule = function() { _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "rule", 862);
return "other"; };
    }
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 866);
PluralFormatter = Y.Intl.PluralFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 867);
Y.extend(PluralFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 875);
PluralFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 875);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 876);
return new PluralFormatter(values);
};

/**
 * Select output depending on params.value from options
 * @method select
 * @param options {Object} Object containing results for singular/plural
 * @param params {Object} Object containing value
 * @return {String} selected result
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 886);
PluralFormatter.prototype.select = function(options, params) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 886);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 887);
var pluralForm = this.rule(params.value),
        result = options[pluralForm];

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 890);
if(result === undefined || result === null) {
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 891);
result = options.other;
    }

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 894);
result = result.replace("#", new NumberFormatter({VAL: params.value}).format("{VAL, number, integer}"));	//Use 'number' to format this part

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 896);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 907);
Y.Intl.ChoiceFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "ChoiceFormatter", 907);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 908);
ChoiceFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 909);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 912);
ChoiceFormatter = Y.Intl.ChoiceFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 913);
Y.extend(ChoiceFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 921);
ChoiceFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 921);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 922);
return new ChoiceFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 925);
Y.mix(ChoiceFormatter.prototype, {
    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param choicesStr {String} Choice string from pattern
     * @return {Array} Array of objects containing value(choice), result, and relation
     */
    parseOptions: function(choicesStr) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "parseOptions", 932);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 933);
var options = [],
            choicesArray = choicesStr.split("|"),
            i, j, choice, relations, rel, mapping, ch;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 936);
for (i=0; i<choicesArray.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 937);
choice = choicesArray[i];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 938);
relations = ['#', '<', '\u2264'];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 939);
for (j=0; j<relations.length; j++) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 940);
rel = relations[j];
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 941);
if(choice.indexOf(rel) !== -1) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 942);
mapping = choice.split(rel);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 943);
ch = {
                        value: parseInt(mapping[0], 10),
                        result: mapping[1],
                        relation: rel
                    };
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 948);
options.push(ch);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 949);
break;
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 954);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 964);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 965);
if(SelectFormatter.prototype.getParams.call(this, params, matches)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 966);
if(matches[2]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 967);
params.choices = this.parseOptions(matches[2]);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 968);
return params.choices === [] ? false: true;
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 972);
return false;
    },

    /**
     * Select output depending on params.value from options in params.choices
     * @method select
     * @param params {Object} Object containing value and choices
     * @return {String} selected result
     */
    select: function(params) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 981);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 982);
var choice, value, result, relation, i;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 983);
for (i=0; i<params.choices.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 984);
choice = params.choices[i];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 985);
value = choice.value, result = choice.result, relation = choice.relation;

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 987);
if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)
                || (relation === '\u2264' && value <= params.value)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 989);
return result;
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 993);
return "";
    },

    /**
     * Format all instances in str that can be handled by ChoiceFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 1002);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1003);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, result;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1006);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1007);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1009);
if(this.getParams(params, matches)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1010);
result = this.select(params);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1011);
if(result) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1012);
str = str.replace(matches[0], result);
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1017);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1028);
Y.Intl.MsgListFormatter = function(values) {
      _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "MsgListFormatter", 1028);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1029);
MsgListFormatter.superclass.constructor.call(this, values);
      _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1030);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*list\\s*}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1033);
MsgListFormatter = Y.Intl.MsgListFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1034);
Y.extend(MsgListFormatter, StringFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1042);
MsgListFormatter.createInstance = function(values) {
     _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 1042);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1043);
return new MsgListFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1046);
Y.mix(MsgListFormatter.prototype, {
     /**
      * Format all instances in str that can be handled by MsgListFormatter
      * @method format
      * @param str {String} Input string/pattern
      * @return {String} Formatted result
      */
     format: function(str) {
          _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 1053);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1054);
if(Y.Intl === undefined || Y.Intl.ListFormatter === undefined || Y.Intl.ListFormatter.format === undefined) { return str; }
          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1055);
var regex = new RegExp(this.regex, "gm"),
              matches = null,
              params;

          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1059);
while((matches = regex.exec(str))) {
              _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1060);
params = {};

              _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1062);
if(this.getParams(params, matches)) {
                  //Got a match
                  _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1064);
str = str.replace(
                             matches[0],
                             Y.Intl.ListFormatter.format( params.value )
                  );
              }
          }

          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1071);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1085);
formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1087);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "formatMessage", 1128);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1129);
config = config || {};
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1130);
var i, formatter;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1131);
for(i=0; i<formatters.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1132);
formatter = formatters[i].createInstance(values);
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1133);
pattern = formatter.format(pattern, config);
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1135);
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
